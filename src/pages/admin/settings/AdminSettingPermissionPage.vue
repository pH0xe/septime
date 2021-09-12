<template>
  <q-page class="page-padded">
    <page-title title="Permission et administrateur" />
    <admin-setting-permissions />
    <admin-create-account />
  </q-page>
</template>
<script>
import { mapActions } from 'vuex';
import AdminSettingPermissions from '../../../components/admin/settings/AdminSettingPermissions';
import PageTitle from '../../../components/utils/PageTitle';
import AdminCreateAccount from '../../../components/admin/settings/AdminCreateAccount';

export default {
  name: 'AdminSettingPermissionPage',
  components: { AdminCreateAccount, PageTitle, AdminSettingPermissions },

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
