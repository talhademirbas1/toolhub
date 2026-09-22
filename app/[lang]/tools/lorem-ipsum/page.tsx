import type { Metadata } from 'next'
import LoremIpsumTool from '@/components/lorem-ipsum-tool'
import { ToolPageHeader } from '@/components/tool-page-header'
import { i18n, type Locale } from '@/i18n.config'

const PATH = '/tools/lorem-ipsum'

const content = {
  tr: {
    metaTitle: 'Lorem Ipsum Üretici',
    metaDescription: 'İstediğiniz sayıda Lorem Ipsum paragrafı, cümle veya kelime üretin. Ücretsiz, kayıt gerektirmez.',
    h1: 'Lorem Ipsum Üretici',
    howToTitle: 'Lorem Ipsum nasıl üretilir?',
    howToText: 'Tür olarak paragraf, cümle veya kelime seçin, ardından üretmek istediğiniz adet girin ve "Üret" butonuna tıklayın. Oluşturulan metni kopyala butonuyla panoya alabilirsiniz.',
    useCasesTitle: 'Ne işe yarar?',
    useCases: [
      'Web ve uygulama tasarımında yer tutucu metin oluşturmak',
      'Baskı ve grafik tasarım projelerinde dolgu metni kullanmak',
      'Yazı tipi ve düzen testleri için örnek metin üretmek',
      'Şablon ve prototip geliştirmede hızlı içerik doldurmak',
    ],
    faqTitle: 'Sık sorulan sorular',
    faq: [
      { q: 'Lorem Ipsum ne anlama geliyor?', a: 'Lorem Ipsum, Cicero\'nun "de Finibus Bonorum et Malorum" adlı eserinden türetilmiş, anlamsız görünen ama aslında bozulmuş Latince bir metindir. Tasarımda yer tutucu olarak kullanılır.' },
      { q: 'Üretilen metin her seferinde farklı mı olur?', a: 'Evet, her üretimde kelimeler rastgele seçildiğinden metin değişir. Yalnızca "Lorem ipsum..." ile başlat seçeneği işaretliyse ilk cümle her zaman aynıdır.' },
      { q: 'Kaç paragraf üretebilirim?', a: 'En fazla 10 paragraf, 50 cümle veya 500 kelime üretebilirsiniz.' },
    ],
  },
  en: {
    metaTitle: 'Lorem Ipsum Generator',
    metaDescription: 'Generate any number of Lorem Ipsum paragraphs, sentences or words. Free, no sign-up required.',
    h1: 'Lorem Ipsum Generator',
    howToTitle: 'How to generate Lorem Ipsum?',
    howToText: 'Select the type as paragraph, sentence or word, enter the count you want to generate and click the "Generate" button. You can copy the generated text to your clipboard with the copy button.',
    useCasesTitle: 'What is it useful for?',
    useCases: [
      'Creating placeholder text in web and app design',
      'Using filler text in print and graphic design projects',
      'Generating sample text for font and layout tests',
      'Quickly filling content in template and prototype development',
    ],
    faqTitle: 'Frequently asked questions',
    faq: [
      { q: 'What does Lorem Ipsum mean?', a: 'Lorem Ipsum is derived from Cicero\'s "de Finibus Bonorum et Malorum", a scrambled piece of Latin text that looks meaningless. It is used as a placeholder in design.' },
      { q: 'Is the generated text different each time?', a: 'Yes, the text changes each time because words are randomly selected. Only the first sentence is always the same if the "Start with Lorem ipsum..." option is checked.' },
      { q: 'How many paragraphs can I generate?', a: 'You can generate up to 10 paragraphs, 50 sentences or 500 words.' },
    ],
  },
  es: {
    metaTitle: 'Generador de Lorem Ipsum',
    metaDescription: 'Genera el número de párrafos, frases o palabras de Lorem Ipsum que necesites. Gratis, sin registro.',
    h1: 'Generador de Lorem Ipsum',
    howToTitle: '¿Cómo generar Lorem Ipsum?',
    howToText: 'Selecciona el tipo como párrafo, oración o palabra, introduce la cantidad que deseas generar y haz clic en el botón "Generar". Puedes copiar el texto generado al portapapeles con el botón copiar.',
    useCasesTitle: '¿Para qué sirve?',
    useCases: [
      'Crear texto de marcador de posición en diseño web y de apps',
      'Usar texto de relleno en proyectos de diseño gráfico e impresión',
      'Generar texto de muestra para pruebas de tipografía y maquetación',
      'Rellenar contenido rápidamente en el desarrollo de plantillas y prototipos',
    ],
    faqTitle: 'Preguntas frecuentes',
    faq: [
      { q: '¿Qué significa Lorem Ipsum?', a: 'Lorem Ipsum se deriva de "de Finibus Bonorum et Malorum" de Cicerón, un fragmento de texto latino distorsionado que parece sin sentido. Se usa como marcador de posición en diseño.' },
      { q: '¿El texto generado es diferente cada vez?', a: 'Sí, el texto cambia cada vez porque las palabras se seleccionan al azar. Solo la primera oración es siempre la misma si la opción "Empezar con Lorem ipsum..." está marcada.' },
      { q: '¿Cuántos párrafos puedo generar?', a: 'Puedes generar hasta 10 párrafos, 50 oraciones o 500 palabras.' },
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

export default async function LoremIpsumPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const c = content[lang]
  return (
    <div className="min-h-screen p-6 sm:p-10 bg-zinc-100 dark:bg-background text-foreground transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="sr-only">{c.h1}</h1>
        <ToolPageHeader lang={lang} />
        <LoremIpsumTool lang={lang} />
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 space-y-8">
          <div className="space-y-3"><h2 className="text-xl font-semibold">{c.howToTitle}</h2><p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{c.howToText}</p></div>
          <div className="space-y-3"><h2 className="text-xl font-semibold">{c.useCasesTitle}</h2><ul className="list-disc pl-5 space-y-1.5 text-zinc-600 dark:text-zinc-400">{c.useCases.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div className="space-y-3"><h2 className="text-xl font-semibold">{c.faqTitle}</h2><div className="space-y-2">{c.faq.map((item) => (<details key={item.q} className="group rounded-lg border border-zinc-200 dark:border-zinc-800 px-4 py-3"><summary className="cursor-pointer font-medium">{item.q}</summary><p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.a}</p></details>))}</div></div>
        </section>
      </div>
    </div>
  )
}