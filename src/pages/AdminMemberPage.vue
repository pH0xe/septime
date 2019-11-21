<template>
  <q-page class="q-ma-md">
    <h5 class="text-h5 q-my-md">
      Liste des membres
    </h5>
    <div class="row items-center q-pb-lg">
      <q-btn
        label="Ajouter"
        icon-right="mdi-plus"
        color="primary"
        @click="toggleDialogAddMember"
      />
      <div class="col">
        <q-input
          v-model="searchBar"
          type="search"
          label="Rechercher..."
          class="q-ml-md"
        >
          <template v-slot:append>
            <q-icon name="mdi-magnify" />
          </template>
        </q-input>
      </div>
    </div>
    <q-table
      :data="users"
      :filter="searchBar"
      :filter-method="filterUsers"
      :columns="column"
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      @row-click="toggleDialogMemberDetails"
    >
      <template v-slot:body-cell-member-avatar="props">
        <q-td
          :props="props"
          auto-width
        >
          <q-avatar>
            <img :src="props.row.avatar">
          </q-avatar>
        </q-td>
      </template>
    </q-table>

    <!-- dialog to view all details of a member -->
    <q-dialog
      v-model="dialogDetails"
      class="popupMember"
    >
      <q-card class="w-50">
        <q-card-section class="text-h5">
          {{ memberDetails.lastName }} {{ memberDetails.firstName }}
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>Catégorie :</q-item-label>
                <q-item-label caption>
                  {{ memberDetails.group }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item>
              <q-item-section>
                <q-item-label>Date de naissance :</q-item-label>
                <q-item-label caption>
                  {{ memberDetails.birth }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item>
              <q-item-section>
                <q-item-label>Compte validé :</q-item-label>
                <q-toggle
                  :disable="memberDetails.active"
                  :value="memberDetails.active"
                  color="green"
                  checked-icon="mdi-check"
                  unchecked-icon="mdi-window-close"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-space />
          <q-btn
            v-close-popup
            flat
            label="Fermer"
            color="teal-6"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- dialog to add member into database -->
    <q-dialog
      v-model="dialogAddMember"
      full-width
    >
      <q-card style="height:80%">
        <q-stepper
          ref="stepper"
          v-model="step"
          alternative-labels
          color="teal-6"
          animated
        >
          <q-step
            :name="1"
            title="Licencié"
            icon="mdi-pencil"
            :done="step > 1"
          >
            <q-input
              v-model="name"
              label="Nom"
              :rules="[val => !!val || 'Le nom doit être donné']"
            />
            <q-input
              v-model="lastname"
              label="Prenom"
              :rules="[val => !!val || 'Le prénom doit être donné']"
            />
            <q-input
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              label="Mot de passe"
              :rules="[val => !!val || 'Le mot de passe doit être rentré']"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-input
              v-model="birthday"
              :rules="[val => !!val || 'Veuillez entrer votre date de naissance']"
              label="Date de naissance"
              hint="JJ/MM/AAAA"
            >
              <template
                v-slot:prepend
              >
                <q-icon
                  name="mdi-calendar"
                  class="cursor-pointer"
                >
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="birthday"
                      mask="DD/MM/YYYY"
                      @input="() => $refs.qDateProxy.hide()"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-step>
          <q-step
            :name="2"
            title="Certificats médicaux et photo"
            icon="mdi-folder-plus"
            :done="step > 2"
          >
            <q-uploader
              url="http://localhost:4444/upload"
              label="Certificat médical"
              simple
              :filter="checkFile"
              style="max-width: 300px"
              hint="fichier < 2Ko et au format pdf"
              class="q-ma-lg"
            />
            <q-input
              v-model="certifDate"
              :rules="[val => !!val || 'Veuillez entrer la date ' +
                'd\'édition du certificat médical']"
              hint="JJ/MM/AAAA"
              label="Date d'édition du certificat médical"
              class="q-ma-lg"
            >
              <template v-slot:prepend>
                <q-icon
                  name="mdi-calendar"
                  class="cursor-pointer"
                >
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="certifDate"
                      mask="DD/MM/YYYY"
                      @input="() => $refs.qDateProxy.hide()"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-uploader
              url="http://localhost:4444/upload"
              label="Photo de l'adhérent"
              simple
              accept=".jpg, .png"
              style="max-width: 300px"
              hint="fichier < 2Ko et au format jpeg ou png"
              class="q-ma-lg"
            />
          </q-step>
          <q-step
            :name="3"
            title="Coordonnées"
            icon="mdi-home"
            :done="step > 3"
          >
            <q-input
              v-model="adress"
              label="Adresse"
              :rules="[val => !!val || 'Veuillez entrer l\'adresse']"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-home" />
              </template>
            </q-input>
            <q-input
              v-model="postalCode"
              label="Code postal"
              mask="## ###"
              :rules="[val => !!val || 'Veuillez entrer le code postale']"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-home" />
              </template>
            </q-input>
            <q-input
              v-model="city"
              label="Ville"
              :rules="[val => !!val || 'Veuillez entrer la ville']"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-home" />
              </template>
            </q-input>
            <q-input
              v-model="mail"
              label="Adresse Mail"
              :rules="[val => !!val || 'Veuillez entrer une adresse mail']"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-email" />
              </template>
            </q-input>
            <q-input
              v-model="phone"
              label="Télephone portable"
              mask="##-##-##-##-##"
              :rules="[val => !!val || 'Veuillez entrer le numéro de téléphone']"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-phone" />
              </template>
            </q-input>
            <q-input
              v-model="emergencyPhone"
              label="Télephone à contacter en cas d'urgence"
              mask="##-##-##-##-##"
              :rules="[val => !!val
                || 'Veuillez entrer un numéro de téléphone à contacter en cas d\'urgence']"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-phone" />
              </template>
            </q-input>
          </q-step>
          <q-step
            :name="4"
            title="Latéralité et Catégorie"
            icon="add_comment"
            :done="step > 4"
          >
            <q-item>
              <q-item-section>
                <q-item-label>Latéralité</q-item-label>
                <q-radio
                  v-model="mainHand"
                  val="left"
                  label="Gauche"
                />
                <q-radio
                  v-model="mainHand"
                  val="right"
                  label="Droite"
                />
              </q-item-section>
            </q-item>

            <q-select
              v-model="category"
              :options="categoryOptions"
              label="Catégorie"
            />
            <p>M = "Moins de "</p>
          </q-step>
          <q-step
            :name="5"
            title="information supplémentaire"
            icon="mdi-currency-eur"
            :done="step > 6"
          >
            <div>
              <q-toggle
                v-model="compet"
                checked-icon="mdi-check"
                color="green"
                unchecked-icon="mdi-close"
                label="Pass compétition souscrit"
              />
            </div>
            <div>
              <q-toggle
                v-model="assurance"
                checked-icon="mdi-check"
                color="green"
                unchecked-icon="mdi-close"
                label="Assurance+ souscrite"
              />
            </div>
            <div>
              <q-toggle
                v-model="paid"
                checked-icon="mdi-check"
                color="green"
                unchecked-icon="mdi-close"
                label="Payement fournis"
              />
            </div>
            <div>
              <q-toggle
                v-model="rent"
                checked-icon="mdi-check"
                color="green"
                unchecked-icon="mdi-close"
                label="Location de matériel"
              />
            </div>
          </q-step>
          <template v-slot:navigation>
            <q-stepper-navigation class="q-mb-lg">
              <div class="float-right">
                <q-btn
                  color="primary"
                  :label="step === 5 ? 'Valider' : 'Suite'"
                  @click="$refs.stepper.next"
                />
              </div>
              <div class="float-left">
                <q-btn
                  v-if="step > 1"
                  color="primary"
                  label="Back"
                  @click="$refs.stepper.previous"
                />
              </div>
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>

