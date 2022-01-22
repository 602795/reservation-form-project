<template>
  <div class="calendar form d-flex justify-center">
    <div class="calendar-plus-switcher d-flex flex-column">
      <MonthSwitcher :month="month"
                     :base-moment="baseMoment"
                     :year="year"
                     @next-month="changeMonth('next')"
                     @prev-month="changeMonth('prev')"/>
      <div class="d-flex justify-center">
        <div class="monthly-calendar-container flex-column">
          <Weekdays/>
          <MonthlyCalendar :date-range="dateRange"
                           :base-moment="baseMoment"
                           :start="start"
                           :end="end"
                           :has-error="hasError"
                           v-bind="$attrs"
                           @date-range-change="v => $emit('update:date-range', v)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MonthSwitcher from '@/components/ReservationForm/Calendar/MonthSwitcher.vue';
import { Moment } from 'moment';
import Weekdays from '@/components/ReservationForm/Calendar/Weekdays.vue';
import { DateRangeInterface } from '~/interfaces/date-range.interface';
import MonthlyCalendar from '@/components/ReservationForm/Calendar/Monthly.vue';

@Component({
  components: {
    MonthSwitcher,
    Weekdays,
    MonthlyCalendar,
  },
})
export default class Calendar extends Vue {
  @Prop({ type: Boolean, default: false })
  readonly hasError!: boolean;

  @Prop()
  readonly dateRange!: DateRangeInterface;

  private baseMoment: Moment = this.$moment().clone();

  get start(): Moment {
    return this.baseMoment
      .clone()
      .startOf('month')
      .startOf('week');
  }

  get end(): Moment {
    return this.baseMoment
      .clone()
      .endOf('month')
      .endOf('week');
  }

  get month(): string {
    return this.baseMoment.locale('en').format('MMMM');
  }

  get year(): string {
    return this.baseMoment.format('YYYY');
  }

  changeMonth(direction: 'next' | 'prev'): void {
    this.baseMoment = direction === 'next'
      ? this.baseMoment.clone().add(1, 'month')
      : this.baseMoment.clone().subtract(1, 'month');
  }
}
</script>

<style lang="scss">
  .calendar {
    overflow-y: scroll;
    background-color: white;
    width: 90%;
    height: 380px;

    .calendar-plus-switcher {
      width: 90%;
      min-width: 250px;
      padding: 0 15px;
      overflow-y: scroll;

      .container {
        margin: 0;
        padding: 2px;
      }

      .row {
        margin-top: 4px;
        margin-bottom: 0;
      }

      .col,
      .circle {
        max-width: 34px;
        width: 34px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 16px;
      }
    }
  }
</style>
