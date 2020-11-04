<template>
  <q-page class="q-ma-md q-my-lg">
    <h5 class="text-h4 q-my-md">
      Membres du bureau
    </h5>
    <admin-setting-club />
  </q-page>
</template>
<script>
import { mapActions } from 'vuex';
import AdminSettingClub from '../components/AdminSettingClub';

export default {
  name: 'AdminSettingClubPage',
  components: { AdminSettingClub },

  data: () => ({
    tab: 'club'
  }),

  beforeMount() {
    this.fetchSettings();
  },

  methods: {
    ...mapActions(['fetchSettings'])
  },

  meta: {
    title: 'Admin - Paramètres'
  }
};
</script>
