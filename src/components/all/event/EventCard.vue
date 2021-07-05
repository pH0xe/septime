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
        <div>
          <q-icon name="mdi-clock-start" />
          Du {{ dateFormatted }} à {{ event.startDate | dateHM }}
        </div>
        <div>
          <q-icon name="mdi-clock-end" />
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
      if (!this.event.registerMember) return true;
      const registerCount = this.event.registerMember.filter((r) => r.parentUid === this.currentUser.uid).length;
      const subUsersCount = this.currentUser?.subUsers?.length || 0;
      return registerCount < subUsersCount;
    }
  },
  methods: {
    handleClickParticipate() {
      this.$q.dialog({
        component: EventParticipateDialog,
        parent: this,
        title: this.event.title,
        roles: this.event.neededRole,
        registerMember: this.event.registerMember
      }).onOk(({ role, member }) => {
        this.isSubscribing = true;
        let newRegisterMember;
        if (this.event.registerMember) {
          newRegisterMember = [...this.event.registerMember, {
            name: `${member.firstName} ${member.lastName}`,
            role: role.name,
            uid: member.uid,
            parentUid: this.currentUser.uid
          }];
        } else {
          newRegisterMember = [{
            name: `${member.firstName} ${member.lastName}`,
            role: role.name,
            uid: member.uid,
            parentUid: this.currentUser.uid
          }];
        }
        this.$store.dispatch('subscribeToEvent', { id: this.event.id, newRegisterMember })
          .then(() => {
            this.isSubscribing = false;
            this.$q.notify({
              message: 'Participation prise en compte !',
              icon: 'mdi-check',
              position: 'bottom'
            });
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
      });
    }
  }
};
</script>
