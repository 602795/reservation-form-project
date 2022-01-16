<template>
  <div class="reservation-form d-flex justify-center">
    <div class="form-container d-flex flex-column">
      <div class="top d-flex flex-2 justify-space-between">
        <div class="left">
          <div class="price font-size-medium font-bold">{{ price }} zł</div>
          <div class="rating d-flex">
            <div :key="index"
                 :class="{ 'green-color': rating > value || value - 0.5 === rating }"
                 v-for="(value, index) in 5">
              <span :class="[ `mdi-star${getIconName(value)}`, 'mdi' ]"></span>
            </div>
            <span class="rating-counter font-bold font-size-small">{{ ratingCounter }}</span>
          </div>
        </div>
        <div class="right">
          <button class="btn submit-btn">
            reserve
          </button>
        </div>
      </div>
      <div class="bottom flex-1">
        <DateRange/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { DateRangeInterface } from '@/interfaces/date-range.interface';
import DateRange from '@/components/DateRange.vue';

@Component({
  components: {
    DateRange,
  },
})
export default class ReservationForm extends Vue {
  @Prop()
  readonly price!: number;

  @Prop()
  readonly rating!: number;

  @Prop()
  readonly ratingCounter!: number;

  @Prop()
  readonly unavailableDates!: string[];

  private dateRange: Partial<DateRangeInterface> = {};

  getIconName(value: number): string {
    if (this.rating > value) return '';
    if (value - 0.5 === this.rating) return '-half-full';
    return '-outline';
  }
}
</script>

<style lang="scss">
 .reservation-form {
    --box-shadow-color: #dfdede;

    width: 30vw;
    height: 20vh;

    padding: 3vh 0;
    border: 2px solid #fff;
    border-radius: 20px;
    box-shadow: 1px 1px 20px 2px var(--box-shadow-color);
   .form-container {
     width: 90%;
     .rating-counter {
       margin: 2px 0 0 4px;
     }
   }
  }
</style>
