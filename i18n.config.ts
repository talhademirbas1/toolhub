export const i18n = {
    defaultLocale: "tr",
    locales: ["tr", "en", "es"], // İleride 'pt', 'de', 'fr' buraya virgülle eklenecek
  } as const;
  
  export type Locale = (typeof i18n)["locales"][number];
