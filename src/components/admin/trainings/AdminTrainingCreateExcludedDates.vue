<template>
  <div>
    <section-title text="Date de vacance et d'absence" />
    <div class="row q-mx-lg items-center">
      <date-selector
        v-model="newExcludedDate"
        class="col-12 col-md-5 q-mr-md"
        color="admin-primary"
        error-message="erreur"
        label="Date d'absence"
        required
        :options="isGoodDay"
      />
      <q-btn
        label="Ajouter"
        color="positive"
        icon="mdi-plus"
        class="col-12 col-md-auto q-mr-md"
        rounded
        @click="onClickAdd"
      />
    </div>
    <div
      v-for="(item, index) in excludedDatesTemp"
      :key="index"
      class="row q-mx-lg items-center"
    >
      <date-selector
        :value="item"
        class="col-12 col-md-5 q-mr-md"
        color="admin-primary"
        error-message="erreur"
        label="Date d'absence"
        required
        readonly
        :options="isGoodDay"
      />
      <q-btn
        label="Supprimer"
        color="negative"
        icon="mdi-minus"
        class="col-12 col-md-auto q-mr-md"
        rounded
        @click="deleteItem(index)"
      />
    </div>
  </div>
</template>

<script>
import { date as quasarDate } from 'quasar';
import DateSelector from '../../utils/DateSelector';
import SectionTitle from '../../utils/sectionTitle';

export default {
  name: 'AdminTrainingCreateExcludedDates',
  components: { SectionTitle, DateSelector },

  data: () => ({
    newExcludedDate: null,
    excludedDatesTemp: []
  }),

  computed: {
    excludedDates() {
      return { excludedDates: this.excludedDatesTemp.filter((date) => date.getDay() === this.day) };
    },

    day() {
      const { day } = this.$parent.$parent.$parent.daysData;
      return day;
    }
  },

  methods: {
    // <editor-fold desc="isGoodDay" defaultstate="collapsed">
    isGoodDay(date) {
      if (this.day) {
        const d = quasarDate.extractDate(date, 'YYYY/MM/DD');
        return d.getDay() === this.day;
      }
      return false;
    },
    // </editor-fold>

    // <editor-fold desc="onClickAdd" defaultstate="collapsed">
    onClickAdd() {
      const exist = this.excludedDatesTemp.find((date) => date.getTime() === this.newExcludedDate.getTime());
      if (this.newExcludedDate && !exist && this.newExcludedDate.getDay() === this.day) {
        this.excludedDatesTemp.push(this.newExcludedDate);
        this.newExcludedDate = quasarDate.addToDate(this.newExcludedDate, { days: 7 });
      }
    },
    // </editor-fold>

    // <editor-fold desc="deleteItem" defaultstate="collapsed">
    deleteItem(index) {
      this.excludedDatesTemp.splice(index, 1);
    }
    // </editor-fold>
  }
};
</script>

<style scoped>

</style>
