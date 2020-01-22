<template lang="html">
  <q-layout view="hHh LpR lFr">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          <router-link
            tag="div"
            :to="{name: 'home'}"
            class="cursor-pointer"
          >
            <q-avatar>
              <img src="~assets/appLogo.svg">
            </q-avatar>
            CEM
          </router-link>
        </q-toolbar-title>

        <navbar-links v-if="!$q.platform.is.mobile" />

        <navbar-account :mobile="$q.platform.is.mobile" />
      </q-toolbar>

      <q-toolbar
        v-if="$q.platform.is.mobile"
      >
        <navbar-links
          mobile
          class="q-mx-auto"
        />
      </q-toolbar>

      <q-banner
        v-if="canShowBannerMail"
        :inline-actions="!$q.platform.is.mobile"
        class="bg-secondary"
      >
        Votre compte n'est pas vérifié. Vérifiez votre boîte mail pour un lien de vérification.
        <template v-slot:avatar>
          <q-icon name="mdi-email" />
        </template>
        <template v-slot:action>
          <q-btn
            flat
            label="Renvoyer le mail"
            :loading="bannerMail.isResending"
            @click="onClickBannerMailResend"
          />
          <q-btn
            flat
            icon="mdi-close"
            @click="onClickBannerMailDismiss"
          />
        </template>
      </q-banner>

      <q-banner
        v-if="canShowBannerNotification"
        inline-actions
        class="bg-orange-10 text-white"
      >
        Veuillez pouvez activer les notifications pour profiter de plus de fonctionnalités !
        <template v-slot:avatar>
          <q-icon name="mdi-bell" />
        </template>
        <template v-slot:action>
          <q-btn
            flat
            label="Activer"
            :loading="bannerNotification.isActivating"
            @click="onClickBannerActivateNotification"
          />
          <q-btn
            flat
            icon="mdi-close"
            @click="onClickBannerDismiss"
          />
        </template>
      </q-banner>
    </q-header>

    <q-page-container id="page-container">
      <router-view />
    </q-page-container>

    <!--
    <q-footer>
      <div class="text-subtitle1">
        Sponsors ?
      </div>
    </q-footer>
    -->
  </q-layout>
</template>

<script lang="js">
import { mapGetters } from 'vuex';
import { auth } from '../boot/firebase';
import NavbarLinks from '../components/NavbarLinks.vue';
import NavbarAccount from '../components/NavbarAccount';

export default {
  name: 'DefaultLayout',
  components: {
    NavbarAccount,
    NavbarLinks
  },
  data: () => ({
    bannerMail: {
      show: true,
      isResending: false
    },
    bannerNotification: {
      show: true,
      isActivating: false
    }
  }),

  computed: {
    ...mapGetters(['isLoggedIn', 'isMessagingPossible', 'isMessagingReady']),

    canShowBannerMail() {
      return this.isLoggedIn
          && !this.$store.state.auth.currentUser.emailVerified
          && this.bannerMail.show;
    },

    canShowBannerNotification() {
      return this.isMessagingPossible
          && !this.isMessagingReady
          && this.bannerNotification.show;
    }
  },

  methods: {
    onClickBannerMailDismiss() {
      this.bannerMail.show = false;
    },

    onClickBannerMailResend() {
      this.bannerMail.isResending = true;
      auth.currentUser.sendEmailVerification()
        .then(() => {
          this.bannerMail.isResending = false;
          this.$q.notify({
            message: 'Email de confirmation envoyé',
            icon: 'mdi-email'
          });
        })
        .catch((err) => {
          console.error(err);
          this.bannerMail.isResending = false;
          this.$q.notify({
            message: `Une erreur est survenue en envoyant le mail de confirmation: ${err.code}`,
            icon: 'mdi-alert',
            color: 'negative'
          });
        });
    },

    onClickBannerDismiss() {
      this.bannerNotification.show = false;
    },

    onClickBannerActivateNotification() {
      this.bannerNotification.isActivating = true;
      this.$store.dispatch('setupMessagingRoutine')
        .then(() => {
          this.bannerNotification.isActivating = false;
          this.$q.notify({
            message: 'Notification activées !',
            icon: 'mdi-bell'
          });
        })
        .catch((err) => {
          this.bannerNotification.isActivating = false;
          console.error(err);
          this.$q.notify({
            message: `Une erreur est survenur: ${err.code}`,
            icon: 'mdi-alert',
            color: 'negative'
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
  .toolbar-padding {
    /* We want it to be like a col-8 */
    /* So 8/12 */
    /* So 2/12 on each side */
    $padding: percentage(2/12);

    padding-left: $padding;
    padding-right: $padding;
  }

  /* Define class available to inner components */
  #page-container /deep/ .page-padded {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
</style>
