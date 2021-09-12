/* eslint-disable no-unused-vars */
import { exportFile } from 'quasar';
import { DateUtils } from './DateUtils';

const ExcelJS = require('exceljs');

export const UsersExport = {};

const colorOK = 'FF92D050';
const colorWarning = 'FFFFFF00';
const colorError = 'FFFF0000';

const columns = [
  { name: '  ', filterButton: false },
  { name: 'Synthèse Documents Manquants', filterButton: false },
  { name: 'Nom', filterButton: true },
  { name: 'Prénom', filterButton: true },
  { name: 'Email', filterButton: true },
  { name: 'Adresse', filterButton: true },
  { name: 'Complément d\'adresse', filterButton: true },
  { name: 'Code postal', filterButton: true },
  { name: 'Ville', filterButton: true },
  { name: 'Pays', filterButton: true },
  { name: 'Date de naissance', filterButton: true },
  { name: 'Téléphone', filterButton: true },
  { name: 'Tél en cas d\'urgence', filterButton: true },
  { name: 'Sexe', filterButton: true },
  { name: 'Latéralité', filterButton: true },
  { name: 'Organisation', filterButton: true },
  { name: 'Catégorie', filterButton: true },
  { name: 'Inscription Internet CEM', filterButton: true },
  { name: 'Certificat Médical', filterButton: true },
  { name: 'Attestation Cerfa 2020/2021', filterButton: true },
  { name: 'Attestation Assurance', filterButton: true },
  { name: 'Licence', filterButton: true },
  { name: 'Adhésion', filterButton: true },
  { name: 'Location Masque', filterButton: true },
  { name: 'Référence Masque', filterButton: true },
  { name: 'Location Pantalon', filterButton: true },
  { name: 'Référence Pantalon', filterButton: true },
  { name: 'Location Veste', filterButton: true },
  { name: 'Référence Veste', filterButton: true },
  { name: 'Location sous cuirasses', filterButton: true },
  { name: 'Référence sous cuirasses', filterButton: true },
  { name: 'Kit Première Touche', filterButton: true },
  { name: 'Référence Kit PT', filterButton: true },
  { name: 'Pass Compet', filterButton: true },
  { name: 'Assurance Sup', filterButton: true },
  { name: 'Remise 2ème Adhérent', filterButton: true },
  { name: 'Remise Spéciale', filterButton: true },
  { name: 'Caution', filterButton: true },
  { name: 'Total du', filterButton: true },
  { name: 'Mode', filterButton: true },
  { name: 'Date Hello Asso', filterButton: true },
  { name: 'Paiement 1', filterButton: true },
  { name: 'Mode ', filterButton: true },
  { name: 'Date Hello Asso ', filterButton: true },
  { name: 'Paiement 2', filterButton: true },
  { name: 'Mode  ', filterButton: true },
  { name: 'Date Hello Asso  ', filterButton: true },
  { name: 'Paiement 3', filterButton: true },
  { name: 'Mode   ', filterButton: true },
  { name: 'Paiement 4', filterButton: true },
  { name: 'Mode    ', filterButton: true },
  { name: 'Paiement 5', filterButton: true },
  { name: 'Pass Région ', filterButton: true },
  { name: ' ', filterButton: false },
  { name: 'Pass Sport', filterButton: true },
  { name: 'Pass Matos', filterButton: true },
  { name: 'Pass Voiron', filterButton: true },
  { name: 'Chèques Vacances', filterButton: true },
  { name: 'Total Règlement', filterButton: true },
  { name: 'Solde DU', filterButton: true }
];

const initWorkbook = () => {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Julien Reig';
  wb.lastModifiedBy = 'Julien Reig';
  wb.created = new Date();
  wb.modified = new Date();
  return wb;
};

