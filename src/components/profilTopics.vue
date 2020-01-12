<template>
  <div>
    <h5 class="text-h5 q-ma-none q-mt-md q-ml-lg">
      Notification
    </h5>
    <div v-if="ready">
      <div
        v-for="topic in getTopicsOption"
        :key="topic.value"
        class="q-ml-lg q-pt-md"
      >
        <span class="text-weight-bold">
          {{ topic.label }} :
        </span>
        <q-btn
          v-if="!subscribedTopics.includes(topic.value)"
          color="primary"
          label="S'inscrire"
          @click="subscribeTo(topic.value)"
        />
        <q-btn
          v-else
          color="negative"
          label="Se désinscrire"
          @click="unsubscribeFrom(topic.value)"
        />
      </div>
    </div>
    <div
      v-else
      class="q-ml-lg"
    >
      <q-banner
        inline-actions
        class="text-white bg-red"
      >
        Vous devez activer les notification sur le navigateur pour accéder à ces paramètres
        <template v-slot:action>
          <q-btn
            flat
            color="white"
            label="Activer les notifications"
            @click="activeNotification"
          />
        </template>
      </q-banner>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { Notify } from 'quasar';
import { cloudFunctions } from '../boot/firebase';

export default {
  name: 'ProfilTopics',

  props: {
    topics: {
      type: Array,
      required: true
    },
    ready: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  data: () => ({
    subscribedTopics: []
  }),

  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser
    }),

    ...mapGetters(['isMessagingPossible', 'isMessagingReady']),

    getTopicsOption() {
      const opt = [];
      this.topics.forEach((topic) => {
        switch (topic) {
          case 'news':
            opt.push({ label: 'Actualité', value: 'news' });
            break;
          case 'events:common':
            opt.push({ label: 'Évènement', value: 'events:common' });
            break;
          case 'events:m20':
            opt.push({ label: 'Évènement des M20', value: 'events:m20' });
            break;
          default:
        }
      });

      return opt;
    }
  },

  mounted() {
    if (this.currentUser.fcmTopics) {
      this.subscribedTopics = this.currentUser.fcmTopics;
    }
  },

  methods: {
    ...mapActions(['setupMessagingRoutine']),

    subscribeTo(topic) {
      console.log('sub to', topic);
      cloudFunctions.subscribeToTopic({ topic })
        .then(() => {
          Notify.create({
            message: 'Vous vous êtes inscrit avec succès',
            color: 'positive',
            position: 'top'
          });
        })
        .catch(() => {
          Notify.create({
            message: 'Une erreur est survenue',
            color: 'negative',
            position: 'top'
          });
        });
    },

    unsubscribeFrom(topic) {
      console.log('unsub from', topic);
      cloudFunctions.unsubscribeFromTopic({ topic })
        .then(() => {
          Notify.create({
            message: 'Vous vous êtes désinscrit avec succès',
            color: 'positive',
            position: 'top'
          });
        })
        .catch(() => {
          Notify.create({
            message: 'Une erreur est survenue',
            color: 'negative',
            position: 'top'
          });
        });
    },

    activeNotification() {
      this.setupMessagingRoutine();
    }
  }
};
</script>

<style scoped>

</style>
