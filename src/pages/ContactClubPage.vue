<template lang="html">
  <q-page class="page-padded col-12">
    <q-splitter
      :value="30"
      :horizontal="$q.platform.is.mobile"
    >
      <template v-slot:before>
        <contact-tabs />
      </template>

      <template v-slot:after>
        <div class="q-px-md">
          <div class="text-h4 q-mb-md">
            Contacter le club
          </div>
          <q-card
            flat
            class="q-ma-md"
          >
            <q-card-section>
              <div class="row">
                <div class="col">
                  <h5 class="text-h5">
                    Site et réseaux sociaux :
                  </h5>
                  <q-separator class="separator-margin" />
                </div>
              </div>
              <div>
                Site : <a
                  :class="$q.dark.isActive? 'aDark': 'aLight'"
                  href="https://escrime-moirans.web.app/"
                >https://escrime-moirans.web.app/</a>
              </div>
              <div>
                Facebook : <a
                  :class="$q.dark.isActive? 'aDark': 'aLight'"
                  href="https://fr-fr.facebook.com/CercleEscrimeDeMoirans"
                >https://fr-fr.facebook.com/CercleEscrimeDeMoirans/</a>
              </div>
              <div>
                Instagram : <a
                  :class="$q.dark.isActive? 'aDark': 'aLight'"
                  href="https://www.instagram.com/escrime_moirans/"
                >https://www.instagram.com/escrime_moirans/</a>
              </div>
            </q-card-section>
            <q-card-section v-if="settings">
              <!-- <editor-fold desc="Le bureau" defaultstate="collapsed"> -->
              <div class="row">
                <div class="col">
                  <h5 class="text-h5">
                    Les membres bureau :
                  </h5>
                  <q-separator class="separator-margin" />
                </div>
              </div>
              <div
                v-if="settings.president"
                class="flex items-center justify-between"
              >
                <div class="q-mb-md">
                  <span class="underline"> Le président :</span>
                  <ul class="q-ma-none">
                    <li>Nom : {{ settings.president.lastName }}</li>
                    <li>Prénom : {{ settings.president.firstName }}</li>
                    <li>Téléphone : {{ settings.president.phone || "Non communiqué" }}</li>
                  </ul>
                </div>
                <q-img
                  :src="settings.president.picture"
                  spinner-color="grey-4"
                  class="clubImage rounded-borders"
                />
              </div>

              <div
                v-if="settings.treasurer"
                class="flex items-center justify-between"
              >
                <div class="q-mb-md">
                  <span class="underline"> Le trésorier :</span>
                  <ul class="q-ma-none">
                    <li>Nom : {{ settings.treasurer.lastName }}</li>
                    <li>Prénom : {{ settings.treasurer.firstName }}</li>
                    <li>Téléphone : {{ settings.treasurer.phone || "Non communiqué" }}</li>
                  </ul>
                </div>
                <q-img
                  :src="settings.treasurer.picture"
                  spinner-color="grey-4"
                  class="clubImage rounded-borders"
                />
              </div>

              <div
                v-if="settings.secretary"
                class="flex items-center justify-between"
              >
                <div class="q-mb-md">
                  <span class="underline">Le secrétaire :</span>
                  <ul class="q-ma-none">
                    <li>Nom : {{ settings.secretary.lastName }}</li>
                    <li>Prénom : {{ settings.secretary.firstName }}</li>
                    <li>Téléphone : {{ settings.secretary.phone || "Non communiqué" }}</li>
                  </ul>
                </div>
                <q-img
                  :src="settings.secretary.picture"
                  spinner-color="grey-4"
                  class="clubImage rounded-borders"
                />
              </div>

              <div
                v-if="settings.master"
                class="flex items-center justify-between"
              >
                <div class="q-mb-md">
                  <span class="underline">Le maître d'armes :</span>
                  <ul class="q-ma-none">
                    <li>Nom : {{ settings.master.lastName }}</li>
                    <li>Prénom : {{ settings.master.firstName }}</li>
                    <li>Téléphone : {{ settings.master.phone || "Non communiqué" }}</li>
                  </ul>
                </div>
                <q-img
                  :src="settings.master.picture"
                  spinner-color="grey-4"
                  class="clubImage rounded-borders"
                />
              </div>
              <!-- </editor-fold> -->

              <!-- <editor-fold desc="Autres membres du bureau" defaultstate="collapsed"> -->
              <div class="row">
                <div class="col">
                  <h5 class="text-h5">
                    Autres membres du bureau :
                  </h5>
                  <q-separator class="separator-margin" />
                </div>
              </div>
              <div
                v-for="officeMember in settings.office"
                :key="officeMember.id"
                class="flex items-center justify-between"
              >
                <div class="q-mb-md">
                  <span class="underline"> {{ officeMember.role }} :</span>
                  <ul class="q-ma-none">
                    <li>Nom : {{ officeMember.lastName }}</li>
                    <li>Prénom : {{ officeMember.firstName }}</li>
                    <li>Téléphone : {{ officeMember.phone || "Non communiqué" }}</li>
                  </ul>
                </div>
              </div>
              <!-- </editor-fold> -->
            </q-card-section>
            <q-card-section>
              <div class="text-h6">
                Cliquer ici pour envoyer un mail à :
                <a
                  :class="$q.dark.isActive? 'aDark': 'aLight'"
                  target="_blank"
                  :href="url"
                >escrime.moirans@free.fr</a>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-splitter>
  </q-page>
</template>

<script lang="js">
import { mapState, mapActions } from 'vuex';
import ContactTabs from '../components/ContactTabs';

export default {
  name: 'ContactClubPage',
  components: { ContactTabs },

  data: () => ({
    url: 'mailto:escrime.moirans@free.fr'
  }),

  computed: {
    ...mapState({
      settings: (state) => state.settings.settings[0]
    })
  },

  beforeMount() {
    this.fetchSettings();
  },

  methods: {
    ...mapActions(['fetchSettings'])
  },

  meta: {
    title: 'À propos'
  }

};
</script>
<style scoped>
.aLight{
  text-decoration: none;
  color: black;
}
.aDark {
  text-decoration: none;
  color: #6a6967;
}
.underline{
  text-decoration: underline;
}
.clubImage {
  width: 30%;
  margin-right: 5%;
  margin-bottom: 2%;
}

.separator-margin {
  margin-bottom: 1rem;
}

.text-h5 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
