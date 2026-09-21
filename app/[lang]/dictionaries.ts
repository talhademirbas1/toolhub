const dictionaries = {
  tr: () => import('@/locales/tr.json').then((m) => m.default),
  en: () => import('@/locales/en.json').then((m) => m.default),
  es: () => import('@/locales/es.json').then((m) => m.default), // İspanyolca eklendi
}
  
export type Locale = keyof typeof dictionaries

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries.tr()
}