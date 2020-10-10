<template lang="html">
  <q-page>
    <daykeep-calendar
      :allow-editing="false"
      :event-array="copyEvents"
      event-ref="calendarEvent"
      :prevent-event-detail="true"
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
import EventMoreInformation from '../components/EventMoreInformation';

export default {
  name: 'CalendarPage',
  components: { DaykeepCalendar },

  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser,
      eventsCalendar: (state) => JSON.parse(JSON.stringify(state.calendar.eventsCalendar)),
      trainingsCalendar: (state) => JSON.parse(JSON.stringify(state.calendar.trainingsCalendar))
    }),

    ...mapGetters(['isLoggedIn']),

    copyEvents() {
      // prepare event to calendar format
      const copyEvent = Array.from(this.eventsCalendar);

      // prepare trainings to calendar format if user is logged in
      let copyTrainings = [];
      if (!this.isLoggedIn) {
        return copyEvent;
      }

      copyTrainings = Array.from(this.trainingsCalendar);

      // filter trainings to display only trainings where currentUser is register
      copyTrainings = copyTrainings
        .filter((t) => t.students
          .find((s) => s.uid === this.currentUser.uid));


      // concat events and trainings and return them
      return copyEvent.concat(copyTrainings);
    }
  },

  created() {
    this.$root.$on(
      'click-event-calendarEvent',
      this.onCalendarClick
    );
  },
  beforeDestroy() {
    this.$root.$off(
      'click-event-calendarEvent',
      this.onCalendarClick
    );
  },

  beforeMount() {
    this.fetchEventsCalendar();
    this.fetchTrainingCalendar();
  },

  methods: {
    ...mapActions(['fetchEventsCalendar', 'fetchTrainingCalendar']),

    onCalendarClick(event) {
      if (event.origin.neededRole) {
        this.$q.dialog({
          component: EventMoreInformation,
          parent: this,
          event: event.origin
        });
      } else {
        this.$q.dialog({
          component: EventMoreInformation,
          parent: this,
          event: event.origin,
          isTraining: true
        });
      }
    }
  },

  meta: {
    title: 'Calendrier'
  }
};
</script>
