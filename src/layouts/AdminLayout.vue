<template lang="html">
  <q-layout view="hHh LpR Lfr">
    <q-header
      reveal
      elevated
      class="bg-teal-6 text-white"
    >
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="mdi-menu"
          @click="toggleDrawer"
        />
        <q-toolbar-title>
          <q-avatar>
            <img
              src="~assets/appLogo.svg"
            >
          </q-avatar>
          Administration
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"

      bordered
      content-class="bg-grey-3"
      @mouseover="toggleMini"
      @mouseout="toggleMini"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <!-- Members -->
          <q-item
            v-ripple
            :to="{ name: 'admin_members' }"
            clickable
          >
            <q-item-section avatar>
              <q-icon name="mdi-account-group" />
            </q-item-section>

            <q-item-section>
              Membres
            </q-item-section>
          </q-item>

          <!-- Equipment -->
          <q-item
            v-ripple
            :to="{ name: 'admin_equipment' }"
            clickable
          >
            <q-item-section avatar>
              <q-icon name="mdi-tshirt-crew" />
            </q-item-section>

            <q-item-section>
              Matériels
            </q-item-section>
          </q-item>

          <!-- Events -->
          <q-item
            v-ripple
            :to="{ name: 'admin_events' }"
            clickable
          >
            <q-item-section avatar>
              <q-icon name="mdi-calendar" />
            </q-item-section>

            <q-item-section>
              Évènements
            </q-item-section>
          </q-item>

          <!-- News -->
          <q-item
            v-ripple
            :to="{ name: 'admin_news' }"
            clickable
          >
            <q-item-section avatar>
              <q-icon name="mdi-newspaper-variant" />
            </q-item-section>

            <q-item-section>
              Actualités
            </q-item-section>
          </q-item>

          <!-- Settings -->
          <q-item
            v-ripple
            :to="{ name: 'admin_settings' }"
            clickable
          >
            <q-item-section avatar>
              <q-icon name="mdi-settings" />
            </q-item-section>

            <q-item-section>
              Paramètres
            </q-item-section>
          </q-item>

          <!-- Button back to home page -->
          <div class="fixed-bottom">
            <q-separator />
            <q-item
              v-ripple
              :to="{ name: 'home' }"
              exact
              clickable
            >
              <q-item-section avatar>
                <q-icon name="mdi-exit-to-app" />
              </q-item-section>
              <q-item-section>
                Retour au site
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="js">
export default {
  name: 'AdminLayout',
  data: () => ({
    drawer: false,
    miniState: true
  }),

  methods: {
    toggleMini() {
      this.miniState = !this.miniState;
    },

    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  }
};
</script>
