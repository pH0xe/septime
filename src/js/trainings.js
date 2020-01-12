import { Group } from './Group';
import { State } from './State';

export default [
  {
    uid: '1',
    startDate: new Date(2020, 11, 23, 17, 0),
    endDate: new Date(2020, 11, 23, 19, 0),
    location: 'Moirans',
    group: [Group.SENIORS, Group.M17, Group.M20],
    students: [
      {
        uid: '1',
        isPresent: State.LATE
      },
      {
        uid: '2',
        isPresent: State.HERE
      },
      {
        uid: '3',
        isPresent: State.ABSENT
      },
      {
        uid: '4',
        isPresent: State.LATE
      }
    ]
  },
  {
    uid: '2',
    startDate: new Date(2020, 11, 31, 17, 0),
    endDate: new Date(2020, 11, 31, 19, 0),
    location: 'Moirans',
    group: [Group.M11, Group.M7],
    students: [
      {
        uid: '1',
        isPresent: State.HERE
      },
      {
        uid: '2',
        isPresent: State.HERE
      }
    ]
  },
  {
    uid: '3',
    startDate: new Date(2020, 11, 14, 17, 0),
    endDate: new Date(2020, 11, 14, 19, 0),
    location: 'Moirans',
    group: [Group.SENIORS, Group.M20],
    students: [
      {
        uid: '3',
        isPresent: State.HERE
      },
      {
        uid: '4',
        isPresent: State.HERE
      }
    ]
  },
  {
    uid: '4',
    startDate: new Date(2020, 11, 19, 17, 0),
    endDate: new Date(2020, 11, 19, 19, 0),
    location: 'Moirans',
    group: [Group.M20, Group.M17],
    students: [
      {
        uid: '1',
        isPresent: State.HERE
      },
      {
        uid: '2',
        isPresent: State.HERE
      },
      {
        uid: '4',
        isPresent: State.HERE
      }
    ]
  },
  {
    uid: '5',
    startDate: new Date(2019, 11, 19, 11, 30),
    endDate: new Date(2019, 11, 19, 13, 30),
    location: 'Moirans',
    group: [Group.M5],
    students: [
      {
        uid: '4',
        isPresent: State.LATE
      },
      {
        uid: '5',
        isPresent: State.HERE
      }
    ]
  }
];
