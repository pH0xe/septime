<template>
  <div>
    <div class="row">
      <div class="col">
        <h5 class="text-h5">
          Informations de connexion
        </h5>
        <q-separator class="separator-margin" />
      </div>
    </div>
    <div class="row">
      <q-input
        v-model="loginEmail"
        label="E-mail"
        filled
        color="admin-primary"
        class="col-12 col-md-5 q-mb-md"
        error-message="Champ requis"
        required
        hint="Email utilisé pour la connexion de l'adhérent. Si membre d'une famille enregistrée mettre le meme email."
        :error="$v.loginEmail.$error"
        @input="$v.loginEmail.$touch"
        @blur="$v.loginEmail.$touch"
      />
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { email, required } from 'vuelidate/lib/validators';

export default {
  name: 'AdminMemberCreateLoginData',
  mixins: [validationMixin],

  data: () => ({
    loginEmail: ''
  }),

  validations: {
    loginEmail: { required, email }
  }
};
</script>

<style scoped>
  .text-h5 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .separator-margin {
    margin-bottom: 1rem;
  }
</style>
