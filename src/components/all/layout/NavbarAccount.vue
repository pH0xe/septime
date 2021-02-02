<template lang="html">
  <q-btn-group
    v-if="!isLoggedIn && !connecting"
    unelevated
  >
    <q-btn
      unelevated
      icon="mdi-login-variant"
      :label="mobile ? undefined : 'Connexion'"
      color="white"
      text-color="primary"
      @click="onClickLogin"
    />

    <q-separator
      vertical
      color="primary"
    />

    <q-btn
      unelevated
      icon="mdi-account-plus"
      :label="mobile ? undefined : 'Inscription'"
      color="white"
      text-color="primary"
      :disable="!registerOpen"
      @click="onClickRegister"
    />

    <q-separator
      vertical
      color="primary"
    />

    <q-btn
      unelevated
      icon="mdi-information-outline"
      text-color="primary"
      color="white"
      :to="{name: 'contact_club'}"
    />
  </q-btn-group>

  <q-btn
    v-else-if="!isLoggedIn"
    unelevated
    color="white"
    text-color="primary"
  >
    <q-spinner v-if="mobile" />
    <template v-else>
      <q-spinner class="on-left" />
      Connexion...
    </template>
  </q-btn>

  <q-btn-dropdown
    v-else
    flat
    unelevated
    :ripple="false"
  >
    <template v-slot:label>
      <q-avatar>
        <q-icon
          v-if="!currentUser.photoURL"
          name="mdi-account-circle"
        />
        <!--suppress HtmlUnknownTarget -->
        <img
          v-else
          class="image-cover"
          :src="currentUser.photoURL"
          alt="Photo de profil"
        >
      </q-avatar>
    </template>

    <q-list
      v-if="isLoggedIn"
      separator
    >
      <q-item
        v-close-popup
        v-ripple
        clickable
        :to="{name: 'profil'}"
        exact
      >
        <q-item-section avatar>
          <q-avatar
            icon="mdi-account-circle"
            color="primary"
            text-color="white"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ currentUser.email }}
          </q-item-label>
          <q-item-label caption>
            Cliquez pour accéder aux profils
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        v-close-popup
        v-ripple
        clickable
        :to="{name: 'addAdherent'}"
        exact
      >
        <q-item-section avatar>
          <q-avatar
            icon="mdi-plus"
            color="primary"
            text-color="white"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            Nouveau profil
          </q-item-label>
          <q-item-label caption>
            Cliquez pour ajouter un adhérent
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        v-if="currentUser.isAdmin"
        v-close-popup
        clickable
        :to="{ name: 'admin_members_list' }"
      >
        <q-item-section avatar>
          <q-avatar
            icon="mdi-cog"
            color="warning"
            text-color="white"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            Administration
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        v-ripple
        v-close-popup
        clickable
        @click="onClickLogout"
      >
        <q-item-section avatar>
          <q-avatar
            icon="mdi-logout-variant"
            text-color="negative"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            Deconnexion
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        v-ripple
        clickable
        @click="toggleDarkTheme"
      >
        <q-item-section avatar>
          <q-icon :name="getIcon" />
        </q-item-section>
        <q-item-section>
          Mode sombre
        </q-item-section>
      </q-item>

      <q-item
        v-ripple
        v-close-popup
        clickable
        :to="{name: 'contact_club'}"
      >
        <q-item-section avatar>
          <q-avatar
            icon="mdi-information-outline"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            À propos
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script lang="js">
import { mapState, mapGetters, mapActions } from 'vuex';
import { Notify, QSpinnerPie } from 'quasar';
import LoginDialog from '../login/LoginDialog';
import RegisterDialog from '../login/RegisterDialog';
import { Utils } from '../../../js/Utils';

