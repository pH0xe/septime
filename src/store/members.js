import { Notify } from 'quasar';
import { auth, db, storage } from '../boot/firebase';
import { Group } from '../js/Group';
import { Laterality } from '../js/Laterality';
import { Gender } from '../js/Gender';
import { Weapons } from '../js/Weapons';

export default {
  namespaced: false,
  state: {
    members: [],
    membersActive: [],
    membersInactive: [],
    accounts: []
  },

  mutations: {
    setMembers(state, { members }) {
      state.members = members;
      state.membersActive = members.filter((user) => user.isActive || user.isAdmin);
      state.membersInactive = members.filter((user) => !user.isActive && !user.isAdmin);
    },

    setAccounts(state, { members, subUsers }) {
      members.forEach((member) => {
        let subUsersName = '';
        const filterRes = subUsers.filter((sub) => sub.parentUid === member.uid);
        member.subUsers = filterRes;
        filterRes.forEach((sub) => {
          if (subUsersName !== '') {
            subUsersName = `${subUsersName} - ${sub.firstName} ${sub.lastName}`;
          } else {
            subUsersName = `${sub.firstName} ${sub.lastName}`;
          }
        });
        member.subUsersName = subUsersName;
      });
      state.accounts = members;
    },

    setMemberAdmin(state, { member, value }) {
      const index = state.accounts.indexOf(member);
      state.members[index].isAdmin = value;
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
    }
  },

  actions: {
    // eslint-disable-next-line no-unused-vars
    async createSubUser({ commit }, { uid, data }) {
      let newUid;
      await db.collection('users')
        .doc(uid)
        .collection('subUsers')
        .add(data)
        .then((res) => {
          newUid = res.id;
        })
        .catch((err) => {
          console.log('Error while adding profil : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
      return newUid;
    },

    fetchMembers({ commit }) {
      db.collectionGroup('subUsers')
        .get()
        .then((querySnapshot) => {
          const collector = [];
          querySnapshot.forEach((item) => {
            const parentUid = item.ref.parent.parent.id;
            const uid = item.id;
            collector.push({ parentUid, uid, ...item.data() });
          });
          return collector;
        })
        .then((members) => members.map((member) => {
          member.birthDate = member.birthDate.toDate();
          member.certificateDate = member.certificateDate.toDate();
          member.group = Group.from(member.birthDate);
          member.gender = Gender.from(member.gender);
          member.laterality = Laterality.from(member.laterality);
          member.weapons = Weapons.from(member.weapons);
          return member;
        }))
        .then((members) => Promise.all(members.map(async (member) => {
          await storage.ref()
            .child(`profile_pics/${member.parentUid}/${member.uid}`)
            .getDownloadURL()
            .then((url) => { member.memberAvatar = url; })
            .catch(() => { member.memberAvatar = undefined; });
          return member;
        })))
        .then((members) => Promise.all(members.map(async (member) => {
          await storage.ref()
            .child(`certificates/${member.parentUid}/${member.uid}`)
            .getDownloadURL()
            .then((url) => { member.medicalCertificate = url; })
            .catch(() => { member.medicalCertificate = undefined; });
          return member;
        })))
        .then((members) => Promise.all(members.map(async (member) => {
          await storage.ref()
            .child(`cerfa/${member.parentUid}/${member.uid}`)
            .getDownloadURL()
            .then((url) => { member.cerfa = url; })
            .catch(() => { member.cerfa = undefined; });
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

    fetchAccounts({ commit }) {
      db.collectionGroup('subUsers')
        .get()
        .then((querySnapshot) => {
          const collector = [];
          querySnapshot.forEach((item) => {
            const parentUid = item.ref.parent.parent.id;
            const uid = item.id;
            collector.push({ parentUid, uid, ...item.data() });
          });
          return collector;
        }).then((subUsers) => {
          db.collection('users')
            .get()
            .then((querySnapshot) => {
              const collector = [];
              querySnapshot.forEach((item) => {
                collector.push({ uid: item.id, ...item.data() });
              });
              return collector;
            })
            .then((members) => {
              commit('setAccounts', { members, subUsers });
            })
            .catch((err) => {
              console.error('Error while fetching account list', err);
              Notify.create({
                message: `Une erreur s'est produite: ${err}`,
                color: 'negative',
                position: 'top-left'
              });
            });
        });
    },

    setAdmin({ commit }, { member, value }) {
      db.collection('users')
        .doc(member.uid)
        .update({ isAdmin: value })
        .then(() => {
          commit('setMemberAdmin', { member, value });
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
