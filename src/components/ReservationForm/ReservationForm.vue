<template>
  <div :class="{ 'error': hasError }"
       class="reservation-form form d-flex justify-center">
    <div class="form-container d-flex flex-column">
      <div class="top d-flex flex-2 justify-space-between">
        <ReservationInfo :price="price"
                         :rating="rating"
                         :rating-counter="ratingCounter"/>
        <div class="btn-container">
          <button :class="{ 'disabled': btnDisabled, 'error': hasError }"
                  class="btn submit-btn">
            reserve
          </button>
        </div>
      </div>
      <div class="bottom flex-1">
        <DateRangePicker :type.sync="type"
                         :show-calendar.sync="showCalendar"
                         :date-range="dateRange"/>
        <div class="notice-container">
          <span v-show="hasError" class="error-notice font-size-small">
            The start date must be before the end date
          </span>
        </div>
        <div class="calendar-container d-flex justify-center">
          <Calendar :unavailable-dates="unavailableDates"
                    :date-range.sync="dateRange"
                    :has-error="hasError"
                    :type="type"
                    v-show="showCalendar"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { DateRangeInterface } from '@/interfaces/date-range.interface';
import DateRangePicker from '@/components/ReservationForm/DateRangePicker.vue';
import Calendar from '@/components/ReservationForm/Calendar/Calendar.vue';
import ReservationInfo from '@/components/ReservationForm/ReservationInfo.vue';

@Component({
  components: {
    ReservationInfo,
    DateRangePicker,
    Calendar,
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

  private type: 'start' | 'end' | '' = '';

  private showCalendar: boolean = false;

  private dateRange: DateRangeInterface = {
    start: '',
    end: '',
  };

  get btnDisabled(): boolean {
    return !this.dateRange.start.length || !this.dateRange.end.length;
  }

  get hasError(): boolean {
    const startAsMoment = this.$moment(this.dateRange.start, 'DD-MM-YYYY');
    const endAsMoment = this.$moment(this.dateRange.end, 'DD-MM-YYYY');

    return endAsMoment.isSameOrBefore(startAsMoment);
  }
}
</script>

<style lang="scss">
 .reservation-form {
    cursor: pointer;
    width: 40vw;
    min-width: 348px;
    height: var(--reservation-form-height);
    min-height: 180px;

   &.error {
     border-color: var(--v-error-base);
   }

   .form-container {
     width: 90%;

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
       padding-top: 4px;
       height: 10px;

       .error-notice {
         color: var(--v-error-base);
       }
     }

     .calendar-container {
       height: 10px;
     }
   }
  }
</style>
