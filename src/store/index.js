import Vue from 'vue';
import Vuex from 'vuex';

import members from './members';
import auth from './auth';
import messaging from './messaging';
import equipments from './equipments';
import equipmentsType from './equipmentsTypes';
import news from './news';
import trainings from './trainings';
import events from './events';
import calendar from './calendar';
import settings from './settings';

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
    news,
    calendar,
    settings
  },
  strict: process.env.DEV
});
