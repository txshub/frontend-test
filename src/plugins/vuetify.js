import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#21cc99',
        secondary: '#21cc99',
        accent: '#21cc99',
        error: '#b71c1c'
      }
    }
  }
})
