<template>
  <q-page class="q-ma-md">
    <section-title
      text="Planning des cours"
    />
    <admin-presence-planning-calendar
      :trainings="listTrainingDay"
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
      trainings: (state) => state.trainings.trainingsWeekPlanning
    }),

    // <editor-fold desc="listTrainingDay" defaultstate="collapsed">
    listTrainingDay() {
      const days = [[], [], [], [], [], [], []];
      this.trainings.forEach((training) => {
        days[training.day].push(training);
      });
      return days;
    }
    // </editor-fold>
  },

  beforeMount() {
    this.fetchTrainingsWeekPlanning();
  },

  methods: {
    ...mapActions(['fetchTrainingsWeekPlanning']),

    // <editor-fold desc="onCancelClick" defaultstate="collapsed">
    onCancelClick() {
      this.$router.push({ name: 'admin_presence' });
    }
    // </editor-fold>
  },

  meta: {
    title: 'Admin - Entraînements'
  }
};
</script>

<style scoped>

</style>
