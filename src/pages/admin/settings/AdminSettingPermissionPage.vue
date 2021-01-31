<template>
  <q-page class="page-padded">
    <page-title title="Permission et administrateur" />
    <admin-setting-permissions />
  </q-page>
</template>
<script>
import { mapActions } from 'vuex';
import AdminSettingPermissions from '../../../components/admin/settings/AdminSettingPermissions';
import PageTitle from '../../../components/utils/PageTitle';

export default {
  name: 'AdminSettingPermissionPage',
  components: { PageTitle, AdminSettingPermissions },

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
