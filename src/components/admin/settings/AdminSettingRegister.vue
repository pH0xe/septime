<template>
  <div>
    <div class="text-h6">
      L'inscription est-elle ouverte ?
    </div>
    <q-toggle
      :value="isRegisterOpen"
      label="ouvert"
      color="admin-primary"
      @input="onToggleChange"
    />

    <q-separator />

    <div class="text-h6">
      Désactiver tous les comptes
    </div>
    <q-btn
      class="q-mt-md q-mb-lg"
      outline
      color="admin-primary"
      label="Désactiver"
      @click="deactivate"
    />

    <q-separator class="" />

    <div class="text-h6 q-mt-lg">
      Lien de l'iframe du formulaire HelloAsso :
    </div>
    <a
      href="https://centredaide.helloasso.com/s/article/integrer-helloasso-a-mon-site-internet"
      target="_blank"
    >
      Cliquez ici pour savoir comment obtenir le code iframe à copier
    </a>
    <q-input
      v-model="helloassoURL"
      type="url"
      color="admin-primary"
      label="URL de l'adhésion HelloAsso"
    />
    <q-btn
      class="q-mt-md"
      label="Valider le lien"
      color="admin-primary"
      outline
      @click="changeHelloasso"
    />

    <section-title
      text="Lien de la campagne assoconnect"
    />
    <a
      href="https://help.assoconnect.com/hc/fr/articles/115003805265#h_01F3QQGWEJ1BEH0BEVJQ6JX0E6"
      target="_blank"
    >
      Comment obtenir ce lien ? <br>
      (exemple : https://cercle-d-escrime-de-moirans.assoconnect.com/collect/description/134026-h-inscriptions-2020-2021 )
    </a>
    <q-input
      v-model="assoconnectURL"
      type="url"
      color="admin-primary"
      label="URL de l'adhésion Assoconnect"
    />
    <q-btn
      class="q-mt-md"
      label="Valider le lien"
      color="admin-primary"
      outline
      @click="changeAssoconnect"
    />
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import SectionTitle from '../../utils/sectionTitle';

export default {
  name: 'AdminSettingRegister',
  components: { SectionTitle },

  data: () => ({
    helloassoURL: null,
    assoconnectURL: null
  }),

  computed: {
    ...mapGetters(['helloAsso', 'assoconnect']),
    ...mapState({
      settings: (state) => state.settings.settings[0],
      activeMember: (state) => state.members.membersActive
    }),

    ...mapGetters(['isRegisterOpen'])
  },

  mounted() {
    this.fetchSettings().then(() => {
      this.helloassoURL = this.helloAsso;
      this.assoconnectURL = this.assoconnect;
    });
  },

  methods: {
    ...mapActions([
      'updateRegisterOpened',
      'deactivateMembers',
      'updateHelloassoLink',
      'fetchSettings',
      'fetchMembers',
      'updateAssoconnectLink'
    ]),

    onToggleChange(value) {
      this.updateRegisterOpened({ setting: this.settings, value });
    },

    changeHelloasso() {
      const newLink = this.helloassoURL;
      this.updateHelloassoLink({ setting: this.settings, value: newLink })
        .then(() => {
          this.$q.notify({
            color: 'positive',
            position: 'bottom',
            message: 'Mise à jour du lien effectuée',
            icon: 'mdi-check'
          });
        });
    },

    changeAssoconnect() {
      const newLink = this.assoconnectURL;
      this.updateAssoconnectLink({ setting: this.settings, value: newLink })
        .then(() => {
          this.$q.notify({
            color: 'positive',
            position: 'bottom',
            message: 'Mise à jour du lien effectuée',
            icon: 'mdi-check'
          });
        });
    },

    deactivate() {
      this.deactivateMembers({ members: this.activeMember })
        .then(() => {
          this.$q.notify({
            color: 'positive',
            position: 'bottom',
            message: 'Désactivation effectuée',
            icon: 'mdi-check'
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: darkred;
}

.w-50 {
  width: 50%;
}
</style>
