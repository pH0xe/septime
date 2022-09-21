<template>
  <q-page class="page-padded">
    <page-title title="Création d'un nouveau type d'équipement" />
    <q-card flat>
      <div class="row">
        <q-card-section class="col-12 col-md-6">
          <div class="text-weight-bold">
            Nom du nouveau type :
          </div>
          <q-input
            ref="nameType"
            v-model="nameType"
            label="Nom du type"
            color="admin-primary"
            :error="$v.nameType.$error"
            error-message="Merci de donner un nom au type"
          />
        </q-card-section>
        <q-card-section class="col-12 col-md-6 q-mt-md">
          <div class="text-weight-bold">
            L'équipement peut t'il être loué ?
          </div>
          <q-select
            v-model="isRentable"
            :options="optionIsRentable"
            label="Peut t'il être loué ?"
            color="admin-primary"
            error-message="Champ requis"
            :error="$v.isRentable.$error"
          />
        </q-card-section>
      </div>
      <div class="row">
        <q-card-section class="col-12 col-md-6">
          <div class="text-weight-bold">
            Saisir les tailles possible pour cet équipement
          </div>
          <div class="text-caption">
            Valider chaque taille avec entrée
          </div>
          <q-select
            v-model="sizeOption"
            label="Tailles"
            multiple
            hide-dropdown-icon
            new-value-mode="add-unique"
            use-input
            use-chips
            color="admin-primary"
            error-message="Champ requis"
            :error="$v.sizeOption.$error"
          />
        </q-card-section>
        <q-card-section class="col-12 col-md-6 q-mt-md">
          <div class="text-weight-bold">
            Cette catégorie doit être controlé tout les {{ periodicity }} mois
          </div>
          <div class="text-caption">
            Selection en mois (Choisir 0 pour ne jamais controler)
          </div>
          <q-slider
            v-model="periodicity"
            :min="0"
            :max="12"
            label
            color="admin-primary"
            class="q-mt-lg"
          />
        </q-card-section>
      </div>

      <q-card-actions align="right">
        <q-btn
          color="negative"
          label="Annuler"
          flat
          :to="{ name: 'admin_equipment' }"
          replace
        />
        <q-btn
          color="admin-primary"
          label="OK"
          flat
          @click="onClickOk"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>

const optionIsRentable = [
  {
    label: 'Oui',
    value: true
  },
  {
    label: 'Non',
    value: false
  }
];
import { required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { mapActions } from 'vuex';
import PageTitle from '../../../components/utils/PageTitle';

const mustBeBoolean = (value) => value === null || value.value === true || value.value === false;

export default {
  name: 'AdminEquipmentNewTypePage',
  components: { PageTitle },
  mixins: [validationMixin],

  data: () => ({
    nameType: '',
    isRentable: null,
    sizeOption: null,
    optionIsRentable,
    periodicity: 6
  }),

  methods: {
    ...mapActions(['postNewType']),
    onClickOk() {
      this.$v.$touch();
      if (!this.$v.$error) {
        this.$q.dialog({
          title: 'Confirmer',
          message: 'Voulez-vous vraiment ajouter ce type d\'équipement ?',
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
          const equipmentType = {
            isRentable: this.isRentable.value,
            name: this.nameType,
            sizeOption: this.sizeOption
          };
          if (this.periodicity) {
            equipmentType.periodicity = this.periodicity;
          }
          this.postNewType({ equipmentType });
          this.$router.replace({ name: 'admin_equipment' });
        });
      }
    }
  },

  validations: {
    nameType: {
      required
    },
    isRentable: {
      required,
      mustBeBoolean
    },
    sizeOption: {
      required
    }
  },

  meta: {
    title: 'Admin - Matériels'
  }
};
</script>

<style scoped>

</style>
