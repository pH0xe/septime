<template>
  <q-page class="q-ma-md q-my-lg">
    <h5 class="text-h4 q-my-md">
      Membres du bureau
    </h5>
    <admin-setting-club />
  </q-page>
</template>
<script>
import AdminSettingClub from '../../../components/admin/settings/AdminSettingClub';

export default {
  name: 'AdminSettingClubPage',
  components: { AdminSettingClub },

  data: () => ({
    tab: 'club'
  }),

  meta: {
    title: 'Admin - Paramètres'
  }
};
</script>
