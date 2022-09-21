<template>
  <q-list
    bordered
    separator
    class="rounded-borders"
  >
    <!-- <editor-fold desc="Informations personnelles" defaultstate="collapsed"> -->
    <q-expansion-item
      :header-inset-level="1"
      :content-inset-level="2"
      expand-separator
      icon="mdi-account"
      label="Informations personnelles"
    >
      <q-card>
        <q-card-section>
          <span class="text-weight-bold q-pr-sm">Email :</span> {{ user.email }}
        </q-card-section>
        <q-separator />
        <q-card-section>
          <span class="text-weight-bold q-pr-sm">Date de naissance :</span> {{ user.birthDate | dateDMY }}
        </q-card-section>
        <q-separator />
        <q-card-section>
          <span class="text-weight-bold q-pr-sm">Adresse :</span> {{ user.address.street }}, {{ user.address.city }}, {{ user.address.zip }}
        </q-card-section>
        <q-separator />
        <q-card-section>
          <span class="text-weight-bold q-pr-sm">Numéro de téléphone :</span> {{ user.phone }}
        </q-card-section>
        <q-separator />
        <q-card-section>
          <span class="text-weight-bold q-pr-sm">Numéro de téléphone d'urgence :</span> {{ user.emergency.phone }}
        </q-card-section>
        <q-separator />
        <q-card-section>
          <span class="text-weight-bold q-pr-sm">Lien avec le contact d'urgence :</span> {{ user.emergency.relation }}
        </q-card-section>
        <q-separator />
        <q-card-section>
          <span class="text-weight-bold q-pr-sm">Certificat médical :</span>
          <q-btn
            v-if="user.medicalCertificate"
            label="Voir son certificat médical"
            icon="mdi-download"
            color="primary"
            :disable="!user.medicalCertificate"
            @click="downloadCertificate"
          />
          <span v-else>
            Aucun certificat téléchargé. Merci d'en ajouter un.
          </span>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <span class="text-weight-bold q-pr-sm">Cerfa :</span>
          <q-btn
            v-if="user.cerfa"
            label="Voir son cerfa"
            icon="mdi-download"
            color="primary"
            :disable="!user.cerfa"
            @click="downloadCerfa"
          />
          <span v-else>
            Aucune attestation de cerfa téléchargé. Merci d'en ajouter un.
            <a
              class="cursor-pointer"
              @click="openCerfaTemplate"
            >Template de l'attestation à fournir disponible ici.</a>
            <br>
            <a
              class="cursor-pointer"
              @click="openMedicalTemplate"
            >Questionnaire de santé à remplir disponible ici <span class="text-weight-bold">(NE PAS LE DONNER AU CLUB)</span>.</a>
          </span>
        </q-card-section>
        <q-separator />

        <div
          align="right"
          class="q-mt-md"
        >
          <q-btn
            label="Editer"
            color="primary"
            flat
            @click="editInformation"
          />
        </div>
      </q-card>
    </q-expansion-item>
    <!-- // </editor-fold> -->

    <!-- <editor-fold desc="Informations de payements" defaultstate="collapsed"> -->
    <q-expansion-item
      :header-inset-level="1"
      :content-inset-level="2"
      expand-separator
      icon="mdi-credit-card-outline"
      label="Information de payement"
    >
      <q-card v-if="user.payments">
        <!-- // <editor-fold desc="Cotisation ?" defaultstate="collapsed"> -->
        <q-card-section>
          <span class="text-weight-bold q-pr-sm">Cotisation fournis ?</span>
          <q-checkbox
            :value="user.payments.paid"
            color="positive"
            disable
          />
        </q-card-section>
        <!-- // </editor-fold> -->
        <q-separator />
        <!-- // <editor-fold desc="Montant" defaultstate="collapsed"> -->
        <q-card-section>
          <span class="text-weight-bold q-pr-sm">Montant : </span>{{ user.payments.amount }}€ dont base (catégorie) : {{ user.payments.base }}€
        </q-card-section>
        <!-- // </editor-fold> -->
        <q-separator />
        <!-- // <editor-fold desc="caution" defaultstate="collapsed"> -->
        <q-card-section>
          <span class="text-weight-bold q-pr-sm">Caution fournis ?</span>
          <q-checkbox
            :value="user.payments.deposit"
            color="positive"
            disable
          />
        </q-card-section>
        <!-- // </editor-fold> -->
        <q-separator />
        <!-- // <editor-fold desc="Assurance+" defaultstate="collapsed"> -->
        <q-card-section>
          <span class="text-weight-bold q-pr-sm">Assurance+ (1.60€) :</span>
          <q-checkbox
            :value="user.payments.assurance"
            color="positive"
            disable
          />
        </q-card-section>
        <!-- // </editor-fold> -->
        <q-separator />
        <!-- // <editor-fold desc="Pass competition" defaultstate="collapsed"> -->
        <q-card-section>
          <span class="text-weight-bold q-pr-sm">Pass compétition (6€) :</span>
          <q-checkbox
            :value="user.payments.competition"
            color="positive"
            disable
          />
        </q-card-section>
        <!-- // </editor-fold> -->
        <q-separator />
        <!-- <editor-fold desc="Veste" defaultstate="collapsed"> -->
        <q-card-section>
          <span class="text-weight-bold q-pr-sm">Location veste (10€) :</span>
          <q-checkbox
            :value="user.payments.breastplate"
            color="positive"
            disable
          />
        </q-card-section>
        <!-- // </editor-fold> -->
        <q-separator />
        <!-- <editor-fold desc="Sous-cuirasse" defaultstate="collapsed"> -->
        <q-card-section>
          <span class="text-weight-bold q-pr-sm">Location sous-cuirasse (5€) :</span>
          <q-checkbox
            :value="user.payments.underBreastplate"
            color="positive"
            disable
          />
        </q-card-section>
        <!-- </editor-fold> -->
        <q-separator />
        <!-- <editor-fold desc="Pantalon" defaultstate="collapsed"> -->
        <q-card-section>
          <span class="text-weight-bold q-pr-sm">Location pantalon (10€) :</span>
          <q-checkbox
            :value="user.payments.pants"
            color="positive"
            disable
          />
        </q-card-section>
        <!-- </editor-fold> -->
        <q-separator />
        <!-- <editor-fold desc="Masque" defaultstate="collapsed"> -->
        <q-card-section>
          <span class="text-weight-bold q-pr-sm">Location masque (25€) :</span>
          <q-checkbox
            :value="user.payments.mask"
            color="positive"
            disable
          />
        </q-card-section>
        <!-- </editor-fold> -->
        <q-separator />
        <!-- <editor-fold desc="Kit première touche" defaultstate="collapsed"> -->
        <q-card-section>
          <span class="text-weight-bold q-pr-sm">Kit première touche (20€) :</span>
          <q-checkbox
            :value="user.payments.childKit"
            color="positive"
            disable
          />
        </q-card-section> <!-- Kit première touche -->
        <!-- </editor-fold> -->
        <q-separator />
      </q-card>
      <q-card v-else>
        <q-card-section class="text-h4 q-mb-md">
          Aucune information de payement trouvé pour ce compte !
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <!-- // </editor-fold> -->

    <!-- <editor-fold desc="Informations sportive" defaultstate="collapsed"> -->
    <q-expansion-item
      :header-inset-level="1"
      :content-inset-level="2"
      expand-separator
      icon="mdi-sword-cross"
      label="Information sportive"
    >
      <q-card>
        <!-- <editor-fold desc="Categorie" defaultstate="collapsed"> -->
        <q-card-section>
          <span class="text-weight-bold q-pr-sm">Catégorie :</span> {{ user.group }}
        </q-card-section>
        <!-- </editor-fold> -->
        <q-separator />
        <!-- <editor-fold desc="Armes" defaultstate="collapsed"> -->
        <q-card-section>
          <span class="text-weight-bold q-pr-sm">Armes :</span> {{ user.weapons }}
        </q-card-section>
        <!-- </editor-fold> -->
        <q-separator />
        <!-- <editor-fold desc="Latéralité" defaultstate="collapsed"> -->
        <q-card-section>
          <span class="text-weight-bold q-pr-sm">Lateralité :</span> {{ user.laterality }}
        </q-card-section>
        <!-- </editor-fold> -->
      </q-card>
    </q-expansion-item>
    <!-- // </editor-fold> -->

    <!-- <editor-fold desc="Suppression" defaultstate="collapsed"> -->
    <q-item v-if="!user.isActive">
      <q-btn
        label="Supprimer l'adherent"
        color="negative"
        @click="confirmDelete"
      />
    </q-item>
    <!-- // </editor-fold> -->
  </q-list>
