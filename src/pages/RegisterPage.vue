<template lang="html">
  <q-page>
    <div class="row justify-center q-mx-sm">
      <div class="page-padded col-12 col-md-8">
        <div class="text-h5 q-mb-md">
          Inscription
        </div>
        <q-separator />

        <div class="q-pt-md">
          <q-stepper
            ref="stepper"
            v-model="step"
            keep-alive
            :vertical="$q.platform.is.mobile"
            flat
            bordered
            color="primary"
            animated
          >
            <q-step
              :name="0"
              title="Compte"
              icon="mdi-account-circle"
              :done="step > 0"
            >
              <register-step-account
                @submit="onStepSubmit"
              />
            </q-step>
            <q-step
              :name="1"
              title="Coordonnées"
              icon="mdi-home"
              :done="step > 1"
            >
              <register-step-coordinates
                @submit="onStepSubmit"
                @go-back="previous"
              />
            </q-step>
            <q-step
              :name="2"
              title="Pratiquant"
              icon="mdi-sword"
              :done="step > 2"
              :disable="data.isReferent"
            >
              <register-step-practising
                ref="upload"
                :birth-date="data.birthDate"
                @go-back="previous"
                @goto="goto"
                @submit="onStepSubmit"
              />
            </q-step>

            <q-step
              :name="3"
              title="Obligations"
              icon="mdi-alert-circle"
              :done="step > 3"
            >
              <register-step-obligation
                @submit="onStepSubmit"
                @go-back="previous"
              />
            </q-step>

            <q-step
              :name="4"
              title="Paiement"
              icon="mdi-currency-eur"
              :done="step > 4"
            >
              <q-dialog
                v-model="warningMessage"
                persistent
              >
                <q-card>
                  <q-card-section>
                    <div class="text-h6">
                      Atention !
                    </div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    Si vous payez par carte bancaire : <br>
                    1) Choisir le tarif en fonction de la catégorie. <br>
                    2) Payer par HelloAsso. <br>
                    3) Valider l'inscription avec le bouton "Terminer" en bas de page <br>
                    <br>
                    Si vous payez par chéque, espèces ou chéques vacances : <br>
                    1) Ignorer le paiement par HelloAsso et cliquer sur "Terminer" en bas de page <br>
                    2) Remettre le paiement au club à la rentrée. <br>
                    <br>
                    Pour finaliser l'inscription cliquer sur le bouton "Terminer" en bas de la page
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn
                      v-close-popup
                      flat
                      label="OK"
                      color="primary"
                    />
                  </q-card-actions>
                </q-card>
              </q-dialog>

              <q-banner
                rounded
                class="q-ma-lg bg-warning"
              >
                Le paiement via carte bancaire se fait sur Helloasso. <br>
                Une vérification du paiement sera effectuée avant que votre compte soit validé. <br>
                Une fois l'inscription terminée vous serez redirigé à la page d'accueil.
              </q-banner>
              <q-banner
                rounded
                class="q-ma-lg bg-negative text-white"
                inline-actions
              >
                <span class="text-weight-bolder">Important</span> <br>
                Si vous ne payez pas par carte cliquer sur "Terminer" en bas de page. <br>
                Si vous payez par carte, suivre la procédure HelloAsso puis cliquer sur "Terminer" en bas de page.
                <template v-slot:action>
                  <q-btn
                    flat
                    color="white"
                    label="Plus d'information"
                    @click="openWarning"
                  />
                </template>
              </q-banner>

              <h5 class="text-h5">
                Payement par HelloAsso (carte bancaire)
              </h5>

              <div
                class="border q-mt-md"
                v-html="helloassoURL"
              />

              <q-stepper-navigation>
                <q-btn
                  label="Terminer"
                  icon="mdi-check"
                  unelevated
                  color="primary"
                  class="on-left"
                  @click="onStepSubmit({})"
                />
                <q-btn
                  label="Précédent"
                  flat
                  color="primary"
                  @click="previous"
                />
              </q-stepper-navigation>
            </q-step>
          </q-stepper>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="js">
import { Notify } from 'quasar';
import { mapActions, mapState } from 'vuex';
import store from '../store'; // Needed to access the store in beforeRouteEnter when the component hasn't been created yet
import RegisterStepAccount from '../components/RegisterStepAccount';
import RegisterStepCoordinates from '../components/RegisterStepCoordinates';
import RegisterStepPractising from '../components/RegisterStepPractising';
import RegisterStepObligation from '../components/RegisterStepObligation';

