<template>
  <q-page class="q-ma-md">
    <h5 class="text-h5 q-my-md">
      Événements
    </h5>
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
import AdminEventTable from '../components/AdminEventTable';

export default {
  name: 'EventPage',
  components: { AdminEventTable },

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
  }

};
</script>
