<template>
  <div class="date-range-component d-flex flex-column justify-center">
    <div class="content d-flex justify-around align-center">
      <label class="label">Date From</label>
      <span class="mdi mdi-arrow-right"></span>
      <label class="label">Date To</label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class DateRange extends Vue {

}
</script>

<style lang="scss">
  .date-range-component {
    border: 1px solid var(--green);
    border-radius: 100px;
    height: 48px;
    .mdi-arrow-right {
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
  }
</style>
