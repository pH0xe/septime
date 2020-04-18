<template>
  <div>
    <q-dialog
      ref="dialog"
      full-width
      :maximized="$q.platform.is.mobile"
      @hide="hide"
    >
      <q-card>
        <form
          @submit.prevent="onClickOk"
        >
          <q-bar
            v-if="$q.platform.is.mobile"
            class="bg-admin-primary"
          >
            <q-space />
            <q-btn
              v-close-popup
              dense
              flat
              icon="mdi-close"
              color="white"
            />
          </q-bar>

          <h5 class="text-h5 q-mb-xs q-mt-md q-ml-md">
            Ajout d'un adhérent
          </h5>
          <q-card-section>
            <q-separator />
            <q-item-label header>
              Renseignements personnels
            </q-item-label>
            <div class="row">
              <q-item class="col-12 col-md-4">
                <q-input
                  v-model="lastName"
                  filled
                  label="Nom"
                  class="full-width"
                  error-message="Merci de renseigner un nom"
                  color="admin-primary"
                  required
                  :error="$v.lastName.$error"
                  @input="$v.lastName.$touch"
                  @blur="$v.lastName.$touch"
                />
              </q-item>
              <q-item class="col-12 col-md-4">
                <q-input
                  v-model="firstName"
                  label="Prénom"
                  filled
                  class="full-width"
                  error-message="Merci de renseigner un prénom"
                  color="admin-primary"
                  required
                  :error="$v.firstName.$error"
                  @input="$v.firstName.$touch"
                  @blur="$v.firstName.$touch"
                />
              </q-item>
              <q-item class="col-12 col-md-4">
                <date-selector
                  v-model="birthDate"
                  error-message="Merci de saisir votre date de naissance"
                  label="Date de naissance"
                  required
                  :error="$v.birthDate.$error"
                />
              </q-item>
            </div>
            <q-item-label>
              Latéralité
            </q-item-label>
            <q-item>
              <q-radio
                v-model="laterality"
                :val="Laterality.LEFT"
                label="Gauche"
                color="admin-primary"
              />
              <q-radio
                v-model="laterality"
                :val="Laterality.RIGHT"
                label="Droite"
                color="admin-primary"
              />
            </q-item>
            <q-separator />
            <q-item-label>
              Genre
            </q-item-label>
            <q-item>
              <q-radio
                v-model="gender"
                :val="Gender.MALE"
                label="Homme"
                color="admin-primary"
              />
              <q-radio
                v-model="gender"
                :val="Gender.FEMALE"
                label="Femme"
                color="admin-primary"
              />
            </q-item>
            <q-separator />

            <q-item-label header>
              Coordonnées
            </q-item-label>
            <div class="row">
              <q-item class="col-12 col-md-4">
                <q-input
                  v-model="address.street"
                  label="Adresse"
                  filled
                  color="admin-primary"
                  class="full-width"
                  error-message="Merci de renseigner l'adresse"
                  required
                  :error="$v.address.street.$error"
                  @input="$v.address.street.$touch"
                  @blur="$v.address.street.$touch"
                />
              </q-item>
              <q-item class="col-12 col-md-4">
                <q-input
                  v-model="address.city"
                  label="Ville"
                  filled
                  color="admin-primary"
                  class="full-width"
                  error-message="Merci de renseigner la ville"
                  required
                  :error="$v.address.city.$error"
                  @input="$v.address.city.$touch"
                  @blur="$v.address.city.$touch"
                />
              </q-item>
              <q-item class="col-12 col-md-4">
                <q-input
                  v-model="address.zip"
                  label="Code postal"
                  filled
                  color="admin-primary"
                  class="full-width"
                  mask="#####"
                  required
                  :error="$v.address.zip.$error"
                  @input="$v.address.zip.$touch"
                  @blur="$v.address.zip.$touch"
                />
              </q-item>
              <q-item class="col-12 col-md-4">
                <q-input
                  v-model="email"
                  label="E-mail"
                  filled
                  color="admin-primary"
                  class="full-width"
                  error-message="Merci de saisir une adresse mail valide"
                  required
                  :error="$v.email.$error"
                  @input="$v.email.$touch"
                  @blur="$v.email.$touch"
                />
              </q-item>
              <q-item class="col-12 col-md-4">
                <q-input
                  v-model="phone"
                  label="Numéro de téléphone"
                  filled
                  color="admin-primary"
                  class="full-width"
                  mask="## ## ## ## ##"
                  required
                  :error="$v.phone.$error"
                  error-message="Merci de saisir un numéro de téléphone valide"
                  @input="$v.phone.$touch"
                  @blur="$v.phone.$touch"
                />
              </q-item>
              <q-item class="col-12 col-md-4">
                <q-input
                  v-model="phoneEmergency"
                  label="Numéro de téléphone d'urgence"
                  filled
                  color="admin-primary"
                  class="full-width"
                  mask="## ## ## ## ##"
                  :error="$v.phoneEmergency.$error"
                  error-message="Merci de saisir un numéro de téléphone valide"
                  required
                  @input="$v.phoneEmergency.$touch"
                  @blur="$v.phoneEmergency.$touch"
                />
              </q-item>
              <q-separator />
              <q-item-label header>
                Informations suplémentaires
              </q-item-label>
              <q-item>
                <q-checkbox
                  v-model="payments.competition"
                  label="Pass compétition"
                  color="positive"
                />
              </q-item>
              <q-item>
                <q-checkbox
                  v-model="payments.assurance"
                  label="Assurance+ souscrite"
                  color="positive"
                />
              </q-item>
              <q-item>
                <q-checkbox
                  v-model="payments.deposit"
                  label="Loue une tenus"
                  color="positive"
                />
              </q-item>
            </div>
            <q-separator />
            <q-item-label header>
              Informations de payement
            </q-item-label>
            <div class="row">
              <q-item>
                <q-checkbox
                  v-model="payments.paid"
                  label="Chéque de cotisation fournis"
                  color="positive"
                  class="col-md-auto"
                />
              </q-item>
              <q-input
                v-model="payments.amount"
                type="number"
                label="Montant"
                :disable="!payments.paid"
                color="admin-primary"
                class="col-12 col-md-6 q-ma-md"
              />
            </div>
            <q-separator />
            <q-item-label header>
              Armes :
            </q-item-label>
            <q-option-group
              v-model="weapons"
              :options="weaponsOptions"
              color="admin-primary"
              type="checkbox"
              inline
            />
            <q-separator />
            <q-item-label header>
              Information médical
            </q-item-label>
            <div class="row">
              <q-item>
                <firebase-uploader
                  ref="certificateUploader"
                  path="certificates/public_temp"
                  color="admin-primary"
                  label="Certificat médical (image ou PDF; maximum 1Mio)"
                  accept="image/*, application/pdf"
                  :max-total-size="1048576"
                  :auto-upload="false"
                  hide-upload-btn
                  flat
                  bordered
                />
              </q-item>
              <div>
                <q-item class="col-12 col-md-4">
                  <date-selector
                    v-model="certificateDate"
                    error-message="Merci de saisir la date d'édition du certificat"
                    label="Date d'édition du certificat"
                  />
                </q-item>
                <q-checkbox
                  v-model="cerfa"
                  label="Cerfa fournis"
                  color="admin-primary"
                />
              </div>
            </div>
            <q-item>
              <!--TODO je sais pas si sa marche comme ca-->
              <firebase-uploader
                ref="profileUploader"
                path="profile_pics/public_temp"
                color="admin-primary"
                label="Photo de profil (image, maximum 1Mio)"
                accept="image/*"
                :max-total-size="1048576"
                :auto-upload="false"
                hide-upload-btn
                flat
                bordered
              />
            </q-item>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              label="Créer le compte"
              icon="mdi-check"
              type="submit"
              unelevated
              color="admin-primary"
            />
            <q-btn
              v-close-popup
              label="Annuler"
              flat
            />
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { email, integer, required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import DateSelector from './DateSelector';
import FirebaseUploader from './FirebaseUploader';
import { Laterality } from '../js/Laterality';
import { Weapons } from '../js/Weapons';
import { Gender } from '../js/Gender';
import { adminCreateMember } from '../boot/firebase';
import { length } from '../js/vuelidate-custom-validators';


export default {
  name: 'AdminMemberNew',
  components: {
    FirebaseUploader,
    DateSelector
  },
  mixins: [validationMixin],

  data: () => ({
    weapons: [],
    firstName: '',
    lastName: '',
    birthDate: null,
    address: {
      street: '',
      city: '',
      zip: null
    },
    email: '',
    phone: '',
    phoneEmergency: '',
    laterality: Laterality.RIGHT,
    certificateDate: null,
    cerfa: false,
    gender: Gender.FEMALE,
    payments: {
      competition: false,
      assurance: false,
      paid: false,
      deposit: false,
      amount: 0
    }
  }),

  validations: {
    lastName: { required },
    firstName: { required },
    birthDate: { required },
    address: {
      street: { required },
      city: { required },
      zip: {
        required,
        length: length(5),
        integer
      }
    },
    phone: {
      required,
      length: length(14)
    },
    phoneEmergency: {
      required,
      length: length(14)
    },
    email: { required, email },
    certificateDate: { required }
  },

  computed: {
    Laterality() {
      return Laterality;
    },
    weaponsOptions() {
      return [
        {
          label: 'Fleuret',
          value: Weapons.FOIL
        },
        {
          label: 'Epée',
          value: Weapons.EPEE
        },
        {
          label: 'Sabre',
          value: Weapons.SABRE
        }
      ];
    },
    Gender() {
      return Gender;
    }
  },

  methods: {
    show() {
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialog.hide();
    },
    onClickOk() {
      this.$v.$touch();

      if (!this.$v.$error) {
        const userData = {
          address: { ...this.address },
          birthDate: this.birthDate.toJSON(),
          cerfa: this.cerfa,
          email: this.email,
          // password: Let the backend generate the password
          phoneEmergency: this.phoneEmergency,
          firstName: this.firstName,
          lastName: this.lastName,
          gender: this.gender,
          payments: { ...this.payments },
          phone: this.phone,
          weapons: [...this.weapons],
          certificateDate: this.certificateDate.toJSON(),
          laterality: this.laterality
        };

        console.log(userData);

        this.$q.loading.show({
          message: 'Création du compte...'
        });

        adminCreateMember({ ...userData })
          .then(({ data: responseData }) => {
            if (responseData.error) {
              throw responseData;
            }

            const { uid } = responseData;

            this.$q.loading.show({
              message: 'Upload du certificat médical...'
            });
            this.$refs.certificateUploader.extra.filename = uid;
            this.$refs.profileUploader.extra.filename = uid;

            return this.$refs.certificateUploader.upload().catch(() => {
              console.error('Certificate not uploaded');
            });
          })
          .then(() => {
            this.$q.loading.show({
              message: 'Upload de la photo...'
            });

            return this.$refs.profileUploader.upload()
              .catch(() => {
                console.error('Profil pic not uploaded');
              });
          })
          .then(() => {
            this.$q.notify({
              message: 'Compte créé avec succès',
              icon: 'mdi-check',
              color: 'positive'
            });

            return this.$store.commit('fetchMembers');
          })
          .then(() => {
            this.$q.loading.hide();
            this.hide();
          })
          .catch((err) => {
            console.error(err);
            this.$q.notify({
              message: `Unexpected error: ${err.code}`,
              icon: 'mdi-alert',
              color: 'negative'
            });

            this.$q.loading.hide();
          });
      }
    }
  }
};
</script>

<style scoped>

</style>
