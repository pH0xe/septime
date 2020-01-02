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
