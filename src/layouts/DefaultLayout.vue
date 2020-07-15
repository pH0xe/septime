<template lang="html">
  <q-layout view="hHh LpR fff">
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
        v-if="canShowBannerMemberInactive"
        :inline-actions="!$q.platform.is.mobile"
        class="bg-amber-10"
      >
        Votre compte n'a pas été validé par le club.
        Vous n'avez pas encore accès à toutes les fonctionnalités.
        <template v-slot:avatar>
          <q-icon name="mdi-account" />
        </template>
        <template v-slot:action>
          <q-btn
            flat
            icon="mdi-close"
            @click="onClickBannerMemberDismiss"
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

    <q-footer>
      <div align="center">
        <div class="q-py-sm">
          <footer-image
            v-for="partner in partners"
            :key="partner.id"
            :link="partner.link"
            :image-link="partner.image"
          />
        </div>
        <div class="q-py-sm">
          <router-link
            v-for="footerLink in footerLinks"
            :key="footerLink.id"
            :to="footerLink.link"
            class="cursor-pointer simple-link"
          >
            {{ footerLink.label }}
          </router-link>
          <h6>V {{ appVersion }}</h6>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script lang="js">
import { mapGetters, mapState } from 'vuex';
import { version as appVersion } from '../../package.json';

import { auth } from '../boot/firebase';
import NavbarLinks from '../components/NavbarLinks.vue';
import NavbarAccount from '../components/NavbarAccount';
import FooterImage from '../components/footerImage';
import partners from '../js/partners';

const footerLinks = [
  {
    id: 0,
    link: { name: 'contact', params: { to: 'legalNotice' } },
    label: 'Mentions légales'
  },
  {
    id: 1,
    link: { name: 'contact', params: { to: 'webmasterContact' } },
    label: '● Contact webmaster'
  },
  {
    id: 2,
    link: { name: 'contact', params: { to: 'clubContact' } },
    label: '● Contact Cercle d\'escrime de Moirans'
  },
  {
    id: 3,
    link: { name: 'contact', params: { to: 'access' } },
    label: '● Accès Cercle d\'escrime de Moirans'
  }
];

export default {
  name: 'DefaultLayout',
  components: {
    FooterImage,
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
    },
    bannerMember: {
      show: true
    }
  }),

  computed: {
    ...mapGetters(['isLoggedIn', 'isMessagingPossible', 'isMessagingReady']),

    ...mapState({
      currentUser: (state) => state.auth.currentUser
    }),

    canShowBannerMail() {
      return this.isLoggedIn
          && !this.$store.state.auth.currentUser.emailVerified
          && this.bannerMail.show;
    },

    canShowBannerNotification() {
      return this.isMessagingPossible
          && !this.isMessagingReady
          && this.bannerNotification.show;
    },

    canShowBannerMemberInactive() {
      return this.isLoggedIn
        && !(this.currentUser?.isActive || this.currentUser?.isAdmin)
        && this.bannerMember.show;
    },

    appVersion() {
      return appVersion;
    },

    partners() {
      return partners;
    },

    footerLinks() {
      return footerLinks;
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

    onClickBannerMemberDismiss() {
      this.bannerMember.show = false;
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
    $padding: percentage(1/12);

    padding-left: $padding;
    padding-right: $padding;
  }

  /* Define class available to inner components */
  #page-container /deep/ .page-padded {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .simple-link {
    color: white;
    text-decoration: none;
  }

  h6 {
    font-size: small;
    padding: 0.5%;
    margin: 0;
    display: inline;
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
