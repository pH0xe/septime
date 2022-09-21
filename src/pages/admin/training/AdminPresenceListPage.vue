<template>
  <q-page class="page-padded">
    <page-title title="Liste d'appel :" />
    <div class="text-h6">
      {{ training.date | dateFull }} de
      {{ training.timetable.start.full.replaceAll(':', 'h') }} à
      {{ training.timetable.end.full.replaceAll(':', 'h') }}
    </div>
    <q-separator />
    <admin-presence-call-list-table
      ref="callList"
      :members="trainingMembers"
      :training="training"
    />
    <div class="q-mt-lg row justify-end items-baseline">
      <q-btn
        label="Annuler"
        color="negative"
        class="col-12 col-md-auto"
        outline
        @click="onCancelClick"
      />
      <q-btn
        label="Valider"
        color="positive"
        class="col-12 col-md-auto q-ml-md q-mt-md"
        @click="onOkClick"
      />
    </div>
  </q-page>
</template>

<script>
import { date, extend } from 'quasar';
import { mapState, mapActions } from 'vuex';
import PageTitle from '../../../components/utils/PageTitle';
import AdminPresenceCallListTable from '../../../components/admin/trainings/AdminPresenceCallListTable';

export default {
  name: 'AdminPresenceListPage',
  components: { AdminPresenceCallListTable, PageTitle },
  data: () => ({
    training: null
  }),

  computed: {
    ...mapState({
      members: (state) => state.members.members
    }),

    date() {
      return date;
    },

    trainingMembers() {
      const result = [];
      this.training.members.forEach((student) => {
        const findUser = this.members.find((user) => user.parentUid === student.parentUid && user.uid === student.uid);
        if (findUser) result.push(extend(true, {}, findUser));
      });
      return result;
    }
  },

  beforeMount() {
    this.training = this.$route.params.train;
    if (!this.training.date) this.$router.push({ name: 'admin_presence' });
    this.fetchMembers();
  },

  methods: {
    ...mapActions(['fetchMembers', 'updateStudentPresence', 'deleteTraining']),

    onOkClick() {
      const { members } = this.$refs.callList;
      this.updateStudentPresence({ members });
      this.$router.push({ name: 'admin_presence' });
    },

    onCancelClick() {
      this.$router.push({ name: 'admin_presence' });
    },

    deleteThisTrainings() {
      this.deleteTraining({ training: this.training }).then(() => {
        this.$router.replace({ name: 'admin_presence' });
      });
    }
  },

  meta: {
    title: 'Admin - Entraînements'
  }
};
</script>

<style scoped>

</style>
