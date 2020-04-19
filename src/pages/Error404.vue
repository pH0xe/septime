<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
        alt="Sad"
      >
    </p>
    <p class="text-faded">
      Désolé, il n'y a rien ici...<strong>(404)</strong>
    </p>
    <q-btn
      color="secondary"
      style="width:200px;"
      to="/"
      label="Retour"
    />
  </div>
</template>

<script>
export default {
  name: 'Error404'
};
</script>
