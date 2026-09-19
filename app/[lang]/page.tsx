import type { Metadata } from 'next'
import { getDictionary } from './dictionaries'
import ToolHubDashboard from '@/components/toolhub-dashboard'
import { redirect } from 'next/navigation'

type Lang = 'tr' | 'en'

const descriptions = {
  tr: 'Yüzde ve indirim hesaplama, kelime sayacı, yazma hızı testi, dünya saati, resim dönüştürücü ve daha fazlası. Kayıt gerektirmeyen ücretsiz online araçlar.',
  en: 'Percentage and discount calculator, word counter, typing speed test, world clock, image converter and more. Free online tools with no sign-up.',
} as const

export function generateStaticParams() {
  return [{ lang: 'tr' }, { lang: 'en' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>
}): Promise<Metadata> {
  const { lang } = await params

  // Başlık, [lang]/layout.tsx içindeki varsayılan başlıktan gelir
  return {
    description: descriptions[lang],
    alternates: {
      canonical: `/${lang}`,
      languages: {
        tr: '/tr',
        en: '/en',
        'x-default': '/tr',
      },
    },
    openGraph: {
      description: descriptions[lang],
      url: `/${lang}`,
      siteName: 'MyToolKit',
      locale: lang === 'tr' ? 'tr_TR' : 'en_US',
      type: 'website',
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Lang }>
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  async function handleLangChange(newLang: string) {
    'use server'
    redirect(`/${newLang}`);
  }

  // Google'a sitenin adını ve dilini bildiren yapılandırılmış veri
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
