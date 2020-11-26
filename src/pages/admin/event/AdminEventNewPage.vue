<template>
  <q-page class="q-ma-md">
    <h5 class="text-h5 q-my-md">
      Nouvel événement
    </h5>
    <q-form
      autofocus
      @submit.prevent="onSubmit"
      @keydown.enter.prevent=""
    >
      <h6 class="text-weight-regular q-my-sm">
        Nom de l'événement :
      </h6>
      <div class="row">
        <q-input
          v-model="title"
          class="q-mb-md w-40"
          label="Nom"
          color="admin-primary"
          filled
          required
        />
        <q-checkbox
          v-model="isCompetition"
          label="Est-ce une competition ?"
          color="positive"
        />
      </div>
      <q-separator />

      <div class="row items-baseline q-mt-md">
        <h6 class="col-auto text-weight-regular q-my-sm">
          Du
        </h6>
        <div class="col-12 col-md-4 q-mx-md">
          <date-selector
            v-model="startDate"
            error-message="Saisir une date"
            label="Début"
          />
        </div>
        <h6 class="col-auto text-weight-regular q-my-sm">
          au
        </h6>
        <div class="col-12 col-md-4 q-mx-md">
          <date-selector
            v-model="endDate"
            error-message="Saisir une date"
            label="Fin"
          />
        </div>
      </div>
      <div class="row items-baseline">
        <h6 class="col-auto text-weight-regular q-my-sm">
          De
        </h6>
        <div class="col-12 col-md-4 q-mx-md">
          <hour-selector
            v-model="startHour"
            error-message="Saisir une heure"
            label="Debut"
          />
        </div>
        <h6 class="col-auto text-weight-regular q-my-sm">
          à
        </h6>
        <div class="col-12 col-md-4 q-mx-md">
          <hour-selector
            v-model="endHour"
            error-message="Saisir un heure"
            label="Fin"
          />
        </div>
      </div>

      <q-separator />

      <h6 class="text-weight-regular q-my-sm ">
        Description :
      </h6>
      <q-input
        v-model="description"
        color="admin-primary"
        type="textarea"
        label="Description"
        filled
        class="q-mb-md"
      />

      <q-separator />

      <div class="flex justify-start items-center">
        <h6 class="q-ma-sm q-mt-none">
          Rôles :
        </h6>
      </div>
      <div class="no-margin q-py-sm q-px-lg">
        <div
          v-for="role in roles"
          :key="role.id"
          class="row items-baseline q-my-sm"
        >
          <q-input
            v-model="role.name"
            class="q-mr-md col-5"
            color="admin-primary"
            label="Rôle"
            filled
            @blur="addRole"
          />
          <q-input
            v-model="role.persons"
            class="q-mr-lg col-5"
            color="admin-primary"
            label="Nombre de personnes"
            type="number"
            filled
            @blur="addRole"
          />
          <q-btn
            v-if="role.id !== roleId"
            class="q-ma-sm"
            icon="close"
            color="negative"
            flat
            round
            @click="removeRole(role)"
          />
        </div>
      </div>

      <q-separator />

      <div v-if="isCompetition">
        <h6 class="q-ma-sm q-mt-none">
          Compétition :
        </h6>
        <div>
          <q-checkbox
            v-model="isSameGender"
            label="Mixtes ?"
            color="positive"
          />
        </div>
        <div>
          <q-checkbox
            v-model="isByTeam"
            label="Par équipe ?"
            color="positive"
          />
        </div>
        <div class="row">
          <q-checkbox
            v-model="hasMeetingPoint"
            label="Lieux de rendez-vous ?"
            color="positive"
          />
          <q-input
            v-model="meetingPoint"
            class="q-mx-md"
            :disable="!hasMeetingPoint"
            label="Lieux de rendez-vous"
            color="admin-primary"
            filled
          />
        </div>
        <div class="text-weight-bold flex q-mt-md">
          Séléctionner les catégories d'âge :
        </div>
        <q-option-group
          v-model="competitionGroup"
          :options="groupOption"
          color="admin-primary"
          type="checkbox"
          inline
        />
        <div class="text-weight-bold flex">
          Séléctionner les catégories d'armes:
        </div>
        <q-option-group
          v-model="competitionWeapons"
          :options="weaponsOption"
          color="admin-primary"
          type="checkbox"
          inline
        />
      </div>

      <div class="flex justify-end items-baseline">
        <q-btn
          class="q-ma-xs"
          label="ok"
          type="submit"
          color="admin-primary"
          flat
          :loading="submitting"
        />
        <q-btn
          class="q-ma-xs"
          label="Annuler"
          color="negative"
          flat
          @click="$router.push('events')"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { date, Notify } from 'quasar';
