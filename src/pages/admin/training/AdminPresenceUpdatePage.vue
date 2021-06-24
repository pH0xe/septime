<template>
  <q-page
    v-if="training && members.length > 0"
    class="page-padded"
  >
    <page-title :title="pageTitle" />

    <admin-presence-member-update-table
      ref="memberList"
      :members="members"
      :training="training"
    />

    <section-title
      text="Catégories"
    />
    <div class="row q-mx-lg">
      <q-select
        v-model="training.group"
        class="col-12 col-md-5"
        multiple
        :options="groupOptions"
        label="Catégories"
        hint="Multi-sélection possible"
        color="admin-primary"
        filled
        emit-value
        map-options
        error-message="Champ requis"
        :hide-hint="$v.training.group.$error"
        :error="$v.training.group.$error"
        @blur="$v.training.group.$touch"
        @input="$v.training.group.$touch"
      />
    </div>

    <section-title
      text="Horaires"
    />
    <div class="row q-mx-lg">
      <time-selector
        v-model="hours.start"
        class="col-12 col-md-5 q-mr-md"
        label="Heure de début"
        error-message="Champ requis"
        :error="$v.hours.start.$error"
        :touch-fct="$v.hours.start.$touch"
        color="admin-primary"
        required
      />
      <time-selector
        v-model="hours.end"
        class="col-12 col-md-5"
        label="Heure de fin"
        error-message="Champ requis"
        :error="$v.hours.end.$error"
        :touch-fct="$v.hours.end.$touch"
        color="admin-primary"
        required
      />
    </div>

    <section-title text="Date de vacance et d'absence" />
    <div class="row q-mx-lg items-center">
      <date-selector
        v-model="newExcludedDate"
        class="col-12 col-md-5 q-mr-md"
        color="admin-primary"
        error-message="erreur"
        label="Date d'absence"
        required
        :options="isGoodDay"
      />
      <q-btn
        label="Ajouter"
        color="positive"
        icon="mdi-plus"
        class="col-12 col-md-auto q-mr-md"
        rounded
        :disable="newExcludedDate === null"
        @click="onClickAdd"
      />
    </div>
    <div
      v-for="(item, index) in training.excludedDates"
      :key="index"
      class="row q-mx-lg items-center q-my-sm"
    >
      <date-selector
        :value="item"
        class="col-12 col-md-5 q-mr-md"
        color="admin-primary"
        error-message="erreur"
        label="Date d'absence"
        required
        readonly
        :options="isGoodDay"
      />
      <q-btn
        label="Supprimer"
        color="negative"
        icon="mdi-minus"
        class="col-12 col-md-auto q-mr-md"
        rounded
        @click="deleteItem(index)"
      />
    </div>

    <q-separator class="q-my-md" />

    <div
      class="row q-my-md justify-end items-center"
    >
      <q-btn
        class="col-md-auto col-12"
        outline
        label="Retour"
        color="negative"
        @click="onCancelClick"
      />
      <q-btn
        class="q-my-sm col-md-auto col-12"
        flat
        label="Supprimer le cours"
        color="negative"
        @click="onClickDelete"
      />
      <q-btn
        class="col-md-auto col-12"
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
import { date, extend, Notify } from 'quasar';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import store from '../../../store';
import { DateUtils } from '../../../js/DateUtils';
import { Group } from '../../../js/Group';
import SectionTitle from '../../../components/utils/sectionTitle';
import AdminPresenceMemberUpdateTable from '../../../components/admin/trainings/AdminPresenceMemberUpdateTable';
import TimeSelector from '../../../components/utils/TimeSelector';
import DateSelector from '../../../components/utils/DateSelector';
import PageTitle from '../../../components/utils/PageTitle';

