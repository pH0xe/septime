<template>
  <div>
    <div class="row">
      <div class="col">
        <h5 class="text-h5">
          Informations de contact
        </h5>
        <q-separator class="separator-margin" />
      </div>
    </div>
    <div class="row">
      <q-input
        v-model="address.street"
        label="Adresse"
        filled
        color="admin-primary"
        class="col-12 col-md-5 q-mr-md q-mb-sm"
        error-message="Champ requis"
        required
        :error="$v.address.street.$error"
        @input="$v.address.street.$touch"
        @blur="$v.address.street.$touch"
      />
      <q-input
        v-model="address.city"
        label="Ville"
        filled
        color="admin-primary"
        class="col-12 col-md-5 q-mb-sm"
        error-message="Champ requis"
        required
        :error="$v.address.city.$error"
        @input="$v.address.city.$touch"
        @blur="$v.address.city.$touch"
      />
      <q-input
        v-model="address.zip"
        label="Code postal"
        filled
        color="admin-primary"
        class="col-12 col-md-5 q-mb-sm"
        mask="## ###"
        unmasked-value
        required
        error-message="Champ requis"
        :error="$v.address.zip.$error"
        @input="$v.address.zip.$touch"
        @blur="$v.address.zip.$touch"
      />
    </div>
    <div class="row">
      <q-input
        v-model="phone"
        label="Numéro de téléphone"
        filled
        color="admin-primary"
        class="col-12 col-md-5 q-mr-md q-mb-sm"
        mask="## ## ## ## ##"
        required
        :error="$v.phone.$error"
        error-message="Champ requis"
        unmasked-value
        @input="$v.phone.$touch"
        @blur="$v.phone.$touch"
      />
      <q-input
        v-model="email"
        label="E-mail"
        filled
        color="admin-primary"
        class="col-12 col-md-5 q-mb-sm"
        error-message="Champ requis"
        required
        :error="$v.email.$error"
        @input="$v.email.$touch"
        @blur="$v.email.$touch"
      />
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { email, integer, required } from 'vuelidate/lib/validators';
import { length } from '../js/vuelidate-custom-validators';

export default {
  name: 'AdminMemberCreateContactData',
  mixins: [validationMixin],

  data: () => ({
    address: {
      street: '',
      city: '',
      zip: null
    },
    email: '',
    phone: ''
  }),

  validations: {
    address: {
      street: { required },
      city: { required },
      zip: {
        required,
        length: length(5),
        integer
      }
    },
    phone: {
      required,
      length: length(10)
    },
    email: { required, email }
  }
};
</script>

<style scoped>
  .text-h5 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .separator-margin {
    margin-bottom: 1rem;
  }
</style>
