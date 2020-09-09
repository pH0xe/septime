<template lang="html">
  <q-page>
    <daykeep-calendar
      :allow-editing="false"
      :event-array="copyEvents"
      calendar-locale="fr"
      calendar-timezone="Europe/Paris"
      :tab-labels="{month: 'Mois', week: 'Semaine',
                    threeDay: '3 jours', day: 'Aujourd\'hui', agenda: 'Agenda'}"
    />
  </q-page>
</template>

<script lang="js">
import { mapState, mapActions, mapGetters } from 'vuex';
import { DaykeepCalendar } from '@daykeep/calendar-quasar';

export default {
  name: 'CalendarPage',
  components: { DaykeepCalendar },

  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser,
      events: (state) => JSON.parse(JSON.stringify(state.calendar.events)),
      trainings: (state) => JSON.parse(JSON.stringify(state.calendar.trainings))
    }),

    ...mapGetters(['isLoggedIn']),

    copyEvents() {
      // prepare event to calendar format
      const copyEvent = Array.from(this.events);

      // prepare trainings to calendar format if user is logged in
      let copyTrainings = [];
      if (!this.isLoggedIn) {
        return copyEvent;
      }

      copyTrainings = Array.from(this.trainings);

      // filter trainings to display only trainings where currentUser is register
      copyTrainings = copyTrainings
        .filter((t) => t.students
          .find((s) => s.uid === this.currentUser.uid));


      // concat events and trainings and return them
      return copyEvent.concat(copyTrainings);
    }
  },

  beforeMount() {
    this.fetchEventsCalendar();
    // this.fetchTrainingCalendar();
  },

  methods: {
    ...mapActions(['fetchEventsCalendar', 'fetchTrainingCalendar']),

    test() {
      console.log(this.calendarEvents);
    }
  },

  meta: {
    title: 'Calendrier'
  }
};
</script>
