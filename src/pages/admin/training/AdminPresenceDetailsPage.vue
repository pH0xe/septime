<template>
  <q-page class="q-ma-md">
    <h5 class="text-h5 q-my-md">
      Entraînements {{ title }}
    </h5>
    <admin-presence-training-table
      :trainings="trainings"
    />
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AdminPresenceTrainingTable from '../../../components/admin/trainings/AdminPresenceTrainingTable';

export default {
  name: 'AdminPresenceDetailsPage',
  components: { AdminPresenceTrainingTable },

  data: () => ({
    title: '',
    period: '',
    trainings: []
  }),

  computed: {
    ...mapState({
      todaysTrainings: (state) => state.trainings.todaysTrainings,
      futurTrainings: (state) => state.trainings.futurTrainings,
      pastTrainings: (state) => state.trainings.pastTrainings
    })
  },

  beforeMount() {
    this.period = this.$route.params.when;
    if (this.period === 'today') {
      this.title = 'd\'aujourd\'hui';
      this.fetchTodaysTrainings().then(() => {
        this.trainings = this.todaysTrainings;
        console.log(this.trainings);
      });
    } else if (this.period === 'futur') {
      this.title = 'futur';
      this.trainings = this.futurTrainings;
    } else if (this.period === 'past') {
      this.title = 'passé';
      this.trainings = this.pastTrainings;
    }
  },

  methods: {
    ...mapActions(['fetchTrainings', 'fetchTodaysTrainings'])
  },

  meta: {
    title: 'Admin - Entraînements'
  }
};
</script>

<style lang="scss" scoped>

</style>
