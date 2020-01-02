import { date } from 'quasar';


export default ({ Vue }) => {
  Vue.filter('uppercase', (value) => {
    if (!value) return '';
    return value.toString().toUpperCase();
  });

  Vue.filter('date', (value, format) => date.formatDate(value, format));

  Vue.filter('dateDMY', (value) => date.formatDate(value, 'DD/MM/YYYY'));
};
