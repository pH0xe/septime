<template>
  <div>
    <q-dialog
      ref="dialog"
      :maximized="$q.platform.is.mobile"
      class="q-dialog-plugin"
      @hide="onDialogHide"
    >
      <q-card :class="getWidth">
        <q-bar
          v-if="$q.platform.is.mobile"
          class="bg-admin-primary"
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
        <q-card-section>
          {{ event.description }}
        </q-card-section>
        <q-separator />

        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>
                Date de début
              </q-item-label>
              <q-item-label caption>
                {{ event.startDate | dateDMY }} à {{ event.startDate | dateHM }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>
                Date de fin
              </q-item-label>
              <q-item-label caption>
                {{ event.endDate | dateDMY }} à {{ event.endDate | dateHM }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>
                Rôles requis
              </q-item-label>
              <q-item-label
                v-for="role in event.neededRole"
                :key="role.name"
                caption
              >
                {{ role.name }} : {{ role.require }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>
                Membres inscrits
              </q-item-label>
              <q-item-label
                v-if="!event.registerMember || !event.registerMember.length"
                caption
              >
                Personne
              </q-item-label>
              <q-item-label
                v-for="member in event.registerMember"
                :key="member.uid"
                caption
              >
                {{ getUserName(member.uid) }} : {{ member.role }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <div v-if="event.isCompetition">
            <q-item>
              <q-item-section>
                <q-item-label>
                  Specifications competition
                </q-item-label>
                <q-checkbox
                  label="Par équipe"
                  :value="event.isByTeam"
                  disable
                  color="positive"
                />
                <q-checkbox
                  label="Mixte"
                  :value="event.isSameGender"
                  disable
                  color="positive"
                />
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item
              v-if="event.meetingPoint"
            >
              <q-item-section>
                <q-item-label>
                  Point de rendez-vous
                </q-item-label>
                <q-item-label caption>
                  {{ event.meetingPoint }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item>
              <q-item-section>
                <q-item-label>
                  Armes :
                </q-item-label>
                <q-item-label
                  v-for="weapon in event.competitionWeapons"
                  :key="weapon"
                  caption
                >
                  {{ getWeaponName(weapon) }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item>
              <q-item-section>
                <q-item-label>
                  Groupes :
                </q-item-label>
                <q-item-label
                  v-for="group in event.competitionGroup"
                  :key="group"
                  caption
                >
                  {{ group }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
          </div>
          <q-card-actions align="right">
            <q-btn
              label="Supprimer"
              color="negative"
              flat
              :loading="submitting"
              @click="safeDelete = true"
            />
          </q-card-actions>
        </q-list>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="safeDelete"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card>
        <q-card-section class="flex justify-around items-center">
          <q-icon
            name="warning"
            class="q-ma-xs"
            color="negative"
            :size="'xl'"
          />
          <div class="text-h6">
            Êtes-vous sûr de vouloir supprimer cet événement ?
          </div>
        </q-card-section>
        <q-card-actions
          align="right"
        >
          <q-btn
            v-close-popup
            color="admin-primary"
            label="Non"
            flat
          />
          <q-btn
            v-close-popup
            label="Oui"
            color="negative"
            flat
            @click="deleteThisEvent"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { date, Notify } from 'quasar';
import { mapActions } from 'vuex';
import { Weapons } from '../js/Weapons';

export default {
  name: 'AdminEventDetails',

  props: {
    event: {
      type: Object,
      required: true
    },

    members: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    safeDelete: false,
    submitting: false
  }),

  computed: {
    getWidth() {
      if (!this.$q.platform.is.mobile) {
        return 'w-60';
      }
      return '';
    }
  },

  methods: {
    ...mapActions(['fetchEvents', 'deleteEvent']),
    show() {
      this.$refs.dialog.show();
    },

    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      this.$emit('hide');
    },

    onClickOk() {
      this.$emit('ok');
      this.hide();
    },

    getUserName(uid) {
      const members = this.members.find((member) => member.uid === uid);
      return `${members.firstName} ${members.lastName}`;
    },

    getTimeRange(event) {
      const start = event.startDate;
      const end = event.endDate;

      return `${date.formatDate(start, 'HH:mm')} - ${date.formatDate(end, 'HH:mm')}`;
    },

    getWeaponName(weapon) {
      switch (weapon) {
        case Weapons.EPEE:
          return 'Epée';
        case Weapons.SABRE:
          return 'Sabre';
        case Weapons.FOIL:
          return 'Fleuret';
        default:
          return '';
      }
    },

    deleteThisEvent() {
      // this.submitting = true;

      this.hide();
      this.$q.loading.show({
        message: 'Suppresion en cours...'
      });

      this.deleteEvent({ event: this.event })
        .then(() => {
          this.$q.loading.hide();
          this.fetchEvents();
        })
        .catch((err) => {
          console.error('Error while deleting : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'bottom'
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
  .w-60 {
    width: 60%;
  }
</style>
