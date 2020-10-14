<template>
  <q-page>
    <div class="row justify-center q-mx-sm">
      <div class="page-padded col-12 col-md-8">
        <q-splitter
          v-model="newsTab"
          :limits="[10, 10]"
        >
          <template v-slot:before>
            <q-tabs
              v-model="tab"
              vertical
              :class="$q.dark.isActive ? 'text-secondary' : 'text-primary'"
            >
              <q-tab
                name="news"
                icon="mdi-newspaper"
                label="Club"
              />
              <q-tab
                name="ffe"
                icon="mdi-sword-cross"
                label="FFE"
              />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels
              v-model="tab"
              animated
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel name="news">
                <div class="text-h5 q-mb-md">
                  Actualités du club
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
              </q-tab-panel>

              <q-tab-panel name="ffe">
                <div class="text-h5 q-mb-md">
                  Actualités FFE
                </div>
                <q-separator class="separator-margin" />
                <div class="row q-col-gutter-md">
                  <div
                    v-for="news in sortedNewsFFE"
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
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
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

  data: () => ({
    newsTab: 10,
    tab: 'news'
  }),

  computed: {
    ...mapState({
      news: (state) => state.news.news,
      ffeInfo: (state) => state.news.ffeInfo
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
    },

    sortedNewsFFE() {
      const newsCopy = Array.from(this.ffeInfo);
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
    title: 'Actualités',
    meta: {
      description: { name: 'description', content: 'Retrouvez toute les dernières actualités' }
    }
  }
};
</script>

<style>
  .separator-margin {
    margin-bottom: 1rem;
  }
</style>
