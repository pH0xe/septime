<template lang="html">
  <q-card
    flat
    bordered
  >
    <q-card-section>
      <div class="text-h6">
        {{ title }}
      </div>
    </q-card-section>

    <q-card-section>
      <div class="q-gutter-sm q-mb-sm">
        <q-badge
          v-for="category in categories"
          :key="category"
          color="orange"
        >
          {{ category }}
        </q-badge>
      </div>
      <div class="row items-center q-gutter-sm">
        <q-icon name="mdi-clock-outline" />
        <div>
          {{ dateFormatted }}, {{ timeRangeFormatted }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="js">
export default {
  name: 'AdminEventCard',
  props: {
    title: {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    timeRange: {
      type: Array,
      required: true
    }
  },
  computed: {
    dateFormatted() {
      return this.date.toLocaleString('fr-FR', {
        timeZone: 'Europe/Paris',
        day: '2-digit',
        month: '2-digit'
      });
    },
    timeRangeFormatted() {
      return `${this.timeRange[0]}-${this.timeRange[1]}h`;
    }
  }
};
</script>
