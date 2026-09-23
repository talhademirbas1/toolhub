import type { Metadata } from "next";
import BusinessDaysCalculatorTool from "@/components/business-days-calculator-tool";
import { ToolPageHeader } from "@/components/tool-page-header";
import { i18n, type Locale } from "@/i18n.config";

const PATH = "/tools/business-days-calculator";

const content = {
  tr: {
    metaTitle: "İş Günü Hesaplayıcı",
    metaDescription:
      "İki tarih arasındaki iş günü sayısını hesaplayın veya bir tarihe iş günü ekleyin. Hafta sonlarını otomatik hariç tutan ücretsiz online araç.",
    h1: "İş Günü Hesaplayıcı",
    howToTitle: "İş günü hesaplayıcı nasıl kullanılır?",
    howToText:
      "Üstteki iki seçenekten birini seçin: 'İki Tarih Arası' ile başlangıç ve bitiş tarihi arasındaki iş günü sayısını öğrenebilir, 'Tarihe Ekle' ile bir başlangıç tarihine belirli sayıda iş günü ekleyerek sonuç tarihi bulabilirsiniz. Araç, cumartesi ve pazar günlerini otomatik olarak hesaba katmaz.",
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Teslim tarihlerini ve proje sürelerini iş günü bazında planlamak",
      "Kargo veya sipariş tahmini teslim tarihini hesaplamak",
      "Sözleşme veya yasal süreçlerdeki iş günü sürelerini takip etmek",
      "İzin, rapor veya çalışma günlerini planlamak",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "Resmi tatiller hesaba katılıyor mu?",
        a: "Hayır, araç yalnızca cumartesi ve pazar günlerini hariç tutar; resmi tatiller dahil edilmez.",
      },
      {
        q: "Geriye doğru tarih hesaplayabilir miyim?",
        a: "Evet, 'Tarihe Ekle' modunda negatif bir sayı girerek geçmişe doğru iş günü hesaplayabilirsiniz.",
      },
      {
        q: "Araç ücretsiz mi?",
        a: "Evet, tamamen ücretsizdir ve kayıt gerektirmez.",
      },
    ],
  },
  en: {
    metaTitle: "Business Days Calculator",
    metaDescription:
      "Calculate the number of business days between two dates, or add business days to a date. Free online tool that automatically excludes weekends.",
    h1: "Business Days Calculator",
    howToTitle: "How to use the business days calculator",
    howToText:
      "Choose one of the two modes above: 'Between Two Dates' shows how many business days fall between a start and end date, while 'Add to Date' lets you add a number of business days to a starting date to find the resulting date. The tool automatically excludes Saturdays and Sundays.",
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Planning deadlines and project timelines in business days",
      "Estimating shipping or order delivery dates",
      "Tracking business-day periods in contracts or legal processes",
      "Planning leave, reports or working days",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Are public holidays taken into account?",
        a: "No, the tool only excludes Saturdays and Sundays; public holidays are not included.",
      },
      {
        q: "Can I calculate backwards from a date?",
        a: "Yes, enter a negative number in 'Add to Date' mode to calculate business days going backwards.",
      },
      {
        q: "Is the tool free?",
        a: "Yes, it's completely free and requires no sign-up.",
      },
    ],
  },
  es: {
    metaTitle: "Calculadora de Días Hábiles",
    metaDescription:
      "Calcula el número de días hábiles entre dos fechas, o añade días hábiles a una fecha. Herramienta online gratuita que excluye los fines de semana automáticamente.",
    h1: "Calculadora de Días Hábiles",
    howToTitle: "¿Cómo usar la calculadora de días hábiles?",
    howToText:
      "Elige uno de los dos modos: 'Entre Dos Fechas' muestra cuántos días hábiles hay entre una fecha de inicio y una de fin, mientras que 'Añadir a una Fecha' te permite sumar un número de días hábiles a una fecha inicial para obtener la fecha resultante. La herramienta excluye automáticamente sábados y domingos.",
    useCasesTitle: "¿Para qué sirve?",
    useCases: [
      "Planificar plazos y cronogramas de proyectos en días hábiles",
      "Estimar fechas de entrega de envíos o pedidos",
      "Seguir plazos de días hábiles en contratos o procesos legales",
      "Planificar vacaciones, informes o días de trabajo",
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Se tienen en cuenta los días festivos?",
        a: "No, la herramienta solo excluye sábados y domingos; los días festivos no están incluidos.",
      },
      {
        q: "¿Puedo calcular hacia atrás desde una fecha?",
        a: "Sí, introduce un número negativo en el modo 'Añadir a una Fecha' para calcular días hábiles hacia atrás.",
      },
      {
        q: "¿Es gratuita la herramienta?",
        a: "Sí, es completamente gratuita y no requiere registro.",
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

export default async function BusinessDaysCalculatorPage({
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
        <BusinessDaysCalculatorTool lang={lang} />

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
