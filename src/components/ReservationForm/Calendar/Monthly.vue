<template>
  <v-container>
    <v-row :key="`${week}-week`"
           v-for="week in weeks">
      <v-col :key="`${label}-day`"
             :class="{ disabled, today, selected, between, first, last }"
             @click="selectDay(day, disabled)"
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
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { Moment } from 'moment';
import { DateRangeInterface } from '@/interfaces/date-range.interface';
import { DateInterface } from '@/interfaces/date.interface';

@Component({
  components: {},
})
export default class MonthlyCalendar extends Vue {
  @Prop({ type: Boolean, default: false })
  readonly hasError!: boolean;

  @Prop()
  readonly dateRange!: DateRangeInterface;

  @Prop()
  readonly baseMoment!: Moment;

  @Prop()
  readonly start!: Moment;

  @Prop()
  readonly end!: Moment;

  @Prop()
  readonly unavailableDates!: string[];

  @Prop()
  readonly type!: 'start' | 'end';

  get month(): string {
    return this.baseMoment.locale('en').format('MMMM');
  }

  get weeks(): number {
    // weeks per month
    return Math.ceil(this.end.diff(this.start, 'd') / 7);
  }

  get startAsMoment(): Moment {
    return this.$moment(this.dateRange.start, 'DD-MM-YYYY');
  }

  get endAsMoment(): Moment {
    return this.$moment(this.dateRange.end, 'DD-MM-YYYY');
  }

  get rangeSelected(): boolean {
    return !!this.dateRange.start.length && !!this.dateRange.end.length;
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
      disabled: this.dayUnavailable(day) || this.dayOutOfRange(day) || day.isBefore(this.$moment(), 'day'),
      selected: this.daySelected(day),
      first: !this.hasError && this.rangeSelected && this.startAsMoment.isSame(day),
      last: !this.hasError && this.rangeSelected && this.endAsMoment.isSame(day),
      between: this.dayInRange(day),
    }));
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

  selectDay(day: Moment, disabled: boolean): void {
    if (disabled) return;

    this.$emit(
      'date-range-change',
      this.type === 'start'
        ? { start: day.format('DD-MM-YYYY'), end: this.dateRange.end }
        : { start: this.dateRange.start, end: day.format('DD-MM-YYYY') },
    );
  }
}
</script>

<style lang="scss">
  .container {
    margin: 0;
    padding: 2px;

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
        cursor: not-allowed;
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
</style>
