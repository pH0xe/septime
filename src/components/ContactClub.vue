<template>
  <div>
    <div class="text-h4 q-mb-md">
      Contacter le club
    </div>
    <q-card
      flat
      class="q-ma-md"
    >
      <q-card-section>
        <div class="text-h6">
          Site et réseaux sociaux :
        </div>
        <div>
          Site : <a
            :class="$q.dark.isActive? 'aDark': 'aLight'"
            href="https://escrime-moirans.web.app/"
          >https://escrime-moirans.web.app/</a>
        </div>
        <div>
          Facebook : <a
            :class="$q.dark.isActive? 'aDark': 'aLight'"
            href="https://fr-fr.facebook.com/CercleEscrimeDeMoirans"
          >https://fr-fr.facebook.com/CercleEscrimeDeMoirans/</a>
        </div>
        <div>
          Instagram : <a
            :class="$q.dark.isActive? 'aDark': 'aLight'"
            href="https://www.instagram.com/escrime_moirans/"
          >https://www.instagram.com/escrime_moirans/</a>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">
          Le bureau :
        </div>
        <div class="flex items-center justify-between">
          <div
            v-if="settings"
            class="q-mb-md"
          >
            <span class="underline"> Le président :</span>
            <ul class="q-ma-none">
              <li>Nom : {{ settings.president.lastName }}</li>
              <li>Prénom : {{ settings.president.firstName }}</li>
              <li>Téléphone : {{ settings.president.phone }}</li>
            </ul>
          </div>
          <q-img
            :src="settings.president.picture"
            spinner-color="grey-4"
            class="clubImage rounded-borders"
          />
        </div>

        <div class="flex items-center justify-between">
          <div
            v-if="settings"
            class="q-mb-md"
          >
            <span class="underline"> Le trésorier :</span>
            <ul class="q-ma-none">
              <li>Nom : {{ settings.treasurer.lastName }}</li>
              <li>Prénom : {{ settings.treasurer.firstName }}</li>
              <li>Téléphone : {{ settings.treasurer.phone }}</li>
            </ul>
          </div>
          <q-img
            :src="settings.treasurer.picture"
            spinner-color="grey-4"
            class="clubImage rounded-borders"
          />
        </div>

        <div class="flex items-center justify-between">
          <div
            v-if="settings"
            class="q-mb-md"
          >
            <span class="underline">Le secrétaire :</span>
            <ul class="q-ma-none">
              <li>Nom : {{ settings.secretary.lastName }}</li>
              <li>Prénom : {{ settings.secretary.firstName }}</li>
              <li>Téléphone : {{ settings.secretary.phone }}</li>
            </ul>
          </div>
          <q-img
            :src="settings.secretary.picture"
            spinner-color="grey-4"
            class="clubImage rounded-borders"
          />
        </div>

        <div class="flex items-center justify-between">
          <div
            v-if="settings"
            class="q-mb-md"
          >
            <span class="underline">Le maître d'armes :</span>
            <ul class="q-ma-none">
              <li>Nom : {{ settings.master.lastName }}</li>
              <li>Prénom : {{ settings.master.firstName }}</li>
              <li>Téléphone : {{ settings.master.phone }}</li>
            </ul>
          </div>
          <q-img
            :src="settings.master.picture"
            spinner-color="grey-4"
            class="clubImage rounded-borders"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">
          Cliquer ici pour envoyer un mail à :
          <a
            :class="$q.dark.isActive? 'aDark': 'aLight'"
            target="_blank"
            :href="url"
          >escrime.moirans@free.fr</a>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>


export default {
  name: 'ContactClub',

  props: {
    settings: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    url: 'mailto:escrime.moirans@free.fr'
  })
};
</script>

<style lang="scss" scoped>
  .aLight{
    text-decoration: none;
    color: black;
  }
  .aDark {
    text-decoration: none;
    color: #6a6967;
  }
  .underline{
    text-decoration: underline;
  }
  .clubImage {
    width: 30%;
    margin-right: 5%;
    margin-bottom: 2%;
  }
</style>
