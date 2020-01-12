import { Gender } from './Gender';
import { Weapons } from './Weapons';
import { Group } from './Group';

export default [
  {
    uid: '1',
    memberAvatar: 'https://picsum.photos/200',
    isActive: true,
    isAdmin: true,
    firstName: 'Julien',
    lastName: 'Reig',
    birthDate: new Date(2000, 3, 6),
    phone: '01 23 45 67 89',
    emergencyPhone: '01 23 45 67 89',
    email: 'email@email.com',
    medicalCertificate: 'ici',
    cerfa: false,
    gender: Gender.MALE,
    weapons: [Weapons.FOIL, Weapons.EPEE],
    group: Group.M20,
    isChild: false,
    payment: {
      paid: true,
      amount: 200,
      deposit: true
    }
  },
  {
    uid: '2',
    memberAvatar: 'https://picsum.photos/200',
    isActive: false,
    isAdmin: false,
    firstName: 'Thomas',
    lastName: 'Durand',
    birthDate: new Date(1999, 3, 6),
    phone: '01 23 45 67 89',
    emergencyPhone: '01 23 45 67 89',
    email: 'email@email.com',
    medicalCertificate: '',
    cerfa: true,
    gender: Gender.MALE,
    weapons: [Weapons.EPEE],
    group: Group.SENIORS,
    isChild: false,
    payment: {
      paid: true,
      amount: 200,
      deposit: true
    }
  },
  {
    uid: '4',
    memberAvatar: 'https://picsum.photos/200',
    isActive: true,
    isAdmin: false,
    firstName: 'Sandrine',
    lastName: 'Tale',
    birthDate: new Date(1990, 7, 5),
    phone: '01 23 45 67 89',
    emergencyPhone: '01 23 45 67 89',
    email: 'email@email.com',
    medicalCertificate: 'ici',
    cerfa: true,
    gender: Gender.FEMALE,
    weapons: [Weapons.EPEE],
    group: Group.SENIORS,
    isChild: false,
    payment: {
      paid: true,
      amount: 200,
      deposit: true
    }
  },
  {
    uid: '5',
    memberAvatar: 'https://picsum.photos/200',
    isActive: true,
    isAdmin: false,
    firstName: 'Julie',
    lastName: 'Wat',
    birthDate: new Date(1951, 7, 5),
    phone: '01 23 45 67 89',
    emergencyPhone: '01 23 45 67 89',
    email: 'email@email.com',
    medicalCertificate: 'ici',
    cerfa: true,
    gender: Gender.FEMALE,
    weapons: [Weapons.SABRE],
    group: Group.VETERANS3,
    isChild: false,
    payment: {
      paid: true,
      amount: 200,
      deposit: true
    }
  },
  {
    uid: '6',
    memberAvatar: 'https://picsum.photos/200',
    isActive: true,
    isAdmin: false,
    firstName: 'Jean',
    lastName: 'Tale',
    birthDate: new Date(1970, 3, 6),
    phone: '01 23 45 67 89',
    emergencyPhone: '01 23 45 67 89',
    email: 'email@email.com',
    medicalCertificate: 'ici',
    cerfa: true,
    gender: Gender.MALE,
    weapons: [Weapons.EPEE],
    group: Group.VETERANS2,
    isChild: false,
    payment: {
      paid: true,
      amount: 200,
      deposit: true
    }
  },
  {
    uid: '6',
    memberAvatar: 'https://picsum.photos/200',
    isActive: true,
    isAdmin: false,
    firstName: 'Jean',
    lastName: 'Petit',
    birthDate: new Date(2008, 3, 6),
    phone: '01 23 45 67 89',
    emergencyPhone: '01 23 45 67 89',
    email: 'email@email.com',
    medicalCertificate: 'ici',
    cerfa: true,
    gender: Gender.MALE,
    weapons: [Weapons.FOIL],
    group: Group.M11,
    isChild: true,
    payment: {
      paid: true,
      amount: 200,
      deposit: true
    }
  },
  {
    uid: '7',
    memberAvatar: 'https://picsum.photos/200',
    isActive: true,
    isAdmin: false,
    firstName: 'Marie',
    lastName: 'Poppins',
    birthDate: new Date(2012, 3, 6),
    phone: '01 23 45 67 89',
    emergencyPhone: '01 23 45 67 89',
    email: 'email@email.com',
    medicalCertificate: 'ici',
    cerfa: true,
    gender: Gender.FEMALE,
    weapons: [Weapons.FOIL],
    group: Group.M7,
    isChild: true,
    payment: {
      paid: false,
      amount: 200,
      deposit: true
    }
  }
];
