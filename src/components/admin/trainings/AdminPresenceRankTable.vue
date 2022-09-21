<template>
  <q-table
    :columns="columns"
    :data="members"
    :title="title"
    hide-bottom
    flat
    bordered
    :pagination.sync="pagination"
    :sort-method="rank"
    @row-click="onClickMember"
  />
</template>

<script>

import AdminPresenceMemberDetails from './AdminPresenceMemberDetails';

export default {
  name: 'AdminPresenceRankTable',

  props: {
    title: {
      type: String,
      required: true
    },

    members: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    pagination: {
      sortBy: 'here',
      rowsPerPage: 0,
      descending: true
    }
  }),

  computed: {
    // <editor-fold desc="columns" defaultstate="collapsed">
    columns() {
      return [
        {
          name: 'firstName',
          field: 'firstName',
          sortable: false,
          label: 'Prénom',
          align: 'left'
        },
        {
          name: 'lastName',
          field: 'lastName',
          sortable: false,
          label: 'Nom',
          align: 'left'
        },
        {
          name: 'here',
          field: (row) => row.presence.here,
          format: (val) => `${val.length}`,
          sortable: false,
          label: 'Présent',
          align: 'left'
        },
        {
          name: 'late',
          field: (row) => row.presence.late,
          format: (val) => `${val.length}`,
          sortable: false,
          label: 'Retard',
          align: 'left'
        },
        {
          name: 'absent',
          field: (row) => row.presence.absent,
          format: (val) => `${val.length}`,
          sortable: false,
          label: 'Absent',
          align: 'left'
        }
      ];
    }
    // </editor-fold>
  },

  methods: {
    // <editor-fold desc="rank" defaultstate="collapsed">
    rank(rows) {
      rows = rows.sort((a, b) => {
        if (a.presence.here.length > b.presence.here.length) return -1;
        if (b.presence.here.length > a.presence.here.length) return 1;

        if (a.presence.here.length === b.presence.here.length) {
          if (a.presence.late.length > b.presence.late.length) return 1;
          if (b.presence.late.length > a.presence.late.length) return -1;

          if (a.presence.late.length === b.presence.late.length) {
            if (a.presence.absent.length > b.presence.absent.length) return 1;
            if (b.presence.absent.length > a.presence.absent.length) return -1;
            if (b.presence.absent.length === a.presence.absent.length) return 0;
          }
        }
        return 0;
      });

      return rows;
    },
    // </editor-fold>

    // <editor-fold desc="onClickMember" defaultstate="collapsed">
    onClickMember(event, row) {
      this.$q.dialog({
        component: AdminPresenceMemberDetails,
        parent: this,
        member: row
      });
    }
    // </editor-fold>
  }
};
</script>

<style scoped>

</style>
