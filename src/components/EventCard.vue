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
    </q-card-section>

    <q-card-section>
      <div class="row items-center q-gutter-sm">
        <q-icon name="mdi-clock-outline" />
        <div>
          Du {{ dateFormatted }} à {{ event.startDate | dateHM }}
          au {{ endDateFormatted }} à {{ event.endDate | dateHM }}
        </div>
      </div>
    </q-card-section>

    <q-card-actions
      align="right"
    >
      <q-btn
        outline
        color="primary"
        label="information"
        icon="mdi-information"
        @click="onClikMoreInfo"
      />

      <template v-if="$store.getters.isLoggedIn">
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
      </template>
    </q-card-actions>
  </q-card>
</template>

<script lang="js">
import { mapState } from 'vuex';
import EventParticipateDialog from './EventParticipateDialog';
import EventMoreInformation from './EventMoreInformation';

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
    ...mapState({
      currentUser: (state) => state.auth.currentUser
    }),

    dateFormatted() {
      return this.event.startDate.toLocaleString('fr-FR', {
        timeZone: 'Europe/Paris',
        day: '2-digit',
        month: '2-digit'
      });
    },

    endDateFormatted() {
      return this.event.endDate.toLocaleString('fr-FR', {
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
        this.$store.dispatch('subscribeToEvent', { id: this.event.id, role: value, displayName: `${this.currentUser.firstName} ${this.currentUser.lastName}` })
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
    },

    onClikMoreInfo() {
      this.$q.dialog({
        component: EventMoreInformation,
        parent: this,
        event: this.event
      }).onOk(() => {
        console.log('OK');
      }).onCancel(() => {
        console.log('Cancel');
      }).onDismiss(() => {
        console.log('Called on OK or Cancel');
      });
    }
  }
};
</script>
