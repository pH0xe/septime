<template lang="html">
  <q-card
    flat
    bordered
  >
    <q-card-section class="text-h5">
      Le {{ training.date | dateDMY }} à {{ training.timetable.start.full }}
    </q-card-section>
    <q-card-section>
      À <span>
        Moirans pour
        <span
          v-for="(m, i) in findUsers"
          :key="i"
        >
          {{ m.firstName }}
          <span v-if="i !== findUsers.length-1"> et </span>
        </span>
      </span>
    </q-card-section>

    <q-card-section>
      <div class="q-gutter-sm q-mb-sm">
        <q-badge
          v-for="category in training.group"
          :key="category"
          color="orange"
        >
          <span class="text-uppercase">
            {{ category }}
          </span>
        </q-badge>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="js">
import { mapState } from 'vuex';

export default {
  name: 'LessonCard',
  props: {
    training: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser
    }),

    findUsers() {
      const res = [];
      const members = this.training.members.filter((m) => m.parentUid === this.currentUser.uid);
      members.forEach((member) => {
        res.push(this.currentUser.subUsers.find((m) => m.uid === member.uid));
      });
      return res;
    }
  }
};
</script>
