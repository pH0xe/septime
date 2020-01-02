import DefaultLayout from '../layouts/DefaultLayout.vue';
import HomePage from '../pages/HomePage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import NewsPage from '../pages/NewsPage';
import CalendarPage from '../pages/CalendarPage';


const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomePage
      },
      {
        path: 'news',
        name: 'news',
        component: NewsPage
      },
      {
        path: 'calendar',
        name: 'calendar',
        component: CalendarPage
      },
      {
        path: 'register',
        name: 'register',
        component: RegisterPage
      },
      {
        path: 'login',
        name: 'login',
        redirect: {
          name: 'home', query: { login: true }
        }
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    },
    children: [
      {
        path: '',
        redirect: { name: 'admin_members' }
      },
      {
        path: 'member',
        name: 'admin_members',
        component: () => import('../pages/AdminMemberPage.vue')
      },
      {
        path: 'equipment',
        name: 'admin_equipment',
        component: () => import('../pages/AdminEquipmentPage.vue')
      },
      {
        path: 'events',
        name: 'admin_events',
        component: () => import('../pages/AdminEventPage.vue')
      },
      {
        path: 'news',
        name: 'admin_news',
        component: () => import('../pages/AdminNewsPage.vue')
      },
      {
        path: 'settings',
        name: 'admin_settings',
        component: () => import('../pages/AdminSettingPage.vue')
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('../pages/Error404.vue')
  });
}

export default routes;
