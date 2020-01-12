import { Notify } from 'quasar';
import { auth, db, storage } from '../boot/firebase';
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
        })
        .then((members) => members.map((member) => {
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
    }
  }
};
