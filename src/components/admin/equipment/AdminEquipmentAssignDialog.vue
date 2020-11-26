<template>
  <q-dialog
    ref="dialog"
    maximized
    @hide="hide"
  >
    <q-card>
      <q-bar
        class="bg-admin-primary"
      >
        <q-space />
        <q-btn
          v-close-popup
          dense
          flat
          icon="mdi-close"
          color="white"
        />
      </q-bar>

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

      <q-table
        :data="users"
        :columns="columns"
        selection="single"
        row-key="uid"
        :selected.sync="memberChoice"
        :pagination.sync="pagination"
        :rows-per-page-options="[0]"
        :filter="searchQuery"
        :filter-method="filterUsers"
      >
        <template v-slot:body-cell-memberAvatar="props">
          <q-td
            :props="props"
            auto-width
          >
            <q-avatar>
              <img
                v-if="props.row.memberAvatar"
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
      </q-table>

      <q-card-actions align="right">
        <q-btn
          color="admin-primary"
          flat
          label="Assigner"
          @click="onClickOk"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

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
  name: 'AdminEquipmentAssignDialog',
  props: {
    users: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    memberChoice: [],
    pagination: {
      rowsPerPage: 0
    },
    searchQuery: ''
  }),

  computed: {
    member() {
      return this.memberChoice[0];
    },
    columns() {
      return columns;
    }
  },

  methods: {
    show() {
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialog.hide();
    },
    onClickOk() {
      if (this.member) {
        this.$emit('ok', this.member.uid);
        this.hide();
      }
    },
    getBadgeColorFor(group) {
      switch (group) {
        case Group.M5:
          return 'red';
        case Group.M7:
          return 'purple';
        case Group.M9:
          return 'indigo';
        case Group.M11:
          return 'light-blue';
        case Group.M13:
          return 'teal';
        case Group.M15:
          return 'orange';
        case Group.M17:
          return 'brown';
        case Group.M20:
          return 'blue-grey';
        case Group.SENIORS:
          return 'cyan';
        case Group.VETERANS1:
        case Group.VETERANS2:
        case Group.VETERANS3:
        case Group.VETERANS4:
          return 'grey';
        default:
          return 'null';
      }
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
    }
  }
};
</script>

<style scoped>

</style>
