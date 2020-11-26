<template lang="html">
  <q-dialog
    ref="dialog"
    :maximized="$q.platform.is.mobile"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
      <q-form @submit.prevent="onClickOk">
        <q-card-section>
          <div class="text-h6">
            Connexion
          </div>
        </q-card-section>

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

          <a
            class="text-subtitle1 link"
            @click.prevent="onClickResetPassword"
          >Réinitialiser mon mot de passe</a>
          <br>
          <a
            class="text-subtitle1 link"
            @click.prevent="onClickRegister"
          >Pas de Compte ? créer en un !</a>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            unelevated
            color="primary"
            type="submit"
            icon="mdi-login-variant"
            label="Se Connecter"
          />
          <q-btn
            flat
            label="Annuler"
            @click="onClickCancel"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="js">
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import { auth } from '../../../boot/firebase';

export default {
  name: 'LoginDialog',
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

  methods: {
    show() {
      this.$refs.dialog.show();
    },

    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      this.$emit('hide');
    },

    onClickRegister() {
      this.$router.push({ name: 'register' });
    },

    onClickResetPassword() {
      this.$q.dialog({
        title: 'Réinitialisation de mot de passe',
        message: 'Veuillez entrez votre addresse email',
        prompt: {
          model: this.login,
          type: 'email'
        },
        cancel: true,
        persistent: true
      })
        .onOk((emailReset) => {
          this.$q.notify({
            message: 'Envoi du mail en cours...'
          });

          auth.sendPasswordResetEmail(emailReset)
            .then(() => {
              this.$q.notify({
                message: 'Mail de réinitialisation de mot de passe envoyé',
                icon: 'mdi-check',
                color: 'positive'
              });
            })
            .catch((err) => {
              switch (err.code) {
                case 'auth/invalid-email':
                case 'auth/user-not-found':
                  this.$q.notify({
                    message: 'Email invalide !',
                    icon: 'mdi-alert',
                    color: 'negative'
                  });
                  break;
                default:
                  this.$q.notify({
                    message: `Erreur inconnue: ${err.code}`,
                    icon: 'mdi-alert',
                    color: 'positive'
                  });
                  break;
              }
            });
        });
    },

    onClickOk() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.$emit('ok', {
          email: this.login, password: this.password
        });
        this.hide();
      }
    },

    onClickCancel() {
      this.hide();
    }
  }
};
</script>
