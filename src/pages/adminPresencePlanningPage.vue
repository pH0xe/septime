<template>
  <h1>planning page</h1>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AdminPresencePlanningPage',

  computed: {
    ...mapState({
      trainings: (state) => state.trainings.trainings
    })
  }
};
</script>

<style scoped>

</style>
