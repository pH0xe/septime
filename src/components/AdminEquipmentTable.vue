<template>
  <q-table
    :data="equipments"
    :filter="filterInput"
    :filter-method="filterEquipment"
    :columns="columns"
    :pagination.sync="pagination"
    :rows-per-page-options="[0]"
    class="full-width text-capitalize q-mb-lg"
    :dense="$q.platform.is.mobile"
    flat
    bordered
    @row-click="openDialogDetails"
  >
    <template v-slot:body-cell-type="props">
      <q-td
        :props="props"
        auto-width
      >
        <div>
          {{ getTypeByUid(props.row.equipmentType).name }}
        </div>
      </q-td>
    </template>
    <template v-slot:body-cell-internalId="props">
      <q-td
        :props="props"
        auto-width
      >
        <div class="text-weight-bold">
          {{ props.row.internalId }}
        </div>
      </q-td>
    </template>
    <template v-slot:body-cell-renterId="props">
      <q-td
        :props="props"
      >
        <q-checkbox
          :key="index"
          :value="!!props.row.renterId"
          disable
          color="positive"
        />
      </q-td>
    </template>
    <template v-slot:body-cell-size="props">
      <q-td
        :props="props"
      >
        <q-badge
          color="info"
          text-color="dark"
        >
          {{ props.row.size }}
        </q-badge>
      </q-td>
    </template>
    <template v-slot:body-cell-control="props">
      <q-td
        :props="props"
      >
        <q-badge
          :color="getBadgeColorForControl(props.row.informationDate.control,
                                          props.row.equipmentType)"
        >
          {{ monthsBeforeNextControl(props.row.informationDate.control, props.row.equipmentType) }}
        </q-badge>
      </q-td>
    </template>
    <template v-slot:body-cell-state="props">
      <q-td
        :props="props"
      >
        <q-checkbox
          :value="true"
          disable
          :color="getColorState(props.row.state)"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { date } from 'quasar';
import AdminEquipmentDetailsDialog from './AdminEquipmentDetailsDialog';
import { EquipmentState } from '../js/EquipmentState';


const columns = [
  {
    name: 'internalId',
    label: 'Identifiant',
    align: 'left',
    field: 'internalId',
    sortable: true
  },
  {
    name: 'type',
    label: 'Type',
    align: 'left',
    field: 'equipmentType',
    sortable: true
  },
  {
    name: 'renterId',
    label: 'Loué',
    align: 'left',
    field: 'renterId',
    sortable: true
  },
  {
    name: 'size',
    label: 'Taille',
    align: 'left',
    field: 'size',
    sortable: true
  },
  {
    name: 'control',
    label: 'Contrôle',
    align: 'left',
    sortable: true
  },
  {
    name: 'state',
    label: 'Etat',
    align: 'left',
    sortable: true
  }
];
export default {
  name: 'AdminEquipmentTable',
  props: {
    filterInput: {
      type: String,
      default: '',
      required: true
    },
    equipments: {
      type: Array,
      required: true
    },
    types: {
      type: Array,
      required: true
    },
    members: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    pagination: {
      rowsPerPage: 0
    },
    index: 0

  }),
  computed: {
    columns() {
      return columns;
    }
  },
  methods: {
    openDialogDetails(event, row) {
      this.$q.dialog({
        component: AdminEquipmentDetailsDialog,
        parent: this,
        equipment: row,
        equipmentType: this.getTypeByUid(row.equipmentType),
        members: this.members
      });
    },

    monthsBeforeNextControl(useDate, uid) {
      const type = this.getTypeByUid(uid);
      if (type.periodicity) {
        const nextDate = date.addToDate(useDate,
          { month: type.periodicity });
        return date.getDateDiff(nextDate, useDate, 'months');
      } return 'Non requis';
    },

    getBadgeColorForControl(useDate, uid) {
      const month = this.monthsBeforeNextControl(useDate, uid);
      if (month <= 1) {
        return 'negative';
      } if (month > 1 && month <= 2) {
        return 'warning';
      } return 'positive';
    },

    getColorState(state) {
      switch (state) {
        case EquipmentState.BROKEN:
          return 'negative';
        case EquipmentState.GOOD:
          return 'positive';
        case EquipmentState.REPARATION:
          return 'warning';
        default:
          return '';
      }
    },

    getTypeByUid(uid) {
      return this.types.find((type) => type.uid === uid);
    },

    filterEquipment(rows, lookFor) {
      // Sanitize input
      lookFor = lookFor.toLowerCase();

      // Copy the rows to work on them
      let results = rows;
      results = results
        .filter((result) => this.getTypeByUid(result.equipmentType).name.toLowerCase() === lookFor);

      // Return them
      return results;
    }
  }

};
</script>

<style scoped>

</style>
