<template lang="html">
  <div class="row items-center justify-center">
    <q-img
      src="https://source.unsplash.com/random/1000x200"
      :ratio="1000/200"
    >
      <div class="absolute-full flex flex-center column">
        <div class="text-h3 text-uppercase text-weight-light">
          Main title
        </div>
        <div class="text-subtitle1">
          A falsis, nutrix superbus orgia. Noster mineralis una apertos victrix est.
        </div>
      </div>
    </q-img>

    <div class="page-padded col-12 col-md-8">
      <div class="row">
        <div class="col">
          <h5 class="text-h5">
            Dernières actualités
            <q-btn
              flat
              icon="mdi-dots-horizontal"
            />
          </h5>
          <q-separator class="separator-margin" />
        </div>
      </div>

      <div class="row q-col-gutter-md">
        <div
          v-for="i in [1, 2, 3]"
          :key="i"
          class="col-12 col-md-4"
        >
          <q-card
            flat
            bordered
          >
            <q-img
              src="https://source.unsplash.com/random"
              :ratio="2/1"
            >
              <div class="absolute-bottom">
                <div class="text-h6">
                  Grandis etiam aonides est.
                </div>
                <div class="text-subtitle1">
                  Luba de peritus guttus, vitare fides!
                </div>
              </div>
            </q-img>
          </q-card>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h5 class="text-h5">
            Prochain cours
            <q-btn
              flat
              icon="mdi-dots-horizontal"
            />
          </h5>
          <q-separator class="separator-margin" />
        </div>
      </div>

      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-card
            flat
            bordered
          >
            <q-card-section class="text-h5">
              Demain à 15h
            </q-card-section>
            <q-card-section>
              Avec Mr. X
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                flat
                icon="mdi-check"
              />
              <q-btn
                flat
                icon="mdi-close"
              />
            </q-card-actions>
          </q-card>
        </div>

        <div class="col-12 col-md-4">
          <q-card
            flat
            bordered
          >
            <q-card-section class="text-h5">
              Le 19/11 à 15h
            </q-card-section>
            <q-card-section>
              Avec Mr. X
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                flat
                icon="mdi-check"
              />
              <q-btn
                flat
                icon="mdi-close"
              />
            </q-card-actions>
          </q-card>
        </div>

        <div class="col-12 col-md-4">
          <q-card
            flat
            bordered
          >
            <q-card-section class="text-h5">
              Le 3/12 à 17h
            </q-card-section>
            <q-card-section>
              Avec Mr. X
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                flat
                icon="mdi-check"
              />
              <q-btn
                flat
                icon="mdi-close"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h5 class="text-h5">
            Prochain évenements
            <q-btn
              flat
              icon="mdi-dots-horizontal"
            />
          </h5>
          <q-separator class="separator-margin" />
        </div>
      </div>

      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-card
            flat
            bordered
          >
            <q-card-section class="text-h5">
              Compétition X
            </q-card-section>
            <q-card-section>
              13/11, 14-18h. Débutant
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                flat
                icon="mdi-check"
              />
              <q-btn
                flat
                icon="mdi-account-plus"
              />
            </q-card-actions>
          </q-card>
        </div>

        <div class="col-12 col-md-4">
          <q-card
            flat
            bordered
          >
            <q-card-section class="text-h5">
              Compétition X
            </q-card-section>
            <q-card-section>
              13/11, 14-18h. Débutant
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                flat
                icon="mdi-check"
              />
              <q-btn
                flat
                icon="mdi-account-plus"
              />
            </q-card-actions>
          </q-card>
        </div>

        <div class="col-12 col-md-4">
          <q-card
            flat
            bordered
          >
            <q-card-section class="text-h5">
              Compétition X
            </q-card-section>
            <q-card-section>
              13/11, 14-18h. Débutant
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                flat
                icon="mdi-check"
              />
              <q-btn
                flat
                icon="mdi-account-plus"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
export default {
  name: 'HomePage'
};
</script>

<style lang="scss" scoped>
  .text-h5 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .separator-margin {
    margin-bottom: 1rem;
  }
</style>
