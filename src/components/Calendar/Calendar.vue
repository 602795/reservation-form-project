<template>
  <div class="calendar form d-flex justify-center">
    <div class="calendar-plus-switcher d-flex flex-column">
      <MonthSwitcher :month="month"
                     :year="year"
                     @next-month="changeMonth('next')"
                     @prev-month="changeMonth('prev')"/>
      <div class="d-flex justify-center">
        <div class="monthly-calendar-container flex-column">
          <Weekdays/>
          <v-container>
            <v-row :key="`${week}-week`"
                   v-for="week in weeks">
              <v-col :key="`${label}-day`"
                     :class="{ disabled, today, selected, between, first, last }"
                     @click="selectDay(day)"
                     v-for="{ day, label, selected, disabled, today, between, first, last } in getDaysPerWeek(week)"
                     class="font-size-small">
                {{ label }}
                <span :class="{ selected, today }"
                      v-show="!!selected || !!today"
                      class="circle">
                  {{ label }}
                </span>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import MonthSwitcher from '@/components/Calendar/MonthSwitcher.vue';
import { Moment } from 'moment';
import Weekdays from '@/components/Calendar/Weekdays.vue';
import { DateRangeInterface } from '@/interfaces/date-range.interface';
import { DateInterface } from '@/interfaces/date.interface';

@Component({
  components: {
    MonthSwitcher,
    Weekdays,
  },
})
export default class Calendar extends Vue {
  @Prop()
  readonly type!: 'start' | 'end';

  @Prop({ type: Boolean, default: false })
  readonly hasError!: boolean;

  @Prop()
  readonly dateRange!: DateRangeInterface;

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

  get weeks(): number {
    // weeks per month
    return Math.ceil(this.end.diff(this.start, 'd') / 7);
  }

  get rangeSelected(): boolean {
    return !!this.dateRange.start.length && !!this.dateRange.end.length;
  }

  get startAsMoment(): Moment {
    return this.$moment(this.dateRange.start, 'DD-MM-YYYY');
  }

  get endAsMoment(): Moment {
    return this.$moment(this.dateRange.end, 'DD-MM-YYYY');
  }

  changeMonth(direction: 'next' | 'prev'): void {
    this.baseMoment = direction === 'next'
      ? this.baseMoment.add(1, 'month').clone()
      : this.baseMoment.subtract(1, 'month').clone();
  }

  getDaysPerWeek(week: number): DateInterface[] {
    const thatWeek = this.start.clone().add(week - 1, 'weeks');

    const range = this.$moment.range(
      thatWeek.clone().startOf('week'),
      thatWeek.clone().endOf('week'),
    );

    const days = [...range.by('day')];

    return days.map((day: Moment) => ({
      day,
      label: day.format('D'),
      today: day.isSame(this.$moment(), 'day'),
      disabled: this.dayUnavailable(day) || this.dayOutOfRange(day),
      selected: this.daySelected(day),
      first: !this.hasError && this.rangeSelected && this.startAsMoment.isSame(day),
      last: !this.hasError && this.rangeSelected && this.endAsMoment.isSame(day),
      between: this.dayInRange(day),
    }));
  }

  @Emit('update:date-range')
  selectDay(day: Moment): DateRangeInterface {
    if (this.type === 'start') {
      return {
        start: day.format('DD-MM-YYYY'),
        end: this.dateRange.end,
      };
    }
    return {
      start: this.dateRange.start,
      end: day.format('DD-MM-YYYY'),
    };
  }

  dayInRange(day: Moment): boolean {
    if (!this.rangeSelected || this.daySelected(day) || this.hasError) return false;

    return day.isBetween(this.startAsMoment, this.endAsMoment);
  }

  daySelected(day: Moment): boolean {
    return day.isSame(this.startAsMoment, 'day') || day.isSame(this.endAsMoment, 'day');
  }

  dayOutOfRange(day: Moment): boolean {
    return !day.isSame(this.baseMoment, 'month');
  }

  dayUnavailable(day: Moment): boolean {
    return this.unavailableDates.some((date) =>
      this.$moment(date, 'DD-MM-YYYY').isSame(this.$moment(day.format('DD-MM-YYYY'), 'DD-MM-YYYY')));
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
        cursor: pointer;
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

      .col {
        .circle {
          position: absolute;
          border-radius: 50%;
          border: 2px solid var(--v-main-green-base);

          &.today {
            color: var(--v-main-green-base);
          }

          &.selected {
            background-color: var(--v-main-green-base);
            color: white;
          }
        }

        &.disabled {
          opacity: .4;
        }

        &.disabled.range {
          color: var(--v-box-shadow-base);
        }

        &.between,
        &.first,
        &.last {
          background-color: var(--v-light-green-base);
          color: var(--v-main-green-base);
        }

        &.first {
          border-bottom-left-radius: 20px;
          border-top-left-radius: 20px;
        }

        &.last {
          border-bottom-right-radius: 20px;
          border-top-right-radius: 20px;
        }
      }
    }
  }
</style>
