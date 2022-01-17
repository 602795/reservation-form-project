<template>
  <div class="date-range-component d-flex flex-column justify-center">
    <div class="content d-flex justify-around align-center">
      <label @click="showCalendar = !showCalendar"
             class="label">Date From</label>
      <span class="mdi mdi-arrow-right right-arrow-icon"></span>
      <label @click="showCalendar = !showCalendar"
             class="label">Date To</label>
      <Calendar v-show="showCalendar"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Calendar from '@/components/Calendar.vue';

@Component({
  components: {
    Calendar,
  },
})
export default class DateRange extends Vue {
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
        color: var(--green);
        background-color: var(--light-green);
        border-radius: 100px;
      }
    }
    .calendar {
      position: absolute;
      top: 35vh;
      left: 36vw;
    }
  }
</style>
