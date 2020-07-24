<template lang="html">
  <div class="row items-center justify-center">
    <q-img
      src="statics/banner.png"
      :ratio="ratioMainImage"
    >
      <div class="absolute-full flex flex-center column">
        <h1 class="text-h3 text-uppercase text-weight-light">
          Cercle d'escrime de moirans
        </h1>
      </div>
      <div
        class="absolute-bottom-right text-subtitle2"
        :class="$q.platform.is.mobile? 'small-padding' : undefined"
      >
        <q-btn
          icon="mdi-instagram"
          flat
          label="Instagram"
          type="a"
          href="https://www.instagram.com/escrime_moirans/"
          target="_blank"
          :size="$q.platform.is.mobile? 'sm' : 'md'"
        />
        <q-btn
          icon="mdi-facebook"
          flat
          label="Facebook"
          type="a"
          href="https://fr-fr.facebook.com/CercleEscrimeDeMoirans/"
          target="_blank"
          :size="$q.platform.is.mobile? 'sm' : 'md'"
        />
      </div>
    </q-img>

    <div class="page-padded col-12 col-md-8 q-px-sm">
      <div class="row">
        <div class="col">
          <h5 class="text-h5">
            Dernières actualités du club
            <q-btn
              flat
              icon="mdi-dots-horizontal"
              :to="{ name: 'news' }"
            />
          </h5>
          <q-separator class="separator-margin" />
        </div>
      </div>

      <div class="row q-col-gutter-md">
        <div
          v-for="news in orderedNews"
          :key="news.uid"
          class="col-12 col-md-4"
        >
          <news-card
            :title="news.title"
            :content="news.text"
            :date="news.date"
            :img-src="news.imgURL"
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h5 class="text-h5">
            Dernières actualités FFE
            <q-btn
              flat
              icon="mdi-dots-horizontal"
              :to="{ name: 'news' }"
            />
          </h5>
          <q-separator class="separator-margin" />
        </div>
      </div>

      <div class="row q-col-gutter-md">
        <div
          v-for="news in orderedNewsFFE"
          :key="news.uid"
          class="col-12 col-md-4"
        >
          <news-card
            :title="news.title"
            :content="news.text"
            :date="news.date"
            :img-src="news.imgURL"
          />
        </div>
      </div>

      <template v-if="isLoggedIn && (currentUser.isActive || currentUser.isAdmin)">
        <div class="row">
          <div class="col">
            <h5 class="text-h5">
              Prochains cours
              <q-btn
                flat
                icon="mdi-dots-horizontal"
                :to="{ name: 'calendar' }"
              />
            </h5>
            <q-separator class="separator-margin" />
          </div>
        </div>

        <q-banner
          class="q-mb-md bg-negative text-white"
          rounded
        >
          <span class="text-weight-bold">Rappel important :</span><br>
          Pour le bon déroulement des cours,
          il est demandé à chaque tireurs d'être présent
          15 minutes à l'avance afin de s'équiper.
        </q-banner>

        <div class="row q-col-gutter-md">
          <div
            v-for="training in upcomingTrainings"
            :key="training.uid"
            class="col-12 col-md-4"
          >
            <lesson-card :training="training" />
          </div>
        </div>
      </template>

      <div class="row">
        <div class="col">
          <h5 class="text-h5">
            Prochains événements
            <q-btn
              flat
              icon="mdi-dots-horizontal"
              :to="{ name: 'calendar' }"
            />
          </h5>
          <q-separator class="separator-margin" />
        </div>
      </div>

      <div class="row q-col-gutter-md">
        <div
          v-for="event in upcomingEvents"
          :key="event.uid"
          class="col-12 col-md-4"
        >
          <event-card
            :event="event"
            :members="members"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { mapState, mapGetters, mapActions } from 'vuex';

import { date } from 'quasar';
import NewsCard from '../components/NewsCard';
import LessonCard from '../components/LessonCard';
import EventCard from '../components/EventCard';

