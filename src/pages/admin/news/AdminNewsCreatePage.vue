<template>
  <q-page class="page-padded">
    <page-title title="Créer une actualité" />
    <q-card flat>
      <q-card-section>
        <div class="full-width text-weight-bold q-mb-md">
          Titre :
        </div>
        <div class="col q-ml-lg">
          <q-input
            v-model="newsTitle"
            label="Nom de l'actualité"
            error-message="Champ requis"
            color="admin-primary"
            :error="$v.newsTitle.$error"
            @input="$v.newsTitle.$touch"
            @blur="$v.newsTitle.$touch"
          />
        </div>
      </q-card-section>

      <q-select
        v-model="newsTypeSelect"
        class="q-ma-lg"
        :options="newsType"
        map-options
        label="Type"
        color="admin-primary"
        emit-value
        :error="$v.newsTypeSelect.$error"
        error-message="Champ requis"
        @input="$v.newsTypeSelect.$touch"
        @blur="$v.newsTypeSelect.$touch"
      >
        <template v-slot:append>
          <q-icon
            v-if="newsTypeSelect !== ''"
            class="cursor-pointer"
            name="mdi-close"
            @click="newsTypeSelect = ''"
          />
        </template>
      </q-select>

      <q-card-section>
        <div class="full-width text-weight-bold q-mb-md">
          Contenu :
        </div>
        <div class="fa-border-all">
          <q-editor
            v-model="newsText"
            error-message="Champ requis"
            toolbar-toggle-color="admin-primary"
            :error="$v.newsText.$error"
            :toolbar="[
              [
                {
                  label: 'Aligner',
                  icon: this.$q.iconSet.editor.align,
                  fixedLabel: true,
                  list: 'only-icons',
                  options: ['left', 'center', 'right', 'justify']
                }
              ],
              ['bold', 'italic', 'strike', 'underline'],
              ['token', 'hr', 'link', 'custom_btn'],
              [
                {
                  label: 'Titre',
                  icon: this.$q.iconSet.editor.formatting,
                  list: 'no-icons',
                  options: [
                    'p',
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'code'
                  ]
                },
                {
                  label: 'Taille',
                  icon: this.$q.iconSet.editor.fontSize,
                  fixedLabel: true,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'size-1',
                    'size-2',
                    'size-3',
                    'size-4',
                    'size-5',
                    'size-6',
                    'size-7'
                  ]
                },
                {
                  label: 'Polices',
                  icon: this.$q.iconSet.editor.font,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'default_font',
                    'arial',
                    'arial_black',
                    'comic_sans',
                    'courier_new',
                    'impact',
                    'lucida_grande',
                    'times_new_roman',
                    'verdana'
                  ]
                },
                'removeFormat'
              ],
              ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

              ['undo', 'redo']
            ]"
            :fonts="{
              arial: 'Arial',
              arial_black: 'Arial Black',
              comic_sans: 'Comic Sans MS',
              courier_new: 'Courier New',
              impact: 'Impact',
              lucida_grande: 'Lucida Grande',
              times_new_roman: 'Times New Roman',
              verdana: 'Verdana'
            }"
            @input="$v.newsText.$touch"
            @blur="$v.newsText.$touch"
          />
        </div>
      </q-card-section>

      <q-card-section>
        <div class="full-width text-weight-bold q-mb-md">
          Joindre des images ou des fichiers :
        </div>
        <firebase-uploader
          ref="newsUploader"
          color="admin-primary"
          path="news/public_temp"
          :max-total-size="1048576"
          :auto-upload="false"
          hide-upload-btn
          flat
          bordered
          @added="picUploader"
          @removed="picUploader"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          color="admin-primary"
          flat
          label="Publier"
          @click="createThisNews"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { mapState, mapActions } from 'vuex';
import { Notify } from 'quasar';
import FirebaseUploader from '../../../components/utils/FirebaseUploader';
import { NewsType } from '../../../js/newsType';
import PageTitle from '../../../components/utils/PageTitle';

const newsType = [
  {
    label: 'Info Pratique',
    value: NewsType.USEFUL
  },
  {
    label: 'FFE',
    value: NewsType.FFE
  },
  {
    label: 'Actualité',
    value: NewsType.NEWS
  },
  {
    label: 'Boutique',
    value: NewsType.STORE
  }
];

export default {
  name: 'AdminNewsCreatePage',
  components: { PageTitle, FirebaseUploader },
  mixins: [validationMixin],

  data: () => ({
    newsTitle: '',
    newsText: '',
    isPic: false,
    newsTypeSelect: ''
  }),

  computed: {
    ...mapState({
      news: (state) => state.news.news
    }),

    newsType() {
      return newsType;
    }
  },

  methods: {
    ...mapActions(['createNews']),

    async createThisNews() {
      this.$v.$touch();

      if (!this.isPic) {
        this.$q.notify({
          message: 'La photo est obligatoire pour créer une actualité',
          color: 'negative',
          position: 'bottom'
        });
      }

      if (!this.$v.$error && this.isPic) {
        const news = {
          title: this.newsTitle,
          text: this.newsText,
          date: new Date(),
          type: this.newsTypeSelect
        };

        this.$q.loading.show({ message: 'Création de la news en cours...' });

        this.createNews({ news })
          .then((id) => {
            this.$q.loading.show({ message: 'Upload de l\'image' });
            this.$refs.newsUploader.extra.filename = id;

            return this.$refs.newsUploader.upload().catch((err) => {
              Notify.create({
                message: `Une erreur s'est produite: ${err}`,
                color: 'negative',
                position: 'bottom'
              });
            });
          })
          .then(() => {
            this.$q.loading.hide();
            this.$router.replace({ name: 'admin_news' });
          })
          .catch((err) => {
            Notify.create({
              message: `Une erreur s'est produite: ${err}`,
              color: 'negative',
              position: 'bottom'
            });
          });
      }
    },

    picUploader() {
      this.isPic = !this.isPic;
    }
  },

  validations: {
    newsTitle: {
      required
    },
    newsText: {
      required
    },
    newsTypeSelect: {
      required
    }
  },

  meta: {
    title: 'Admin - Actualités'
  }
};
</script>

<style scoped>

</style>
