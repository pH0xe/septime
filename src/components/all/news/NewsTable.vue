<template>
  <q-table
    :data="news"
    :columns="columns"
    :pagination.sync="pagination"
    :rows-per-page-options="[0]"
    flat
    bordered
    clickable
    :to="{name: 'member_news'}"
  >
    <template v-slot:body="props">
      <q-tr>
        <q-td
          key="title"
          :props="props"
        >
          {{ props.row.title }}
        </q-td>
        <q-td
          key="date"
          :props="props"
        >
          {{ props.row.date }}
        </q-td>
        <q-td
          key="watch"
          :props="props"
        >
          <q-btn
            round
            flat
            color="primary"
            icon="mdi-file-document-box"
            @click="watchNews(props.row)"
          />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
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
    sortable: true
  },
  {
    name: 'watch',
    align: 'right',
    sortable: false
  }

];

export default {
  name: 'NewsTable',

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
    watchNews(row) {
      this.$router.push({ name: 'news_article', params: { news: row } });
    }
  }
};
</script>

<style scoped>

</style>
