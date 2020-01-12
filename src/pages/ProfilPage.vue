<template lang="html">
  <q-page class="q-ma-md">
    <div class="row justify-center q-mx-sm">
      <div class="page-padded col-12 col-md-8">
        <q-splitter
          :value="20"
        >
          <template v-slot:before>
            <div align="center">
              <h5 class="text-h5 q-ma-none">
                Profil
              </h5>
            </div>
          </template>

          <template v-slot:after>
            <div>
              <h5 class="text-h5 q-ma-none q-ml-md">
                {{ getSectionName }}
              </h5>
            </div>
          </template>
        </q-splitter>
        <q-separator />
        <profil-view ref="profilView" />
        <q-separator />
        <profil-topics
          :topics="topics"
          :ready="isMessagingReady"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
import ProfilView from '../components/profilView';
import { cloudFunctions } from '../boot/firebase';
import ProfilTopics from '../components/profilTopics';

export default {
  name: 'ProfilPage',
  components: { ProfilTopics, ProfilView },

  data: () => ({
    topics: []
  }),

  computed: {
    ...mapGetters(['isMessagingReady']),

    getSectionName() {
      const name = this.$refs.profilView?.tab;
      switch (name) {
        case 'personnal':
          return 'Information personnel';
        case 'payment':
          return 'Information de payement';
        case 'sport':
          return 'Information sportive';
        default:
          return 'Compte';
      }
    }
  },

  beforeMount() {
    cloudFunctions.getTopics().then((topics) => {
      this.topics = topics.data.topics;
    });
  }
};
</script>

<style scoped>

</style>