export default {
  name: 'AdminPresenceUpdatePage',
  components: {
    PageTitle,
    DateSelector,
    TimeSelector,
    AdminPresenceMemberUpdateTable,
    SectionTitle
  },
  mixins: [validationMixin],

  data: () => ({
    trainingGroup: [],
    training: null,
    newExcludedDate: null,
    initialMembers: []
  }),

  computed: {
    ...mapState({
      members: (state) => state.members.members
    }),

    // <editor-fold desc="getDay String" defaultstate="collapsed">
    getDay() {
      return DateUtils.locale.days[this.training.day];
    },
    // </editor-fold>

    // <editor-fold desc="groupOptions" defaultstate="collapsed">
    groupOptions() {
      return Group.groupOptions;
    },
    // </editor-fold>

    // <editor-fold desc="pageTitle" defaultstate="collapsed">
    pageTitle() {
      return `Changement pour le cours de ${this.getDay} de ${this.training.timetable.start.full} à ${this.training.timetable.end.full}`;
    },
    // </editor-fold>

    // <editor-fold desc="hours" defaultstate="collapsed">
    hours() {
      return { start: this.training.timetable.start.full, end: this.training.timetable.end.full };
    }
    // </editor-fold>
  },

  beforeMount() {
    this.fetchMembers();
    const { id } = this.$route.params;
    this.fetchTrainingsClean()
      .then(() => {
        this.training = extend(true, {}, store.state.trainings.trainingsClean.find((training) => training.uid === id));
        this.training.period.start = new Date(this.training.period.start);
        this.training.period.end = new Date(this.training.period.end);
        this.training.excludedDates = this.training.excludedDates.map((d) => new Date(d));
        this.initialMembers = this.training.members;
        if (!this.training) {
          Notify.create({
            message: 'L\'entrainement n\'a pas été trouvé.',
            caption: 'Si l\'erreur persiste, contactez un administrateur',
            icon: 'mdi-alert',
            color: 'negative',
            position: 'bottom'
          });
          this.$router.push({ name: 'admin_presence' });
        }
      });
  },

  methods: {
    ...mapActions(['updateTraining', 'fetchTrainingsClean', 'fetchMembers', 'deleteTraining']),

    // <editor-fold desc="onCancelClick" defaultstate="collapsed">
    onCancelClick() {
      this.$router.push({ name: 'admin_presence' });
    },
    // </editor-fold>

    // <editor-fold desc="updateTrainingsMembers" defaultstate="collapsed">
    updateTrainingsMembers() {
      const students = this.$refs.memberList.selectedMembers;
      this.training.timetable = {
        end: {
          full: this.hours.end,
          hour: this.hours.end.split(':')[0],
          minute: this.hours.end.split(':')[1]
        },
        start: {
          full: this.hours.start,
          hour: this.hours.start.split(':')[0],
          minute: this.hours.start.split(':')[1]
        }
      };
      this.training.members = students.map((st) => {
        st = { parentUid: st.parentUid, uid: st.uid };
        return st;
      });

      this.updateTraining({ training: this.training })
        .then(() => {
          this.$router.push({ name: 'admin_presence' });
          Notify.create({
            message: 'Mise à jour de l\'entrainement avec succès',
            icon: 'mdi-check',
            color: 'positive',
            position: 'bottom'
          });
        });
    },
    // </editor-fold>

    // <editor-fold desc="isGoodDay" defaultstate="collapsed">
    isGoodDay(d) {
      const dd = date.extractDate(d, 'YYYY/MM/DD');
      return dd.getDay() === this.training.day;
    },
    // </editor-fold>

    // <editor-fold desc="onClickAdd" defaultstate="collapsed">
    onClickAdd() {
      const exist = this.training.excludedDates.find((d) => d.getTime() === this.newExcludedDate.getTime());
      if (this.newExcludedDate && !exist && this.newExcludedDate.getDay() === this.training.day) {
        this.training.excludedDates.push(this.newExcludedDate);
        this.newExcludedDate = date.addToDate(this.newExcludedDate, { days: 7 });
      }
    },
    // </editor-fold>

    // <editor-fold desc="deleteItem" defaultstate="collapsed">
    deleteItem(index) {
      this.training.excludedDates.splice(index, 1);
    },
    // </editor-fold>

    // <editor-fold desc="onClickDelete" defaultstate="collapsed">
    onClickDelete() {
      this.$q.dialog({
        ok: {
          label: 'Oui',
          flat: true,
          color: 'positive'
        },
        title: 'Confirmer',
        message: 'Voulez-vous vraiment supprimer cet entrainement ?',
        cancel: {
          label: 'Non',
          outline: true,
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        this.deleteTraining({ training: this.training })
          .then(() => {
            this.$router.push({ name: 'admin_presence' });
            Notify.create({
              message: 'Suppression de l\'entrainement avec succès',
              icon: 'mdi-check',
              color: 'positive',
              position: 'bottom'
            });
          });
      });
    }
    // </editor-fold>
  },

  validations: {
    training: {
      group: { required }
    },

    hours: {
      start: { required },
      end: { required }
    }
  },

  meta: {
    title: 'Admin - Entraînements'
  }
};
</script>

<style scoped>

</style>
