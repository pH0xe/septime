<template>
  <q-table
    :data="members"
    :columns="columns"
    :pagination.sync="pagination"
    hide-bottom
    flat
    bordered
    row-key="uid"
    @row-click="changeState"
  >
    <template v-slot:body-cell-memberAvatar="props">
      <q-td
        :props="props"
        auto-width
        :class="getColor(props.row)"
      >
        <q-avatar v-if="props.row.memberAvatar">
          <img
            class="image-cover"
            :src="props.row.memberAvatar"
          >
        </q-avatar>
        <q-avatar
          v-else
        >
          <img
            src="~assets/sad.svg"
          >
        </q-avatar>
      </q-td>
    </template>
    <template v-slot:body-cell-firstName="props">
      <q-td
        :props="props"
        :class="getColor(props.row)"
        class="text-white"
      >
        <div>
          {{ props.row.firstName }}
        </div>
      </q-td>
    </template>
    <template v-slot:body-cell-lastName="props">
      <q-td
        :props="props"
        :class="getColor(props.row)"
        class="text-white"
      >
        <div>
          {{ props.row.lastName }}
        </div>
      </q-td>
    </template>
  </q-table>
</template>

<script>

import { State } from '../../../js/State';

const columns = [
  {
    name: 'memberAvatar',
    field: 'memberAvatar',
    sortable: false,
    align: 'left'
  },
  {
    name: 'firstName',
    field: 'firstName',
    sortable: true,
    align: 'left',
    label: 'Prénom'
  },
  {
    name: 'lastName',
    field: 'lastName',
    sortable: true,
    align: 'left',
    label: 'Nom'
  }
];

export default {
  name: 'AdminPresenceCallListTable',

  props: {
    members: {
      type: Array,
      required: true
    },

    training: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    pagination: {
      rowsPerPage: 0
    },
    color: 'bg-info'
  }),

  computed: {
    columns() {
      return columns;
    }
  },

  methods: {
    dateEquals(d1, d2) {
      return d1.toISOString() === d2.toISOString();
    },

    containTrainingDate(arr) {
      if (!arr) return false;
      let res = false;
      arr.forEach((d) => {
        if (this.dateEquals(d, this.training.date)) res = true;
      });
      return res;
    },

    changeState(e, member) {
      if (this.isAbsent(member)) {
        this.removeDate(State.ABSENT, member);
        member.presence.late.push(this.training.date);
      } else if (this.isLate(member)) {
        this.removeDate(State.LATE, member);
        member.presence.here.push(this.training.date);
      } else {
        this.removeDate(State.HERE, member);
        member.presence.absent.push(this.training.date);
      }
      // todo update color
    },

    isAbsent(member) {
      return this.containTrainingDate(member?.presence?.absent);
    },

    isLate(member) {
      return this.containTrainingDate(member?.presence?.late);
    },

    isHere(member) {
      return this.containTrainingDate(member?.presence?.here);
    },

    removeDate(where, member) {
      let index;
      let arr;
      switch (where) {
        case State.ABSENT:
          arr = member?.presence?.absent;
          if (!arr) return;
          index = arr.findIndex((d) => this.dateEquals(d, this.training.date));
          if (index === -1) return;
          member.presence.absent.splice(index, 1);
          break;
        case State.LATE:
          arr = member?.presence?.late;
          if (!arr) return;
          index = arr.findIndex((d) => this.dateEquals(d, this.training.date));
          if (index === -1) return;
          member.presence.late.splice(index, 1);
          break;
        case State.HERE:
          arr = member?.presence?.here;
          if (!arr) return;
          index = arr.findIndex((d) => this.dateEquals(d, this.training.date));
          if (index === -1) return;
          member.presence.here.splice(index, 1);
          break;
        default:
          break;
      }
    },

    getColor(member) {
      if (this.isAbsent(member)) {
        return 'bg-negative';
      }
      if (this.isLate(member)) {
        return 'bg-warning';
      }
      if (this.isHere(member)) {
        return 'bg-positive';
      }
      return 'bg-positive';
    }
  }

};
</script>

    <style scoped >
    </style>
