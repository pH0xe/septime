<template>
  <q-page class="page-padded">
    <page-title :title="getTitle" />

    <admin-presence-training-table
      :trainings="trainings"
    />
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { date } from 'quasar';
import AdminPresenceTrainingTable from '../../../components/admin/trainings/AdminPresenceTrainingTable';
import PageTitle from '../../../components/utils/PageTitle';

export default {
  name: 'AdminPresenceDetailsPage',
  components: { PageTitle, AdminPresenceTrainingTable },

  data: () => ({}),

  computed: {
    ...mapState({
      allTrainings: (state) => state.trainings.trainings
    }),

    getTitle() {
      const period = this.$route.params.when;
      let title = '';
      if (period === 'today') {
        title = 'd\'aujourd\'hui';
      } else if (period === 'futur') {
        title = 'futur';
      } else if (period === 'past') {
        title = 'passé';
      }
      return `Entraînements ${title}`;
    },

    trainings() {
      const h0 = {
        hours: 0, minutes: 0, seconds: 0, milliseconds: 0
      };
      const period = this.$route.params.when;
      const today = date.buildDate(h0).getTime();
      if (period === 'today') {
        const res = this.allTrainings.filter((t) => {
          const d = date.adjustDate(t.date.getTime(), h0);
          return d.getTime() === today;
        });
        return res;
      }
      if (period === 'futur') {
        const res = this.allTrainings.filter((t) => {
          const d = date.adjustDate(t.date.getTime(), h0);
          return d.getTime() >= today;
        });
        return res;
      }
      if (period === 'past') {
        const res = this.allTrainings.filter((t) => {
          const d = date.adjustDate(t.date.getTime(), h0);
          return d.getTime() <= today;
        });
        return res;
      }
      return [];
    }
  },

  beforeMount() {
    this.fetchTrainings();
  },

  methods: {
    ...mapActions(['fetchTrainings'])
  },

  meta: {
    title: 'Admin - Entraînements'
  }
};
</script>

<style lang="scss" scoped>

</style>
