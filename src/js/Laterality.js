export const Laterality = {
  LEFT: 'left',
  RIGHT: 'right'
};

const from = (laterality) => (Laterality.RIGHT === laterality ? 'Droitier' : 'Gaucher');

const options = [{ label: 'Gauche', value: Laterality.LEFT }, { label: 'Droite', value: Laterality.RIGHT }];

Laterality.from = from;
Laterality.options = options;
Object.freeze(Laterality);
