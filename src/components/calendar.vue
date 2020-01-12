<template>
  <daykeep-calendar
    :allow-editing="false"
    :event-array="events"
    calendar-locale="fr"
    calendar-timezone="Europe/Paris"
    :tab-labels="{month: 'Mois', week: 'Semaine',
                  threeDay: '3 jours', day: 'Aujourd\'hui', agenda: 'Agenda'}"
  />
</template>

<script>
import { DaykeepCalendar } from '@daykeep/calendar-quasar';

export default {
  name: 'Calendar',

  components: { DaykeepCalendar },

  props: {
    events: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>

</style>
