import Vue from 'vue';
import App from './App.vue';
import vuetify from '~/plugins/vuetify';
import vueMoment from '~/plugins/vue-moment';
import { extendMoment } from 'moment-range';
import Moment from 'moment';

Vue.config.productionTip = false;

const moment = extendMoment(Moment as any);
Vue.use(vueMoment, {
  moment,
});

new Vue({
  vuetify,
  render(h) {
    return h(App);
  }
}).$mount('#app');