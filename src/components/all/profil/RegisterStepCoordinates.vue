<template lang="html">
  <q-form @submit="onSubmit">
    <q-input
      v-model="address.street"
      label="Adresse *"
      required
      autocomplete="address-line1"
      :error="$v.address.street.$error"
      error-message="Ce champ est requis"
      @blur="$v.address.street.$touch"
      @input="$v.address.street.$touch"
    >
      <template v-slot:prepend>
        <q-icon name="mdi-map-marker" />
      </template>
    </q-input>

    <div class="row q-col-gutter-x-md">
      <div class="col-12 col-md-6">
        <q-input
          v-model="address.city"
          label="Ville *"
          required
          autocomplete="address-level2"
          :error="$v.address.city.$error"
          error-message="Ce champ est requis"
          @blur="$v.address.city.$touch"
          @input="$v.address.city.$touch"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-home" />
          </template>
        </q-input>
      </div>

      <div class="col-12 col-md-6">
        <q-input
          v-model="address.zip"
          label="Code Postal *"
          mask="#####"
          required
          autocomplete="postal-code"
          :error="$v.address.zip.$error"
          error-message="Veuillez entrer un code postal valide"
          @blur="$v.address.zip.$touch"
          @input="$v.address.zip.$touch"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-home" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="row q-col-gutter-x-md">
      <div class="col-12 col-md-6">
        <q-input
          v-model="phone"
          label="Téléphone *"
          mask="## ## ## ## ##"
          unmasked-value
          required
          autocomplete="tel-national"
          :error="$v.phone.$error"
          error-message="Veuillez entrer un numéro de téléphone valide"
          @blur="$v.phone.$touch"
          @input="$v.phone.$touch"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-phone" />
          </template>
        </q-input>
      </div>
      <div class="col-12 col-md-6">
        <q-input
          v-model="phoneEmergency"
          label="Téléphone d'urgence *"
          mask="## ## ## ## ##"
          unmasked-value
          required
          autocomplete="tel-national"
          :error="$v.phoneEmergency.$error"
          error-message="Veuillez entrer un numéro de téléphone valide"
          @blur="$v.phoneEmergency.$touch"
          @input="$v.phoneEmergency.$touch"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-phone-alert" />
          </template>
        </q-input>
      </div> <!-- telephone d'urgence -->
      <div class="col-12 col-md-6">
        <!-- lien avec contact d'urgence -->
        <q-input
          v-model="relationEmergency"
          label="Lien avec le contact d'urgence (Père, Mère...) *"
          required
          :error="$v.relationEmergency.$error"
          error-message="Veuillez entrer un lien"
          @blur="$v.relationEmergency.$touch"
          @input="$v.relationEmergency.$touch"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-link" />
          </template>
        </q-input>
      </div>
    </div>

    <q-stepper-navigation>
      <q-btn
        label="Suivant"
        type="submit"
        unelevated
        color="primary"
        class="on-left"
      />
      <q-btn
        label="Précédent"
        flat
        color="primary"
        @click="onGoBack"
      />
    </q-stepper-navigation>
  </q-form>
</template>

<script lang="js">
import { validationMixin } from 'vuelidate';
import { integer, required } from 'vuelidate/lib/validators';
import { length } from '../../../js/vuelidate-custom-validators';

export default {
  name: 'RegisterStepCoordinates',
  mixins: [validationMixin],

  data: () => ({
    address: {
      street: null,
      city: null,
      zip: null
    },
    phone: null,
    phoneEmergency: null,
    relationEmergency: ''
  }),

  validations: {
    address: {
      street: { required },
      city: { required },
      zip: {
        required,
        integer,
        length: length(5)
      }
    },
    phone: {
      required,
      integer,
      length: length(10)
    },
    phoneEmergency: {
      required,
      integer,
      length: length(10)
    },
    relationEmergency: {
      required
    }
  },

  methods: {
    onSubmit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        const {
          address, phone, phoneEmergency, relationEmergency
        } = this;
        this.$emit('submit', {
          address, phone, phoneEmergency, relationEmergency
        });
      }
    },

    onGoBack() {
      this.$emit('go-back');
    }
  }
};
</script>
