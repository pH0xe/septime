import { date } from 'quasar';


export default ({ Vue }) => {
  Vue.filter('uppercase', (value) => {
    if (!value) return '';
    return value.toString().toUpperCase();
  });

  Vue.filter('date', (value, format) => date.formatDate(value, format));

  Vue.filter('dateDMY', (value) => date.formatDate(value, 'DD/MM/YYYY'));

  Vue.filter('dateDM', (value) => date.formatDate(value, 'DD MMMM YYYY', {
    months: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  }));

  Vue.filter('dateHM', (value) => date.formatDate(value, 'HH:mm'));

  Vue.filter('dateFull', (value) => date.formatDate(value, 'dddd DD MMMM YYYY', {
    days: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
    months: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  }));
};
