<template>
  <q-page>
    <div class="row justify-center q-mx-sm full-height">
      <div class="page-padded col-12 col-md-8 full-height">
        <page-title title="Adhésion au club" />
        <q-banner
          class="bg-negative text-white q-mb-md"
          rounded
        >
          Une restriction mise en place par Apple provoque des dysfonctionnements sur Safari. <br>
          Si le formulaire ne s'affiche pas veuillez utiliser directement ce lien : <br>
          <a
            class="text-white"
            :href="assoconnect"
            target="_blank"
          >{{ assoconnect }}</a>
        </q-banner>
        <iframe
          id="iframe_assoconnect"
          :src="assoconnect"
          width="100%"
          scrolling="no"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PageTitle from '../../components/utils/PageTitle';

export default {
  name: 'RegisterOnAssoconnect',
  components: { PageTitle },

  computed: {
    ...mapGetters(['assoconnect'])
  },

  mounted() {
    if (this.assoconnect == null) {
      this.fetchSettings();
    }
  },

  methods: {
    ...mapActions(['fetchSettings'])
  }
};
</script>

<style scoped>
#iframe_assoconnect {
  border: 0;
  height: 90vh;
}
</style>
