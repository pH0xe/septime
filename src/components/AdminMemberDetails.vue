<template>
  <q-dialog
    ref="dialog"
    :maximized="$q.platform.is.mobile"
    @hide="onDialogHide"
  >
    <q-card
      class="q-dialog-plugin"
      :class="{'w-60': !$q.platform.is.mobile}"
    >
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

      <q-card-section class="text-h5 text-center">
        {{ user.lastName }} {{ user.firstName }}
      </q-card-section> <!-- Nom Prenom -->
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
          </q-item> <!-- Catégorie-->
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>Date de naissance :</q-item-label>
              <q-item-label caption>
                {{ user.birthDate | dateDMY }}
              </q-item-label>
            </q-item-section>
          </q-item> <!-- Date de naissance-->
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>Numéro de téléphone :</q-item-label>
              <q-item-label caption>
                {{ user.phone }}
              </q-item-label>
            </q-item-section>
          </q-item> <!-- Numero telephone -->
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>Numéro de téléphone d'urgence :</q-item-label>
              <q-item-label caption>
                {{ user.emergency.phone }}
              </q-item-label>
            </q-item-section>
          </q-item> <!-- Numero telephone urgence -->
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>Lien avec contact d'urgence :</q-item-label>
              <q-item-label caption>
                {{ user.emergency.relation || 'Non définit' }}
              </q-item-label>
            </q-item-section>
          </q-item> <!-- Lien avec le contact d'urgence urgence -->
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>Adresse :</q-item-label>
              <q-item-label caption>
                {{ user.address.street || 'Rue non définit' }}, {{ user.address.city || 'Vile non définit' }}, {{ user.address.zip || 'Code postal non définit' }},
              </q-item-label>
            </q-item-section>
          </q-item> <!-- Adresse -->
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>E-mail :</q-item-label>
              <q-item-label caption>
                {{ user.email }}
              </q-item-label>
            </q-item-section>
          </q-item> <!-- Email -->
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>Sexe :</q-item-label>
              <q-item-label caption>
                {{ user.gender }}
              </q-item-label>
            </q-item-section>
          </q-item> <!-- Sexe -->
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>Latéralité :</q-item-label>
              <q-item-label caption>
                {{ user.laterality }}
              </q-item-label>
            </q-item-section>
          </q-item> <!-- Laterality -->
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>Armes :</q-item-label>
              <q-item-label
                caption
              >
                {{ user.weapons }}
              </q-item-label>
            </q-item-section>
          </q-item> <!-- Armes -->
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
                  v-if="!user.medicalCertificate"
                  label="Ajouter"
                  icon="mdi-file-upload"
                  color="admin-primary"
                  @click="addCertificate"
                />
                <q-btn
                  round
                  icon="mdi-download"
                  color="admin-primary"
                  :disable="!user.medicalCertificate"
                  @click="downloadCertificate"
                />
              </div>
              <div v-if="user.medicalCertificate">
                Date du certificat : {{ user.certificateDate | dateDMY }}
              </div>
            </q-item-section>
          </q-item> <!-- Certificat medical-->
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
                <q-btn
                  v-if="!user.cerfa"
                  label="Ajouter"
                  icon="mdi-file-upload"
                  color="admin-primary"
                  @click="addCerfa"
                />
                <q-btn
                  round
                  icon="mdi-download"
                  color="admin-primary"
                  :disable="!user.cerfa"
                  @click="downloadCerfa"
                />
              </div>
            </q-item-section>
          </q-item> <!-- Cerfa -->
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
                <q-btn
                  v-if="user.payments.paid"
                  color="negative"
                  icon="mdi-close"
                  round
                  @click="setAsNotPaid"
                >
                  <q-tooltip>
                    J'ai fais une erreur. Remettre à non payé.
                  </q-tooltip>
                </q-btn>
                <q-btn
                  v-if="!user.payments.paid"
                  label="Payement vérifié"
                  icon="mdi-plus"
                  color="positive"
                  @click="setAsPaid"
                />
              </div>
            </q-item-section>
          </q-item> <!-- Cotisation ? -->
          <q-separator />
          <template v-if="user.payments.paid">
            <q-expansion-item
              expand-separator
              icon="mdi-information"
              label="Information de cotisation"
              caption="Cliquer pour plus de détails"
            >
              <q-item>
                <q-item-section>
                  <q-item-label>Montant :</q-item-label>
                  <q-item-label caption>
                    {{ user.payments.amount }}€ dont base (catégorie) : {{ user.payments.base || 'indéfinit (erreur)' }}€
                  </q-item-label>
                </q-item-section>
              </q-item> <!-- Montant -->
              <q-separator />
              <q-item>
                <q-item-section>
                  <q-item-label>Assurance+ (1.60€) :</q-item-label>
                  <div class="row justify-between">
                    <q-checkbox
                      v-model="user.payments.assurance"
                      disable
                      color="positive"
                      label="Souscrite"
                    />
                  </div>
                </q-item-section>
              </q-item> <!-- Assurance+ -->
              <q-separator />
              <q-item>
                <q-item-section>
                  <q-item-label>Pass competition (6€) :</q-item-label>
                  <div class="row justify-between">
                    <q-checkbox
                      v-model="user.payments.competition"
                      disable
                      color="positive"
                      label="Souscrit"
                    />
                  </div>
                </q-item-section>
              </q-item> <!-- Pass competition -->
              <q-separator />
              <q-item>
                <q-item-section>
                  <q-item-label>Loue une veste (10€) :</q-item-label>
                  <div class="row justify-between">
                    <q-checkbox
                      v-model="user.payments.breastplate"
                      disable
                      color="positive"
                      label="Oui"
                    />
                  </div>
                </q-item-section>
              </q-item> <!-- Loue une Veste -->
              <q-separator />
              <q-item>
                <q-item-section>
                  <q-item-label>Loue un pantalon (10€) :</q-item-label>
                  <div class="row justify-between">
                    <q-checkbox
                      v-model="user.payments.pants"
                      disable
                      color="positive"
                      label="Oui"
                    />
                  </div>
                </q-item-section>
              </q-item> <!-- Loue une pantalon -->
              <q-separator />
              <q-item>
                <q-item-section>
                  <q-item-label>Loue une sous-cuirasse (5€):</q-item-label>
                  <div class="row justify-between">
                    <q-checkbox
                      v-model="user.payments.underBreastplate"
                      disable
                      color="positive"
                      label="Oui"
                    />
                  </div>
                </q-item-section>
              </q-item> <!-- Loue une sous-cuirasse -->
              <q-separator />
              <q-item>
                <q-item-section>
                  <q-item-label>Loue un masque (25€) :</q-item-label>
                  <div class="row justify-between">
                    <q-checkbox
                      v-model="user.payments.mask"
                      disable
                      color="positive"
                      label="Oui"
                    />
                  </div>
                </q-item-section>
              </q-item> <!-- Loue un mask -->
              <q-separator />
              <q-item>
                <q-item-section>
                  <q-item-label>Loue un kit première touche (20€) :</q-item-label>
                  <div class="row justify-between">
                    <q-checkbox
                      :value="user.payments.childKit !== null && user.payments.childKit !== undefined ? user.payments.childKit : false"
                      disable
                      color="positive"
                      label="Oui"
                    />
                  </div>
                </q-item-section>
              </q-item> <!-- Loue un kit première touche -->
            </q-expansion-item>
          </template> <!-- Info Cotisation -->
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
                  label="Activer le compte"
                  icon="mdi-plus"
                  color="admin-primary"
                  @click="activateMember"
                />
                <q-btn
                  v-if="user.isActive"
                  label="Désactiver le compte"
                  icon="mdi-minus"
                  color="admin-primary"
                  @click="deactivateMember"
                />
              </div>
            </q-item-section>
          </q-item> <!-- Activation -->
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
        <q-btn
          v-if="!user.isActive"
          color="negative"
          flat
          label="Supprimer le compte"
          @click="confirmDeleteAccount"
        />
      </q-card-actions>
    </q-card>
    <q-dialog
      v-model="confirmDelete"
    >
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Voulez-vous vraiment supprimer cet utilisateur ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            label="Annuler"
            color="admin-primary"
          />
          <q-btn
            v-close-popup
            flat
            label="Valider"
            color="negative"
            @click="deleteAccount"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-dialog>
