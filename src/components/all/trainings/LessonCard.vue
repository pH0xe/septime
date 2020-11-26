<template lang="html">
  <q-card
    flat
    bordered
  >
    <q-card-section class="text-h5">
      Le {{ training.startDate | dateDMY }} à {{ training.startDate | dateHM }}
    </q-card-section>
    <q-card-section>
      À <span class="text-capitalize">
        {{ training.location }}
      </span>
    </q-card-section>

    <q-card-section>
      <div class="q-gutter-sm q-mb-sm">
        <q-badge
          v-for="category in training.group"
          :key="category"
          color="orange"
        >
          <span class="text-uppercase">
            {{ category }}
          </span>
        </q-badge>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="js">
export default {
  name: 'LessonCard',
  props: {
    training: {
      type: Object,
      required: true
    }
  }
};
</script>
