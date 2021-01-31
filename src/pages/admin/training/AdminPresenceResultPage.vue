<template>
  <q-page class="q-ma-md">
    <page-title title="Classement des présences aux entraînements" />
    <div
      v-for="(list, index) in rankingCalculaton"
      :key="index"
      class="q-mt-md"
    >
      <admin-presence-rank-table
        v-if="list[1].length > 0"
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
import AdminPresenceRankTable from '../../../components/admin/trainings/AdminPresenceRankTable';
import { Group } from '../../../js/Group';
import { Utils } from '../../../js/Utils';
import PageTitle from '../../../components/utils/PageTitle';


export default {
  name: 'AdminPresenceResultPage',
  components: { PageTitle, AdminPresenceRankTable },
  computed: {
    ...mapState({
      members: (state) => state.members.members
    }),

    rankingCalculaton() {
      const tablesRes = new Map();
      Group.groupList.forEach((val) => tablesRes.set(val, []));
      const result = Utils.deepCopy(this.members);

      result.forEach((member) => {
        tablesRes.get(member.group).push(member);
      });

      let adults = [];
      Group.adultGroup.forEach((val) => {
        adults = [...adults, ...tablesRes.get(val)];
        tablesRes.delete(val);
      });
      tablesRes.set('Adultes', adults);

      return tablesRes;
    }
  },

  beforeMount() {
    this.fetchMembers();
  },

  methods: {
    ...mapActions(['fetchMembers']),

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
