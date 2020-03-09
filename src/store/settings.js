import { Notify } from 'quasar';
import { db } from '../boot/firebase';


export default {
  namespaced: false,
  state: {
    settings: []
  },

  mutations: {
    setSettings(state, { settings }) {
      state.settings = settings;
    },

    updateClubState(state, {
      setting, president, treasurer, master, secretary
    }) {
      const index = state.settings.indexOf(setting);
      state.settings[index].president = president;
      state.settings[index].treasurer = treasurer;
      state.settings[index].master = master;
      state.settings[index].secretary = secretary;
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
            setting,
            president: presidentInfo,
            treasurer: treasurerInfo,
            master: masterInfo,
            secretary: secretaryInfo
          });
        })
        .catch((err) => {
          console.log('Error while updating news : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    }
  }
};
