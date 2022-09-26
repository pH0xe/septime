<template>
  <q-page>
    <ArticlesPreview />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ArticlesPreview from 'src/Components/ArticlesPreview.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: { ArticlesPreview },
});
</script>

<style scoped></style>
