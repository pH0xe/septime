<template>
  <div>
    <div class="row">
      <div class="col">
        <h5 class="text-h5">
          Informations personnelles
        </h5>
        <q-separator class="separator-margin" />
      </div>
    </div>
    <div class="row">
      <q-input
        v-model="lastName"
        class="col-12 col-md-5 q-mr-md q-mb-sm"
        filled
        label="Nom"
        error-message="Champ requis"
        color="admin-primary"
        required
        :error="$v.lastName.$error"
        @input="$v.lastName.$touch"
        @blur="$v.lastName.$touch"
      />
      <q-input
        v-model="firstName"
        class="col-12 col-md-5 q-mb-sm"
        label="Prénom"
        filled
        error-message="Champ requis"
        color="admin-primary"
        required
        :error="$v.firstName.$error"
        @input="$v.firstName.$touch"
        @blur="$v.firstName.$touch"
      />
    </div>
    <div class="row">
      <date-selector
        v-model="birthDate"
        class="col-12 col-md-5 q-mb-sm"
        error-message="Champ requis"
        label="Date de naissance"
        required
        :error="$v.birthDate.$error"
      />
    </div>
    <div class="row">
      <q-select
        v-model="laterality"
        class="col-12 col-md-5 q-mr-md q-mb-sm"
        filled
        label="Latéralité"
        color="admin-primary"
        map-options
        emit-value
        :options="Laterality.options"
        required
        error-message="Champ requis"
        :error="$v.laterality.$error"
        @input="$v.laterality.$touch"
        @blur="$v.laterality.$touch"
      />
      <q-select
        v-model="gender"
        class="col-12 col-md-5 q-mb-sm"
        filled
        label="Genre"
        color="admin-primary"
        map-options
        emit-value
        :options="Gender.options"
        required
        error-message="Champ requis"
        :error="$v.gender.$error"
        @input="$v.gender.$touch"
        @blur="$v.gender.$touch"
      />
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import DateSelector from '../../utils/DateSelector';
import { Laterality } from '../../../js/Laterality';
import { Gender } from '../../../js/Gender';

export default {
  name: 'AdminMemberCreatePersonalData',
  components: { DateSelector },
  mixins: [validationMixin],

  data: () => ({
    lastName: '',
    firstName: '',
    birthDate: null,
    laterality: null,
    gender: null
  }),

  computed: {
    Laterality() {
      return Laterality;
    },
    Gender() {
      return Gender;
    }
  },

  validations: {
    lastName: { required },
    firstName: { required },
    birthDate: { required },
    laterality: { required },
    gender: { required }
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
