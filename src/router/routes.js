import DefaultLayout from '../layouts/DefaultLayout.vue';
import HomePage from '../pages/all/HomePage.vue';
import RegisterPage from '../pages/all/RegisterPage.vue';
import NewsPage from '../pages/all/news/NewsPage';
import CalendarPage from '../pages/all/CalendarPage';
import NewsArticlePage from '../pages/all/news/NewsArticlePage';
import ProfilPage from '../pages/all/profile/ProfilPage';
import ProfilUpdatePage from '../pages/all/profile/ProfilUpdatePage';
import UsefulInformationPage from '../pages/all/UsefulInformationPage';
import ProfilNewPage from '../pages/all/profile/ProfilNewPage';
import ContactClubPage from '../pages/all/contact/ContactClubPage';
import TCUPage from '../pages/all/contact/ContactTCUPage';
import ContactWebmasterPage from '../pages/all/contact/ContactWebmasterPage';
import ContactAccessPage from '../pages/all/contact/ContactAccessPage';

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
        component: () => import('../pages/admin/member/AdminMemberPage.vue')
      },
      {
        path: 'members/create',
        name: 'admin_members_create',
        component: () => import('../pages/admin/member/AdminMemberCreatePage.vue')
      },
      {
        path: 'equipment',
        name: 'admin_equipment',
        component: () => import('../pages/admin/equipment/AdminEquipmentPage.vue')
      },
      {
        path: 'presence/create',
        name: 'admin_presence_create',
        component: () => import('../pages/admin/training/AdminPresenceCreatePage.vue')
      },
      {
        path: 'presence/result',
        name: 'admin_presence_result',
        component: () => import('../pages/admin/training/AdminPresenceResultPage.vue')
      },
      {
        path: 'presence/list/:train',
        name: 'admin_presence_list',
        props: true,
        component: () => import('../pages/admin/training/AdminPresenceListPage.vue')
      },
      {
        path: 'presence/planning',
        name: 'admin_presence_planning',
        component: () => import('../pages/admin/training/AdminPresencePlanningPage')
      },
      {
        path: 'presence/details/:when',
        name: 'admin_presence_details',
        component: () => import('../pages/admin/training/AdminPresenceDetailsPage.vue')
      },
      {
        path: 'presence',
        redirect: { name: 'admin_presence_planning' },
        name: 'admin_presence'
      },
      {
        path: 'presence/update/:id',
        name: 'admin_presence_update',
        component: () => import('../pages/admin/training/AdminPresenceUpdatePage')
      },
      {
        path: 'equipment/create',
        name: 'admin_equipment_create',
        component: () => import('../pages/admin/equipment/AdminEquipmentNewTypePage')
      },
      {
        path: 'events',
        name: 'admin_events',
        component: () => import('../pages/admin/event/AdminEventsPage.vue')
      },
      {
        path: 'newEvent',
        name: 'admin_events_new',
        component: () => import('../pages/admin/event/AdminEventNewPage.vue')
      },
      {
        path: 'equipments/add',
        name: 'admin_equipment_add',
        component: () => import('../pages/admin/equipment/AdminEquipmentNewPage')
      },
      {
        path: 'news',
        name: 'admin_news',
        component: () => import('../pages/admin/news/AdminNewsPage.vue')
      },
      {
        path: 'settings',
        redirect: { name: 'admin_settings_club' }
      },
      {
        path: 'settings/club',
        name: 'admin_settings_club',
        component: () => import('../pages/admin/settings/AdminSettingClubPage.vue')
      },
      {
        path: 'settings/register',
        name: 'admin_settings_register',
        component: () => import('../pages/admin/settings/AdminSettingRegisterPage.vue')
      },
      {
        path: 'settings/permissions',
        name: 'admin_settings_permission',
        component: () => import('../pages/admin/settings/AdminSettingPermissionPage.vue')
      },
      {
        path: 'news/create',
        name: 'admin_news_create',
        component: () => import('../pages/admin/news/AdminNewsCreatePage.vue')
      },
      {
        path: 'news/modify/:id',
        name: 'admin_news_modify',
        component: () => import('../pages/admin/news/AdminNewsModifyPage.vue')
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