</template>

<script>
import { openURL, QSpinnerPie } from 'quasar';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ProfilView',

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    tab: 'personnal'
  }),

  computed: {
    ...mapGetters(['cerfaLink', 'medicalTemplateLink'])
  },

  methods: {
    ...mapActions(['removeMember', 'fetchCurrentUser']),

    // <editor-fold desc="editInformation" defaultstate="collapsed">
    editInformation() {
      this.$router.push({ name: 'profil_update', params: { id: this.user.uid } });
    },
    // </editor-fold>

    // <editor-fold desc="downloadCertificate" defaultstate="collapsed">
    downloadCertificate() {
      openURL(this.user.medicalCertificate);
    },
    // </editor-fold>

    // <editor-fold desc="downloadCerfa" defaultstate="collapsed">
    downloadCerfa() {
      openURL(this.user.cerfa);
    },
    // </editor-fold>

    // <editor-fold desc="openCerfaTemplate" defaultstate="collapsed">
    openCerfaTemplate() {
      openURL(this.cerfaLink);
    },
    // </editor-fold>

    // <editor-fold desc="openMedicalTemplate" defaultstate="collapsed">
    openMedicalTemplate() {
      openURL(this.medicalTemplateLink);
    },
    // </editor-fold>

    // <editor-fold desc="deleteUser" defaultstate="collapsed">
    deleteUser() {
      const { uid, parentUid } = this.user;
      this.$q.loading.show({
        message: 'Suppression  du compte...',
        spinnerColor: 'primary',
        spinner: QSpinnerPie
      });
      this.removeMember({ uid, parentUid, member: this.user })
        .then(() => {
          this.$q.loading.hide();
          this.fetchCurrentUser();
        });
    },
    // </editor-fold>

    // <editor-fold desc="confirmDelete" defaultstate="collapsed">
    confirmDelete() {
      this.$q.dialog({
        title: 'Confirmer',
        message: `Voulez vous vraiment supprimer l'adhérent ${this.user.firstName}  ${this.user.lastName}`,
        cancel: true,
        persistent: true
      })
        .onOk(() => {
          this.deleteUser();
        });
    }
    // </editor-fold>
  }
};
</script>

<style scoped>
a {
  color: blue;
  text-decoration: underline;
}

</style>
