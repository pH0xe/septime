<template>
  <q-page class="q-ma-md">
    <h4 class="text-h4 q-mb-xs q-mt-md q-ml-md">
      Ajout d'un entrainement
    </h4>
    <q-card-section>
      <q-separator />
      <admin-training-create-days />
      <q-separator class="q-mt-lg" />
      <admin-training-create-hours />
      <q-separator />
      <admin-training-create-period />
      <q-separator />
      <admin-training-create-members :members="membersActive" />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        color="negative"
        outline
        label="retour"
        @click="onCancelClick"
      />
      <q-btn
        color="admin-primary"
        flat
        label="Valider"
        @click="onSubmit"
      />
    </q-card-actions>
  </q-page>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { date as quasarDate } from 'quasar';
import { mapState, mapActions, mapGetters } from 'vuex';
import AdminTrainingCreateDays from '../../../components/admin/trainings/AdminTrainingCreateDays';
import AdminTrainingCreateHours from '../../../components/admin/trainings/AdminTrainingCreateHours';
import AdminTrainingCreatePeriod from '../../../components/admin/trainings/AdminTrainingCreatePeriod';
import AdminTrainingCreateMembers from '../../../components/admin/trainings/AdminTrainingCreateMembers';

export default {
  name: 'AdminPresenceCreatePage',
  components: {
    AdminTrainingCreateMembers,
    AdminTrainingCreatePeriod,
    AdminTrainingCreateHours,
    AdminTrainingCreateDays
  },
  mixins: [validationMixin],

  computed: {
    ...mapState({
      members: (state) => state.members.members,
      membersActive: (state) => state.members.membersActive
    })
  },

  // TODO recuperer toute les erreurs et données et créé l'entrainement et les documents de presence requis
  beforeMount() {
    this.fetchMembers();
  },

  methods: {
    ...mapActions(['fetchMembers', 'createMultipleTraining']),
    ...mapGetters(['maxID']),

    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$error) {
        const trainingsToAdd = [];

        const startHour = quasarDate.extractDate(this.startHour, 'HH:mm').getHours();
        const startMinute = quasarDate.extractDate(this.startHour, 'HH:mm').getMinutes();

        const endHour = quasarDate.extractDate(this.endHour, 'HH:mm').getHours();
        const endMinute = quasarDate.extractDate(this.endHour, 'HH:mm').getMinutes();

        let currentDate = quasarDate.extractDate(this.startDate, 'DD/MM/YYYY');
        currentDate = quasarDate.addToDate(currentDate, { days: this.trainingDay });
        const endDate = quasarDate.extractDate(this.endDate, 'DD/MM/YYYY');


        const usersTraining = [];
        this.$refs.memberList.selectedMembers.forEach((member) => {
          usersTraining.push({ isPresent: 'here', uid: member.uid });
        });

        const internalId = this.maxID() + 1;

        while (currentDate <= endDate) {
          const currentTraining = {
            internalId,
            startDate: quasarDate.adjustDate(currentDate,
              { hours: startHour, minutes: startMinute }),
            endDate: quasarDate.adjustDate(currentDate,
              { hours: endHour, minutes: endMinute }),
            location: this.location,
            group: this.trainingGroup,
            students: usersTraining
          };
          trainingsToAdd.push(currentTraining);
          currentDate = quasarDate.addToDate(currentDate, { days: 7 });
        }
        this.createMultipleTraining({ trainings: trainingsToAdd })
          .then(() => { this.$router.replace({ name: 'admin_presence' }); });
      }
    },

    optionSunday(date) {
      return quasarDate.extractDate(date, 'YYYY/MM/DD').getDay() === 0;
    },

    onCancelClick() {
      this.$router.push({ name: 'admin_presence' });
    }
  },

  validations: {
    trainingDay: {
      required
    },
    startHour: {
      required,
      mustBeBefore() {
        if (this.startHour && this.endHour) {
          return this.startHour < this.endHour;
        }
        return true;
      }
    },
    endHour: {
      required,
      mustBeAfter() {
        if (this.startHour && this.endHour) {
          return this.startHour < this.endHour;
        }
        return true;
      }
    },
    startDate: {
      required
    },
    endDate: {
      required
    },
    trainingGroup: {
      required
    },
    location: {
      required
    }
  },

  meta: {
    title: 'Admin - Entraînements'
  }
};
</script>

<style scoped>

</style>
