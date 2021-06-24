import { Notify } from 'quasar';
import {
  auth, db, secondaryAuth, storage
} from '../boot/firebase';
import { Group } from '../js/Group';
import { Gender } from '../js/Gender';
import { Laterality } from '../js/Laterality';
import { Weapons } from '../js/Weapons';

export default {
  namespaced: false,
  state: {
    currentUser: null
  },

  getters: {
    isLoggedIn(state) {
      return !!state.currentUser;
    },

    isAdmin(state) {
      return state.currentUser.isAdmin;
    }
  },

  mutations: {
    setCurrentUser(state, data) {
      state.currentUser = data;
    },

    updateCurrentUser(state, data) {
      // Prioritize the provided data over the old data
      state.currentUser = {
        ...state.currentUser,
        ...data
      };
    },

    updateCurrentUserWithFirebase(state) {
      // Gather some information to keep in the store
      const {
        emailVerified, uid, email
      } = auth.currentUser;

      state.currentUser = {
        ...state.currentUser,
        emailVerified,
        uid,
        email
      };
    }
  },

  actions: {
    /**
     * Create a firebase user, then upload the data of the user to firestore.
     */
    // <editor-fold desc="signup" defaultstate="collapsed">
    async signup({
      state, getters, dispatch, commit
    }, { email, password }) {
      if (getters.isLoggedIn) {
        await auth.signOut();
      }

      const userCred = await auth.createUserWithEmailAndPassword(email, password)
        .then((resp) => resp)
        .catch((error) => {
          Notify.create({
            message: 'Une erreur c\'est produite à la création du compte',
            caption: error.message,
            icon: 'mdi-alert',
            color: 'negative',
            position: 'bottom'
          });
          console.error(error);
          return false;
        });
      if (userCred === false) return null;

      commit('updateCurrentUserWithFirebase');
      // Send verification email
      await auth.currentUser.sendEmailVerification();
      await dispatch('fetchCurrentUser');

      return state.currentUser;
    },
    // </editor-fold>

    // <editor-fold desc="login" defaultstate="collapsed">
    async login({ commit, dispatch }, { email, password }) {
      await auth.signInWithEmailAndPassword(email, password);

      commit('updateCurrentUserWithFirebase');
      await dispatch('fetchCurrentUser');
    },
    // </editor-fold>

    // <editor-fold desc="fetchCurrentUser" defaultstate="collapsed">
    async fetchCurrentUser({ state, getters, commit }) {
      if (!getters.isLoggedIn) {
        const err = Error('not-connected');
        err.code = 'not-connected';
        throw err;
      }

      const userRef = db.collection('users').doc(state.currentUser.uid);

      const querySnapshot = await userRef.get();
      let data = querySnapshot.data();

      const collections = [];

      await userRef.collection('subUsers').get()
        .then((query) => {
          query.forEach((item) => {
            collections.push({ uid: item.id, parentUid: item.ref.parent.parent.id, ...item.data() });
          });
          return collections;
        })
        .then((members) => members.map((member) => {
          member.birthDate = member.birthDate.toDate();
          member.certificateDate = member.certificateDate?.toDate();
          member.group = Group.from(member.birthDate);
          member.gender = Gender.from(member.gender);
          member.laterality = Laterality.from(member.laterality);
          member.weapons = Weapons.from(member.weapons);
          return member;
        }))
        .then((members) => Promise.all(members.map(async (member) => {
          await storage.ref()
            .child(`profile_pics/${member.parentUid}/${member.uid}`)
            .getDownloadURL()
            .then((url) => { member.memberAvatar = url; })
            .catch(() => { member.memberAvatar = undefined; });
          return member;
        })))
        .then((members) => Promise.all(members.map(async (member) => {
          await storage.ref()
            .child(`certificates/${member.parentUid}/${member.uid}`)
            .getDownloadURL()
            .then((url) => { member.medicalCertificate = url; })
            .catch(() => { member.medicalCertificate = undefined; });
          return member;
        })))
        .then((members) => Promise.all(members.map(async (member) => {
          await storage.ref()
            .child(`cerfa/${member.parentUid}/${member.uid}`)
            .getDownloadURL()
            .then((url) => { member.cerfa = url; })
            .catch(() => { member.cerfa = undefined; });
          return member;
        })));

      data = { ...data, subUsers: collections };
      commit('updateCurrentUser', {
        ...data
      });

      return data;
    },
    // </editor-fold>

    // <editor-fold desc="updateCurrentUserData" defaultstate="collapsed">
    async updateCurrentUserData({ state, getters, dispatch }, { data }) {
      if (!getters.isLoggedIn) {
        const err = Error('not-connected');
        err.code = 'not-connected';
        throw err;
      }

      await db.collection('users')
        .doc(state.currentUser.uid)
        .update(data);

      return dispatch('fetchCurrentUser');
    },
    // </editor-fold>

    // <editor-fold desc="logout" defaultstate="collapsed">
    async logout({ commit }) {
      await auth.signOut();
      commit('setCurrentUser', null);

      // Destroy messaging token if any
      commit('setMessagingToken', { token: null });
    },
    // </editor-fold>

    // <editor-fold desc="adminCreateAccount" defaultstate="collapsed">
    async adminCreateAccount({ dispatch }, { email }) {
      const password = Math.random().toString(36).slice(-16);

      let uid;
      await secondaryAuth.createUserWithEmailAndPassword(email, password)
        .then(async () => {
          uid = secondaryAuth.currentUser.uid;
          await secondaryAuth.signOut();
          await dispatch('setDefaultStoreValue', { email, uid });
        })
        .catch((error) => {
          uid = null;
          console.error(error);
          Notify.create({
            message: 'Une erreur c\'est produite à la création du compte',
            caption: error.message,
            icon: 'mdi-alert',
            color: 'negative',
            position: 'bottom'
          });
        });

      if (uid != null) return { error: false, uid };
      return { error: true };
    },
    // </editor-fold>

    // <editor-fold desc="setDefaultStoreValue" defaultstate="collapsed">
    async setDefaultStoreValue(_, { email, uid }) {
      const toStore = {
        email,
        isAdmin: false
      };

      await db.collection('users')
        .doc(uid)
        .set(toStore);
      return true;
    }
    // </editor-fold>
  }
};
