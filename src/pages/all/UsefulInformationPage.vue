<template>
  <q-page>
    <div class="row justify-center q-mx-sm">
      <div class="page-padded col-12 col-md-8">
        <page-title title="Infos pratiques" />
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
import NewsCard from '../../components/all/news/NewsCard';
import PageTitle from '../../components/utils/PageTitle';

export default {
  name: 'UsefulInformationPage',
  components: { PageTitle, NewsCard },

  data: () => ({
    newsTab: 10,
    tab: 'news'
  }),

  computed: {
    ...mapState({
      usefulInfo: (state) => state.news.usefulInfo
    }),

    sortedNews() {
      const newsCopy = Array.from(this.usefulInfo);
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
  },

  meta: {
    title: 'Infos pratiques',
    meta: {
      description: { name: 'description', content: 'Retrouvez toute les informations pratiques du club' }
    }
  }
};
</script>

<style>
  .separator-margin {
    margin-bottom: 1rem;
  }
</style>
