<template>
  <q-form @submit.stop="onSubmit">
    <div class="row q-col-gutter-x-md">
      <div class="col-12 col-md-6">
        <q-input
          v-model.trim="lastName"
          label="Nom"
          error-message="Ce champ est requis"
          required
          autocomplete="family-name"
          :error="$v.lastName.$error"
          @blur="$v.lastName.$touch"
          @input="$v.lastName.$touch"
        >
          <template v-slot:prepend>
            <q-icon
              name="mdi-account"
            />
          </template>
        </q-input>
      </div>

      <div class="col-12 col-md-6">
        <q-input
          v-model.trim="firstName"
          label="Prénom"
          error-message="Ce champ est requis"
          required
          autocomplete="given-name"
          :error="$v.firstName.$error"
          @blur="$v.firstName.$touch"
          @input="$v.firstName.$touch"
        >
          <template v-slot:prepend>
            <q-icon
              name="mdi-account"
            />
          </template>
        </q-input>
      </div>
    </div>

    <q-select
      v-model="gender"
      :options="genderOpt"
      label="Sexe"
      map-options
      emit-value
      required
      error-message="Ce champ est requis"
      :error="$v.gender.$error"
      @blur="$v.gender.$touch"
      @input="$v.gender.$touch"
    />

    <q-input
      v-model.trim="email"
      label="E-mail"
      type="email"
      required
      autocomplete="email"
      :error="$v.email.$error"
      error-message="Veuillez entrer un email valide"
      @blur="$v.email.$touch"
      @input="$v.email.$touch"
    >
      <template v-slot:prepend>
        <q-icon name="mdi-at" />
      </template>
    </q-input>

    <q-input
      v-model="birthDate"
      mask="##/##/####"
      label="Date de naissance"
      hint="JJ/MM/AAAA"
      required
      autocomplete="bday"
      :error="$v.birthDate.$error"
      error-message="Veuillez entrer une date valide"
      @blur="$v.birthDate.$touch"
      @input="$v.birthDate.$touch"
    >
      <template v-slot:prepend>
        <q-icon
          name="mdi-calendar"
          class="cursor-pointer"
        >
          <q-popup-proxy
            ref="qDateProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              v-model="birthDate"
              mask="DD/MM/YYYY"
              @input="() => $refs.qDateProxy.hide()"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-stepper-navigation>
      <q-btn
        label="Suivant"
        type="submit"
        unelevated
        color="primary"
      />
    </q-stepper-navigation>
  </q-form>
</template>

<script lang="js">
import { date } from 'quasar';
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import { length } from '../js/vuelidate-custom-validators';
import { Gender } from '../js/Gender';

const genderOpt = [
  { label: 'Femme', value: Gender.FEMALE },
  { label: 'Homme', value: Gender.MALE }
];

export default {
  name: 'RegisterStepAccount',
  mixins: [validationMixin],

  data: () => ({
    lastName: null,
    firstName: null,
    gender: null,
    email: null,
    birthDate: null
  }),

  validations: {
    lastName: { required },
    firstName: { required },
    gender: { required },
    email: {
      required,
      email
    },
    birthDate: {
      required,
      length: length(10)
    }
  },

  computed: {
    birthDateParsed() {
      return date.extractDate(this.birthDate, 'DD/MM/YYYY');
    },

    genderOpt() {
      return genderOpt;
    }
  },

  methods: {
    onSubmit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        const {
          // email est déjà utilisé dans les import
          // eslint-disable-next-line no-shadow
          firstName, lastName, email, password, birthDateParsed: birthDate, isReferent, gender
        } = this;

        this.$emit('submit', {
          firstName, lastName, email, password, birthDate, isReferent, gender
        });
      }
    }
  }
};
</script>