import users from '../users';

const columns = [
  {
    name: 'member-avatar',
    label: 'Photo',
    align: 'left',
    field: 'avatar',
    sortable: false

  },
  {
    name: 'firstName',
    label: 'Prénom',
    align: 'left',
    field: 'firstName',
    sortable: true
  },
  {
    name: 'lastName',
    label: 'Nom',
    align: 'left',
    field: 'lastName',
    sortable: true
  },
  {
    name: 'group',
    label: 'Catégorie',
    align: 'left',
    field: 'group',
    sortable: true
  },
  {
    name: 'btnMore',
    label: '',
    align: 'left',
    sortable: false
  }
];
export default {
  name: 'MemberPage',
  data() {
    return {
      users,
      column: columns,
      text: '',
      pagination: {
        rowsPerPage: 0
      },
      dialogDetails: false,
      memberDetails: users[0],
      dialogAddMember: false,
      step: 1,
      name: '',
      lastname: '',
      password: '',
      isPwd: true,
      certifDate: '',
      adress: '',
      postalCode: '',
      city: '',
      mail: '',
      phone: '',
      emergencyPhone: '',
      birthday: '',
      paymentMethod: '',
      mainHand: '',
      category: null,
      categoryOptions: [
        'M5 (2015-2016)', 'M7 (2013-2014)', 'M9 (2011-2012)',
        'M11 (2009-2010)',
        'M13 (2007-2008)',
        'M15 (2005-2006)',
        'M17 (2003-2004)',
        'M20 (2000-2001-2002)',
        'Sénior (1981-1999)',
        'Vétérans (1980 et avant)'
      ],
      assurance: false,
      paid: false,
      rent: false,
      compet: false,
      searchBar: ''
    };
  },
  methods: {
    toggleDialogMemberDetails(event, row) {
      this.dialogDetails = true;
      this.memberDetails = row;
    },
    toggleDialogAddMember() {
      this.dialogAddMember = true;
    },
    checkFile(files) {
      return files.filter(file => file.type === 'image/pdf' && file.size < 2097152);
    },

    filterUsers(rows, lookFor) {
      // Sanitize input
      lookFor = lookFor.toLowerCase();

      // Copy the rows to work on them
      let results = rows;

      // Split the search string into words
      // Cut at each sequence of whitespaces
      lookFor.split(/\s+/).forEach((searchWord) => {
        // Affinate the previous results with the current word
        results = results
          .filter(({ firstName, lastName }) => (
            firstName.toLowerCase().includes(searchWord)
              || lastName.toLowerCase().includes(searchWord)
          ));
      });

      // Return them
      return results;
    }
  }
};


</script>

<style lang="scss" scoped>
.w-50 {
  width: 50%;
}
</style>
