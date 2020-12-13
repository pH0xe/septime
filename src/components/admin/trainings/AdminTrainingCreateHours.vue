<template>
  <div>
    <div class="row">
      <div class="col">
        <h5 class="text-h5 q-ma-md">
          Plage horaire :
        </h5>
        <q-separator class="separator-margin" />
      </div>
    </div>
    <div class="row q-mx-lg">
      <time-selector
        v-model="startHour"
        class="col-12 col-md-5 q-mr-md"
        label="Heure de début"
        error-message="Champ requis"
        :error="$v.startHour.$error"
        :touch-fct="$v.startHour.$touch"
        color="admin-primary"
        required
      />
      <time-selector
        v-model="endHour"
        class="col-12 col-md-5"
        label="Heure de fin"
        error-message="Champ requis"
        :error="$v.endHour.$error"
        :touch-fct="$v.endHour.$touch"
        color="admin-primary"
        required
      />
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { date } from 'quasar';
import TimeSelector from '../../utils/TimeSelector';

export default {
  name: 'AdminTrainingCreateHours',
  components: { TimeSelector },
  mixins: [validationMixin],

  data: () => ({
    startHour: '',
    endHour: ''
  }),

  validations: {
    startHour: {
      required,
      mustBeBefore() {
        if (this.startHour && this.endHour) {
          const start = {
            hour: this.startHour.substr(0, 2),
            minute: this.startHour.substr(3, 2)
          };
          const dStart = date.buildDate({ hours: start.hour, minutes: start.minute });
          const end = {
            hour: this.endHour.substr(0, 2),
            minute: this.endHour.substr(3, 2)
          };
          const dEnd = date.buildDate({ hours: end.hour, minutes: end.minute });

          return dStart.getTime() < dEnd.getTime();
        }
        return true;
      }
    },
    endHour: {
      required,
      mustBeAfter() {
        if (this.startHour && this.endHour) {
          const start = {
            hour: this.startHour.substr(0, 2),
            minute: this.startHour.substr(3, 2)
          };
          const dStart = date.buildDate({ hours: start.hour, minutes: start.minute });
          const end = {
            hour: this.endHour.substr(0, 2),
            minute: this.endHour.substr(3, 2)
          };
          const dEnd = date.buildDate({ hours: end.hour, minutes: end.minute });

          return dStart.getTime() < dEnd.getTime();
        }
        return true;
      }
    }
  }
};
</script>

<style scoped>

</style>
