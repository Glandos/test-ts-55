import Vue from 'vue'
import VueI18n, { type Locale } from 'vue-i18n'
import { castToVueI18n, createI18n } from 'vue-i18n-bridge'

import { languages, countries } from 'countries-list'

// Bridge is done in vue.config.js
Vue.use(VueI18n)

export const SUPPORTED_LOCALES = ["en-gb", "en", "de", "fr", "pl"]

function init () {
  let defaultLocale = localStorage.getItem('app_locale')
  const noLocaleFromStorage = defaultLocale === null
  let bestLocaleIndex = Infinity

  // This is a bit clunky.
  // We need to select a best-fit language, and we prioritize language.
  // E.g. if the browser is ["en-US", "fr", "en-GB"], then we will use "en", since "en-US" not available but "en" and "en-GB" are.
  const navigatorLocales = navigator.languages.flatMap(locale => [locale.toLowerCase(), new Intl.Locale(locale).language])
  SUPPORTED_LOCALES.forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      if (noLocaleFromStorage) {
        const localeIndex = navigatorLocales.indexOf(locale)
        if (localeIndex > -1 && localeIndex < bestLocaleIndex) {
          bestLocaleIndex = localeIndex
          defaultLocale = locale
        }
      }
    }
  })
  return { defaultLocale: defaultLocale ?? process.env.VUE_APP_I18N_LOCALE as string ?? 'en-gb' }
}

export async function loadLanguage (lang: string, set = true) {
  // If the language hasn't been loaded yet
  const messages = await import(/* webpackChunkName: "lang-[request]" */ `@/locales/${lang}.json`)
  castToVueI18n(i18n).setLocaleMessage(lang, messages.default)
  return set ? castToVueI18n(i18n).locale = lang : castToVueI18n(i18n).locale
}

export function localeDisplayName (locale: string): string {
  const [lang, country] = locale.split('-')
  const langName = languages[lang as keyof typeof languages]?.native
  const countryName = countries[country?.toUpperCase() as keyof typeof countries]?.native
  return `${langName}${countryName !== undefined ? ` (${countryName})` : ''}`
}

const { defaultLocale } = init()

const fallbackLocale = (process.env.VUE_APP_I18N_FALLBACK_LOCALE as string)?.split(' ') ?? ['en-gb', 'en']

export const i18n = createI18n({
  legacy: false,
  fallbackLocale,
  silentFallbackWarn: true,
  warnHtmlInMessage: "warn",
  availableLocales: SUPPORTED_LOCALES,
  missing: (locale: Locale) => {
    const haveAnyFallback = fallbackLocale.some(locale => i18n.global.availableLocales.includes(locale))
    if (!fallbackLocale.includes(locale) && !haveAnyFallback) {
      loadLanguage(fallbackLocale[0], false)
      return `Loading locale ${fallbackLocale[0]}…`
    }
  }
}, VueI18n)

Vue.use(i18n)

// Create after i18n, since it's used by loadLanguage
export const defaultLocaleLoader = loadLanguage(defaultLocale)

export default castToVueI18n(i18n)
