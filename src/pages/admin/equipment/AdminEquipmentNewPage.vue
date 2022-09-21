<template>
  <q-page class="page-padded">
    <page-title title="Ajout d'un nouveau équipement" />
    <q-card flat>
      <div class="row">
        <q-card-section class="col-12 col-md-4">
          <div class="text-weight-bold">
            Choix du type :
          </div>
          <q-select
            ref="equipmentChoice"
            v-model="equipmentChoice"
            :options="equipmentsTypes"
            option-value="uid"
            option-label="name"
            label="Choix d'un type"
            :error="$v.equipmentChoice.$error"
            error-message="Merci de choisir un type"
            color="admin-primary"
          />
        </q-card-section>
        <q-card-section class="col-12 col-md-4">
          <div class="text-weight-bold q-pt-md">
            Choix de la taille :
          </div>
          <q-select
            ref="sizeChoice"
            v-model="sizeChoice"
            :disable="!equipmentChoice"
            :options="sizesOptions"
            label="Choix d'une taille"
            error-message="Merci de choisir une taille"
            color="admin-primary"
            :error="$v.sizeChoice.$error"
            use-input
            use-chips
            @new-value="createNewSize"
          />
        </q-card-section>
        <q-card-section class="col-12 col-md-4">
          <div class="text-weight-bold q-pt-md">
            Numero d'identification interne :
          </div>
          <q-input
            v-model="internalId"
            color="admin-primary"
            label="Numéro interne"
            error-message="Champ requis"
            :error="$v.internalId.$error"
          />
        </q-card-section>
      </div>

      <div class="row">
        <q-card-section class="col-12 col-md-4">
          <div class="text-weight-bold">
            Date de fabrication : <span class="text-caption"> (Optionnel)</span>
          </div>
          <date-selector
            v-model="productionDate"
            label="Date de fabrication"
            error-message="Saisir une date valide"
            :error="$v.productionDate.$error"
            @blur="$v.productionDate.$touch"
            @input="$v.productionDate.$touch"
          />
        </q-card-section>
        <q-card-section class="col-12 col-md-4">
          <div class="text-weight-bold q-pt-md">
            Date d'achat : <span class="text-caption"> (Optionnel)</span>
          </div>
          <date-selector
            v-model="buyingDate"
            label="Date d'achat"
            error-message="Saisir une date valide"
            :error="$v.buyingDate.$error"
            @blur="$v.buyingDate.$touch"
            @input="$v.buyingDate.$touch"
          />
        </q-card-section>
        <q-card-section class="col-12 col-md-4 ">
          <div class="text-weight-bold q-pt-md">
            Date de mise en service : <span class="text-caption"> (Optionnel)</span>
          </div>
          <date-selector
            v-model="useDate"
            label="Date d'achat"
            error-message="Saisir une date valide"
            :error="$v.useDate.$error"
            @blur="$v.useDate.$touch"
            @input="$v.useDate.$touch"
          />
        </q-card-section>
      </div>

      <div class="row">
        <q-card-section class="col-12 col-md-6">
          <div class="text-weight-bold">
            Etat de l'équipement
          </div>
          <q-select
            v-model="state"
            :options="statesOptions"
            label="Etat du matériel"
            map-options
            color="admin-primary"
          />
        </q-card-section>
        <q-card-section class="col-12 col-md-6">
          <div class="text-weight-bold q-pt-md">
            Newtons :<span class="text-caption"> (Optionnel)</span>
          </div>

          <q-input
            v-model="newtons"
            type="number"
            label="Newtons"
            color="admin-primary"
          />
        </q-card-section>
      </div>
      <q-card-section>
        <div class="text-weight-bold">
          Vendeur :<span class="text-caption"> (Optionnel)</span>
        </div>
        <q-input
          v-model="seller"
          color="admin-primary"
        />
      </q-card-section>
      <q-card-section>
        <div class="text-weight-bold">
          Fabricant :<span class="text-caption"> (Optionnel)</span>
        </div>
        <q-input
          v-model="producer"
          color="admin-primary"
        />
      </q-card-section>

      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn
          color="negative"
          flat
          label="Annuler"
          :to="{ name: 'admin_equipment' }"
          replace
        />
        <q-btn
          color="admin-primary"
          flat
          label="Ok"
          @click="onClickOk"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { required, numeric, maxValue } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { date } from 'quasar';
