import Vue from 'vue';
import Vuex from 'vuex';

import members from './members';
import auth from './auth';
import messaging from './messaging';
import equipments from './equipments';
import events from './events';
import equipmentsType from './equipmentsTypes';
import trainings from './trainings';
import news from './news';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    members,
    auth,
    messaging,
    equipments,
    events,
    equipmentsType,
    trainings,
    news
  },
  strict: process.env.DEV
});
