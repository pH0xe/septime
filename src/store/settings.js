import { Notify } from 'quasar';
import { db } from '../boot/firebase';


export default {
  namespaced: false,
  state: {
    settingsClub: [],
    settingsRegister: [],
    isOpen: false
  },

  getters: {
    isRegisterOpen(state) {
      return !!state.isOpen;
    }
  },

  mutations: {
    setSettings(state, { settings }) {
      state.settingsClub = settings.find((s) => s.type === 'clubSettings');
      state.settingsRegister = settings.find((s) => s.type === 'registerSettings');
      state.isOpen = state.settingsRegister.isOpen;
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
    }
  }
};
