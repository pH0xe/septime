<template lang="html">
  <q-page class="q-ma-md q-my-lg">
    <div class="row items-center justify-center">
      <div class="page-padded col-12 col-md-8 q-px-sm">
        <!-- <editor-fold desc="Compte de connexion" defaultstate="collapsed"> -->
        <div class="row">
          <div class="col">
            <h5 class="text-h5">
              Compte de connexion
            </h5>
            <q-separator class="separator-margin" />
          </div>
        </div>

        <div class="row q-col-gutter-md">
          <div>TEXTE</div>
          <!-- TODO Info + changement -->
        </div>
        <!-- </editor-fold> -->

        <!-- <editor-fold desc="subUsers" defaultstate="collapsed"> -->
        <div class="row">
          <div class="col">
            <h5 class="text-h5">
              Adhérents sous ce compte
            </h5>
            <q-separator class="separator-margin" />
          </div>
        </div>
        <q-list
          bordered
          class="rounded-borders"
        >
          <q-expansion-item
            v-for="user in currentUser.subUsers"
            :key="user.uid"
            expand-separator
            icon="mdi-account"
            :label="getName(user)"
          >
            <profil-view :user="user" />
          </q-expansion-item>
        </q-list>
        <!-- </editor-fold> -->
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import ProfilView from '../components/profilView';
import { cloudFunctions } from '../boot/firebase';

export default {
  name: 'ProfilPage',
  components: { ProfilView },

  data: () => ({
    topics: []
  }),

  computed: {
    ...mapGetters(['isMessagingReady', 'cerfaLink', 'medicalTemplateLink']),

    ...mapState({
      currentUser: (state) => state.auth.currentUser
    })
  },

  async mounted() {
    if (this.cerfaLink === null) {
      await this.fetchCerfa();
    }

    if (this.medicalTemplateLink === null) {
      await this.fetchMedicalTemplate();
    }
  },

  beforeMount() {
    cloudFunctions.getTopics().then((topics) => {
      this.topics = topics.data.topics;
    });
  },

  methods: {
    ...mapActions(['fetchCerfa', 'fetchMedicalTemplate']),

    getName(user) {
      return `${user.firstName} ${user.lastName}`;
    }
  },

  meta: {
    title: 'Profil'
  }
};
</script>

<style scoped>
  .text-h5 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .separator-margin {
    margin-bottom: 1rem;
  }

  .small-padding {
    padding: 2%;
  }
</style>
