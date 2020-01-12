<template>
  <q-splitter
    :value="20"
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
          <div v-if="currentUser.payment">
            <div class="text-h6 q-mb-none">
              Cotisation fournis ?
            </div>
            <q-badge
              v-if="currentUser.payment.paid"
              color="positive"
              label="Oui"
            />
            <q-badge
              v-else
              color="negative"
              label="Non"
            />

            <q-separator />

            <div class="text-h6 q-mb-none">
              Montant :
            </div>
            <p>{{ currentUser.payment.amount }}€</p>

            <q-separator />

            <div class="text-h6 q-mb-none">
              Caution fournis ?
            </div>
            <q-badge
              v-if="currentUser.payment.deposit"
              color="positive"
              label="Oui"
            />
            <q-badge
              v-else
              color="negative"
              label="Non"
            />

            <q-separator />

            <div class="text-h6 q-mb-none">
              Assurance + :
            </div>
            <q-badge
              v-if="currentUser.payment.assurance"
              color="positive"
              label="Oui"
            />
            <q-badge
              v-else
              color="negative"
              label="Non"
            />

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

          <div v-if="currentUser.payment">
            <div
              class="text-h6 q-mb-none"
            >
              Pass compétition :
            </div>
            <q-badge
              v-if="currentUser.payment.competition"
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
import { Weapons } from '../js/Weapons';
import { Laterality } from '../js/Laterality';

export default {
  name: 'ProfilView',

  data: () => ({
    tab: 'personnal'
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

  methods: {
    editInformation() {
      this.$router.push({ name: 'profil_update' });
    }
  }
};
</script>

<style scoped>

</style>
