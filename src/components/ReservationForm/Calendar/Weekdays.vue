<template>
  <v-row>
    <v-col :key="`weekDay-${weekDay}`"
           v-for="weekDay in weekDays">
      <span class="day font-size-small font-weight-normal">{{ weekDay }}</span>
    </v-col>
  </v-row>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Weekdays extends Vue {
	get weekDays(): string[] {
		return this.$moment.weekdaysShort();
	}
}
</script>

<style lang="scss">
  .day {
    color: var(--v-week-day-color-base);
  }
</style>