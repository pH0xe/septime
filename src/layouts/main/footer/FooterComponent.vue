<template>
  <q-footer class="bg-primary text-white">
    <template v-if="isMobile()">
      <partners-list-component />
      <footer-links-component :isMobile="true" />
      <github-component />
    </template>
    <template v-else>
      <partners-list-component />
      <div class="bottom-bar">
        <div></div>
        <footer-links-component />
        <github-component />
      </div>
    </template>
  </q-footer>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent } from 'vue';
import PartnersListComponent from './PartnersListComponent.vue';
import FooterLinksComponent from './FooterLinksComponent.vue';
import GithubComponent from './GithubComponent.vue';

export default defineComponent({
  name: 'FooterComponent',
  components: { PartnersListComponent, FooterLinksComponent, GithubComponent },
  setup() {
    const $q = useQuasar();
    const isMobile = () => $q.screen.lt.md;

    return { isMobile };
  },
});
</script>

<style scoped lang="scss">
div.bottom-bar {
  padding-left: 1%;
  padding-right: 1%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
