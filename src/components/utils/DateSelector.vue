<template>
  <q-input
    :value="valueFormatted"
    filled
    color="admin-primary"
    mask="##/##/####"
    :error-message="errorMessage"
    :error="error"
    :label="label"
    :required="required"
    :readonly="readonly"
    @input="onInput"
    @blur="touchFct"
  >
    <template v-slot:append>
      <q-icon
        name="event"
        class="cursor-pointer"
      >
        <q-popup-proxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            :value="valueFormatted"
            :options="options"
            :locale="locale"
            color="admin-primary"
            mask="DD/MM/YYYY"
            :readonly="readonly"
            @input="onInput"
          />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>
<script>
import { date } from 'quasar';
import { DateUtils } from '../../js/DateUtils';

export default {
  name: 'DateSelector',
  props: {
    errorMessage: {
      type: String,
      required: true
    },
    value: {
      type: Date,
      required: false,
      default: null
    },
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    error: {
      type: Boolean,
      required: false,
      default: false
    },
    options: {
      type: Function,
      required: false,
      default: () => true
    },
    touchFct: {
      type: Function,
      required: false,
      default: () => true
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    valueFormatted() {
      return date.formatDate(this.value, 'DD/MM/YYYY');
    },

    locale() {
      return DateUtils.locale;
    }
  },

  methods: {
    onInput(event) {
      this.$emit('input', date.extractDate(event, 'DD/MM/YYYY'));
      this.$refs.qDateProxy.hide();
    }
  }

};
</script>

<style scoped>

</style>
