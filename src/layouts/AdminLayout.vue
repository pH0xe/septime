<template lang="html">
  <q-layout view="hHh LpR Lfr">
    <q-header
      reveal
      elevated
      class="bg-admin-primary text-white"
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
            active-class="text-admin-primary"
          >
            <q-item-section avatar>
              <q-icon name="mdi-account-group" />
            </q-item-section>

            <q-item-section>
              Membres
            </q-item-section>
          </q-item>
          <!-- Attendance -->
          <q-item
            v-ripple
            :to="{ name: 'admin_presence' }"
            clickable
            active-class="text-admin-primary"
          >
            <q-item-section avatar>
              <q-icon name="mdi-sword" />
            </q-item-section>

            <q-item-section>
              Entraînements
            </q-item-section>
          </q-item>
          <!-- Equipment -->
          <q-item
            v-ripple
            :to="{ name: 'admin_equipment' }"
            clickable
            active-class="text-admin-primary"
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
            active-class="text-admin-primary"
          >
            <q-item-section avatar>
              <q-icon name="mdi-calendar" />
            </q-item-section>

            <q-item-section>
              Événements
            </q-item-section>
          </q-item>

          <!-- News -->
          <q-expansion-item
            icon="mdi-newspaper-variant"
            label="Actualités"
            active-class="text-admin-primary"
          >
            <q-item
              v-ripple
              clickable
              :to="{name: 'admin_news'}"
              exact
              :inset-level="1"
              active-class="text-admin-primary"
            >
              <q-item-section avatar>
                <q-icon name="mdi-animation-outline" />
              </q-item-section>

              <q-item-section>
                Liste des actualités
              </q-item-section>
            </q-item>

            <q-item
              v-ripple
              clickable
              :to="{name: 'admin_news_create'}"
              exact
              :inset-level="1"
              active-class="text-admin-primary"
            >
              <q-item-section avatar>
                <q-icon name="mdi-pencil" />
              </q-item-section>

              <q-item-section>
                Créer une actualité
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <!-- Settings -->
          <q-item
            v-ripple
            :to="{ name: 'admin_settings' }"
            clickable
            active-class="text-admin-primary"
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
