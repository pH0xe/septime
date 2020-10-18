export const Weapons = {
  FOIL: 'foil',
  SABRE: 'sabre',
  EPEE: 'epee'
};

const getWeaponStr = (str) => {
  switch (str) {
    case Weapons.FOIL:
      return 'Fleuret';
    case Weapons.SABRE:
      return 'Sabre';
    case Weapons.EPEE:
      return 'Épée';
    default:
      return '';
  }
};

const from = (weapons) => {
  let str;
  weapons.forEach((weapon) => {
    if (str) {
      str = `${str} - ${getWeaponStr(weapon)}`;
    } else {
      str = `${getWeaponStr(weapon)}`;
    }
  });
  return str;
};

Weapons.from = from;
Object.freeze(Weapons);
