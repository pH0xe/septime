<template lang="html">
  <q-card
    flat
    bordered
  >
    <q-card-section>
      <div class="text-h6">
        {{ event.title }}
      </div>
    </q-card-section>

    <q-card-section v-if="event.isCompetition">
      <div class="q-gutter-sm q-mb-sm">
        <q-badge
          v-for="category in event.competitionGroup"
          :key="category"
          color="orange"
        >
          {{ category }}
        </q-badge>
      </div>
      <div class="row items-center q-gutter-sm">
        <q-icon name="mdi-clock-outline" />
        <div>
          Le {{ dateFormatted }}, de {{ event.startDate | dateHM }} à {{ event.startDate | dateHM }}
        </div>
      </div>
    </q-card-section>

    <q-card-actions
      v-if="$store.getters.isLoggedIn"
      align="right"
    >
      <q-btn
        v-if="canParticipate"
        :loading="isSubscribing"
        flat
        icon="mdi-account-check"
        label="Participer"
        @click="handleClickParticipate"
      />
      <q-btn
        v-else
        flat
        disable
        icon="mdi-account-check"
        label="Vous participez !"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="js">
import EventParticipateDialog from './EventParticipateDialog';

export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    isSubscribing: false
  }),

  computed: {
    dateFormatted() {
      return this.event.startDate.toLocaleString('fr-FR', {
        timeZone: 'Europe/Paris',
        day: '2-digit',
        month: '2-digit'
      });
    },
    timeRangeFormatted() {
      return `${this.timeRange[0]}-${this.timeRange[1]}h`;
    },
    canParticipate() {
      return !this.event.registerMember?.some(
        (registration) => registration.uid === this.$store.state.auth.currentUser.uid
      );
    }
  },
  methods: {
    handleClickParticipate() {
      this.$q.dialog({
        component: EventParticipateDialog,
        parent: this,
        title: this.event.title,
        roles: this.event.neededRole
      }).onOk(({ role: { value } }) => {
        this.isSubscribing = true;
        this.$store.dispatch('subscribeToEvent', { id: this.event.id, role: value })
          .then(() => {
            this.isSubscribing = false;
            this.$q.notify({
              message: 'Participation prise en compte !',
              icon: 'mdi-check',
              position: 'bottom'
            });

            // TODO: ugly af
            return this.$store.dispatch('fetchEvents');
          })
          .catch((err) => {
            this.$q.notify({
              message: `Une erreur est survenue: ${err.code}`,
              icon: 'mdi-alert',
              position: 'bottom'
            });
          });
      });
    }
  }
};
</script>
