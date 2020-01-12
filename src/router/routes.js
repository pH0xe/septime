import DefaultLayout from '../layouts/DefaultLayout.vue';
import HomePage from '../pages/HomePage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import NewsPage from '../pages/NewsPage';
import CalendarPage from '../pages/CalendarPage';
import NewsArticlePage from '../pages/NewsArticlePage';
import ProfilPage from '../pages/ProfilPage';
import ProfilUpdatePage from '../pages/ProfilUpdatePage';


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
        path: 'news/:id',
        name: 'news_details',
        component: NewsArticlePage
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
      },
      {
        path: 'profil',
        name: 'profil',
        component: ProfilPage,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'profil/update',
        name: 'profil_update',
        component: ProfilUpdatePage,
        meta: {
          requiresAuth: true
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
        path: 'presence',
        name: 'admin_presence',
        component: () => import('../pages/AdminPresencePage.vue')
      },
      {
        path: 'presence/create',
        name: 'admin_presence_create',
        component: () => import('../pages/AdminPresenceCreatePage.vue')
      },
      {
        path: 'presence/result',
        name: 'admin_presence_result',
        component: () => import('../pages/AdminPresenceResultPage.vue')
      },
      {
        path: 'presence/list',
        name: 'admin_presence_list',
        component: () => import('../pages/AdminPresenceListPage.vue')
      },
      {
        path: 'equipment/create',
        name: 'admin_equipment_create',
        component: () => import('../pages/AdminEquipmentNewTypePage')
      },
      {
        path: 'events',
        name: 'admin_events',
        component: () => import('../pages/AdminEventsPage.vue')
      },
      {
        path: 'newEvent',
        name: 'admin_events_new',
        component: () => import('../pages/AdminEventNewPage.vue')
      },
      {
        path: 'equipments/add',
        name: 'admin_equipment_add',
        component: () => import('../pages/AdminEquipmentNewPage')
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
      },
      {
        path: 'news/create', name: 'admin_news_create', component: () => import('pages/AdminNewsCreatePage.vue')
      },
      {
        path: 'news/modify', name: 'admin_news_modify', component: () => import('pages/AdminNewsModifyPage.vue')
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
