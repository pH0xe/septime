<template>
  <q-page class="q-ma-md">
    <h5 class="text-h5 q-my-md">
      Changement pour le cours du
      <span class="text-weight-bold">{{ getDay }}</span>
      de <span class="text-weight-bold">{{ getStartHours }}</span>
      à <span class="text-weight-bold">{{ getEndHours }}</span>
    </h5>
    <admin-presence-member-update-table
      ref="memberList"
      :members="members"
      :filter-input="getFilter"
      :selected="getSelectedMembers"
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
import { date } from 'quasar';
import AdminPresenceMemberUpdateTable from '../components/AdminPresenceMemberUpdateTable';
import { Group } from '../js/Group';

const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

const groupOption = [
  { value: Group.VETERANS4, label: Group.VETERANS4 },
  { value: Group.VETERANS3, label: Group.VETERANS3 },
  { value: Group.VETERANS2, label: Group.VETERANS2 },
  { value: Group.VETERANS1, label: Group.VETERANS1 },
  { value: Group.SENIORS, label: Group.SENIORS },
  { value: Group.M20, label: Group.M20 },
  { value: Group.M17, label: Group.M17 },
  { value: Group.M15, label: Group.M15 },
  { value: Group.M13, label: Group.M13 },
  { value: Group.M11, label: Group.M11 },
  { value: Group.M9, label: Group.M9 },
  { value: Group.M7, label: Group.M7 },
  { value: Group.M5, label: Group.M5 }
];

export default {
  name: 'AdminPresenceUpdatePage',
  components: { AdminPresenceMemberUpdateTable },

  data: () => ({
    trainingGroup: [],
    hours: {
      start: '',
      end: ''
    }
  }),

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
        && (training.startDate > date.endOfDate(new Date(), 'day') || date.isSameDate(training.startDate, new Date(), 'day')));
    },

    groupOption() {
      return groupOption;
    }
  },


  mounted() {
    this.trainingGroup = this.currentTraining.group;
    this.hours.start = date.formatDate(this.currentTraining.startDate, 'HH:mm');
    this.hours.end = date.formatDate(this.currentTraining.endDate, 'HH:mm');
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
  }
};
</script>

<style scoped>

</style>
