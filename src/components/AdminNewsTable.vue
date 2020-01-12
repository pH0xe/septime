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
  >
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


const columns = [
  {
    name: 'title',
    label: 'Titre',
    align: 'left',
    field: 'title',
    sortable: false
  },
  {
    name: 'date',
    label: 'Date',
    align: 'left',
    field: 'date',
    sortable: false
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
    }
  },

  data: () => ({
    pagination: {
      rowsPerPage: 0
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
      this.$router.push({ name: 'admin_news_modify', query: { uid } });
    }
  }
};
</script>

<style scoped>

</style>
