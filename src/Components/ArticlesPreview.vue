<template>
  <section>
    <article class="q-ma-sm">test</article>
    <article class="q-ma-sm">test</article>
    <article class="q-ma-sm">test</article>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
section {
  display: flex;
  overflow: auto;
  flex: none;
  width: 100%;
  flex-flow: row nowrap;
  scroll-snap-type: x mandatory;

  article {
    text-align: center;
    scroll-snap-align: center;
    flex: none;
    line-height: 128px;
    font-size: 64px;
    width: 100%;
  }
}
</style>
