import type { Metadata } from "next";
import QrCodeTool from "@/components/qr-code-tool";
import { ToolPageHeader } from "@/components/tool-page-header";
import { i18n, type Locale } from "@/i18n.config";

const PATH = "/tools/qr-code-generator";

const content = {
  tr: {
    metaTitle: "QR Kod Oluşturucu",
    metaDescription: "Metin veya link için ücretsiz QR kod oluşturun ve PNG olarak indirin. Kayıt gerektirmeyen online QR kod üretici.",
    h1: "QR Kod Oluşturucu",
    howToTitle: "QR kod oluşturucu nasıl kullanılır?",
    howToText: "QR koda dönüştürmek istediğiniz metni veya linki kutuya yazın, istediğiniz boyutu seçin ve 'QR Kod Oluştur' butonuna basın. Oluşan QR kodu doğrudan telefonunuzla tarayabilir veya PNG olarak bilgisayarınıza indirebilirsiniz.",
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Web sitesi veya sosyal medya linkinizi kartvizite eklemek",
      "Wi-Fi şifresini veya iletişim bilgisini kolayca paylaşmak",
      "Menü, broşür veya afişlere dijital link eklemek",
      "Etkinlik biletlerine veya ürün ambalajlarına QR kod yerleştirmek",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "Oluşturduğum QR kod süresiz mi çalışır?",
        a: "Evet, oluşturulan QR kod statiktir; içine kodladığınız bilgi değişmediği sürece süresiz olarak çalışmaya devam eder.",
      },
      {
        q: "QR kodu ticari amaçla kullanabilir miyim?",
        a: "Evet, oluşturduğunuz QR kodları kişisel veya ticari projelerinizde serbestçe kullanabilirsiniz.",
      },
      {
        q: "QR kod oluşturmak için kayıt olmam gerekiyor mu?",
        a: "Hayır, araç tamamen ücretsizdir ve herhangi bir kayıt veya üyelik gerektirmez.",
      },
      {
        q: "Hangi bilgileri QR koda dönüştürebilirim?",
        a: "Web sitesi linki, düz metin, telefon numarası veya e-posta adresi gibi her türlü kısa metni QR koda dönüştürebilirsiniz.",
      },
    ],
  },
  en: {
    metaTitle: "QR Code Generator",
    metaDescription: "Generate a free QR code for text or a link and download it as PNG. A free online QR code generator that needs no sign-up.",
    h1: "QR Code Generator",
    howToTitle: "How to use the QR code generator",
    howToText: "Type the text or link you want to turn into a QR code, choose the size you want, and click 'Generate QR Code'. You can scan the resulting QR code directly with your phone or download it as a PNG to your computer.",
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Adding your website or social media link to a business card",
      "Easily sharing a Wi-Fi password or contact information",
      "Adding a digital link to a menu, brochure or poster",
      "Placing a QR code on event tickets or product packaging",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Does the QR code I generate work forever?",
        a: "Yes, the generated QR code is static; it keeps working indefinitely as long as the information encoded in it doesn't need to change.",
      },
      {
        q: "Can I use the QR code for commercial purposes?",
        a: "Yes, you can freely use the QR codes you generate in your personal or commercial projects.",
      },
      {
        q: "Do I need to sign up to generate a QR code?",
        a: "No, the tool is completely free and requires no sign-up or account.",
      },
      {
        q: "What kind of information can I turn into a QR code?",
        a: "You can turn a website link, plain text, phone number or email address, or any similar short text, into a QR code.",
      },
    ],
  },
  es: {
    metaTitle: "Generador de Códigos QR",
    metaDescription: "Genera códigos QR gratis para textos o enlaces y descárgatelos como PNG. Generador online gratuito sin registro.",
    h1: "Generador de Códigos QR",
    howToTitle: "¿Cómo usar el generador de códigos QR?",
    howToText: "Escribe el texto o enlace que quieras convertir en código QR, selecciona el tamaño deseado y haz clic en 'Generar Código QR'. Puedes escanear el código QR resultante directamente con tu teléfono o descargarlo como PNG en tu ordenador.",
    useCasesTitle: "¿Para qué sirve?",
    useCases: [
      "Añadir el enlace de tu sitio web o redes sociales a una tarjeta de visita",
      "Compartir fácilmente una contraseña de Wi-Fi o información de contacto",
      "Añadir un enlace digital a un menú, folleto o cartel",
      "Colocar un código QR en entradas de eventos o embalajes de productos",
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿El código QR que genero funciona para siempre?",
        a: "Sí, el código QR generado es estático; sigue funcionando indefinidamente siempre que la información codificada en él no cambie.",
      },
      {
        q: "¿Puedo usar el código QR con fines comerciales?",
        a: "Sí, puedes utilizar libremente los códigos QR que generes en tus proyectos personales o comerciales.",
      },
      {
        q: "¿Necesito registrarme para generar un código QR?",
        a: "No, la herramienta es completamente gratuita y no requiere registro ni cuenta.",
      },
      {
        q: "¿Qué tipo de información puedo convertir en un código QR?",
        a: "Puedes convertir un enlace web, texto plano, número de teléfono, dirección de correo electrónico o cualquier texto corto similar en un código QR.",
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

export default async function QrCodeGeneratorPage({
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
        <QrCodeTool lang={lang} />

        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 space-y-8">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">{c.howToTitle}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{c.howToText}</p>
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
  );
}