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

      <q-card-section class="text-h5">
        Détails : {{ equipmentType.name }}
      </q-card-section>
      <q-separator />
      <q-card-section
        class="flex"
      >
        <div class="text-weight-bold">
          Numéro d'identification interne :
        </div>
        <div class="q-ml-md">
          {{ equipment.internalId }}
        </div>
      </q-card-section>
      <q-card-section class="text-weight-bold">
        Taille :
        <q-badge>
          {{ equipment.size }}
        </q-badge>
      </q-card-section>
      <q-card-section
        v-if="equipment.newtons"
        class="flex"
      >
        <div class="text-weight-bold">
          Newton :
        </div>
        <div class="q-ml-md">
          {{ equipment.newtons }}
        </div>
      </q-card-section>
      <q-card-section class="text-weight-bold">
        Loué :
        <q-checkbox
          :value="!!equipment.renterId"
          color="admin-primary"
          disable
        />
      </q-card-section>
      <q-card-section
        v-if="equipment.renterId"
        class="flex"
      >
        <div class="text-weight-bold">
          Loué par :
        </div>
        <div
          class="text-capitalize q-ml-md"
        >
          {{ getMemberName }}
        </div>
      </q-card-section>
      <q-card-section
        class="flex"
      >
        <div class="text-weight-bold">
          Etat :
        </div>
        <div
          class="q-ml-md"
        >
          {{ getState(equipment.state) }}
        </div>
      </q-card-section>
      <q-card-section
        v-if="equipment.vendor"
        class="flex"
      >
        <div class="text-weight-bold">
          Vendu par :
        </div>
        <div class="q-ml-md">
          {{ equipment.vendor }}
        </div>
      </q-card-section>

      <q-card-section
        v-if="equipment.informationDate.production"
        class="flex"
      >
        <div class="text-weight-bold">
          Date de fabrication :
        </div>
        <div class="q-ml-md">
          {{ equipment.informationDate.production | dateDMY }}
        </div>
      </q-card-section>

      <q-card-section
        v-if="equipment.informationDate.buying"
        class="flex"
      >
        <div class="text-weight-bold">
          Date d'achat :
        </div>
        <div class="q-ml-md">
          {{ equipment.informationDate.buying | dateDMY }}
        </div>
      </q-card-section>
      <q-card-section
        v-if="equipment.informationDate.control && equipmentType.periodicity"
        class="flex"
      >
        <div class="text-weight-bold">
          Date du dernier contrôle :
        </div>
        <div
          class="q-ml-md"
        >
          {{ equipment.informationDate.control | dateDMY }}
        </div>
      </q-card-section>
      <q-card-section
        v-if="equipmentType.periodicity"
        class="flex"
      >
        <div class="text-weight-bold">
          Prochain contrôle dans :
        </div>
        <div
          v-if="monthsBeforeNextControl > 2"
          class="text-positive q-ml-md"
        >
          {{ monthsBeforeNextControl }}
        </div>
        <div
          v-if="monthsBeforeNextControl >= 1 && monthsBeforeNextControl <= 2"
          class="text-warning q-ml-md"
        >
          {{ monthsBeforeNextControl }}
        </div>
        <div
          v-if="monthsBeforeNextControl < 1"

          class="text-negative q-ml-md"
        >
          {{ monthsBeforeNextControl }}
        </div>
        <div
          class="q-ml-md"
        >
          mois
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          color="admin-primary"
          label="Changer l'etat"
          @click="changeState"
        />
        <q-btn
          v-if="equipmentType.periodicity"

          flat
          color="warning"
          label="Mettre à jours la date du control"
          @click="updateControlDate"
        />
        <q-btn
          v-if="equipmentType.isRentable && !equipment.renterId"
          flat
          label="Assigné à un adhérent"
          @click="assignToMember"
        />
        <q-btn
          v-if="equipmentType.isRentable && equipment.renterId"
          color="negative"
          flat
          label="Retirer à l'adhérent"
          @click="removeFromMember"
        />
        <q-btn
          color="negative"
          flat
          label="Supprimer"
          @click="deleteEquipment"
        />
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
import { date } from 'quasar';
import { mapActions } from 'vuex';
import AdminEquipmentAssignDialog from './AdminEquipmentAssignDialog';
import { EquipmentState } from '../js/EquipmentState';

export default {
  name: 'AdminEquipmentDetailsDialog',
  props: {
    equipment: {
      type: Object,
      required: true
    },

    equipmentType: {
      type: Object,
      required: true
    },

    members: {
      type: Array,
      required: true
    },

    membersActive: {
      type: Array,
      required: true
    }
  },

  computed: {
    date() {
      return date;
    },

    monthsBeforeNextControl() {
      const nextDate = date.addToDate(this.equipment.informationDate.control,
        { month: this.equipmentType.periodicity });
      return date.getDateDiff(nextDate, this.equipment.informationDate.control, 'months');
    },

    getMemberName() {
      const userId = this.equipment.renterId;
      const result = this.members.find((member) => member.uid === userId);
      return `${result.firstName} ${result.lastName}`;
    }
  },


  methods: {
    ...mapActions(['rentEquipment', 'stopRentEquipment', 'updateControlEquipment', 'updateStateEquipment', 'deleteThisEquipment', 'fetchEquipments']),

    show() {
      this.$refs.dialog.show();
    },

    hide() {
      this.$refs.dialog.hide();
    },

    onClickOk() {
      this.hide();
    },

    assignToMember() {
      this.$q.dialog({
        component: AdminEquipmentAssignDialog,
        users: this.membersActive,
        parent: this
      }).onOk((memberId) => {
        this.rentEquipment({ uid: memberId, equipment: this.equipment });
        this.hide();
      });
    },

    removeFromMember() {
      this.stopRentEquipment({ equipment: this.equipment });
      this.hide();
    },

    updateControlDate() {
      this.updateControlEquipment({ equipment: this.equipment });
    },

    changeState() {
      let newState;
      if (this.equipment.state === EquipmentState.GOOD) {
        newState = EquipmentState.BROKEN;
      } else if (this.equipment.state === EquipmentState.BROKEN) {
        newState = EquipmentState.REPARATION;
      } else if (this.equipment.state === EquipmentState.REPARATION) {
        newState = EquipmentState.GOOD;
      }
      this.updateStateEquipment({ equipment: this.equipment, newState });
    },

    deleteEquipment() {
      this.$q.dialog({
        title: 'Confirmer',
        message: 'Voulez-vous vraiment supprimer cet équipement ?',
        cancel: {
          color: 'admin-primary',
          flat: true
        },
        persistent: true,
        ok: {
          color: 'negative',
          flat: true
        }

      }).onOk(() => {
        this.deleteThisEquipment({ equipment: this.equipment });
      });
    },

    getState(state) {
      switch (state) {
        case EquipmentState.REPARATION:
          return 'En réparation';
        case EquipmentState.GOOD:
          return 'Bon état';
        case EquipmentState.BROKEN:
          return 'Cassé';
        default:
          return 'Inconnu';
      }
    }

  }
};
</script>

<style scoped>

</style>
