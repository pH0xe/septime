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
  }
};
</script>
