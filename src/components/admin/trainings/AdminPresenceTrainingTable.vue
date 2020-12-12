<template>
  <q-table
    :pagination="pagination"
    :columns="columns"
    :data="trainings"
    flat
    bordered
    @row-click="onClickTraining"
  >
    <template v-slot:body-cell-startHour="props">
      <q-td
        :props="props"
        class="cursor-pointer"
      >
        {{ ("0" + props.row.timetable.start.hour).slice(-2) }}:{{ ("0" + props.row.timetable.start.minute).slice(-2) }}
      </q-td>
    </template>
    <template v-slot:body-cell-endHour="props">
      <q-td
        :props="props"
        class="cursor-pointer"
      >
        {{ ("0" + props.row.timetable.end.hour).slice(-2) }}:{{ ("0" + props.row.timetable.end.minute).slice(-2) }}
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { date } from 'quasar';
import { DateUtils } from '../../../js/DateUtils';


const columns = [
  {
    name: 'startHour',
    align: 'left',
    label: 'Heure de début',
    sortable: false,
    field: ''
  },
  {
    name: 'endHour',
    align: 'left',
    label: 'Heure de fin',
    sortable: false,
    field: ''
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
    },

    date() {
      return date;
    },

    DateUtils() {
      return DateUtils;
    }
  },

  methods: {
    onClickTraining(event, row) {
      this.$router.push({ name: 'admin_presence_list', params: { id: row.uid } });
    }
  }
};
</script>

  <style scoped />
