<template>
  <q-page class="q-ma-md">
    <h5 class="text-h5 q-my-md">
      Changement pour le cours du
      <span class="text-weight-bold">{{ getDay }}</span>
      de <span class="text-weight-bold">{{ getStartHours }}</span>
      à <span class="text-weight-bold">{{ getEndHours }}</span>
    </h5>
    {{ currentTraining }}
    <admin-presence-member-update-table
      ref="memberList"
      :members="members"
      :filter-input="getFilter"
      :selected="getSelectedMembers"
    />
    <div
      align="right"
      class="q-my-md"
    >
      <q-btn
        outline
        label="Retour"
        color="negative"
        @click="onCancelClick"
      />
      <q-btn
        flat
        label="Valider"
        color="admin-primary"
        @click="updateTrainingsMembers"
      />
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { date } from 'quasar';
import AdminPresenceMemberUpdateTable from '../components/AdminPresenceMemberUpdateTable';

const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

export default {
  name: 'AdminPresenceUpdatePage',
  components: { AdminPresenceMemberUpdateTable },
  computed: {
    ...mapState({
      trainings: (state) => state.trainings.trainings,
      members: (state) => state.members.members
    }),

    currentTraining() {
      const { id } = this.$route.params;
      return this.trainings.find((training) => training.internalId === id && training.startDate > date.endOfDate(new Date(), 'day'));
    },

    getDay() {
      return days[this.currentTraining.startDate.getDay()];
    },

    getStartHours() {
      return date.formatDate(this.currentTraining.startDate, 'HH:mm');
    },

    getEndHours() {
      return date.formatDate(this.currentTraining.endDate, 'HH:mm');
    },

    getFilter() {
      return this.currentTraining.group.toString();
    },

    getSelectedMembers() {
      const selected = [];
      this.currentTraining.students.forEach((student) => {
        const user = this.members.find((member) => member.uid === student.uid);
        selected.push(user);
      });
      return selected;
    },

    getAllTraining() {
      return this.trainings.filter((training) => training.internalId === this.$route.params.id
        && training.startDate > date.endOfDate(new Date(), 'day'));
    }
  },

  methods: {
    ...mapActions(['updateStudents']),

    onCancelClick() {
      this.$router.push({ name: 'admin_presence' });
    },

    updateTrainingsMembers() {
      const students = this.$refs.memberList.selectedMembers;
      const newStudents = [];
      students.forEach((student) => {
        newStudents.push({ isPresent: 'here', uid: student.uid });
      });

      this.updateStudents({
        trainings: this.getAllTraining,
        newStudents
      })
        .then(() => {
          this.$q.notify({
            message: 'changements effectués avec succès',
            icon: 'mdi-check',
            color: 'positive'
          });
        })
        .then(() => {
          this.$router.push({ name: 'admin_presence' });
        });
    }
  }
};
</script>

<style scoped>

</style>
