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
            <q-card-section v-if="settings && settings.office">
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
                v-if="settings.office.president"
                class="flex items-center justify-between"
              >
                <div class="q-mb-md">
                  <span class="underline"> Le président :</span>
                  <ul class="q-ma-none">
                    <li>Nom : {{ settings.office.president.lastName || "Non communiqué" }}</li>
                    <li>Prénom : {{ settings.office.president.firstName || "Non communiqué" }}</li>
                    <li>Téléphone : {{ settings.office.president.phone || "Non communiqué" }}</li>
                  </ul>
                </div>
                <q-img
                  :src="settings.office.president.picture"
                  spinner-color="grey-4"
                  class="clubImage rounded-borders"
                />
              </div>

              <div
                v-if="settings.office.treasurer"
                class="flex items-center justify-between"
              >
                <div class="q-mb-md">
                  <span class="underline"> Le trésorier :</span>
                  <ul class="q-ma-none">
                    <li>Nom : {{ settings.office.treasurer.lastName || "Non communiqué" }}</li>
                    <li>Prénom : {{ settings.office.treasurer.firstName || "Non communiqué" }}</li>
                    <li>Téléphone : {{ settings.office.treasurer.phone || "Non communiqué" }}</li>
                  </ul>
                </div>
                <q-img
                  :src="settings.office.treasurer.picture"
                  spinner-color="grey-4"
                  class="clubImage rounded-borders"
                />
              </div>

              <div
                v-if="settings.office.secretary"
                class="flex items-center justify-between"
              >
                <div class="q-mb-md">
                  <span class="underline">Le secrétaire :</span>
                  <ul class="q-ma-none">
                    <li>Nom : {{ settings.office.secretary.lastName || "Non communiqué" }}</li>
                    <li>Prénom : {{ settings.office.secretary.firstName || "Non communiqué" }}</li>
                    <li>Téléphone : {{ settings.office.secretary.phone || "Non communiqué" }}</li>
                  </ul>
                </div>
                <q-img
                  :src="settings.office.secretary.picture"
                  spinner-color="grey-4"
                  class="clubImage rounded-borders"
                />
              </div>

              <div
                v-if="settings.office.master"
                class="flex items-center justify-between"
              >
                <div class="q-mb-md">
                  <span class="underline">Le maître d'armes :</span>
                  <ul class="q-ma-none">
                    <li>Nom : {{ settings.office.master.lastName || "Non communiqué" }}</li>
                    <li>Prénom : {{ settings.office.master.firstName || "Non communiqué" }}</li>
                    <li>Téléphone : {{ settings.office.master.phone || "Non communiqué" }}</li>
                  </ul>
                </div>
                <q-img
                  :src="settings.office.master.picture"
                  spinner-color="grey-4"
                  class="clubImage rounded-borders"
                />
              </div>
              <!-- </editor-fold> -->

              <!-- <editor-fold desc="Autres membres du bureau" defaultstate="collapsed"> -->
              <div v-if="settings.office.other && settings.office.other.length>0">
                <div class="row">
                  <div class="col">
                    <h5 class="text-h5">
                      Autres membres du bureau :
                    </h5>
                    <q-separator class="separator-margin" />
                  </div>
                </div>
                <div
                  v-for="officeMember in settings.office.other"
                  :key="officeMember.id"
                  class="flex items-center justify-between"
                >
                  <div class="q-mb-md">
                    <span class="underline"> {{ officeMember.roleName }} :</span>
                    <ul class="q-ma-none">
                      <li>Nom : {{ officeMember.lastName || "Non communiqué" }}</li>
                      <li>Prénom : {{ officeMember.firstName || "Non communiqué" }}</li>
                      <li>Téléphone : {{ officeMember.phone || "Non communiqué" }}</li>
                    </ul>
                  </div>
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
import ContactTabs from '../../../components/all/contact/ContactTabs';

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
