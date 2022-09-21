<template>
  <q-header class="bg-primary text-white">
    <template v-if="isMobile()">
      <q-toolbar>
        <HeadingLinksComponent :mobile="true" />
        <LeadingButtonsComponent :mobile="true" />
      </q-toolbar>
      <q-toolbar inset>
        <HeaderTabsComponent :mobile="true" />
      </q-toolbar>
    </template>

    <template v-else>
      <q-toolbar>
        <HeadingLinksComponent :mobile="false" />
        <HeaderTabsComponent :mobile="false" />
        <LeadingButtonsComponent :mobile="false" />
      </q-toolbar>
    </template>
  </q-header>
</template>

<script>
import { useQuasar } from 'quasar';
import { defineComponent } from 'vue';
import HeadingLinksComponent from './HeadingLinksComponent.vue';
import HeaderTabsComponent from './HeaderTabsComponent.vue';
import LeadingButtonsComponent from './LeadingButtonsComponent.vue';

export default defineComponent({
  components: {
    HeadingLinksComponent,
    HeaderTabsComponent,
    LeadingButtonsComponent,
  },
  setup() {
    const $q = useQuasar();
    const isMobile = () => $q.screen.lt.md;
    return { isMobile };
  },
});
</script>

<style lang="scss" scoped>
.q-toolbar--inset {
  padding: inherit;
  justify-content: center;
}
</style>
