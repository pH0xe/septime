import { Notify } from 'quasar';
import { db } from '../boot/firebase';

export default {
  state: {
    events: []
  },

  mutations: {
    setEvents(state, { events }) {
      state.events = events;
    }
  },

  actions: {
    fetchEvents({ commit }) {
      db.collection('events').get()
        .then((querySnapshot) => {
          const collector = [];
          querySnapshot.forEach((doc) => {
            collector.push({ id: doc.id, ...doc.data() });
          });
          return collector;
        })
        .then((events) => {
          commit('setEvents', { events });
        })
        .catch((err) => {
          console.log('Error while fetching events list : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    }
  }
};
