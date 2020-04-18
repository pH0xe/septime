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

    <div class="text-h6 q-mt-lg">
      Lien de l'adhésion HelloAsso
    </div>
    <a
      href="https://aide.helloasso.com/hc/fr/articles/360000433106-Int%C3%A9grer-mon-formulaire-d-adh%C3%A9sion-sur-mon-site-internet"
      target="_blank"
    >
      Cliquez ici pour savoir comment obtenir le code iframe à copier
    </a>
    <q-input
      v-model="formURL"
      class="w-50"
      type="url"
      color="admin-primary"
      label="URL de l'adhésion HelloAsso"
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
      settingsRegister: (state) => state.settings.settingsRegister
    }),

    ...mapGetters(['isRegisterOpen'])
  },

  beforeMount() {
    this.fetchSettings();
  },

  mounted() {
    this.isOpen = this.$store.getters.isRegisterOpen;
  },

  methods: {
    ...mapActions(['fetchSettings', 'updateRegisterOpened']),

    onToggleChange(value) {
      this.updateRegisterOpened({ setting: this.settingsRegister, value });
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
