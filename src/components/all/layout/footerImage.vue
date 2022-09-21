<template>
  <a
    :href="link"
    class="full-height"
  >
    <q-avatar
      square
      class="image-footer"
    >
      <img :src="img">
    </q-avatar>
  </a>
</template>

<script>
export default {
  name: 'FooterImage',

  props: {
    link: {
      type: String,
      required: true
    },
    imageLink: {
      type: String,
      required: true
    }
  },

  computed: {
    img() {
      return `../statics/partner/${this.imageLink}`;
    }
  }
};
</script>

<style scoped>
  .image-footer{
    height: 100%;
  }

  a {
    margin: .5% 1%;
  }
</style>
