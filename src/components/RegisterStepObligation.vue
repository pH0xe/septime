<template lang="html">
  <q-form @submit="onSubmit">
    <div>
      <h5 class="text-h5">
        Avant de valider votre inscription, nous vous rappelons que toute inscription au Cercle d'Escrime de Moirans implique d'accepter et de se conformer entre autre aux points suivants :
      </h5>
      <q-list
        separator
        bordered
      >
        <q-item v-ripple>
          <q-item-section>
            • L'adhérent s'engage à fournir au CEM un certificat de non contre-indication à la pratique de l’escrime en entraînement et en compétition daté de moins de trois mois avant le début des entraînements.
          </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-item-section>
            • L'adhérent s'engage à régler au CEM l’ensemble des sommes dues pour valider l’inscription dès validation de son dossier.
          </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-item-section>
            • L'adhérent s’engage à s'équiper d’un gant personnel pour l’escrime dès le début de la saison.
          </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-item-section>
            • L'adhérent ou son responsable légal autorisent les dirigeants et encadrants du CEM à prendre, le cas échéant, toutes mesures d’urgence médicale nécessitées par l’état de santé de l’adhérent.
          </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-item-section>
            • Pour un adhérent mineur, son responsable légal autorise le déplacement de l’enfant en voiture particulière ou transport collectif, pour se rendre aux compétitions, aux stages d'escrime ou toutes activités proposées par le club.
          </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-item-section>
            • L’adhérent accepte qu'il puisse être filmé et photographié à visage couvert ou découvert dans le cadre des activités du club. L'adhérent autorise le CEM à diffuser ces images sur son site internet et tout support de communication du club, leur accorde tous droits de représentation du ou des films et photographies ainsi réalisé(s).
          </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-item-section>
            • Par sa signature, l’adhérent ou son représentant légal reconnaît avoir pris connaissance du règlement intérieur du CEM (consultable à la salle) et en accepter toutes les clauses, sous peine de sanction ou d’exclusion en cas de manquement.
          </q-item-section>
        </q-item>
      </q-list>

      <q-checkbox
        v-model="confirmRules"
        label="J'ai lu les conditions obligatoires à toute inscription au CEM, et je les approuve sans condition"
        color="primary"
        :error="$v.confirmRules.$error"
        error-message="Ce champ est requis"
        @blur="$v.confirmRules.$touch"
        @input="$v.confirmRules.$touch"
      />
      <div
        v-if="error"
        class="text-negative">
        Veuillez confirmer
      </div>
    </div>

    <q-stepper-navigation>
      <q-btn
        label="Suivant"
        type="submit"
        unelevated
        color="primary"
        class="on-left"
      />
      <q-btn
        label="Précédent"
        flat
        color="primary"
        @click="onGoBack"
      />
    </q-stepper-navigation>
  </q-form>
</template>

<script lang="js">
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'RegisterStepObligation',
  mixins: [validationMixin],

  data: () => ({
    confirmRules: false,
    error: false
  }),

  validations: {
    confirmRules: {
      required
    }
  },

  methods: {
    onSubmit() {
      this.$v.$touch();

      if (this.confirmRules === false) this.error = true;

      if (!this.$v.$invalid && this.confirmRules === true) {
        this.$emit('submit');
      }
    },

    onGoBack() {
      this.$emit('go-back');
    }
  }
};
</script>
