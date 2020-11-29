<template>
  <q-table
    :title="title"
    :pagination.sync="pagination"
    :rows-per-page-options="[0]"
    :columns="columns"
    :data="trainings"
    flat
    bordered
    class="q-my-md"
    @row-click="onClickTraining"
  >
    <template v-slot:body-cell-startHour="props">
      <q-td
        :props="props"
        class="cursor-pointer"
        auto-width
      >
        {{ props.row.hours.start }} - {{ props.row.hours.end }}
      </q-td>
    </template>
    <template v-slot:body-cell-studentNumber="props">
      <q-td
        :props="props"
        class="cursor-pointer"
        auto-width
      >
        {{ props.row.students.length }}
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { date } from 'quasar';

const columns = [
  {
    name: 'startHour',
    align: 'left',
    label: 'Heure',
    sortable: false,
    field: 'hours.start'
  },
  {
    name: 'studentNumber',
    align: 'left',
    label: 'Nombre d\'inscrit',
    sortable: false,
    field: 'student'
  }
];


export default {
  name: 'AdminPresencePlanningTable',

  props: {
    title: {
      type: String,
      required: true
    },

    trainings: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    pagination: {
      rowsPerPage: 5,
      sortBy: 'startHour',
      descending: true
    }
  }),

  computed: {
    columns() {
      return columns;
    },

    date() {
      return date;
    }
  },

  methods: {
    onClickTraining(event, row) {
      this.$router.push({ name: 'admin_presence_update', params: { id: row.internalId } });
    }
  }
};
</script>

<style scoped />
