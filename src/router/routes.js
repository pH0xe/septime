import DefaultLayout from '../layouts/DefaultLayout.vue';
import HomePage from '../pages/HomePage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import NewsPage from '../pages/NewsPage';
import CalendarPage from '../pages/CalendarPage';
import NewsArticlePage from '../pages/NewsArticlePage';
import ProfilPage from '../pages/ProfilPage';
import ProfilUpdatePage from '../pages/ProfilUpdatePage';
import UsefulInformationPage from '../pages/UsefulInformationPage';
import ProfilNewPage from '../pages/ProfilNewPage';
import ContactClubPage from '../pages/ContactClubPage';
import TCUPage from '../pages/ContactTCUPage';
import ContactWebmasterPage from '../pages/ContactWebmasterPage';
import ContactAccessPage from '../pages/ContactAccessPage';


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
        path: 'profil/update/:id',
        name: 'profil_update',
        component: ProfilUpdatePage,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'contact/clubContact',
        name: 'contact_club',
        component: ContactClubPage
      },
      {
        path: 'contact/legalNotice',
        name: 'contact_tcu',
        component: TCUPage
      },
      {
        path: 'contact/webmasterContact',
        name: 'contact_webmaster',
        component: ContactWebmasterPage
      },
      {
        path: 'contact/access',
        name: 'contact_access',
        component: ContactAccessPage
      },
      {
        path: 'useful',
        name: 'usefulInfo',
        component: UsefulInformationPage
      },
      {
        path: 'profil/new',
        name: 'addAdherent',
        component: ProfilNewPage,
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
        redirect: { name: 'admin_members_list' }
      },
      {
        path: 'members/list',
        name: 'admin_members_list',
        component: () => import('../pages/AdminMemberPage.vue')
      },
      {
        path: 'members/create',
        name: 'admin_members_create',
        component: () => import('../pages/AdminMemberCreatePage.vue')
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
        path: 'presence/list/:id',
        name: 'admin_presence_list',
        component: () => import('../pages/AdminPresenceListPage.vue')
      },
      {
        path: 'presence/planning',
        name: 'admin_presence_planning',
        component: () => import('../pages/adminPresencePlanningPage')
      },
      {
        path: 'presence/update/:id',
        name: 'admin_presence_update',
        component: () => import('../pages/adminPresenceUpdatePage')
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
        redirect: { name: 'admin_settings_club' }
      },
      {
        path: 'settings/club',
        name: 'admin_settings_club',
        component: () => import('../pages/AdminSettingClubPage.vue')
      },
      {
        path: 'settings/register',
        name: 'admin_settings_register',
        component: () => import('../pages/AdminSettingRegisterPage.vue')
      },
      {
        path: 'settings/permissions',
        name: 'admin_settings_permission',
        component: () => import('../pages/AdminSettingPermissionPage.vue')
      },
      {
        path: 'news/create',
        name: 'admin_news_create',
        component: () => import('pages/AdminNewsCreatePage.vue')
      },
      {
        path: 'news/modify/:id',
        name: 'admin_news_modify',
        component: () => import('pages/AdminNewsModifyPage.vue')
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
