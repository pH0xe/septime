<template lang="html">
  <q-tabs
    shrink
    stretch
    :switch-indicator="!mobile"
    :inline-label="!mobile"
  >
    <q-route-tab
      :to="{ name: 'home' }"
      exact
      icon="mdi-home"
      :label="mobile ? undefined : 'Accueil'"
    />
    <q-route-tab
      :to="{ name: 'news' }"
      exact
      icon="mdi-newspaper"
      :label="mobile ? undefined : 'Actualités'"
    />
    <q-route-tab
      :to="{ name: 'calendar' }"
      exact
      icon="mdi-calendar"
      :label="mobile ? undefined : 'Calendrier'"
    />
    <q-route-tab
      :to="{ name: 'usefulInfo' }"
      exact
      icon="mdi-information"
      :label="mobile ? undefined : 'Infos pratiques'"
    />
  </q-tabs>
</template>

<script lang="js">
export default {
  name: 'NavbarLinks',
  props: {
    mobile: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>
