import type { Metadata } from "next";
import ExponentRootCalculatorTool from "@/components/exponent-root-calculator-tool";
import { ToolPageHeader } from "@/components/tool-page-header";
import { i18n, type Locale } from "@/i18n.config";

const PATH = "/tools/exponent-root-calculator";

const content = {
  tr: {
    metaTitle: "Üslü-Köklü Sayı Hesaplama",
    metaDescription:
      "Bir sayının üssünü veya n. dereceden kökünü anında hesaplayın. Ücretsiz, kayıt gerektirmeyen online üslü-köklü sayı hesaplama aracı.",
    h1: "Üslü-Köklü Sayı Hesaplama",
    howToTitle: "Üslü ve köklü sayılar nasıl hesaplanır?",
    howToText:
      "Üs Alma sekmesinde taban ve üs değerini girerek taban^üs sonucunu anında görün. Kök Alma sekmesinde ise sayı ve kök derecesini (n) girerek n. dereceden kökü hesaplayın. Negatif sayıların çift dereceden kökü alınamayacağı için araç sizi otomatik olarak uyarır.",
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Üslü sayı (kuvvet) hesaplamaları yapmak",
      "Karekök ve küpkök gibi n. dereceden kökleri bulmak",
      "Matematik ödevlerinde hızlı kontrol yapmak",
      "Bilimsel ve mühendislik hesaplamalarında pratik kullanım",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      { q: "Üslü-köklü hesap makinesi ücretsiz mi?", a: "Evet, araç tamamen ücretsizdir ve üyelik gerektirmez." },
      { q: "Negatif sayıların köklerini hesaplayabilir miyim?", a: "Tek dereceden köklerde (örneğin küpkök) evet, ama çift dereceden köklerde (karekök gibi) negatif sayıların gerçek sayı kökü olmadığı için araç sizi uyarır." },
      { q: "Ondalıklı üs değerleriyle çalışır mı?", a: "Evet, hem tam sayı hem de ondalıklı üs ve kök dereceleriyle hesaplama yapabilirsiniz." },
    ],
  },
  en: {
    metaTitle: "Exponent-Root Calculator",
    metaDescription:
      "Instantly calculate the power or the nth root of a number. A free online exponent and root calculator with no sign-up.",
    h1: "Exponent-Root Calculator",
    howToTitle: "How to calculate powers and roots",
    howToText:
      "In the Power tab, enter the base and exponent to instantly see the result of base^exponent. In the Root tab, enter the number and the root degree (n) to calculate the nth root. Since even-degree roots of negative numbers don't exist as real numbers, the tool warns you automatically.",
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Calculating powers of a number",
      "Finding nth roots such as square roots and cube roots",
      "Quickly checking math homework",
      "Practical use in scientific and engineering calculations",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Is the exponent-root calculator free?", a: "Yes, the tool is completely free and requires no account." },
      { q: "Can I calculate roots of negative numbers?", a: "Yes for odd-degree roots (like cube roots), but for even-degree roots (like square roots) the tool warns you since negative numbers have no real root." },
      { q: "Does it work with decimal exponents?", a: "Yes, you can calculate with both whole and decimal exponents and root degrees." },
    ],
  },
  es: {
    metaTitle: "Calculadora de Potencias y Raíces",
    metaDescription:
      "Calcula al instante la potencia o la raíz enésima de un número. Calculadora online gratuita de potencias y raíces, sin registro.",
    h1: "Calculadora de Potencias y Raíces",
    howToTitle: "¿Cómo calcular potencias y raíces?",
    howToText:
      "En la pestaña Potencia, introduce la base y el exponente para ver al instante el resultado de base^exponente. En la pestaña Raíz, introduce el número y el grado de la raíz (n) para calcular la raíz enésima. Como las raíces de grado par de números negativos no existen como números reales, la herramienta te avisa automáticamente.",
    useCasesTitle: "¿Para qué sirve?",
    useCases: [
      "Calcular potencias de un número",
      "Encontrar raíces enésimas como raíces cuadradas y cúbicas",
      "Verificar tareas de matemáticas rápidamente",
      "Uso práctico en cálculos científicos y de ingeniería",
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿La calculadora de potencias y raíces es gratis?", a: "Sí, la herramienta es completamente gratuita y no requiere cuenta." },
      { q: "¿Puedo calcular raíces de números negativos?", a: "Sí, en raíces de grado impar (como la cúbica), pero en raíces de grado par (como la cuadrada) la herramienta te avisa porque no existe raíz real." },
      { q: "¿Funciona con exponentes decimales?", a: "Sí, puedes calcular tanto con exponentes y grados de raíz enteros como decimales." },
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

export default async function ExponentRootCalculatorPage({
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
        <ExponentRootCalculatorTool lang={lang} />

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
