import { Notify } from 'quasar';
import * as firebase from 'firebase/app';
import { db, auth } from '../boot/firebase';

export default {
  state: {
    events: []
  },

  mutations: {
    setEvents(state, { events }) {
      state.events = events;
    },

    addEvent(state, { event }) {
      state.events = [...state.events, event];
    },

    deleteEventState(state, { event }) {
      const index = state.events.indexOf(event);
      state.events.splice(index, 1);
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

    subscribeToEvent(_, { id, role, displayName }) {
      return db.collection('events').doc(id)
        .update({
          registerMember: firebase.firestore.FieldValue.arrayUnion({
            uid: auth.currentUser.uid,
            name: displayName,
            role
          })
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
