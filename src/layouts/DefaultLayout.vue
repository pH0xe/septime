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
            link="http://www.isere.gouv.fr/Services-de-l-Etat/Sante-et-cohesion-sociale/Direction-Departementale-de-la-Cohesion-Sociale-D.D.C.S/DDCS-presentation-et-organigramme"
            image-link="prefet.png"
          />
          <footer-image
            link="https://www.isere.fr/"
            image-link="isere.png"
          />
          <footer-image
            link="http://www.escrime-ffe.fr/"
            image-link="ffe.png"
          />
          <footer-image
            link="http://escrime.ds.free.fr/joomla/index.php"
            image-link="ligue.jpeg"
          />
          <footer-image
            link="https://escrime38.wordpress.com/"
            image-link="comite.png"
          />
          <footer-image
            link="http://www.ville-moirans.fr/"
            image-link="moirans.jpg"
          />
          <footer-image
            link="https://www.voiron.fr/"
            image-link="voiron.jpg"
          />
          <footer-image
            link="https://www.auvergnerhonealpes.fr/"
            image-link="AURA.png"
          />
        </div>
        <div class="q-py-sm">
          <router-link
            :to="{name: 'contact', query: {to: 'legalNotice'}}"
            class="cursor-pointer simple-link"
          >
            Mentions légales
          </router-link>

          <router-link
            :to="{name: 'contact', query: {to: 'webmasterContact'}}"
            class="cursor-pointer simple-link"
          >
            ● Contact webmaster
          </router-link>
          <router-link
            :to="{name: 'contact', query: {to: 'clubContact'}}"
            class="cursor-pointer simple-link"
          >
            ● Contact Cercle d'escrime de Moirans
          </router-link>
          <router-link
            :to="{name: 'contact', query: {to: 'access'}}"
            class="cursor-pointer simple-link"
          >
            ● Accès Cercle d'escrime de Moirans
          </router-link>
          <h6>V1.0.0</h6>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script lang="js">
import { mapGetters, mapState } from 'vuex';
import { auth } from '../boot/firebase';
import NavbarLinks from '../components/NavbarLinks.vue';
import NavbarAccount from '../components/NavbarAccount';
import FooterImage from '../components/footerImage';

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
    position: fixed;
    bottom: 0;
    right: 0;
  }
</style>
