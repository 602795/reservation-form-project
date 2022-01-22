<template>
  <div id="app">
    <div class="d-flex align-center justify-center montserrat-font">
      <ReservationForm :price="reservation.price"
                       :rating="reservation.rating"
                       :rating-counter="reservation.ratingCounter"
                       :unavailable-dates="reservation.unavailableDates"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ReservationForm from '@/components/ReservationForm/ReservationForm.vue';
import { ReservationInterface } from '~/interfaces/reservation.interface';
import reservationDataMock from './mocks/reservation-data.json';

@Component({
  components: {
    ReservationForm,
  },
})
export default class App extends Vue {
  private reservationData: ReservationInterface[] = reservationDataMock;

  get reservation(): ReservationInterface {
    return this.reservationData[Math.floor(Math.random() * this.reservationData.length)];
  }
}
</script>

<style lang="scss">
  @import 'style/globals/main';

  #app {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px;
  }
</style>
