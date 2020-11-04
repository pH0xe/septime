<template>
  <q-page class="q-ma-md q-my-lg">
    <h5 class="text-h4 q-my-md">
      Permission et administrateur
    </h5>
    <admin-setting-permissions />
  </q-page>
</template>
<script>
import { mapActions } from 'vuex';
import AdminSettingPermissions from '../components/AdminSettingPermissions';

export default {
  name: 'AdminSettingPermissionPage',
  components: { AdminSettingPermissions },

  data: () => ({
    tab: 'club'
  }),

  beforeMount() {
    this.fetchMembers();
  },

  methods: {
    ...mapActions(['fetchMembers'])
  },

  meta: {
    title: 'Admin - Paramètres'
  }
};
</script>
