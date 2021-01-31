<template>
  <q-item
    v-ripple="clickable"
    :clickable="clickable"
  >
    <q-item-section
      v-if="icon && !avatar"
      avatar
    >
      <q-icon
        :color="iconColor"
        :name="icon"
      />
    </q-item-section>
    <q-item-section
      v-if="icon && avatar"
      avatar
    >
      <q-avatar
        :color="avatarColor"
        :text-color="iconColor"
        :icon="icon"
      />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'SimpleItem',

  props: {
    clickable: {
      type: Boolean,
      required: false,
      default: false
    },

    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      required: true
    },

    icon: {
      type: String,
      required: false,
      default: null
    },

    avatar: {
      type: Boolean,
      required: false,
      default: false
    },

    iconColor: {
      type: String,
      required: false,
      default: 'primary'
    },

    avatarColor: {
      type: String,
      required: false,
      default: 'primary'
    }
  },

  data: () => ({}),

  computed: {},

  mounted() {
    console.log(this.clickable);
  },

  methods: {}
};
</script>

<style scoped>

</style>
