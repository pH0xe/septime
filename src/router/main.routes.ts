import { RouteRecordRaw } from 'vue-router';

export const mainRoutes: RouteRecordRaw[] = [
  { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
  {
    path: 'news',
    name: 'news',
    component: () => import('pages/IndexPage.vue'),
  },
  {
    path: 'infos',
    name: 'infos',
    component: () => import('pages/IndexPage.vue'),
  },
  {
    path: 'legalNotice',
    name: 'legal-notice',
    component: () => import('pages/IndexPage.vue'),
  },
  {
    path: 'webmasterContact',
    name: 'webmaster-contact',
    component: () => import('pages/IndexPage.vue'),
  },
  {
    path: 'clubContact',
    name: 'club-contact',
    component: () => import('pages/IndexPage.vue'),
  },
  {
    path: 'access',
    name: 'access',
    component: () => import('pages/IndexPage.vue'),
  },
];