export default {
  name: 'RegisterPage',
  components: {
    RegisterStepObligation, RegisterStepPractising, RegisterStepCoordinates, RegisterStepAccount
  },

  data: () => ({
    step: 0,
    data: {
      birthDate: null, // Initialize birthDate for it to be reactive,
      isReferent: false
    },
    link: '',
    hasCheckPaid: false,
    helloassoURL: '',
    warningMessage: true
  }),

  computed: {
    ...mapState({
      settingsRegister: (state) => state.settings.settingsRegister
    }),

    isLastStep() {
      return this.step === 4;
    }
  },

  beforeDestroy() {
    if (this.timer) {
      this.clearTimeout(this.timer);
      this.$q.loading.hide();
    }
  },

  beforeRouteEnter(to, from, next) {
    // Prevent this page from showing if we are already logged in
    if (store.getters.isLoggedIn) {
      next(false);
    } else {
      next();
    }
  },

  mounted() {
    // if register is close come back to home
    this.fetchSettings().then(() => {
      if (!store.getters.isRegisterOpen || store.getters.isLoggedIn) {
        this.$router.replace({ name: 'home' });
      }
      this.link = this.settingsRegister.linkToForm;
      this.helloassoURL = this.settingsRegister.linkToHelloasso;
    });
  },

  methods: {
    ...mapActions(['fetchSettings']),

    next() {
      this.$refs.stepper.next();
    },

    previous() {
      this.$refs.stepper.previous();
    },

    goto(step) {
      this.$refs.stepper.goTo(step);
    },

    onStepSubmit(data) {
      // Append the step data to the page
      this.data = {
        ...this.data,
        ...data
      };

      // If not the last step
      if (this.isLastStep) {
        this.onLastStepSubmit();
      } else {
        // Goto the next step
        this.next();
      }
    },

    onLastStepSubmit() {
      // Prepare data
      const {
        firstName, lastName, email, password, phone, phoneEmergency, relationEmergency,
        birthDate, laterality, certificateDate, gender, weaponsChoice
      } = this.data;

      const address = {
        street: this.data.address.street,
        city: this.data.address.city,
        zip: this.data.address.zip
      };

      const userData = {
        firstName,
        lastName,
        email,
        password,
        phone,
        phoneEmergency,
        birthDate,
        address,
        laterality,
        certificateDate,
        cerfa: false,
        gender,
        payments: {
          amount: 0,
          assurance: false,
          competition: false,
          deposit: false,
          paid: false
        },
        weapons: weaponsChoice,
        relationEmergency
      };

      // Debug
      // console.log(userData);

      // Create user
      this.$q.loading.show({
        message: 'Création du compte...'
      });

      // Signup on firebase
      this.$store.dispatch('signup', { ...userData })
        .then(async (currentUser) => {
          this.$q.loading.show({
            message: 'Upload de la photo de profil'
          });

          if (this.$refs.upload.isProfilPic === true) {
            const { photoUploader } = this.data;

            photoUploader.extra.filename = currentUser.uid;
            await photoUploader.upload();
          }

          return currentUser;
        }) // Upload profile picture
        .then(async (currentUser) => {
          this.$q.loading.show({
            message: 'Upload du certificat médical...'
          });

          if (this.$refs.upload.isCertificate === true) {
            const { certificateUploader } = this.data;

            certificateUploader.extra.filename = currentUser.uid;
            await certificateUploader.upload();
          }

          return currentUser;
        }) // Upload certificate
        .then(() => {
          this.$q.loading.hide();
          this.$q.notify({
            message: 'Création du compte avec succès !',
            color: 'positive',
            icon: 'mdi-check'
          });

          this.$router.replace({ name: 'home' });
        })

        // Error handling
        .catch((err) => {
          switch (err.code) {
            // Authentication errors
            case 'auth/email-already-in-use':
            case 'auth/invalid-email':
              Notify.create({
                message: 'Cet email n\'est pas valide',
                color: 'negative',
                icon: 'mdi-alert'
              });
              break;
            case 'auth/weak-password':
              Notify.create({
                message: 'Mot de passe trop faible',
                color: 'negative',
                icon: 'mdi-alert'
              });
              break;

              // Storage errors
            case 'storage/quota-exceeded':
              Notify.create({
                message: 'Quota expiré. Veuillez contacter un administrateur !',
                color: 'negative',
                icon: 'mdi-alert'
              });
              break;
            case 'storage/unauthenticated':
            case 'storage/unauthorized':
              Notify.create({
                message: 'Upload non autorisée. Veuillez contacter un administrteur !',
                color: 'negative',
                icon: 'mdi-alert'
              });
              break;
            case 'storage/retry-limit-exceeded':
              Notify.create({
                message: 'Limite d\'upload dépassée, veuillez réessayer plus tard.',
                color: 'negative',
                icon: 'mdi-alert'
              });
              break;
            case 'storage/invalid-checksum':
            case 'storage/canceled':
            case 'storage/invalid-event-name':
            case 'storage/server-file-wrong-size':
              Notify.create({
                message: 'Une erreur technique est survenue. Veuillez réessayez.',
                color: 'negative',
                icon: 'mdi-alert'
              });
              break;

              // Unknown errors
            default:
              console.error(err);
              Notify.create({
                message: `Une erreur inconnue est survenue: ${err.code}`,
                color: 'negative',
                icon: 'mdi-alert'
              });
              this.$router.replace({ name: 'home' });
          }

          this.$q.loading.hide();
        });
    },

    openWarning() {
      this.warningMessage = true;
    }
  },

  meta: {
    title: 'Inscription'
  }
};
</script>

<style lang="scss">
  iframe {
    border: solid 1px black;
    height: 40em;
    width: 100%;
    display: block;
    margin: auto;
  }

  .border {
    border: solid 1px black;
  }
</style>
