<template>
  <q-input
    :value="value"
    filled
    :color="color"
    :rules="['time']"
    :error-message="errorMessage"
    :error="error"
    :label="label"
    :required="required"
    @input="onInput"
    @blur="touchFct"
  >
    <template v-slot:append>
      <q-icon
        name="access_time"
        class="cursor-pointer"
      >
        <q-popup-proxy
          ref="qHourProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-time
            :value="value"
            format24h
            :color="color"
            @input="onInput"
          />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>
<script>

export default {
  name: 'TimeSelector',
  props: {
    errorMessage: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: String,
      required: false,
      default: ''
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
    color: {
      type: String,
      required: false,
      default: 'primary'
    },
    touchFct: {
      type: Function,
      required: false,
      default: () => true
    }
  },

  methods: {
    onInput(event) {
      this.$emit('input', event);
      this.$refs.qHourProxy.hide();
    }
  }

};
</script>

<style scoped>

</style>
