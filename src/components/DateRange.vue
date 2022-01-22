<template>
  <div class="date-range-component d-flex flex-column justify-center">
    <div class="content d-flex justify-around align-center">
      <label :class="{ 'selected': type === 'start' }"
             @click="onLabelClick('start')"
             class="label">
        {{ start }}
      </label>
      <span class="mdi mdi-arrow-right right-arrow-icon"></span>
      <label :class="{ 'selected': type === 'end' }"
             @click="onLabelClick('end')"
             class="label">
        {{ end }}
      </label>
      <Calendar :unavailable-dates="unavailableDates"
                :date-range.sync="dateRange"
                :type="type"
                v-show="showCalendar"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Calendar from '@/components/Calendar/Calendar.vue';
import { DateRangeInterface } from '@/interfaces/date-range.interface';

@Component({
  components: {
    Calendar,
  },
})
export default class DateRange extends Vue {
  @Prop()
  readonly unavailableDates!: string[];

  private showCalendar: boolean = false;
  private type: 'start' | 'end' | '' = '';
  private dateRange: DateRangeInterface = {
    start: '',
    end: '',
  };

  get start(): string {
    return this.dateRange.start.length ? this.dateRange.start : 'Date from';
  }

  get end(): string {
    return this.dateRange.end.length ? this.dateRange.end : 'Date to';
  }

  onLabelClick(type: 'start' | 'end') {
    if (this.type === type || this.type === '') {
      this.showCalendar = !this.showCalendar;
    }
    this.type = type;
  }
}
</script>

<style lang="scss">
  .date-range-component {
    border: 1px solid var(--green);
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
      &.selected {
        color: var(--v-main-green-base);
        background-color: var(--v-light-green-base);
        border-radius: 100px;
      }
    }
    .calendar {
      position: absolute;
      top: 30%;
      left: 30%;
    }
  }
</style>
