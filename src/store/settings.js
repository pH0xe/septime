import { Notify } from 'quasar';
import { db, storage } from '../boot/firebase';
import { version } from '../../package.json';


export default {
  namespaced: false,
  state: {
    settingsClub: [],
    settingsRegister: [],
    isOpen: false,
    isLastVersion: false
  },

  getters: {
    isRegisterOpen(state) {
      return !!state.isOpen;
    },

    isLastVersion(state) {
      return state.isLastVersion;
    }
  },

  mutations: {
    setSettings(state, { settings }) {
      state.settingsClub = settings.find((s) => s.type === 'clubSettings');
      state.settingsRegister = settings.find((s) => s.type === 'registerSettings');
      state.isOpen = state.settingsRegister.isOpen;
      state.isLastVersion = state.settingsRegister.lastVersion === version;
    },

    updateIsOpen(state, { isOpen }) {
      state.isOpen = isOpen;
    },

    updateClubState(state, {
      president, treasurer, master, secretary
    }) {
      state.settingsClub.president = president;
      state.settingsClub.treasurer = treasurer;
      state.settingsClub.master = master;
      state.settingsClub.secretary = secretary;
    },

    updateIframe(state, { linkToForm }) {
      state.settingsRegister.linkToForm = linkToForm;
    }
  },

  actions: {
    fetchSettings({ commit }) {
      return db.collection('settings').get()
        .then((querySnapshot) => {
          const collector = [];
          querySnapshot.forEach((item) => {
            collector.push({ id: item.id, ...item.data() });
          });
          return collector;
        })
        .then((settings) => Promise.all(settings.map(async (item) => {
          if (item.type === 'clubSettings') {
            try {
              item.president.picture = await storage.ref()
                .child('important/president')
                .getDownloadURL();
            } catch (_e) {
              // Ignore
            }
            try {
              item.master.picture = await storage.ref()
                .child('important/master')
                .getDownloadURL();
            } catch (_e) {
              // Ignore
            }
            try {
              item.treasurer.picture = await storage.ref()
                .child('important/treasurer')
                .getDownloadURL();
            } catch (_e) {
              // Ignore
            }
            try {
              item.secretary.picture = await storage.ref()
                .child('important/secretary')
                .getDownloadURL();
            } catch (_e) {
              // Ignore
            }
          }
          return item;
        })))
        .then((settings) => {
          commit('setSettings', { settings });
        })
        .catch((err) => {
          console.error('Error while fetching settings list', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'bottom'
          });
        });
    },

    updateClub({ commit }, {
      setting, presidentInfo, treasurerInfo, masterInfo, secretaryInfo
    }) {
      db.collection('settings').doc(setting.id)
        .update({
          president: presidentInfo,
          treasurer: treasurerInfo,
          master: masterInfo,
          secretary: secretaryInfo
        })
        .then(() => {
          commit('updateClubState', {
            president: presidentInfo,
            treasurer: treasurerInfo,
            master: masterInfo,
            secretary: secretaryInfo
          });
        })
        .catch((err) => {
          console.log('Error while updating club settings : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },

    updateRegisterOpened({ commit }, {
      setting, value
    }) {
      db.collection('settings').doc(setting.id)
        .update({ isOpen: value })
        .then(() => {
          commit('updateIsOpen', { isOpen: value });
        })
        .catch((err) => {
          console.log('Error while updating registration open : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },

    updateIframeLink({ commit }, { setting, value }) {
      db.collection('settings').doc(setting.id)
        .update({ linkToForm: value })
        .then(() => {
          commit('updateIframe', { linkToForm: value });
        })
        .catch((err) => {
          console.log('Error while updating iframe link : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    }
  }
};
