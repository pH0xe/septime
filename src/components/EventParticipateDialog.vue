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
          :options="processedRoles"
          label="Rôle"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-sword-cross" />
          </template>
        </q-select>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          v-if="selectedRole !== undefined"
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
    }
  },
  data: () => ({
    selectedRole: undefined
  }),

  computed: {
    processedRoles() {
      return this.roles.map((role) => ({
        label: `${role.name} (${role.require} requis)`,
        value: role.name
      }));
    }
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
      this.$emit('ok', { role: this.selectedRole });
      this.hide();
    }
  }
};
</script>
