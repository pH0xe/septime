import Vue from 'vue';
import Vuex from 'vuex';

import members from './members';
import auth from './auth';
import messaging from './messaging';
import equipments from './equipments';
import events from './events';
import equipmentsType from './equipmentsTypes';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    members,
    auth,
    messaging,
    equipments,
    events,
    equipmentsType
  },
  strict: process.env.DEV
});
