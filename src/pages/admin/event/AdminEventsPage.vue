<template>
  <q-page class="page-padded">
    <page-title title="Événements" />
    <div class="row items-center q-pb-lg">
      <q-btn
        label="Ajouter"
        icon-right="mdi-plus"
        color="admin-primary"
        @click="$router.push('newEvent')"
      />
      <div class="col">
        <q-input
          v-model="searchQuery"
          color="admin-primary"
          type="search"
          label="Rechercher..."
          class="q-ml-md"
        >
          <template v-slot:append>
            <q-icon name="mdi-magnify" />
          </template>
        </q-input>
      </div>
    </div>
    <admin-event-table
      :filter-input="searchQuery"
      :events="events"
      :members="members"
    />
  </q-page>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import AdminEventTable from '../../../components/admin/event/AdminEventTable';
import PageTitle from '../../../components/utils/PageTitle';

export default {
  name: 'EventPage',
  components: { PageTitle, AdminEventTable },

  data: () => ({
    searchQuery: ''
  }),

  computed: {
    ...mapState({
      events: (state) => state.events.events,
      members: (state) => state.members.members
    })
  },

  beforeMount() {
    this.fetchEvents();
    this.fetchMembers();
  },

  methods: {
    ...mapActions(['fetchEvents', 'fetchMembers'])
  },

  meta: {
    title: 'Admin - Événements'
  }

};
</script>
