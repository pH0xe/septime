<template>
  <q-table
    :title="title"
    :data="accounts"
    :filter="filterInput"
    :filter-method="filterAccounts"
    :columns="columns"
    :pagination="pagination"
    :rows-per-page-options="[10, 20, 0]"
    class="full-width q-mb-lg"
    :dense="$q.platform.is.mobile"
    selection="multiple"
    row-key="email"
    flat
    bordered
  >
    <template v-slot:top>
      <h5 class="text-h5 q-ma-none q-pa-none">
        {{ title }}
      </h5>
      <q-space />
      <q-input
        v-model="filterInput"
        color="admin-primary"
        type="search"
        label="Rechercher..."
        class="col-12 col-md-auto q-mb-sm q-mr-sm"
      >
        <template v-slot:append>
          <q-icon name="mdi-magnify" />
        </template>
      </q-input>
      <q-btn
        flat
        round
        icon="mdi-refresh"
        @click="onClickRefreshTables"
      />
    </template>

    <template v-slot:header-selection>
      Administrateur
    </template>

    <template v-slot:body-selection="scope">
      <q-toggle
        :value="scope.row.isAdmin"
        @input="onChangeValue(scope)"
      />
    </template>
  </q-table>
</template>

<script>
import { mapActions } from 'vuex';
import { QSpinnerPie } from 'quasar';
import { cloudFunctions } from '../boot/firebase';

const columns = [
  {
    name: 'email',
    label: 'Email',
    align: 'left',
    field: 'email',
    sortable: true
  },
  {
    name: 'subUsersName',
    label: 'Adhérent sous ce compte',
    align: 'left',
    field: 'subUsersName',
    sortable: true
  }
];
export default {
  name: 'AdminPermissionsTable',
  props: {
    accounts: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data: () => ({
    pagination: {
      rowsPerPage: 10,
      sortBy: 'email'
    },
    selected: [],
    filterInput: ''
  }),

  computed: {
    columns() {
      return columns;
    }
  },

  methods: {
    ...mapActions(['fetchAccounts', 'setAdmin', 'removeAdmin']),

    logSelected(evt) {
      console.log('event: ', evt);
    },

    filterAccounts(rows, lookFor) {
      // Sanitize input
      lookFor = lookFor.toLowerCase();

      // Copy the rows to work on them
      let results = rows;
      // Split the search string into words
      // Cut at each sequence of whitespaces
      lookFor.split(/\s+/).forEach((searchWord) => {
        if (searchWord === 'admin') {
          results = results
            .filter(({ isAdmin }) => (
              isAdmin === true
            ));
        } else {
          // Affinate the previous results with the current word
          results = results
            .filter(({ subUsersName, email }) => (
              subUsersName?.toLowerCase().includes(searchWord)
              || email.toLowerCase().includes(searchWord)
            ));
        }
      });

      // Return them
      return results;
    },

    onClickRefreshTables() {
      this.fetchAccounts();
    },

    onChangeValue(value) {
      const { isAdmin } = value.row;
      this.$q.loading.show({
        spinnerColor: 'admin-primary',
        spinner: QSpinnerPie,
        message: 'Modification administrateur...'
      });
      this.setAdmin({ member: value.row, value: !isAdmin });
      cloudFunctions.addClaimsAdmin({ uid: value.row.uid, isAdmin: !isAdmin })
        .then(() => {
          this.$q.notify({
            message: 'Rôle modifié avec succès',
            icon: 'mdi-check',
            color: 'positive'
          });
          this.onClickRefreshTables();
          this.$q.loading.hide();
        });
    }
  }
};
</script>
