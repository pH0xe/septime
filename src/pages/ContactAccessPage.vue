<template lang="html">
  <q-page class="page-padded col-12">
    <q-splitter
      :value="30"
      :horizontal="$q.platform.is.mobile"
    >
      <template v-slot:before>
        <contact-tabs />
      </template>

      <template v-slot:after>
        <div class="q-px-md">
          <div class="text-h4 q-mb-md">
            Accès
          </div>
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=5.559822320938111%2C45.32003980005907%2C5.570873022079469%2C45.32616514714582&layer=mapnik&marker=45.32310255638657%2C5.565347671508789"
          />
          <q-card
            flat
            class="q-ma-md"
          >
            <q-card-section>
              <div class="text-h6">
                Adresse :
              </div>
              Espace Lionel Terray - Salle Jean Chateigner <br>
              38430 MOIRANS
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-splitter>
  </q-page>
</template>

<script lang="js">
import ContactTabs from '../components/ContactTabs';

export default {
  name: 'ContactAccessPage',
  components: { ContactTabs },

  meta: {
    title: 'Accès'
  }

};
</script>
