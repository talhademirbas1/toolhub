import type { Metadata } from "next";
import FractionCalculatorTool from "@/components/fraction-calculator-tool";
import { ToolPageHeader } from "@/components/tool-page-header";
import { i18n, type Locale } from "@/i18n.config";

const PATH = "/tools/fraction-calculator";

const content = {
  tr: {
    metaTitle: "Kesir Hesaplama",
    metaDescription:
      "İki kesirle toplama, çıkarma, çarpma ve bölme işlemi yapın, sonucu sadeleştirilmiş ve ondalık olarak anında görün. Ücretsiz online kesir hesaplama aracı.",
    h1: "Kesir Hesaplama",
    howToTitle: "Kesir hesaplama nasıl yapılır?",
    howToText:
      "İki kesrin pay ve payda değerlerini girin, aralarındaki işlemi (toplama, çıkarma, çarpma, bölme) seçin. Araç sonucu otomatik olarak en sade haline indirger ve ondalık karşılığını da gösterir.",
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Kesirlerle dört işlem yapmak",
      "Sonucu otomatik olarak sadeleştirmek",
      "Kesir sonucunun ondalık karşılığını görmek",
      "Matematik ödevlerinde hızlı kontrol yapmak",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      { q: "Kesir hesaplama aracı ücretsiz mi?", a: "Evet, araç tamamen ücretsizdir ve üyelik gerektirmez." },
      { q: "Sonuç otomatik olarak sadeleştiriliyor mu?", a: "Evet, sonuç en büyük ortak bölen kullanılarak otomatik olarak sadeleştirilir." },
      { q: "Negatif kesirlerle çalışır mı?", a: "Evet, negatif pay ve payda değerleriyle de doğru sonuç verir." },
    ],
  },
  en: {
    metaTitle: "Fraction Calculator",
    metaDescription:
      "Add, subtract, multiply and divide two fractions and instantly see the simplified and decimal result. A free online fraction calculator.",
    h1: "Fraction Calculator",
    howToTitle: "How to calculate with fractions",
    howToText:
      "Enter the numerator and denominator of two fractions and choose the operation (addition, subtraction, multiplication, division). The tool automatically simplifies the result and also shows its decimal equivalent.",
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Performing the four operations with fractions",
      "Automatically simplifying the result",
      "Seeing the decimal equivalent of a fraction result",
      "Quickly checking math homework",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Is the fraction calculator free?", a: "Yes, the tool is completely free and requires no account." },
      { q: "Is the result automatically simplified?", a: "Yes, the result is automatically simplified using the greatest common divisor." },
      { q: "Does it work with negative fractions?", a: "Yes, it gives correct results with negative numerators and denominators too." },
    ],
  },
  es: {
    metaTitle: "Calculadora de Fracciones",
    metaDescription:
      "Suma, resta, multiplica y divide dos fracciones y ve al instante el resultado simplificado y decimal. Calculadora de fracciones online gratis.",
    h1: "Calculadora de Fracciones",
    howToTitle: "¿Cómo calcular con fracciones?",
    howToText:
      "Introduce el numerador y denominador de dos fracciones y elige la operación (suma, resta, multiplicación, división). La herramienta simplifica automáticamente el resultado y muestra también su equivalente decimal.",
    useCasesTitle: "¿Para qué sirve?",
    useCases: [
      "Realizar las cuatro operaciones con fracciones",
      "Simplificar automáticamente el resultado",
      "Ver el equivalente decimal de una fracción",
      "Verificar tareas de matemáticas rápidamente",
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿La calculadora de fracciones es gratis?", a: "Sí, la herramienta es completamente gratuita y no requiere cuenta." },
      { q: "¿El resultado se simplifica automáticamente?", a: "Sí, el resultado se simplifica automáticamente usando el máximo común divisor." },
      { q: "¿Funciona con fracciones negativas?", a: "Sí, da resultados correctos también con numeradores y denominadores negativos." },
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

export default async function FractionCalculatorPage({
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
        <FractionCalculatorTool lang={lang} />

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
