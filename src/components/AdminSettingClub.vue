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
        <q-card-section class="flex">
          <q-input
            v-model="presidentLastName"
            class="q-ma-sm"
            color="admin-primary"
            filled
            label="Nom"
          />

          <q-input
            v-model="presidentFirstName"
            class="q-ma-sm"
            color="admin-primary"
            filled
            label="Prénoms"
          />
          <br>
          <q-input
            v-model="presidentNumber"
            class="q-ma-sm"
            color="admin-primary"
            filled
            label="Numéros de téléphone"
            mask="## ## ## ## ##"
            unmasked-value
            autocomplete="tel-national"
          />
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
        <q-card-section class="flex">
          <q-input
            v-model="treasurerLastName"
            class="q-ma-sm"
            color="admin-primary"
            filled
            label="Nom"
          />

          <q-input
            v-model="treasurerFirstName"
            class="q-ma-sm"
            color="admin-primary"
            filled
            label="Prénoms"
          />
          <br>
          <q-input
            v-model="treasurerNumber"
            class="q-ma-sm"
            color="admin-primary"
            filled
            label="Numéros de téléphone"
            mask="## ## ## ## ##"
            unmasked-value
            autocomplete="tel-national"
          />
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
        <q-card-section class="flex">
          <q-input
            v-model="secretaryLastName"
            class="q-ma-sm"
            color="admin-primary"
            filled
            label="Nom"
          />

          <q-input
            v-model="secretaryFirstName"
            class="q-ma-sm"
            color="admin-primary"
            filled
            label="Prénoms"
          />
          <br>
          <q-input
            v-model="secretaryNumber"
            class="q-ma-sm"
            color="admin-primary"
            filled
            label="Numéros de téléphone"
            mask="## ## ## ## ##"
            unmasked-value
            autocomplete="tel-national"
          />
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
        <q-card-section class="flex">
          <q-input
            v-model="masterLastName"
            class="q-ma-sm"
            color="admin-primary"
            filled
            label="Nom"
          />

          <q-input
            v-model="masterFirstName"
            class="q-ma-sm"
            color="admin-primary"
            filled
            label="Prénoms"
          />
          <br>
          <q-input
            v-model="masterNumber"
            class="q-ma-sm"
            color="admin-primary"
            filled
            label="Numéros de téléphone"
            mask="## ## ## ## ##"
            unmasked-value
            autocomplete="tel-national"
          />
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

export default {
  name: 'AdminSettingClub',

  computed: {
    ...mapState({
      settings: (state) => state.settings.settings
    }),

    clubMembers() {
      return this.settings.find((setting) => setting.type === 'clubMembers');
    }
  },

  data: () => ({
    presidentLastName: '',
    presidentFirstName: '',
    presidentNumber: '',
    treasurerLastName: '',
    treasurerFirstName: '',
    treasurerNumber: '',
    secretaryLastName: '',
    secretaryFirstName: '',
    secretaryNumber: '',
    masterLastName: '',
    masterFirstName: '',
    masterNumber: ''
  }),

  beforeMount() {
    this.fetchSettings();
  },

  mounted() {
    this.presidentLastName = this.clubMembers.president.lastName;
    this.presidentFirstName = this.clubMembers.president.firstName;
    this.presidentNumber = this.clubMembers.president.phone;
    this.treasurerLastName = this.clubMembers.treasurer.lastName;
    this.treasurerFirstName = this.clubMembers.treasurer.firstName;
    this.treasurerNumber = this.clubMembers.treasurer.phone;
    this.secretaryLastName = this.clubMembers.secretary.lastName;
    this.secretaryFirstName = this.clubMembers.secretary.firstName;
    this.secretaryNumber = this.clubMembers.secretary.phone;
    this.masterLastName = this.clubMembers.master.lastName;
    this.masterFirstName = this.clubMembers.master.firstName;
    this.masterNumber = this.clubMembers.master.phone;
  },

  methods: {
    ...mapActions(['fetchSettings', 'updateClub']),

    onSubmit() {
      const presidentInfo = {};
      const treasurerInfo = {};
      const masterInfo = {};
      const secretaryInfo = {};

      if (this.presidentLastName !== '') {
        presidentInfo.lastName = this.presidentLastName;
      } else {
        presidentInfo.lastName = "Aucun nom n'a été donné pour le président. Contacter un administrateur pour plus d'information.";
      }
      if (this.presidentFirstName !== '') {
        presidentInfo.firstName = this.presidentFirstName;
      } else {
        presidentInfo.firstName = "Aucun prénoms n'a été donné pour le président. Contacter un administrateur pour plus d'information.";
      }
      if (this.presidentNumber !== '') {
        presidentInfo.phone = this.presidentNumber;
      } else {
        presidentInfo.phone = "Aucun numéros n'a été donné pour le président. Contacter un administrateur pour plus d'information.";
      }

      if (this.treasurerLastName !== '') {
        treasurerInfo.lastName = this.treasurerLastName;
      } else {
        treasurerInfo.lastName = "Aucun nom n'a été donné pour le trésorier. Contacter un administrateur pour plus d'information.";
      }
      if (this.treasurerFirstName !== '') {
        treasurerInfo.firstName = this.treasurerFirstName;
      } else {
        treasurerInfo.firstName = "Aucun prénoms n'a été donné pour le trésorier. Contacter un administrateur pour plus d'information.";
      }
      if (this.treasurerNumber !== '') {
        treasurerInfo.phone = this.treasurerNumber;
      } else {
        treasurerInfo.phone = "Aucun numéros n'a été donné pour le trésorier. Contacter un administrateur pour plus d'information.";
      }

      if (this.masterLastName !== '') {
        masterInfo.lastName = this.masterLastName;
      } else {
        masterInfo.lastName = "Aucun nom n'a été donné pour le Maître d’armes. Contacter un administrateur pour plus d'information.";
      }
      if (this.masterFirstName !== '') {
        masterInfo.firstName = this.masterFirstName;
      } else {
        masterInfo.firstName = "Aucun prénoms n'a été donné pour le Maître d’armes. Contacter un administrateur pour plus d'information.";
      }
      if (this.masterNumber !== '') {
        masterInfo.phone = this.masterNumber;
      } else {
        masterInfo.phone = "Aucun numéros n'a été donné pour le Maître d’armes. Contacter un administrateur pour plus d'information.";
      }

      if (this.secretaryLastName !== '') {
        secretaryInfo.lastName = this.secretaryLastName;
      } else {
        secretaryInfo.lastName = "Aucun nom n'a été donné pour le secrétaire. Contacter un administrateur pour plus d'information.";
      }
      if (this.secretaryFirstName !== '') {
        secretaryInfo.firstName = this.secretaryFirstName;
      } else {
        secretaryInfo.firstName = "Aucun prénoms n'a été donné pour le secrétaire. Contacter un administrateur pour plus d'information.";
      }
      if (this.secretaryNumber !== '') {
        secretaryInfo.phone = this.secretaryNumber;
      } else {
        secretaryInfo.phone = "Aucun numéros n'a été donné pour le secrétaire. Contacter un administrateur pour plus d'information.";
      }

      this.updateClub({
        setting: this.clubMembers, presidentInfo, treasurerInfo, masterInfo, secretaryInfo
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
    }
  }
};
</script>

<style scoped>

</style>
