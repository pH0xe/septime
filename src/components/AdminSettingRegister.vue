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
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';


export default {
  name: 'AdminSettingRegister',

  data: () => ({
    isOpen: false
  }),

  computed: {
    ...mapState({
      settings: (state) => state.settings.settings
    }),

    ...mapGetters(['isRegisterOpen']),

    clubMembers() {
      return this.settings.find((setting) => setting.type === 'clubMembers');
    }
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
      const set = Array.from(this.settings);
      const registerSet = set.find((s) => s.type === 'registerSettings');

      this.updateRegisterOpened({ setting: registerSet, value });
    }
  }
};
</script>

<style scoped>

</style>
