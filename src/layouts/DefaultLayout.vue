<template lang="html">
  <q-layout view="hHh LpR lFr">
    <q-header elevated>
      <q-toolbar class="">
        <q-toolbar-title>
          <router-link
            tag="div"
            :to="{name: 'home'}"
            class="cursor-pointer"
          >
            <q-avatar>
              <img src="~assets/quasar-logo.svg">
            </q-avatar>
            Septime
          </router-link>
        </q-toolbar-title>

        <q-tabs
          shrink
          stretch
          :vertical="$q.platform.is.mobile"
        >
          <q-route-tab
            :to="{ name: 'home' }"
            exact
            icon="mdi-home"
          />
          <q-route-tab
            :to="{ name: 'news' }"
            exact
            icon="mdi-newspaper"
          />
          <q-route-tab
            :to="{ name: 'home' }"
            exact
            icon="mdi-calendar"
          />
          <q-route-tab
            :to="{ name: 'admin_members' }"
            exact
            icon="mdi-settings"
          />
        </q-tabs>

        <q-avatar>
          <img src="https://picsum.photos/200">
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-page-container id="page-container">
      <router-view />
    </q-page-container>

    <q-footer>
      <div class="text-subtitle1">
        Sponsors ?
      </div>
    </q-footer>
  </q-layout>
</template>

<script lang="js">
export default {
  name: 'DefaultLayout',
  data: () => ({
    showNavigationLabel: true
  }),

  onCreate() {
    this.showNavigationLabel = !this.$q.platform.is.mobile;
  }
};
</script>

<style lang="scss" scoped>
  .toolbar-padding {
    /* We want it to be like a col-8 */
    /* So 8/12 */
    /* So 2/12 on each side */
    $padding: percentage(2/12);

    padding-left: $padding;
    padding-right: $padding;
  }

  /* Define class available to inner components */
  #page-container /deep/ .page-padded {
    padding-top: 2rem;
  }
</style>