import DateSelector from '../../../components/utils/DateSelector';
import HourSelector from '../../../components/utils/HourSelector';
import { Group } from '../../../js/Group';
import { Weapons } from '../../../js/Weapons';

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
const weaponsOption = [
  { value: Weapons.SABRE, label: 'Sabre' },
  { value: Weapons.FOIL, label: 'Fleuret' },
  { value: Weapons.EPEE, label: 'Epée' }
];

export default {
  name: 'AdminEventNewPage',
  components: { HourSelector, DateSelector },
  mixins: [validationMixin],

  data: () => ({
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    startHour: '00:00',
    endHour: '00:00',
    roles: [
      { id: 0, name: '', persons: null }
    ],
    roleId: 0,
    isCompetition: false,
    isSameGender: false,
    hasMeetingPoint: false,
    meetingPoint: '',
    isByTeam: false,
    competitionGroup: [],
    competitionWeapons: [],
    submitting: false
  }),

  computed: {
    groupOption() {
      return groupOption;
    },

    weaponsOption() {
      return weaponsOption;
    }
  },

  methods: {
    ...mapActions(['postNewEvent']),

    onSubmit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        // this.submitting = true;
        this.$q.loading.show({
          message: 'Creation de l\'évenement en cours...'
        });

        const neededRole = [];
        this.roles.forEach((role) => {
          if (role.id !== this.roles.length - 1) {
            neededRole.push({
              name: role.name,
              require: +role.persons
            });
          }
        });

        const startHour = date.extractDate(this.startHour, 'HH:mm')
          .getHours();
        const startMinute = date.extractDate(this.startHour, 'HH:mm')
          .getMinutes();
        const endHour = date.extractDate(this.endHour, 'HH:mm')
          .getHours();
        const endMinute = date.extractDate(this.endHour, 'HH:mm')
          .getMinutes();

        this.startDate.setHours(startHour, startMinute);
        this.endDate.setHours(endHour, endMinute);


        const eventData = {
          description: this.description,
          endDate: this.endDate,
          neededRole,
          startDate: this.startDate,
          title: this.title
        };

        if (this.isCompetition) {
          eventData.isCompetition = true;
          eventData.isSameGender = this.isSameGender;
          eventData.isByTeam = this.isByTeam;
          if (this.hasMeetingPoint) {
            eventData.meetingPoint = this.meetingPoint;
          }
          eventData.competitionGroup = this.competitionGroup;
          eventData.competitionWeapons = this.competitionWeapons;
        }

        this.postNewEvent({ event: eventData })
          .then(() => {
            this.$q.loading.hide();
            this.$router.replace({ name: 'admin_events' });
          })
          .catch((err) => {
            console.log('Error while adding event : ', err);
            Notify.create({
              message: `Une erreur s'est produite: ${err}`,
              color: 'negative',
              position: 'bottom'
            });
          });
      }
    },

    addRole() {
      if (this.roles[this.roles.length - 1].name !== '' && this.roles[this.roles.length - 1].persons > 0) {
        this.roleId += 1;
        this.roles.push({ id: this.roleId, name: '', persons: null });
      }
    },

    removeRole(role) {
      const index = this.roles.indexOf(role);
      this.roles.splice(index, 1);
      this.roleId -= 1;
      this.roles.forEach((item) => {
        if (item.id > role.id) {
          item.id -= 1;
        }
      });
    }
  },

  validations: {
    title: {
      required
    },
    roles: {
      persons: {
        minValue: 1
      }
    }
  },

  meta: {
    title: 'Admin - Actualités'
  }
};
</script>

<style scoped>
.w-40 {
  width: 40%;
}
</style>
