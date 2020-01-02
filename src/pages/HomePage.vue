<template lang="html">
  <div class="row items-center justify-center">
    <q-img
      src="https://source.unsplash.com/random/1000x200"
      :ratio="ratioMainImage"
    >
      <div class="absolute-full flex flex-center column">
        <div class="text-h3 text-uppercase text-weight-light">
          Main title
        </div>
        <div class="text-subtitle1 text-center">
          A falsis, nutrix superbus orgia. Noster mineralis una apertos victrix est.
        </div>
      </div>
    </q-img>

    <div class="page-padded col-12 col-md-8 q-px-sm">
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
          <news-card
            title="Grandis etiam aonides est."
            content="Luba de peritus guttus, vitare fides!"
            img-src="https://source.unsplash.com/random"
            :date="new Date()"
          />
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
          <lesson-card />
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
        <div
          v-for="i in [1, 2, 3]"
          :key="i"
          class="col-12 col-md-4"
        >
          <event-card
            title="Ubi est peritus bromium?"
            :categories="['M20', 'M17']"
            :date="new Date()"
            :time-range="[13, 17]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import NewsCard from '../components/NewsCard';
import LessonCard from '../components/LessonCard';
import EventCard from '../components/EventCard';

export default {
  name: 'HomePage',
  components: { EventCard, LessonCard, NewsCard },
  computed: {
    ratioMainImage() {
      return this.$q.platform.is.mobile ? 4 / 3 : 1000 / 200;
    }
  }
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
