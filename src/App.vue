<template lang="html">
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="js">
import { auth } from './boot/firebase';

export default {
  name: 'App',
  beforeCreate() {
    // ""Reactive"" 'currentUser'
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit('updateCurrentUserWithFirebase');
        this.$store.dispatch('fetchCurrentUser');
      }
    }, (error) => {
      console.error(error);
    });
    const result = JSON.parse(localStorage.getItem('darkMode'));
    this.$q.dark.set(result || 'auto');
  },

  meta: {
    title: '',
    titleTemplate: (title) => `${title} - Cercle d'escrime de Moirans`,
    meta: {
      description: { name: 'description', content: 'Le Cercle d\'escrime de Moirans propose la pratique de l\'escrime à tous les âges et aux trois armes, que ce soit comme loisirs ou en compétition.' }
    }
  }
};
</script>
