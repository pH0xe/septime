import { Notify } from 'quasar';
import { db } from '../boot/firebase';


export default {
  namespaced: false,
  state: {
    trainings: []
  },

  mutations: {
    setTrainings(state, { trainings }) {
      state.trainings = trainings;
    },

    updateStudent(state, { training }) {
      const updatedTraining = state.trainings.find((item) => training.uid === item.uid);
      updatedTraining.students = training.students;
    }
  },

  actions: {
    fetchTrainings({ commit }) {
      return db.collection('trainings').get()
        .then((querySnapshot) => {
          const collector = [];
          querySnapshot.forEach((item) => {
            collector.push({ uid: item.id, ...item.data() });
          });
          return collector;
        }).then((trainings) => trainings.map((training) => {
          training.startDate = training.startDate.toDate();
          training.endDate = training.endDate.toDate();
          return training;
        }))
        .then((trainings) => {
          commit('setTrainings', { trainings });
        })
        .catch((err) => {
          console.error('Error while fetching trainings list', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'bottom'
          });
        });
    },

    updateStudentPresence({ commit }, { training }) {
      return db.collection('trainings').doc(training.uid)
        .update({ students: training.students })
        .then(() => {
          commit('updateStudent', { training });
        })
        .catch((err) => {
          console.log('Error while updating presence: ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'bottom'
          });
        });
    },

    createMultipleTraining(_, { trainings }) {
      const batch = db.batch();

      trainings.forEach((training) => {
        batch.set(db.collection('trainings').doc(), training);
      });

      return batch.commit()
        .then(() => {
          Notify.create({
            message: 'Entrainement créé avec succès',
            color: 'positive',
            position: 'bottom'
          });
        })
        .catch((err) => {
          console.log('Error while creating training: ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'bottom'
          });
        });
    }
  }
};