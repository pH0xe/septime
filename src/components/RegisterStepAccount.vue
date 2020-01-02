<template>
  <q-form @submit.stop="onSubmit">
    <div class="row q-col-gutter-x-md">
      <div class="col-12 col-md-6">
        <q-input
          v-model.trim="lastName"
          label="Nom"
          error-message="Ce champ est requis"
          required
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

    <q-input
      v-model.trim="email"
      label="E-mail"
      type="email"
      required
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

    <q-input
      v-model.trim="password"
      :type="isPasswordVisible ? 'text' : 'password'"
      label="Mot de passe"
      required
      minlengh="8"
      error-message="Le mot de passe doit faire plus de 8 caractères"
      :error="$v.password.$error"
      @blur="$v.password.$touch"
      @input="$v.password.$touch"
    >
      <template v-slot:prepend>
        <q-icon name="mdi-key" />
      </template>
      <template v-slot:append>
        <q-icon
          :name="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
          class="cursor-pointer"
          @click="isPasswordVisible = !isPasswordVisible"
        />
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
import { minLength, required, email } from 'vuelidate/lib/validators';
import { length } from '../js/vuelidate-custom-validators';

export default {
  name: 'RegisterStepAccount',
  mixins: [validationMixin],
  data: () => ({
    isPasswordVisible: false,

    lastName: null,
    firstName: null,
    email: null,
    password: null,
    birthDate: null,

    isReferent: false
  }),

  validations: {
    lastName: { required },
    firstName: { required },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    },
    birthDate: {
      required,
      length: length(10)
    }
  },

  computed: {
    birthDateParsed() {
      return date.extractDate(this.birthDate, 'DD/MM/YYYY');
    }
  },

  methods: {
    onSubmit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        const {
          // email est déjà utilisé dans les import
          // eslint-disable-next-line no-shadow
          firstName, lastName, email, password, birthDateParsed: birthDate
        } = this;

        this.$emit('submit', {
          firstName, lastName, email, password, birthDate
        });
      } else {
        console.log(this.$v);
      }
    }
  }
};
</script>
