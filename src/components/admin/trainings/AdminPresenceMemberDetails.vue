<template>
  <q-dialog
    ref="dialog"
    :maximized="$q.platform.is.mobile"
    @hide="hide"
  >
    <q-card
      class="q-dialog-plugin"
      :class="{'w-60': !$q.platform.is.mobile}"
    >
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

      <!-- <editor-fold desc="Title" defaultstate="collapsed"> -->
      <q-card-section class="text-h5 text-center">
        {{ member.lastName }} {{ member.firstName }}
        <q-card-section class="text-caption q-pa-none">
          Détail des absences
        </q-card-section>
      </q-card-section>
      <!-- </editor-fold> -->
      <q-separator />
      <q-card-section>
        <q-list>
          <!-- <editor-fold desc="Absent" defaultstate="collapsed"> -->
          <list-item
            title="Absent le :"
            :items="getFormatedAbsent"
          />
          <!-- </editor-fold> -->
          <q-separator />
          <!-- <editor-fold desc="Late" defaultstate="collapsed"> -->
          <list-item
            title="En retard le :"
            :items="getFormatedLate"
          />
          <!-- </editor-fold> -->
          <q-separator />
          <!-- <editor-fold desc="Here" defaultstate="collapsed"> -->
          <list-item
            title="Présent le :"
            :items="getFormatedHere"
          />
          <!-- </editor-fold> -->
        </q-list>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn
          color="admin-primary"
          flat
          label="Ok"
          @click="onClickOk"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import ListItem from '../../utils/ListItem';
import { DateUtils } from '../../../js/DateUtils';

export default {
  name: 'AdminPresenceMemberDetails',
  components: { ListItem },
  props: {
    member: {
      type: Object,
      required: true
    }
  },

  computed: {
    getFormatedAbsent() {
      return this.member.presence.absent.map((d) => DateUtils.formatFullDate(d));
    },

    getFormatedLate() {
      return this.member.presence.late.map((d) => DateUtils.formatFullDate(d));
    },

    getFormatedHere() {
      return this.member.presence.here.map((d) => DateUtils.formatFullDate(d));
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
      this.hide();
    }
  }
};
</script>

<style scoped>

</style>
