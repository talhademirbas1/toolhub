import type { Metadata } from "next";
import ScientificCalculatorTool from "@/components/scientific-calculator-tool";
import { ToolPageHeader } from "@/components/tool-page-header";
import { i18n, type Locale } from "@/i18n.config";

const PATH = "/tools/scientific-calculator";

const content = {
  tr: {
    metaTitle: "Bilimsel Hesap Makinesi",
    metaDescription:
      "Trigonometrik, logaritmik ve üslü işlemleri yapan ücretsiz online bilimsel hesap makinesi. Kayıt gerektirmez, tarayıcıda çalışır.",
    h1: "Bilimsel Hesap Makinesi",
    howToTitle: "Bilimsel hesap makinesi nasıl kullanılır?",
    howToText:
      "Klavye butonlarına tıklayarak sayılar ve işlemler girin. sin, cos, tan, log, ln ve karekök gibi bilimsel fonksiyonları kullanabilir, derece veya radyan modunu seçebilirsiniz. Sonucu görmek için = butonuna basmanız yeterli, elle hesaplama yapmanıza gerek kalmaz.",
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Trigonometrik ve logaritmik hesaplamalar yapmak",
      "Karekök ve üslü sayı işlemlerini hızlıca çözmek",
      "Okul ve üniversite ödevlerinde hızlı kontrol yapmak",
      "Mühendislik ve bilimsel hesaplamalarda pratik kullanım",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      { q: "Bilimsel hesap makinesi ücretsiz mi?", a: "Evet, araç tamamen ücretsizdir ve üyelik gerektirmez." },
      { q: "Derece mi radyan mı kullanmalıyım?", a: "Günlük hesaplamalar için genelde derece, matematiksel/bilimsel işlemler için radyan tercih edilir. İkisi arasında araç üzerinden anında geçiş yapabilirsiniz." },
      { q: "Girdiğim veriler bir sunucuya gönderiliyor mu?", a: "Hayır, tüm hesaplama tarayıcınızda yapılır, herhangi bir veri sunucuya gönderilmez." },
    ],
  },
  en: {
    metaTitle: "Scientific Calculator",
    metaDescription:
      "A free online scientific calculator for trigonometric, logarithmic and exponential operations. No sign-up, runs entirely in your browser.",
    h1: "Scientific Calculator",
    howToTitle: "How to use the scientific calculator",
    howToText:
      "Tap the on-screen buttons to enter numbers and operations. Use scientific functions like sin, cos, tan, log, ln and square root, and switch between degree and radian mode. Press = to see the result instantly, no manual calculation needed.",
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Performing trigonometric and logarithmic calculations",
      "Quickly solving square root and exponent operations",
      "Checking school and university homework quickly",
      "Practical use in engineering and scientific calculations",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Is the scientific calculator free?", a: "Yes, the tool is completely free and requires no account." },
      { q: "Should I use degrees or radians?", a: "Degrees are common for everyday calculations, while radians are preferred for scientific and mathematical work. You can switch between them instantly in the tool." },
      { q: "Is my input sent to a server?", a: "No, all calculations happen entirely in your browser, nothing is sent to a server." },
    ],
  },
  es: {
    metaTitle: "Calculadora Científica",
    metaDescription:
      "Calculadora científica online gratuita para operaciones trigonométricas, logarítmicas y exponenciales. Sin registro, funciona en tu navegador.",
    h1: "Calculadora Científica",
    howToTitle: "¿Cómo usar la calculadora científica?",
    howToText:
      "Toca los botones para introducir números y operaciones. Usa funciones científicas como sin, cos, tan, log, ln y raíz cuadrada, y cambia entre modo grados y radianes. Pulsa = para ver el resultado al instante, sin cálculos manuales.",
    useCasesTitle: "¿Para qué sirve?",
    useCases: [
      "Realizar cálculos trigonométricos y logarítmicos",
      "Resolver rápidamente raíces cuadradas y potencias",
      "Verificar tareas escolares y universitarias al instante",
      "Uso práctico en ingeniería y cálculos científicos",
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿La calculadora científica es gratis?", a: "Sí, la herramienta es completamente gratuita y no requiere cuenta." },
      { q: "¿Debo usar grados o radianes?", a: "Los grados son comunes para cálculos cotidianos, mientras que los radianes se prefieren en trabajos científicos. Puedes cambiar entre ambos al instante en la herramienta." },
      { q: "¿Mis datos se envían a un servidor?", a: "No, todos los cálculos se realizan completamente en tu navegador, no se envía nada a un servidor." },
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

export default async function ScientificCalculatorPage({
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
        <ScientificCalculatorTool lang={lang} />

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
