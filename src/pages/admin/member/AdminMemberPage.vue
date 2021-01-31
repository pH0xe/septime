<template>
  <q-page class="page-padded">
    <page-title title="Liste des membres" />
    <div class="row items-center q-mb-md">
      <q-btn
        class="col-12 col-md-auto q-mb-sm q-mr-sm"
        label="Extraire les inscrits"
        icon-right="mdi-download"
        color="admin-primary"
        @click="downloadAll"
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
      :always-show="false"
      title="Comptes en attente de validation"
    />
    <admin-member-table
      :filter-input="searchQuery"
      :users="membersActive"
      :can-download="true"
      :always-show="true"
      title="Comptes validé"
    />
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { date } from 'quasar';
import XLSX from 'xlsx';
import AdminMemberTable from '../../../components/admin/member/AdminMemberTable';
import PageTitle from '../../../components/utils/PageTitle';

export default {
  name: 'AdminMemberPage',
  components: { PageTitle, AdminMemberTable },
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

    downloadAll() {
      const allMembers = [...this.membersActive, ...this.membersInactive];

      const items = [];

      allMembers.forEach((user) => {
        const preparUser = {};
        preparUser['Prénom'] = user.firstName;
        preparUser.Nom = user.lastName;
        preparUser.Email = user.email;
        preparUser.Adresse = `${user.address.street}, ${user.address.city}, ${user.address.zip}, France`;
        preparUser['Date de naissance'] = date.formatDate(user.birthDate, 'DD/MM/YYYY');
        preparUser['Téléphone'] = user.phone;
        preparUser.Sexe = user.gender;
        preparUser['Catégorie'] = user.group;
        preparUser['Tél en cas d\'urgence'] = user.emergency.phone;
        preparUser['Relation contact d\'urgence'] = user.emergency.relation;
        preparUser['Latéralité'] = user.laterality;
        preparUser.Paiement = `${user.payments.amount}€`;

        items.push(preparUser);
      });
      const data = XLSX.utils.json_to_sheet(items);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, data);
      XLSX.writeFile(wb, 'MembresCEM.xlsx');
    }
  },

  meta: {
    title: 'Admin - Membres'
  }
};


</script>

<style lang="scss" scoped>

</style>
