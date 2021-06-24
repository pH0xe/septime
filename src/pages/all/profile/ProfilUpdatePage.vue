<template lang="html">
  <q-page>
    <div class="row justify-center q-mx-sm">
      <div class="page-padded col-12 col-md-8">
        <!-- <editor-fold desc="Email" defaultstate="collapsed"> -->
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
        <!-- </editor-fold> -->

        <!-- <editor-fold desc="Adresse" defaultstate="collapsed"> -->
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
        <!-- </editor-fold> -->

        <!-- <editor-fold desc="Téléphone" defaultstate="collapsed"> -->
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
                v-model="emergency.phone"
                label="téléphone d'urgence"
                color="primary"
                class="w-40 q-ma-md"
                filled
                mask="## ## ## ## ##"
                unmasked-value
                error-message="Champs requis"
                :error="$v.emergency.phone.$error"
                @blur="$v.emergency.phone.$touch"
                @input="$v.emergency.phone.$touch"
              />
              <q-input
                v-model="emergency.relation"
                label="Lien avec le contact d'urgence"
                color="primary"
                class="w-40 q-ma-md"
                filled
                error-message="Champs requis"
                :error="$v.emergency.relation.$error"
                @blur="$v.emergency.relation.$touch"
                @input="$v.emergency.relation.$touch"
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
        <!-- </editor-fold> -->

        <!-- <editor-fold desc="Certificat" defaultstate="collapsed"> -->
        <q-form
          class="q-mt-md"
          @submit="submitCertificat"
        >
          <q-card
            flat
            bordered
          >
            <q-card-section class="text-weight-bold">
              Modifier le certificat médical
            </q-card-section>
            <div
              class="q-ma-md"
              :class="$q.platform.is.mobile ? '' : 'w-40'"
            >
              <firebase-uploader
                ref="certificateUploader"
                label="Certificat médical (image ou PDF, maximum 1Mio)"
                accept="image/*, application/pdf"
                :max-total-size="1048576"
                :auto-upload="false"
                hide-upload-btn
                flat
                bordered
                class="full-width"
                @added="certificateStateChange"
                @removed="certificateStateChange"
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
        <!-- </editor-fold> -->

        <!-- <editor-fold desc="Cerfa" defaultstate="collapsed"> -->
        <q-form
          class="q-mt-md"
          @submit="submitCerfa"
        >
          <q-card
            flat
            bordered
          >
            <q-card-section class="text-weight-bold">
              Modifier le cerfa
            </q-card-section>
            <div
              class="q-ma-md"
              :class="$q.platform.is.mobile ? '' : 'w-40'"
            >
              <firebase-uploader
                ref="cerfaUploader"
                label="Attestation de cerfa (image ou PDF, maximum 1Mio)"
                accept="image/*, application/pdf"
                :max-total-size="1048576"
                :auto-upload="false"
                hide-upload-btn
                flat
                bordered
                class="full-width"
                @added="cerfaStateChange"
                @removed="cerfaStateChange"
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
        <!-- </editor-fold> -->

        <!-- <editor-fold desc="Photo de profile" defaultstate="collapsed"> -->
        <q-form
          class="q-mt-md"
          @submit="submitProfilPic"
        >
          <q-card
            flat
            bordered
          >
            <q-card-section class="text-weight-bold">
              Modifier la photo de profil
            </q-card-section>

            <div
              class="q-ma-md"
              :class="$q.platform.is.mobile ? '' : 'w-40'"
            >
              <firebase-uploader
                ref="photoUploader"
                label="Photo d'identité (image, maximum 1Mio)"
                accept="image/*"
                :max-total-size="1048576"
                :auto-upload="false"
                hide-upload-btn
                flat
                bordered
                class="full-width"
                @added="picStateChange"
                @removed="picStateChange"
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
        <!-- </editor-fold> -->
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
import { Notify, QSpinnerPie } from 'quasar';
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import { length } from '../../../js/vuelidate-custom-validators';
import FirebaseUploader from '../../../components/utils/FirebaseUploader';

