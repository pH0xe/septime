import { Notify, date } from 'quasar';
import { db } from '../boot/firebase';

export default {
  namespaced: false,
  state: {
    trainings: [],
    trainingsPlanning: [],
    trainingsClean: []
  },

  getters: {
    maxID(state) {
      return state.maxID;
    }
  },

  mutations: {
    // <editor-fold desc="setTrainings" defaultstate="collapsed">
    setTrainings(state, { trainings }) {
      const trainingsToStore = [];
      trainings.forEach((training) => {
        let currentDate = date.buildDate({
          year: training.period.start.getFullYear(),
          month: training.period.start.getMonth() + 1,
          date: training.period.start.getDate() + training.day,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        while (currentDate <= training.period.end) {
          trainingsToStore.push({
            date: currentDate,
            ...training
          });

          currentDate = date.addToDate(currentDate, { days: 7 });
        }
      });
      state.trainings = trainingsToStore;
    },
    // </editor-fold>

    // <editor-fold desc="setTrainingsPlanning" defaultstate="collapsed">
    setTrainingsPlanning(state, { trainings }) {
      let id = 0;
      const trainingsToStore = [];
      trainings.forEach((training) => {
        let currentDate = date.buildDate({
          year: training.period.start.getFullYear(),
          month: training.period.start.getMonth() + 1,
          date: training.period.start.getDate() + training.day,
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0
        });
        while (currentDate <= training.period.end) {
          const start = {
            dateTime: date.clone(currentDate),
            timeZone: 'Europe/Paris'
          };

          const end = {
            dateTime: date.clone(currentDate),
            timeZone: 'Europe/Paris'
          };
          start.dateTime = date.adjustDate(start.dateTime, { hours: training.timetable.start.hour, minutes: training.timetable.start.minute });
          end.dateTime = date.adjustDate(end.dateTime, { hours: training.timetable.end.hour, minutes: training.timetable.end.minute });

          start.dateTime = start.dateTime.toISOString();
          end.dateTime = end.dateTime.toISOString();

          if (!training.excludedDates.includes(currentDate.toISOString())) {
            trainingsToStore.push({
              date: currentDate,
              id,
              start,
              end,
              ...training
            });
            id += 1;
          }
          currentDate = date.addToDate(currentDate, { days: 7 });
        }
      });
      state.trainingsPlanning = trainingsToStore;
    },
    // </editor-fold>

    // <editor-fold desc="setTrainingsClean" defaultstate="collapsed">
    setTrainingsClean(state, { trainings }) {
      state.trainingsClean = trainings;
    },
    // </editor-fold>

    // <editor-fold desc="createTrainingState" defaultstate="collapsed">
    createTrainingState(state, { training }) {
      state.trainings.push(training);
    }
    // </editor-fold>
  },

  actions: {
    // <editor-fold desc="fetchTrainings" defaultstate="collapsed">
    fetchTrainings({ commit }) {
      return db.collection('trainings')
        .get()
        .then((querySnapshot) => {
          const collector = [];
          querySnapshot.forEach((item) => {
            collector.push({ uid: item.id, ...item.data() });
          });
          return collector;
        })
        .then((trainings) => trainings.map((training) => {
          training.period.start = training.period?.start.toDate();
          training.period.end = training.period?.end.toDate();
          training.excludedDates = training.excludedDates.map((d) => {
            d = d.toDate();
            return d;
          });
          return training;
        }))
        .then((trainings) => {
          commit('setTrainings', { trainings });
        })
        .catch((err) => {
          console.error('Error while fetching trainings list', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            caption: 'Contactez un administrateur pour plus d\'information',
            icon: 'mdi-alert',
            color: 'negative',
            position: 'bottom'
          });
        });
    },
    // </editor-fold>

    // <editor-fold desc="fetchTrainingsPlanning" defaultstate="collapsed">
    fetchTrainingsPlanning({ commit }) {
      return db.collection('trainings')
        .get()
        .then((querySnapshot) => {
          const collector = [];
          querySnapshot.forEach((item) => {
            collector.push({ uid: item.id, ...item.data() });
          });
          return collector;
        })
        .then((trainings) => trainings.map((training) => {
          training.period.start = training.period?.start.toDate();
          training.period.end = training.period?.end.toDate();
          training.excludedDates = training.excludedDates.map((d) => {
            d = d.toDate().toISOString();
            return d;
          });
          return training;
        }))
        .then((trainings) => trainings.map((training) => {
          training.summary = training.group.toString();
          training.color = 'green-10';
          return training;
        }))
        .then((trainings) => {
          commit('setTrainingsPlanning', { trainings });
        })
        .catch((err) => {
          console.error('Error while fetching trainings list', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            caption: 'Contactez un administrateur pour plus d\'information',
            icon: 'mdi-alert',
            color: 'negative',
            position: 'bottom'
          });
        });
    },
    // </editor-fold>

    // <editor-fold desc="fetchTrainingsClean" defaultstate="collapsed">
    fetchTrainingsClean({ commit }) {
      return db.collection('trainings')
        .get()
        .then((querySnapshot) => {
          const collector = [];
          querySnapshot.forEach((item) => {
            collector.push({ uid: item.id, ...item.data() });
          });
          return collector;
        })
        .then((trainings) => trainings.map((training) => {
          training.period.start = training.period?.start.toDate();
          training.period.end = training.period?.end.toDate();
          training.excludedDates = training.excludedDates.map((d) => d.toDate());
          return training;
        }))
        .then((trainings) => {
          commit('setTrainingsClean', { trainings });
        })
        .catch((err) => {
          console.error('Error while fetching trainings list', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            caption: 'Contactez un administrateur pour plus d\'information',
            icon: 'mdi-alert',
            color: 'negative',
            position: 'bottom'
          });
        });
    },
    // </editor-fold>

    // <editor-fold desc="updateTraining" defaultstate="collapsed">
    updateTraining(_, { training }) {
      const { uid } = training;
      delete training.uid;
      return db.collection('trainings')
        .doc(uid)
        .set(training)
        .catch((err) => {
          console.log('Error while updating training : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            caption: 'Contactez un administrateur pour plus d\'information',
            icon: 'mdi-alert',
            color: 'negative',
            position: 'bottom'
          });
        });
    },
    // </editor-fold>

    // todo a refaire
    updateStudentPresence({ commit }, { training }) {
      return db.collection('trainings').doc(training.uid)
        .update({ students: training.students })
        .then(() => {
          commit('updateStudent', { training });
        })
        .catch((err) => {
          console.error('Error while updating presence: ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'bottom'
          });
        });
    },

    // <editor-fold desc="createTraining" defaultstate="collapsed">
    createTraining({ commit }, { training }) {
      return db.collection('trainings')
        .add(training)
        .then(() => {
          commit('createTrainingState', { training });
        })
        .catch((err) => {
          console.log('Error while creating training : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            caption: 'Contactez un administrateur pour plus d\'information',
            icon: 'mdi-alert',
            color: 'negative',
            position: 'bottom'
          });
        });
    },
    // </editor-fold>

    // <editor-fold desc="deleteTraining" defaultstate="collapsed">
    deleteTraining(_, { training }) {
      return db.collection('trainings').doc(training.uid)
        .delete()
        .catch((err) => {
          console.log('Error while deleting training : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    }
    // </editor-fold>
  }
};
