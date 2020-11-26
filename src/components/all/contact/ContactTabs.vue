<template>
  <q-tabs
    vertical
    class="q-pa-md"
    :class="$q.dark.isActive ? 'text-secondary' : 'text-primary '"
  >
    <q-route-tab
      icon="mdi-book"
      label="Mentions légales"
      :to="{ name: 'contact_tcu' }"
      exact
    />
    <q-route-tab
      icon="mdi-mail"
      label="Contact Webmaster"
      :to="{ name: 'contact_webmaster' }"
      exact
    />
    <q-route-tab
      icon="mdi-mail"
      label="Contact club"
      :to="{ name: 'contact_club' }"
      exact
    />
    <q-route-tab
      icon="mdi-map-marker"
      label="Accès au club"
      :to="{ name: 'contact_access' }"
      exact
    />
  </q-tabs>
</template>

<script>
export default {
  name: 'ContactTabs'
};
</script>
