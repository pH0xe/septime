import {
  auth, cloudFunctions, db, storage
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
    async signup({ state, getters, dispatch }, { email, password }) {
      if (getters.isLoggedIn) {
        await auth.signOut();
      }

      // Pass all of the information to a cloud function
      const toData = {
        email,
        password
      };

      const responseData = (await cloudFunctions.adminCreateMember(toData)).data;
      if (responseData.error) {
        throw responseData;
      }

      const { uid } = responseData;

      // Immediately login
      await dispatch('login', {
        email,
        password
      });

      // Sanity check, ensure we are the same user
      if (state.currentUser.uid !== uid) {
        console.error('Not the same uid', state.currentUser.uid, uid);
      }

      // Send verification email
      await auth.currentUser.sendEmailVerification();

      return state.currentUser;
    },

    async login({ commit, dispatch }, { email, password }) {
      await auth.signInWithEmailAndPassword(email, password);

      commit('updateCurrentUserWithFirebase');
      await dispatch('fetchCurrentUser');
    },

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

    async logout({ commit }) {
      await auth.signOut();
      commit('setCurrentUser', null);

      // Destroy messaging token if any
      commit('setMessagingToken', { token: null });
    }
  }
};
