<template>
  <div class="img-container q-mx-md">
    <a :href="partner.link">
      <q-img
        :src="partner.logo"
        :alt="partner.name"
        :style="partner.customStyle"
      >
        <q-tooltip> {{ partner.name }} </q-tooltip>
      </q-img>
    </a>
  </div>
</template>

<script lang="ts">
import { PartnerModel } from 'src/models/partner.model';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    partner: {
      type: PartnerModel,
      required: true,
    },
  },

  setup() {
    return {};
  },
});
</script>

<style scoped>
div.img-container {
  width: 5%;
  min-width: 50px;
}
</style>
