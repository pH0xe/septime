export const Gender = {
  MALE: 'M',
  FEMALE: 'F'
};

const from = (gender) => (Gender.MALE === gender ? 'Masculin' : 'Féminin');

Gender.from = from;
Object.freeze(Gender);
