<template>
  <q-input
    :value="value"
    filled
    color="admin-primary"
    mask="##:##"
    :error-message="errorMessage"
    :error="error"
    :label="label"
    class="full-width"
    :required="required"
    @input="onInput"
  >
    <template v-slot:append>
      <q-icon
        name="access_time"
        class="cursor-pointer"
      >
        <q-popup-proxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-time
            format24h
            :value="value"
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
  name: 'HourSelector',
  props: {
    errorMessage: {
      type: String,
      required: true
    },
    value: {
      type: String,
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
    }
  },

  computed: {

  },

  methods: {
    onInput(event) {
      this.$emit('input', event);
      this.$refs.qDateProxy.hide();
    }
  }

};
</script>

<style scoped>

</style>
