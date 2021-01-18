<template>
  <q-table
    :data="members"
    :columns="columns"
    row-key="uid"
    selection="multiple"
    :selected.sync="selectedMembers"
    :pagination="pagination"
    :filter="filterInput"
    :filter-method="filterGroups"
    flat
    bordered
  >
    <template v-slot:top>
      <h5 class="q-ma-none">
        Adhérents de ce cours
      </h5>
      <q-space />
      <q-toggle
        v-model="onlyActive"
        class="q-mr-sm"
        label="Afficher uniquement les membre activé"
        color="positive"
      />
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
          :color="badgeColor(props.row.group)"
          :label="props.row.group"
        />
      </q-td>
    </template>

    <template v-slot:body-cell-is-active="props">
      <q-td :props="props">
        <q-badge
          v-if="props.row.isActive"
          color="positive"
          label="Oui"
        />
        <q-badge
          v-else
          color="negative"
          label="Non"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { Group } from '../../../js/Group';

export default {
  name: 'AdminPresenceMemberUpdateTable',

  props: {
    members: {
      type: Array,
      required: true
    },
    training: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    selectedMembers: [],
    pagination: {
      rowsPerPage: 10,
      sortBy: 'lastName'
    },
    searchString: '',
    onlyActive: false
  }),

  computed: {
    // <editor-fold desc="columns" defaultstate="collapsed">
    columns() {
      return [
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
        },
        {
          name: 'is-active',
          sortable: false,
          align: 'left',
          field: 'isActive',
          label: 'Compte Validé ?'
        }
      ];
    },
    // </editor-fold>

    // <editor-fold desc="filterInput" defaultstate="collapsed">
    filterInput() {
      return `${this.training.group.toString()},${this.searchString}`;
    }
    // </editor-fold>
  },

  mounted() {
    this.training.members.forEach((student) => {
      const member = this.members.find((m) => m.parentUid === student.parentUid && m.uid === student.uid);
      if (member) this.selectedMembers.push(member);
    });
  },

  methods: {
    filterGroups(rows, lookFor) {
      let filteredMembers;

      if (this.onlyActive) {
        filteredMembers = this.members.filter((member) => member.isActive === true);
      } else {
        filteredMembers = this.members;
      }

      let results = [];
      lookFor = lookFor.split(',');

      const groups = lookFor.filter((word) => Group.groupList.includes(word));
      const searchString = lookFor.filter((word) => !Group.groupList.includes(word))[0];

      filteredMembers.forEach((member) => {
        if (groups.includes(member.group)) {
          results.push(member);
        }
      });

      if (searchString.length !== 0) {
        results = results.filter((user) => user.firstName.toLowerCase().includes(searchString.toLowerCase())
          || user.lastName.toLowerCase().includes(searchString.toLowerCase()));
      }
      return results;
    },

    badgeColor(group) {
      return Group.getBadgeColorFor(group);
    }
  }
};
</script>

<style scoped>

</style>
