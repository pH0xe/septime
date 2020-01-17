<template>
  <q-dialog
    ref="dialog"
    :maximized="$q.platform.is.mobile"
    class="q-dialog-plugin"
    @hide="onDialogHide"
  >
    <q-card>
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

      <q-card-section class="text-h5">
        {{ user.lastName }} {{ user.firstName }}
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>Catégorie :</q-item-label>
              <q-item-label caption>
                {{ user.group }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>Date de naissance :</q-item-label>
              <q-item-label caption>
                {{ user.birthDate | dateDMY }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>Numéro de téléphone :</q-item-label>
              <q-item-label caption>
                {{ user.phone }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>Numéro de téléphone d'urgence :</q-item-label>
              <q-item-label caption>
                {{ user.phoneEmergency }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>E-mail :</q-item-label>
              <q-item-label caption>
                {{ user.email }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>Sexe :</q-item-label>
              <!-- Masculin -->
              <q-item-label
                v-if="user.gender === Gender.MALE"
                caption
              >
                Masculin
              </q-item-label>
              <!-- Feminin -->
              <q-item-label
                v-else
                caption
              >
                Féminin
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>Armes :</q-item-label>
              <q-item-label
                v-if="user.weapons.includes(Weapons.FOIL)"
                caption
              >
                Fleuret
              </q-item-label>
              <q-item-label
                v-if="user.weapons.includes(Weapons.EPEE)"
                caption
              >
                Epée
              </q-item-label>
              <q-item-label
                v-if="user.weapons.includes(Weapons.SABRE)"
                caption
              >
                Sabre
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>Certificat médical :</q-item-label>
              <div class="row justify-between">
                <q-checkbox
                  :value="!!user.medicalCertificate"
                  disable
                  color="positive"
                  label="Fournis"
                />
                <q-btn
                  label="Télécharger"
                  icon="mdi-download"
                  color="admin-primary"
                  :disable="!user.medicalCertificate"
                  @click="downloadCertificate"
                />
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>Cerfa :</q-item-label>
              <div class="row justify-between">
                <q-checkbox
                  :value="!!user.cerfa"
                  disable
                  color="positive"
                  label="Fournis"
                />
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>Cotisation :</q-item-label>
              <div class="row justify-between">
                <q-checkbox
                  v-model="user.payments.paid"
                  disable
                  color="positive"
                  label="Fournis"
                />
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>Administrateur :</q-item-label>
              <div class="row justify-between">
                <q-checkbox
                  v-model="user.isAdmin"
                  disable
                  color="positive"
                  label="Administrateur ?"
                />
                <q-btn
                  v-if="!user.isAdmin"
                  label="Mettre en administrateur"
                  icon="mdi-plus"
                  color="admin-primary"
                  @click="setAsAdmin"
                />
                <q-btn
                  v-else
                  label="Enlever des administrateurs"
                  icon="mdi-minus"
                  color="negative"
                  @click="removeFromAdmin"
                />
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>Activation :</q-item-label>
              <div class="row justify-between">
                <q-checkbox
                  v-model="user.isActive"
                  disable
                  color="positive"
                  label="Compte activé ?"
                />
                <q-btn
                  v-if="!user.isActive"
                  label="Activer le compte (irréversible)"
                  icon="mdi-plus"
                  color="admin-primary"
                  @click="activateMember"
                />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn
          color="admin-primary"
          flat
          label="Ok"
          @click="onClickOk"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { openURL } from 'quasar';
import { mapActions } from 'vuex';
import { Weapons } from '../js/Weapons';
import { Gender } from '../js/Gender';

export default {
  name: 'AdminMemberDetails',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    dialogDetails: false
  }),
  computed: {
    Gender() {
      return Gender;
    },
    Weapons() {
      return Weapons;
    }
  },
  methods: {
    ...mapActions(['setAdmin', 'removeAdmin', 'activateAccount']),
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
    downloadCertificate() {
      openURL(this.user.medicalCertificate);
    },
    setAsAdmin() {
      this.setAdmin({ member: this.user });
    },
    removeFromAdmin() {
      this.removeAdmin({ member: this.user });
    },
    activateMember() {
      this.activateAccount({ member: this.user });
      console.log('activer le compte a faire');
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
