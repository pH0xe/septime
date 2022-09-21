export const Gender = {
  MALE: 'M',
  FEMALE: 'F'
};

const from = (gender) => (Gender.MALE === gender ? 'Masculin' : 'Féminin');
const options = [{ label: 'Femme', value: Gender.FEMALE }, { label: 'Homme', value: Gender.MALE }];

Gender.from = from;
Gender.options = options;
Object.freeze(Gender);
