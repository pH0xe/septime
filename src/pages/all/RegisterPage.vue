<template lang="html">
  <q-page>
    <div class="row justify-center q-mx-sm">
      <div class="page-padded col-12 col-md-8">
        <div class="text-h5 q-mb-md">
          Inscription
        </div>
        <q-separator />

        <div class="q-pt-md">
          <q-form @submit.prevent="onClickOk">
            <q-card-section>
              <q-input
                v-model="login"
                type="email"
                label="E-Mail"
                required
                autocomplete="email"
                error-message="Veuillez entrez un email valide"
                :error="$v.login.$error"
                @blur="$v.login.$touch"
                @input="$v.login.$touch"
              />

              <q-input
                v-model="password"
                type="password"
                label="Mot de passe"
                required
                autocomplete="current-password"
                error-message="Ce champ est requis"
                :error="$v.password.$error"
                @blur="$v.password.$touch"
                @input="$v.password.$touch"
              />
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                unelevated
                color="primary"
                type="submit"
                icon="mdi-account-plus"
                label="S'inscrire"
              />
              <q-btn
                flat
                label="Annuler"
                @click="onClickCancel"
              />
            </q-card-actions>
          </q-form>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="js">
import { Notify, QSpinnerPie } from 'quasar';
import { email, required } from 'vuelidate/lib/validators'; // Needed to access the store in beforeRouteEnter when the component hasn't been created yet
import { validationMixin } from 'vuelidate';
import store from '../../store';

export default {
  name: 'RegisterPage',
  mixins: [validationMixin],

  data: () => ({
    login: null,
    password: null
  }),

  validations: {
    login: {
      required, email
    },
    password: {
      required
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
    onClickOk() {
      this.$q.loading.show({
        message: 'Création du compte...',
        spinner: QSpinnerPie,
        spinnerColor: 'primary'
      });

      // Signup on firebase
      this.$store.dispatch('signup', { email: this.login, password: this.password })
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

    onClickCancel() {
      this.$router.push({ name: 'home' });
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
