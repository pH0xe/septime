<template>
  <q-input
    :value="value"
    filled
    color="admin-primary"
    :error-message="errorMessage"
    :error="error"
    :label="label"
    :required="required"
    @input="onInput"
  >
    <template v-slot:append>
      <q-icon
        name="access_time"
        class="cursor-pointer"
      >
        <q-popup-proxy
          transition-show="scale"
          transition-hide="scale"
        >
          <q-time
            :value="value"
            format24h
            color="admin-primary"
            @input="onInput"
          />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'TimePicker',

  props: {
    errorMessage: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
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
    }
  },

  methods: {
    onInput(value) {
      this.$emit('input', value);
    }
  }
};
</script>

<style scoped>

</style>
