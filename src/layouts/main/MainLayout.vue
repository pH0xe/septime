<template>
  <q-layout view="hHh lpR fff">
    <header-component />

    <q-page-container>
      <router-view />
    </q-page-container>

    <footer-component />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import HeaderComponent from './header/HeaderComponent.vue';
import FooterComponent from './footer/FooterComponent.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    HeaderComponent,
    FooterComponent,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
