<template>
  <q-badge
    class="my-event justify-center ellipsis cursor-pointer"
    :class="badgeClass"
    :style="badgeStyles"
    @click="onClick"
  >
    <div>
      {{ title }} <br>
      {{ description }}
    </div>
  </q-badge>
</template>

<script>
import { date } from 'quasar';

export default {
  name: 'CalendarEvent',

  props: {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    event: {
      type: Object,
      required: true
    },

    timeStartPos: {
      type: Function,
      required: true
    },

    timeDurationHeight: {
      type: Function,
      required: true
    },

    color: {
      type: String,
      required: false,
      default: 'text-white'
    },

    bgColor: {
      type: String,
      required: false,
      default: 'bg-primary'
    }
  },

  computed: {
    // <editor-fold desc="badgeStyles" defaultstate="collapsed">
    badgeStyles() {
      const time = this.event.timetable.start.full;
      const duration = date.getDateDiff(
        date.buildDate({ hours: this.event.timetable.end.hour, minutes: this.event.timetable.end.minute }),
        date.buildDate({ hours: this.event.timetable.start.hour, minutes: this.event.timetable.start.minute }),
        'minutes'
      );
      const s = {};
      if (this.timeStartPos) {
        s.top = `${this.timeStartPos(time)}px`;
      }
      if (this.timeDurationHeight) {
        s.height = `${this.timeDurationHeight(duration)}px`;
      }
      return s;
    },
    // </editor-fold>,

    // <editor-fold desc="badgeClass" defaultstate="collapsed">
    badgeClass() {
      return `${this.color} ${this.bgColor}`;
    }
    // </editor-fold>
  },

  methods: {
    onClick() {
      this.$emit('onClickEvent', this.event);
    }
  }
};
</script>

<style scoped>
  .my-event {
    width: 100%;
    position: absolute;
    font-size: 12px;
  }
</style>
