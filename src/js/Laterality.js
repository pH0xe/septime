export const Laterality = {
  LEFT: 'left',
  RIGHT: 'right'
};

const from = (laterality) => (Laterality.RIGHT === laterality ? 'Droitier' : 'Gaucher');

Laterality.from = from;
Object.freeze(Laterality);
