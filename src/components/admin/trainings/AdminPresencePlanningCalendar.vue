<template>
  <div>
    <daykeep-calendar-multi-day
      :event-array="copyTrainings"
      scroll-height="600px"
      day-cell-height="2"
      day-cell-height-unit="rem"
      event-ref="planningEvent"
      :prevent-event-detail="true"
      calendar-timezone="fr-FR"
      :allow-editing="false"
      :day-display-start-hour="7"
      :force-start-of-week="true"
      :num-days="5"
    />
  </div>
</template>

<script>
import { DaykeepCalendarMultiDay } from '@daykeep/calendar-quasar';

export default {
  name: 'AdminPresencePlanningCalendar',
  components: { DaykeepCalendarMultiDay },
  props: {
    trainings: {
      type: Array,
      required: true
    }
  },

  data: () => ({
  }),

  computed: {
    copyTrainings() {
      return [...this.trainings];
    }
  },

  mounted() {
    console.log(this.trainings);
  },

  methods: {
    onClickTraining(event) {
      // console.log('event: ', event);
      this.$router.push({ name: 'admin_presence_update', params: { id: event.uid } });
    }
  }
};
</script>

<style scoped >
</style>