export default {
  name: 'ProfilUpdatePage',
  components: { FirebaseUploader },
  mixins: [validationMixin],

  data: () => ({
    user: null,
    email: '',
    address: {
      street: '',
      zip: 'null',
      city: ''
    },
    emergency: {},
    phone: null,
    isProfilPic: false,
    isCertificate: false,
    isCerfa: false
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
    emergency: {
      phone: {
        required,
        length: length(10)
      },
      relation: {
        required
      }
    }
  },

  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser
    })
  },

  mounted() {
    this.user = this.currentUser.subUsers?.find((sub) => sub.uid === this.$route.params.id);
    if (this.user) {
      this.email = this.user.email;
      this.address = { ...this.user.address };
      this.phone = this.user.phone;
      this.emergency = { ...this.user.emergency };
    } else {
      this.$router.push({ name: 'profil' });
    }
  },

  methods: {
    ...mapActions(['changeEmail', 'fetchCurrentUser', 'changeAddress', 'changePhone', 'fetchMembers', 'changeEmergency']),

    // <editor-fold desc="picStateChange" defaultstate="collapsed">
    picStateChange() {
      this.isProfilPic = !this.isProfilPic;
    },
    // </editor-fold>

    // <editor-fold desc="certificateStateChange" defaultstate="collapsed">
    certificateStateChange() {
      this.isCertificate = !this.isCertificate;
    },
    // </editor-fold>

    // <editor-fold desc="cerfaStateChange" defaultstate="collapsed">
    cerfaStateChange() {
      this.isCerfa = !this.isCerfa;
    },
    // </editor-fold>

    // <editor-fold desc="submitMail" defaultstate="collapsed">
    async submitMail() {
      this.$v.email.$touch();
      if (!this.$v.email.$invalid) {
        await this.changeEmail({ newEmail: this.email, parentUid: this.user.parentUid, uid: this.user.uid });
        await this.fetchCurrentUser();
        Notify.create({
          message: 'L\'email a été changé avec succès',
          color: 'positive',
          position: 'top'
        });
        this.$router.push({ name: 'profil' });
      }
    },
    // </editor-fold>

    // <editor-fold desc="submitAddress" defaultstate="collapsed">
    async submitAddress() {
      this.$v.address.$touch();

      if (!this.$v.address.$invalid) {
        await this.changeAddress({
          uid: this.user.uid,
          parentUid: this.user.parentUid,
          newAddress: this.address
        });
        await this.fetchCurrentUser();
        Notify.create({
          message: 'L\'adresse a été changé avec succès',
          color: 'positive',
          position: 'top'
        });
        this.$router.push({ name: 'profil' });
      }
    },
    // </editor-fold>

    // <editor-fold desc="submitPhone" defaultstate="collapsed">
    async submitPhone() {
      this.$v.phone.$touch();
      this.$v.emergency.phone.$touch();
      this.$v.emergency.relation.$touch();

      if (!(this.$v.phone.$invalid || this.$v.emergency.phone.$invalid || this.$v.emergency.relation.$invalid)) {
        await this.changePhone({
          uid: this.user.uid,
          parentUid: this.user.parentUid,
          newPhone: this.phone
        });
        Notify.create({
          message: 'Les numéro ont été changé avec succès',
          color: 'positive',
          position: 'top'
        });
        await this.changeEmergency({
          uid: this.user.uid,
          parentUid: this.user.parentUid,
          newEmergency: this.emergency
        });
        await this.fetchCurrentUser();
        Notify.create({
          message: 'Le contact d\'urgence a été changé avec succès',
          color: 'positive',
          position: 'top'
        });
        this.$router.push({ name: 'profil' });
      }
    },
    // </editor-fold>

    // <editor-fold desc="submitCertificat" defaultstate="collapsed">
    async submitCertificat() {
      if (this.isCertificate) {
        this.$q.loading.show({
          spinnerColor: 'primary',
          spinner: QSpinnerPie,
          message: 'Upload du certificat'
        });
        this.$refs.certificateUploader.extra.filename = this.user.uid;
        this.$refs.certificateUploader.extra.path = `certificates/${this.currentUser.uid}`;

        await this.$refs.certificateUploader.upload()
          .catch((err) => {
            this.$q.loading.hide();
            this.fetchCurrentUser();
            this.$router.push({ name: 'profil' });
            Notify.create({
              message: `Une erreur s'est produite: ${err}`,
              color: 'negative',
              position: 'bottom'
            });
          });

        await this.fetchCurrentUser();
        this.$q.loading.hide();
        this.$router.push({ name: 'profil' });
      }
    },
    // </editor-fold>

    // <editor-fold desc="submitCerfa" defaultstate="collapsed">
    async submitCerfa() {
      if (this.isCerfa) {
        this.$q.loading.show({
          spinnerColor: 'primary',
          spinner: QSpinnerPie,
          message: 'Upload du cerfa'
        });
        this.$refs.cerfaUploader.extra.filename = this.user.uid;
        this.$refs.cerfaUploader.extra.path = `cerfa/${this.currentUser.uid}`;

        await this.$refs.cerfaUploader.upload()
          .catch((err) => {
            this.$q.loading.hide();
            this.fetchCurrentUser();
            this.$router.push({ name: 'profil' });
            Notify.create({
              message: `Une erreur s'est produite: ${err}`,
              color: 'negative',
              position: 'bottom'
            });
          });

        await this.fetchCurrentUser();
        this.$q.loading.hide();
        this.$router.push({ name: 'profil' });
      }
    },
    // </editor-fold>

    // <editor-fold desc="submitProfilPic" defaultstate="collapsed">
    async submitProfilPic() {
      if (this.isProfilPic) {
        this.$q.loading.show({
          spinnerColor: 'primary',
          spinner: QSpinnerPie,
          message: 'Upload de l\'image'
        });
        this.$refs.photoUploader.extra.filename = this.user.uid;
        this.$refs.photoUploader.extra.path = `profile_pics/${this.currentUser.uid}`;

        await this.$refs.photoUploader.upload().catch((err) => {
          this.$q.loading.hide();
          this.fetchCurrentUser();
          this.$router.push({ name: 'profil' });
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'bottom'
          });
        });
        await this.fetchCurrentUser();
        this.$q.loading.hide();
        this.$router.push({ name: 'profil' });
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
.w-40 {
  width: 40%;
}
.w-90 {
  width: 90%;
}
</style>
