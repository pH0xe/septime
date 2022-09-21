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

const options = [
  {
    label: 'Fleuret',
    value: Weapons.FOIL
  },
  {
    label: 'Epée',
    value: Weapons.EPEE
  },
  {
    label: 'Sabre',
    value: Weapons.SABRE
  }
];

Weapons.from = from;
Weapons.options = options;
Object.freeze(Weapons);
