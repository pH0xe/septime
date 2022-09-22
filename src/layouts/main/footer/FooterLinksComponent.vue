<template>
  <ul :class="{ isMobile }">
    <li v-for="(link, index) of links" :key="index">
      <router-link :to="{ name: link.routeName }">{{ link.label }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { LinkModel } from 'src/models/link.model';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    isMobile: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  setup() {
    const links: LinkModel[] = [
      new LinkModel({ label: 'Mentions légales', routeName: 'legal-notice' }),
      new LinkModel({
        label: 'Contacter le webmaster',
        routeName: 'webmaster-contact',
      }),
      new LinkModel({
        label: 'Contacter le club',
        routeName: 'club-contact',
      }),
      new LinkModel({ label: 'Accès au club', routeName: 'access' }),
    ];
    return { links };
  },
});
</script>

<style scoped lang="scss">
ul {
  display: flex;
  justify-content: center;
  li {
    margin: 0 0.8em;
    font-size: 1.2em;

    &:first-child::marker {
      content: '';
    }
  }
}

ul.isMobile {
  flex-direction: column;
  li {
    margin: auto;
    &:first-child::marker {
      content: initial;
    }
  }
}

ul li a {
  color: white;
  text-decoration: none;
}
</style>
