<template>
  <div>
    <div class="text-h6">
      Accorder les permissions administrateurs
    </div>
    <admin-permissions-table
      :accounts="accounts"
      title="Choisir les administrateurs du site"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AdminPermissionsTable from './AdminPermissionsTable';

export default {
  name: 'AdminSettingPermissions',
  components: { AdminPermissionsTable },

  computed: {
    ...mapState({
      accounts: (state) => state.members.accounts
    })
  },

  mounted() {
    this.fetchAccounts();
  },

  methods: {
    ...mapActions(['fetchAccounts'])
  }
};
</script>

<style scoped>

</style>
