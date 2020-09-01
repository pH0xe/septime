<template>
  <q-table
    :data="news"
    :columns="columns"
    :pagination.sync="pagination"
    :rows-per-page-options="[0]"
    flat
    bordered
    hide-bottom
    row-key="uid"
    :filter="search"
    :filter-method="filterNews"
  >

    <template v-slot:top>
      <q-space />
      <q-btn
        flat
        round
        icon="mdi-refresh"
        @click="onClickRefreshTable"
      />
    </template>

    <template v-slot:body="props">
      <q-tr>
        <q-td
          key="title"
          :props="props"
        >
          {{ props.row.title }}
          <q-btn
            dense
            round
            flat
            :icon="props.expand ? 'arrow_drop_up' : 'arrow_drop_down'"
            @click="props.expand = !props.expand"
          />
        </q-td>
        <q-td
          key="date"
          :props="props"
        >
          {{ props.row.date | dateDMY }}
        </q-td>
        <q-td
          key="type"
          :props="props"
        >
          {{ getTypeLabel(props.row.type) }}
        </q-td>
        <q-td
          key="modify"
          :props="props"
        >
          <q-btn
            round
            flat
            color="admin-primary"
            icon="mdi-pencil"
            @click="updateNews(props.row.uid)"
          />
          <q-btn
            round
            flat
            color="negative"
            icon="mdi-delete"
            @click="deleteThisNews(props.row)"
          />
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand">
        <q-td colspan="100%">
          <div v-html="props.row.text" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { mapActions } from 'vuex';
import { NewsType } from '../js/newsType';


const columns = [
  {
    name: 'title',
    label: 'Titre',
    align: 'left',
    field: 'title',
    sortable: true
  },
  {
    name: 'date',
    label: 'Date',
    align: 'left',
    field: 'date',
    sortable: true
  },
  {
    name: 'type',
    label: 'Type',
    align: 'left',
    field: 'type',
    sortable: true
  },
  {
    name: 'modify',
    align: 'right',
    sortable: false
  }
];

export default {
  name: 'AdminNewsTable',

  props: {
    news: {
      type: Array,
      required: true
    },

    search: {
      type: String,
      required: true
    }
  },

  data: () => ({
    pagination: {
      rowsPerPage: 0,
      sortBy: 'date',
      descending: true
    }
  }),

  computed: {
    columns() {
      return columns;
    }
  },

  methods: {
    ...mapActions(['fetchNews', 'deleteNews']),

    deleteThisNews(row) {
      this.deleteNews({ news: row });
      this.$q.loading.show({ message: 'Suppression de la news en cours...' });
      setTimeout(() => {
        this.$q.loading.hide();
        this.fetchNews();
      }, 3000);
    },

    updateNews(uid) {
      this.$router.push({ name: 'admin_news_modify', params: { id: uid } });
    },

    filterNews(rows, lookFor) {
      // Sanitize input
      lookFor = lookFor.toLowerCase();

      // Copy the rows to work on them
      let results = rows;
      results = results
        .filter((result) => result.type.toLowerCase() === lookFor);

      // Return them
      return results;
    },

    getTypeLabel(type) {
      switch (type) {
        case NewsType.NEWS:
          return 'Actualité';
        case NewsType.FFE:
          return 'FFE';
        case NewsType.USEFUL:
          return 'Info pratique';
        case NewsType.STORE:
          return 'Boutique';
        default:
          return 'Autre';
      }
    },

    onClickRefreshTable() {
      this.fetchNews();
    }
  }
};
</script>

<style scoped>

</style>
