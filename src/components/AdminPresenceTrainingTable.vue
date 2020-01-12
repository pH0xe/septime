<template>
  <q-table
    :title="title"
    :pagination.sync="pagination"
    :rows-per-page-options="[0]"
    :columns="columns"
    :data="trainings"
    hide-bottom
    flat
    bordered
    @row-click="onClickTraining"
  >
    <template v-slot:body-cell-startDate="props">
      <q-td
        :props="props"
      >
        {{ date.formatDate(props.row.startDate, 'dddd DD MMMM, HH:mm - ', {
          days: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
          months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                   'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']}) }}
        {{ date.formatDate(props.row.endDate, 'HH:mm') }}
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { date } from 'quasar';

const columns = [
  {
    name: 'startDate',
    align: 'left',
    label: 'Horaire',
    sortable: true,
    field: 'startDate'
  }
];


export default {
  name: 'AdminPresenceTrainingTable',

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
      rowsPerPage: 0
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
      this.$router.push({ name: 'admin_presence_list', query: { uid: row.uid } });
    }
  }
};
</script>

  <style scoped />
