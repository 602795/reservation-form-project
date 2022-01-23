<template>
  <div class="reservation-info">
    <div class="price font-size-medium font-bold d-flex align-start">
      {{ price }} zł
    </div>
    <div class="rating d-flex">
      <div :key="i"
           :class="{ 'green': rating > i || i - 0.5 === rating }"
           v-for="i in 5">
        <span :class="[ `mdi-star${getIconName(i)}`, 'mdi' ]"></span>
      </div>
      <span class="rating-counter font-bold font-size-small">
        {{ ratingCounter }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class ReservationInfo extends Vue {
  @Prop()
  readonly price!: number;

  @Prop()
  readonly rating!: number;

  @Prop()
  readonly ratingCounter!: number;

  getIconName(value: number): string {
    if (this.rating > value) return '';
    if (value - 0.5 === this.rating) return '-half-full';
    return '-outline';
  }
}
</script>

<style lang="scss">
  .rating {
    .green {
      color: var(--v-main-green-base);
    }
    .rating-counter {
      margin: 2px 0 0 4px;
    }
  }
</style>
