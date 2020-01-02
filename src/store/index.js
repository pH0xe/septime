import Vue from 'vue';
import Vuex from 'vuex';

import members from './members';
import auth from './auth';

Vue.use(Vuex);

export default function (/* { ssrContext } */) {
  return new Vuex.Store({
    modules: {
      members,
      auth
    },
    strict: process.env.DEV
  });
}
