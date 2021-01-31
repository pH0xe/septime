<template>
  <q-page class="page-padded">
    <page-title title="Membres du bureau" />

    <admin-setting-club />
  </q-page>
</template>
<script>
import AdminSettingClub from '../../../components/admin/settings/AdminSettingClub';
import PageTitle from '../../../components/utils/PageTitle';

export default {
  name: 'AdminSettingClubPage',
  components: { PageTitle, AdminSettingClub },

  data: () => ({
    tab: 'club'
  }),

  meta: {
    title: 'Admin - Paramètres'
  }
};
</script>
