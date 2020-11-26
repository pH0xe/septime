<script lang="js">
import { QUploaderBase } from 'quasar';
import uuid from 'uuid/v1';
import { storage } from '../../boot/firebase';

export default {
  name: 'FirebaseUploader',
  mixins: [QUploaderBase],

  props: {
    path: {
      type: String,
      required: false,
      default: ''
    },
    filename: {
      type: String,
      required: false,
      default: () => uuid()
    }
  },

  data: () => ({
    uploadTask: null,
    extra: {}
  }),

  computed: {
    isUploading() {
      return !!this.uploadTask;
    },

    isBusy() {
      return false;
    }
  },

  methods: {
    computeFilename() {
      const path = this.extra?.path || this.path;
      const filename = this.extra?.filename || this.filename;

      return `${path}/${filename}`;
    },

    abort() {
      if (this.uploadTask) {
        this.uploadTask.cancel();
        this.uploadTask = null;
      }
    },

    upload() {
      return new Promise((resolve, reject) => {
        if (!this.files.length) {
          reject(Error('no-file'));
          return;
        }

        const file = this.files[0];
        const ref = storage.ref()
          .child(this.computeFilename());

        this.uploadTask = ref.put(file);

        this.uploadTask.on('state_changed', (snapshot) => {
          this.uploadSize = snapshot.totalBytes;
          this.uploadedSize = snapshot.bytesTransferred;
        }, (error) => {
          this.$emit('failed', error);
          reject(error);
        }, () => {
          this.$emit('finished');
          resolve(this.uploadTask.snapshot.ref);
        });
      });
    }
  }
};
</script>
