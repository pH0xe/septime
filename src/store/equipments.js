import { Notify } from 'quasar';
import { db } from '../boot/firebase';

export default {
  state: {
    equipments: []
  },

  mutations: {
    setEquipments(state, { equipments }) {
      state.equipments = equipments;
    },

    addEquipment(state, { equipment }) {
      state.equipments = [...state.equipments, equipment];
    },

    setMember(state, { uid, equipment }) {
      const index = state.equipments.indexOf(equipment);
      state.equipments[index].renterId = uid;
    },

    resetMember(state, { equipment }) {
      const index = state.equipments.indexOf(equipment);
      delete state.equipments[index].renterId;
    },

    updateControlDate(state, { equipment }) {
      const index = state.equipments.indexOf(equipment);
      state.equipments[index].informationDate.control = new Date();
    },

    changeState(state, { equipment, newState }) {
      const index = state.equipments.indexOf(equipment);
      state.equipments[index].state = newState;
    },

    deleteEquipment(state, { equipment }) {
      const index = state.equipments.indexOf(equipment);
      delete state.equipments[index];
    }
  },

  actions: {
    fetchEquipments({ commit }) {
      return db.collection('equipments').get()
        .then((querySnapshot) => {
          const collector = [];
          querySnapshot.forEach((doc) => {
            collector.push({ uid: doc.id, ...doc.data() });
          });
          return collector;
        })
        .then((equipments) => equipments.map((equipment) => {
          equipment.informationDate.buying = equipment.informationDate.buying.toDate();
          equipment.informationDate.control = equipment.informationDate.control.toDate();
          equipment.informationDate.production = equipment.informationDate.production.toDate();
          return equipment;
        }))
        .then((equipments) => {
          commit('setEquipments', { equipments });
        })
        .catch((err) => {
          console.log('Error while fetching equipments list : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },

    // <editor-fold desc="fetchMemberEquipments" defaultstate="collapsed">
    fetchMemberEquipments({ dispatch }, { parentUid, uid }) {
      return db.collection('equipments')
        .where('renterId.parentUid', '==', parentUid)
        .where('renterId.uid', '==', uid)
        .get()
        .then((querySnapshot) => {
          const collector = [];
          querySnapshot.forEach((doc) => {
            collector.push({ uid: doc.id, ...doc.data() });
          });
          return collector;
        })
        .then((equipments) => equipments.map((equipment) => {
          equipment.informationDate.buying = equipment.informationDate.buying.toDate();
          equipment.informationDate.control = equipment.informationDate.control.toDate();
          equipment.informationDate.production = equipment.informationDate.production.toDate();
          dispatch('fetchEquipmentName', { uid: equipment.equipmentType })
            .then((type) => {
              equipment.equipmentType = type;
            });
          return equipment;
        }))
        .then((equipments) => equipments)
        .catch((err) => {
          console.log('Error while fetching equipments list : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },
    // </editor-fold>

    postNewEquipment({ commit }, { equipment }) {
      return db.collection('equipments').add(equipment)
        .then((docReference) => {
          equipment.uid = docReference.id;
          commit('addEquipment', { equipment });
        })
        .then(() => {
          Notify.create({
            message: 'Equipement ajouté',
            color: 'positive',
            position: 'bottom'
          });
        })
        .catch((err) => {
          console.log('Error while adding equipment : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },

    rentEquipment({ commit }, { uid, equipment }) {
      return db.collection('equipments').doc(equipment.uid).update({ renterId: uid })
        .then(() => {
          commit('setMember', { uid, equipment });
        })
        .then(() => {
          Notify.create({
            message: 'Equipement assigné',
            color: 'positive',
            position: 'bottom'
          });
        })
        .catch((err) => {
          console.log('Error while renting equipment : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },

    stopRentEquipment({ commit }, { equipment }) {
      return db.collection('equipments').doc(equipment.uid)
        .update({ renterId: null })
        .then(() => {
          commit('resetMember', { equipment });
        })
        .then(() => {
          Notify.create({
            message: 'Equipement dé-assigné',
            color: 'positive',
            position: 'bottom'
          });
        })
        .catch((err) => {
          console.log('Error while deleting renter : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },

    updateControlEquipment({ commit }, { equipment }) {
      return db.collection('equipments').doc(equipment.uid)
        .update({ 'informationDate.control': new Date() })
        .then(() => {
          commit('updateControlDate', { equipment });
        })
        .then(() => {
          Notify.create({
            message: 'Date mis à jour',
            color: 'positive',
            position: 'bottom'
          });
        })
        .catch((err) => {
          console.log('Error while updating date : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },

    updateStateEquipment({ commit }, { equipment, newState }) {
      return db.collection('equipments').doc(equipment.uid)
        .update({ state: newState })
        .then(() => {
          commit('changeState', { equipment, newState });
        })
        .then(() => {
          Notify.create({
            message: 'Etat mis à jour',
            color: 'positive',
            position: 'bottom'
          });
        })
        .catch((err) => {
          console.log('Error while updating state : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },

    deleteThisEquipment({ commit }, { equipment }) {
      return db.collection('equipments').doc(equipment.uid)
        .delete()
        .then(() => {
          console.log('Equipment succesfully deleted');
          commit('deleteEquipment', { equipment });
        })
        .then(() => {
          Notify.create({
            message: 'Equipement supprimé',
            color: 'positive',
            position: 'bottom'
          });
        })
        .catch((err) => {
          console.log('Error while deleting : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    }
  }
};
