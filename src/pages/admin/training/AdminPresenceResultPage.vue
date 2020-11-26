<template>
  <q-page class="q-ma-md">
    <h5 class="text-h5 q-my-md">
      Classement des présences aux entraînements
    </h5>
    <div
      v-for="list in rankingCalculaton"
      :key="list[0]"
      class="q-mt-md"
    >
      <admin-presence-rank-table
        :title="list[0]"
        :members="list[1]"
      />
    </div>
    <div
      align="right"
    >
      <q-btn
        class="q-my-md"
        color="admin-primary"
        label="retour"
        outline
        @click="onCancelClick"
      />
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { State } from '../../../js/State';
import { Group } from '../../../js/Group';
import AdminPresenceRankTable from '../../../components/admin/trainings/AdminPresenceRankTable';

export default {
  name: 'AdminPresenceResultPage',
  components: { AdminPresenceRankTable },
  computed: {
    ...mapState({
      members: (state) => state.members.members,
      trainings: (state) => state.trainings.trainings
    }),

    rankingCalculaton() {
      const result = new Map();

      // console.log(this.trainings);

      this.trainings.forEach((training) => {
        if (training.startDate < new Date()) {
          training.students.forEach((student) => {
            let isLate;
            let isHere;
            let isAbsent;
            switch (student.isPresent) {
              case State.HERE:
                isLate = 0;
                isHere = 1;
                isAbsent = 0;
                break;
              case State.LATE:
                isLate = 1;
                isHere = 0;
                isAbsent = 0;
                break;
              case State.ABSENT:
                isLate = 0;
                isHere = 0;
                isAbsent = 1;
                break;
              default:
                isLate = 0;
                isHere = 0;
                isAbsent = 0;
            }

            if (result.has(student.uid)) {
              result.set(student.uid, {
                late: result.get(student.uid).late + isLate,
                here: result.get(student.uid).here + isHere,
                absent: result.get(student.uid).absent + isAbsent
              });
            } else {
              result.set(student.uid, {
                late: isLate,
                here: isHere,
                absent: isAbsent
              });
            }
          });
        }
      });

      const tableResult = new Map();
      result.forEach((student, key) => {
        const findUser = this.members.find((user) => user.uid === key);
        if (findUser) {
          if (findUser.group === Group.SENIORS || findUser.group === Group.VETERANS1
            || findUser.group === Group.VETERANS2
            || findUser.group === Group.VETERANS3 || findUser.group === Group.VETERANS4) {
            if (!tableResult.has(Group.SENIORS)) {
              tableResult.set(Group.SENIORS, [{
                uid: findUser.uid,
                firstName: findUser.firstName,
                lastName: findUser.lastName,
                here: student.here,
                late: student.late,
                absent: student.absent
              }]);
            } else {
              tableResult.get(Group.SENIORS)
                .push({
                  uid: findUser.uid,
                  firstName: findUser.firstName,
                  lastName: findUser.lastName,
                  here: student.here,
                  late: student.late,
                  absent: student.absent
                });
            }
          } else if (!tableResult.has(findUser.group)) {
            tableResult.set(findUser.group, [{
              uid: findUser.uid,
              firstName: findUser.firstName,
              lastName: findUser.lastName,
              here: student.here,
              late: student.late,
              absent: student.absent
            }]);
          } else {
            tableResult.get(findUser.group)
              .push({
                uid: findUser.uid,
                firstName: findUser.firstName,
                lastName: findUser.lastName,
                here: student.here,
                late: student.late,
                absent: student.absent
              });
          }
        }
      });
      // console.log(Array.from(tableResult));
      return Array.from(tableResult);
    }
  },

  methods: {
    ...mapActions(['fetchMembers', 'fetchTrainings']),

    onCancelClick() {
      this.$router.push({ name: 'admin_presence' });
    }
  },

  meta: {
    title: 'Admin - Entraînements'
  }
};
</script>

<style scoped>

</style>
