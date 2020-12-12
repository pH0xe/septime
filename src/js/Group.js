import { date } from 'quasar';


export const Group = {
  VETERANS4: 'Vétérans 4',
  VETERANS3: 'Vétérans 3',
  VETERANS2: 'Vétérans 2',
  VETERANS1: 'Vétérans 1',
  SENIORS: 'Senior',
  M20: 'M20',
  M17: 'M17',
  M15: 'M15',
  M13: 'M13',
  M11: 'M11',
  M9: 'M9',
  M7: 'M7',
  M5: 'M5'
};

const from = (birth) => {
  // Set to 1st september
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  let years = date.getDateDiff(now, birth, 'years');

  if (now.getMonth() >= 6) years += 1;

  if (years <= 5) {
    return Group.M5;
  } if (years <= 7) {
    return Group.M7;
  } if (years <= 9) {
    return Group.M9;
  } if (years <= 11) {
    return Group.M11;
  } if (years <= 13) {
    return Group.M13;
  } if (years <= 15) {
    return Group.M15;
  } if (years <= 17) {
    return Group.M17;
  } if (years <= 20) {
    return Group.M20;
  } if (years <= 40) {
    return Group.SENIORS;
  } if (years <= 50) {
    return Group.VETERANS1;
  } if (years <= 60) {
    return Group.VETERANS2;
  } if (years <= 70) {
    return Group.VETERANS3;
  }
  return Group.VETERANS4;
};

const groupOptions = [
  { value: Group.VETERANS4, label: Group.VETERANS4 },
  { value: Group.VETERANS3, label: Group.VETERANS3 },
  { value: Group.VETERANS2, label: Group.VETERANS2 },
  { value: Group.VETERANS1, label: Group.VETERANS1 },
  { value: Group.SENIORS, label: Group.SENIORS },
  { value: Group.M20, label: Group.M20 },
  { value: Group.M17, label: Group.M17 },
  { value: Group.M15, label: Group.M15 },
  { value: Group.M13, label: Group.M13 },
  { value: Group.M11, label: Group.M11 },
  { value: Group.M9, label: Group.M9 },
  { value: Group.M7, label: Group.M7 },
  { value: Group.M5, label: Group.M5 }
];

const getBadgeColorFor = (group) => {
  switch (group) {
    case Group.M5:
      return 'GRAY 9';
    case Group.M7:
      return 'purple';
    case Group.M9:
      return 'indigo';
    case Group.M11:
      return 'light-blue';
    case Group.M13:
      return 'cyan-6';
    case Group.M15:
      return 'orange';
    case Group.M17:
      return 'brown';
    case Group.M20:
      return 'blue-grey';
    case Group.SENIORS:
      return 'teal-7';
    case Group.VETERANS1:
    case Group.VETERANS2:
    case Group.VETERANS3:
    case Group.VETERANS4:
      return 'grey';
    default:
      return 'null';
  }
};

Group.from = from;
Group.groupOptions = groupOptions;
Group.getBadgeColorFor = getBadgeColorFor;
Object.freeze(Group);
