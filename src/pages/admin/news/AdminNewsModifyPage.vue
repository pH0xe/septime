<template>
  <q-page class="page-padded">
    <page-title title="Modification de la news" />
    <q-card flat>
      <q-card-section>
        <section-title text="Titre" />
        <q-card-section class="q-pt-none">
          <q-input
            v-model="newTitle"
            filled
            label="Nom de l'actualité"
            error-message="Champ requis"
            color="admin-primary"
            :error="$v.newTitle.$error"
            @input="$v.newTitle.$touch"
            @blur="$v.newTitle.$touch"
          />
        </q-card-section>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <section-title text="Type de l'actualité" />
        <q-card-section class="q-pt-none">
          <q-select
            v-model="newsTypeSelect"
            filled
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
        </q-card-section>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <section-title text="Contenu" />
        <q-card-section class="q-pt-none fa-border-all">
          <q-editor
            v-model="newText"
            error-message="Champ requis"
            toolbar-toggle-color="admin-primary"
            :error="$v.newText.$error"
            :toolbar="wysiwyg"
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
            @input="$v.newText.$touch"
            @blur="$v.newText.$touch"
          />
        </q-card-section>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <section-title text="Ajouter une image" />
        <q-card-section class="q-pt-none row items-start">
          <firebase-uploader
            ref="newsUploader"
            class="col-12 col-md-5 q-mr-lg"
            color="admin-primary"
            path="news/public_temp"
            accept="image/*"
            :max-total-size="1048576"
            :auto-upload="false"
            hide-upload-btn
            flat
            bordered
            @added="picUploader"
            @removed="picUploader"
          />
        </q-card-section>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          color="negative"
          outline
          label="Retour"
          @click="onCancelClick"
        />
        <q-btn
          color="admin-primary"
          flat
          label="Modifier"
          @click="modifyNews"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { mapState, mapActions } from 'vuex';
import { Notify } from 'quasar';
import { NewsType } from '../../../js/newsType';
import FirebaseUploader from '../../../components/utils/FirebaseUploader';
import PageTitle from '../../../components/utils/PageTitle';
import SectionTitle from '../../../components/utils/sectionTitle';

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
  }
];

export default {
  name: 'AdminNewsModifyPage',
  components: { SectionTitle, PageTitle, FirebaseUploader },
  mixins: [validationMixin],

  data: () => ({
    newTitle: '',
    newText: '',
    newsTypeSelect: '',
    isPic: false
  }),

  computed: {
    ...mapState({
      news: (state) => state.news.allNews
    }),

    newsType() {
      return newsType;
    },

    wysiwyg() {
      return [
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
      ];
    }
  },

  async beforeMount() {
    await this.fetchNews();
    const currentNew = this.news.find((item) => item.uid === this.$route.params.id);
    if (currentNew.text) {
      this.newText = currentNew.text;
    } else {
      this.newText = '';
    }
    if (currentNew.title) {
      this.newTitle = currentNew.title;
    } else {
      this.newTitle = '';
    }
    if (currentNew.type) {
      this.newsTypeSelect = currentNew.type;
    } else {
      this.newsTypeSelect = '';
    }
  },

  methods: {
    ...mapActions(['fetchNews', 'updateNews', 'updateNewsImage']),

    modifyNews() {
      this.$v.$touch();
      if (!this.$v.$error) {
        const currentNew = this.news.find((item) => item.uid === this.$route.params.id);

        this.$q.loading.show({ message: 'Modification de la news en cours...' });
        this.updateNews({
          news: currentNew,
          newTitle: this.newTitle,
          newText: this.newText,
          newType: this.newsTypeSelect
        })
          .then(() => {
            if (this.isPic) {
              this.$q.loading.show({ message: 'Upload de l\'image' });
              this.updateNewsImage({ news: currentNew });
              this.$refs.newsUploader.extra.filename = currentNew.uid;

              return this.$refs.newsUploader.upload().catch((err) => {
                Notify.create({
                  message: `Une erreur s'est produite: ${err}`,
                  color: 'negative',
                  position: 'bottom'
                });
              });
            }
            return null;
          })
          .then(() => {
            this.$q.loading.hide();
            this.$router.replace({ name: 'admin_news' });
          });
      }
    },

    picUploader() {
      this.isPic = !this.isPic;
    },

    onCancelClick() {
      this.$router.push({ name: 'admin_news' });
    }
  },

  validations: {
    newTitle: {
      required
    },
    newText: {
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
