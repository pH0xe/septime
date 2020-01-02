<template lang="html">
  <q-dialog
    ref="dialog"
    :maximized="maximized"
    @hide="onDialogHide"
  >
    <q-card v-touch-swipe.down="handleSwipeDown">
      <q-card-section class="row items-center">
        <div class="text-h6">
          {{ title }}
        </div>
        <q-space />
        <q-btn
          v-close-popup
          round
          flat
          icon="mdi-close"
        />
      </q-card-section>

      <q-img
        :src="imgSrc"
        :ratio="5/2"
      />

      <q-card-section class="row items-center text-subtitle2 text-italic text-grey-6">
        <q-icon
          name="mdi-clock-outline"
          size="xs"
        />
        <div>
          {{ dateFormatted }}
        </div>
      </q-card-section>

      <q-card-section>
        {{ content }}
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="js">
export default {
  name: 'NewsLightbox',
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
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  },
  computed: {
    maximized() {
      return this.$q.platform.is.mobile;
    },
    dateFormatted() {
      return this.date.toLocaleString('fr-FR', {
        timeZone: 'Europe/Paris',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
  },
  methods: {
    show() {
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      this.$emit('hide');
    },
    handleSwipeDown() {
      this.hide();
    }
  }
};
</script>
