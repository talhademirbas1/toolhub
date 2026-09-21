import type { Metadata } from "next";
import ImageConverterTool from "@/components/image-converter-tool";
import { ToolPageHeader } from "@/components/tool-page-header";
import { i18n, type Locale } from "@/i18n.config";

const PATH = "/tools/image-converter";

const content = {
  tr: {
    metaTitle: "Online Resim Dönüştürücü",
    metaDescription: "Görsellerinizi farklı resim formatlarına kolayca dönüştürün. Ücretsiz, kayıt gerektirmeyen ve kullanımı basit online resim dönüştürücü.",
    h1: "Online Resim Dönüştürücü",
    howToTitle: "Resim dönüştürücü nasıl kullanılır?",
    howToText: "Dönüştürmek istediğiniz görseli araca yükleyin, istediğiniz çıktı formatını seçin ve dönüştürme işlemini başlatın. Sonuç hazır olunca yeni dosyayı bilgisayarınıza veya telefonunuza kaydedebilirsiniz. Kayıt olmanız veya bir program kurmanız gerekmez, araç doğrudan tarayıcıda çalışır.",
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Bir siteye veya forma yüklerken istenen resim formatına çevirmek",
      "Uyumsuz bir formattaki görseli her cihazda açılabilir hale getirmek",
      "Web sitesi ve blog görsellerini uygun formata dönüştürmek",
      "Program kurmadan tarayıcıdan hızlıca format değiştirmek",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "Resim dönüştürücü ücretsiz mi, üyelik gerekiyor mu?",
        a: "Araç tamamen ücretsizdir ve üyelik gerektirmez.",
      },
      {
        q: "Hangi formatlara dönüştürebilirim?",
        a: "Seçebileceğiniz çıktı formatları dönüştürme ekranında listelenir.",
      },
      {
        q: "Telefondan veya tabletten kullanabilir miyim?",
        a: "Araç tarayıcıda çalışır, bu yüzden telefon, tablet ve bilgisayardan kullanabilirsiniz.",
      },
    ],
  },
  en: {
    metaTitle: "Online Image Converter",
    metaDescription: "Convert your images to other image formats with ease. A free, simple online image converter that needs no sign-up.",
    h1: "Online Image Converter",
    howToTitle: "How to use the image converter",
    howToText: "Upload the image you want to convert, choose the output format you need and start the conversion. When the result is ready, you can save the new file to your computer or phone. You don't need to sign up or install a program, the tool works right in your browser.",
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Converting an image to the format a website or form asks for",
      "Making an image in an incompatible format open on any device",
      "Converting website and blog images to a suitable format",
      "Changing formats quickly in your browser without installing software",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Is the image converter free? Do I need an account?",
        a: "The tool is completely free and requires no account.",
      },
      {
        q: "Which formats can I convert to?",
        a: "The output formats you can choose from are listed on the conversion screen.",
      },
      {
        q: "Can I use it on my phone or tablet?",
        a: "The tool runs in your browser, so you can use it on a phone, tablet or computer.",
      },
    ],
  },
  es: {
    metaTitle: "Convertidor de Imágenes Online",
    metaDescription: "Convierte tus imágenes a diferentes formatos fácilmente. Convertidor de imágenes online gratuito, sencillo y sin registro.",
    h1: "Convertidor de Imágenes Online",
    howToTitle: "¿Cómo usar el convertidor de imágenes?",
    howToText: "Sube la imagen que deseas convertir, elige el formato de salida y comienza la conversión. Cuando el resultado esté listo, puedes guardar el nuevo archivo en tu ordenador o teléfono. No necesitas registrarte ni instalar programas, funciona directamente en tu navegador.",
    useCasesTitle: "¿Para qué sirve?",
    useCases: [
      "Convertir una imagen al formato requerido por un sitio web o formulario",
      "Hacer que una imagen en formato incompatible se pueda abrir en cualquier dispositivo",
      "Convertir imágenes de sitios web y blogs al formato adecuado",
      "Cambiar formatos rápidamente en tu navegador sin instalar software",
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿El convertidor de imágenes es gratis? ¿Necesito una cuenta?",
        a: "La herramienta es completamente gratuita y no requiere cuenta.",
      },
      {
        q: "¿A qué formatos puedo convertir?",
        a: "Los formatos de salida que puedes elegir están listados en la pantalla de conversión.",
      },
      {
        q: "¿Puedo usarlo en mi teléfono o tablet?",
        a: "La herramienta funciona en el navegador, por lo que puedes usarla desde un móvil, tablet u ordenador.",
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

export default async function ImageConverterPage({
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
        <ImageConverterTool lang={lang} />

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