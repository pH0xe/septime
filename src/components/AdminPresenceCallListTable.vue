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
        :class="getColor(props.row.uid)"
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
        :class="getColor(props.row.uid)"
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
        :class="getColor(props.row.uid)"
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

import { State } from '../js/State';

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
    }
  }),

  computed: {
    columns() {
      return columns;
    }
  },

  methods: {
    changeState(event, row) {
      const searchUid = row.uid;
      const member = this.training.students.find((student) => student.uid === searchUid);
      switch (member.isPresent) {
        case State.HERE:
          member.isPresent = State.LATE;
          break;
        case State.LATE:
          member.isPresent = State.ABSENT;
          break;
        case State.ABSENT:
          member.isPresent = State.HERE;
          break;
        default:
          break;
      }
    },

    getColor(uid) {
      const member = this.training.students.find((student) => student.uid === uid);
      switch (member.isPresent.toLowerCase()) {
        case State.HERE:
          return 'bg-positive';
        case State.LATE:
          return 'bg-warning';
        case State.ABSENT:
          return 'bg-negative';
        default:
          return 'bg-info';
      }
    }
  }

};
</script>

    <style scoped >
    </style>
