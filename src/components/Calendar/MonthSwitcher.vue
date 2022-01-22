<template>
  <div class="month-switcher d-flex flex-column justify-center">
    <div class="content d-flex justify-around align-center">
      <span @click="$emit('prev-month')" class="mdi mdi-chevron-left icon-size"></span>
      <div class="font-bold">{{ month }} {{ year }}</div>
      <span @click="$emit('next-month')" class="mdi mdi-chevron-right icon-size"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class MonthSwitcher extends Vue {
  @Prop()
  readonly month!: string;

  @Prop()
  readonly year!: string;
}
</script>

<style lang="scss">
  .month-switcher {
    border: 1px solid #D8D8D8;
    border-radius: 100px;
    height: var(--chips-height);
    min-height: var(--chips-height);

    .content {
      line-height: 20px;
    }
  }
</style>
