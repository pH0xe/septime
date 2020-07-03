<template>
  <div>
    <div class="text-h6">
      L'inscription est-elle ouverte ?
    </div>
    <q-toggle
      v-model="isOpen"
      label="ouvert"
      color="admin-primary"
      @input="onToggleChange"
    />

    <q-separator />

    <div class="text-h6">
      Désactiver tous les comptes (sauf les administrateurs)
    </div>
    <q-btn
      class="q-mt-md q-mb-lg"
      outline
      color="admin-primary"
      label="Désactiver"
      @click="deactivate"
    />

    <q-separator />

    <div class="text-h6 q-mt-lg">
      Lien de l'adhésion AssoConnect
    </div>
    <a
      href="https://help.assoconnect.com/hc/fr/articles/115003805265-Int%C3%A9grer-les-formulaires-de-billetterie-dons-adh%C3%A9sions-en-iframe"
      target="_blank"
    >
      Cliquez ici pour savoir comment obtenir le code iframe à copier
    </a>
    <q-input
      v-model="formURL"
      class="w-50"
      type="url"
      color="admin-primary"
      label="URL de l'adhésion AssoConnect"
    />
    <q-btn
      label="Valider le lien"
      color="admin-primary"
      flat
      @click="changeIframe"
    />
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';


export default {
  name: 'AdminSettingRegister',

  data: () => ({
    isOpen: false,
    formURL: null
  }),

  computed: {
    ...mapState({
      settingsClub: (state) => state.settings.settingsClub,
      settingsRegister: (state) => state.settings.settingsRegister,
      activeMember: (state) => state.members.membersActive
    }),

    ...mapGetters(['isRegisterOpen'])
  },

  beforeMount() {
    this.fetchSettings();
    this.fetchMembers();
  },

  mounted() {
    this.isOpen = this.$store.getters.isRegisterOpen;
    this.formURL = this.settingsRegister.linkToForm;
  },

  methods: {
    ...mapActions(['fetchSettings', 'updateRegisterOpened', 'updateIframeLink', 'deactivateMembers', 'fetchMembers']),

    onToggleChange(value) {
      this.updateRegisterOpened({ setting: this.settingsRegister, value });
    },

    changeIframe() {
      this.updateIframeLink({ setting: this.settingsRegister, value: this.formURL })
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
