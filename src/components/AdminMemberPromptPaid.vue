<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin q-pa-md">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
      >
        <div class="text-h5 text-center">
          Cotisation
        </div>
        <q-separator />
        <q-card-section>
          <div class="text-h6">
            Montant :
          </div>
          <q-input
            v-model="payments.amount"
            label="Montant"
            type="number"
            step="any"
            color="admin-primary"
            class="col-12 col-md-6 q-ma-md"
          />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-checkbox
            v-model="payments.competition"
            label="Pass compétition"
            color="positive"
          />
          <br>
          <q-checkbox
            v-model="payments.assurance"
            label="Assurance+ souscrite"
            color="positive"
          />
          <br>
          <q-checkbox
            v-model="payments.deposit"
            label="Loue une tenus"
            color="positive"
          />
          <br>
          <q-checkbox
            v-model="payments.mask"
            label="Loue un masque"
            color="positive"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            label="Submit"
            type="submit"
            color="primary"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AdminMemberPromptPaid',

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    payments: {}
  }),

  mounted() {
    this.payments = { ...this.user.payments, mask: false };
    console.log(this.payments);
  },

  methods: {
    ...mapActions(['changePaidInfo']),

    show() {
      this.$refs.dialog.show();
    },

    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      this.$emit('hide');
    },

    onOKClick() {
      this.$emit('ok');
      this.hide();
    },

    onCancelClick() {
      this.hide();
    },

    onReset() {
      this.payments.amount = 0;
    },

    onSubmit() {
      this.payments.paid = true;
      this.changePaidInfo({ member: this.user, newPayments: this.payments })
        .then(() => this.hide());
    }
  }
};
</script>


<style scoped>

</style>
