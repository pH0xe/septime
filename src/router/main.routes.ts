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
];
