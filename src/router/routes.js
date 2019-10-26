import DefaultLayout from '../layouts/DefaultLayout';
import LogoPage from '../pages/LogoPage';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', component: LogoPage }
    ]
  }, {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/AdminDefaultPage.vue')
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
