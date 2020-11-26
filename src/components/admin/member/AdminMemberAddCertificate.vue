<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin q-pa-md">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
      >
        <q-card-section>
          <firebase-uploader
            ref="certificateUploader"
            color="admin-primary"
            label="Certificat médical (image ou PDF; maximum 1Mio)"
            accept="image/*, application/pdf"
            :max-total-size="1048576"
            :auto-upload="false"
            hide-upload-btn
            flat
            bordered
            @added="certificateChange"
            @removed="certificateChange"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            label="Valider"
            type="submit"
            color="admin-primary"
          />
          <q-btn
            label="Annuler"
            type="reset"
            color="admin-primary"
            flat
            class="q-ml-sm"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import FirebaseUploader from '../../utils/FirebaseUploader';

export default {
  name: 'AdminMemberAddCertificate',
  components: { FirebaseUploader },
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    isCertificate: false
  }),

  methods: {
    // <editor-fold desc="Dialog Utils" defaultstate="collapsed">
    show() {
      this.$refs.dialog.show();
    },

    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      this.$emit('hide');
    },

    onOKClick() {
      this.$emit('ok');
      this.hide();
    },

    onCancelClick() {
      this.hide();
    },

    onReset() {
      this.hide();
    },
    // </editor-fold>

    // <editor-fold desc="onSubmit" defaultstate="collapsed">
    async onSubmit() {
      if (this.isCertificate) {
        this.$q.loading.show({
          message: 'Upload du certificat'
        });
        this.$refs.certificateUploader.extra.filename = this.user.uid;
        this.$refs.certificateUploader.extra.path = `certificates/${this.user.parentUid}`;
        await this.$refs.certificateUploader.upload()
          .catch(() => {
            console.error('Certificate not uploaded');
          });
        this.$q.loading.hide();
        this.onOKClick();
      }
    },
    // </editor-fold>

    // <editor-fold desc="certificateChange" defaultstate="collapsed">
    certificateChange() {
      this.isCertificate = !this.isCertificate;
    }
    // </editor-fold>
  }
};
</script>


<style scoped>

</style>
