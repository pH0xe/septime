<template>
  <q-page class="q-ma-md">
    <h5 class="text-h5 q-my-md">
      Présences aux entraînements
    </h5>
    <div class="row q-mb-md">
      <q-btn
        class="col-12 col-md-auto q-mr-md"
        label="Nouvel entrainement"
        icon-right="mdi-plus"
        color="admin-primary"
        :to="{ name: 'admin_presence_create'}"
      />
      <q-btn
        class="col-12 col-md-auto q-mr-md"
        label="Resultat"
        icon-right="mdi-trophy"
        color="admin-primary"
        :to="{ name: 'admin_presence_result' }"
      />
    </div>
    <admin-presence-training-table
      title="Aujourd'hui"
      :trainings="todayTrainings"
    />
    <admin-presence-training-table
      class="q-my-md"
      title="Prochain entrainement"
      :trainings="futurTrainings"
    />
    <admin-presence-training-table
      title="Entrainement passé"
      :trainings="pastTrainings"
    />
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { date } from 'quasar';
import AdminPresenceTrainingTable from '../components/AdminPresenceTrainingTable';

export default {
  name: 'AdminPresencePage',
  components: { AdminPresenceTrainingTable },
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
    }
  },

  beforeMount() {
    this.fetchTrainings();
    this.fetchMembers();
  },

  methods: {
    ...mapActions(['fetchMembers', 'fetchTrainings'])
  }
};
</script>

<style lang="scss" scoped>

</style>
