import type { Metadata } from "next";
import RatioProportionCalculatorTool from "@/components/ratio-proportion-calculator-tool";
import { ToolPageHeader } from "@/components/tool-page-header";
import { i18n, type Locale } from "@/i18n.config";

const PATH = "/tools/ratio-proportion-calculator";

const content = {
  tr: {
    metaTitle: "Oran-Orantı Hesaplama",
    metaDescription:
      "Dört terimli bir orantıda bilinmeyen değeri (x) anında bulun. Ücretsiz, kayıt gerektirmeyen online oran-orantı hesaplama aracı.",
    h1: "Oran-Orantı Hesaplama",
    howToTitle: "Oran-orantı nasıl hesaplanır?",
    howToText:
      "a/b = c/d şeklindeki orantıda hangi değerin bilinmeyen olduğunu seçin, diğer üç değeri girin. Araç çapraz çarpma yöntemiyle bilinmeyen değeri anında hesaplar.",
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Orantı problemlerinde bilinmeyeni bulmak",
      "Tarif, harita ölçeği veya malzeme oranlarını hesaplamak",
      "Matematik ödevlerinde hızlı kontrol yapmak",
      "İş ve finans hesaplamalarında oranlama yapmak",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      { q: "Oran-orantı hesaplama aracı ücretsiz mi?", a: "Evet, araç tamamen ücretsizdir ve üyelik gerektirmez." },
      { q: "Hangi değeri bilinmeyen seçmeliyim?", a: "a, b, c veya d harflerinden hangisini bilmiyorsanız onu seçin, aracı diğer üç değeri kullanarak sonucu hesaplar." },
      { q: "Ondalıklı sayılarla çalışır mı?", a: "Evet, tam sayı ve ondalıklı sayılarla doğru sonuç verir." },
    ],
  },
  en: {
    metaTitle: "Ratio-Proportion Calculator",
    metaDescription:
      "Instantly find the missing value (x) in a four-term proportion. A free online ratio-proportion calculator with no sign-up.",
    h1: "Ratio-Proportion Calculator",
    howToTitle: "How to solve a proportion",
    howToText:
      "In a proportion written as a/b = c/d, choose which value is unknown and enter the other three. The tool uses cross-multiplication to instantly calculate the missing value.",
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Finding the missing value in proportion problems",
      "Calculating recipe scaling, map scales or material ratios",
      "Quickly checking math homework",
      "Ratio calculations in business and finance",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Is the ratio-proportion calculator free?", a: "Yes, the tool is completely free and requires no account." },
      { q: "Which value should I choose as unknown?", a: "Choose whichever of a, b, c or d you don't know, and the tool calculates it using the other three values." },
      { q: "Does it work with decimal numbers?", a: "Yes, it gives correct results with both whole and decimal numbers." },
    ],
  },
  es: {
    metaTitle: "Calculadora de Razón y Proporción",
    metaDescription:
      "Encuentra al instante el valor desconocido (x) en una proporción de cuatro términos. Calculadora de razón y proporción online gratis.",
    h1: "Calculadora de Razón y Proporción",
    howToTitle: "¿Cómo resolver una proporción?",
    howToText:
      "En una proporción escrita como a/b = c/d, elige qué valor es la incógnita e introduce los otros tres. La herramienta usa la multiplicación cruzada para calcular al instante el valor desconocido.",
    useCasesTitle: "¿Para qué sirve?",
    useCases: [
      "Encontrar el valor desconocido en problemas de proporciones",
      "Calcular escalas de recetas, mapas o proporciones de materiales",
      "Verificar tareas de matemáticas rápidamente",
      "Cálculos de proporciones en negocios y finanzas",
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿La calculadora de razón y proporción es gratis?", a: "Sí, la herramienta es completamente gratuita y no requiere cuenta." },
      { q: "¿Qué valor debo elegir como incógnita?", a: "Elige el que no conozcas entre a, b, c o d, y la herramienta lo calculará usando los otros tres valores." },
      { q: "¿Funciona con números decimales?", a: "Sí, da resultados correctos tanto con números enteros como decimales." },
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

export default async function RatioProportionCalculatorPage({
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
        <RatioProportionCalculatorTool lang={lang} />

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
