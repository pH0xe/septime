import { Notify, date as quasarDate, date } from 'quasar';
import { db } from '../boot/firebase';


export default {
  namespaced: false,
  state: {
    trainings: [],
    todaysTrainings: [],
    futurTrainings: [],
    pastTrainings: []
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

    // <editor-fold desc="setTodaysTrainings" defaultstate="collapsed">
    setTodaysTrainings(state, { trainings }) {
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
        const compareTo = date.buildDate({
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0
        });
        while (date.getDateDiff(currentDate, compareTo, 'seconds') !== 0 && currentDate <= training.period.end) {
          currentDate = date.addToDate(currentDate, { days: 7 });
        }
        trainingsToStore.push({
          date: currentDate,
          ...training
        });
      });
      state.todaysTrainings = trainingsToStore;
    },
    // </editor-fold>

    // <editor-fold desc="createTrainingState" defaultstate="collapsed">
    createTrainingState(state, { training }) {
      state.trainings.push(training);
    }
    // </editor-fold>
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
          training.period.start = training.period?.start.toDate();
          training.period.end = training.period?.end.toDate();
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

    fetchTodaysTrainings({ commit }) {
      const day = new Date().getDay();
      let filterDate = new Date();
      filterDate.setHours(0, 0, 0, 0);
      filterDate = filterDate.getTime();
      return db.collection('trainings')
        .where('day', '==', day)
        .where('period.end', '>=', new Date(filterDate))
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
          return training;
        }))
        .then((trainings) => {
          commit('setTodaysTrainings', { trainings });
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

    // TODO a refaire
    fetchCurrentUserTrainings({ commit }, { uid }) {
      return db.collection('trainings')
        .where('students', 'array-contains', { isPresent: 'here', uid })
        .orderBy('startDate').startAt(new Date(new Date().getTime()))
        .limit(3)
        .get()
        .then((querySnapshot) => {
          const collector = [];
          querySnapshot.forEach((item) => {
            collector.push({ uid: item.id, ...item.data() });
          });
          return collector;
        })
        .then((trainings) => trainings.map((training) => {
          training.startDate = training.startDate.toDate();
          training.endDate = training.endDate.toDate();
          return training;
        }))
        .then((trainings) => {
          commit('setCurrentUserTrainings', { trainings });
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

    // todo a refaire
    updateStudents({ commit }, {
      trainings, newStudents, newGroup, newStartHour, newStartMinute, newEndHour, newEndMinute
    }) {
      trainings.forEach((training) => {
        const newStartDate = quasarDate.adjustDate(training.startDate,
          {
            hours: newStartHour,
            minutes: newStartMinute
          });
        const newEndDate = quasarDate.adjustDate(training.endDate,
          {
            hours: newEndHour,
            minutes: newEndMinute
          });
        db.collection('trainings')
          .doc(training.uid)
          .update({
            students: newStudents,
            group: newGroup,
            startDate: newStartDate,
            endDate: newEndDate
          })
          .then(() => {
            commit('updateStudent', { training });
          })
          .catch((err) => {
            console.error('Error while updating student list: ', err);
            Notify.create({
              message: `Une erreur s'est produite: ${err}`,
              color: 'negative',
              position: 'bottom'
            });
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

    // todo a verifier
    deleteTraining({ commit }, { training }) {
      db.collection('trainings').doc(training.uid)
        .delete()
        .then(() => {
          commit('deleteTrainingState', { training });
        })
        .catch((err) => {
          console.log('Error while deleting training : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    }
  }
};
