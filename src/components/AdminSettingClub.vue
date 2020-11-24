<template>
  <div>
    <div class="text-h6">
      Les membres du bureau :
    </div>
    <!-- <editor-fold desc="President" defaultstate="collapsed"> -->
    <q-card
      flat
      bordered
    >
      <q-card-section class="text-h6 q-py-sm">
        Le président :
      </q-card-section>
      <q-card-section class="row items-center q-py-sm">
        <q-input
          v-model="office.president.lastName"
          class="q-mr-md q-my-sm col-12 col-md-3"
          color="admin-primary"
          filled
          label="Nom"
        />
        <q-input
          v-model="office.president.firstName"
          class="q-mr-md q-my-sm col-12 col-md-3"
          color="admin-primary"
          filled
          label="Prénoms"
        />
        <q-input
          v-model="office.president.phone"
          class="q-mr-md q-my-sm col-12 col-md-3"
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
            :icon="!office.president.picture ? 'mdi-account': undefined"
            color="grey-4"
            round
          >
            <q-img
              :src="office.president.picture"
            />
          </q-avatar>
        </q-btn>
        <q-btn
          class="q-ma-sm q-ml-lg"
          icon="mdi-check"
          color="positive"
          round
          @click="submitPresident"
        >
          <q-tooltip>Valider</q-tooltip>
        </q-btn>
      </q-card-section>
    </q-card>
    <!-- </editor-fold> -->
    <!-- <editor-fold desc="Tresorier" defaultstate="collapsed"> -->
    <q-card
      flat
      bordered
    >
      <q-card-section class="text-h6 q-py-sm">
        Le trésorier :
      </q-card-section>
      <q-card-section class="row items-center q-py-sm">
        <q-input
          v-model="office.treasurer.lastName"
          class="q-mr-md q-my-sm col-12 col-md-3"
          color="admin-primary"
          filled
          label="Nom"
        />

        <q-input
          v-model="office.treasurer.firstName"
          class="q-mr-md q-my-sm col-12 col-md-3"
          color="admin-primary"
          filled
          label="Prénoms"
        />
        <br>
        <q-input
          v-model="office.treasurer.phone"
          class="q-mr-md q-my-sm col-12 col-md-3"
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
            :icon="!office.treasurer.picture ? 'mdi-account': undefined"
            color="grey-4"
            round
          >
            <q-img
              :src="office.treasurer.picture"
            />
          </q-avatar>
        </q-btn>
        <q-btn
          class="q-ma-sm q-ml-lg"
          icon="mdi-check"
          color="positive"
          round
          @click="submitTreasurer"
        >
          <q-tooltip>Valider</q-tooltip>
        </q-btn>
      </q-card-section>
    </q-card>
    <!-- </editor-fold> -->
    <!-- <editor-fold desc="Secretaire" defaultstate="collapsed"> -->
    <q-card
      flat
      bordered
    >
      <q-card-section class="text-h6 q-py-sm">
        Le secrétaire :
      </q-card-section>
      <q-card-section class="row items-center q-py-sm">
        <q-input
          v-model="office.secretary.lastName"
          class="q-mr-md q-my-sm col-12 col-md-3"
          color="admin-primary"
          filled
          label="Nom"
        />

        <q-input
          v-model="office.secretary.firstName"
          class="q-mr-md q-my-sm col-12 col-md-3"
          color="admin-primary"
          filled
          label="Prénoms"
        />
        <br>
        <q-input
          v-model="office.secretary.phone"
          class="q-mr-md q-my-sm col-12 col-md-3"
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
            :icon="!office.secretary.picture ? 'mdi-account': undefined"
            color="grey-4"
            round
          >
            <q-img
              :src="office.secretary.picture"
            />
          </q-avatar>
        </q-btn>
        <q-btn
          class="q-ma-sm q-ml-lg"
          icon="mdi-check"
          color="positive"
          round
          @click="submitSecretary"
        >
          <q-tooltip>Valider</q-tooltip>
        </q-btn>
      </q-card-section>
    </q-card>
    <!-- </editor-fold> -->
    <!-- <editor-fold desc="Maitre d'armes" defaultstate="collapsed"> -->
    <q-card
      flat
      bordered
    >
      <q-card-section class="text-h6 q-py-sm">
        Le maître d’armes :
      </q-card-section>
      <q-card-section class="row items-center q-py-sm">
        <q-input
          v-model="office.master.lastName"
          class="q-mr-md q-my-sm col-12 col-md-3"
          color="admin-primary"
          filled
          label="Nom"
        />

        <q-input
          v-model="office.master.firstName"
          class="q-mr-md q-my-sm col-12 col-md-3"
          color="admin-primary"
          filled
          label="Prénoms"
        />
        <br>
        <q-input
          v-model="office.master.phone"
          class="q-mr-md q-my-sm col-12 col-md-3"
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
            :icon="!office.master.picture ? 'mdi-account': undefined"
            color="grey-4"
            round
          >
            <q-img
              :src="office.master.picture"
            />
          </q-avatar>
        </q-btn>
        <q-btn
          class="q-ma-sm q-ml-lg"
          icon="mdi-check"
          color="positive"
          round
          @click="submitMaster"
        >
          <q-tooltip>Valider</q-tooltip>
        </q-btn>
      </q-card-section>
    </q-card>
    <!-- </editor-fold> -->

    <!-- <editor-fold desc="Other New" defaultstate="collapsed"> -->
    <q-card
      flat
      bordered
      class="q-pa-sm"
    >
      <q-card-section class="text-h6 q-py-sm">
        Autres membres :
      </q-card-section>
      <q-card-section class="row items-center q-py-sm">
        <q-input
          v-model="newMember.roleName"
          class="q-mr-md q-my-sm col-12 col-md-5"
          color="admin-primary"
          label="Rôle"
          filled
        />
        <q-input
          v-model="newMember.firstName"
          class="q-mr-md q-my-sm col-12 col-md-5"
          color="admin-primary"
          label="Prénom"
          filled
        />
        <q-input
          v-model="newMember.lastName"
          class="q-mr-md q-my-sm col-12 col-md-5"
          color="admin-primary"
          label="Nom"
          filled
        />
        <q-input
          v-model="newMember.phone"
          class="q-mr-md q-my-sm col-12 col-md-5"
          label="Numéro de téléphone"
          filled
          color="admin-primary"
          mask="## ## ## ## ##"
          unmasked-value
        />
        <q-btn
          class="q-ma-sm"
          icon="mdi-plus"
          color="positive"
          round
          @click="addOfficeMember"
        />
      </q-card-section>
    </q-card>
    <!-- </editor-fold> -->
    <!-- <editor-fold desc="Other list" defaultstate="collapsed"> -->
    <q-card
      flat
      bordered
      class="q-pa-sm"
    >
      <q-card-section class="text-h6 q-py-sm row">
        Autres membres déjà soumit:
        <q-space />
        <q-btn
          flat
          round
          icon="mdi-refresh"
        />
      </q-card-section>
      <div
        v-for="(office, index) in otherList"
        :key="index"
        class="row items-baseline q-my-sm"
      >
        <q-card-section class="row items-center q-py-sm">
          <q-input
            v-model="office.roleName"
            class="q-mr-md q-my-sm col-12 col-md-5"
            color="admin-primary"
            label="Rôle"
            filled
            readonly
          />
          <q-input
            v-model="office.firstName"
            class="q-mr-md q-my-sm col-12 col-md-5"
            color="admin-primary"
            label="Prénom"
            filled
            readonly
          />
          <q-input
            v-model="office.lastName"
            class="q-mr-md q-my-sm col-12 col-md-5"
            color="admin-primary"
            label="Nom"
            filled
            readonly
          />
          <q-input
            v-model="office.phone"
            class="q-mr-md q-my-sm col-12 col-md-5"
            label="Numéro de téléphone"
            filled
            color="admin-primary"
            mask="## ## ## ## ##"
            unmasked-value
            readonly
          />
          <q-btn
            class="q-ma-sm"
            icon="close"
            color="negative"
            flat
            round
            @click="removeMember(index)"
          />
        </q-card-section>
        <q-separator />
      </div>
    </q-card>
    <!-- </editor-fold> -->
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import { Notify } from 'quasar';
import AdminSettingsAddPict from './AdminSettingsAddPict';

