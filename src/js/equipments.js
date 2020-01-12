import { EquipmentState } from './EquipmentState';

export default [
  {
    internalId: 1,
    size: 'M',
    type: 'bustier',
    isRentable: true,
    renterId: 1,
    vendor: 'lui',
    informationDate: {
      production: new Date(),
      buying: new Date(),
      control: new Date()
    },
    periodicity: 6,
    newton: 800,
    state: EquipmentState.REPARATION
  },
  {
    internalId: 2,
    size: 'S',
    type: 'cuirasse',
    isRentable: true,
    renterId: null,
    vendor: 'lui',
    informationDate: {
      production: new Date(),
      buying: new Date(),
      control: new Date()
    },
    periodicity: 2,
    newton: 800,
    state: EquipmentState.BROKEN
  },
  {
    internalId: 3,
    size: 'L',
    type: 'cuirasse',
    isRentable: true,
    renterId: 2,
    vendor: 'lui',
    informationDate: {
      production: new Date(),
      buying: new Date(),
      control: new Date()
    },
    periodicity: 0.5,
    newton: 800,
    state: EquipmentState.REPARATION
  },
  {
    internalId: 4,
    size: 'XL',
    type: 'bustier',
    isRentable: true,
    renterId: null,
    vendor: 'lui',
    informationDate: {
      production: new Date(),
      buying: new Date(),
      control: new Date()
    },
    periodicity: 6,
    newton: 350,
    state: EquipmentState.GOOD
  },
  {
    internalId: 5,
    size: 'L',
    type: 'gant',
    isRentable: false,
    renterId: null,
    vendor: 'lui',
    informationDate: {
      production: new Date(),
      buying: new Date(),
      control: new Date()
    },
    periodicity: 0,
    newton: null,
    state: EquipmentState.REPARATION
  }
];
