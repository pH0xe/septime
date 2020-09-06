<template>
  <q-splitter
    :value="20"
    :horizontal="$q.platform.is.mobile"
  >
    <template v-slot:before>
      <q-tabs
        v-model="tab"
        vertical
        class="text-primary"
      >
        <q-tab
          name="personnal"
          icon="mdi-account"
          label="Information personnelle"
        />
        <q-tab
          name="payment"
          icon="mdi-credit-card-outline"
          label="Information de payement"
        />
        <q-tab
          name="sport"
          icon="mdi-sword-cross"
          label="Information sportive"
        />
      </q-tabs>
    </template>

    <template v-slot:after>
      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="fade"
        transition-next="fade"
      >
        <q-tab-panel name="personnal">
          <div class="text-h6 q-mb-none">
            Nom - prénom :
          </div>
          <p>{{ currentUser.lastName }} - {{ currentUser.firstName }}</p>
          <q-separator />
          <div class="text-h6 q-mb-none">
            Email :
          </div>
          <p>{{ currentUser.email }}</p>
          <q-separator />
          <div class="text-h6 q-mb-none">
            Date de naissance :
          </div>
          <p>{{ currentUser.birthDate | dateDMY }}</p>
          <q-separator />
          <div class="text-h6 q-mb-none">
            Adresse :
          </div>
          <p>
            {{ currentUser.address.street }}, {{ currentUser.address.city }},
            {{ currentUser.address.zip }}
          </p>
          <q-separator />
          <div class="text-h6 q-mb-none">
            Numéro de téléphone :
          </div>
          <p>{{ currentUser.phone }}</p>
          <q-separator />
          <div class="text-h6 q-mb-none">
            Numéro de téléphone d'urgence :
          </div>
          <p>{{ currentUser.phoneEmergency }}</p>
          <q-separator />
          <div class="text-h6 q-mb-none">
            Lien avec le contact d'urgence :
          </div>
          <p>{{ currentUser.relationEmergency || 'Non définit' }}</p>
          <q-separator />
          <div class="text-h6 q-mb-none">
            Certificat médical :
          </div>
          <q-btn
            v-if="currentUser.medicalCertificate"
            label="Voir son certificat médical"
            icon="mdi-download"
            color="primary"
            :disable="!currentUser.medicalCertificate"
            @click="downloadCertificate"
          />
          <p v-else>
            Aucun certificat télécharger. Merci d'en ajouter un.
          </p>
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
        </q-tab-panel>

        <q-tab-panel name="payment">
          <div v-if="payments">
            <div class="text-h6 q-mb-none">
              Cotisation fournis ?
              <q-checkbox
                v-model="currentUser.payments.paid"
                color="positive"
                class="q-ma-md"
                disable
              />
            </div> <!-- Cotisation ? -->
            <q-separator />
            <div class="q-my-md">
              <span class="text-h6">Montant : </span>{{ payments.amount }}€ dont base (catégorie) : {{ payments.base }}€
            </div> <!-- Montant -->
            <q-separator />

            <div class="text-h6 q-mb-none">
              Caution fournis ?
              <q-checkbox
                v-model="payments.deposit"
                color="positive"
                class="q-ma-md"
                disable
              />
            </div> <!-- caution -->
            <q-separator />

            <div class="text-h6 q-mb-none">
              Assurance+ (1.60€) :
              <q-checkbox
                v-model="payments.assurance"
                color="positive"
                class="q-ma-md"
                disable
              />
            </div> <!-- assurance+ -->
            <q-separator />
            <div class="text-h6 q-mb-none">
              Pass compétition (6€) :
              <q-checkbox
                v-model="payments.competition"
                color="positive"
                class="q-ma-md"
                disable
              />
            </div> <!-- Pass competition -->
            <q-separator />
            <div class="text-h6 q-mb-none">
              Location veste (10€) :
              <q-checkbox
                v-model="payments.breastplate"
                color="positive"
                class="q-ma-md"
                disable
              />
            </div> <!-- Veste -->
            <q-separator />
            <div class="text-h6 q-mb-none">
              Location sous-cuirasse (5€) :
              <q-checkbox
                v-model="payments.underBreastplate"
                color="positive"
                class="q-ma-md"
                disable
              />
            </div> <!-- Sous-cuirasse-->
            <q-separator />
            <div class="text-h6 q-mb-none">
              Location pantalon (10€) :
              <q-checkbox
                v-model="payments.pants"
                color="positive"
                class="q-ma-md"
                disable
              />
            </div> <!-- Pantalon -->
            <q-separator />
            <div class="text-h6 q-mb-none">
              Location masque (25€) :
              <q-checkbox
                v-model="payments.mask"
                color="positive"
                class="q-ma-md"
                disable
              />
            </div> <!-- Masque -->
            <q-separator />
            <div class="text-h6 q-mb-none">
              Kit première touche (20€) :
              <q-checkbox
                v-model="payments.childKit"
                color="positive"
                class="q-ma-md"
                disable
              />
            </div> <!-- Kit première touche -->
            <q-separator />
          </div>
          <div v-else>
            <div class="text-h4 q-mb-md">
              Aucune information de payement trouvé pour ce compte !
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="sport">
          <div class="text-h6 q-mb-none">
            Catégorie :
          </div>
          <p>{{ currentUser.group }}</p>

          <q-separator />

          <div class="text-h6 q-mb-none">
            Armes :
          </div>
          <p>{{ getWeapons }}</p>

          <q-separator />

          <div v-if="payments">
            <div
              class="text-h6 q-mb-none"
            >
              Pass compétition :
            </div>
            <q-badge
              v-if="payments.competition"
              color="positive"
              label="Oui"
            />
            <q-badge
              v-else
              color="negative"
              label="Non"
            />
          </div>

          <q-separator />

          <div class="text-h6 q-mb-none">
            Lateralité :
          </div>
          <p>{{ getLaterality }}</p>

          <q-separator />
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
</template>

<script>
import { mapState } from 'vuex';
import { openURL } from 'quasar';
import { Weapons } from '../js/Weapons';
import { Laterality } from '../js/Laterality';

export default {
  name: 'ProfilView',

  data: () => ({
    tab: 'personnal',
    payments: {
      amount: 0,
      base: 0,
      assurance: false,
      competion: false,
      deposit: false,
      paid: false,
      mask: false,
      pants: false,
      underBreastplate: false,
      breastplate: false,
      childKit: false
    }
  }),

  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser
    }),

    getWeapons() {
      let weaponsString = '';
      this.currentUser.weapons.forEach((weapon) => {
        switch (weapon) {
          case Weapons.EPEE:
            weaponsString = `${weaponsString} épée`;
            break;
          case Weapons.FOIL:
            weaponsString = `${weaponsString} fleuret`;
            break;
          case Weapons.SABRE:
            weaponsString = `${weaponsString} sabre`;
            break;
          default:
        }
      });
      return weaponsString;
    },

    getLaterality() {
      switch (this.currentUser.laterality) {
        case Laterality.RIGHT:
          return 'Droitier';
        case Laterality.LEFT:
          return 'Gaucher';
        default:
          return 'Inconnue';
      }
    }
  },

  mounted() {
    this.payments = Object.assign(this.payments, this.currentUser.payments);
    console.log(this.payments);
  },

  methods: {
    editInformation() {
      this.$router.push({ name: 'profil_update' });
    },

    downloadCertificate() {
      openURL(this.currentUser.medicalCertificate);
    }
  }
};
</script>

<style scoped>

</style>
