import { Notify } from 'quasar';
import { db, storage } from '../boot/firebase';
import { Group } from '../js/Group';


export default {
  namespaced: false,
  state: {
    members: []
  },

  mutations: {
    setMembers(state, { members }) {
      state.members = members;
    },

    setMemberAdmin(state, member) {
      const index = state.members.indexOf(member);
      state.members[index].isAdmin = true;
    },

    removeMemberAdmin(state, member) {
      const index = state.members.indexOf(member);
      state.members[index].isAdmin = false;
    },

    activateMember(state, member) {
      const index = state.members.indexOf(member);
      state.members[index].isActive = true;
    }
  },

  actions: {
    fetchMembers({ commit }) {
      db.collection('users').get()
        .then((querySnapshot) => {
          const collector = [];
          querySnapshot.forEach((item) => {
            collector.push({ uid: item.id, ...item.data() });
          });
          return collector;
        }).then((members) => members.map((member) => {
          member.birthDate = member.birthDate.toDate();
          member.group = Group.from(member.birthDate);
          return member;
        }))
        .then((members) => Promise.all(members.map(async (member) => {
          member.memberAvatar = await storage.ref()
            .child(`profile_pics/${member.uid}`)
            .getDownloadURL()
            .catch(() => { member.memberAvatar = 'https://picsum.photos/200'; });
          return member;
        })))
        .then((members) => Promise.all(members.map(async (member) => {
          member.medicalCertificate = await storage.ref()
            .child(`certificates/${member.uid}`)
            .getDownloadURL()
            .catch(() => { member.medicalCertificate = undefined; });
          return member;
        })))
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
    },

    setAdmin({ commit }, { member }) {
      db.collection('users').doc(member.uid).update({ isAdmin: true })
        .then(() => {
          commit('setMemberAdmin', member);
        })
        .catch((err) => {
          console.log('Error while setting Admin : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },

    removeAdmin({ commit }, { member }) {
      db.collection('users').doc(member.uid).update({ isAdmin: false })
        .then(() => {
          commit('removeMemberAdmin', member);
        })
        .catch((err) => {
          console.log('Error while removing Admin : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },

    activateAccount({ commit }, { member }) {
      db.collection('users').doc(member.uid).update({ isActive: true })
        .then(() => {
          commit('activateMember', member);
        })
        .catch((err) => {
          console.log('Error while activating account : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    }
  }
};
