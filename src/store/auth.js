import {
  auth, cloudFunctions, db, storage
} from '../boot/firebase';
import { Group } from '../js/Group';

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
        isAnonymous, emailVerified, refreshToken, tenantId, photoURL, uid, displayName, email
      } = auth.currentUser;

      state.currentUser = {
        ...state.currentUser,
        isAnonymous,
        emailVerified,
        refreshToken,
        tenantId,
        photoURL,
        uid,
        displayName,
        email
      };
    }
  },

  actions: {
    /**
     * Create a firebase user, then upload the data of the user to firestore.
     */
    async signup({ state, getters, dispatch }, { email, password, ...data }) {
      if (getters.isLoggedIn) {
        await auth.signOut();
      }

      // Pass all of the information to a cloud function
      const toData = {
        ...data,
        email,
        password,
        birthDate: data.birthDate.toJSON(),
        certificateDate: data.certificateDate.toJSON()
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

      const querySnapshot = await db
        .collection('users')
        .doc(state.currentUser.uid)
        .get();

      const data = querySnapshot.data();

      const birthDate = data.birthDate.toDate();
      const group = Group.from(birthDate);

      let photoURL;

      try {
        photoURL = await storage.ref()
          .child('profile_pics')
          .child(state.currentUser.uid)
          .getDownloadURL();
      } catch (err) {
        if (err.code === 'storage/object-not-found') {
          console.warn('No profile picture found');
        } else {
          console.error(err);
        }
      }

      let medicalCertificate;
      try {
        medicalCertificate = await storage.ref()
          .child('certificates')
          .child(state.currentUser.uid)
          .getDownloadURL();
      } catch (err) {
        if (err.code === 'storage/object-not-found') {
          console.warn('No certificates found');
        } else {
          console.error(err);
        }
      }

      commit('updateCurrentUser', {
        ...data,
        birthDate,
        group,
        photoURL,
        medicalCertificate
      });
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
