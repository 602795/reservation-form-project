<template>
  <div :class="{ 'error': hasError }"
       class="reservation-form form d-flex justify-center">
    <div class="form-container d-flex flex-column">
      <div class="top d-flex flex-2 justify-space-between">
        <div class="left">
          <div class="price font-size-medium font-bold d-flex align-start">{{ price }} zł</div>
          <div class="rating d-flex">
            <div :key="index"
                 :class="{ 'green': rating > value || value - 0.5 === rating }"
                 v-for="(value, index) in 5">
              <span :class="[ `mdi-star${getIconName(value)}`, 'mdi' ]"></span>
            </div>
            <span class="rating-counter font-bold font-size-small">{{ ratingCounter }}</span>
          </div>
        </div>
        <div class="right">
          <button :class="{ 'disabled': reserveDisabled, 'error': hasError }"
                  class="btn submit-btn">
            reserve
          </button>
        </div>
      </div>
      <div class="bottom flex-1">
        <DateRange :unavailable-dates="unavailableDates"
                   :has-error="hasError"
                   :date-range.sync="dateRange"/>
        <div class="notice-container">
          <span v-show="hasError" class="error-notice font-size-small">
            Data początku musi być przed datą końca
          </span>
        </div>
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

  private dateRange: DateRangeInterface = {
    start: '',
    end: '',
  };

  get reserveDisabled(): boolean {
    return !this.dateRange.start.length || !this.dateRange.end.length;
  }

  get hasError(): boolean {
    const startAsMoment = this.$moment(this.dateRange.start, 'DD-MM-YYYY');
    const endAsMoment = this.$moment(this.dateRange.end, 'DD-MM-YYYY');
    return endAsMoment.isSameOrBefore(startAsMoment);
  }

  getIconName(value: number): string {
    if (this.rating > value) return '';
    if (value - 0.5 === this.rating) return '-half-full';
    return '-outline';
  }
}
</script>

<style lang="scss">
 .reservation-form {
    width: 40vw;
    min-width: 348px;
    height: var(--reservation-form-height);
    min-height: 160px;
   &.error {
     border-color: var(--v-error-base);
   }
   .form-container {
     width: 90%;
     .rating {
       .green {
         color: var(--v-main-green-base);
       }
       .rating-counter {
         margin: 2px 0 0 4px;
       }
     }
   }
   .btn {
     &.disabled, &.error {
       cursor: not-allowed;
     }
     &.disabled {
       opacity: .2;
     }
     &.error {
       background-color: var(--v-error-base);
     }
   }
   .notice-container {
     height: 10px;
     .error-notice {
       color: var(--v-error-base);
     }
   }
  }
</style>
