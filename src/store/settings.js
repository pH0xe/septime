import { Notify } from 'quasar';
import { db, storage } from '../boot/firebase';

export default {
  namespaced: false,
  state: {
    settings: [],
    isOpen: false,
    cerfa: null, // lien vers le questionnaire cerfa
    medicalTemplate: null, // lien vers le template d'attestation de cerfa
    tcu: null // lien vers les cgu
  },

  getters: {
    isRegisterOpen(state) {
      return !!state.isOpen;
    },

    cerfaLink(state) {
      return state.cerfa;
    },

    medicalTemplateLink(state) {
      return state.medicalTemplate;
    },

    tcuLink(state) {
      return state.tcu;
    }
  },

  mutations: {
    setSettings(state, { settings }) {
      state.settings = settings;
      state.isOpen = state.settings.registerOpen;
    },

    updateIsOpen(state, { isOpen }) {
      state.isOpen = isOpen;
    },

    // todo
    updateClubState(state, {
      president, treasurer, master, secretary
    }) {
      state.settingsClub.president = president;
      state.settingsClub.treasurer = treasurer;
      state.settingsClub.master = master;
      state.settingsClub.secretary = secretary;
    },

    // todo
    updateHelloasso(state, { linkToForm }) {
      state.settingsRegister.linkToHelloasso = linkToForm;
    },

    setCerfaLink(state, { link }) {
      state.cerfa = link;
    },

    setMedicalLink(state, { link }) {
      state.medicalTemplate = link;
    },

    setTCULink(state, { link }) {
      state.tcu = link;
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
          // <editor-fold desc="President pict" defaultstate="collapsed">
          try {
            item.president.picture = await storage.ref()
              .child('important/president')
              .getDownloadURL();
          } catch (_e) {
            // Ignore
          }
          // </editor-fold>
          // <editor-fold desc="master pict" defaultstate="collapsed">
          try {
            item.master.picture = await storage.ref()
              .child('important/master')
              .getDownloadURL();
          } catch (_e) {
            // Ignore
          }
          // </editor-fold>
          // <editor-fold desc="treasurer pict" defaultstate="collapsed">
          try {
            item.treasurer.picture = await storage.ref()
              .child('important/treasurer')
              .getDownloadURL();
          } catch (_e) {
            // Ignore
          }
          // </editor-fold>
          // <editor-fold desc="secretary pict" defaultstate="collapsed">
          try {
            item.secretary.picture = await storage.ref()
              .child('important/secretary')
              .getDownloadURL();
          } catch (_e) {
            // Ignore
          }
          // </editor-fold>
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
    },

    updateHelloassoLink({ commit }, { setting, value }) {
      db.collection('settings').doc(setting.id)
        .update({ linkToHelloasso: value })
        .then(() => {
          commit('updateHelloasso', { linkToForm: value });
        })
        .catch((err) => {
          console.log('Error while updating iframe link : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },

    async fetchCerfa({ commit }) {
      const result = await storage.ref()
        .child('important/attestation_cerfa.pdf')
        .getDownloadURL()
        .catch((err) => {
          console.error('Cerfa pdf not found :', err);
        });

      if (result) {
        await commit('setCerfaLink', { link: result });
      }
    },

    async fetchMedicalTemplate({ commit }) {
      const result = await storage.ref()
        .child('important/questionnaire_medical.pdf')
        .getDownloadURL()
        .catch((err) => {
          console.error('Medical template pdf not found :', err);
        });

      if (result) {
        await commit('setMedicalLink', { link: result });
      }
    },

    async fetchTCU({ commit }) {
      const result = await storage.ref()
        .child('important/cgu.pdf')
        .getDownloadURL()
        .catch((err) => {
          console.error('Terms and Conditions of Use pdf not found :', err);
        });

      if (result) {
        await commit('setTCULink', { link: result });
      }
    }
  }
};
