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

        <navbar-links v-if="!$q.platform.is.mobile" />

        <q-btn-dropdown
          flat
          unelevated
          :ripple="false"
        >
          <template v-slot:label>
            <q-avatar>
              <img src="https://picsum.photos/200">
            </q-avatar>
          </template>

          <q-list>
            <q-item
              v-close-popup
              clickable
              :to="{ name: 'admin_members' }"
            >
              <q-item-section>
                <q-item-label>
                  Admin
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
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

export default {
  name: 'DefaultLayout',
  components: { NavbarLinks },
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
