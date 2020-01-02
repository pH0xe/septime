<template>
  <div>
    <q-dialog
      ref="dialog"
      full-width
      :maximized="$q.platform.is.mobile"
      @hide="onClickOk"
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
                <admin-member-new-date
                  v-model="birth"
                  error-message="Merci de saisir votre date de naissance"
                  label="Date de naissance"
                  required
                  :error="$v.birth.$error"
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

            <q-item-label header>
              Coordonnées
            </q-item-label>
            <div class="row">
              <q-item class="col-12 col-md-4">
                <q-input
                  v-model="adress.street"
                  label="Adresse"
                  filled
                  color="admin-primary"
                  class="full-width"
                  error-message="Merci de renseigner l'adresse"
                  required
                  :error="$v.adress.street.$error"
                  @input="$v.adress.street.$touch"
                  @blur="$v.adress.street.$touch"
                />
              </q-item>
              <q-item class="col-12 col-md-4">
                <q-input
                  v-model="adress.city"
                  label="Ville"
                  filled
                  color="admin-primary"
                  class="full-width"
                  error-message="Merci de renseigner la ville"
                  required
                  :error="$v.adress.city.$error"
                  @input="$v.adress.city.$touch"
                  @blur="$v.adress.city.$touch"
                />
              </q-item>
              <q-item class="col-12 col-md-4">
                <q-input
                  v-model="adress.zip"
                  label="Code postal"
                  filled
                  color="admin-primary"
                  class="full-width"
                  mask="#####"
                  required
                  :error="$v.adress.zip.$error"
                  @input="$v.adress.zip.$touch"
                  @blur="$v.adress.zip.$touch"
                />
              </q-item>
              <q-item class="col-12 col-md-4">
                <q-input
                  v-model="mail"
                  label="E-mail"
                  filled
                  color="admin-primary"
                  class="full-width"
                  error-message="Merci de saisir une adresse mail valide"
                  required
                  :error="$v.mail.$error"
                  @input="$v.mail.$touch"
                  @blur="$v.mail.$touch"
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
                  v-model="emergencyPhone"
                  label="Numéro de téléphone d'urgence"
                  filled
                  color="admin-primary"
                  class="full-width"
                  mask="## ## ## ## ##"
                  :error="$v.emergencyPhone.$error"
                  error-message="Merci de saisir un numéro de téléphone valide"
                  required
                  @input="$v.emergencyPhone.$touch"
                  @blur="$v.emergencyPhone.$touch"
                />
              </q-item>
              <q-separator />
              <q-item-label header>
                Informations suplémentaires
              </q-item-label>
              <q-item>
                <q-checkbox
                  v-model="competition"
                  label="Pass compétition"
                  color="positive"
                />
              </q-item>
              <q-item>
                <q-checkbox
                  v-model="assurance"
                  label="Assurance+ souscrite"
                  color="positive"
                />
              </q-item>
              <q-item>
                <q-checkbox
                  v-model="paid"
                  label="Chéque de cotisation fournis"
                  color="positive"
                />
              </q-item>
              <q-item>
                <q-checkbox
                  v-model="rent"
                  label="Loue une tenus"
                  color="positive"
                />
              </q-item>
            </div>
            <q-separator />
            <q-item-label header>
              Information médical
            </q-item-label>
            <div class="row">
              <q-item>
                <!--TODO URL-->
                <!-- fichier pdf et taille max du fichier a donnée 1Mo -->
                <q-uploader
                  label="Certificat médical"
                  color="admin-primary"
                  url=""
                  accept="application/pdf"
                  :max-file-size="Math.pow(2,20)"
                  @removed="onCertificateUpdated"
                  @added="onCertificateUpdated"
                />
              </q-item>
              <q-item>
                <!--TODO URL-->
                <!-- fichier pdf et taille max du fichier a donnée 1mo -->
                <q-uploader
                  label="Cerfa"
                  color="admin-primary"
                  url=""
                  accept="application/pdf"
                  :max-file-size="Math.pow(2,20)"
                  @removed="onCerfaUpdated"
                  @added="onCerfaUpdated"
                />
              </q-item>
            </div>
            <div class="row">
              <q-item class="col-12 col-md-4">
                <admin-member-new-date
                  v-model="certificate"
                  error-message="Merci de saisir la date d'édition du certificat"
                  label="Date d'édition du certificat"
                  required
                  :error="$v.certificate.$error"
                  @input="$v.certificate.$touch"
                  @blur="$v.certificate.$touch"
                />
              </q-item>
            </div>
            <q-item>
              <!--TODO URL-->
              <!-- fichier image et taille max du fichier a donnée 1Mo -->
              <q-uploader
                label="Photo de l'adhérent"
                color="admin-primary"
                url=""
                accept="image/*"
                :max-file-size="Math.pow(2,20)"
              />
            </q-item>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              color="admin-primary"
              flat
              label="Ok"
              type="submit"
            />
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {
  required, requiredIf, requiredUnless, email, minLength, maxLength
} from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import AdminMemberNewDate from './AdminMemberNewDate';
import { Laterality } from '../js/Laterality';

export default {
  name: 'AdminMemberNew',
  components: { AdminMemberNewDate },
  mixins: [validationMixin],
  data: () => ({
    firstName: '',
    lastName: '',
    birth: new Date(),
    adress: {
      street: '',
      city: '',
      zip: 0
    },
    mail: '',
    phone: '',
    emergencyPhone: '',
    laterality: Laterality.LEFT,
    competition: false,
    assurance: false,
    paid: false,
    rent: false,
    certificate: new Date(),
    isMedicalCertificate: false,
    isMedicalCerfa: false
  }),
  computed: {
    Laterality() {
      return Laterality;
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
        // todo ajouter le membre dans la db + vuelidate
        this.hide();
      }
    },
    onCertificateUpdated() {
      this.isMedicalCertificate = !this.isMedicalCertificate;
    },
    onCerfaUpdated() {
      this.isMedicalCerfa = !this.isMedicalCerfa;
    }
  },

  validations: {
    lastName: {
      required
    },
    firstName: {
      required
    },
    birth: {
      required
    },
    adress: {
      street: {
        required
      },
      city: {
        required
      },
      zip: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(5)
      }
    },
    phone: {
      required,
      minLength: minLength(14),
      maxLength: maxLength(14)
    },
    emergencyPhone: {
      required,
      minLength: minLength(14),
      maxLength: maxLength(14)
    },
    mail: {
      required,
      email
    },
    certificate: {
      required: requiredIf('isMedicalCertificate')
    },
    isMedicalCertificate: {
      required: requiredUnless('isMedicalCerfa')
    },
    isMedicalCerfa: {
      required: requiredUnless('isMedicalCertificate')
    }
  }
};
</script>

<style scoped>

</style>
