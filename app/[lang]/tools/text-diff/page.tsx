import type { Metadata } from 'next'
import TextDiffTool from '@/components/text-diff-tool'
import { ToolPageHeader } from '@/components/tool-page-header'
import { i18n, type Locale } from '@/i18n.config'

const PATH = '/tools/text-diff'

const content = {
  tr: {
    metaTitle: 'Metin Karşılaştırıcı',
    metaDescription: 'İki metni karşılaştırın, eklenen ve silinen satırları anında görün. Ücretsiz online metin diff aracı.',
    h1: 'Metin Karşılaştırıcı',
    howToTitle: 'İki metin nasıl karşılaştırılır?',
    howToText: 'Sol kutuya orijinal metni, sağ kutuya değiştirilmiş metni yapıştırın ve "Karşılaştır" butonuna tıklayın. Yeşil satırlar eklenen, kırmızı üstü çizili satırlar silinen, gri satırlar ise değişmeyen kısımlardır.',
    useCasesTitle: 'Ne işe yarar?',
    useCases: [
      'Makale veya yazı revizyonlarını karşılaştırmak',
      'Kod bloklarındaki değişiklikleri bulmak',
      'Sözleşme veya belge versiyonlarını karşılaştırmak',
      'Ödev veya rapor güncellemelerini takip etmek',
    ],
    faqTitle: 'Sık sorulan sorular',
    faq: [
      { q: 'Karşılaştırma nasıl çalışır?', a: 'Araç, LCS (En Uzun Ortak Alt Dizi) algoritmasını kullanarak iki metin arasındaki satır bazlı farkları hesaplar.' },
      { q: 'Büyük metinler destekleniyor mu?', a: 'Evet, ancak çok büyük metinlerde (binlerce satır) işlem birkaç saniye sürebilir.' },
      { q: 'Verilerim kaydediliyor mu?', a: 'Hayır, tüm işlem tarayıcınızda yapılır. Hiçbir metin sunucuya gönderilmez.' },
    ],
  },
  en: {
    metaTitle: 'Text Comparator',
    metaDescription: 'Compare two texts and instantly see added and removed lines. Free online text diff tool.',
    h1: 'Text Comparator',
    howToTitle: 'How to compare two texts?',
    howToText: 'Paste the original text in the left box and the modified text in the right box, then click the "Compare" button. Green lines are added, red strikethrough lines are removed, and grey lines are unchanged.',
    useCasesTitle: 'What is it useful for?',
    useCases: [
      'Comparing article or writing revisions',
      'Finding changes in code blocks',
      'Comparing contract or document versions',
      'Tracking assignment or report updates',
    ],
    faqTitle: 'Frequently asked questions',
    faq: [
      { q: 'How does the comparison work?', a: 'The tool uses the LCS (Longest Common Subsequence) algorithm to calculate line-by-line differences between two texts.' },
      { q: 'Are large texts supported?', a: 'Yes, but for very large texts (thousands of lines), processing may take a few seconds.' },
      { q: 'Is my data saved?', a: 'No, all processing happens in your browser. No text is ever sent to a server.' },
    ],
  },
  es: {
    metaTitle: 'Comparador de Textos',
    metaDescription: 'Compara dos textos y ve al instante las líneas añadidas y eliminadas. Herramienta gratuita de diff de texto online.',
    h1: 'Comparador de Textos',
    howToTitle: '¿Cómo comparar dos textos?',
    howToText: 'Pega el texto original en el cuadro izquierdo y el texto modificado en el cuadro derecho, luego haz clic en el botón "Comparar". Las líneas verdes son añadidas, las líneas rojas tachadas son eliminadas y las líneas grises no tienen cambios.',
    useCasesTitle: '¿Para qué sirve?',
    useCases: [
      'Comparar revisiones de artículos o escritos',
      'Encontrar cambios en bloques de código',
      'Comparar versiones de contratos o documentos',
      'Hacer seguimiento de actualizaciones de tareas o informes',
    ],
    faqTitle: 'Preguntas frecuentes',
    faq: [
      { q: '¿Cómo funciona la comparación?', a: 'La herramienta utiliza el algoritmo LCS (Subsecuencia Común más Larga) para calcular las diferencias línea por línea entre dos textos.' },
      { q: '¿Se admiten textos grandes?', a: 'Sí, pero para textos muy grandes (miles de líneas), el procesamiento puede tardar unos segundos.' },
      { q: '¿Se guardan mis datos?', a: 'No, todo el procesamiento ocurre en tu navegador. Ningún texto se envía nunca a un servidor.' },
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

export default async function TextDiffPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const c = content[lang]
  return (
    <div className="min-h-screen p-6 sm:p-10 bg-zinc-100 dark:bg-background text-foreground transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="sr-only">{c.h1}</h1>
        <ToolPageHeader lang={lang} />
        <TextDiffTool lang={lang} />
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 space-y-8">
          <div className="space-y-3"><h2 className="text-xl font-semibold">{c.howToTitle}</h2><p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{c.howToText}</p></div>
          <div className="space-y-3"><h2 className="text-xl font-semibold">{c.useCasesTitle}</h2><ul className="list-disc pl-5 space-y-1.5 text-zinc-600 dark:text-zinc-400">{c.useCases.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div className="space-y-3"><h2 className="text-xl font-semibold">{c.faqTitle}</h2><div className="space-y-2">{c.faq.map((item) => (<details key={item.q} className="group rounded-lg border border-zinc-200 dark:border-zinc-800 px-4 py-3"><summary className="cursor-pointer font-medium">{item.q}</summary><p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.a}</p></details>))}</div></div>
        </section>
      </div>
    </div>
  )
}