<template>
  <q-page class="q-ma-md">
    <h5 class="text-h5 q-my-md">
      Liste des actualités
    </h5>
    <admin-news-table
      :news="news"
    />
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AdminNewsTable from '../components/AdminNewsTable';


export default {
  name: 'NewsPage',
  components: { AdminNewsTable },

  computed: {
    ...mapState({
      news: (state) => state.news.news
    })
  },

  beforeMount() {
    this.fetchNews();
  },

  methods: {
    ...mapActions(['fetchNews'])
  }
};
</script>
