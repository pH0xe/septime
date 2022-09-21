<template lang="html">
  <q-card
    flat
    bordered
    class="cursor-pointer"
    @click="openDialog"
  >
    <q-img
      placeholder-src="~assets/appLogo.svg"
      :src="imgSrc"
      :ratio="2/1"
    >
      <div class="absolute-bottom">
        <div class="text-h6">
          {{ title }}
        </div>
        <div
          class="ellipsis"
        >
          {{ firstLine }}...
        </div>
      </div>
    </q-img>
  </q-card>
</template>

<script lang="js">
import NewsLightbox from './NewsLightbox';

export default {
  name: 'NewsCard',
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    imgSrc: {
      type: String,
      required: false,
      default: undefined
    },
    date: {
      type: Date,
      required: true
    }
  },

  computed: {
    firstLine() {
      return this.content.replace(/<[^>]*>/g, '');
    }
  },

  methods: {
    openDialog() {
      this.$q.dialog({
        component: NewsLightbox,
        parent: this,
        title: this.title,
        content: this.content,
        imgSrc: this.imgSrc,
        date: this.date
      });
    }
  }
};
</script>

<style scoped>

</style>
