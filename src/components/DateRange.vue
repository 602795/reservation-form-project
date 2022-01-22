<template>
  <div class="date-range-component d-flex flex-column justify-center">
    <div class="content d-flex justify-around align-center">
      <label @click="showCalendar = !showCalendar"
             class="label">Date From</label>
      <span class="mdi mdi-arrow-right right-arrow-icon"></span>
      <label @click="showCalendar = !showCalendar"
             class="label">Date To</label>
      <Calendar :unavailable-dates="unavailableDates" v-show="showCalendar"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Calendar from '@/components/Calendar/Calendar.vue';

@Component({
  components: {
    Calendar,
  },
})
export default class DateRange extends Vue {
  @Prop()
  readonly unavailableDates!: string[];

  private showCalendar: boolean = false;
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
      &:hover {
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
