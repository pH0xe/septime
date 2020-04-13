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
    </q-tabs>

    <q-separator />

    <q-tab-panels
      v-model="tab"
      animated
    >
      <q-tab-panel name="club">
        <admin-setting-club />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>
<script>

import AdminSettingClub from '../components/AdminSettingClub';

export default {
  name: 'SettingPage',
  components: { AdminSettingClub },

  data: () => ({
    tab: 'club'
  })

};
</script>