export default {
  name: 'NavbarAccount',

  props: {
    mobile: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data: () => ({
    connecting: false
  }),

  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser
    }),

    ...mapGetters(['isLoggedIn', 'isRegisterOpen', 'isLastVersion']),

    registerOpen() {
      return this.isRegisterOpen;
    },

    getIcon() {
      return this.$q.dark.isActive ? 'mdi-weather-night' : 'mdi-white-balance-sunny';
    }
  },

  watch: {
    $route(to, _from) {
      if (to.name === 'home' && to.query.login && !this.$store.getters.isLoggedIn) {
        this.onClickLogin();
      }
    }
  },

  mounted() {
    this.fetchSettings();
    if (this.$route.name === 'home' && this.$route.query.login && !this.$store.getters.isLoggedIn) {
      this.onClickLogin();
    }
  },

  methods: {
    ...mapActions(['fetchSettings']),

    onClickRegister() {
      this.$q.dialog({
        component: RegisterDialog,
        parent: this
      }).onOk(({ email, password }) => {
        this.$q.loading.show({
          message: 'Création du compte ...',
          spinner: QSpinnerPie,
          spinnerColor: 'primary'
        });
        this.$store.dispatch('signup', { email, password })
          .then(() => {
            this.$q.notify({
              message: 'Création du compte réussie !',
              icon: 'mdi-check'
            });
            this.$q.loading.hide();
          })
          .catch((err) => {
            switch (err.code) {
              // Authentication errors
              case 'auth/email-already-in-use':
              case 'auth/invalid-email':
                Notify.create({
                  message: 'Cet email n\'est pas valide',
                  color: 'negative',
                  icon: 'mdi-alert'
                });
                break;
              case 'auth/weak-password':
                Notify.create({
                  message: 'Mot de passe trop faible',
                  color: 'negative',
                  icon: 'mdi-alert'
                });
                break;

              // Storage errors
              case 'storage/quota-exceeded':
                Notify.create({
                  message: 'Quota expiré. Veuillez contacter un administrateur !',
                  color: 'negative',
                  icon: 'mdi-alert'
                });
                break;
              case 'storage/unauthenticated':
              case 'storage/unauthorized':
                Notify.create({
                  message: 'Upload non autorisée. Veuillez contacter un administrteur !',
                  color: 'negative',
                  icon: 'mdi-alert'
                });
                break;
              case 'storage/retry-limit-exceeded':
                Notify.create({
                  message: 'Limite d\'upload dépassée, veuillez réessayer plus tard.',
                  color: 'negative',
                  icon: 'mdi-alert'
                });
                break;
              case 'storage/invalid-checksum':
              case 'storage/canceled':
              case 'storage/invalid-event-name':
              case 'storage/server-file-wrong-size':
                Notify.create({
                  message: 'Une erreur technique est survenue. Veuillez réessayez.',
                  color: 'negative',
                  icon: 'mdi-alert'
                });
                break;

              // Unknown errors
              default:
                console.error(err);
                Notify.create({
                  message: `Une erreur inconnue est survenue: ${err.code}`,
                  color: 'negative',
                  icon: 'mdi-alert'
                });
                this.$router.replace({ name: 'home' });
            }

            this.$q.loading.hide();
          });
      });
    },

    onClickLogin() {
      this.$q.dialog({
        component: LoginDialog,
        parent: this
      }).onOk(({ email, password }) => {
        this.connecting = true;
        this.$store.dispatch('login', { email, password })
          .then(() => {
            this.connecting = false;
            this.$q.notify({
              message: 'Connexion réussie !',
              icon: 'mdi-check'
            });
          })
          .catch((err) => {
            this.connecting = false;

            if (err.code === 'auth/invalid-email'
                || err.code === 'auth/wrong-password'
                || err.code === 'auth/user-not-found') {
              this.$q.notify({
                message: 'Email ou mot de passe incorrect !',
                icon: 'mdi-alert',
                color: 'negative'
              });
            } else {
              console.error(err);
              this.$q.notify({
                message: 'Connexion échouée, veuillez vérifier vos identifiants !',
                icon: 'mdi-alert',
                color: 'negative'
              });
            }
          });
      });
    },

    onClickLogout() {
      this.$router.replace({ name: 'home' });
      this.$store.dispatch('logout')
        .then(() => {
          this.$q.notify({
            message: 'Vous avez été déconnectez avec succès !',
            icon: 'mdi-check'
          });
        })
        .catch((err) => {
          console.error(err);
          this.$q.notify({
            message: 'Une erreur est survenue lors de la déconnexion !',
            icon: 'mdi-alert'
          });
        });
    },

    toggleDarkTheme() {
      Utils.toggleDarkTheme(this);
    }
  }
};
</script>

<style lang="scss" >
.image-cover {
  object-fit: cover;
}
</style>
