import type { Metadata } from 'next'
import CaseConverterTool from '@/components/case-converter-tool'
import { ToolPageHeader } from '@/components/tool-page-header'
import { i18n, type Locale } from '@/i18n.config'

const PATH = '/tools/case-converter'

const content = {
  tr: {
    metaTitle: 'Büyük / Küçük Harf Dönüştürücü',
    metaDescription: 'Metninizi büyük harf, küçük harf, başlık formatı ve daha fazlasına anında dönüştürün. Ücretsiz, kayıt gerektirmez.',
    h1: 'Büyük / Küçük Harf Dönüştürücü',
    howToTitle: 'Harf dönüşümü nasıl yapılır?',
    howToText: 'Metninizi girin, ardından istediğiniz dönüşüm modunu seçin. Büyük harf, küçük harf, başlık formatı, cümle formatı ve alternating gibi seçenekler arasında geçiş yapabilirsiniz. Sonucu tek tıkla kopyalayın.',
    useCasesTitle: 'Ne işe yarar?',
    useCases: [
      'Başlıkları veya içerikleri hızlıca biçimlendirmek',
      'Yanlış caps lock ile yazılmış metinleri düzeltmek',
      'Sosyal medya paylaşımları için metin formatlamak',
      'Kodlama veya veri girişinde büyük/küçük harf tutarlılığı sağlamak',
    ],
    faqTitle: 'Sık sorulan sorular',
    faq: [
      { q: 'Araç ücretsiz mi?', a: 'Evet, tamamen ücretsizdir ve kayıt gerektirmez.' },
      { q: 'Türkçe karakterler destekleniyor mu?', a: 'Evet, ı, ş, ğ, ü, ö, ç gibi Türkçe özel karakterler desteklenir.' },
      { q: 'Verilerim kaydediliyor mu?', a: 'Hayır, tüm işlem tarayıcınızda anlık olarak yapılır.' },
    ],
  },
  en: {
    metaTitle: 'Case Converter',
    metaDescription: 'Instantly convert your text to uppercase, lowercase, title case and more. Free, no sign-up required.',
    h1: 'Case Converter',
    howToTitle: 'How to convert text case?',
    howToText: 'Enter your text and select the conversion mode you want. Switch between uppercase, lowercase, title case, sentence case and alternating. Copy the result with one click.',
    useCasesTitle: 'What is it useful for?',
    useCases: [
      'Quickly formatting titles or content',
      'Fixing text written with the wrong caps lock',
      'Formatting text for social media posts',
      'Ensuring case consistency in coding or data entry',
    ],
    faqTitle: 'Frequently asked questions',
    faq: [
      { q: 'Is the tool free?', a: 'Yes, it is completely free and requires no sign-up.' },
      { q: 'Are special characters supported?', a: 'Yes, accented and special characters are handled correctly.' },
      { q: 'Is my data saved?', a: 'No, all processing happens instantly in your browser.' },
    ],
  },
  es: {
    metaTitle: 'Convertidor de Mayúsculas/Minúsculas',
    metaDescription: 'Convierte tu texto a mayúsculas, minúsculas, formato título y más al instante. Gratis, sin registro.',
    h1: 'Convertidor de Mayúsculas/Minúsculas',
    howToTitle: '¿Cómo convertir el texto?',
    howToText: 'Introduce tu texto y selecciona el modo de conversión que desees. Cambia entre mayúsculas, minúsculas, formato título, formato oración y alternado. Copia el resultado con un clic.',
    useCasesTitle: '¿Para qué sirve?',
    useCases: [
      'Formatear títulos o contenido rápidamente',
      'Corregir texto escrito con el bloqueo de mayúsculas incorrecto',
      'Formatear texto para publicaciones en redes sociales',
      'Garantizar coherencia en mayúsculas en código o entrada de datos',
    ],
    faqTitle: 'Preguntas frecuentes',
    faq: [
      { q: '¿La herramienta es gratuita?', a: 'Sí, es completamente gratuita y no requiere registro.' },
      { q: '¿Se admiten caracteres especiales?', a: 'Sí, los caracteres acentuados y especiales se procesan correctamente.' },
      { q: '¿Se guardan mis datos?', a: 'No, todo el procesamiento ocurre al instante en tu navegador.' },
    ],
  },
} as const

export async function generateStaticParams() { return i18n.locales.map((lang) => ({ lang })) }

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const c = content[lang]
  const languages = i18n.locales.reduce((acc, locale) => { acc[locale] = `/${locale}${PATH}`; return acc }, {} as Record<string, string>)
  languages['x-default'] = `/${i18n.defaultLocale}${PATH}`
  return {
    title: c.metaTitle, description: c.metaDescription,
    alternates: { canonical: `/${lang}${PATH}`, languages },
    openGraph: { title: c.metaTitle, description: c.metaDescription, url: `/${lang}${PATH}`, siteName: 'MyToolKit', locale: lang === 'tr' ? 'tr_TR' : lang === 'es' ? 'es_ES' : 'en_US', type: 'website' },
  }
}

export default async function CaseConverterPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const c = content[lang]
  return (
    <div className="min-h-screen p-6 sm:p-10 bg-zinc-100 dark:bg-background text-foreground transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="sr-only">{c.h1}</h1>
        <ToolPageHeader lang={lang} />
        <CaseConverterTool lang={lang} />
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 space-y-8">
          <div className="space-y-3"><h2 className="text-xl font-semibold">{c.howToTitle}</h2><p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{c.howToText}</p></div>
          <div className="space-y-3"><h2 className="text-xl font-semibold">{c.useCasesTitle}</h2><ul className="list-disc pl-5 space-y-1.5 text-zinc-600 dark:text-zinc-400">{c.useCases.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div className="space-y-3"><h2 className="text-xl font-semibold">{c.faqTitle}</h2><div className="space-y-2">{c.faq.map((item) => (<details key={item.q} className="group rounded-lg border border-zinc-200 dark:border-zinc-800 px-4 py-3"><summary className="cursor-pointer font-medium">{item.q}</summary><p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.a}</p></details>))}</div></div>
        </section>
      </div>
    </div>
  )
}