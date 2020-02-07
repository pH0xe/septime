<template lang="html">
  <q-page>
    <q-tabs
      v-model="tab"
      dense
    >
      <q-tab
        name="webmaster"
        icon="mail"
        label="Contacter le webmaster"
      />
      <q-tab
        name="cem"
        icon="movie"
        label="Contacter le club"
      />
    </q-tabs>
  </q-page>
</template>

<script lang="js">

export default {
  name: 'ContactPage',

  data: () => ({
    tab: ''
  }),

  mounted() {
    this.tab = this.$route.query.to;
  }

};
</script>
