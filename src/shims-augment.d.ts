/**
 * Overloads VueI18n interface to avoid needing to cast return value to string.
 * @see https://github.com/kazupon/vue-i18n/issues/410
 * It can be resolved with vue-i18n >= 9 (that only works with Vue 3 currently)
 */
import VueI18n from 'vue-i18n/types'
declare module 'vue-i18n/types' {
  export default class VueI18n {
    t (key: Path, locale: Locale, values?: Values): string
    t (key: Path, values?: Values): string
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $t: typeof VueI18n.prototype.t
  }
}
