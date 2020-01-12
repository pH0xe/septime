<template lang="html">
  <q-card
    flat
    bordered
    class="cursor-pointer"
    @click="openDialog"
  >
    <q-img
      :src="imgSrc"
      :ratio="2/1"
    >
      <div class="absolute-bottom">
        <div class="text-h6">
          {{ title }}
        </div>
        <div
          class="text-subtitle1 ellipsis"
          v-html="content"
        />
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
      default: 'https://source.unsplash.com/random/400x200'
    },
    date: {
      type: Date,
      required: true
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
