<template>
  <div>
    <q-table
      v-if="true"
      title="Comptes en attente de validation"
      :data="users"
      :filter="filterInput"
      :filter-method="filterUsers"
      :columns="columns"
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      class="full-width q-mb-lg"
      :dense="$q.platform.is.mobile"
      flat
      bordered
      @row-click="toggleDialogMemberDetails"
    >
      <template v-slot:body-cell-member-avatar="props">
        <q-td
          :props="props"
          auto-width
        >
          <q-avatar>
            <img :src="props.row.memberAvatar">
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
    </q-table>
    <q-table
      title="Comptes activé"
      :data="users"
      :filter="filterInput"
      :filter-method="filterUsers"
      :columns="columns"
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      class="full-width"
      :dense="$q.platform.is.mobile"
      flat
      bordered
      @row-click="toggleDialogMemberDetails"
    >
      <template v-slot:body-cell-member-avatar="props">
        <q-td
          :props="props"
          auto-width
        >
          <q-avatar>
            <img :src="props.row.memberAvatar">
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
    </q-table>
  </div>
</template>

<script>
import users from '../js/users';
import AdminMemberDetails from '../components/AdminMemberDetails';

const columns = [
  {
    name: 'member-avatar',
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
  }
];
export default {
  name: 'AdminMemberTable',
  props: {
    filterInput: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    text: '',
    pagination: {
      rowsPerPage: 0
    }
  }),

  computed: {
    users() {
      return users;
    },
    columns() {
      return columns;
    }
  },

  methods: {
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
      group = group.toLowerCase();
      switch (group) {
        case 'm5':
          return 'red';
        case 'm7':
          return 'purple';
        case 'm9':
          return 'indigo';
        case 'm11':
          return 'light-blue';
        case 'm13':
          return 'teal';
        case 'm15':
          return 'orange';
        case 'm17':
          return 'brown';
        case 'm20':
          return 'blue-grey';
        case 'senior':
          return 'cyan';
        case group.includes('vétérans'):
          return 'grey';
        default:
          return 'null';
      }
    }
  }
};
</script>

<style scoped>

</style>
