import { fetchAndActivate, getValue } from 'firebase/remote-config';
import { defineStore } from 'pinia';
import { remoteConfig } from 'src/boot/firebase';

export const useRemoteConfigStore = defineStore('remoteConfig', {
  state: () => ({
    counter: 3,
    appVersionState: '',
  }),

  getters: {
    doubleCount(state) {
      return state.counter * 2;
    },
  },

  actions: {
    increment() {
      this.counter += 1;
    },

    appVersion(): Promise<string> {
      if (this.appVersionState === '') {
        const cachedVersion = getValue(remoteConfig, 'app_version').asString();
        if (cachedVersion === '') {
          return this.fetchAppVersion();
        }
        this.appVersionState = cachedVersion;
        return Promise.resolve(cachedVersion);
      }
      return Promise.resolve(this.appVersionState);
    },

    async fetchAppVersion() {
      await fetchAndActivate(remoteConfig);
      const appVersion = getValue(remoteConfig, 'app_version').asString();
      this.appVersionState = appVersion;
      return appVersion;
    },
  },
});
