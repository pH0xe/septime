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
            ref="uploader"
            path="important"
            color="admin-primary"
            label="Photo (image; maximum 1Mio)"
            accept="image/*"
            :max-total-size="1048576"
            :auto-upload="false"
            hide-upload-btn
            flat
            bordered
            @added="imageChange"
            @removed="imageChange"
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
import { QSpinnerPie } from 'quasar';
import FirebaseUploader from '../../utils/FirebaseUploader';

export default {
  name: 'AdminSettingsAddPict',
  components: { FirebaseUploader },
  props: {
    regarding: {
      type: String,
      required: true
    }
  },

  data: () => ({
    isPict: false
  }),

  methods: {
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

    onSubmit() {
      if (this.isPict) {
        this.$q.loading.show({
          message: 'Upload de la photo',
          spinner: QSpinnerPie,
          spinnerColor: 'admin-primary'
        });
        this.$refs.uploader.extra.filename = this.regarding;
        this.$refs.uploader.upload()
          .then(() => {
            this.$q.loading.hide();
            this.onOKClick();
          })
          .catch(() => {
            console.error('Image not uploaded');
          });
      }
    },

    imageChange() {
      this.isPict = !this.isPict;
    }
  }
};
</script>

<style scoped>

</style>
