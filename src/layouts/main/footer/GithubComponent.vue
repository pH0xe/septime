<template>
  <div class="row justify-center">
    <a :href="github" target="_blank">
      <q-icon name="mdi-github" />{{ appVersion }}
    </a>
  </div>
</template>

<script lang="ts">
import { useRemoteConfigStore } from 'src/stores/remote-config-store';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const github = 'https://github.com/pH0xe/septime/releases/latest';
    const appVersion = ref('2.x.x');

    const store = useRemoteConfigStore();

    store.appVersion().then((version) => {
      appVersion.value = version;
    });
    return { github, appVersion };
  },
});
</script>

<style scoped lang="scss">
a {
  color: white;
  text-decoration: none;

  .q-icon {
    margin-right: 5px;
    font-size: 1.5em;
  }
}
</style>
