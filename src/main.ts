import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { castToVueI18n, createI18n } from 'vue-i18n-bridge'

// Bridge is done in vue.config.js
Vue.use(VueI18n)

const i18n = createI18n({
  legacy: false,
  silentFallbackWarn: true,
  warnHtmlInMessage: "warn",
}, VueI18n)

Vue.use(i18n)

export default 

Vue.config.productionTip = false

const app = new Vue({
  i18n: castToVueI18n(i18n),
  computed: {
    title() {
      const title: string = this.$t('hello')
      return title
    }
  }
})

app.$mount('#app')