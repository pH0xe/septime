<template>
  <q-page class="page-padded">
    <page-title title="Liste du matériel" />
    <div class="row items-center q-pb-lg">
      <q-btn
        label="Ajouter"
        icon-right="mdi-plus"
        color="admin-primary"
        class="col-12 col-md-auto q-mb-sm q-mr-sm"
        :to="{ name: 'admin_equipment_add' }"
      />
      <q-btn
        label="Nouveau type"
        icon-right="mdi-plus"
        color="admin-primary"
        :to="{ name: 'admin_equipment_create' }"
        class="col-12 col-md-auto q-mr-sm q-mb-sm"
      />

      <div class="col q-mb-sm">
        <q-select
          v-model="equipmentType"
          :options="equipmentsTypes"
          option-label="name"
          option-value="name"
          label="Rechercher par type"
          color="admin-primary"
          emit-value
        >
          <template v-slot:append>
            <q-icon
              v-if="equipmentType !== ''"
              class="cursor-pointer"
              name="mdi-close"
              @click="equipmentType = ''"
            />
          </template>
        </q-select>
      </div>
    </div>
    <admin-equipment-table
      :filter-input="equipmentType"
      :equipments="equipments"
      :types="equipmentsTypes"
      :members="members"
      :members-active="membersActive"
    />
  </q-page>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import AdminEquipmentTable from '../../../components/admin/equipment/AdminEquipmentTable';
import PageTitle from '../../../components/utils/PageTitle';

export default {
  name: 'AdminEquipmentPage',
  components: { PageTitle, AdminEquipmentTable },

  data: () => ({
    equipmentType: ''
  }),

  computed: {
    ...mapState({
      members: (state) => state.members.members,
      membersActive: (state) => state.members.membersActive,
      equipments: (state) => state.equipments.equipments,
      equipmentsTypes: (state) => state.equipmentsType.equipmentsTypes
    })
  },

  beforeMount() {
    this.fetchEquipmentsType();
    this.fetchEquipments();
    this.fetchMembers();
  },

  methods: {
    ...mapActions(['fetchEquipments', 'fetchEquipmentsType', 'fetchMembers'])
  },

  meta: {
    title: 'Admin - Matériels'
  }

};
</script>
