<template>
  <q-page class="q-ma-md">
    <h5 class="text-h5 q-my-md">
      Planning des cours
    </h5>
    <admin-presence-planning-table
      v-for="day in listTrainingDay"
      :key="day.id"
      :title="day.day"
      :trainings="day.trainings"
    />
    <div
      align="right"
    >
      <q-btn
        class="q-my-md"
        color="admin-primary"
        outline
        label="retour"
        @click="onCancelClick"
      />
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import { date } from 'quasar';
import AdminPresencePlanningTable from '../components/AdminPresencePlanningTable';

const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

export default {
  name: 'AdminPresencePlanningPage',
  components: { AdminPresencePlanningTable },
  computed: {
    ...mapState({
      trainings: (state) => state.trainings.trainings
    }),

    listTrainingDay() {
      const trainingsId = [];
      const listTraining = [];
      const copyTrainings = Array.from(this.trainings);
      copyTrainings.forEach((training) => {
        if (!trainingsId.includes(training.internalId)) {
          trainingsId.push(training.internalId);
          listTraining.push({
            internalId: training.internalId,
            day: days[training.startDate.getDay()],
            hours: {
              start: date.formatDate(training.startDate, 'HH:mm'),
              end: date.formatDate(training.endDate, 'HH:mm')
            },
            students: training.students
          });
        }
      });


      const perDay = [];
      listTraining.forEach((training) => {
        const goodDay = perDay.find((day) => day.day === training.day);
        if (goodDay === undefined) {
          perDay.push({
            day: training.day,
            trainings: [training],
            id: perDay.length + 1,
            position: days.indexOf(training.day)
          });
        } else {
          goodDay.trainings = [...goodDay.trainings, training];
        }
      });

      perDay.sort((a, b) => (a.position > b.position ? 1 : -1));
      return perDay;
    }
  },

  methods: {
    onCancelClick() {
      this.$router.push({ name: 'admin_presence' });
    }
  }
};
</script>

<style scoped>

</style>
