<template lang="html">
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Participer à l'évenement {{ title }}
        </div>
      </q-card-section>

      <q-card-section>
        <q-select
          v-model="selectedRole"
          :options="roles"
          :option-label="(item) => `${item.name} (${item.require} requis)`"
          label="Rôle"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-sword-cross" />
          </template>
        </q-select>
        <q-select
          v-model="selectedMember"
          :options="processedMembers"
          label="Adhérent"
          :option-label="(item) => `${item.firstName} ${item.lastName}`"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-account" />
          </template>
        </q-select>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          v-if="selectedRole !== undefined && selectedMember !== undefined"
          unelevated
          icon="mdi-check"
          label="Ok"
          color="primary"
          @click="onClickOk"
        />
        <q-btn
          v-else
          unelevated
          disable
          icon="mdi-close"
          label="Ok"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="js">
import { mapState } from 'vuex';

export default {
  name: 'EventParticipateDialog',
  props: {
    title: {
      type: String,
      required: true
    },
    roles: {
      type: Array,
      required: true
    },
    registerMember: {
      type: Array,
      required: false,
      default: null
    }
  },
  data: () => ({
    selectedRole: undefined,
    selectedMember: undefined
  }),

  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser
    }),

    processedMembers() {
      return this.currentUser.subUsers.filter((m) => !this.registerMember?.some((r) => r.uid === m.uid && r.parentUid === this.currentUser.uid));
    }
  },

  mounted() {
    [this.selectedMember] = this.processedMembers;
    [this.selectedRole] = this.roles;
  },

  methods: {
    show() {
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      this.$emit('hide');
    },
    onClickOk() {
      this.$emit('ok', { role: this.selectedRole, member: this.selectedMember });
      this.hide();
    }
  }
};
</script>
