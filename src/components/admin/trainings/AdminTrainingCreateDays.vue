<template>
  <div>
    <div class="row">
      <div class="col">
        <h5 class="text-h5 q-ma-md">
          Sélectionner le jours :
        </h5>
        <q-separator class="separator-margin" />
      </div>
    </div>
    <div class="row q-mx-lg">
      <q-select
        v-model="trainingDay"
        class="col-12 col-md-5"
        :options="weekDays"
        label="Jours"
        color="admin-primary"
        filled
        emit-value
        map-options
        error-message="Champ requis"
        :error="$v.trainingDay.$error"
        @input="$v.trainingDay.$touch"
        @blur="$v.trainingDay.$touch"
      />
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'AdminTrainingCreateDays',
  mixins: [validationMixin],

  data: () => ({
    trainingDay: null
  }),

  computed: {
    weekDays() {
      return [
        { value: 1, label: 'Lundi' }, { value: 2, label: 'Mardi' }, { value: 3, label: 'Mercredi' },
        { value: 4, label: 'Jeudi' }, { value: 5, label: 'Vendredi' }, { value: 6, label: 'Samedi' },
        { value: 0, label: 'Dimanche' }
      ];
    }
  },

  validations: {
    trainingDay: {
      required
    }
  }
};
</script>

<style scoped>

</style>
