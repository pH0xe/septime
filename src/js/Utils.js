export const Utils = {};

const deepCopy = (obj) => {
  if (obj) return JSON.parse(JSON.stringify(obj));
  return obj;
};

Utils.deepCopy = deepCopy;

Object.freeze(Utils);
