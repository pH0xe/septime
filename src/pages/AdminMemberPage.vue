<template>
  <q-page class="q-ma-md">
    <h5 class="text-h5 q-my-md">
      Liste des membres
    </h5>
    <div class="row items-center q-pb-lg">
      <q-btn
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
          class="q-ml-md"
        >
          <template v-slot:append>
            <q-icon name="mdi-magnify" />
          </template>
        </q-input>
      </div>
    </div>
    <admin-member-table
      :filter-input="searchQuery"
    />
  </q-page>
</template>

<script>
import AdminMemberTable from '../components/AdminMemberTable';
import AdminMemberNew from '../components/AdminMemberNew';


export default {
  name: 'MemberPage',
  components: { AdminMemberTable },
  data: () => ({
    searchQuery: ''
  }),
  methods: {
    openDialogMemberNew() {
      this.$q.dialog({
        component: AdminMemberNew,
        parent: this
      });
    }
  }
};


</script>

<style lang="scss" scoped>

</style>
