<template>
  <q-item>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-virtual-scroll
        style="max-height: 150px;"
        :items="items"
        separator
      >
        <template v-slot="{ item, index }">
          <q-item
            :key="index"
            v-ripple="clickable"
            :clickable="clickable"
            dense
          >
            <q-item-section>
              <q-item-label>
                • {{ item }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-virtual-scroll>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'ListItem',

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

    items: {
      type: Array,
      required: true
    }
  },

  data: () => ({}),

  computed: {},

  methods: {}
};
</script>

<style scoped>

</style>
