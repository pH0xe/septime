import { auth, db } from '../boot/firebase';

export default {
  namespaced: false,
  state: {
    userData: null
  },

  getters: {
    isLoggedIn() {
      return !!auth.currentUser;
    }
  },

  mutations: {
    setUserData(state, { userData }) {
      state.userData = userData;
    }
  },

  actions: {
    /**
     * Create a firebase user, then upload the data of the user to firestore.
     */
    async signup({ getters }, { email, password, ...data }) {
      if (getters.isLoggedIn) {
        await auth.signOut();
      }

      console.log('Creating use with', email, password);
      const credentials = await auth.createUserWithEmailAndPassword(email, password);
      console.log('Created with credentials', credentials);

      // Immediately login
      console.log('Login into newly created account');
      await auth.signInWithEmailAndPassword(email, password);

      console.log('Writing to document', `users/${credentials.user.uid}`);

      await db.collection('users').doc(credentials.user.uid).set({
        isActive: false,
        isAdmin: false,
        ...data
      });

      return auth.currentUser;
    },

    async login({ dispatch }, { email, password }) {
      await auth.signInWithEmailAndPassword(email, password);
      return dispatch('fetchCurrentUser');
    },

    async fetchCurrentUser({ commit, getters }) {
      if (getters.isLoggedIn) {
        const err = Error('not-connected');
        err.code = 'not-connected';
        throw err;
      }

      const querySnapshot = await db
        .collection('users')
        .doc(auth.currentUser.uid)
        .get();

      commit('setUserData', { userData: querySnapshot.data() });
    },

    updateCurrentUser(_, { data }) {
      if (!auth.currentUser) {
        const err = Error('not-connected');
        err.code = 'not-connected';
        return Promise.reject(err);
      }

      return db.collection('users')
        .doc(auth.currentUser.uid)
        .update(data);
    },

    async logout({ commit }) {
      await auth.signOut();
      commit('setUserData', { userData: null });
    }
  }
};
