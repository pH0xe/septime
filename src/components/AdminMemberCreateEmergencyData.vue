<template>
  <div>
    <div class="row">
      <div class="col">
        <h5 class="text-h5">
          Contact d'urgence
        </h5>
        <q-separator class="separator-margin" />
      </div>
    </div>
    <div class="row">
      <q-input
        v-model="emergency.phone"
        label="Numéro de téléphone d'urgence"
        filled
        color="admin-primary"
        class="col-12 col-md-5 q-mr-md q-mb-sm"
        mask="## ## ## ## ##"
        :error="$v.emergency.phone.$error"
        error-message="Champ requis"
        required
        unmasked-value
        @input="$v.emergency.phone.$touch"
        @blur="$v.emergency.phone.$touch"
      />
      <q-input
        v-model="emergency.relation"
        class="col-12 col-md-5 q-mb-sm"
        label="Relation avec le contact d'urgence"
        filled
        color="admin-primary"
        required
        error-message="Champ requis"
        :error="$v.emergency.relation.$error"
        @input="$v.emergency.relation.$touch"
        @blur="$v.emergency.relation.$touch"
      />
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { length } from '../js/vuelidate-custom-validators';

export default {
  name: 'AdminMemberCreateEmergencyData',
  mixins: [validationMixin],

  data: () => ({
    emergency: {
      phone: null,
      relation: ''
    }
  }),

  validations: {
    emergency: {
      phone: {
        required,
        length: length(10)
      },
      relation: {
        required
      }
    }
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
