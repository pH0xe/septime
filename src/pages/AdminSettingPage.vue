<template>
  <q-page>
    <q-tabs
      v-model="tab"
      class="text-admin-primary"
      align="justify"
      narrow-indicator
    >
      <q-tab
        name="club"
        label="Le Club"
      />
      <q-tab
        name="register"
        label="Inscription"
      />
      <q-tab
        name="permissions"
        label="Administrateurs"
      />
    </q-tabs>

    <q-separator />

    <q-tab-panels
      v-model="tab"
      animated
    >
      <q-tab-panel name="club">
        <admin-setting-club />
      </q-tab-panel>
      <q-tab-panel name="register">
        <admin-setting-register />
      </q-tab-panel>
      <q-tab-panel name="permissions">
        <admin-setting-permissions />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>
<script>
import { mapActions } from 'vuex';
import AdminSettingClub from '../components/AdminSettingClub';
import AdminSettingRegister from '../components/AdminSettingRegister';
import AdminSettingPermissions from '../components/AdminSettingPermissions';

export default {
  name: 'SettingPage',
  components: { AdminSettingPermissions, AdminSettingRegister, AdminSettingClub },

  data: () => ({
    tab: 'club'
  }),

  beforeMount() {
    this.fetchSettings();
    this.fetchMembers();
  },

  methods: {
    ...mapActions(['fetchSettings', 'fetchMembers'])
  },

  meta: {
    title: 'Admin - Paramètres'
  }
};
</script>
