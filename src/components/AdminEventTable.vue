<template>
  <div>
    <q-table
      class="full-width q-mb-lg"
      :data="events"
      :filter="filterInput"
      :filter-method="filterEvents"
      :columns="columns"
      :pagination.sync="pagination"
      :dense="$q.platform.is.mobile"
      flat
      bordered
      hide-bottom
      @row-click="toggleDialogEventDetails"
    >
      <template v-slot:body-cell-competition="props">
        <q-td :props="props">
          <q-checkbox
            :value="!!props.row.isCompetition"
            disable
          />
        </q-td>
      </template>
      <template v-slot:body-cell-startDate="props">
        <q-td
          :props="props"
        >
          <div>
            {{ props.row.startDate | dateDMY }} à {{ props.row.startDate | dateHM }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-endDate="props">
        <q-td
          :props="props"
        >
          <div>
            {{ props.row.endDate | dateDMY }} à {{ props.row.startDate | dateHM }}
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { date } from 'quasar';
import AdminEventDetails from './AdminEventDetails';

const columns = [
  {
    name: 'title',
    label: 'Titre',
    align: 'left',
    field: 'title',
    sortable: false
  },
  {
    name: 'competition',
    label: 'Compétition',
    align: 'left',
    field: 'isCompetition'
  },
  {
    name: 'startDate',
    label: 'Date de début',
    align: 'left',
    field: 'startDate',
    sortable: true
  },
  {
    name: 'endDate',
    label: 'Date de fin',
    align: 'left',
    field: 'endDate',
    sortable: true
  }
];

export default {
  name: 'AdminEventTable',

  props: {
    filterInput: {
      type: String,
      default: ''
    },

    events: {
      type: Array,
      required: true
    },

    members: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    text: '',
    pagination: {
      rowsPerPage: 0
    }
  }),

  computed: {
    columns() {
      return columns;
    }
  },

  methods: {
    toggleDialogEventDetails(event, row) {
      this.$q.dialog({
        component: AdminEventDetails,
        parent: this,
        event: row,
        members: this.members
      });
    },

    filterEvents(rows, lookFor) {
      // Sanitize input
      lookFor = lookFor.toLowerCase();

      // Copy the rows to work on them
      let results = rows;

      // Split the search string into words
      // Cut at each sequence of whitespaces
      lookFor.split(/\s+/).forEach((searchWord) => {
        // Affinate the previous results with the current word
        results = results
          .filter(({ title, description }) => (
            title.toLowerCase().includes(searchWord)
            || description.toLowerCase().includes(searchWord)
          ));
      });

      // Return them
      return results;
    },

    getTimeRange(row) {
      const start = row.startDate;
      const end = row.endDate;

      return `${date.formatDate(start, 'HH:mm')} - ${date.formatDate(end, 'HH:mm')}`;
    }
  }


};
</script>

<style scoped>

</style>
