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
        <div>Site : <a href="https://escrime-moirans.web.app/">https://escrime-moirans.web.app/</a> </div>
        <div>Facebook : <a href="https://fr-fr.facebook.com/CercleEscrimeDeMoirans">https://fr-fr.facebook.com/CercleEscrimeDeMoirans/</a> </div>
        <div>Instagram : <a href="https://www.instagram.com/escrime_moirans/">https://www.instagram.com/escrime_moirans/</a></div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">
          Le bureau :
        </div>
        <div
          v-if="clubMembers"
          class="q-mb-md"
        >
          <span class="underline"> Le président :</span>
          <ul class="q-ma-none">
            <li>Nom : {{ clubMembers.president.lastName }}</li>
            <li>Prénom : {{ clubMembers.president.firstName }}</li>
            <li>Téléphone : {{ clubMembers.president.phone }}</li>
          </ul>
        </div>
        <div
          v-if="clubMembers"
          class="q-mb-md"
        >
          <span class="underline"> Le trésorier :</span>
          <ul class="q-ma-none">
            <li>Nom : {{ clubMembers.treasurer.lastName }}</li>
            <li>Prénom : {{ clubMembers.treasurer.firstName }}</li>
            <li>Téléphone : {{ clubMembers.treasurer.phone }}</li>
          </ul>
        </div>
        <div
          v-if="clubMembers"
          class="q-mb-md"
        >
          <span class="underline">Le secrétaire :</span>
          <ul class="q-ma-none">
            <li>Nom : {{ clubMembers.secretary.lastName }}</li>
            <li>Prénom : {{ clubMembers.secretary.firstName }}</li>
            <li>Téléphone : {{ clubMembers.secretary.phone }}</li>
          </ul>
        </div>
        <div
          v-if="clubMembers"
          class="q-mb-md"
        >
          <span class="underline">Le maître d'armes :</span>
          <ul class="q-ma-none">
            <li>Nom : {{ clubMembers.master.lastName }}</li>
            <li>Prénom : {{ clubMembers.master.firstName }}</li>
            <li>Téléphone : {{ clubMembers.master.phone }}</li>
          </ul>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">
          Cliquer ici pour envoyer un mail à :
          <a
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
      type: Array,
      required: true
    }
  },

  data: () => ({
    url: 'mailto:escrime.moirans@free.fr'
  }),

  computed: {
    clubMembers() {
      return this.settings.find((setting) => setting.type === 'clubMembers');
    }
  }
};
</script>

<style lang="scss" scoped>
  a{
    text-decoration: none;
    color: black;
  }
  .underline{
    text-decoration: underline;
  }
</style>
