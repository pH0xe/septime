<template>
  <q-page class="q-ma-md q-my-lg">
    <h5 class="text-h4 q-my-md">
      Paramètre d'inscription
    </h5>
    <admin-setting-register />
  </q-page>
</template>
<script>
import AdminSettingRegister from '../../../components/admin/settings/AdminSettingRegister';

export default {
  name: 'AdminSettingRegisterPage',
  components: { AdminSettingRegister },

  data: () => ({
    tab: 'club'
  }),

  meta: {
    title: 'Admin - Paramètres'
  }
};
</script>
