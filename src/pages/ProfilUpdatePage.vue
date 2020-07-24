<template lang="html">
  <q-page>
    <div class="row justify-center q-mx-sm">
      <div class="page-padded col-12 col-md-8">
        <q-form @submit="submitMail">
          <q-card
            flat
            bordered
          >
            <q-card-section class="text-weight-bold">
              Modifier l'email
            </q-card-section>
            <q-input
              v-model="email"
              label="Modifier email"
              color="primary"
              autocomplete="email"
              class="w-40 q-ma-md"
              filled
              error-message="Champs requis"
              :error="$v.email.$error"
              @blur="$v.email.$touch"
              @input="$v.email.$touch"
            />
            <q-btn
              color="primary"
              label="Valider"
              type="submit"
              flat
            />
          </q-card>
        </q-form>
        <q-form
          class="q-mt-md"
          @submit="submitPassword"
        >
          <q-card
            flat
            bordered
          >
            <q-card-section class="text-weight-bold">
              Modifier le mot de passe
            </q-card-section>
            <q-input
              v-model="password"
              label="Modifier mot de passe"
              color="primary"
              autocomplete="password"
              class="w-40 q-ma-md"
              filled
              :type="isPwd ? 'password' : 'text'"
              error-message="Champs requis"
              :error="$v.password.$error"
              @blur="$v.password.$touch"
              @input="$v.password.$touch"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-btn
              color="primary"
              label="Valider"
              type="submit"
              flat
            />
          </q-card>
        </q-form>
        <q-form
          class="q-mt-md"
          @submit="submitAddress"
        >
          <q-card
            flat
            bordered
          >
            <q-card-section class="text-weight-bold">
              Modifier l'adresse
            </q-card-section>
            <div class="row items-baseline">
              <q-input
                v-model="address.street"
                label="Rue"
                color="primary"
                autocomplete="street-address"
                class="w-40 q-ma-md"
                filled
                error-message="Champs requis"
                :error="$v.address.street.$error"
                @blur="$v.address.street.$touch"
                @input="$v.address.street.$touch"
              />
              <q-input
                v-model="address.city"
                label="Ville"
                color="primary"
                autocomplete="address-level2"
                class="w-40 q-ma-md"
                filled
                error-message="Champs requis"
                :error="$v.address.city.$error"
                @blur="$v.address.city.$touch"
                @input="$v.address.city.$touch"
              />
              <q-input
                v-model="address.zip"
                mask="## ###"
                unmasked-value
                label="Code postal"
                color="primary"
                autocomplete="postal-code"
                class="w-40 q-ma-md"
                filled
                error-message="Champs requis"
                :error="$v.address.zip.$error"
                @blur="$v.address.zip.$touch"
                @input="$v.address.zip.$touch"
              />
            </div>
            <q-btn
              color="primary"
              label="Valider"
              type="submit"
              flat
            />
          </q-card>
        </q-form>
        <q-form
          class="q-mt-md"
          @submit="submitPhone"
        >
          <q-card
            flat
            bordered
          >
            <q-card-section class="text-weight-bold">
              Modifier les numéros de téléphone
            </q-card-section>
            <div class="row items-baseline">
              <q-input
                v-model="phone"
                label="Téléphone"
                color="primary"
                class="w-40 q-ma-md"
                filled
                mask="## ## ## ## ##"
                unmasked-value
                error-message="Champs requis"
                :error="$v.phone.$error"
                @blur="$v.phone.$touch"
                @input="$v.phone.$touch"
              />
              <q-input
                v-model="phoneEmergency"
                label="téléphone d'urgence"
                color="primary"
                class="w-40 q-ma-md"
                filled
                mask="## ## ## ## ##"
                unmasked-value
                error-message="Champs requis"
                :error="$v.phoneEmergency.$error"
                @blur="$v.phoneEmergency.$touch"
                @input="$v.phoneEmergency.$touch"
              />
            </div>
            <q-btn
              color="primary"
              label="Valider"
              type="submit"
              flat
            />
          </q-card>
        </q-form>
        <div
          align="right"
          class="q-mt-md"
        >
          <q-btn
            label="Annuler"
            color="negative"
            flat
            :to="{name: 'profil'}"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { Notify } from 'quasar';
import { validationMixin } from 'vuelidate';
import { minLength, required, email } from 'vuelidate/lib/validators';
import { length } from '../js/vuelidate-custom-validators';

export default {
  name: 'ProfilUpdatePage',
  mixins: [validationMixin],

  data: () => ({
    email: '',
    address: {
      street: '',
      zip: 'null',
      city: ''
    },
    phoneEmergency: null,
    phone: null,
    password: '',
    isPwd: true
  }),

  validations: {
    email: {
      required,
      email
    },
    address: {
      zip: {
        required,
        length: length(5)
      },
      street: { required },
      city: { required }
    },
    phone: {
      required,
      length: length(10)
    },
    phoneEmergency: {
      required,
      length: length(10)
    },
    password: {
      required,
      minLength: minLength(8)
    }


  },

  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser
    })
  },

  mounted() {
    this.email = this.currentUser.email;
    this.address.street = this.currentUser.address.street;
    this.address.city = this.currentUser.address.city;
    this.address.zip = this.currentUser.address.zip;
    this.phone = this.currentUser.phone;
    this.phoneEmergency = this.currentUser.phoneEmergency;
  },

  methods: {
    ...mapActions(['changePassword', 'changeEmail', 'fetchCurrentUser', 'changeAddress', 'changePhone', 'fetchMembers']),

    submitMail() {
      this.$v.email.$touch();
      if (!this.$v.email.$invalid) {
        this.changeEmail({ newEmail: this.email })
          .then(() => {
            this.fetchCurrentUser();
            Notify.create({
              message: 'L\'email a été changé avec succès',
              color: 'positive',
              position: 'top'
            });
          });
      }
    },

    submitAddress() {
      this.$v.address.$touch();

      if (!this.$v.address.$invalid) {
        this.changeAddress({
          member: this.currentUser,
          newAddress: this.address
        })
          .then(() => {
            this.fetchCurrentUser();
            Notify.create({
              message: 'L\'adresse a été changé avec succès',
              color: 'positive',
              position: 'top'
            });
          });
      }
    },

    submitPhone() {
      this.$v.phone.$touch();
      this.$v.phoneEmergency.$touch();

      if (!(this.$v.phone.$invalid || this.$v.phoneEmergency.$invalid)) {
        this.changePhone({
          member: this.currentUser,
          newPhone: this.phone,
          newPhoneEmergency: this.phoneEmergency
        })
          .then(() => {
            this.fetchCurrentUser();
            Notify.create({
              message: 'Les numéro ont été changé avec succès',
              color: 'positive',
              position: 'top'
            });
          });
      }
    },

    submitPassword() {
      this.$v.password.$touch();

      if (!this.$v.password.$invalid) {
        this.changePassword({ newPassword: this.password })
          .then(() => {
            this.fetchCurrentUser();
            Notify.create({
              message: 'Mot de passe changé avec succès',
              color: 'positive',
              position: 'top'
            });
          });
      }
    }
  },

  meta: {
    title: 'Profil'
  }
};
</script>

<style scoped>
.w-40 {
  width: 40%;
}
.w-90 {
  width: 90%;
}
</style>
