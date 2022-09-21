<template>
  <q-page class="page-padded">
    <page-title title="Paramètre d'inscription" />
    <admin-setting-register />
  </q-page>
</template>
<script>
import AdminSettingRegister from '../../../components/admin/settings/AdminSettingRegister';
import PageTitle from '../../../components/utils/PageTitle';

export default {
  name: 'AdminSettingRegisterPage',
  components: { PageTitle, AdminSettingRegister },

  data: () => ({
    tab: 'club'
  }),

  meta: {
    title: 'Admin - Paramètres'
  }
};
</script>
