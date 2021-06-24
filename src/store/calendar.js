import { Notify } from 'quasar';
import { db } from '../boot/firebase';
import { Weapons } from '../js/Weapons';

export default {
  state: {
    eventsCalendar: [],
    trainingsCalendar: []
  },

  mutations: {
    setEventsCalendar(state, { events }) {
      state.eventsCalendar = events;
    },

    setTrainingsCalendar(state, { trainings }) {
      state.trainingsCalendar = trainings;
    }

  },

  actions: {
    fetchEventsCalendar({ commit }) {
      db.collection('events')
        .orderBy('endDate').startAt(new Date(new Date().getTime()))
        .get()
        .then((querySnapshot) => {
          const collector = [];
          querySnapshot.forEach((item) => {
            const origin = item.data();
            origin.startDate = origin.startDate.toDate();
            origin.endDate = origin.endDate.toDate();
            collector.push({ id: item.id, origin, ...item.data() });
          });
          return collector;
        })
        .then((events) => events.map((event) => {
          event.summary = event.title;
          delete event.title;
          event.start = {
            dateTime: event.startDate.toDate().toISOString(), // ISO 8601 formatted
            timeZone: 'Europe/Paris' // Timezone listed as a separate IANA code
          };
          event.end = {
            dateTime: event.endDate.toDate().toISOString(),
            timeZone: 'Europe/Paris'
          };
          delete event.startDate;
          delete event.endDate;
          event.color = 'info';
          event.attendees = [];
          if (event.isCompetition) {
            event.competitionGroup.forEach((group) => {
              event.attendees.push({ id: parseInt(group, 36), displayName: group });
            });
            delete event.competitionGroup;
            const weapons = [];
            if (event.competitionWeapons.includes(Weapons.SABRE)) weapons.push('Sabre');
            if (event.competitionWeapons.includes(Weapons.FOIL)) weapons.push('Fleuret');
            if (event.competitionWeapons.includes(Weapons.EPEE)) weapons.push('Epée');
            delete event.competitionWeapons;
            event.description = `${event.description} Armes : ${weapons}`;
            delete event.isByTeam;
            delete event.isCompetition;
            delete event.isSameGender;
            delete event.meetingPoint;
          }
          delete event.neededRole;
          return event;
        }))
        .then((events) => {
          commit('setEventsCalendar', { events });
        })
        .catch((err) => {
          console.error('Error while fetching event calendar list', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },

    fetchTrainingCalendar({ commit }, { uid }) {
      db.collection('trainings')
        .where('students', 'array-contains', { isPresent: 'here', uid })
        .orderBy('startDate').startAt(new Date(new Date().getTime()))
        .limit(10)
        .get()
        .then((querySnapshot) => {
          const collector = [];
          querySnapshot.forEach((item) => {
            const origin = item.data();
            origin.startDate = origin.startDate.toDate();
            origin.endDate = origin.endDate.toDate();
            collector.push({ id: item.id, origin, ...item.data() });
          });
          return collector;
        })
        .then((trainings) => trainings.map((training) => {
          training.summary = `Cours pour : ${training.group.toString()}`;
          training.description = '';
          training.start = {
            dateTime: training.startDate.toDate().toISOString(), // ISO 8601 formatted
            timeZone: 'Europe/Paris' // Timezone listed as a separate IANA code
          };
          training.end = {
            dateTime: training.endDate.toDate().toISOString(),
            timeZone: 'Europe/Paris'
          };
          delete training.startDate;
          delete training.endDate;
          training.color = 'secondary';
          training.attendees = [];
          training.group.forEach((group) => {
            training.attendees.push({ id: parseInt(group, 36), displayName: group });
          });
          delete training.group;

          return training;
        }))
        .then((trainings) => {
          commit('setTrainingsCalendar', { trainings });
        })
        .catch((err) => {
          console.error('Error while fetching trainingsEvent list', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    }
  }

};
