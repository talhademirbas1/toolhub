import type { Metadata } from 'next'
import ImageCropperTool from '@/components/image-cropper-tool'
import { ToolPageHeader } from '@/components/tool-page-header'
import { i18n, type Locale } from '@/i18n.config'

const PATH = '/tools/image-cropper'

const content = {
  tr: {
    metaTitle: 'Resim Kırpıcı',
    metaDescription: 'Resminizi istediğiniz boyuta kolayca kırpın. Tarayıcıda çalışır, kurulum ve kayıt gerekmez.',
    h1: 'Resim Kırpıcı',
    howToTitle: 'Resim kırpma nasıl yapılır?',
    howToText: 'Resminizi yükleyin, kırpma alanını sürükleyerek veya değerleri girerek belirleyin, ardından istediğiniz formatta indirin. Tüm işlem tarayıcınızda gerçekleşir.',
    useCasesTitle: 'Ne işe yarar?',
    useCases: [
      'Fotoğraftan istenmeyen kısımları çıkarmak',
      'Sosyal medya için belirli boyutlarda görsel hazırlamak',
      'Logo veya ikonları kırparak yeniden boyutlandırmak',
      'Belgelerdeki görselleri düzenlemek',
    ],
    faqTitle: 'Sık sorulan sorular',
    faq: [
      { q: 'Resimlerim sunucuya gönderiliyor mu?', a: 'Hayır, tüm işlem tarayıcınızda yapılır. Resimleriniz hiçbir sunucuya gönderilmez.' },
      { q: 'Hangi formatları destekliyor?', a: 'Giriş olarak PNG, JPG ve WEBP desteklenir. Çıktı olarak PNG, JPG ve WEBP seçebilirsiniz.' },
      { q: 'Kırpma alanını nasıl belirlerim?', a: 'Önizleme üzerinde fare ile sürükleyebilir veya piksel değerlerini manuel olarak girebilirsiniz.' },
    ],
  },
  en: {
    metaTitle: 'Image Cropper',
    metaDescription: 'Easily crop your image to any size. Works in your browser, no installation or sign-up needed.',
    h1: 'Image Cropper',
    howToTitle: 'How to crop an image?',
    howToText: 'Upload your image, define the crop area by dragging or entering values, then download in your preferred format. All processing happens in your browser.',
    useCasesTitle: 'What is it useful for?',
    useCases: [
      'Removing unwanted parts from a photo',
      'Preparing visuals in specific sizes for social media',
      'Cropping and resizing logos or icons',
      'Editing images in documents',
    ],
    faqTitle: 'Frequently asked questions',
    faq: [
      { q: 'Are my images sent to a server?', a: 'No, all processing happens in your browser. Your images are never sent to a server.' },
      { q: 'Which formats are supported?', a: 'PNG, JPG and WEBP are supported as input. You can choose PNG, JPG or WEBP as output.' },
      { q: 'How do I define the crop area?', a: 'You can drag on the preview with your mouse or enter pixel values manually.' },
    ],
  },
  es: {
    metaTitle: 'Recortador de Imágenes',
    metaDescription: 'Recorta tu imagen fácilmente al tamaño que quieras. Funciona en el navegador, sin instalación ni registro.',
    h1: 'Recortador de Imágenes',
    howToTitle: '¿Cómo recortar una imagen?',
    howToText: 'Sube tu imagen, define el área de recorte arrastrando o introduciendo valores y descárgala en el formato que prefieras. Todo el procesamiento ocurre en tu navegador.',
    useCasesTitle: '¿Para qué sirve?',
    useCases: [
      'Eliminar partes no deseadas de una foto',
      'Preparar imágenes en tamaños específicos para redes sociales',
      'Recortar y redimensionar logos o iconos',
      'Editar imágenes en documentos',
    ],
    faqTitle: 'Preguntas frecuentes',
    faq: [
      { q: '¿Mis imágenes se envían a un servidor?', a: 'No, todo el procesamiento ocurre en tu navegador. Tus imágenes nunca se envían a un servidor.' },
      { q: '¿Qué formatos son compatibles?', a: 'Se admiten PNG, JPG y WEBP como entrada. Puedes elegir PNG, JPG o WEBP como salida.' },
      { q: '¿Cómo defino el área de recorte?', a: 'Puedes arrastrar sobre la vista previa con el ratón o introducir valores en píxeles manualmente.' },
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

export default async function ImageCropperPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const c = content[lang]
  return (
    <div className="min-h-screen p-6 sm:p-10 bg-zinc-100 dark:bg-background text-foreground transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="sr-only">{c.h1}</h1>
        <ToolPageHeader lang={lang} />
        <ImageCropperTool lang={lang} />
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 space-y-8">
          <div className="space-y-3"><h2 className="text-xl font-semibold">{c.howToTitle}</h2><p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{c.howToText}</p></div>
          <div className="space-y-3"><h2 className="text-xl font-semibold">{c.useCasesTitle}</h2><ul className="list-disc pl-5 space-y-1.5 text-zinc-600 dark:text-zinc-400">{c.useCases.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div className="space-y-3"><h2 className="text-xl font-semibold">{c.faqTitle}</h2><div className="space-y-2">{c.faq.map((item) => (<details key={item.q} className="group rounded-lg border border-zinc-200 dark:border-zinc-800 px-4 py-3"><summary className="cursor-pointer font-medium">{item.q}</summary><p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.a}</p></details>))}</div></div>
        </section>
      </div>
    </div>
  )
}