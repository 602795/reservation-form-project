<template>
  <div class="calendar form d-flex justify-center">
    <div class="calendar-container d-flex flex-column">
      <DateSwitcher :month="month"
                    :year="year"
                    @next-month="changeMonth('next')"
                    @prev-month="changeMonth('prev')"/>
      <div class="monthly-calendar-container flex-column">
        <Weekdays/>
        <v-container>
          <v-row :key="`${r}-week`"
                 v-for="r in week"
                 class="row">
            <v-col :key="`${label}-day`"
                   :class="{ disabled, today, 'font-size-small': true }"
                   v-for="{ label, disabled, today } in getDaysPerWeek(r)">
              {{ label }}
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DateSwitcher from '@/components/Calendar/DateSwitcher.vue';
import { Moment } from 'moment';
import Weekdays from '@/components/Calendar/Weekdays.vue';

@Component({
  components: {
    DateSwitcher,
    Weekdays,
  },
})
export default class Calendar extends Vue {
  @Prop()
  readonly unavailableDates!: string[];

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

  get week(): number {
    // weeks per month
    return Math.ceil(this.end.diff(this.start, 'd') / 7);
  }

  changeMonth(direction: 'next' | 'prev'): void {
    this.baseMoment = direction === 'next'
      ? this.baseMoment.add(1, 'month').clone()
      : this.baseMoment.subtract(1, 'month').clone();
  }

  getDaysPerWeek(week: number) {
    const thatWeek = this.start.clone().add(week - 1, 'weeks');

    const range = this.$moment.range(
      thatWeek.clone().startOf('week'),
      thatWeek.clone().endOf('week'),
    );

    const days = [ ...range.by('day') ];

    return days.map((day: Moment, i: number) => ({
      label: day.format('D'),
      disabled: this.unavailable(day) || this.outOfMonthRange(day),
      today: day.isSame(this.$moment(), 'day'),
    }));
  }

  outOfMonthRange(day: Moment): boolean {
    return !day.isSame(this.baseMoment, 'month');
  }

  unavailable(day: Moment): boolean {
    return this.unavailableDates.some((date) =>
      this.$moment(date, 'DD-MM-YYYY').isSame(this.$moment(day.format('DD-MM-YYYY'), 'DD-MM-YYYY')));
  }
}
</script>

<style lang="scss">
  .calendar {
    width: 300px;
    height: 380px;
    .calendar-container {
      width: 90%;
      padding: 0 15px;
      .month-switcher {
        border: 1px solid #D8D8D8;
        border-radius: 100px;
        height: var(--chips-height);
      }
      .container {
        margin: 0;
        padding: 2px;
      }
      .col {
        line-height: 16px;
        width: 34px;
        height: 34px;
        margin-right: 2px;
        display: flex;
        align-items: center;
        justify-content: center;

        &.disabled {
          opacity: .4;
        }
        &.today {
          color: var(--v-main-green-base);
          border: 2px solid var(--v-main-green-base);
          border-radius: 50%;
        }
      }
      .row {
        margin-top: 8px;
        margin-bottom: 8px;
      }
    }
  }
</style>
