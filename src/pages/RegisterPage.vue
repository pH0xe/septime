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
              <q-banner
                rounded
                class="q-ma-lg bg-warning"
              >
                Adhésion via AssoConnect <br>
                Merci de correctement renseigner le formulaire puis cochez la case suivante. <br>
                Une vérification du payement sera effectué avant que votre compte soit validé.
              </q-banner>
              <iframe :src="link" />
              <q-checkbox
                v-model="hasCheckPaid"
                label="J'ai payé via AssoConnect"
                color="primary"
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
    hasCheckPaid: false
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
        if (this.hasCheckPaid) {
          this.onLastStepSubmit();
        }
      } else {
        // Goto the next step
        this.next();
      }
    },

    onLastStepSubmit() {
      // Prepare data
      const {
        firstName, lastName, email, password, phone, phoneEmergency,
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
        weapons: weaponsChoice
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
        .then((currentUser) => {
          this.$q.loading.show({
            message: 'Upload du certificat médical...'
          });

          const { certificateUploader } = this.data;

          certificateUploader.extra.filename = currentUser.uid;
          return certificateUploader.upload();
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
</style>