import { mapState, mapActions } from 'vuex';
import DateSelector from '../../../components/utils/DateSelector';
import { EquipmentState } from '../../../js/EquipmentState';
import PageTitle from '../../../components/utils/PageTitle';

export default {
  name: 'AdminEquipmentNewPage',
  components: { PageTitle, DateSelector },
  mixins: [validationMixin],
  data: () => ({
    equipmentChoice: '',
    sizeChoice: null, // obligatoire sinon bug à l'affichage
    seller: '',
    producer: '',
    internalId: null,
    productionDate: new Date(),
    buyingDate: new Date(),
    useDate: new Date(),
    state: EquipmentState.GOOD,
    newtons: null,
    statesOptions: [
      { value: EquipmentState.GOOD, label: 'Bon' }, { value: EquipmentState.BROKEN, label: 'Cassé' }, { value: EquipmentState.REPARATION, label: 'En réparation' }
    ]
  }),

  computed: {
    ...mapState({
      equipmentsTypes: (state) => state.equipmentsType.equipmentsTypes
    }),

    sizesOptions() {
      if (this.equipmentChoice) {
        const equipmentType = this.equipmentsTypes.find(
          (type) => type.uid === this.equipmentChoice.uid
        );
        return equipmentType.sizeOption;
      }
      return null;
    }
  },

  beforeMount() {
    this.fetchEquipmentsType();
  },

  methods: {
    ...mapActions(['fetchEquipmentsType', 'postNewEquipment', 'addNewSize']),

    onClickOk() {
      this.$v.$touch();
      if (!this.$v.$error) {
        this.$q.dialog({
          title: 'Confirmer',
          message: 'Voulez-vous vraiment ajouter cette équipement à la liste ?',
          cancel: {
            color: 'admin-primary',
            flat: true
          },
          ok: {
            color: 'negative',
            flat: true
          },
          persistent: true
        }).onOk(() => {
          const equipment = {
            equipmentType: this.equipmentChoice.uid,
            internalId: this.internalId,
            size: this.sizeChoice,
            state: this.state,
            informationDate: {}
          };

          if (this.buyingDate.getFullYear() > new Date().getFullYear() - 100) {
            equipment.informationDate.buying = this.buyingDate;
          } else {
            equipment.informationDate.buying = new Date();
          }

          if (this.useDate.getFullYear() > new Date().getFullYear() - 100) {
            equipment.informationDate.control = this.useDate;
          } else {
            equipment.informationDate.control = new Date();
          }

          if (this.productionDate.getFullYear() > new Date().getFullYear() - 100) {
            equipment.informationDate.production = this.productionDate;
          } else {
            equipment.informationDate.production = new Date();
          }

          if (this.newtons) {
            equipment.newtons = this.newtons;
          }

          if (this.seller) {
            equipment.seller = this.seller;
          }

          if (this.producer) {
            equipment.producer = this.producer;
          }
          this.postNewEquipment({ equipment });
          this.$q.loading.show({ message: 'Ajout de l\'équipement en cours' });
          setTimeout(() => {
            this.$q.loading.hide();
            this.$router.replace({ name: 'admin_equipment' });
          }, 3000);
        });
      }
    },

    createNewSize(val, done) {
      if (val.length > 0) {
        if (!this.sizesOptions.includes(val)) {
          const newSize = [...this.sizesOptions, val];
          this.addNewSize({ equipmentType: this.equipmentChoice, newSize });
        }
        done(val, 'toggle');
      }
    }
  },

  validations: {
    equipmentChoice: {
      required
    },
    sizeChoice: {
      required
    },
    internalId: {
      required
    },
    productionDate: {
      maxValue: maxValue(date.addToDate(new Date(),
        { minutes: 10 }))
    },
    buyingDate: {
      maxValue: maxValue(date.addToDate(new Date(),
        { minutes: 10 }))
    },
    useDate: {
      maxValue: maxValue(date.addToDate(new Date(),
        { minutes: 10 }))
    },
    newtons: {
      numeric
    }
  },

  meta: {
    title: 'Admin - Matériels'
  }
};
</script>

<style scoped>

</style>
