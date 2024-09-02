import Vue from 'vue'

import App from './App.vue'
import i18n from './i18n'

import vuetify from './plugins/vuetify'

// Make sure to register before importing any components
import './class-component-hooks'

Vue.config.productionTip = false

const app = new Vue({
  vuetify,
  i18n,
  render: h => h(App)
})

app.$mount('#app')