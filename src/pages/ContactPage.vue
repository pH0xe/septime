<template lang="html">
  <q-page>
    <q-splitter
      :value="30"
      :horizontal="$q.platform.is.mobile"
    >
      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-primary q-pa-md"
        >
          <q-tab
            name="legalNotice"
            icon="mdi-book"
            label="Mentions légales"
          />
          <q-tab
            name="webmasterContact"
            icon="mdi-mail"
            label="Contact Webmaster"
          />
          <q-tab
            name="clubContact"
            icon="mdi-mail"
            label="Contact club"
          />
          <q-tab
            name="access"
            icon="mdi-map-marker"
            label="Accès au club"
          />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="legalNotice">
            <contact-legal-notice :pdf-link="pdfUrl" />
          </q-tab-panel>

          <q-tab-panel name="webmasterContact">
            <contact-webmaster />
          </q-tab-panel>

          <q-tab-panel name="clubContact">
            <contact-club :settings="settingsClub" />
          </q-tab-panel>

          <q-tab-panel name="access">
            <contact-access />
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </q-page>
</template>

<script lang="js">
import { mapState, mapActions } from 'vuex';
import ContactAccess from '../components/ContactAccess';
import ContactClub from '../components/ContactClub';
import ContactWebmaster from '../components/ContactWebmaster';
import { storage } from '../boot/firebase';
import ContactLegalNotice from '../components/ContactLegalNotice';

export default {
  name: 'ContactPage',
  components: {
    ContactLegalNotice, ContactWebmaster, ContactClub, ContactAccess
  },

  data: () => ({
    tab: '',
    pdfUrl: ''
  }),

  computed: {
    ...mapState({
      settingsClub: (state) => state.settings.settingsClub
    })
  },


  mounted() {
    this.tab = this.$route.params.to;

    const storageRef = storage.ref();
    storageRef.child('important/cgu.pdf').getDownloadURL()
      .then((url) => {
        this.pdfUrl = url;
      });
  },

  beforeMount() {
    this.fetchSettings();
  },

  methods: {
    ...mapActions(['fetchSettings', 'updateClub'])
  },

  meta: {
    title: 'À propos'
  }

};
</script>
<style lang="scss" scoped>

</style>
