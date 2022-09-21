<template>
  <q-btn-group unelevated class="q-ml-md">
    <q-btn
      color="white"
      text-color="primary"
      :label="mobile ? '' : 'Connexion'"
      icon="mdi-login-variant"
    />

    <q-separator vertical color="primary" />

    <q-btn color="white" text-color="primary" icon="mdi-information-outline" />
  </q-btn-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    mobile: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
