import { auth, db } from '../boot/firebase';
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
        isAnonymous, emailVerified, refreshToken, tenantId, photoURL, uid, displayName
      } = auth.currentUser;

      state.currentUser = {
        ...state.currentUser,
        isAnonymous,
        emailVerified,
        refreshToken,
        tenantId,
        photoURL,
        uid,
        displayName
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

      const credentials = await auth.createUserWithEmailAndPassword(email, password);

      // Immediately login
      await dispatch('login', { email, password });
      // Change display name to the actual name
      await state.currentUser.updateProfile({ displayName: `${data.firstName} ${data.lastName}` });

      // Initialize its user data
      await db.collection('users').doc(credentials.user.uid).set({
        isActive: false,
        isAdmin: false,
        ...data
      });

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

      commit('updateCurrentUser', {
        ...data,
        birthDate,
        group
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
