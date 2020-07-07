<template>
  <q-table
    title="Selectionner les adhérents pour ce cours"
    :data="members"
    :columns="columns"
    row-key="uid"
    selection="multiple"
    :selected.sync="selectedMembers"
    :pagination.sync="pagination"
    hide-bottom
    :filter="filterInput"
    :filter-method="filterGroups"
    flat
    bordered
  >
    <template v-slot:body-cell-memberAvatar="props">
      <q-td :props="props">
        <q-avatar>
          <q-img
            v-if="props.row.memberAvatar"
            :src="props.row.memberAvatar"
          />
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
          color="info"
          :label="props.row.group"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script>

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
  name: 'AdminPresenceMemberUpdateTable',

  props: {
    members: {
      type: Array,
      required: true
    },
    filterInput: {
      type: String,
      required: true
    },
    selected: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    selectedMembers: [],
    pagination: {
      rowsPerPage: 0
    }
  }),

  computed: {
    columns() {
      return columns;
    }
  },

  mounted() {
    this.selectedMembers = this.selected;
  },

  methods: {
    filterGroups(rows, lookFor) {
      lookFor = lookFor.toLowerCase();
      const results = [];
      lookFor = lookFor.split(',');
      this.members.forEach((member) => {
        if (lookFor.includes(member.group.toLowerCase())) {
          results.push(member);
        }
      });

      return results;
    }
  }
};
</script>

<style scoped>

</style>
