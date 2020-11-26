<template>
  <q-page class="q-ma-md">
    <h5 class="text-h5 q-my-md">
      Présences aux entraînements
    </h5>
    <div class="row q-mb-md">
      <q-btn
        class="col-12 col-md-auto q-mb-sm q-mr-sm"
        label="Nouvel entrainement"
        icon-right="mdi-plus"
        color="admin-primary"
        :to="{ name: 'admin_presence_create'}"
      />
      <q-btn
        class="col-12 col-md-auto q-mb-sm q-mr-sm"
        label="Resultat"
        icon-right="mdi-trophy"
        color="admin-primary"
        :to="{ name: 'admin_presence_result' }"
      />
      <q-btn
        class="col-12 col-md-auto q-mb-sm q-mr-sm"
        label="Planning"
        icon-right="mdi-calendar-clock"
        color="admin-primary"
        :to="{ name: 'admin_presence_planning' }"
      />
      <q-option-group
        v-model="activeTable"
        :options="activeOptions"
        type="checkbox"
        inline
      />
    </div>
    <admin-presence-training-table
      v-if="activeTable.includes('today')"
      title="Aujourd'hui"
      :trainings="todayTrainings"
    />
    <admin-presence-training-table
      v-if="activeTable.includes('futur')"
      class="q-my-md"
      title="Prochain entrainement"
      :trainings="futurTrainings"
    />
    <admin-presence-training-table
      v-if="activeTable.includes('past')"
      title="Entrainement passé"
      :trainings="pastTrainings"
    />
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { date } from 'quasar';
import AdminPresenceTrainingTable from '../../../components/admin/trainings/AdminPresenceTrainingTable';

const activeOptions = [
  { label: 'Aujourd\'hui', value: 'today', color: 'admin-primary' },
  { label: 'Prochain entrainement', value: 'futur', color: 'admin-primary' },
  { label: 'Entrainement passé', value: 'past', color: 'admin-primary' }
];

export default {
  name: 'AdminPresencePage',
  components: { AdminPresenceTrainingTable },

  data: () => ({
    activeTable: ['today', 'futur', 'past']
  }),

  computed: {
    ...mapState({
      members: (state) => state.members.members,
      trainings: (state) => state.trainings.trainings
    }),

    todayTrainings() {
      let results = this.trainings;

      this.trainings.forEach(() => {
        results = results
          .filter(({ startDate }) => (
            date.isSameDate(startDate, new Date(), 'day')
          ));
      });

      return results;
    },

    futurTrainings() {
      let results = this.trainings;

      this.trainings.forEach(() => {
        results = results
          .filter(({ startDate }) => (
            startDate > date.endOfDate(new Date(), 'day')
          ));
      });

      return results;
    },

    pastTrainings() {
      let results = this.trainings;

      this.trainings.forEach(() => {
        results = results
          .filter(({ startDate }) => (
            startDate < date.endOfDate(new Date(), 'day')
          ));
      });

      return results;
    },

    activeOptions() {
      return activeOptions;
    }
  },

  beforeMount() {
    this.fetchTrainings();
    this.fetchMembers();
  },

  methods: {
    ...mapActions(['fetchMembers', 'fetchTrainings'])
  },

  meta: {
    title: 'Admin - Entraînements'
  }
};
</script>

<style lang="scss" scoped>

</style>
