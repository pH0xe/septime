export const Utils = {};

const deepCopy = (obj) => {
  if (obj) return JSON.parse(JSON.stringify(obj));
  return obj;
};

const toggleDarkTheme = (context) => {
  context.$q.dark.toggle();
  localStorage.setItem('darkMode', `${context.$q.dark.isActive}`);
};

Utils.deepCopy = deepCopy;
Utils.toggleDarkTheme = toggleDarkTheme;

Object.freeze(Utils);
