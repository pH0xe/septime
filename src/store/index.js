import Vue from 'vue';
import Vuex from 'vuex';

import members from './members';
import auth from './auth';
import messaging from './messaging';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    members,
    auth,
    messaging
  },
  strict: process.env.DEV
});
