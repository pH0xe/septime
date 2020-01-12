<template>
  <q-dialog
    ref="dialog"
    :maximized="$q.platform.is.mobile"
    @hide="hide"
  >
    <q-card>
      <q-bar
        v-if="$q.platform.is.mobile"
        class="bg-admin-primary"
      >
        <q-space />
        <q-btn
          v-close-popup
          dense
          flat
          icon="mdi-close"
          color="white"
        />
      </q-bar>

      <q-table
        :data="users"
        :columns="columns"
        selection="single"
        row-key="uid"
        :selected.sync="memberChoice"
        :pagination.sync="pagination"
        :rows-per-page-options="[0]"
      >
        <template v-slot:body-cell-member-avatar="props">
          <q-td
            :props="props"
            auto-width
          >
            <q-avatar>
              <img
                v-if="props.row.memberAvatar"
                :src="props.row.memberAvatar"
              >
              <img
                v-else
                src="~assets/sad.svg"
              >
            </q-avatar>
          </q-td>
        </template>
      </q-table>

      <q-card-actions align="right">
        <q-btn
          color="admin-primary"
          flat
          label="Assigner"
          @click="onClickOk"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

const columns = [
  {
    name: 'member-avatar',
    label: 'Photo',
    align: 'left',
    field: 'avatar',
    sortable: false

  },
  {
    name: 'firstName',
    label: 'Prénom',
    align: 'left',
    field: 'firstName',
    sortable: true
  },
  {
    name: 'lastName',
    label: 'Nom',
    align: 'left',
    field: 'lastName',
    sortable: true
  }
];

export default {
  name: 'AdminEquipmentAssignDialog',
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    memberChoice: [],
    columns,
    pagination: {
      rowsPerPage: 0
    }
  }),
  computed: {
    member() {
      return this.memberChoice[0];
    }
  },
  methods: {
    show() {
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialog.hide();
    },
    onClickOk() {
      if (this.member) {
        this.$emit('ok', this.member.uid);
        this.hide();
      }
    }
  }
};
</script>

<style scoped>

</style>
