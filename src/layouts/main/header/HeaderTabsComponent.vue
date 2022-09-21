<template>
  <q-tabs shrink stretch inline-label :switch-indicator="!mobile">
    <q-route-tab
      v-for="(link, index) in links"
      :key="index"
      :icon="link.icon"
      :to="{ name: link.name }"
      :label="mobile ? '' : link.label"
      exact
      replace
    />
  </q-tabs>
</template>

<script lang="ts">
import { LinkModel } from 'src/models/link.model';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    mobile: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const links = [
      new LinkModel({
        icon: 'mdi-home',
        label: 'Accueil',
        name: 'home',
      }),
      new LinkModel({
        icon: 'mdi-newspaper',
        label: 'Actualités',
        name: 'news',
      }),
      new LinkModel({
        icon: 'mdi-information-variant',
        label: 'Infos pratiques',
        name: 'infos',
      }),
    ];

    return { links };
  },
});
</script>

<style lang="scss" scoped></style>
