import type { Metadata } from "next";
import FaviconGeneratorTool from "@/components/favicon-generator-tool";
import { ToolPageHeader } from "@/components/tool-page-header";
import { i18n, type Locale } from "@/i18n.config";

const PATH = "/tools/favicon-generator";

const content = {
  tr: {
    metaTitle: "Online Favicon Oluşturucu",
    metaDescription:
      "Görselinizi tüm cihazlar için gerekli favicon boyutlarına dönüştürün. PNG olarak indirin, ücretsiz ve kayıt gerektirmez.",
    h1: "Online Favicon Oluşturucu",
    howToTitle: "Favicon oluşturucu nasıl kullanılır?",
    howToText:
      "Logonuzu veya kare bir görseli araca yükleyin. Araç otomatik olarak 5 farklı standart boyutta (16x16, 32x32, 180x180 Apple Touch Icon, 192x192 ve 512x512 Android/PWA ikonu) favicon üretir. Sonuçları tek tek ya da 'Tümünü İndir' ile toplu olarak PNG dosyası şeklinde indirebilirsiniz.",
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Web sitenize sekme ikonu (favicon) eklemek",
      "iOS ana ekran kısayolu için Apple Touch Icon oluşturmak",
      "Android ve PWA uygulamaları için gerekli ikon boyutlarını hazırlamak",
      "Marka logosunu tüm cihazlarda tutarlı şekilde göstermek",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "Hangi görsel formatlarını yükleyebilirim?",
        a: "PNG, JPG ve WEBP formatlarını yükleyebilirsiniz. En iyi sonuç için kare (1:1 oranlı) bir görsel kullanmanız önerilir.",
      },
      {
        q: "Favicon.ico dosyası da oluşturuyor mu?",
        a: "Hayır, araç modern tarayıcıların desteklediği PNG formatında favicon üretir; günümüzde çoğu site ve tarayıcı için bu yeterlidir.",
      },
      {
        q: "Görsellerim sunucuya yükleniyor mu?",
        a: "Hayır, tüm işlem tarayıcınızda gerçekleşir, görseliniz hiçbir sunucuya gönderilmez.",
      },
    ],
  },
  en: {
    metaTitle: "Online Favicon Generator",
    metaDescription:
      "Convert your image into all the favicon sizes your site needs. Download as PNG, completely free with no sign-up.",
    h1: "Online Favicon Generator",
    howToTitle: "How to use the favicon generator",
    howToText:
      "Upload your logo or a square image to the tool. It automatically generates 5 standard favicon sizes (16x16, 32x32, 180x180 Apple Touch Icon, and 192x192 / 512x512 Android/PWA icons). Download the results individually or all at once as PNG files.",
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Adding a browser tab icon (favicon) to your website",
      "Creating an Apple Touch Icon for iOS home screen shortcuts",
      "Preparing the icon sizes required for Android and PWA apps",
      "Displaying your brand logo consistently across all devices",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Which image formats can I upload?",
        a: "You can upload PNG, JPG and WEBP files. A square (1:1 ratio) image is recommended for the best result.",
      },
      {
        q: "Does it also generate a favicon.ico file?",
        a: "No, the tool generates PNG favicons, which are supported by all modern browsers and sufficient for most sites today.",
      },
      {
        q: "Are my images uploaded to a server?",
        a: "No, everything happens in your browser; your image is never sent to any server.",
      },
    ],
  },
  es: {
    metaTitle: "Generador de Favicon Online",
    metaDescription:
      "Convierte tu imagen en todos los tamaños de favicon que necesita tu sitio. Descarga en PNG, totalmente gratis y sin registro.",
    h1: "Generador de Favicon Online",
    howToTitle: "¿Cómo usar el generador de favicon?",
    howToText:
      "Sube tu logo o una imagen cuadrada a la herramienta. Generará automáticamente 5 tamaños estándar de favicon (16x16, 32x32, 180x180 Apple Touch Icon, y 192x192 / 512x512 para Android/PWA). Descarga los resultados uno a uno o todos a la vez en formato PNG.",
    useCasesTitle: "¿Para qué sirve?",
    useCases: [
      "Añadir un icono de pestaña (favicon) a tu sitio web",
      "Crear un Apple Touch Icon para accesos directos en iOS",
      "Preparar los tamaños de icono necesarios para apps Android y PWA",
      "Mostrar el logo de tu marca de forma coherente en todos los dispositivos",
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Qué formatos de imagen puedo subir?",
        a: "Puedes subir archivos PNG, JPG y WEBP. Se recomienda una imagen cuadrada (proporción 1:1) para obtener el mejor resultado.",
      },
      {
        q: "¿También genera un archivo favicon.ico?",
        a: "No, la herramienta genera favicons en PNG, compatibles con todos los navegadores modernos y suficientes para la mayoría de los sitios hoy en día.",
      },
      {
        q: "¿Mis imágenes se suben a un servidor?",
        a: "No, todo el proceso ocurre en tu navegador; tu imagen nunca se envía a ningún servidor.",
      },
    ],
  },
} as const;

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const c = content[lang];

  const languages = i18n.locales.reduce((acc, locale) => {
    acc[locale] = `/${locale}${PATH}`;
    return acc;
  }, {} as Record<string, string>);
  languages["x-default"] = `/${i18n.defaultLocale}${PATH}`;

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: `/${lang}${PATH}`,
      languages: languages,
    },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: `/${lang}${PATH}`,
      siteName: "MyToolKit",
      locale: lang === "tr" ? "tr_TR" : lang === "es" ? "es_ES" : "en_US",
      type: "website",
    },
  };
}

export default async function FaviconGeneratorPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const c = content[lang];

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-zinc-100 dark:bg-background text-foreground transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="sr-only">{c.h1}</h1>

        <ToolPageHeader lang={lang} />
        <FaviconGeneratorTool lang={lang} />

        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 space-y-8">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">{c.howToTitle}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {c.howToText}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">{c.useCasesTitle}</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-600 dark:text-zinc-400">
              {c.useCases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">{c.faqTitle}</h2>
            <div className="space-y-2">
              {c.faq.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-lg border border-zinc-200 dark:border-zinc-800 px-4 py-3"
                >
                  <summary className="cursor-pointer font-medium">
                    {item.q}
                  </summary>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
