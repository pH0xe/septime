<template>
  <div>
    <div class="row">
      <div class="col">
        <h5 class="text-h5 q-ma-md">
          Dates de début et de fin de saison
        </h5>
        <q-separator class="separator-margin" />
      </div>
    </div>
    <div class="row q-mx-lg">
      <date-selector
        v-model="startDate"
        class="col-12 col-md-5 q-mr-md"
        color="admin-primary"
        label="Date de début"
        error-message="Champ requis"
        required
        :error="$v.startDate.$error"
        :options="isSunday"
        :touch-fct="$v.startDate.$touch"
      />
      <date-selector
        v-model="endDate"
        class="col-12 col-md-5"
        color="admin-primary"
        label="Date de fin"
        error-message="Champ requis"
        required
        :error="$v.endDate.$error"
        :options="isSunday"
        :touch-fct="$v.endDate.$touch"
      />
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { date as quasarDate } from 'quasar';
import DateSelector from '../../utils/DateSelector';

export default {
  name: 'AdminTrainingCreatePeriod',
  components: { DateSelector },
  mixins: [validationMixin],

  data: () => ({
    startDate: null,
    endDate: null
  }),

  validations: {
    startDate: {
      required,
      mustBeBefore() {
        if (this.startDate && this.endDate) {
          return this.startDate.getTime() < this.endDate.getTime();
        }
        return true;
      }
    },
    endDate: {
      required,
      mustBeAfter() {
        if (this.startDate && this.endDate) {
          return this.startDate.getTime() < this.endDate.getTime();
        }
        return true;
      }
    }
  },

  methods: {
    isSunday(date) {
      const d = quasarDate.extractDate(date, 'YYYY/MM/DD');
      return d.getDay() === 0;
    }
  }
};
</script>

<style scoped>

</style>