const getUsers = (users) => {
  const res = [];
  users.forEach((u) => {
    res.push([
      1,
      'todo calcul synthese', // todo calcul synthese
      u.lastName,
      u.firstName,
      u.email,
      u.address.street,
      null,
      u.address.zip,
      u.address.city,
      'France',
      DateUtils.formatShort(u.birthDate),
      u.phone,
      u.emergency.phone,
      u.gender,
      u.laterality,
      null,
      u.categories,
      'oui',
      DateUtils.formatShort(u.certificateDate),
      null,
      null,
      'todo licence', // todo licence
      'todo adhesion', // todo adhesion
      'todo masque', // todo masque
      null,
      'todo pantalon', // todo pantalon
      null,
      'todo veste', // todo veste
      null,
      'todo ss cuirasse', // todo sous cuirasse
      null,
      'todo kit pt', // todo kit pt
      null,
      'todo pass compete', // todo
      'todo assurance +', // todo
      null,
      null,
      null,
      'todo total du', // todo
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      'todo total regement', // todo
      'todo total du' // todo
    ]);
  });
  return res;
};

const applyStyleRow1 = (sheet) => {
  for (let i = 1; i < 61; i += 1) {
    const cell = sheet.getCell(1, i);
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF002060' }
    };
    cell.font = {
      color: { argb: 'FFFFFFFF' }
    };
  }

  const letters = ['A', 'V', 'W', 'X', 'Z', 'AB', 'AD', 'AH', 'AI', 'AJ', 'AK', 'AM', 'AP', 'AS', 'AV', 'BA', 'BC', 'BD', 'BE', 'BF', 'BG', 'BH'];
  letters.forEach((l) => {
    sheet.getCell(`${l}1`).value = { formula: `SUM(${l}4:${l}1000)` };
  });

  sheet.getCell('C1').value = 'Totaux';
};

const applyStyleRow2 = (sheet) => {
  const font = {
    color: { argb: 'FFFFFFFF' },
    bold: true,
    size: 16
  };

  const ali = {
    vertical: 'bottom',
    horizontal: 'center'
  };

  for (let i = 1; i < 4; i += 1) {
    const cell = sheet.getCell(2, i);
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4F6228' }
    };
    cell.font = font;
    cell.alignment = ali;
  }

  let cell = sheet.getCell('W2');
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF974706' }
  };
  cell.font = font;
  cell.alignment = ali;

  cell = sheet.getCell('AN2');
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF1F497D' }
  };
  cell.font = font;
  cell.alignment = ali;

  sheet.getCell('C2').value = 'Informations Tireurs';
  sheet.getCell('W2').value = 'Coût Inscription';
  sheet.getCell('AN2').value = 'Règlements Inscription';

  sheet.mergeCells('C2:V2');
  sheet.mergeCells('W2:AM2');
  sheet.mergeCells('AN2:BH2');
};

const applyStyleRow3 = (sheet) => {
  const fontWhite = { color: { argb: 'FFFFFFFF' } };
  const fontBlack = { color: { argb: 'FF000000' } };

  for (let i = 1; i < 23; i += 1) {
    const cell = sheet.getCell(3, i);
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF00B050' }
    };
    cell.font = fontWhite;
  }

  for (let i = 23; i < 40; i += 1) {
    const cell = sheet.getCell(3, i);
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFC000' }
    };
    cell.font = fontBlack;
  }

  for (let i = 40; i < 61; i += 1) {
    const cell = sheet.getCell(3, i);
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF0070C0' }
    };
    cell.font = fontWhite;
  }
};

const applyStyleTable = (sheet) => {
  const table = sheet.getTable('tableInscription');
  const finalIndex = 3 + table.table.rows.length; // A3 - A${finalIndex}
  console.log(finalIndex);
};

const exportData = async (users) => {
  const wb = initWorkbook();
  const sheet = wb.addWorksheet('Inscription', { properties: { defaultColWidth: 20 } });
  sheet.getRow(3).alignment = { wrapText: true };
  sheet.addTable({
    name: 'tableInscription',
    ref: 'A3',
    headerRow: true,
    totalsRow: false,
    columns,
    rows: getUsers(users)
  });

  applyStyleRow1(sheet);
  applyStyleRow2(sheet);
  applyStyleRow3(sheet);
  applyStyleTable(sheet);

  const buffer = await wb.xlsx.writeBuffer();
  exportFile('inscription.xlsx', buffer);
};

UsersExport.exportData = exportData;
Object.freeze(UsersExport);
