<template>
  <q-page
    v-if="training && members.length > 0"
    class="q-ma-md"
  >
    <section-title
      :text="pageTitle"
    />

    <admin-presence-member-update-table
      ref="memberList"
      :members="members"
      :training="training"
    />

    <q-separator class="q-my-md" />
    <q-option-group
      v-model="trainingGroup"
      :options="groupOption"
      color="admin-primary"
      type="checkbox"
      inline
    />

    <q-separator class="q-my-md" />
    <div class="row">
      <q-input
        v-model="hours.start"
        filled
        color="admin-primary"
        label="Début"
        class="col-12 col-md-5 q-mr-md"
        :rules="['time']"
      >
        <template v-slot:append>
          <q-icon
            name="access_time"
            class="cursor-pointer"
          >
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale"
            >
              <q-time
                v-model="hours.start"
                format24h
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input
        v-model="hours.end"
        filled
        color="admin-primary"
        label="Fin"
        class="col-12 col-md-5 q-mr-md"
        :rules="['time']"
      >
        <template v-slot:append>
          <q-icon
            name="access_time"
            class="cursor-pointer"
          >
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale"
            >
              <q-time
                v-model="hours.end"
                format24h
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>

    <q-separator class="q-my-md" />

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
import { date, Notify } from 'quasar';
import store from '../../../store';
import { DateUtils } from '../../../js/DateUtils';
import { Group } from '../../../js/Group';
import SectionTitle from '../../../components/utils/sectionTitle';
import AdminPresenceMemberUpdateTable from '../../../components/admin/trainings/AdminPresenceMemberUpdateTable';

export default {
  name: 'AdminPresenceUpdatePage',
  components: { AdminPresenceMemberUpdateTable, SectionTitle },
  data: () => ({
    trainingGroup: [],
    training: null
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
    groupOption() {
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
    this.fetchTrainingsWeekPlanning()
      .then(() => {
        this.training = store.state.trainings.trainingsWeekPlanning.find((training) => training.uid === id);
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
    ...mapActions(['updateStudents', 'fetchTrainingsWeekPlanning', 'fetchMembers']),

    // <editor-fold desc="onCancelClick" defaultstate="collapsed">
    onCancelClick() {
      this.$router.push({ name: 'admin_presence' });
    },
    // </editor-fold>

    // <editor-fold desc="updateTrainingsMembers" defaultstate="collapsed">
    updateTrainingsMembers() {
      const students = this.$refs.memberList.selectedMembers;
      const newStudents = [];
      students.forEach((student) => {
        newStudents.push({ isPresent: 'here', uid: student.uid });
      });

      const startHour = date.extractDate(this.hours.start, 'HH:mm').getHours();
      const startMinute = date.extractDate(this.hours.start, 'HH:mm').getMinutes();

      const endHour = date.extractDate(this.hours.end, 'HH:mm').getHours();
      const endMinute = date.extractDate(this.hours.end, 'HH:mm').getMinutes();

      this.updateStudents({
        trainings: this.getAllTraining,
        newStudents,
        newGroup: this.trainingGroup,
        newStartHour: startHour,
        newStartMinute: startMinute,
        newEndHour: endHour,
        newEndMinute: endMinute
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
    // </editor-fold>
  },

  meta: {
    title: 'Admin - Entraînements'
  }
};
</script>

<style scoped>

</style>
