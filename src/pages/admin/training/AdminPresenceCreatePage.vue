<template>
  <q-page class="page-padded">
    <page-title title="Ajout d'un entrainement" />
    <q-card-section>
      <admin-training-create-days ref="daysSection" />
      <q-separator class="q-mt-lg" />
      <admin-training-create-hours ref="hoursSection" />
      <q-separator />
      <admin-training-create-period ref="periodSection" />
      <q-separator />
      <admin-training-create-excluded-dates ref="excludedSection" />
      <q-separator class="q-mt-lg" />
      <admin-training-create-members
        ref="membersSection"
        :members="membersActive"
      />
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
import { date as quasarDate, Notify } from 'quasar';
import { mapState, mapActions } from 'vuex';
import AdminTrainingCreateDays from '../../../components/admin/trainings/AdminTrainingCreateDays';
import AdminTrainingCreateHours from '../../../components/admin/trainings/AdminTrainingCreateHours';
import AdminTrainingCreatePeriod from '../../../components/admin/trainings/AdminTrainingCreatePeriod';
import AdminTrainingCreateMembers from '../../../components/admin/trainings/AdminTrainingCreateMembers';
import AdminTrainingCreateExcludedDates from '../../../components/admin/trainings/AdminTrainingCreateExcludedDates';
import PageTitle from '../../../components/utils/PageTitle';

export default {
  name: 'AdminPresenceCreatePage',
  components: {
    PageTitle,
    AdminTrainingCreateExcludedDates,
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
    }),

    daysData() {
      return {
        day: this.$refs.daysSection?.$data.trainingDay
      };
    },

    hoursData() {
      return {
        timetable: {
          end: {
            hour: this.$refs.hoursSection.endHour.substr(0, 2),
            minute: this.$refs.hoursSection.endHour.substr(3, 2),
            full: this.$refs.hoursSection.endHour
          },
          start: {
            hour: this.$refs.hoursSection.startHour.substr(0, 2),
            minute: this.$refs.hoursSection.startHour.substr(3, 2),
            full: this.$refs.hoursSection.startHour
          }
        }
      };
    },

    periodData() {
      return {
        period: {
          start: this.$refs.periodSection.$data.startDate,
          end: this.$refs.periodSection.$data.endDate
        }
      };
    },

    membersData() {
      const members = [];
      const selected = [...this.selectedMembers];
      selected.forEach((member) => members.push({ parentUid: member.parentUid, uid: member.uid }));
      return {
        group: this.$refs.membersSection.$data.group,
        members
      };
    },

    selectedMembers() {
      return this.$refs.membersSection.memberSelected;
    },

    excludedDates() {
      return this.$refs.excludedSection.excludedDates;
    },

    isErrors() {
      const {
        daysSection, hoursSection, periodSection, membersSection
      } = this.$refs;
      daysSection.$v.$touch();
      hoursSection.$v.$touch();
      periodSection.$v.$touch();
      membersSection.$v.$touch();

      return this.selectedMembers.length <= 0
        || daysSection.$v.$error
        || hoursSection.$v.$error
        || periodSection.$v.$error
        || membersSection.$v.$error;
    }
  },

  beforeMount() {
    this.fetchMembers();
  },

  methods: {
    ...mapActions(['fetchMembers', 'createTraining']),

    // <editor-fold desc="onSubmit" defaultstate="collapsed">
    onSubmit() {
      const data = {
        ...this.daysData, ...this.hoursData, ...this.periodData, ...this.membersData, ...this.excludedDates
      };

      if (!this.isErrors) {
        this.createTraining({ training: data })
          .then(() => {
            Notify.create({
              message: 'Création de l\'entrainement avec succès',
              caption: 'Contactez un administrateur pour plus d\'information',
              icon: 'mdi-check',
              color: 'positive',
              position: 'bottom'
            });
            this.$router.replace({ name: 'admin_presence_planning' });
          });
      } else {
        Notify.create({
          message: 'Le formulaire contient une erreur',
          caption: 'Vérifiez les champs puis réessayez',
          icon: 'mdi-alert',
          color: 'negative',
          position: 'bottom'
        });
      }
    },
    // </editor-fold>

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
