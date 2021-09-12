<template>
  <div class="row">
    <div class="col">
      <h5 class="text-h5 q-ma-md">
        {{ text }} <br>
      </h5>
      <q-separator class="separator-margin" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionTitle',

  props: {
    text: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>

</style>
