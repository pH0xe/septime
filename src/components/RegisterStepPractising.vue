<template lang="html">
  <q-form @submit="onSubmit">
    <div class="text-body2 q-my-md">
      Photo récente du nouvel adhérent. (Optionnel)
    </div>

    <firebase-uploader
      ref="photoUploader"
      label="Photo d'identité (image, maximum 1Mio)"
      accept="image/*"
      path="profile_pics"
      :max-total-size="1048576"
      :auto-upload="false"
      hide-upload-btn
      flat
      bordered
      class="full-width"
      @added="picModified"
      @removed="picModified"
    />

    <div class="text-body2 q-my-md">
      <span class="text-bold">Nouveaux inscrits: </span>
      Veuillez consulter un médecin et fournir un certificat médical.
      <br><br>
      <span class="text-bold">Réinscriptions: </span>
      Le certificat médical est valable 3 ans, sauf pour les plus de
      40 ans, à condition de s’auto-évaluer avec le questionnaire CERFA
      <a
        :href="medicalTemplate"
        target="_blank"
      >(Disponible ici)</a>
      .
      Si vous répondez non à toutes les questions, il suffit de nous remettre
      une attestation signée
      <a
        :href="cerfaTemplate"
        target="_blank"
      >(Template disponible ici)</a>
      . Dans le cas contraire, et pour les plus de 40 ans,
      il faut consulter un médecin et fournir un nouveau certificat médical.
      <br><br>
      Certificat médical spécifique à certaines catégories
      (vétérans,surclassement,...) Le club ou le maître d'armes se réserve
      le droit d'interdire l'accès aux pistes si l'adhérent n'a pas fourni
      de certificat médical après les 2 premières séances.
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <!-- Max 1Mio -->
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
          @added="certificateModified"
          @removed="certificateModified"
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          v-model="certificateDate"
          label="Date d'edition du certificat"
          mask="##/##/####"
          hint="JJ/MM/AAAA"
        >
          <template v-slot:prepend>
            <q-icon
              name="mdi-calendar"
              class="cursor-pointer"
            >
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="certificateDate"
                  mask="DD/MM/YYYY"
                  @input="() => $refs.qDateProxy.hide()"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <!-- Max 1Mio -->
        <firebase-uploader
          ref="cerfaUploader"
          label="Attestation cerfa (image ou PDF, maximum 1Mio)"
          accept="image/*, application/pdf"
          :max-total-size="1048576"
          :auto-upload="false"
          hide-upload-btn
          flat
          bordered
          class="full-width"
          @added="cerfaModified"
          @removed="cerfaModified"
        />
      </div>
    </div>

    <div class="text-body2 q-mt-md">
      Veuillez sélectionner votre latéralité : *
    </div>

    <q-radio
      v-model="laterality"
      :val="Laterality.LEFT"
      label="Gaucher"
    />
    <q-radio
      v-model="laterality"
      :val="Laterality.RIGHT"
      label="Droitier"
    />

    <div class="text-body2 q-mt-md">
      Veuillez sélectionner votre arme : *
    </div>
    <q-option-group
      v-model="weaponsChoice"
      :options="weaponsOpt"
      color="primary"
      type="checkbox"
      inline
    />
    <div
      v-if="$v.weaponsChoice.$error"
      class="text-body2 text-negative q-mt-none"
    >
      Veuillez sélectionner au moins une arme
    </div>

    <div class="text-body2 q-mt-md">
      Considérant votre date de naissance vous serez classé en
      <q-badge color="primary">
        {{ group | uppercase }}
      </q-badge>
    </div>

    <q-stepper-navigation>
      <q-btn
        label="Suivant"
        type="submit"
        unelevated
        color="primary"
        class="on-left"
      />
      <q-btn
        label="Précédent"
        flat
        color="primary"
        @click="onGoBack"
      />
    </q-stepper-navigation>
  </q-form>
</template>

<script lang="js">
import { date } from 'quasar';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { isLaterality } from '../js/vuelidate-custom-validators';
import { Laterality } from '../js/Laterality';
import { Group } from '../js/Group';
import FirebaseUploader from './FirebaseUploader';
import { Weapons } from '../js/Weapons';

const weaponsOpt = [
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

export default {
  name: 'RegisterStepPractising',
  components: { FirebaseUploader },
  mixins: [validationMixin],

  props: {
    birthDate: {
      type: Date,
      default: () => new Date()
    },

    medicalTemplate: {
      type: String,
      required: true
    },

    cerfaTemplate: {
      type: String,
      required: true
    }
  },

  data: () => ({
    isCertificate: false,
    isProfilPic: false,
    isCerfa: false,
    certificateDate: null,
    laterality: Laterality.RIGHT,
    weaponsChoice: []
  }),

  validations: {
    laterality: {
      required,
      isLaterality
    },
    weaponsChoice: {
      required
    }
  },

  computed: {
    Laterality() {
      return Laterality;
    },

    certificateDateParsed() {
      return date.extractDate(this.certificateDate, 'DD/MM/YYYY');
    },

    group() {
      return Group.from(this.birthDate);
    },

    weaponsOpt() {
      return weaponsOpt;
    },

    fileAreUploded() {
      return this.isCertificate;
    }
  },

  methods: {
    onGoBack() {
      this.$emit('go-back');
    },

    onJumpBack() {
      this.$emit('goto', 0);
    },

    onSubmit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        const {
          certificateDateParsed: certificateDate, laterality, weaponsChoice, isCertificate, isProfilPic, isCerfa
        } = this;
        this.$emit('submit', {
          certificateDate,
          laterality,
          photoUploader: this.$refs.photoUploader,
          certificateUploader: this.$refs.certificateUploader,
          cerfaUploader: this.$refs.cerfaUploader,
          weaponsChoice,
          isCertificate,
          isProfilPic,
          isCerfa
        });
      }
    },

    certificateModified() {
      this.isCertificate = !this.isCertificate;
    },

    picModified() {
      this.isProfilPic = !this.isProfilPic;
    },

    cerfaModified() {
      this.isCerfa = !this.isCerfa;
    }
  }
};
</script>
