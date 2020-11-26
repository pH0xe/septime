<template>
  <div>
    <div class="row">
      <div class="col">
        <h5 class="text-h5">
          Informations sportive
        </h5>
        <q-separator class="separator-margin" />
      </div>
    </div>
    <div class="row">
      <q-select
        v-model="weapons"
        class="col-12 col-md-5 q-mr-md q-mb-sm"
        filled
        multiple
        label="Armes"
        hint="Selection multiple possible"
        color="admin-primary"
        map-options
        emit-value
        :options="Weapons.options"
        required
        error-message="Champ requis"
        :error="$v.weapons.$error"
        @input="$v.weapons.$touch"
        @blur="$v.weapons.$touch"
      />
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { isNotEmpty } from '../../../js/vuelidate-custom-validators';
import { Weapons } from '../../../js/Weapons';

export default {
  name: 'AdminMemberCreateSportData',
  mixins: [validationMixin],

  data: () => ({
    weapons: []
  }),

  computed: {
    Weapons() {
      return Weapons;
    }
  },

  validations: {
    weapons: { required, isNotEmpty }
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
