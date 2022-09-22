<template>
  <div class="q-mt-md row justify-center items-center">
    <partner-component
      v-for="(partner, index) in partners"
      :key="index"
      :partner="partner"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { partners } from 'src/data/partners.data';
import PartnerComponent from './PartnerComponent.vue';

export default defineComponent({
  components: { PartnerComponent },
  setup() {
    return { partners };
  },
});
</script>

<style scoped></style>
