import { Notify } from 'quasar';
import { db } from '../boot/firebase';

export default {
  state: {
    events: [],
    nextEvents: []
  },

  mutations: {
    setEvents(state, { events }) {
      state.events = events;
    },

    setNextEvents(state, { events }) {
      state.nextEvents = events;
    },

    addEvent(state, { event }) {
      state.events = [...state.events, event];
    },

    deleteEventState(state, { event }) {
      const index = state.events.indexOf(event);
      state.events.splice(index, 1);
    },

    updateEventMembers(state, { id, newRegisterMember }) {
      const item = state.nextEvents.find((e) => e.id === id);
      item.registerMember = newRegisterMember;
    }
  },

  actions: {
    fetchEvents({ commit }) {
      return db.collection('events').get()
        .then((querySnapshot) => {
          const collector = [];
          querySnapshot.forEach((doc) => {
            collector.push({ id: doc.id, ...doc.data() });
          });
          return collector;
        })
        .then((events) => events.map((event) => {
          event.startDate = event.startDate.toDate();
          event.endDate = event.endDate.toDate();
          return event;
        }))
        .then((events) => {
          commit('setEvents', { events });
        })
        .catch((err) => {
          console.log('Error while fetching events list : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'bottom'
          });
        });
    },

    fetchNextEvents({ commit }) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      return db.collection('events')
        .orderBy('startDate').startAt(new Date(d.getTime()))
        .limit(3)
        .get()
        .then((querySnapshot) => {
          const collector = [];
          querySnapshot.forEach((doc) => {
            collector.push({ id: doc.id, ...doc.data() });
          });
          return collector;
        })
        .then((events) => events.map((event) => {
          event.startDate = event.startDate.toDate();
          event.endDate = event.endDate.toDate();
          return event;
        }))
        .then((events) => {
          commit('setNextEvents', { events });
        })
        .catch((err) => {
          console.log('Error while fetching events list : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'bottom'
          });
        });
    },

    subscribeToEvent({ commit }, { id, newRegisterMember }) {
      return db.collection('events').doc(id)
        .update({ registerMember: newRegisterMember })
        .then(() => {
          commit('updateEventMembers', { id, newRegisterMember });
        });
    },

    postNewEvent({ commit }, { event }) {
      return db.collection('events').add(event)
        .then((docReference) => {
          event.id = docReference.id;
          commit('addEvent', { event });
        });
    },

    deleteEvent({ commit }, { event }) {
      return db.collection('events').doc(event.id)
        .delete()
        .then(() => {
          commit('deleteEventState', { event });
        });
    }
  }
};
