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
      <q-card-section>
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
                  ● {{ getUserName(item.uid) }} : {{ item.role }}
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
      </template>

      <q-card-section>
        <span class="text-weight-bold">Par équipe :</span>
        <span
          v-for="(weapon, index) in event.competitionWeapons"
          :key="index"
          class="q-ml-sm"
        > ● {{ getWeaponName(weapon) }}</span>
      </q-card-section>

      <q-card-actions align="right">
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
import { Weapons } from '../js/Weapons';

export default {
  name: 'EventMoreInformation',

  props: {
    event: {
      required: true,
      type: Object
    },

    members: {
      required: true,
      type: Array
    }
  },

  data: () => ({
    heavyList: []
  }),

  computed: {
    getWidth() {
      if (!this.$q.platform.is.mobile) {
        return 'w-60';
      }
      return '';
    }
  },

  mounted() {
    for (let i = 0; i < 1000; i += 1) {
      this.heavyList.push({
        label: `Option ${i + 1}`
      });
    }
  },

  methods: {
    show() {
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialog.hide();
    },

    getUserName(uid) {
      const members = this.members.find((member) => member.uid === uid);
      return `${members.firstName} ${members.lastName}`;
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
