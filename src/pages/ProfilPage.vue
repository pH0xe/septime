<template lang="html">
  <q-page class="q-ma-md q-my-lg">
    <div class="row items-center justify-center">
      <div class="page-padded col-12 col-md-8 q-px-sm">
        <!-- <editor-fold desc="Compte de connexion" defaultstate="collapsed"> -->
        <div class="row">
          <div class="col">
            <h5 class="text-h5">
              Compte de connexion
            </h5>
            <q-separator class="separator-margin" />
          </div>
        </div>
        <q-list
          bordered
          separator
          class="rounded-borders"
        >
          <q-card flat>
            <q-card-section>
              <q-input
                v-model="emailCopy"
                label="Modifier email"
                color="primary"
                autocomplete="email"
                class="q-ma-md"
                filled
                :readonly="emailDisable"
                error-message="Champs requis"
                :error="$v.emailCopy.$error"
                @blur="$v.emailCopy.$touch"
                @input="$v.emailCopy.$touch"
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-email" />
                </template>

                <template v-slot:append>
                  <q-btn
                    round
                    dense
                    flat
                    :icon="editIcon"
                    @click="editEmail"
                  />
                </template>
              </q-input>
              <q-separator />
              <q-input
                v-model="pwdCopy"
                label="Modifier mot de passe"
                color="primary"
                autocomplete="password"
                class="w-40 q-ma-md"
                filled
                :readonly="pwdDisable"
                type="password"
                error-message="Champs requis"
                :error="$v.pwdCopy.$error"
                @blur="$v.pwdCopy.$touch"
                @input="$v.pwdCopy.$touch"
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-lock" />
                </template>

                <template v-slot:append>
                  <q-btn
                    round
                    dense
                    flat
                    :icon="pwdIcon"
                    @click="editPwd"
                  />
                </template>
              </q-input>
              <q-separator />
              <q-card-section>
                <span class="text-weight-bold q-pr-sm">Administrateur :</span>
                <q-checkbox
                  :value="currentUser.isAdmin"
                  color="positive"
                  disable
                />
              </q-card-section>
              <q-separator />
              <q-card-actions
                align="right"
              >
                <q-btn
                  label="Editer"
                  color="primary"
                  flat
                  @click="editCurrentUser"
                />
              </q-card-actions>
            </q-card-section>
          </q-card>
        </q-list>
        <!-- </editor-fold> -->

        <!-- <editor-fold desc="subUsers" defaultstate="collapsed"> -->
        <div class="row">
          <div class="col">
            <h5 class="text-h5">
              Adhérents sous ce compte
            </h5>
            <q-separator class="separator-margin" />
          </div>
        </div>
        <q-list
          bordered
          class="rounded-borders"
        >
          <q-expansion-item
            v-for="user in currentUser.subUsers"
            :key="user.uid"
            expand-separator
            icon="mdi-account"
            :label="getName(user)"
          >
            <profil-view :user="user" />
          </q-expansion-item>
        </q-list>
        <!-- </editor-fold> -->
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, email, minLength } from 'vuelidate/lib/validators';
import { Notify, QSpinnerPie } from 'quasar';
import ProfilView from '../components/profilView';
import { cloudFunctions } from '../boot/firebase';

export default {
  name: 'ProfilPage',
  components: { ProfilView },
  mixins: [validationMixin],


  data: () => ({
    topics: [],
    emailCopy: '',
    editIcon: 'mdi-pencil',
    emailDisable: true,
    pwdCopy: '',
    pwdIcon: 'mdi-pencil',
    pwdDisable: true
  }),

  validations: {
    emailCopy: {
      required,
      email
    },

    pwdCopy: {
      required,
      minLength: minLength(8)
    }
  },

  computed: {
    ...mapGetters(['isMessagingReady', 'cerfaLink', 'medicalTemplateLink']),

    ...mapState({
      currentUser: (state) => state.auth.currentUser
    })
  },

  async mounted() {
    if (this.cerfaLink === null) {
      await this.fetchCerfa();
    }

    if (this.medicalTemplateLink === null) {
      await this.fetchMedicalTemplate();
    }
    this.emailCopy = this.currentUser.email;
  },

  beforeMount() {
    cloudFunctions.getTopics().then((topics) => {
      this.topics = topics.data.topics;
    });
  },

  methods: {
    ...mapActions(['fetchCerfa', 'fetchMedicalTemplate', 'changeLoginEmail', 'fetchCurrentUser', 'changePassword']),

    // <editor-fold desc="getName" defaultstate="collapsed">
    getName(user) {
      return `${user.firstName} ${user.lastName}`;
    },
    // </editor-fold>

    // <editor-fold desc="editCurrentUser" defaultstate="collapsed">
    editCurrentUser() {
      console.log('edit');
    },
    // </editor-fold>

    // <editor-fold desc="editEmail" defaultstate="collapsed">
    async editEmail() {
      if (this.emailDisable) {
        this.editIcon = 'mdi-content-save';
        this.emailDisable = false;
      } else {
        this.$v.emailCopy.$touch();
        if (!this.$v.emailCopy.$invalid) {
          this.$q.loading.show({
            spinnerColor: 'primary',
            spinner: QSpinnerPie,
            message: 'Changement de l\'email...'
          });
          this.editIcon = 'mdi-pencil';
          this.emailDisable = true;
          await this.changeLoginEmail({ newEmail: this.emailCopy });
          Notify.create({
            message: 'L\'email a été changer',
            color: 'positive',
            position: 'top'
          });
          this.$q.loading.hide();
          await this.fetchCurrentUser();
        }
      }
    },
    // </editor-fold>

    // <editor-fold desc="editPwd" defaultstate="collapsed">
    async editPwd() {
      if (this.pwdDisable) {
        this.pwdIcon = 'mdi-content-save';
        this.pwdDisable = false;
      } else {
        this.$v.pwdCopy.$touch();
        if (!this.$v.pwdCopy.$invalid) {
          this.$q.loading.show({
            spinnerColor: 'primary',
            spinner: QSpinnerPie,
            message: 'Changement du mot de passe...'
          });
          this.pwdIcon = 'mdi-pencil';
          this.pwdDisable = true;
          await this.changePassword({ newPassword: this.pwdCopy });
          Notify.create({
            message: 'Mot de passe changé.',
            color: 'positive',
            position: 'top'
          });
          this.$q.loading.hide();
          await this.fetchCurrentUser();
        }
      }
    }
    // </editor-fold>
  },

  meta: {
    title: 'Profil'
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

  .small-padding {
    padding: 2%;
  }
</style>
