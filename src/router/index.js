import Vue from 'vue';
import VueRouter from 'vue-router';

import * as firebase from 'firebase';
import routes from './routes';

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function () {
  const router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  router.beforeEach(async (to, from, next) => {
    let user;
    if (to.matched.some((record) => record.meta.requiresAuth || record.meta.requiresAdmin)) {
      user = await firebase.getCurrentUser();
      if (!user) {
        next({ name: 'home' });
        return;
      }
    }

    if (to.matched.some((record) => record.meta.requiresAdmin)) {
      const { isAdmin } = (await user.getIdTokenResult()).claims;
      if (!isAdmin) {
        next(false);
        return;
      }
    }

    next();
  });

  return router;
}
