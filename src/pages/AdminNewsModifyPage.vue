<template>
  <q-page class="q-ma-md">
    <h5 class="text-h5 q-my-md">
      Modification de la news
    </h5>
    <q-card flat>
      <q-card-section>
        <div class="full-width text-weight-bold q-mb-md">
          Titre :
        </div>
        <div class="col q-ml-lg">
          <q-input
            v-model="newTitle"
            label="Nom de l'actualitée"
            error-message="Champ requis"
            color="admin-primary"
            :error="$v.newTitle.$error"
            @input="$v.newTitle.$touch"
            @blur="$v.newTitle.$touch"
          />
        </div>
      </q-card-section>

      <q-card-section>
        <div class="full-width text-weight-bold q-mb-md">
          Contenu :
        </div>
        <div class="fa-border-all">
          <q-editor
            v-model="newText"
            error-message="Champ requis"
            toolbar-toggle-color="admin-primary"
            :error="$v.newText.$error"
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
            @input="$v.newText.$touch"
            @blur="$v.newText.$touch"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right">
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


export default {
  name: 'AdminNewsModifyPage',
  mixins: [validationMixin],

  data: () => ({
    newTitle: '',
    newText: ''
  }),

  computed: {
    ...mapState({
      news: (state) => state.news.news
    })
  },

  beforeMount() {
    this.fetchNews();
    const currentNew = this.news.find((item) => item.uid === this.$route.query.uid);
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
  },

  methods: {
    ...mapActions(['fetchNews', 'updateNews']),


    modifyNews() {
      this.$v.$touch();
      if (!this.$v.$error) {
        const currentNew = this.news.find((item) => item.uid === this.$route.query.uid);
        this.updateNews({ news: currentNew, newTitle: this.newTitle, newText: this.newText });
        this.$q.loading.show({ message: 'Modification de la news en cours...' });
        setTimeout(() => {
          this.$q.loading.hide();
          this.$router.replace({ name: 'admin_news' });
        }, 3000);
      }
    }
  },

  validations: {
    newTitle: {
      required
    },
    newText: {
      required
    }
  }
};
</script>

<style scoped>

</style>
