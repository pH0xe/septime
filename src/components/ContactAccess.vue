<template>
  <div>
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

<script>
export default {
  name: 'ContactAccess'
};
</script>

<style lang="scss" scoped>
  iframe {
    border: solid 1px black;
    height: 20em;
    width: 50%;
    display: block;
    margin: auto;
  }
</style>
