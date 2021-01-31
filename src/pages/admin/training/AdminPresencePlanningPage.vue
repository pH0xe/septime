<template>
  <q-page class="page-padded">
    <page-title title="Planning des cours" />
    <admin-presence-planning-calendar
      :trainings="trainings"
    />
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AdminPresencePlanningCalendar from '../../../components/admin/trainings/AdminPresencePlanningCalendar';
import PageTitle from '../../../components/utils/PageTitle';

export default {
  name: 'AdminPresencePlanningPage',
  components: { PageTitle, AdminPresencePlanningCalendar },
  computed: {
    ...mapState({
      trainings: (state) => JSON.parse(JSON.stringify(state.trainings.trainingsPlanning)) // Deep copy of training (avoid mutating due to dayKeep calendar
    })
  },

  beforeMount() {
    this.fetchTrainingsPlanning();
  },

  methods: {
    ...mapActions(['fetchTrainingsPlanning'])
  },

  meta: {
    title: 'Admin - Entraînements'
  }
};
</script>

<style scoped>

</style>
