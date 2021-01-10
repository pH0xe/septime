<template>
  <div>
    <daykeep-calendar-multi-day
      :event-array="trainings"
      scroll-height="600px"
      day-cell-height="2"
      day-cell-height-unit="rem"
      event-ref="planningEvent"
      :allow-editing="false"
      :day-display-start-hour="7"
      :force-start-of-week="true"
      :num-days="5"
      :prevent-event-detail="true"
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
  },

  mounted() {
    this.$root.$on('click-event-planningEvent', this.onClickTraining);
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
