import type { Metadata } from 'next'
import ColorPickerTool from '@/components/color-picker-tool'
import { ToolPageHeader } from '@/components/tool-page-header'
import { i18n, type Locale } from '@/i18n.config'

const PATH = '/tools/color-picker'

const content = {
  tr: {
    metaTitle: 'Renk Seçici ve Dönüştürücü',
    metaDescription: 'HEX, RGB ve HSL renk kodlarını anında dönüştürün. Ücretsiz online renk seçici ve dönüştürücü aracı.',
    h1: 'Renk Seçici ve Dönüştürücü',
    howToTitle: 'Renk kodları nasıl dönüştürülür?',
    howToText: 'Renk seçiciden bir renk seçin veya HEX, RGB ya da HSL alanlarına değer girin. Tüm formatlar otomatik olarak birbirine dönüşür. Kopyala butonuyla istediğiniz formattaki kodu panoya alın, palete ekle butonu ile renk koleksiyonunuzu oluşturun.',
    useCasesTitle: 'Ne işe yarar?',
    useCases: [
      'Web ve uygulama tasarımında renk kodlarını dönüştürmek',
      'CSS için HEX, RGB veya HSL değerlerini hızlıca almak',
      'Renk paletleri oluşturmak ve kaydetmek',
      'Farklı renk sistemleri arasında geçiş yapmak',
    ],
    faqTitle: 'Sık sorulan sorular',
    faq: [
      { q: 'HEX, RGB ve HSL nedir?', a: 'HEX onaltılık renk kodu (#FF0000), RGB kırmızı-yeşil-mavi değerleri (rgb(255,0,0)), HSL ise ton-doygunluk-parlaklık değerleridir (hsl(0,100%,50%)).' },
      { q: 'Renk seçiciyi nasıl kullanırım?', a: 'Renkli kutuya tıklayarak tarayıcının renk seçicisini açabilirsiniz. Seçtiğiniz renk otomatik olarak tüm formatlara dönüştürülür.' },
      { q: 'Palet kaydediliyor mu?', a: 'Palet yalnızca sayfa açık olduğu sürece tutulur, sayfa kapatılırsa sıfırlanır.' },
    ],
  },
  en: {
    metaTitle: 'Color Picker and Converter',
    metaDescription: 'Instantly convert HEX, RGB and HSL color codes. Free online color picker and converter tool.',
    h1: 'Color Picker and Converter',
    howToTitle: 'How to convert color codes?',
    howToText: 'Pick a color from the color picker or enter a value in the HEX, RGB or HSL fields. All formats are automatically converted to each other. Use the copy button to copy the code in your preferred format, and the add to palette button to build your color collection.',
    useCasesTitle: 'What is it useful for?',
    useCases: [
      'Converting color codes in web and app design',
      'Quickly getting HEX, RGB or HSL values for CSS',
      'Building and saving color palettes',
      'Switching between different color systems',
    ],
    faqTitle: 'Frequently asked questions',
    faq: [
      { q: 'What are HEX, RGB and HSL?', a: 'HEX is a hexadecimal color code (#FF0000), RGB uses red-green-blue values (rgb(255,0,0)), and HSL uses hue-saturation-lightness values (hsl(0,100%,50%)).' },
      { q: 'How do I use the color picker?', a: 'Click the colored box to open the browser\'s color picker. The selected color is automatically converted to all formats.' },
      { q: 'Is the palette saved?', a: 'The palette is only kept while the page is open; it resets when you close the page.' },
    ],
  },
  es: {
    metaTitle: 'Selector y Conversor de Colores',
    metaDescription: 'Convierte al instante códigos de color HEX, RGB y HSL. Herramienta gratuita de selección y conversión de colores online.',
    h1: 'Selector y Conversor de Colores',
    howToTitle: '¿Cómo convertir códigos de color?',
    howToText: 'Elige un color del selector o introduce un valor en los campos HEX, RGB o HSL. Todos los formatos se convierten automáticamente entre sí. Usa el botón copiar para copiar el código en el formato que prefieras, y el botón añadir a paleta para crear tu colección de colores.',
    useCasesTitle: '¿Para qué sirve?',
    useCases: [
      'Convertir códigos de color en diseño web y de apps',
      'Obtener rápidamente valores HEX, RGB o HSL para CSS',
      'Crear y guardar paletas de colores',
      'Cambiar entre diferentes sistemas de color',
    ],
    faqTitle: 'Preguntas frecuentes',
    faq: [
      { q: '¿Qué son HEX, RGB y HSL?', a: 'HEX es un código de color hexadecimal (#FF0000), RGB usa valores rojo-verde-azul (rgb(255,0,0)) y HSL usa valores de tono-saturación-luminosidad (hsl(0,100%,50%)).' },
      { q: '¿Cómo uso el selector de color?', a: 'Haz clic en el cuadro de color para abrir el selector de color del navegador. El color seleccionado se convierte automáticamente a todos los formatos.' },
      { q: '¿Se guarda la paleta?', a: 'La paleta solo se conserva mientras la página está abierta; se restablece al cerrarla.' },
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
    title: c.metaTitle, description: c.metaDescription,
    alternates: { canonical: `/${lang}${PATH}`, languages },
    openGraph: { title: c.metaTitle, description: c.metaDescription, url: `/${lang}${PATH}`, siteName: 'MyToolKit', locale: lang === 'tr' ? 'tr_TR' : lang === 'es' ? 'es_ES' : 'en_US', type: 'website' },
  }
}

export default async function ColorPickerPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const c = content[lang]
  return (
    <div className="min-h-screen p-6 sm:p-10 bg-zinc-100 dark:bg-background text-foreground transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="sr-only">{c.h1}</h1>
        <ToolPageHeader lang={lang} />
        <ColorPickerTool lang={lang} />
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 space-y-8">
          <div className="space-y-3"><h2 className="text-xl font-semibold">{c.howToTitle}</h2><p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{c.howToText}</p></div>
          <div className="space-y-3"><h2 className="text-xl font-semibold">{c.useCasesTitle}</h2><ul className="list-disc pl-5 space-y-1.5 text-zinc-600 dark:text-zinc-400">{c.useCases.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div className="space-y-3"><h2 className="text-xl font-semibold">{c.faqTitle}</h2><div className="space-y-2">{c.faq.map((item) => (<details key={item.q} className="group rounded-lg border border-zinc-200 dark:border-zinc-800 px-4 py-3"><summary className="cursor-pointer font-medium">{item.q}</summary><p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.a}</p></details>))}</div></div>
        </section>
      </div>
    </div>
  )
}