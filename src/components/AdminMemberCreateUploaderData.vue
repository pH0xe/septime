<template>
  <div>
    <div class="row">
      <div class="col">
        <h5 class="text-h5">
          Autre
        </h5>
        <q-separator class="separator-margin" />
      </div>
    </div>
    <div class="row items-center">
      <firebase-uploader
        ref="certificateUploader"
        class="col-12 col-md-5 q-mr-md q-mb-sm"
        color="admin-primary"
        label="Certificat médical (image ou PDF; maximum 1Mio)"
        accept="image/*, application/pdf"
        :max-total-size="1048576"
        :auto-upload="false"
        hide-upload-btn
        flat
        bordered
        @added="certificate"
        @removed="certificate"
      />
      <date-selector
        ref="date"
        v-model="certificateDate"
        class="col-12 col-md-5 q-mb-sm"
        label="Date d'édition du certificat"
        error-message="Champ requis"
        :error="isCertificate && certificateDate === null"
      />
    </div>
    <div class="row">
      <firebase-uploader
        ref="profileUploader"
        class="col-12 col-md-5 q-mr-md q-mb-sm"
        color="admin-primary"
        label="Photo de profil (image, maximum 1Mio)"
        accept="image/*"
        :max-total-size="1048576"
        :auto-upload="false"
        hide-upload-btn
        flat
        bordered
        @added="pic"
        @removed="pic"
      />

      <firebase-uploader
        ref="cerfaUploader"
        class="col-12 col-md-5 q-mb-sm"
        color="admin-primary"
        label="Cerfa (image ou pdf, maximum 1Mio)"
        accept="image/*, application/pdf"
        :max-total-size="1048576"
        :auto-upload="false"
        hide-upload-btn
        flat
        bordered
        @added="cerfa"
        @removed="cerfa"
      />
    </div>
  </div>
</template>

<script>
import FirebaseUploader from './FirebaseUploader';
import DateSelector from './DateSelector';

export default {
  name: 'AdminMemberCreateUploaderData',
  components: { DateSelector, FirebaseUploader },

  data: () => ({
    isCertificate: false,
    isCerfa: false,
    isProfilPic: false,
    certificateDate: null
  }),

  methods: {
    certificate() {
      this.isCertificate = !this.isCertificate;
    },

    pic() {
      this.isProfilPic = !this.isProfilPic;
    },

    cerfa() {
      this.isCerfa = !this.isCerfa;
    }
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
