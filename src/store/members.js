import { Notify } from 'quasar';
import { db } from '../boot/firebase';
import { Group } from '../js/Group';


export default {
  namespaced: false,
  state: {
    members: []
  },

  mutations: {
    setMembers(state, { members }) {
      state.members = members;
    }
  },

  actions: {
    fetchMembers({ commit }) {
      db.collection('users').get()
        .then((querySnapshot) => {
          const collector = [];
          querySnapshot.forEach((item) => {
            collector.push(item.data());
          });
          return collector;
        }).then((members) => members.map((member) => {
          member.birthDate = member.birthDate.toDate();
          member.group = Group.from(member.birthDate);
          return member;
        }))
        .then((members) => {
          commit('setMembers', { members });
        })
        .catch((err) => {
          console.error('Error while fetching member list', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    }
  }
};
