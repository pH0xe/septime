<template>
  <q-page class="q-ma-md">
    <h5 class="text-h5 q-my-md">
      Create new liste
    </h5>
    <q-card
      flat
      bordered
    >
      <q-card-section>
        <q-card-section class="text-weight-bold flex">
          <div class="q-mb-sm">
            Sélectionner le lieux :
          </div>
          <q-icon
            v-if="$v.location.$error"
            name="mdi-alert-circle"
            size="sm"
            color="negative"
          />
        </q-card-section>
        <q-option-group
          v-model="location"
          :options="locationOptions"
          color="admin-primary"
          type="radio"
          inline
          error-message="Champ requis"
          :error="$v.location.$error"
          @input="$v.location.$touch"
          @blur="$v.location.$touch"
        />
        <div
          v-if="$v.location.$error"
          class="text-caption text-negative"
        >
          Sélection requise
        </div>
        <q-card-section class="text-weight-bold flex">
          <div class="q-mb-sm">
            Sélectionner les jours :
          </div>
          <q-icon
            v-if="$v.trainingDay.$error"
            name="mdi-alert-circle"
            size="sm"
            color="negative"
          />
        </q-card-section>
        <q-option-group
          v-model="trainingDay"
          :options="weekDays"
          color="admin-primary"
          type="radio"
          inline
          error-message="Champ requis"
          :error="$v.trainingDay.$error"
          @input="$v.trainingDay.$touch"
          @blur="$v.trainingDay.$touch"
        />
        <div
          v-if="$v.trainingDay.$error"
          class="text-caption text-negative"
        >
          Sélection requise
        </div>
      </q-card-section>
      <q-card-section>
        <q-card-section class="text-weight-bold">
          Indiquer la plage horaire
        </q-card-section>
        <q-card-section class="row">
          <q-input
            v-model="startHour"
            filled
            label="Début"
            :rules="['time']"
            class="col-12 col-md-5 q-mr-md"
            error-message="Champ requis"
            :error="$v.startHour.$error"
            color="admin-primary"
            @input="$v.startHour.$touch"
            @blur="$v.startHour.$touch"
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
                    v-model="startHour"
                    format24h
                    error-message="Champ requis"
                    :error="$v.startHour.$error"
                    @input="$v.startHour.$touch"
                    @blur="$v.startHour.$touch"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            v-model="endHour"
            filled
            color="admin-primary"
            label="Fin"
            class="col-12 col-md-5 q-mr-md"
            error-message="Champ requis"
            :error="$v.endHour.$error"
            :rules="['time']"
            @input="$v.endHour.$touch"
            @blur="$v.endHour.$touch"
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
                    v-model="endHour"
                    format24h
                    error-message="Champ requis"
                    :error="$v.endHour.$error"
                    @input="$v.endHour.$touch"
                    @blur="$v.endHour.$touch"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>
      </q-card-section>
      <q-card-section>
        <q-card-section class="text-weight-bold">
          Indiquer les dates de début et de fin
        </q-card-section>
        <q-card-section class="row">
          <div class="col-12 col-md-5 q-mr-md">
            <q-input
              v-model="startDate"
              filled
              color="admin-primary"
              mask="##/##/####"
              error-message="Champ requis"
              :error="$v.startDate.$error"
              label="Début"
              class="full-width"
              required
              @input="$v.startDate.$touch"
              @blur="$v.startDate.$touch"
            >
              <template v-slot:append>
                <q-icon
                  name="event"
                  class="cursor-pointer"
                >
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="startDate"
                      color="admin-primary"
                      mask="DD/MM/YYYY"
                      :options="optionSunday"
                      :first-day-of-week="1"
                      @input="$v.startDate.$touch"
                      @blur="$v.startDate.$touch"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-5 q-mr-md">
            <q-input
              v-model="endDate"
              filled
              color="admin-primary"
              mask="##/##/####"
              error-message="Champ requis"
              :error="$v.endDate.$error"
              label="Fin"
              class="full-width"
              required
              @input="$v.endDate.$touch"
              @blur="$v.endDate.$touch"
            >
              <template v-slot:append>
                <q-icon
                  name="event"
                  class="cursor-pointer"
                >
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="endDate"
                      color="admin-primary"
                      mask="DD/MM/YYYY"
                      :first-day-of-week="1"
                      :options="optionSunday"
                      @input="$v.endDate.$touch"
                      @blur="$v.endDate.$touch"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </q-card-section>
      </q-card-section>
      <q-card-section>
        <q-card-section class="text-weight-bold flex">
          <div class="q-pb-sm">
            Séléctionner les catégories d'âge :
          </div>
          <q-icon
            v-if="$v.trainingGroup.$error"
            name="mdi-alert-circle"
            size="sm"
            color="negative"
          />
        </q-card-section>
        <q-option-group
          v-model="trainingGroup"
          :options="groupOption"
          color="admin-primary"
          type="checkbox"
          inline
          error-message="Champ requis"
          :error="$v.trainingGroup.$error"
          @input="$v.trainingGroup.$touch"
          @blur="$v.trainingGroup.$touch"
        />
        <div
          v-if="$v.trainingGroup.$error"
          class="text-caption text-negative"
        >
          Sélection requise
        </div>
      </q-card-section>
      <q-card-section>
        <admin-presence-member-table
          ref="memberList"
          :members="membersActive"
          :filter-input="trainingGroup.toString()"
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
    </q-card>
  </q-page>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { date as quasarDate } from 'quasar';
import { mapState, mapActions, mapGetters } from 'vuex';
import { Group } from '../js/Group';
import AdminPresenceMemberTable from '../components/AdminPresenceMemberTable';


const weekDays = [
  { value: 1, label: 'Lundi' }, { value: 2, label: 'Mardi' }, { value: 3, label: 'Mercredi' },
  { value: 4, label: 'Jeudi' }, { value: 5, label: 'Vendredi' }, { value: 6, label: 'Samedi' },
  { value: 0, label: 'Dimanche' }
];

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

const locationOptions = [
  { label: 'Moirans', value: 'moirans' },
  { label: 'TSF', value: 'TSF' }
];

export default {
  name: 'AdminPresenceCreatePage',
  components: { AdminPresenceMemberTable },
  mixins: [validationMixin],

  data: () => ({
    trainingDay: null,
    startHour: '',
    endHour: '',
    trainingGroup: [],
    startDate: null,
    endDate: null,
    location: ''
  }),

  computed: {
    ...mapState({
      members: (state) => state.members.members,
      membersActive: (state) => state.members.membersActive
    }),

    weekDays() {
      return weekDays;
    },

    groupOption() {
      return groupOption;
    },

    locationOptions() {
      return locationOptions;
    }
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
