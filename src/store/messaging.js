import { auth, messaging } from '../boot/firebase';

export default {
  namespaced: false,
  state: {
    messagingToken: null,
    isServiceWorkerReady: false
  },

  getters: {
    isMessagingPossible(state) {
      return !!auth.currentUser && state.isServiceWorkerReady;
    },

    isMessagingReady(state) {
      return !!state.messagingToken;
    }
  },

  mutations: {
    setMessagingToken(state, { token }) {
      state.messagingToken = token;
    },

    setServiceWorkerReady(state, { ready }) {
      state.isServiceWorkerReady = ready;
    }
  },

  actions: {
    async setupMessagingRoutine({ getters, dispatch }) {
      if (!getters.isMessagingPossible) {
        throw Error('messaging/not-ready');
      } else if (getters.isMessagingReady) {
        throw Error('messaging/already-ready');
      }

      // Request notification permission
      await dispatch('requestNotificationPermission');

      // Retrieve and send the messaging token to the backend
      await dispatch('pushMessagingToken', {
        token: await messaging.getToken()
      });

      // Listen for token changes
      messaging.onTokenRefresh(async () => {
        await dispatch('pushMessagingToken', {
          token: await messaging.getToken()
        });
      });
    },

    /* pushMessagingToken({ commit }, { token }) {
      commit('setMessagingToken', { token });
      return db.collection('users')
        .doc(auth.currentUser.uid)
        .update({ fcmTokens: firebase.firestore.FieldValue.arrayUnion(token) });
    }, */

    requestNotificationPermission() {
      return Notification.requestPermission((permission) => {
        if (permission !== 'granted') {
          throw Error('messaging/missing-permission');
        }
      });
    }
  }
};
