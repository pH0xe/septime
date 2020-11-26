<template>
  <q-page class="q-ma-md">
    <form
      @submit.prevent="onClickOk"
    >
      <h4 class="text-h4 q-mb-xs q-mt-md q-ml-md">
        Ajout d'un adhérent
      </h4>
      <q-card-section>
        <q-separator />
        <admin-member-create-login-data ref="loginData" />
        <q-separator />
        <admin-member-create-personal-data ref="personalData" />
        <q-separator />
        <admin-member-create-contact-data ref="contactData" />
        <q-separator />
        <admin-member-create-emergency-data ref="emergencyData" />
        <q-separator />
        <admin-member-create-sport-data ref="sportData" />
        <q-separator />
        <admin-member-create-uploader-data ref="uploaderData" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Créer le compte"
          icon="mdi-check"
          type="submit"
          color="admin-primary"
        />
      </q-card-actions>
    </form>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Notify } from 'quasar';
import { adminCreateMember } from '../../../boot/firebase';
import AdminMemberCreatePersonalData from '../../../components/admin/member/AdminMemberCreatePersonalData';
import AdminMemberCreateContactData from '../../../components/admin/member/AdminMemberCreateContactData';
import AdminMemberCreateEmergencyData from '../../../components/admin/member/AdminMemberCreateEmergencyData';
import AdminMemberCreateSportData from '../../../components/admin/member/AdminMemberCreateSportData';
import AdminMemberCreateUploaderData from '../../../components/admin/member/AdminMemberCreateUploaderData';
import AdminMemberCreateLoginData from '../../../components/admin/member/AdminMemberCreateLoginData';

export default {
  name: 'AdminMemberCreatePage',
  components: {
    AdminMemberCreateLoginData,
    AdminMemberCreateUploaderData,
    AdminMemberCreateSportData,
    AdminMemberCreateEmergencyData,
    AdminMemberCreateContactData,
    AdminMemberCreatePersonalData
  },

  data: () => ({

  }),

  computed: {
    ...mapState({
      accounts: (state) => state.members.accounts
    }),

    isError() {
      const {
        personalData, contactData, emergencyData, sportData, uploaderData, loginData
      } = this.$refs;
      return uploaderData.$refs.date.error
        || personalData.$v.$error
        || contactData.$v.$error
        || emergencyData.$v.$error
        || sportData.$v.$error
        || loginData.$v.$error;
    }
  },

  beforeMount() {
    this.fetchAccounts();
  },

  methods: {
    ...mapActions(['fetchAccounts', 'createSubUser']),

    emailExist(email) {
      const account = this.accounts.find((ac) => ac.email === email);
      if (account) {
        return account.uid;
      }
      return null;
    },

    validation() {
      const {
        personalData, contactData, emergencyData, sportData, loginData
      } = this.$refs;
      personalData.$v.$touch();
      contactData.$v.$touch();
      emergencyData.$v.$touch();
      sportData.$v.$touch();
      loginData.$v.$touch();
    },

    async onClickOk() {
      this.validation();

      if (!this.isError) {
        const {
          personalData, contactData, emergencyData, sportData, uploaderData, loginData
        } = this.$refs;

        const payments = {
          amount: 0,
          assurance: false,
          base: null,
          breastplate: false,
          childKit: false,
          competition: false,
          deposit: false,
          mask: false,
          paid: false,
          pants: false,
          underBreastplate: false
        };
        const userData = {
          ...personalData.$data,
          ...contactData.$data,
          ...emergencyData.$data,
          ...sportData.$data,
          ...uploaderData.$data,
          payments,
          isActive: false
        };
        delete userData.isCerfa;
        delete userData.isCertificate;
        delete userData.isProfilPic;

        this.$q.loading.show({
          message: 'Création du compte...'
        });

        const data = { email: loginData.$data.loginEmail };
        let uid = this.emailExist(data.email);
        let responseData;
        if (!uid) {
          responseData = await adminCreateMember({ ...data });
          if (responseData.error) {
            console.error(responseData);
            this.$q.notify({
              message: `Unexpected error: ${responseData.code}`,
              icon: 'mdi-alert',
              color: 'negative'
            });
          } else {
            uid = responseData.data.uid;
          }
        }

        if (!responseData?.error) {
          const subUid = await this.createSubUser({ uid, data: userData });

          const { certificateUploader, cerfaUploader, profileUploader } = uploaderData.$refs;
          if (uploaderData.$data.isCertificate) {
            this.$q.loading.show({
              message: 'Upload du certificat médical...'
            });

            certificateUploader.extra.path = `certificates/${uid}`;
            certificateUploader.extra.filename = subUid;
            await certificateUploader.upload().catch((err) => {
              console.log(err);
              console.error('Certificate not uploaded');
            });
          }

          if (uploaderData.$data.isCerfa) {
            this.$q.loading.show({
              message: 'Upload du cerfa...'
            });

            cerfaUploader.extra.path = `cerfa/${uid}`;
            cerfaUploader.extra.filename = subUid;
            await cerfaUploader.upload().catch((err) => {
              console.log(err);
              console.error('Cerfa not uploaded');
            });
          }

          if (uploaderData.$data.isProfilPic) {
            this.$q.loading.show({
              message: 'Upload de la photo de profil...'
            });

            profileUploader.extra.path = `profile_pics/${uid}`;
            profileUploader.extra.filename = subUid;
            await profileUploader.upload().catch((err) => {
              console.log(err);
              console.error('Profil pic not uploaded');
            });
          }

          Notify.create({
            message: 'Adherent ajouté avec succés',
            color: 'positive',
            position: 'top'
          });
        }

        this.$q.loading.hide();

        this.$router.replace({ name: 'admin_members_list' });
      }
    }
  },

  meta: {
    title: 'Admin - Membres'
  }
};


</script>

<style lang="scss" scoped>

</style>
