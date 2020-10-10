<template>
  <q-page class="q-ma-md">
    <h5 class="text-h5 q-mt-md q-mb-none">
      Liste d'appel:
    </h5>
    <div class="text-caption q-my-none">
      {{ date.formatDate(training.startDate, 'dddd DD MMMM, HH:mm - ', {
        days: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']}) }}
      {{ date.formatDate(training.endDate, 'HH:mm') }}
    </div>
    <div><span class="text-weight-bold">Lieux : </span> {{ training.location }}</div>
    <div><span class="text-weight-bold">Catégories : </span> {{ training.group.toString() }}</div>
    <admin-presence-call-list-table
      class="q-mt-md"
      :members="trainingMember"
      :training="training"
    />
    <q-card
      flat
      class="q-mt-md"
    >
      <q-card-actions align="left">
        <q-btn
          color="negative"
          label="Supprimer"
          @click="deleteThisTrainings"
        />
        <q-space />
        <q-btn
          color="negative"
          outline
          label="Retour"
          @click="onCancelClick"
        />
        <q-btn
          color="admin-primary"
          flat
          label="Valider"
          @click="onOkClick"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { date } from 'quasar';
import { mapState, mapActions } from 'vuex';
import AdminPresenceCallListTable from '../components/AdminPresenceCallListTable';


export default {
  name: 'AdminPresenceListPage',
  components: { AdminPresenceCallListTable },
  data: () => ({
    training: null
  }),

  computed: {
    ...mapState({
      members: (state) => state.members.members,
      trainings: (state) => state.trainings.trainings
    }),
    date() {
      return date;
    },

    trainingMember() {
      const result = [];
      this.training.students.forEach((student) => {
        const findUser = this.members.find((user) => user.uid === student.uid);
        if (findUser) result.push(findUser);
      });
      return result;
    }
  },

  beforeMount() {
    const searchUid = this.$route.params.id;
    this.training = this.trainings.find((training) => training.uid === searchUid);
  },

  methods: {
    ...mapActions(['fetchMembers', 'fetchTrainings', 'updateStudentPresence', 'deleteTraining']),

    onOkClick() {
      this.updateStudentPresence({ training: this.training });
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
