import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

const vuetifyConfig = {
  theme: {
    options: {
      customProperties: true,
    },
    dark: false,
    themes: {
      light: {
        'primary': '#333333',
        'main-green': '#4E9845',
        'light-green': '#EDF5EC',
        'box-shadow': '#dfdede',
        'week-day-color': '#999999',
        'error': '#8B1D1C',
      },
      dark: {
        //TODO
      },
    }
  }
};

export default new Vuetify(vuetifyConfig);