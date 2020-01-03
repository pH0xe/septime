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
              title="Coordonées"
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
            >
              <register-step-practising
                :birth-date="data.birthDate"
                @go-back="previous"
                @goto="goto"
                @submit="onLastStepSubmit"
              />
            </q-step>
          </q-stepper>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="js">
import { Notify } from 'quasar';
import store from '../store'; // Needed to access the store in beforeRouteEnter when the component hasn't been created yet
import RegisterStepAccount from '../components/RegisterStepAccount';
import RegisterStepCoordinates from '../components/RegisterStepCoordinates';
import RegisterStepPractising from '../components/RegisterStepPractising';

export default {
  name: 'RegisterPage',
  components: { RegisterStepPractising, RegisterStepCoordinates, RegisterStepAccount },

  data: () => ({
    step: 0,
    data: {
      birthDate: null // Initialize birthDate for it to be reactive
    }
  }),

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

  methods: {
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

      // Goto the next step
      this.next();
    },

    onLastStepSubmit(data) {
      this.onStepSubmit(data);

      // Prepare data
      const {
        firstName, lastName, email, password, phone, phoneEmergency,
        birthDate, laterality, certificateDate
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
        certificateDate
      };

      // Debug
      console.log(userData);

      // Create user
      this.$q.loading.show({
        message: 'Création du compte...'
      });

      // Signup on firebase
      this.$store.dispatch('signup', { ...userData })
        .then((currentUser) => {
          this.$q.loading.show({
            message: 'Upload du certificat médical...'
          });

          data.uploader.extra.filename = currentUser.uid;
          return data.uploader.upload();
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
          }

          this.$q.loading.hide();
        });
    }
  }
};
</script>
