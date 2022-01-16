<template>
  <div class="reservation-form d-flex flex-column justify-center align-center">
    <div class="top d-flex flex-2 align-center justify-around">
      <div class="left">
        <div class="price montserrat-font font-size-medium font-bold">{{ price }} zł</div>
        <div class="rating d-flex">
          <div :key="index"
               :class="{ 'green-color': rating > value || value - 0.5 === rating }"
               v-for="(value, index) in 5">
            <span :class="[ getIcon(value), 'mdi' ]"></span>
          </div>
          <span class="rating-counter font-bold font-size-small">{{ ratingCounter }}</span>
        </div>
      </div>
      <div class="right">
        <button class="submit-btn green-bg-color">
          reserve
        </button>
      </div>
    </div>
    <div class="bottom flex-1">

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { DateRangeInterface } from '@/interfaces/date-range.interface';

@Component({
  components: {
  },
})
export default class ReservationForm extends Vue {
  @Prop()
  readonly price!: number;

  @Prop()
  readonly rating!: number;

  @Prop()
  readonly ratingCounter!: number;

  @Prop()
  readonly unavailableDates!: string[];

  private dateRange: Partial<DateRangeInterface> = {};

  getIcon(value: number): string {
    if (this.rating > value) return 'mdi-star';
    if (value - 0.5 === this.rating) return 'mdi-star-half-full';
    return 'mdi-star-outline';
  }
}
</script>

<style lang="scss">
 .reservation-form {
    --box-shadow-color: #dfdede;
    --price-color: #333333;

    width: 50vw;
    height: 20vh;
    padding: 3vh 0;
    border: 2px solid #fff;
    border-radius: 20px;
    box-shadow: 1px 1px 20px 2px var(--box-shadow-color);
    .top {
      width: 100%;
      .left {
        .price {
          color: var(--price-color);
        }
        .rating {
          color: #999999;
          .rating-counter {
            margin: 2px 0 0 4px;
          }
        }
      }
      .right {
        .submit-btn {
          text-transform: capitalize;
          border: 2px solid #fff;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 600;
          padding: 10px 15px;
          display: inline-block;
          text-align: center;
          color: #fff;
        }
      }
    }
  }
</style>
