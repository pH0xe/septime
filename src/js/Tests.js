import { Group } from './Group';

export const Tests = {};

const testRank = () => {
  const output = [];
  for (let i = 0; i < 100; i += 1) {
    const fakeMember = {};
    fakeMember.presence = {
      here: [],
      late: [],
      absent: []
    };

    fakeMember.lastName = Math.random().toString(36).substring(2, 9).toUpperCase();
    fakeMember.firstName = Math.random().toString(36).substring(2, 15);

    const intGroup = Math.floor(Math.random() * Math.floor(13));
    const intHere = Math.floor(Math.random() * Math.floor(30));
    const intLate = Math.floor(Math.random() * Math.floor(30));
    const intAbsent = Math.floor(Math.random() * Math.floor(30));

    fakeMember.group = Group.groupList[intGroup];

    for (let j = 0; j < intHere; j += 1) {
      fakeMember.presence.here.push(new Date());
    }

    for (let j = 0; j < intLate; j += 1) {
      fakeMember.presence.late.push(new Date());
    }

    for (let j = 0; j < intAbsent; j += 1) {
      fakeMember.presence.absent.push(new Date());
    }
    output.push(fakeMember);
  }
  return output;
};

Tests.testRank = testRank;
Object.freeze(Tests);
