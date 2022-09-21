<template>
  <q-table
    :data="members"
    :columns="columns"
    row-key="uid"
    selection="multiple"
    :selected.sync="selectedMembers"
    :pagination="pagination"
    :filter="extendedFilterInput"
    :filter-method="filterGroups"
    flat
    bordered
  >
    <template v-slot:top>
      <h5 class="q-ma-none">
        Adhérents de ce cours
      </h5>
      <q-space />
      <q-input
        v-model="searchString"
        class="col-12 col-md-5"
        label="Rechercher"
        filled
        color="admin-primary"
      >
        <template v-slot:append>
          <q-icon name="mdi-magnify" />
        </template>
      </q-input>
    </template>

    <template v-slot:body-cell-memberAvatar="props">
      <q-td :props="props">
        <q-avatar>
          <img
            v-if="props.row.memberAvatar"
            class="image-cover"
            :src="props.row.memberAvatar"
          >
          <q-img
            v-else
            src="~assets/sad.svg"
          />
        </q-avatar>
      </q-td>
    </template>

    <template v-slot:body-cell-group="props">
      <q-td :props="props">
        <q-badge
          :color="getBadgeColorFor(props.row.group)"
          :label="props.row.group"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script>

import { Group } from '../../../js/Group';

const columns = [
  {
    name: 'memberAvatar',
    field: 'memberAvatar',
    sortable: false,
    align: 'left'
  },
  {
    name: 'firstName',
    field: 'firstName',
    sortable: true,
    align: 'left',
    label: 'Prénom'
  },
  {
    name: 'lastName',
    field: 'lastName',
    align: 'left',
    sortable: true,
    label: 'Nom'
  },
  {
    name: 'group',
    sortable: true,
    align: 'left',
    field: 'group',
    label: 'Catégorie'
  }
];

export default {
  name: 'AdminPresenceMemberTable',

  props: {
    members: {
      type: Array,
      required: true
    },
    filterInput: {
      type: String,
      required: true
    }
  },

  data: () => ({
    selectedMembers: [],
    pagination: {
      rowsPerPage: 10,
      sortBy: 'lastName'
    },
    searchString: ''
  }),

  computed: {
    columns() {
      return columns;
    },

    extendedFilterInput() {
      return `${this.filterInput},${this.searchString}`;
    }
  },

  methods: {
    filterGroups(rows, lookFor) {
      let results = [];
      lookFor = lookFor.split(',');

      const groups = lookFor.filter((word) => Group.groupList.includes(word));
      const searchString = lookFor.filter((word) => !Group.groupList.includes(word))[0];

      this.members.forEach((member) => {
        if (groups.includes(member.group)) {
          results.push(member);
        }
      });

      if (searchString.length !== 0) {
        results = results.filter((user) => user.firstName.toLowerCase().includes(searchString)
          || user.lastName.toLowerCase().includes(searchString));
      }
      return results;
    },

    getBadgeColorFor(group) {
      return Group.getBadgeColorFor(group);
    }
  }
};
</script>

<style scoped>

</style>
