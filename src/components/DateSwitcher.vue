<template>
  <div class="month-switcher d-flex flex-column justify-center">
    <div class="content d-flex justify-around align-center">
      <span class="mdi mdi-chevron-left icon-size"></span>
      <div class="font-bold">{{ month }}{{ year }}</div>
      <span class="mdi mdi-chevron-right icon-size"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment, { Moment } from 'moment';

@Component({
  components: {
  },
})
export default class DateSwitcher extends Vue {
  get todayAsMoment(): Moment {
    return moment();
  }

  get month(): string {
    return this.todayAsMoment.locale('en').format('MMMM');
  }

  get year(): string {
    return moment().format('YYYY');
  }
}
</script>

<style lang="scss">
  .month-switcher {
    border: 1px solid #D8D8D8;
    border-radius: 100px;
    height: var(--chips-height);
    .content {
      line-height: 20px;
    }
  }
</style>
