import { Notify } from 'quasar';
import * as firebase from 'firebase';
import authStore from './auth.js';
import { auth, db, storage } from '../boot/firebase';
import { Group } from '../js/Group';


export default {
  namespaced: false,
  state: {
    members: [],
    membersActive: [],
    membersInactive: []
  },

  mutations: {
    setMembers(state, { members }) {
      state.members = members;
      state.membersActive = members.filter((user) => user.isActive || user.isAdmin);
      state.membersInactive = members.filter((user) => !user.isActive && !user.isAdmin);
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
    },

    changePaidState(state, { member, newPayments }) {
      const index = state.members.indexOf(member);
      state.members[index].payments = newPayments;
    },

    changeRelationState(state, { member, newRelation }) {
      const index = state.members.indexOf(member);
      state.members[index].relationEmergency = newRelation;
    },

    deactivateMember(state, { member }) {
      let index = state.members.indexOf(member);
      state.members[index].isActive = false;

      index = state.membersActive.indexOf(member);
      if (index > -1) {
        state.membersActive.splice(index, 1);
      }
      state.membersInactive = [...state.membersInactive, member];
    },

    updateSubUsers(state, { uid, data }) {
      if (authStore.state.currentUser.uid === uid) {
        authStore.state.currentUser.subUsers.push(data);
      }
    }
  },

  actions: {
    createSubUser({ commit }, { uid, data }) {
      db.collection('users')
        .doc(uid)
        .update({ subUsers: firebase.firestore.FieldValue.arrayUnion(data) })
        .then(() => {
          commit('updateSubUsers', { uid, data });
        })
        .catch((err) => {
          console.log('Error while adding profil : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },

    fetchMembers({ commit }) {
      db.collection('users')
        .where('subUsers', '>', [])
        .get()
        .then((querySnapshot) => {
          const collector = [];
          querySnapshot.forEach((item) => {
            item.data().subUsers.forEach((user) => {
              collector.push({ uid: item.id, ...user });
            });
          });
          return collector;
        })
        .then((members) => members.map((member) => {
          member.birthDate = member.birthDate.toDate();
          member.group = Group.from(member.birthDate);
          return member;
        }))
        .then((members) => Promise.all(members.map(async (member) => {
          await storage.ref()
            .child(`profile_pics/${member.uid}/${member.firstName}_${member.lastName}`)
            .getDownloadURL()
            .then((url) => { member.memberAvatar = url; })
            .catch(() => { member.memberAvatar = ''; });
          return member;
        })))
        .then((members) => Promise.all(members.map(async (member) => {
          await storage.ref()
            .child(`certificates/${member.uid}`)
            .getDownloadURL()
            .then((url) => { member.medicalCertificate = url; })
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
      db.collection('users')
        .doc(member.uid)
        .update({ isAdmin: true })
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
      db.collection('users')
        .doc(member.uid)
        .update({ isAdmin: false })
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
      db.collection('users')
        .doc(member.uid)
        .update({ isActive: true })
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
    },

    // eslint-disable-next-line no-unused-vars
    changePassword({ commit }, { newPassword }) {
      const user = auth.currentUser;
      user.updatePassword(newPassword)
        .then(() => {
          Notify.create({
            message: 'Le mot de passe a été mis à jours',
            color: 'positive',
            position: 'top'
          });
        })
        .catch((err) => {
          switch (err.code) {
            case 'auth/invalid-user-token':
            case 'auth/requires-recent-login':
              Notify.create({
                message: 'Vous n\'êtes pas connecté',
                color: 'negative',
                position: 'top'
              });
              break;
            case 'auth/network-request-failed':
              Notify.create({
                message: 'Problème de réseau, vérifier votre connexion',
                color: 'negative',
                position: 'top'
              });
              break;
            case 'auth/too-many-requests':
              Notify.create({
                message: 'Erreur : trop de requête',
                color: 'negative',
                position: 'top'
              });
              break;
            case 'auth/user-token-expired':
              Notify.create({
                message: 'Erreur : reconnectez-vous',
                color: 'negative',
                position: 'top'
              });
              break;
            case 'auth/operation-not-allowed':
              Notify.create({
                message: 'Erreur : Opération interdite, contactez un administrateur',
                color: 'negative',
                position: 'top'
              });
              break;
            case 'Thrown if a method is called with incorrect arguments.':
              Notify.create({
                message: 'Erreur : Le mot de passe saisie est invalide',
                color: 'negative',
                position: 'top'
              });
              break;
            default:
              Notify.create({
                message: 'Une erreur inconnu est survenue',
                color: 'negative',
                position: 'top'
              });
          }
        });
    },

    // eslint-disable-next-line no-unused-vars
    changeEmail({ commit }, { newEmail }) {
      const user = auth.currentUser;
      user.updateEmail(newEmail)
        .then(() => {
          Notify.create({
            message: 'L\'email a été changer',
            color: 'positive',
            position: 'top'
          });
        })
        .catch((err) => {
          switch (err.code) {
            case 'auth/invalid-user-token':
            case 'auth/requires-recent-login':
              Notify.create({
                message: 'Vous n\'êtes pas connecté',
                color: 'negative',
                position: 'top'
              });
              break;
            case 'auth/network-request-failed':
              Notify.create({
                message: 'Problème de réseau, vérifier votre connexion',
                color: 'negative',
                position: 'top'
              });
              break;
            case 'auth/too-many-requests':
              Notify.create({
                message: 'Erreur : trop de requête',
                color: 'negative',
                position: 'top'
              });
              break;
            case 'auth/user-token-expired':
              Notify.create({
                message: 'Erreur : reconnectez-vous',
                color: 'negative',
                position: 'top'
              });
              break;
            case 'auth/operation-not-allowed':
              Notify.create({
                message: 'Erreur : Opération interdite, contactez un administrateur',
                color: 'negative',
                position: 'top'
              });
              break;
            case 'Thrown if a method is called with incorrect arguments.':
              Notify.create({
                message: 'Erreur : Le mot de passe saisie est invalide',
                color: 'negative',
                position: 'top'
              });
              break;
            default:
              Notify.create({
                message: 'Une erreur inconnu est survenue',
                color: 'negative',
                position: 'top'
              });
          }
        });

      db.collection('users')
        .doc(user.uid)
        .update({ email: newEmail })
        .catch((err) => {
          console.log('Error while updating email: ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },

    // eslint-disable-next-line no-unused-vars
    changeAddress({ commit }, { member, newAddress }) {
      db.collection('users')
        .doc(member.uid)
        .update({ address: newAddress })
        .catch((err) => {
          console.log('Error while updating address: ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },

    // eslint-disable-next-line no-unused-vars
    changePhone({ commit }, { member, newPhone, newPhoneEmergency }) {
      db.collection('users')
        .doc(member.uid)
        .update({ phone: newPhone, phoneEmergency: newPhoneEmergency })
        .catch((err) => {
          console.log('Error while updating phone : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },

    changePaidInfo({ commit }, { member, newPayments }) {
      db.collection('users')
        .doc(member.uid)
        .update({ payments: newPayments })
        .then(() => {
          commit('changePaidState', { member, newPayments });
        })
        .catch((err) => {
          console.log('Error while changing paid information : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },

    deactivateMembers({ commit }, { members }) {
      members.forEach((member) => {
        if (member.isAdmin === false) {
          db.collection('users')
            .doc(member.uid)
            .update({ isActive: false })
            .then(() => {
              commit('deactivateMember', { member });
            })
            .catch((err) => {
              console.log('Error while deactivate : ', err);
              Notify.create({
                message: `Une erreur s'est produite: ${err}`,
                color: 'negative',
                position: 'top-left'
              });
            });
        }
      });
    },

    changeRelationEmergency({ commit }, { member, newRelation }) {
      db.collection('users')
        .doc(member.uid)
        .update({ relationEmergency: newRelation })
        .then(() => {
          commit('changeRelationState', { member, newRelation });
        })
        .catch((err) => {
          console.log('Error while changing relation information : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    }
  }
};
