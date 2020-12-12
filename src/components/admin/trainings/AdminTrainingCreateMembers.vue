<template>
  <div>
    <div class="row">
      <div class="col">
        <h5 class="text-h5 q-ma-md">
          Catégories et adhérents :
        </h5>
        <q-separator class="separator-margin" />
      </div>
    </div>
    <div class="row q-mx-lg">
      <q-select
        v-model="group"
        class="col-12 col-md-5"
        multiple
        :options="groupOptions"
        label="Catégories"
        hint="Multi-sélection possible"
        color="admin-primary"
        filled
        emit-value
        map-options
        error-message="Champ requis"
        :hide-hint="$v.group.$error"
        :error="$v.group.$error"
        @blur="onGroupBlur"
        @input="$v.group.$touch"
      />
    </div>
    <div class="q-mx-lg q-my-md">
      <admin-presence-member-table
        ref="memberList"
        :members="members"
        :filter-input="group.toString()"
      />
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { Group } from '../../../js/Group';
import AdminPresenceMemberTable from './AdminPresenceMemberTable';

export default {
  name: 'AdminTrainingCreateMembers',
  components: { AdminPresenceMemberTable },
  mixins: [validationMixin],

  props: {
    members: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    group: []
  }),

  computed: {
    groupOptions() {
      return Group.groupOptions;
    }
  },

  methods: {
    onGroupBlur() {
      this.$v.group.$touch();
    }
  },

  validations: {
    group: {
      required
    }
  }
};
</script>

<style scoped>

</style>
