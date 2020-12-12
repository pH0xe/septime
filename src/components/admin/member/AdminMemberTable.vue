<template>
  <q-table
    v-if="showTable"
    :title="title"
    :data="users"
    :filter="filterInput"
    :filter-method="filterUsers"
    :columns="columns"
    :pagination="pagination"
    :rows-per-page-options="[10, 20, 0]"
    class="full-width q-mb-lg"
    :dense="$q.platform.is.mobile"
    flat
    bordered
    @row-click="toggleDialogMemberDetails"
  >
    <template v-slot:top>
      <h5 class="text-h5 q-ma-none q-pa-none">
        {{ title }}
      </h5>
      <q-space />
      <q-btn
        flat
        round
        icon="mdi-refresh"
        @click="onClickRefreshTables"
      />
      <q-btn
        flat
        round
        icon="mdi-download"
        @click="onClickDownload"
      />
    </template>

    <template v-slot:body-cell-memberAvatar="props">
      <q-td
        :props="props"
        auto-width
      >
        <q-avatar>
          <img
            v-if="props.row.memberAvatar"
            class="image-cover"
            :src="props.row.memberAvatar"
          >
          <img
            v-else
            src="~assets/sad.svg"
          >
        </q-avatar>
      </q-td>
    </template>
    <template v-slot:body-cell-group="props">
      <q-td
        :props="props"
      >
        <q-badge
          :color="getBadgeColorFor(props.row.group)"
        >
          {{ props.row.group }}
        </q-badge>
      </q-td>
    </template>
    <template v-slot:body-cell-paid="props">
      <q-td
        :props="props"
      >
        <q-badge
          v-if="props.row.payments ? props.row.payments.paid : false"
          color="positive"
        >
          oui
        </q-badge>
        <q-badge
          v-else
          color="negative"
        >
          non
        </q-badge>
      </q-td>
    </template>

    <template v-slot:no-data>
      <div class="full-width row flex-center q-gutter-sm">
        <q-icon
          size="2em"
          name="mdi-emoticon-sad-outline"
        />
        <span>
          Aucun compte validé pour le moment
        </span>
        <q-icon
          size="2em"
          name="mdi-alert"
        />
      </div>
    </template>
  </q-table>
</template>

<script>
import { mapActions } from 'vuex';
import { date } from 'quasar';
import XLSX from 'xlsx';
import AdminMemberDetails from './AdminMemberDetails';
import { Group } from '../../../js/Group';

const columns = [
  {
    name: 'memberAvatar',
    label: 'Photo',
    align: 'left',
    field: 'memberAvatar',
    sortable: false
  },
  {
    name: 'firstName',
    label: 'Prénom',
    align: 'left',
    field: 'firstName',
    sortable: true
  },
  {
    name: 'lastName',
    label: 'Nom',
    align: 'left',
    field: 'lastName',
    sortable: true
  },
  {
    name: 'group',
    label: 'Catégorie',
    align: 'left',
    field: 'group',
    sortable: true
  },
  {
    name: 'paid',
    label: 'Cotisation',
    align: 'left',
    field: 'payment.paid',
    sortable: true
  }
];
export default {
  name: 'AdminMemberTable',
  props: {
    filterInput: {
      type: String,
      default: ''
    },
    users: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    canDownload: {
      type: Boolean,
      required: false,
      default: false
    },
    alwaysShow: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    pagination: {
      rowsPerPage: 10,
      sortBy: 'lastName'
    }
  }),

  computed: {
    columns() {
      return columns;
    },

    showTable() {
      return this.alwaysShow || this.users.length;
    }
  },

  methods: {
    ...mapActions(['fetchMembers']),

    toggleDialogMemberDetails(event, row) {
      this.$q.dialog({
        component: AdminMemberDetails,
        parent: this,
        user: row
      });
    },

    filterUsers(rows, lookFor) {
      // Sanitize input
      lookFor = lookFor.toLowerCase();

      // Copy the rows to work on them
      let results = rows;

      // Split the search string into words
      // Cut at each sequence of whitespaces
      lookFor.split(/\s+/).forEach((searchWord) => {
        // Affinate the previous results with the current word
        results = results
          .filter(({ firstName, lastName, group }) => (
            firstName.toLowerCase().includes(searchWord)
            || lastName.toLowerCase().includes(searchWord)
            || group.toLowerCase().includes(searchWord)
          ));
      });

      // Return them
      return results;
    },

    getBadgeColorFor(group) {
      return Group.getBadgeColorFor(group);
    },

    onClickRefreshTables() {
      this.fetchMembers();
    },

    onClickDownload() {
      /* Champ Obligatoire :
      * - Prénom
      * - Nom
      * - Email
      * - Adresse
      * - Complément d'adresse
      * - Code postal
      * - Ville
      * - Pays
      * - Date de naissance
      * - Téléphone
      * - Sexe
      * - Organisation
      * - Catégorie
      * - Tél en cas d'urgence
      * - Latéralité
      * - Paiement
      * - solde du sur adhesion 2019/2020
      * - Intitulé
      * */

      const items = [];

      this.users.forEach((user) => {
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
  }
};
</script>

<style lang="scss" >
.image-cover {
  object-fit: cover;
}
</style>
