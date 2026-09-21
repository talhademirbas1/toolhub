import type { Metadata } from "next";
import PasswordGeneratorTool from "@/components/password-generator-tool";
import { ToolPageHeader } from "@/components/tool-page-header";
import { i18n, type Locale } from "@/i18n.config";

const PATH = "/tools/password-generator";

const content = {
  tr: {
    metaTitle: "Şifre Oluşturucu",
    metaDescription: "Güçlü, rastgele ve güvenli şifreler oluşturun. Uzunluk ve karakter türlerini özelleştirin. Ücretsiz, kayıt gerektirmeyen online şifre üretici.",
    h1: "Şifre Oluşturucu",
    howToTitle: "Şifre oluşturucu nasıl kullanılır?",
    howToText: "Şifrenizin uzunluğunu kaydırıcıdan seçin, hangi karakter türlerinin (büyük harf, küçük harf, sayı, sembol) kullanılacağını işaretleyin ve 'Şifre Oluştur' butonuna basın. Oluşan şifreyi tek tıkla panoya kopyalayabilirsiniz. Şifre, tarayıcınızda üretilir ve hiçbir sunucuya gönderilmez.",
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Yeni bir hesap veya uygulama için güçlü bir şifre oluşturmak",
      "Zayıf veya tahmin edilebilir şifreleri yenilemek",
      "Şifre yöneticinize eklemek üzere rastgele şifreler üretmek",
      "Belirli uzunlukta veya karakter kısıtlamalı bir şifre oluşturmak",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "Oluşturulan şifreler bir yere kaydediliyor mu?",
        a: "Hayır, şifre tamamen tarayıcınızda üretilir ve hiçbir sunucuya gönderilmez veya kaydedilmez.",
      },
      {
        q: "Şifre ne kadar uzun olmalı?",
        a: "Güvenlik açısından en az 12 karakter önerilir, 16 karakter ve üzeri daha güçlü kabul edilir.",
      },
      {
        q: "Sembol içeren şifreler her sitede kabul ediliyor mu?",
        a: "Çoğu site sembol içeren şifreleri kabul eder, ancak bazı eski sistemler kısıtlama getirebilir; bu durumda sembol seçeneğini kapatabilirsiniz.",
      },
      {
        q: "Araç ücretsiz mi?",
        a: "Evet, araç tamamen ücretsizdir ve üyelik gerektirmez.",
      },
    ],
  },
  en: {
    metaTitle: "Password Generator",
    metaDescription: "Generate strong, random and secure passwords. Customize length and character types. A free online password generator that needs no sign-up.",
    h1: "Password Generator",
    howToTitle: "How to use the password generator",
    howToText: "Choose your password length with the slider, select which character types (uppercase, lowercase, numbers, symbols) to include, and click 'Generate Password'. You can copy the resulting password to your clipboard with one click. The password is generated in your browser and is never sent to any server.",
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Creating a strong password for a new account or app",
      "Replacing weak or guessable passwords",
      "Generating random passwords to add to your password manager",
      "Creating a password with a specific length or character restrictions",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Are the generated passwords stored anywhere?",
        a: "No, the password is generated entirely in your browser and is never sent to or stored on any server.",
      },
      {
        q: "How long should a password be?",
        a: "At least 12 characters is recommended for security, with 16 characters or more considered stronger.",
      },
      {
        q: "Are passwords with symbols accepted on every site?",
        a: "Most sites accept passwords with symbols, but some older systems may have restrictions; in that case you can turn off the symbols option.",
      },
      {
        q: "Is the tool free?",
        a: "Yes, the tool is completely free and requires no account.",
      },
    ],
  },
  es: {
    metaTitle: "Generador de Contraseñas",
    metaDescription: "Genera contraseñas fuertes, aleatorias y seguras. Personaliza la longitud y los tipos de caracteres. Generador online gratuito sin registro.",
    h1: "Generador de Contraseñas",
    howToTitle: "¿Cómo usar el generador de contraseñas?",
    howToText: "Elige la longitud de tu contraseña con el control deslizante, selecciona qué tipos de caracteres incluir y haz clic en 'Generar Contraseña'. Puedes copiar la contraseña resultante al portapapeles con un solo clic. La contraseña se genera en tu navegador y nunca se envía a ningún servidor.",
    useCasesTitle: "¿Para qué sirve?",
    useCases: [
      "Crear una contraseña fuerte para una nueva cuenta o aplicación",
      "Reemplazar contraseñas débiles o predecibles",
      "Generar contraseñas aleatorias para añadir a tu gestor de contraseñas",
      "Crear una contraseña con una longitud o restricciones específicas"
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Se guardan las contraseñas generadas en algún lugar?",
        a: "No, la contraseña se genera completamente en tu navegador y nunca se envía ni se almacena en ningún servidor."
      },
      {
        q: "¿Qué longitud debe tener una contraseña?",
        a: "Se recomienda al menos 12 caracteres por seguridad, y 16 caracteres o más se consideran más fuertes."
      },
      {
        q: "¿Las contraseñas con símbolos son aceptadas en todos los sitios?",
        a: "La mayoría de los sitios aceptan contraseñas con símbolos, pero algunos sistemas más antiguos pueden tener restricciones; en ese caso, puedes desactivar la opción de símbolos."
      },
      {
        q: "¿La herramienta es gratuita?",
        a: "Sí, la herramienta es completamente gratuita y no requiere cuenta."
      }
    ]
  }
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

export default async function PasswordGeneratorPage({
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
        <PasswordGeneratorTool lang={lang} />

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