<template>
  <q-page class="q-ma-md">
    <h5 class="text-h5 q-my-md">
      Liste des membres
    </h5>
    <div class="row q-mb-md">
      <q-btn
        class="col-12 col-md-auto q-mb-sm q-mr-sm"
        label="Ajouter"
        icon-right="mdi-plus"
        color="admin-primary"
        @click="openDialogMemberNew"
      />
      <div class="col">
        <q-input
          v-model="searchQuery"
          color="admin-primary"
          type="search"
          label="Rechercher..."
          class="col-12 col-md-auto q-mb-sm q-mr-sm"
        >
          <template v-slot:append>
            <q-icon name="mdi-magnify" />
          </template>
        </q-input>
      </div>
    </div>
    <admin-member-table
      :filter-input="searchQuery"
      :users="membersInactive"
      title="Comptes en attente de validation"
    />
    <admin-member-table
      :filter-input="searchQuery"
      :users="membersActive"
      title="Comptes validé et administrateur"
    />
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AdminMemberTable from '../components/AdminMemberTable';
import AdminMemberNew from '../components/AdminMemberNew';

export default {
  name: 'AdminMemberPage',
  components: { AdminMemberTable },
  data: () => ({
    searchQuery: ''
  }),

  computed: mapState({
    membersActive: (state) => state.members.membersActive,
    membersInactive: (state) => state.members.membersInactive
  }),

  beforeMount() {
    this.fetchMembers();
  },

  methods: {
    ...mapActions(['fetchMembers']),

    openDialogMemberNew() {
      this.$q.dialog({
        component: AdminMemberNew,
        parent: this
      });
    }
  },

  meta: {
    title: 'Admin - Membres'
  }
};


</script>

<style lang="scss" scoped>

</style>
