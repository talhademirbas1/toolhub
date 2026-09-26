import type { Metadata } from 'next'
import { getDictionary } from './dictionaries'
import ToolHubDashboard from '@/components/toolhub-dashboard'
import { redirect } from 'next/navigation'
import { i18n, type Locale } from '@/i18n.config'

// Dinamik diller için Record tipi kullanıyoruz
const descriptions: Record<Locale, string> = {
  tr: 'Yüzde ve indirim hesaplama, kelime sayacı, yazma hızı testi, dünya saati, resim dönüştürücü, bilimsel hesap makinesi ve daha fazlası. Kayıt gerektirmeyen ücretsiz online araçlar.',
  en: 'Percentage and discount calculator, word counter, typing speed test, world clock, image converter, scientific calculator and more. Free online tools with no sign-up.',
  es: 'Calculadora de porcentajes y descuentos, contador de palabras, prueba de velocidad de escritura, reloj mundial, convertidor de imágenes, calculadora científica y más. Herramientas online gratuitas sin registro.'
}

// 1. Dinamik Static Params (15 dosyada manuel eklemek yerine merkezden alıyoruz)
export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params

  // 2. Dinamik Hreflang SEO yapısı
  const languages = i18n.locales.reduce((acc, locale) => {
    acc[locale] = `/${locale}`;
    return acc;
  }, {} as Record<string, string>);
  languages["x-default"] = `/${i18n.defaultLocale}`;

  return {
    description: descriptions[lang],
    alternates: {
      canonical: `/${lang}`,
      languages: languages,
    },
    openGraph: {
      description: descriptions[lang],
      url: `/${lang}`,
      siteName: 'MyToolKit',
      locale: lang === 'tr' ? 'tr_TR' : lang === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  async function handleLangChange(newLang: Locale) {
    'use server'
    redirect(`/${newLang}`);
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MyToolKit',
    url: 'https://www.mytoolkitbase.com',
    inLanguage: lang,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <ToolHubDashboard
        dict={dict}
        currentLang={lang}
        onLangChange={handleLangChange}
      />
    </>
  )
}
