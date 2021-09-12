<template lang="html">
  <q-page>
    <daykeep-calendar
      class="calendar"
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
import { mapActions, mapState } from 'vuex';
import { DaykeepCalendar } from '@daykeep/calendar-quasar';
import { extend } from 'quasar';
import EventMoreInformation from '../../components/all/event/EventMoreInformation';

export default {
  name: 'CalendarPage',
  components: { DaykeepCalendar },

  computed: {
    ...mapState({
      eventsCalendar: (state) => state.calendar.eventsCalendar
    }),

    copyEvents() {
      // prepare event to calendar format
      return extend(true, [], this.eventsCalendar);
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

  async beforeMount() {
    this.fetchEventsCalendar();
  },

  methods: {
    ...mapActions(['fetchEventsCalendar']),

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
