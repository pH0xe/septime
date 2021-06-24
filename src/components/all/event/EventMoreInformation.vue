<template>
  <q-dialog
    ref="dialog"
    :maximized="$q.platform.is.mobile"
    @hide="hide"
  >
    <q-card
      class="q-dialog-plugin"
      :class="getWidth"
    >
      <q-bar
        v-if="$q.platform.is.mobile"
        class="bg-primary"
      >
        <q-space />
        <q-btn
          v-close-popup
          dense
          flat
          icon="mdi-close"
          color="white"
        />
      </q-bar>
      <template v-if="!isTraining">
        <q-card-section class="text-h5 text-capitalize">
          {{ event.title }}
        </q-card-section>
        <q-separator />
        <q-card-section>
          {{ event.description }}
        </q-card-section>
        <q-separator />
        <q-card-section>
          Commence le {{ event.startDate | dateDM }} à {{ event.startDate | dateHM }} <br>
          Se finit le {{ event.endDate | dateDM }} à {{ event.endDate | dateHM }}
        </q-card-section>
        <q-separator />
        <q-card-section>
          <span class="text-weight-bold">Personnes requises:</span>
          <q-virtual-scroll
            :items="event.neededRole"
            separator
            :virtual-scroll-slice-size="2"
            class="max-height"
          >
            <template v-slot="{ item, index }">
              <q-item
                :key="index"
                dense
              >
                <q-item-section>
                  <q-item-label>
                    <!-- {{ item.uid }} -->
                    ● {{ item.name }} : {{ item.require }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-virtual-scroll>
        </q-card-section>
        <q-separator />
        <q-card-section v-if="$store.getters.isLoggedIn">
          <span class="text-weight-bold">Personnes inscrites :</span>
          <q-virtual-scroll
            :items="event.registerMember"
            separator
            :virtual-scroll-slice-size="2"
            class="max-height"
          >
            <template v-slot="{ item, index }">
              <q-item
                :key="index"
                dense
              >
                <q-item-section>
                  <q-item-label>
                    <!-- {{ item.uid }} -->
                    ● {{ item.name }} : {{ item.role }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-virtual-scroll>
        </q-card-section>

        <template v-if="event.isCompetition">
          <q-separator />
          <q-card-section class="q-pb-none">
            <span class="text-weight-bold">Point de rendez-vous :</span>
            <span class="q-ml-sm"> {{ event.meetingPoint }}</span>
          </q-card-section>
          <q-card-section class="q-py-none">
            <span class="text-weight-bold">Mixte :</span>
            <span class="q-ml-sm"> {{ isMixte() }}</span>
          </q-card-section>
          <q-card-section>
            <span class="text-weight-bold">Par équipe :</span>
            <span class="q-ml-sm"> {{ isByTeam() }}</span>
          </q-card-section>

          <q-separator />
          <q-card-section>
            <span class="text-weight-bold">Catégories :</span>
            <q-virtual-scroll
              :items="event.competitionGroup"
              separator
              :virtual-scroll-slice-size="2"
              class="max-height"
            >
              <template v-slot="{ item, index }">
                <q-item
                  :key="index"
                  dense
                >
                  <q-item-section>
                    <q-item-label>
                      <!-- {{ item.uid }} -->
                      ● {{ item }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-virtual-scroll>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <span class="text-weight-bold">Armes :</span>
            <span
              v-for="(weapon, index) in event.competitionWeapons"
              :key="index"
              class="q-ml-sm"
            > ● {{ getWeaponName(weapon) }}</span>
          </q-card-section>
        </template>
      </template> <!-- Evenement -->
      <template v-if="isTraining">
        <q-card-section class="text-h5 text-capitalize">
          Entrainement
        </q-card-section>
        <q-separator />
        <q-card-section>
          Commence le {{ event.startDate | dateDM }} à {{ event.startDate | dateHM }} <br>
          Se finit le {{ event.endDate | dateDM }} à {{ event.endDate | dateHM }}
        </q-card-section>
        <q-separator />
        <q-card-section class="text-capitalize">
          Lieux : {{ event.location }}
        </q-card-section>
        <q-separator />
        <q-card-section>
          <span class="text-weight-bold">Pour les catégories :</span>
          <q-virtual-scroll
            :items="event.group"
            separator
            :virtual-scroll-slice-size="2"
            class="max-height"
          >
            <template v-slot="{ item, index }">
              <q-item
                :key="index"
                dense
              >
                <q-item-section>
                  <q-item-label>
                    <!-- {{ item.uid }} -->
                    ● {{ item }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-virtual-scroll>
        </q-card-section>
        <q-separator />
      </template> <!-- Entrainement -->

      <q-card-actions align="right">
        <template v-if="$store.getters.isLoggedIn && !isTraining">
          <q-btn
            v-if="canParticipate"
            :loading="isSubscribing"
            flat
            icon="mdi-account-check"
            label="Participer"
            @click="handleClickParticipate"
          />
          <q-btn
            v-else
            flat
            disable
            icon="mdi-account-check"
            label="Vous participez !"
          />
        </template>
        <q-btn
          color="primary"
          flat
          label="Fermer"
          @click="hide"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState } from 'vuex';
import { Weapons } from '../../../js/Weapons';
import EventParticipateDialog from './EventParticipateDialog';

export default {
  name: 'EventMoreInformation',

  props: {
    event: {
      required: true,
      type: Object
    },

    isTraining: {
      required: false,
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    isSubscribing: false
  }),

  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser
    }),

    getWidth() {
      if (!this.$q.platform.is.mobile) {
        return 'w-60';
      }
      return '';
    },

    canParticipate() {
      return !this.event.registerMember?.some(
        (registration) => registration.uid === this.$store.state.auth.currentUser.uid
      );
    }
  },

  methods: {
    show() {
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialog.hide();
    },

    isMixte() {
      return this.event.isSameGender ? 'Oui' : 'Non';
    },

    isByTeam() {
      return this.event.isByTeam ? 'Oui' : 'Non';
    },

    getWeaponName(name) {
      switch (name) {
        case Weapons.FOIL:
          return 'Fleuret';
        case Weapons.EPEE:
          return 'Épée';
        case Weapons.SABRE:
          return 'Sabre';
        default:
          return '';
      }
    },

    handleClickParticipate() {
      this.$q.dialog({
        component: EventParticipateDialog,
        parent: this,
        title: this.event.title,
        roles: this.event.neededRole
      }).onOk(({ role: { value } }) => {
        this.isSubscribing = true;
        let newRegisterMember;
        if (this.event.registerMember) {
          newRegisterMember = [...this.event.registerMember, {
            name: `${this.currentUser.firstName} ${this.currentUser.lastName}`,
            role: value,
            uid: this.currentUser.uid
          }];
        } else {
          newRegisterMember = [{
            name: `${this.currentUser.firstName} ${this.currentUser.lastName}`,
            role: value,
            uid: this.currentUser.uid
          }];
        }
        this.$store.dispatch('subscribeToEvent', { id: this.event.id, newRegisterMember })
          .then(() => {
            this.isSubscribing = false;
            this.$q.notify({
              message: 'Participation prise en compte !',
              icon: 'mdi-check',
              position: 'bottom'
            });

            this.hide();
            return this.$store.dispatch('fetchEvents');
          })
          .catch((err) => {
            this.$q.notify({
              message: `Une erreur est survenue: ${err.code}`,
              icon: 'mdi-alert',
              position: 'bottom'
            });
          });
      });
    }
  }
};
</script>

<style scoped>
.w-60 {
  max-width: none;
  width: 60%;
}
.max-height {
  max-height: 90px;
}
</style>
