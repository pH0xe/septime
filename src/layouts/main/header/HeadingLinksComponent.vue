<template>
  <q-toolbar-title>
    <router-link :to="{ name: 'home' }" class="cursor-pointer">
      <q-avatar class="q-mr-md">
        <img src="~assets/appLogo.svg" />
      </q-avatar>
      <span v-if="mobile">CEM</span>
      <span v-else>Cercle d'escrime de Moirans</span>
    </router-link>
  </q-toolbar-title>
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

<style lang="scss" scoped>
a {
  color: inherit;
  text-decoration: none;
}
</style>
