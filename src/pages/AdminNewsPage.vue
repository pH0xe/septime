<template>
  <q-page class="q-ma-md">
    <h5 class="text-h5 q-my-md">
      Liste des actualités
    </h5>

    <q-select
      v-model="newsTypeSelect"
      class="q-ma-lg"
      :options="newsType"
      map-options
      label="Rechercher par type"
      color="admin-primary"
      emit-value
    >
      <template v-slot:append>
        <q-icon
          v-if="newsTypeSelect !== ''"
          class="cursor-pointer"
          name="mdi-close"
          @click="newsTypeSelect = ''"
        />
      </template>
    </q-select>

    <admin-news-table
      :news="news"
      :search="newsTypeSelect"
    />
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AdminNewsTable from '../components/AdminNewsTable';
import { NewsType } from '../js/newsType';

const newsType = [
  {
    label: 'Info Pratique',
    value: NewsType.USEFUL
  },
  {
    label: 'FFE',
    value: NewsType.FFE
  },
  {
    label: 'Actualité',
    value: NewsType.NEWS
  },
  {
    label: 'Boutique',
    value: NewsType.STORE
  }
];

export default {
  name: 'NewsPage',
  components: { AdminNewsTable },

  data: () => ({
    newsTypeSelect: ''
  }),

  computed: {
    ...mapState({
      news: (state) => state.news.allNews
    }),

    newsType() {
      return newsType;
    }
  },

  beforeMount() {
    this.fetchNews();
  },

  methods: {
    ...mapActions(['fetchNews'])
  }
};
</script>
