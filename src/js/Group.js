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
  now.setMonth(8, 0);
  now.setHours(0, 0, 0, 0);

  const years = date.getDateDiff(now, birth, 'years');

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

Group.from = from;
Object.freeze(Group);
