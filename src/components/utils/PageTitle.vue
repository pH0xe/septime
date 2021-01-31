<template>
  <div>
    <h4 class="text-h4 q-mb-xs q-mt-md q-ml-md">
      {{ title }}
    </h4>
    <q-separator />
  </div>
</template>

<script>
export default {
  name: 'PageTitle',

  props: {
    title: {
      type: String,
      required: true
    }
  },

  data: () => ({}),

  computed: {},

  methods: {}
};
</script>

<style scoped>

</style>
