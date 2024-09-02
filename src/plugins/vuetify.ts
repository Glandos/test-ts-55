import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

if (process.env.NODE_ENV !== 'production') {
  import('@mdi/font/css/materialdesignicons.min.css')
}

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: false,
    options: { variations: false }
  },
  icons: {
    iconfont: 'mdiSvg'
  }
})
