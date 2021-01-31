<template>
  <q-page>
    <div class="row justify-center q-mx-sm">
      <div class="page-padded col-12 col-md-8">
        <template v-if="currentNews">
          <page-title
            :title="currentNews.title"
            class="text-capitalize"
          />

          <q-img
            :src="currentNews.imgURL ? currentNews.imgURL : 'https://source.unsplash.com/random/400x200'"
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
            v-html="currentNews.text"
          />
        </template>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PageTitle from '../../../components/utils/PageTitle';

export default {
  name: 'NewsArticlePage',
  components: { PageTitle },
  computed: {
    ...mapState({
      news: (state) => state.news.allNews
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
  },

  meta: {
    title: 'Actualités'
  }
};
</script>

<style scoped>
  .separator-margin {
    margin-bottom: 1rem;
  }
</style>
