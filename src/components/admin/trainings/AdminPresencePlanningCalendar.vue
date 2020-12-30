<template>
  <div>
    <q-select
      v-model="currentView"
      class="q-my-md"
      :options="[{label: 'Semaine', value: 0}, {label: 'Jours', value: 1}]"
      label="Affichage du planning"
      color="admin-primary"
      filled
      emit-value
      map-options
    />

    <div
      v-if="currentView === 1"
      class="row justify-center q-mb-md"
    >
      <q-btn
        label="Précedent"
        icon="mdi-chevron-left"
        flat
        @click="calendarPrev"
      />
      <q-separator vertical />
      <q-btn
        label="Suivant"
        icon-right="mdi-chevron-right"
        flat
        @click="calendarNext"
      />
    </div>

    <q-calendar
      ref="calendar"
      v-model="selectedDate"
      class="calendar-style"
      :view="view[currentView]"
      :weekdays="[1,2,3,4,5,6,0]"
      hour24-format
      :interval-minutes="30"
      :interval-height="30"
      :interval-start="14"
      :interval-count="34"
    >
      <template #head-day="{ timestamp }">
        <div class="q-pl-sm">
          {{ getWeekday(timestamp.weekday) }}
        </div>
      </template>

      <template #day-body="{ timestamp, timeStartPos, timeDurationHeight }">
        <template v-for="(event, index) in getPlanning(timestamp)">
          <calendar-event
            :key="index"
            :event="event"
            :title="getTitle(event)"
            :description="getDescription(event)"
            :time-duration-height="timeDurationHeight"
            :time-start-pos="timeStartPos"
            bg-color="bg-green-10"
            @onClickEvent="onClickTraining"
          />
        </template>
      </template>
    </q-calendar>
  </div>
</template>

<script>
import { Group } from '../../../js/Group';
import { DateUtils } from '../../../js/DateUtils';
import CalendarEvent from '../../utils/calendarEvent';

export default {
  name: 'AdminPresencePlanningCalendar',
  components: { CalendarEvent },
  props: {
    trainings: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    currentView: 0,
    selectedDate: '',
    pagination: {
      rowsPerPage: 5,
      sortBy: 'startHour',
      descending: true
    }
  }),

  computed: {
    // <editor-fold desc="columns" defaultstate="collapsed">
    columns() {
      return [
        {
          name: 'startHour',
          align: 'left',
          label: 'Heure',
          sortable: false,
          field: 'hours.start'
        },
        {
          name: 'studentNumber',
          align: 'left',
          label: 'Nombre d\'inscrit',
          sortable: false,
          field: 'student'
        }
      ];
    },
    // </editor-fold>

    // <editor-fold desc="view" defaultstate="collapsed">
    view() {
      return ['week', 'day'];
    }
    // </editor-fold>
  },

  methods: {
    // <editor-fold desc="getWeekday" defaultstate="collapsed">
    getWeekday(dayNumber) {
      return DateUtils.locale.days[dayNumber];
    },
    // </editor-fold>

    // <editor-fold desc="getPlanning" defaultstate="collapsed">
    getPlanning(day) {
      return this.trainings[parseInt(day.weekday, 10)];
    },
    // </editor-fold>

    // <editor-fold desc="getAvatar" defaultstate="collapsed">
    getAvatar(groups) {
      return Group.getSmallest(groups);
    },
    // </editor-fold>

    // <editor-fold desc="getTitle" defaultstate="collapsed">
    getTitle(event) {
      return `Catégorie : ${this.getAvatar(event.group)}`;
    },
    // </editor-fold>

    // <editor-fold desc="getDescription" defaultstate="collapsed">
    getDescription(event) {
      return `${event.timetable.start.hour}h${event.timetable.start.minute} - ${event.timetable.end.hour}h${event.timetable.end.minute}`;
    },
    // </editor-fold>

    // <editor-fold desc="Calendar nav" defaultstate="collapsed">
    calendarNext() {
      this.$refs.calendar.next();
    },
    calendarPrev() {
      this.$refs.calendar.prev();
    },
    // </editor-fold>

    onClickTraining(event) {
      // console.log('event: ', event);
      this.$router.push({ name: 'admin_presence_update', params: { id: event.uid } });
    }
  }
};
</script>

<style scoped >
</style>
