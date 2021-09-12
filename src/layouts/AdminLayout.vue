<template lang="html">
  <q-layout view="hHh LpR Lfr">
    <q-header
      reveal
      class="bg-admin-primary text-white"
    >
      <q-toolbar flat>
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
      :content-class="$q.dark.isActive ? 'bg-grey-10' : 'bg-grey-3'"
      @mouseover="toggleMini"
      @mouseout="toggleMini"
    >
      <q-list
        padding
      >
        <div>
          <!-- <editor-fold desc="Members" defaultstate="collapsed"> -->
          <q-expansion-item
            icon="mdi-account-group"
            label="Membres"
            active-class="text-admin-primary"
          >
            <q-item
              v-ripple
              :to="{ name: 'admin_members_list' }"
              clickable
              :inset-level="1"
              active-class="text-admin-primary"
            >
              <q-item-section avatar>
                <q-icon name="mdi-account-details" />
              </q-item-section>

              <q-item-section>
                Listes des membres
              </q-item-section>
            </q-item>
            <q-item
              v-ripple
              :to="{ name: 'admin_members_create' }"
              clickable
              :inset-level="1"
              active-class="text-admin-primary"
            >
              <q-item-section avatar>
                <q-icon name="mdi-account-plus" />
              </q-item-section>

              <q-item-section>
                Ajouter un membres
              </q-item-section>
            </q-item>
          </q-expansion-item>
          <!-- </editor-fold> -->
          <!-- <editor-fold desc="Presence" defaultstate="collapsed"> -->
          <q-expansion-item
            icon="mdi-fencing"
            label="Entrainements"
            active-class="text-admin-primary"
          >
            <q-item
              v-ripple
              :to="{ name: 'admin_presence_planning' }"
              :inset-level="1"
              clickable
              active-class="text-admin-primary"
            >
              <q-item-section avatar>
                <q-icon name="mdi-calendar-clock" />
              </q-item-section>

              <q-item-section>
                Planning
              </q-item-section>
            </q-item>
            <q-item
              v-ripple
              :to="{ name: 'admin_presence_create' }"
              clickable
              :inset-level="1"
              active-class="text-admin-primary"
            >
              <q-item-section avatar>
                <q-icon name="mdi-plus" />
              </q-item-section>

              <q-item-section>
                Nouvel entrainement
              </q-item-section>
            </q-item>
            <q-item
              v-ripple
              :to="{ name: 'admin_presence_result' }"
              clickable
              :inset-level="1"
              active-class="text-admin-primary"
            >
              <q-item-section avatar>
                <q-icon name="mdi-format-list-bulleted" />
              </q-item-section>

              <q-item-section>
                Détails des absences
              </q-item-section>
            </q-item>
            <q-expansion-item
              icon="mdi-list-status"
              label="Présence"
              active-class="text-admin-primary"
              :header-inset-level="1"
            >
              <q-item
                v-ripple
                :to="{ name: 'admin_presence_details', params: { when: 'today' } }"
                clickable
                :inset-level="2"
                active-class="text-admin-primary"
              >
                <q-item-section avatar>
                  <q-icon name="mdi-checkbox-marked-outline" />
                </q-item-section>

                <q-item-section>
                  Aujourd'hui
                </q-item-section>
              </q-item>
              <q-item
                v-ripple
                :to="{ name: 'admin_presence_details', params: { when: 'futur' } }"
                clickable
                :inset-level="2"
                active-class="text-admin-primary"
              >
                <q-item-section avatar>
                  <q-icon name="mdi-checkbox-marked-outline" />
                </q-item-section>

                <q-item-section>
                  Futur
                </q-item-section>
              </q-item>
              <q-item
                v-ripple
                :to="{ name: 'admin_presence_details', params: { when: 'past' } }"
                clickable
                :inset-level="2"
                active-class="text-admin-primary"
              >
                <q-item-section avatar>
                  <q-icon name="mdi-checkbox-marked-outline" />
                </q-item-section>

                <q-item-section>
                  Passé
                </q-item-section>
              </q-item>
            </q-expansion-item>
          </q-expansion-item>
          <!-- </editor-fold> -->
          <!-- <editor-fold desc="Equipment" defaultstate="collapsed"> -->
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
          <!-- </editor-fold> -->
          <!-- <editor-fold desc="Event" defaultstate="collapsed"> -->
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
          <!-- </editor-fold> -->

          <!-- <editor-fold desc="News" defaultstate="collapsed"> -->
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
          <!-- </editor-fold> -->
          <!-- <editor-fold desc="Settings" defaultstate="collapsed"> -->
          <q-expansion-item
            icon="mdi-cog"
            label="Paramètres"
            active-class="text-admin-primary"
          >
            <q-item
              v-ripple
              :to="{ name: 'admin_settings_club' }"
              clickable
              :inset-level="1"
              active-class="text-admin-primary"
            >
              <q-item-section avatar>
                <q-icon name="mdi-account-group" />
              </q-item-section>

              <q-item-section>
                Le bureau
              </q-item-section>
            </q-item>
            <q-item
              v-ripple
              :to="{ name: 'admin_settings_register' }"
              clickable
              :inset-level="1"
              active-class="text-admin-primary"
            >
              <q-item-section avatar>
                <q-icon name="mdi-account-plus" />
              </q-item-section>

              <q-item-section>
                Inscription
              </q-item-section>
            </q-item>
            <q-item
              v-ripple
              :to="{ name: 'admin_settings_permission' }"
              clickable
              :inset-level="1"
              active-class="text-admin-primary"
            >
              <q-item-section avatar>
                <q-icon name="mdi-account-check" />
              </q-item-section>

              <q-item-section>
                Administrateurs
              </q-item-section>
            </q-item>
          </q-expansion-item>
          <!-- </editor-fold> -->
        </div>

        <q-space style="height: 50px;"/>
        <div>
          <q-separator />
          <q-item
            v-ripple
            clickable
            @click="toggleDarkTheme"
          >
            <q-item-section avatar>
              <q-icon :name="getIcon" />
            </q-item-section>
            <q-item-section>
              Mode sombre
            </q-item-section>
          </q-item>

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
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="js">
import { Utils } from '../js/Utils';

export default {
  name: 'AdminLayout',
  data: () => ({
    drawer: false,
    miniState: true
  }),

  computed: {
    getIcon() {
      return this.$q.dark.isActive ? 'mdi-weather-night' : 'mdi-white-balance-sunny';
    }
  },

  methods: {
    toggleMini() {
      this.miniState = !this.miniState;
    },

    toggleDrawer() {
      this.drawer = !this.drawer;
    },

    toggleDarkTheme() {
      Utils.toggleDarkTheme(this);
    }
  }
};
</script>

<style lang="scss">
  .page-padded {
    margin: 2%;
  }
</style>
