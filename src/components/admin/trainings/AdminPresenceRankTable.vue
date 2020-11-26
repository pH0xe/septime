<template>
  <q-table
    :columns="columns"
    :data="members"
    :title="title"
    hide-bottom
    flat
    bordered
    :pagination.sync="pagination"
    :sort-method="customSort"
  />
</template>

<script>

const columns = [
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
    field: 'here',
    sortable: false,
    label: 'Présent',
    align: 'left'
  },
  {
    name: 'late',
    field: 'late',
    sortable: false,
    label: 'Retard',
    align: 'left'
  },
  {
    name: 'absent',
    field: 'absent',
    sortable: false,
    label: 'Absent',
    align: 'left'
  }
];


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
    columns() {
      return columns;
    }
  },

  methods: {
    customSort(rows, sortBy, descending) {
      const data = [...rows];
      data.sort((a, b) => {
        const x = descending ? b : a;
        const y = descending ? a : b;
        // numeric sort
        return (parseFloat(x.here) - parseFloat(y.here))
            || (parseFloat(y.late) - parseFloat(x.late))
            || (parseFloat(y.absent) - parseFloat(x.absent));
      });
      return data;
    }
  }
};
</script>

<style scoped>

</style>
