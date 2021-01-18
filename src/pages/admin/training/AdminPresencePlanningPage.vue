<template>
  <q-page class="q-ma-md">
    <section-title
      text="Planning des cours"
    />
    <admin-presence-planning-calendar
      :trainings="trainings"
    />
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AdminPresencePlanningCalendar from '../../../components/admin/trainings/AdminPresencePlanningCalendar';
import SectionTitle from '../../../components/utils/sectionTitle';

export default {
  name: 'AdminPresencePlanningPage',
  components: { SectionTitle, AdminPresencePlanningCalendar },
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
