<template>
  <div>
    <section-title text="Accorder les permissions administrateurs" />
    <admin-permissions-table
      :accounts="accounts"
      title="Choisir les administrateurs du site"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AdminPermissionsTable from './AdminPermissionsTable';
import SectionTitle from '../../utils/sectionTitle';

export default {
  name: 'AdminSettingPermissions',
  components: { SectionTitle, AdminPermissionsTable },

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