</template>

<script>
import { openURL } from 'quasar';
import { mapActions } from 'vuex';
import { cloudFunctions } from '../boot/firebase';
import AdminMemberPromptPaid from './AdminMemberPromptPaid';
import AdminMemberAddCertificate from './AdminMemberAddCertificate';
import AdminMemberAddCertfa from './AdminMemberAddCertfa';

export default {
  name: 'AdminMemberDetails',
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    dialogDetails: false,
    confirmDelete: false
  }),

  methods: {
    ...mapActions([
      'setAdmin',
      'activateAccount',
      'removeAccount',
      'fetchMembers',
      'changePaidInfo',
      'deactivateAccount',
      'removeMember'
    ]),

    // <editor-fold desc="Dialog Utils" defaultstate="collapsed">
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
    // </editor-fold>

    // <editor-fold desc="downloadCertificate" defaultstate="collapsed">
    downloadCertificate() {
      openURL(this.user.medicalCertificate);
    },
    // </editor-fold>

    // <editor-fold desc="setAsAdmin" defaultstate="collapsed">
    setAsAdmin() {
      this.setAdmin({ member: this.user });
      cloudFunctions.addClaimsAdmin({ uid: this.user.uid, isAdmin: true })
        .then(() => {
          this.$q.notify({
            message: 'Rôle ajouté avec succès',
            icon: 'mdi-check',
            color: 'positive'
          });
        });
    },
    // </editor-fold>

    // <editor-fold desc="activateMember" defaultstate="collapsed">
    activateMember() {
      this.activateAccount({ member: this.user });
    },
    // </editor-fold>

    // <editor-fold desc="deactivateMember" defaultstate="collapsed">
    deactivateMember() {
      this.deactivateAccount({ member: this.user });
    },
    // </editor-fold>

    // <editor-fold desc="confirmDeleteAccount" defaultstate="collapsed">
    confirmDeleteAccount() {
      this.confirmDelete = true;
    },
    // </editor-fold>

    // <editor-fold desc="deleteAccount" defaultstate="collapsed">
    deleteAccount() {
      const { uid, parentUid } = this.user;
      this.$q.loading.show({
        message: 'Suppression  du compte...'
      });
      this.removeMember({ uid, parentUid, member: this.user })
        .then(() => {
          this.$q.loading.hide();
          this.hide();
        });
    },
    // </editor-fold>

    // <editor-fold desc="setAsPaid" defaultstate="collapsed">
    setAsPaid() {
      this.$q.dialog({
        component: AdminMemberPromptPaid,
        parent: this,
        user: this.user
      });
    },
    // </editor-fold>

    // <editor-fold desc="setAsNotPaid" defaultstate="collapsed">
    setAsNotPaid() {
      const newPayments = { ...this.user.payments };
      newPayments.paid = false;
      this.changePaidInfo({ member: this.user, newPayments });
    },
    // </editor-fold>

    // <editor-fold desc="addCertificate" defaultstate="collapsed">
    addCertificate() {
      this.$q.dialog({
        component: AdminMemberAddCertificate,
        parent: this,
        user: this.user
      }).onOk(() => {
        this.fetchMembers();
        this.$q.notify({
          message: 'Certificat ajouté avec succès (un rafraîchissement de la page peut être nécessaire)',
          icon: 'mdi-check',
          color: 'positive'
        });
      });
    },
    // </editor-fold>

    // <editor-fold desc="addCerfa" defaultstate="collapsed">
    addCerfa() {
      this.$q.dialog({
        component: AdminMemberAddCertfa,
        parent: this,
        user: this.user
      }).onOk(() => {
        this.fetchMembers();
        this.$q.notify({
          message: 'Cerfa ajouté avec succès (un rafraîchissement de la page peut être nécessaire)',
          icon: 'mdi-check',
          color: 'positive'
        });
      });
    },
    // </editor-fold>

    // <editor-fold desc="downloadCerfa" defaultstate="collapsed">
    downloadCerfa() {
      openURL(this.user.cerfa);
    }
    // </editor-fold>
  }
};
</script>

<style lang="scss" scoped>
  .w-60 {
    width: 60%;
  }
</style>
