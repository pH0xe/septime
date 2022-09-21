<template>
  <div>
    <section-title text="Créer un admin" />
    <q-card flat>
      <q-card-section class="row items-center">
        <q-input
          v-model="loginEmail"
          label="Email"
          filled
          color="admin-primary"
          class="col-12 col-md-5 q-mr-sm"
          error-message="Champ requis"
          required
          :error="$v.loginEmail.$error"
          @input="$v.loginEmail.$touch"
          @blur="$v.loginEmail.$touch"
        />
        <q-btn
          :round="$q.screen.md"
          color="positive"
          icon="mdi-plus"
          :label="$q.screen.md ? '' : 'Ajouter'"
          @click="createAccount"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { email, required } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import { Notify } from 'quasar';
import SectionTitle from '../../utils/sectionTitle';

export default {
  name: 'AdminCreateAccount',
  components: { SectionTitle },
  mixins: [validationMixin],

  data: () => ({
    loginEmail: ''
  }),

  validations: {
    loginEmail: { required, email }
  },

  methods: {
    ...mapActions(['adminCreateAccount', 'fetchAccounts']),

    createAccount() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.adminCreateAccount({ email: this.loginEmail })
          .then(() => {
            Notify.create({
              message: 'Compte créé avec succès',
              color: 'positive',
              position: 'bottom'
            });
          });
        this.loginEmail = '';
        this.fetchAccounts();
      }
    }
  }
};
</script>

<style scoped>

</style>
