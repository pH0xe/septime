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
      Désactiver tous les comptes (sauf les administrateurs)
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
      :class="$q.platform.is.mobile? '' : 'w-50'"
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
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';


export default {
  name: 'AdminSettingRegister',

  data: () => ({
    helloassoURL: null
  }),

  computed: {
    ...mapState({
      settings: (state) => state.settings.settings[0],
      activeMember: (state) => state.members.membersActive
    }),

    ...mapGetters(['isRegisterOpen'])
  },

  mounted() {
    this.fetchSettings().then(() => {
      this.helloassoURL = this.settings.linkToHelloasso;
    });
  },

  methods: {
    ...mapActions([
      'updateRegisterOpened',
      'deactivateMembers',
      'updateHelloassoLink',
      'fetchSettings',
      'fetchMembers'
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
