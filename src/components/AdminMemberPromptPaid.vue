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
            Montant (Le prix relatif à la catégorie est calculé automatiquement) :
          </div>
          <q-input
            v-model="payments.amount"
            disable
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
            label="Pass compétition (6€)"
            color="positive"
            @input="setAmount"
          />
          <br>
          <q-checkbox
            v-model="payments.assurance"
            label="Assurance+ souscrite (1.60€)"
            color="positive"
            @input="setAmount"
          />
          <br>
          <q-checkbox
            v-model="payments.breastplate"
            label="Loue une veste (10€)"
            color="positive"
            @input="setAmount"
          />
          <br>
          <q-checkbox
            v-model="payments.underBreastplate"
            label="Loue une sous-cuirasse (5€)"
            color="positive"
            @input="setAmount"
          />
          <br>
          <q-checkbox
            v-model="payments.pants"
            label="Loue un pantalon (10€)"
            color="positive"
            @input="setAmount"
          />
          <br>
          <q-checkbox
            v-model="payments.mask"
            label="Loue un masque (25€)"
            color="positive"
            @input="setAmount"
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
import { Group } from '../js/Group';

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
    this.payments = {
      ...this.user.payments, mask: false, breastplate: false, underBreastplate: false, pants: false
    };
    console.log(this.payments);
    this.setAmount();
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
      this.setAmount();
    },

    onSubmit() {
      this.setAmount();
      this.payments.paid = true;
      this.changePaidInfo({ member: this.user, newPayments: this.payments })
        .then(() => this.hide());
    },

    setAmount() {
      switch (this.user.group) {
        case Group.M5:
        case Group.M7:
          this.payments.base = 180;
          this.payments.amount = 180;
          break;
        case Group.M9:
          this.payments.base = 205;
          this.payments.amount = 205;
          break;
        case Group.M11:
        case Group.M13:
        case Group.M15:
        case Group.M17:
        case Group.M20:
        case Group.SENIORS:
        case Group.VETERANS1:
        case Group.VETERANS2:
        case Group.VETERANS3:
        case Group.VETERANS4:
          this.payments.base = 225;
          this.payments.amount = 225;
          break;
        default:
          console.warn('No group found');
          break;
      }

      if (this.payments.competition) {
        this.payments.amount += 6;
      }

      if (this.payments.assurance) {
        this.payments.amount += 1.60;
      }

      if (this.payments.breastplate) {
        this.payments.amount += 10;
        this.payments.deposit = true;
      }

      if (this.payments.underBreastplate) {
        this.payments.amount += 5;
        this.payments.deposit = true;
      }

      if (this.payments.pants) {
        this.payments.amount += 10;
        this.payments.deposit = true;
      }

      if (this.payments.mask) {
        this.payments.amount += 25;
        this.payments.deposit = true;
      }
    }
  }
};
</script>


<style scoped>

</style>
