import { helpers } from 'vuelidate/lib/validators';

import { Laterality } from './Laterality';

export const isLaterality = (value) => !helpers.req(value)
  || value === Laterality.LEFT || value === Laterality.RIGHT;

export const length = (len) => (value) => !helpers.req(value) || helpers.len(value) === len;

export const isNotEmpty = (value) => !helpers.req(value) || value.length > 0;
