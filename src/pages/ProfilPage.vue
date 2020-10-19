<template lang="html">
  <q-page class="q-ma-md">
    <div class="row justify-center q-mx-sm">
      <div class="page-padded col-12 col-md-8">
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

</style>
