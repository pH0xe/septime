<template>
  <div>
    <div class="text-h4 q-mb-md">
      Mentions légales
    </div>
    <q-card
      flat
      class="q-ma-md"
    >
      <q-card-section>
        <div class="text-h6 underline">
          Éditeur du site :
        </div>
        <p class="q-ml-lg">
          CERCLE D’ESCRIME DE MOIRANS <br>
          siège social : Annexe de la Mairie 111, rue de la République - 38430 Moirans. <br>
          téléphone : 07.50.84.52.24 <br>
          Association N° W381002166 <br>
          N° SIRET  39820469300012 <br>
          Agrément J&S: 3883013 du 19/04/1983
        </p>
      </q-card-section>
      <q-card-section>
        <div class="text-h6 underline">
          Directeur de la publication et responsable de la rédaction :
        </div>
        <p class="q-ml-lg">
          Michel GAILLARD
        </p>
      </q-card-section>
      <q-card-section>
        <div class="text-h6 underline">
          Hébergement du site :
        </div>
        <p class="q-ml-lg">
          Google LLC - Californie <br>
          Téléphone : 0805-540-801 ou 08.11.64.00.17
        </p>
      </q-card-section>

      <q-card-section>
        <div class="text-h6 underline">
          Conditions générales d'utilisation :
        </div>
        <div
          v-if="!$q.platform.is.mobile"
          class="container q-pa-lg"
        >
          <q-pdfviewer
            v-model="show"
            :src="pdfLink"
            type="html5"
            content-class="fit container"
            inner-content-class="fit container"
          />
        </div>
        <q-btn
          color="warning"
          label="Télécharger le pdf"
          @click="downloadPDF"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'ContactLegalNotice',

  props: {
    pdfLink: {
      type: String,
      required: true
    }
  },

  data: () => ({
    show: true
  }),

  methods: {
    downloadPDF() {
      window.open(this.pdfLink);
    }
  }
};
</script>

<style scoped>
  .container {
    width: 100%;
    height: 40em;
  }
  .underline {
    text-decoration: underline;
  }
</style>
