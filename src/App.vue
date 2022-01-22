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
import ReservationForm from '@/components/ReservationForm.vue';
import { ReservationInterface } from '@/interfaces/reservation.interface';

@Component({
  components: {
    ReservationForm,
  },
})
export default class App extends Vue {
  private reservationData: ReservationInterface[] = [
    {
      name: 'Amalfi Luxury Hotel',
      price: 1000,
      rating: 5,
      ratingCounter: 100,
      unavailableDates: ['20.01.2022'],
    },
    {
      name: 'Dea Guest House',
      price: 298,
      rating: 3.5,
      ratingCounter: 123,
      unavailableDates: ['06.01.2022', '07.01.2022', '20.01.2022'],
    },
    {
      name: 'Amalfi B&B',
      price: 200,
      rating: 3,
      ratingCounter: 20,
      unavailableDates: ['20.02.2022', '21.02.2022', '20.01.2022'],
    },
    {
      name: 'Luxury Hotel',
      price: 550,
      rating: 4.5,
      ratingCounter: 50,
      unavailableDates: ['20.01.2022'],
    },
  ];

  get randomReservationData(): ReservationInterface {
    return this.reservationData[Math.floor(Math.random() * this.reservationData.length)];
  }

  get reservation(): ReservationInterface {
    return this.randomReservationData;
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
