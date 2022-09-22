import { PartnerModel } from 'src/models/partner.model';

export const partners: PartnerModel[] = [
  new PartnerModel({
    name: "Préfet de l'isère",
    logo: 'https://www.isere.gouv.fr/var/ezwebin_site/storage/images/design/en-isere/172-71-fre-FR/en-Isere.jpg',
    link: 'https://www.isere.gouv.fr',
  }),
  new PartnerModel({
    name: 'Région Auvergne-Rhône-Alpes',
    logo: 'https://www.auvergnerhonealpes.fr/themes/custom/aura_region_theme/logo.svg',
    link: 'https://www.auvergnerhonealpes.fr',
    customStyle: 'background-color: white;',
  }),
  new PartnerModel({
    name: "Département de l'isère",
    logo: 'https://www.isere.fr/sites/default/files/cd38-logo2018-couleurs_-_web.png',
    link: 'https://www.isere.fr',
  }),
  new PartnerModel({
    name: "Fédération Française d'Escrime",
    logo: 'https://www.escrime-ffe.fr/medias/_site/logo.png',
    link: 'https://www.escrime-ffe.fr',
  }),
  new PartnerModel({
    name: 'Comité Régional Escrime Auvergne-Rhône-Alpes',
    logo: 'http://escrime-auvergnerhonealpes.fr/wp-content/uploads/2019/02/logo-escrime-300-110-300x110.png',
    link: 'http://escrime-auvergnerhonealpes.fr',
  }),
  new PartnerModel({
    name: 'Ville de Moirans',
    logo: 'https://www.ville-moirans.fr/images/interface/logo-ville-moirans.jpg',
    link: 'https://www.ville-moirans.fr',
  }),
  new PartnerModel({
    name: 'Ville de Voiron',
    logo: 'https://www.voiron.fr/wp-content/uploads/ville-de-voiron_social_logo.png',
    link: 'https://www.voiron.fr',
    customStyle: 'background-color: white;',
  }),
];
