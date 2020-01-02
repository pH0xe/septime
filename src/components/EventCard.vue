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

    <q-card-actions align="right">
      <q-btn
        flat
        icon="mdi-account-check"
        label="Participer"
        @click="handleClickParticipate"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="js">
import EventParticipateDialog from './EventParticipateDialog';

export default {
  name: 'EventCard',
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
    categoryFormatted() {
      return this.category.join(', ');
    },
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
  },
  methods: {
    handleClickParticipate() {
      this.$q.dialog({
        component: EventParticipateDialog,
        parent: this,
        title: this.title
      }).onOk(({ role: { label, value } }) => {
        this.$q.notify({
          message: `Rôle choisi: ${label} => ${value}`,
          position: 'top-right'
        });
      });
    }
  }
};
</script>
