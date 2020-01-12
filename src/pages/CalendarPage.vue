<template lang="html">
  <q-page>
    <calendar
      :events="calendarEvents"
    />
  </q-page>
</template>

<script lang="js">
import { mapState, mapActions } from 'vuex';
import Calendar from '../components/calendar';

export default {
  name: 'CalendarPage',
  components: { Calendar },

  computed: {
    ...mapState({
      calendarEvents: (state) => state.calendar.calendar
    })
  },

  beforeMount() {
    this.fetchEventsCalendar();
    this.fetchTrainingCalendar();
  },

  methods: {
    ...mapActions(['fetchEventsCalendar', 'fetchTrainingCalendar']),

    test() {
      console.log(this.calendarEvents);
    }
  }

};
</script>
