import { MomentRange } from 'moment-range';
import Moment from 'moment';
import vue from 'vue';

export default {
  install(Vue: typeof vue) {
    Vue.$moment = Moment;
    Vue.prototype.$moment = Vue.$moment;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $moment: MomentRange & typeof Moment;
  }

  interface VueConstructor {
    $moment: typeof Moment;
  }
}