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
            Contacter le webmaster
          </div>
          <q-card
            flat
            class="q-ma-md"
          >
            <q-card-section>
              <div>
                Si vous rencontré un problème sur le site : <br>
                Cliquer ici pour envoyer un mail à : <a
                  :href="url"
                  target="_blank"
                > escrime.moirans@free.fr </a> <br>
                Merci d'indiquer :
                <ul class="q-ma-none">
                  <li>Votre nom</li>
                  <li>Le problème rencontré</li>
                  <li>Les précisions que vous jugez nécessaires</li>
                </ul>
              </div>
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
  name: 'ContactWebmasterPage',
  components: { ContactTabs },
  data: () => ({
    url: 'mailto:escrime.moirans@free.fr?body=Nom%20%3A%0AProbl%C3%A8me%20rencontr%C3%A9%20%3A%0AMessage%20et%20pr%C3%A9cisions%20%3A&to=help.escrime.moirans@gmail.com&subject=[Problème CEM] '
  }),

  meta: {
    title: 'Webmaster'
  }

};
</script>
<style scoped>
a{
  color: red;
  text-decoration: none;
}
</style>
