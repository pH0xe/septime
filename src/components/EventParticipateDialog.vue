<template lang="html">
  <q-dialog
    ref="dialog"
    persistent
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
          flat
          icon="mdi-check"
          label="Ok"
          @click="onClickOk"
        />
        <q-btn
          v-else
          flat
          disable
          icon="mdi-close"
          label="Selectionner"
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
    }
  },
  data: () => ({
    selectedRole: undefined,
    roles: [
      {
        label: 'Spectateur',
        value: 'spec'
      },
      {
        label: 'Tireur (3 manquants)',
        value: 'fencer'
      },
      {
        label: 'Arbitre (2 manquants)',
        value: 'arbiter'
      }
    ]
  }),
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
