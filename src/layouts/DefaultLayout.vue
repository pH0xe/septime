<template lang="html">
  <q-layout view="hHh LpR lFr">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

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

        <navbar-links v-if="!$q.platform.is.mobile" />

        <navbar-account :mobile="$q.platform.is.mobile" />
      </q-toolbar>

      <q-toolbar
        v-if="$q.platform.is.mobile"
      >
        <navbar-links
          mobile
          class="q-mx-auto"
        />
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
import NavbarLinks from '../components/NavbarLinks.vue';
import NavbarAccount from '../components/NavbarAccount';

export default {
  name: 'DefaultLayout',
  components: { NavbarAccount, NavbarLinks }
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
