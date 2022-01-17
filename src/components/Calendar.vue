<template>
  <div class="calendar form d-flex justify-center">
    <div class="calendar-container d-flex flex-column">
      <DateSwitcher/>
      <div class="monthly-calendar-container flex-column">
        <div class="week-days d-flex justify-around">
          <div :key="index"
               v-for="(weekDay, index) in weekDays">
            <span class="day font-size-small font-medium">{{ weekDay }}</span>
          </div>
          <v-row :key="`${r}-week`"
                 v-for="r in week"
                 class="row">
            <v-col :key="`${c}-day`"
                   v-for="c in getDaysPerWeek(r)">
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DateSwitcher from '@/components/DateSwitcher.vue';
import moment from 'moment';

@Component({
  components: {
    DateSwitcher,
  },
})
export default class Calendar extends Vue {
  get weekDays() {
    return moment.weekdaysShort();
  }

  get startOfCalendarView() {
    return moment()
      .clone()
      .startOf('month')
      .startOf('week');
  }

  get endOfCalendarView() {
    return moment()
      .clone()
      .endOf('month')
      .endOf('week');
  }

  getDaysPerWeek(week: number) {
    return this.startOfCalendarView.clone().add(7 * week, 'd').weekday();
  }

  get week(): number {
    // weeks per month
    return Math.ceil(this.endOfCalendarView.diff(this.startOfCalendarView, 'd') / 7);
  }
}
</script>

<style lang="scss">
  .calendar {
    width: 28vw;
    height: 40vh;
    .calendar-container {
      width: 90%;
      .month-switcher {
        border: 1px solid #D8D8D8;
        border-radius: 100px;
        height: var(--chips-height);
      }
      .week-days {
        .day {
          margin: 4px;
          color: var(--week-day-color);
        }
      }
    }
  }
</style>
