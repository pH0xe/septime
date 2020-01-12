import { Notify } from 'quasar';
import * as firebase from 'firebase/app';
import { db } from '../boot/firebase';

export default {
  state: {
    equipmentsTypes: []
  },

  mutations: {
    setEquipmentsTypes(state, { types }) {
      state.equipmentsTypes = types;
    },

    addEquipmentType(state, { equipmentType }) {
      state.equipmentsTypes = [...state.equipmentsTypes, equipmentType];
    },

    addSize(state, { equipmentType, newSize }) {
      const index = state.equipmentsTypes.indexOf(equipmentType);
      // eslint-disable-next-line max-len
      state.equipmentsTypes[index].sizeOption = [...state.equipmentsTypes[index].sizeOption, newSize];
    }
  },

  actions: {
    fetchEquipmentsType({ commit }) {
      db.collection('equipmentsType').get()
        .then((querySnapshot) => {
          const collector = [];
          querySnapshot.forEach((item) => {
            collector.push({ uid: item.id, ...item.data() });
          });
          return collector;
        })
        .then((types) => {
          commit('setEquipmentsTypes', { types });
        })
        .catch((err) => {
          console.error('Error while fetching Equipments Type List', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },

    postNewType({ commit }, { equipmentType }) {
      db.collection('equipmentsType').add(equipmentType)
        .then((docReference) => {
          equipmentType.uid = docReference.id;
          commit('addEquipmentType', { equipmentType });
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

    addNewSize({ commit }, { equipmentType, newSize }) {
      db.collection('equipmentsType').doc(equipmentType.uid)
        .update({ sizeOption: firebase.firestore.FieldValue.arrayUnion(newSize) })
        .then(() => {
          commit('addSize', { equipmentType, newSize });
        })
        .catch((err) => {
          console.log('Error while renting equipment : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    }
  }
};
