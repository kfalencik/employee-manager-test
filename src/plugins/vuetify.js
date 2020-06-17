import Vue from 'vue'
import '@mdi/font/scss/materialdesignicons.scss'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#0c1c4d',
        secondary: '#3cc3f4',
        accent: '#f80168',
        error: '#ff5252',
        info: '#2196f3',
        success: '#4caf50',
        warning: '#ffc107'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
