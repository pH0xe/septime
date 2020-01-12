<template>
  <q-page>
    <div class="row justify-center q-mx-sm">
      <div class="page-padded col-12 col-md-8">
        <template v-if="currentNews">
          <div class="text-h5 q-mb-md text-capitalize">
            {{ currentNews.title }}
          </div>
          <q-separator class="q-mb-md" />

          <q-img
            :src="currentNews.imgURL ? currentNews.imgURL : 'https://source.unsplash.com/random/400x200'"
            :ratio="5/2"
            class="rounded-borders"
          />
          <q-separator class="q-my-md" />

          <div>
            <q-icon
              name="mdi-clock-outline"
              size="xs"
            />
            <span>
              Le {{ currentNews.date | dateDMY }} à {{ currentNews.date | dateHM }}
            </span>
          </div>
          <q-separator class="q-my-md" />

          <div
            class="text-capitalize"
            v-html="currentNews.text"
          />
        </template>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'NewsArticlePage',

  computed: {
    ...mapState({
      news: (state) => state.news.news
    }),

    currentNews() {
      return this.news.find((aNews) => aNews.uid === this.$route.params.id);
    }
  },

  beforeMount() {
    this.fetchNews();
  },

  methods: {
    ...mapActions(['fetchNews']),

    returnToNews() {
      this.$router.push({ name: 'news' });
    }
  }
};
</script>

<style scoped>
  .separator-margin {
    margin-bottom: 1rem;
  }
</style>