export default {
  name: 'HomePage',
  components: { EventCard, LessonCard, NewsCard },

  data: () => ({
    deferredPrompt: null
  }),

  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser,
      news: (state) => state.news.news,
      trainings: (state) => state.trainings.trainings,
      events: (state) => state.events.events,
      newsFFE: (state) => state.news.ffeInfo,
      members: (state) => state.members.members
    }),

    ...mapGetters(['isLoggedIn']),

    orderedNews() {
      const newsCopy = Array.from(this.news);
      newsCopy.sort((news1, news2) => {
        if (news1.date > news2.date) {
          return -1;
        }
        return 1;
      });

      return newsCopy.slice(0, 3);
    },

    orderedNewsFFE() {
      const newsCopy = Array.from(this.newsFFE);
      newsCopy.sort((news1, news2) => {
        if (news1.date > news2.date) {
          return -1;
        }
        return 1;
      });

      return newsCopy.slice(0, 3);
    },

    upcomingTrainings() {
      if (!this.isLoggedIn) {
        return [];
      }

      let filtered = Array.from(this.trainings);
      filtered = filtered.filter((t) => t.endDate > new Date());

      filtered = filtered
        .filter((training) => training.group.includes(this.currentUser.group));

      filtered.sort((t1, t2) => {
        if (t1.startDate < t2.startDate) {
          return -1;
        }
        return 1;
      });

      filtered = filtered.filter((t) => t.students.find((s) => s.uid === this.currentUser.uid));

      return filtered.slice(0, 3);
    },

    upcomingEvents() {
      let copy = Array.from(this.events);

      copy = copy.filter((t) => t.endDate > new Date());

      copy.sort((e1, e2) => {
        if (e1.startDate < e2.startDate) {
          return -1;
        }
        return 1;
      });

      return copy.slice(0, 3);
    },

    ratioMainImage() {
      return this.$q.platform.is.mobile ? 4 / 3 : 1000 / 200;
    }
  },

  async beforeMount() {
    this.fetchNews();
    this.fetchTrainings();
    this.fetchEvents();
    this.fetchMembers();
  },

  mounted() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      let item = localStorage.getItem('doNotInstall');
      item = JSON.parse(item);
      let diff = 0;
      if (item) diff = date.getDateDiff(Date(), item.date, 'days');
      console.log(diff);
      if (!item || diff >= 10) this.showInstallPromotion();
    });
  },

  methods: {
    ...mapActions(['fetchNews', 'fetchTrainings', 'fetchEvents', 'fetchMembers']),

    showInstallPromotion() {
      this.$q.notify({
        message: 'Voulez-vous ajouter l\'application Cercle d\'escrime de Moirans sur votre bureau ?',
        caption: '(Ne prend pas d\'espace mémoire)',
        color: 'secondary',
        icon: 'mdi-help',
        timeout: 0,
        actions: [
          { label: 'Oui, installer', color: 'amber', handler: () => { this.deferredPrompt.prompt(); } },
          {
            label: 'Non',
            color: 'white',
            handler: () => {
              const data = { value: true, date: Date() };
              localStorage.setItem('doNotInstall', JSON.stringify(data));
            }
          }
        ]
      });
    },

    showRefreshNotification() {
      this.$q.notify({
        message: 'Une nouvelle version du site est disponible.',
        caption: 'Voulez-vous rafraichir ?',
        color: 'dark',
        icon: 'mdi-refresh',
        timeout: 0,
        actions: [
          { label: 'Oui', color: 'amber', handler: () => { /* ... */ } },
          { label: 'Non', color: 'white', handler: () => { /* ... */ } }
        ]
      });
    }
  },

  meta: {
    title: 'Accueil'
  }

};
</script>

<style lang="scss" scoped>
  .text-h5 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .separator-margin {
    margin-bottom: 1rem;
  }

  .small-padding {
    padding: 2%;
  }
</style>
