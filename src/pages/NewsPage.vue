<template>
  <q-page>
    <div class="row justify-center q-mx-sm">
      <div class="page-padded col-12 col-md-8">
        <div class="text-h5 q-mb-md">
          Actualités
        </div>
        <q-separator class="separator-margin" />

        <div class="row q-col-gutter-md">
          <div
            v-for="news in sortedNews"
            :key="news.uid"
            class="col-12 col-md-4"
            @click.prevent="onClickNews(news.uid)"
          >
            <news-card
              :title="news.title"
              :content="news.text"
              :date="news.date"
              :img-src="news.imgURL"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NewsCard from '../components/NewsCard';

export default {
  name: 'NewsPage',
  components: { NewsCard },
  computed: {
    ...mapState({
      news: (state) => state.news.news
    }),

    sortedNews() {
      const newsCopy = Array.from(this.news);
      newsCopy.sort((news1, news2) => {
        if (news1.date > news2.date) {
          return -1;
        }
        return 1;
      });

      return newsCopy;
    }
  },

  beforeMount() {
    this.fetchNews();
  },

  methods: {
    ...mapActions(['fetchNews']),

    onClickNews(id) {
      this.$router.push({ name: 'news_details', params: { id } });
    }
  }
};
</script>

<style>
  .separator-margin {
    margin-bottom: 1rem;
  }
</style>
