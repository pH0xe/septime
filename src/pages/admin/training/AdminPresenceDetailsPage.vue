<template>
  <q-page class="page-padded">
    <page-title :title="getTitle" />

    <admin-presence-training-table
      :trainings="trainings"
    />
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AdminPresenceTrainingTable from '../../../components/admin/trainings/AdminPresenceTrainingTable';
import PageTitle from '../../../components/utils/PageTitle';

export default {
  name: 'AdminPresenceDetailsPage',
  components: { PageTitle, AdminPresenceTrainingTable },

  data: () => ({
    trainings: []
  }),

  computed: {
    ...mapState({
      todaysTrainings: (state) => state.trainings.todaysTrainings,
      futurTrainings: (state) => state.trainings.futurTrainings,
      pastTrainings: (state) => state.trainings.pastTrainings
    }),

    getTitle() {
      const period = this.$route.params.when;
      let title = '';
      if (period === 'today') {
        title = 'd\'aujourd\'hui';
      } else if (period === 'futur') {
        title = 'futur';
      } else if (period === 'past') {
        title = 'passé';
      }
      return `Entraînements ${title}`;
    }
  },

  methods: {
    ...mapActions(['fetchTrainings'])
  },

  meta: {
    title: 'Admin - Entraînements'
  }
};
</script>

<style lang="scss" scoped>

</style>
