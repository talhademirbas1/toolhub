import type { Metadata } from 'next'
import BackgroundRemoverTool from '@/components/background-remover-tool'
import { ToolPageHeader } from '@/components/tool-page-header'
import { i18n, type Locale } from '@/i18n.config'

const PATH = '/tools/background-remover'

const content = {
  tr: {
    metaTitle: 'Arka Plan Silici',
    metaDescription: 'Resminizin arka planını ücretsiz ve otomatik olarak kaldırın. Kayıt gerektirmez, tarayıcıda çalışır.',
    h1: 'Arka Plan Silici',
    howToTitle: 'Arka plan nasıl silinir?',
    howToText: 'Resminizi yükleyin, araç arka planı otomatik olarak algılayıp kaldırır ve şeffaf PNG olarak indirmenizi sağlar. Kurulum gerekmez, kayıt olmadan kullanabilirsiniz.',
    useCasesTitle: 'Ne işe yarar?',
    useCases: [
      'Ürün fotoğraflarının arka planını kaldırmak',
      'Profil fotoğrafını şeffaf arkaplanla kaydetmek',
      'Sosyal medya ve sunum görselleri hazırlamak',
      'Logo ve grafikleri arka plansız kullanmak',
    ],
    faqTitle: 'Sık sorulan sorular',
    faq: [
      { q: 'Araç ücretsiz mi?', a: 'Evet, tamamen ücretsizdir ve üyelik gerektirmez.' },
      { q: 'Resimlerim kaydediliyor mu?', a: 'Hayır, tüm işlem tarayıcınızda gerçekleşir, resimleriniz hiçbir sunucuya gönderilmez.' },
      { q: 'Hangi formatlar desteklenir?', a: 'PNG, JPG ve WEBP formatları desteklenir. Sonuç her zaman şeffaf PNG olarak çıkar.' },
    ],
  },
  en: {
    metaTitle: 'Background Remover',
    metaDescription: 'Remove the background from your image automatically and for free. No sign-up, works in your browser.',
    h1: 'Background Remover',
    howToTitle: 'How to remove a background?',
    howToText: 'Upload your image and the tool automatically detects and removes the background, letting you download it as a transparent PNG. No installation or sign-up required.',
    useCasesTitle: 'What is it useful for?',
    useCases: [
      'Removing backgrounds from product photos',
      'Saving profile pictures with transparent backgrounds',
      'Preparing social media and presentation visuals',
      'Using logos and graphics without backgrounds',
    ],
    faqTitle: 'Frequently asked questions',
    faq: [
      { q: 'Is the tool free?', a: 'Yes, it is completely free and requires no account.' },
      { q: 'Are my images saved?', a: 'No, all processing happens in your browser. Your images are never sent to a server.' },
      { q: 'Which formats are supported?', a: 'PNG, JPG and WEBP are supported. The result is always a transparent PNG.' },
    ],
  },
  es: {
    metaTitle: 'Eliminador de Fondo',
    metaDescription: 'Elimina el fondo de tu imagen de forma automática y gratuita. Sin registro, funciona en tu navegador.',
    h1: 'Eliminador de Fondo',
    howToTitle: '¿Cómo eliminar el fondo?',
    howToText: 'Sube tu imagen y la herramienta detecta y elimina el fondo automáticamente, permitiéndote descargarlo como PNG transparente. Sin instalación ni registro.',
    useCasesTitle: '¿Para qué sirve?',
    useCases: [
      'Eliminar fondos de fotos de productos',
      'Guardar fotos de perfil con fondo transparente',
      'Preparar imágenes para redes sociales y presentaciones',
      'Usar logotipos y gráficos sin fondo',
    ],
    faqTitle: 'Preguntas frecuentes',
    faq: [
      { q: '¿La herramienta es gratuita?', a: 'Sí, es completamente gratuita y no requiere cuenta.' },
      { q: '¿Se guardan mis imágenes?', a: 'No, todo el procesamiento ocurre en tu navegador. Tus imágenes nunca se envían a un servidor.' },
      { q: '¿Qué formatos son compatibles?', a: 'Se admiten PNG, JPG y WEBP. El resultado siempre es un PNG transparente.' },
    ],
  },
} as const

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const c = content[lang]
  const languages = i18n.locales.reduce((acc, locale) => { acc[locale] = `/${locale}${PATH}`; return acc }, {} as Record<string, string>)
  languages['x-default'] = `/${i18n.defaultLocale}${PATH}`
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `/${lang}${PATH}`, languages },
    openGraph: { title: c.metaTitle, description: c.metaDescription, url: `/${lang}${PATH}`, siteName: 'MyToolKit', locale: lang === 'tr' ? 'tr_TR' : lang === 'es' ? 'es_ES' : 'en_US', type: 'website' },
  }
}

export default async function BackgroundRemoverPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const c = content[lang]

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-zinc-100 dark:bg-background text-foreground transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="sr-only">{c.h1}</h1>
        <ToolPageHeader lang={lang} />
        <BackgroundRemoverTool lang={lang} />
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 space-y-8">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">{c.howToTitle}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{c.howToText}</p>
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">{c.useCasesTitle}</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-600 dark:text-zinc-400">
              {c.useCases.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">{c.faqTitle}</h2>
            <div className="space-y-2">
              {c.faq.map((item) => (
                <details key={item.q} className="group rounded-lg border border-zinc-200 dark:border-zinc-800 px-4 py-3">
                  <summary className="cursor-pointer font-medium">{item.q}</summary>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}