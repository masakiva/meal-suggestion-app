import { createI18n } from 'vue-i18n'
import en from './en.json'
import ja from './ja.json'
import fr from './fr.json'

export type SupportedLocale = 'en' | 'ja' | 'fr'

export const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'ja', 'fr']

export const i18n = createI18n({
  legacy: false,
  locale: 'en' as SupportedLocale,
  fallbackLocale: 'en' as SupportedLocale,
  messages: { en, ja, fr },
})
