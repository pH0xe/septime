<template>
  <div>
    <div class="text-h6">
      Les membres du bureau :
    </div>
    <q-form
      class="q-gutter-md"
      @submit="onSubmit"
    >
      <!-- President -->
      <q-card
        flat
        bordered
      >
        <q-card-section class="text-h6">
          Le président :
        </q-card-section>
        <q-card-section class="flex items-center">
          <q-input
            v-model="president.lastName"
            class="q-ma-sm"
            color="admin-primary"
            filled
            label="Nom"
          />
          <q-input
            v-model="president.firstName"
            class="q-ma-sm"
            color="admin-primary"
            filled
            label="Prénoms"
          />
          <q-input
            v-model="president.phone"
            class="q-ma-sm"
            color="admin-primary"
            filled
            label="Numéros de téléphone"
            mask="## ## ## ## ##"
            unmasked-value
            autocomplete="tel-national"
          />
          <q-btn
            round
            @click="addImage('president')"
          >
            <q-avatar
              :icon="!president.picture ? 'mdi-account': undefined"
              color="grey-4"
              round
            >
              <q-img
                :src="president.picture"
              />
            </q-avatar>
          </q-btn>
        </q-card-section>
      </q-card>

      <!-- Treasurer -->
      <q-card
        flat
        bordered
      >
        <q-card-section class="text-h6">
          Le trésorier :
        </q-card-section>
        <q-card-section class="flex items-center">
          <q-input
            v-model="treasurer.lastName"
            class="q-ma-sm"
            color="admin-primary"
            filled
            label="Nom"
          />

          <q-input
            v-model="treasurer.firstName"
            class="q-ma-sm"
            color="admin-primary"
            filled
            label="Prénoms"
          />
          <br>
          <q-input
            v-model="treasurer.phone"
            class="q-ma-sm"
            color="admin-primary"
            filled
            label="Numéros de téléphone"
            mask="## ## ## ## ##"
            unmasked-value
            autocomplete="tel-national"
          />
          <q-btn
            round
            @click="addImage('treasurer')"
          >
            <q-avatar
              :icon="!treasurer.picture ? 'mdi-account': undefined"
              color="grey-4"
              round
            >
              <q-img
                :src="treasurer.picture"
              />
            </q-avatar>
          </q-btn>
        </q-card-section>
      </q-card>

      <!-- Secretary -->
      <q-card
        flat
        bordered
      >
        <q-card-section class="text-h6">
          Le secrétaire :
        </q-card-section>
        <q-card-section class="flex items-center">
          <q-input
            v-model="secretary.lastName"
            class="q-ma-sm"
            color="admin-primary"
            filled
            label="Nom"
          />

          <q-input
            v-model="secretary.firstName"
            class="q-ma-sm"
            color="admin-primary"
            filled
            label="Prénoms"
          />
          <br>
          <q-input
            v-model="secretary.phone"
            class="q-ma-sm"
            color="admin-primary"
            filled
            label="Numéros de téléphone"
            mask="## ## ## ## ##"
            unmasked-value
            autocomplete="tel-national"
          />
          <q-btn
            round
            @click="addImage('secretary')"
          >
            <q-avatar
              :icon="!secretary.picture ? 'mdi-account': undefined"
              color="grey-4"
              round
            >
              <q-img
                :src="secretary.picture"
              />
            </q-avatar>
          </q-btn>
        </q-card-section>
      </q-card>

      <!-- Master of arms -->
      <q-card
        flat
        bordered
      >
        <q-card-section class="text-h6">
          Le maître d’armes :
        </q-card-section>
        <q-card-section class="flex items-center">
          <q-input
            v-model="master.lastName"
            class="q-ma-sm"
            color="admin-primary"
            filled
            label="Nom"
          />

          <q-input
            v-model="master.firstName"
            class="q-ma-sm"
            color="admin-primary"
            filled
            label="Prénoms"
          />
          <br>
          <q-input
            v-model="master.phone"
            class="q-ma-sm"
            color="admin-primary"
            filled
            label="Numéros de téléphone"
            mask="## ## ## ## ##"
            unmasked-value
            autocomplete="tel-national"
          />
          <q-btn
            round
            @click="addImage('master')"
          >
            <q-avatar
              :icon="!master.picture ? 'mdi-account': undefined"
              color="grey-4"
              round
            >
              <q-img
                :src="master.picture"
              />
            </q-avatar>
          </q-btn>
        </q-card-section>
      </q-card>

      <div>
        <q-btn
          label="Valider"
          type="submit"
          flat
          color="admin-primary"
        />
      </div>
    </q-form>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { Notify } from 'quasar';
import AdminSettingsAddPict from './AdminSettingsAddPict';

export default {
  name: 'AdminSettingClub',

  data: () => ({
    president: {
      lastName: '',
      firstName: '',
      phone: ''
    },
    treasurer: {
      lastName: '',
      firstName: '',
      phone: ''
    },
    secretary: {
      lastName: '',
      firstName: '',
      phone: ''
    },
    master: {
      lastName: '',
      firstName: '',
      phone: ''
    }
  }),

  computed: {
    ...mapState({
      settingsClub: (state) => state.settings.settingsClub,
      settingsRegister: (state) => state.settings.settingsRegister
    })
  },

  mounted() {
    this.president = { ...this.settingsClub.president };
    this.treasurer = { ...this.settingsClub.treasurer };
    this.secretary = { ...this.settingsClub.secretary };
    this.master = { ...this.settingsClub.master };
  },

  methods: {
    ...mapActions(['updateClub']),

    checkValue(out, source, who) {
      out.lastName = source.lastName !== '' ? source.lastName : `Aucun nom n'a été donné pour le ${who}.`;
      out.firstName = source.firstName !== '' ? source.firstName : `Aucun prénoms n'a été donné pour le ${who}.`;
      out.phone = source.phone !== '' ? source.phone : `Aucun numéros n'a été donné pour le ${who}.`;
    },

    onSubmit() {
      // console.log(this.president, this.secretary, this.master, this.treasurer);
      const presidentInfo = {};
      const treasurerInfo = {};
      const masterInfo = {};
      const secretaryInfo = {};

      this.checkValue(presidentInfo, this.president, 'président');
      this.checkValue(treasurerInfo, this.treasurer, 'trésorier');
      this.checkValue(masterInfo, this.master, 'Maître d’armes');
      this.checkValue(secretaryInfo, this.secretary, 'secrétaire');

      this.updateClub({
        setting: this.settingsClub, presidentInfo, treasurerInfo, masterInfo, secretaryInfo
      })
        .then(() => {
          Notify.create({
            message: 'Changement effectué avec succès',
            color: 'positive',
            position: 'top'
          });
        })
        .catch((err) => {
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top'
          });
        });
    },

    addImage(who) {
      this.$q.dialog({
        component: AdminSettingsAddPict,
        parent: this,
        regarding: who
      });
    }
  }
};
</script>

<style scoped>

</style>
