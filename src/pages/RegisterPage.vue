<template lang="html">
  <q-page>
    <div class="row justify-center">
      <div class="page-padded col-12 col-md-8">
        <div class="q-pt-md">
          <q-stepper
            ref="stepper"
            v-model="step"
            color="primary"
            animated
          >
            <q-step
              :name="1"
              title="Informations avant de commencer"
              icon="settings"
              :done="step > 1"
            >
              <div>
                <div>
                  <p>
                    Remplir ce formulaire ne vous prendra pas plus de 5 minutes.
                    Merci de le compléter CORRECTEMENT.
                    Avant de commencer, vous devez avoir préparé le certificat médical
                    au format PDF, renommé "NOM Prénom".
                  </p>
                  <p>
                    L'inscription ne sera définitive qu'après avoir les dossiers COMPLETS
                    (Paiements, certificat médical,...)
                  </p>
                </div>
              </div>
            </q-step>
            <q-step
              :name="2"
              title="Licencié"
              icon="account_circle"
              :done="step > 2"
            >
              <div
                class="q-gutter-md"
                style="max-width: 300px"
              >
                <div class="row">
                  <div class="col">
                    <q-input
                      v-model="name"
                      label="Nom"
                      :rules="[val => !!val || 'Le nom doit être donné']"
                    />
                    <div class="col">
                      <q-input
                        v-model="lastname"
                        label="Prenom"
                        :rules="[val => !!val || 'Le prénom doit être donné']"
                      />
                    </div>
                  </div>
                </div>
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
                  mask="##/##/####"
                  label="Date de naissance"
                  hint="JJ/MM/AAAA"
                >
                  <template v-slot:prepend>
                    <q-icon
                      name="event"
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
              </div>
            </q-step>
            <q-step
              :name="3"
              title="Certificat médical"
              caption=""
              icon="create_new_folder"
              :done="step > 3"
            >
              <div>
                <q-uploader
                  url="http://localhost:4444/upload"
                  label="Certificat médicale"
                  simple
                  :accept="acceptedTypes"
                  style="max-width: 300px"
                  hint="fichier < 2Ko et au format pdf"
                />
                <div>
                  <a href="http://www.escrime-ffe.fr/commission-medicale/certificats-medicaux-et-procedure-de-surclassements">
                    Pour plus d'informations, cliquer ici
                  </a>
                  <p>
                    Certificat médical : Nouveaux inscrits :
                    il faut consulter un médecin et fournir un certificat médical.
                  </p>
                  <p>
                    Réinscriptions : Le certificat médical est valable 3 ans, sauf pour les plus de
                    40 ans, à condition de s’auto-évaluer avec le questionnaire CERFA.
                    Si vous répondez non à toutes les questions, il suffit de nous remettre
                    une attestation signée. Dans le cas contraire, et pour les plus de 40 ans,
                    il faut consulter un médecin et fournir un nouveau certificat médical.
                    [Certificat médical spécial 40 ans et plus]
                  </p>
                  <p>
                    Certificat médical spécifique à certaines catégories
                    (vétérans,surclassement,...) Le club ou le maître d'armes se réserve
                    le droit d'interdire l'accès aux pistes si l'adhérent n'a pas fourni
                    de certificat médical après les 2 premières séances.
                  </p>
                </div>
                <q-input
                  v-model="certifDate"
                  :rules="[val => !!val
                    || 'Veuillez entrer la date d\'édition du certificat médical']"
                  mask="##/##/####"
                  label="Date d'édition du certificat médical"
                  hint="JJ/MM/AAAA"
                >
                  <template v-slot:prepend>
                    <q-icon
                      name="event"
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
              </div>
            </q-step>
            <q-step
              :name="4"
              title="Coordonnées"
              icon="home"
              :done="step > 4"
            >
              <div>
                <q-input
                  v-model="adress"
                  label="Adresse"
                  :rules="[val => !!val || 'Veuillez entrer votre adresse']"
                >
                  <template v-slot:prepend>
                    <q-icon name="home" />
                  </template>
                </q-input>
                <q-input
                  v-model="postalCode"
                  label="Code postal"
                  mask="## ###"
                  :rules="[val => !!val || 'Veuillez entrer votre code postale']"
                >
                  <template v-slot:prepend>
                    <q-icon name="home" />
                  </template>
                </q-input>
                <q-input
                  v-model="city"
                  label="Ville"
                  :rules="[val => !!val || 'Veuillez entrer votre ville']"
                >
                  <template v-slot:prepend>
                    <q-icon name="home" />
                  </template>
                </q-input>
                <q-input
                  v-model="mail"
                  label="Adresse Mail"
                  :rules="[val => !!val || 'Veuillez entrer une adresse mail']"
                >
                  <template v-slot:prepend>
                    <q-icon name="mail" />
                  </template>
                </q-input>
                <p>
                  L'adresse e-mail que vous allez renseigner est celle
                  que vous utiliserez pour vous connecter et
                  à laquelle vous recevrez les informations du club >>> vérifiez vos spams !
                </p>
                <q-input
                  v-model="phone"
                  label="Télephone portable"
                  mask="##-##-##-##-##"
                  :rules="[val => !!val || 'Veuillez entrer votre numéro de téléphone']"
                >
                  <template v-slot:prepend>
                    <q-icon name="local_phone" />
                  </template>
                </q-input>
                <p>
                  Le numéro de portable que vous allez renseigner est celui où l'on peut vous
                  joindre le plus facilement
                </p>
                <q-input
                  v-model="emergencyPhone"
                  label="Télephone à contacter en cas d'urgence"
                  mask="##-##-##-##-##"
                  :rules="[val => !!val
                    || 'Veuillez entrer un numéro de téléphone à contacter en cas d\'urgence']"
                >
                  <template v-slot:prepend>
                    <q-icon name="local_phone" />
                  </template>
                </q-input>
              </div>
            </q-step>
            <q-step
              :name="5"
              title="Latéralité et Catégorie"
              icon="add_comment"
              :done="step > 5"
            >
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

              <q-select
                v-model="category"
                :options="categoryOptions"
                label="Catégorie"
              />
              <p>M = "Moins de "</p>
            </q-step>
            <q-step
              :name="6"
              title="Moyens de paiement"
              icon="euro_symbol"
              :done="step > 6"
            >
              <q-radio
                v-model="paymentMethod"
                val="Check"
                label="Chèque"
              />
              <q-radio
                v-model="paymentMethod"
                val="Cash"
                label="Espèces"
              />
            </q-step>
            <template v-slot:navigation>
              <q-stepper-navigation>
                <div class="float-right">
                  <q-btn
                    color="primary"
                    :label="step === 6 ? 'Valider' : 'Suite'"
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
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="js">
export default {
  name: 'RegisterLayout',
  data: () => ({
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
      'M5 (2015-2016)',
      'M7 (2013-2014)',
      'M9 (2011-2012)',
      'M11 (2009-2010)',
      'M13 (2007-2008)',
      'M15 (2005-2006)',
      'M17 (2003-2004)',
      'M20 (2000-2001-2002)',
      'Sénior (1981-1999)',
      'Vétérans (1980 et avant)'
    ]
  }),

  computed: {
    acceptedTypes() {
      return 'image/*, application/pdf';
    }
  },

  methods: {
    checkFile(files) {
      return files.filter(file => file.type === 'application/pdf' && file.size < 2097152);
    }
  }
};
</script>
