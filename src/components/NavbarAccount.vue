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
      :to="{ name: 'register' }"
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
      >
        <q-item-section avatar>
          <q-avatar v-if="currentUser.photoURL">
            <!--suppress HtmlUnknownTarget -->
            <img
              :src="currentUser.photoURL"
              alt="Photo de profil"
            >
          </q-avatar>
          <q-avatar
            v-else
            icon="mdi-account-circle"
            color="primary"
            text-color="white"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ currentUser.displayName }}
            <q-badge :label="currentUser.group" />
          </q-item-label>
          <q-item-label caption>
            Cliquez pour accéder au profil
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        v-if="currentUser.isAdmin"
        v-close-popup
        clickable
        :to="{ name: 'admin_members' }"
      >
        <q-item-section avatar>
          <q-avatar
            icon="mdi-settings"
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
    </q-list>
  </q-btn-dropdown>
</template>

<script lang="js">
import { mapState, mapGetters } from 'vuex';
import LoginDialog from './LoginDialog';

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
    ...mapGetters(['isLoggedIn'])
  },

  watch: {
    $route(to, _from) {
      if (to.name === 'home' && to.query.login && !this.$store.getters.isLoggedIn) {
        this.onClickLogin();
      }
    }
  },

  mounted() {
    if (this.$route.name === 'home' && this.$route.query.login && !this.$store.getters.isLoggedIn) {
      this.onClickLogin();
    }
  },

  methods: {
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
    }
  }
};
</script>
