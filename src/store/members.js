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
    // <editor-fold desc="setMembers" defaultstate="collapsed">
    setMembers(state, { members }) {
      state.members = members;
      state.membersActive = members.filter((user) => user.isActive);
      state.membersInactive = members.filter((user) => !user.isActive);
    },
    // </editor-fold>

    // <editor-fold desc="setAccounts" defaultstate="collapsed">
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
    // </editor-fold>

    // <editor-fold desc="setAccountAdmin" defaultstate="collapsed">
    setAccountAdmin(state, { member, value }) {
      const index = state.accounts.indexOf(member);
      state.accounts[index].isAdmin = value;
    },
    // </editor-fold>

    // <editor-fold desc="activateMemberState" defaultstate="collapsed">
    activateMemberState(state, member) {
      let index = state.members.indexOf(member);
      state.members[index].isActive = true;
      state.membersActive.push(state.members[index]);

      index = state.membersInactive.indexOf(member);
      state.membersInactive.splice(index, 1);
    },
    // </editor-fold>

    // <editor-fold desc="deactivateMemberState" defaultstate="collapsed">
    deactivateMemberState(state, member) {
      let index = state.members.indexOf(member);
      state.members[index].isActive = false;
      state.membersInactive.push(state.members[index]);

      index = state.membersActive.indexOf(member);
      state.membersActive.splice(index, 1);
    },
    // </editor-fold>

    // <editor-fold desc="changePaidState" defaultstate="collapsed">
    changePaidState(state, { member, newPayments }) {
      const index = state.members.indexOf(member);
      state.members[index].payments = newPayments;
    },
    // </editor-fold>

    // <editor-fold desc="changePaidState" defaultstate="collapsed">
    removeMemberState(state, { member }) {
      let index = state.members.indexOf(member);
      state.members.splice(index, 1);

      index = state.membersInactive.indexOf(member);
      state.membersInactive.splice(index, 1);
    }
    // </editor-fold>
  },

  actions: {
    // <editor-fold desc="createSubUser" defaultstate="collapsed">
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
    // </editor-fold>

    // <editor-fold desc="fetchMembers" defaultstate="collapsed">
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
          member.certificateDate = member.certificateDate?.toDate();
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
    // </editor-fold>

    // <editor-fold desc="fetchAccounts" defaultstate="collapsed">
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
    // </editor-fold>

    // <editor-fold desc="setAdmin" defaultstate="collapsed">
    setAdmin({ commit }, { member, value }) {
      db.collection('users')
        .doc(member.uid)
        .update({ isAdmin: value })
        .then(() => {
          commit('setAccountAdmin', { member, value });
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
    // </editor-fold>

    // <editor-fold desc="activateAccount" defaultstate="collapsed">
    activateAccount({ commit }, { member }) {
      db.collection('users')
        .doc(member.parentUid)
        .collection('subUsers')
        .doc(member.uid)
        .update({ isActive: true })
        .then(() => {
          commit('activateMemberState', member);
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
    // </editor-fold>

    // <editor-fold desc="deactivateAccount" defaultstate="collapsed">
    deactivateAccount({ commit }, { member }) {
      db.collection('users')
        .doc(member.parentUid)
        .collection('subUsers')
        .doc(member.uid)
        .update({ isActive: false })
        .then(() => {
          commit('deactivateMemberState', member);
        })
        .catch((err) => {
          console.log('Error while deactivating account : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },
    // </editor-fold>

    // <editor-fold desc="changeEmail" defaultstate="collapsed">
    // eslint-disable-next-line no-unused-vars
    changeEmail({ commit }, { newEmail, parentUid, uid }) {
      db.collection('users')
        .doc(parentUid)
        .collection('subUsers')
        .doc(uid)
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
    // </editor-fold>

    // <editor-fold desc="changeAddress" defaultstate="collapsed">
    // eslint-disable-next-line no-unused-vars
    changeAddress({ commit }, { uid, parentUid, newAddress }) {
      db.collection('users')
        .doc(parentUid)
        .collection('subUsers')
        .doc(uid)
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
    // </editor-fold>

    // <editor-fold desc="changePhone" defaultstate="collapsed">
    // eslint-disable-next-line no-unused-vars
    changePhone({ commit }, { uid, parentUid, newPhone }) {
      db.collection('users')
        .doc(parentUid)
        .collection('subUsers')
        .doc(uid)
        .update({ phone: newPhone })
        .catch((err) => {
          console.log('Error while updating phone : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },
    // </editor-fold>

    // <editor-fold desc="changePaidInfo" defaultstate="collapsed">
    changePaidInfo({ commit }, { member, newPayments }) {
      db.collection('users')
        .doc(member.parentUid)
        .collection('subUsers')
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
    // </editor-fold>

    // <editor-fold desc="deactivateMembers" defaultstate="collapsed">
    deactivateMembers({ commit }, { members }) {
      members.forEach((member) => {
        db.collection('users')
          .doc(member.parentUid)
          .collection('subUsers')
          .doc(member.uid)
          .update({ isActive: false })
          .then(() => {
            commit('deactivateMemberState', { member });
          })
          .catch((err) => {
            console.log('Error while deactivate : ', err);
            Notify.create({
              message: `Une erreur s'est produite: ${err}`,
              color: 'negative',
              position: 'top-left'
            });
          });
      });
    },
    // </editor-fold>

    // <editor-fold desc="changeEmergency" defaultstate="collapsed">
    // eslint-disable-next-line no-unused-vars
    changeEmergency({ commit }, { uid, parentUid, newEmergency }) {
      db.collection('users')
        .doc(parentUid)
        .collection('subUsers')
        .doc(uid)
        .update({ emergency: newEmergency })
        .catch((err) => {
          console.log('Error while changing relation information : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },
    // </editor-fold>

    // <editor-fold desc="removeMember" defaultstate="collapsed">
    // eslint-disable-next-line no-unused-vars
    removeMember({ commit }, { uid, parentUid, member }) {
      db.collection('users')
        .doc(parentUid)
        .collection('subUsers')
        .doc(uid)
        .delete()
        .then(() => {
          commit('removeMemberState', { member });
        })
        .catch((err) => {
          console.log('Error while changing relation information : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },
    // </editor-fold>

    // <editor-fold desc="changeLoginEmail" defaultstate="collapsed">
    // eslint-disable-next-line no-unused-vars
    changeLoginEmail({ commit }, { newEmail }) {
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
                message: 'Erreur, déconnectez-vous et reconnectez vous, puis recommencez',
                caption: 'Avec l\'ancien email',
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
    // </editor-fold>

    // <editor-fold desc="changePassword" defaultstate="collapsed">
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
                message: 'Erreur, déconnectez-vous et reconnectez vous',
                caption: 'Avec l\'ancien email',
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
    }
    // </editor-fold>
  }
};
