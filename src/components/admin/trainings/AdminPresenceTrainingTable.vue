<template>
  <q-table
    :pagination="pagination"
    :columns="columns"
    :data="trainings"
    flat
    bordered
    @row-click="onClickTraining"
  />
</template>

<script>
import { date } from 'quasar';

const columns = [
  {
    name: 'trainingDate',
    align: 'left',
    label: 'Date',
    sortable: false,
    field: 'date',
    format: (val) => date.formatDate(val, 'DD/MM/YYYY', 'fr')
  },
  {
    name: 'startHour',
    align: 'left',
    label: 'Heure de début',
    sortable: false,
    field: (row) => row.timetable.start.full,
    format: (val) => val.replaceAll(':', 'h')
  },
  {
    name: 'endHour',
    align: 'left',
    label: 'Heure de fin',
    sortable: false,
    field: (row) => row.timetable.end.full,
    format: (val) => val.replaceAll(':', 'h')
  }
];


export default {
  name: 'AdminPresenceTrainingTable',

  props: {
    trainings: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    pagination: {
      rowsPerPage: 0,
      sortBy: 'date'
    }
  }),

  computed: {
    columns() {
      return columns;
    }
  },

  methods: {
    onClickTraining(event, row) {
      this.$router.push({ name: 'admin_presence_list', params: { train: row } });
    }
  }
};
</script>

<style scoped />
