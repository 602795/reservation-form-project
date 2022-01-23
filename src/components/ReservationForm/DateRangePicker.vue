<template>
  <div class="date-range-component d-flex flex-column justify-center">
    <div class="content d-flex justify-around align-center">
      <label :class="{ 'selected': type === 'start' && showCalendar }"
             @click.stop.prevent="onLabelClick('start')"
             class="label">
        {{ start }}
        <v-icon @click.stop="clear('start')"
                v-if="dateRange.start.length"
                small>
          mdi-close
        </v-icon>
      </label>
      <span class="mdi mdi-arrow-right right-arrow-icon"></span>
      <label :class="{ 'selected': type === 'end' && showCalendar }"
             @click.stop.prevent="onLabelClick('end')"
             class="label">
        {{ end }}
        <v-icon @click.stop="clear('end')"
                v-if="dateRange.end.length"
                small>
          mdi-close
        </v-icon>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { DateRangeInterface } from '@/interfaces/date-range.interface';

@Component({
  components: {},
})
export default class DateRangePicker extends Vue {
  @Prop()
  readonly type!: 'start' | 'end' | '';

  @Prop({ type: Boolean, default: false })
  readonly showCalendar!: boolean;

  @Prop()
  readonly dateRange!: DateRangeInterface;

  get start(): string {
    return this.dateRange.start.length ? this.dateRange.start : 'Date from';
  }

  get end(): string {
    return this.dateRange.end.length ? this.dateRange.end : 'Date to';
  }

  clear(type: 'start' | 'end'): void {
    this.dateRange[type] = '';
  }

  onLabelClick(type: 'start' | 'end'): void {
    // while changing the type, when the calendar is open, don't close it
    if (this.type !== type && this.showCalendar) {
      this.$emit('update:type', type);
      return;
    }

    this.$emit('update:show-calendar', !this.showCalendar);
    this.$emit('update:type', type);
  }

  @Watch('showCalendar')
  onCalendarClose(): void {
    if (!this.showCalendar) {
      this.$emit('update:type', this.type);
    }
  }
}
</script>

<style lang="scss">
  .date-range-component {
    cursor: pointer;
    border: 1px solid var(--v-main-green-base);
    border-radius: 100px;
    height: var(--chips-height);

    .right-arrow-icon {
      font-size: 20px;
      margin-top: 6px;
    }

    .label {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 125px;
      height: 35px;
      font-weight: 600;
      font-size: 14px;

      .v-icon {
        margin-left: 4px;
      }

      &.selected {
        color: var(--v-main-green-base);
        background-color: var(--v-light-green-base);
        border-radius: 100px;
      }
    }
  }
</style>