export default {
  name: 'AdminSettingClub',

  data: () => ({
    office: {
      president: {},
      treasurer: {},
      master: {},
      secretary: {},
      other: []
    },
    otherList: [],
    newMember: {
      lastName: '',
      firstName: '',
      roleName: '',
      phone: null
    }
  }),

  computed: {
    ...mapState({
      settings: (state) => state.settings.settings[0]
    })
  },

  mounted() {
    this.fetchSettings().then(() => {
      const office = this.settings?.office;
      if (office) {
        const cpy = JSON.parse(JSON.stringify(this.settings?.office));
        this.office = { ...this.office, ...cpy };
        this.otherList = [...this.office.other];
      }
    });
  },

  methods: {
    ...mapActions(['updateOffice', 'fetchSettings']),

    addImage(who) {
      this.$q.dialog({
        component: AdminSettingsAddPict,
        parent: this,
        regarding: who
      });
    },

    erasePictureField(newOffice) {
      delete newOffice.president?.picture;
      delete newOffice.treasurer?.picture;
      delete newOffice.master?.picture;
      delete newOffice.secretary?.picture;
    },

    submitMaster() {
      const { firstName, lastName } = this.office.master;
      if (firstName && lastName) {
        const newOffice = { ...this.settings.office };
        newOffice.master = this.office.master;
        this.erasePictureField(newOffice);
        this.updateOffice({ settings: this.settings, newOffice })
          .then(() => {
            Notify.create({
              message: 'Changement du maître d\'armes effectué avec succès',
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
    },

    submitSecretary() {
      const { firstName, lastName } = this.office.secretary;
      if (firstName && lastName) {
        const newOffice = { ...this.settings.office };
        newOffice.secretary = this.office.secretary;
        this.erasePictureField(newOffice);
        this.updateOffice({ settings: this.settings, newOffice })
          .then(() => {
            Notify.create({
              message: 'Changement du secrétaire effectué avec succès',
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
    },

    submitTreasurer() {
      const { firstName, lastName } = this.office.treasurer;
      if (firstName && lastName) {
        const newOffice = { ...this.settings.office };
        newOffice.treasurer = this.office.treasurer;
        this.erasePictureField(newOffice);
        this.updateOffice({ settings: this.settings, newOffice })
          .then(() => {
            Notify.create({
              message: 'Changement du trésorier effectué avec succès',
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
    },

    submitPresident() {
      const { firstName, lastName } = this.office.president;
      if (firstName && lastName) {
        const newOffice = { ...this.settings.office };
        newOffice.president = this.office.president;
        this.erasePictureField(newOffice);
        this.updateOffice({ settings: this.settings, newOffice })
          .then(() => {
            Notify.create({
              message: 'Changement du président effectué avec succès',
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
    },

    addOfficeMember() {
      const {
        lastName, firstName, roleName
      } = this.newMember;
      if (lastName && firstName && roleName) {
        const newOffice = { ...this.settings.office };
        this.otherList = [...this.otherList, this.newMember];
        newOffice.other = this.otherList;
        this.erasePictureField(newOffice);
        this.updateOffice({ settings: this.settings, newOffice })
          .then(() => {
            Notify.create({
              message: 'Ajout d\'un membre avec succès',
              color: 'positive',
              position: 'top'
            });
            this.newMember = {
              lastName: '', firstName: '', roleName: '', phone: null
            };
          })
          .catch((err) => {
            Notify.create({
              message: `Une erreur s'est produite: ${err}`,
              color: 'negative',
              position: 'top'
            });
          });
      }
    },

    removeMember(index) {
      this.otherList.splice(index, 1);
      const newOffice = { ...this.settings.office };
      newOffice.other = [...this.otherList];
      this.erasePictureField(newOffice);
      this.updateOffice({ settings: this.settings, newOffice })
        .then(() => {
          Notify.create({
            message: 'Suppression d\'un membre avec succès',
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
.q-card {
  margin-bottom: 1rem;
  margin-top: 1rem;
}
</style>
