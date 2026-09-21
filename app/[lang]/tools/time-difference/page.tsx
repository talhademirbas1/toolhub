import type { Metadata } from "next";
import TimeDifferenceTool from "@/components/time-difference-tool";
import { ToolPageHeader } from "@/components/tool-page-header";
import { i18n, type Locale } from "@/i18n.config";

const PATH = "/tools/time-difference";

const content = {
  tr: {
    metaTitle: "Zaman Farkı Hesaplama",
    metaDescription: "İki zaman arasındaki farkı anında hesaplayın. Ücretsiz, kayıt gerektirmeyen ve kullanımı kolay online zaman farkı hesaplama aracı.",
    h1: "Zaman Farkı Hesaplama",
    howToTitle: "Zaman farkı nasıl hesaplanır?",
    howToText: "Karşılaştırmak istediğiniz iki zamanı araca girin, aradaki fark anında hesaplansın. Elle çıkarma işlemi yapmanıza ve hata yapma ihtimaline gerek kalmaz. Kayıt olmanız gerekmez, araç doğrudan tarayıcıda çalışır.",
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Mesai, vardiya ve çalışma sürelerini hesaplamak",
      "Bir etkinliğin veya yolculuğun ne kadar sürdüğünü bulmak",
      "Toplantı ve program planlarında süreleri kontrol etmek",
      "Zaman farkını elle çıkarmadan hızlıca görmek",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "Zaman farkı hesaplama aracı ücretsiz mi, üyelik gerekiyor mu?",
        a: "Araç tamamen ücretsizdir ve üyelik gerektirmez.",
      },
      {
        q: "Telefondan veya tabletten kullanabilir miyim?",
        a: "Araç tarayıcıda çalışır, bu yüzden telefon, tablet ve bilgisayardan kullanabilirsiniz.",
      },
    ],
  },
  en: {
    metaTitle: "Time Difference Calculator",
    metaDescription: "Instantly calculate the difference between two times. A free, easy-to-use online time difference calculator that needs no sign-up.",
    h1: "Time Difference Calculator",
    howToTitle: "How to calculate a time difference",
    howToText: "Enter the two times you want to compare and the difference is calculated instantly. There's no need to subtract by hand and risk making a mistake. You don't need to sign up, the tool works right in your browser.",
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Calculating work hours, shifts and durations",
      "Finding out how long an event or a trip took",
      "Checking durations when planning meetings and schedules",
      "Seeing the time difference quickly without subtracting by hand",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Is the time difference calculator free? Do I need an account?",
        a: "The tool is completely free and requires no account.",
      },
      {
        q: "Can I use it on my phone or tablet?",
        a: "The tool runs in your browser, so you can use it on a phone, tablet or computer.",
      },
    ],
  },
  es: {
    metaTitle: "Calculadora de Diferencia de Tiempo",
    metaDescription: "Calcula al instante la diferencia entre dos tiempos. Calculadora online de diferencia de tiempo gratuita, fácil de usar y sin registro.",
    h1: "Calculadora de Diferencia de Tiempo",
    howToTitle: "¿Cómo calcular la diferencia de tiempo?",
    howToText: "Introduce los dos tiempos que deseas comparar en la herramienta y la diferencia se calculará al instante. No necesitas hacer restas a mano ni arriesgarte a cometer errores. No requiere registro, la herramienta funciona directamente en tu navegador.",
    useCasesTitle: "¿Para qué sirve?",
    useCases: [
      "Calcular horas de trabajo, turnos y duraciones",
      "Averiguar cuánto duró un evento o un viaje",
      "Comprobar duraciones al planificar reuniones y horarios",
      "Ver la diferencia de tiempo rápidamente sin restar a mano",
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿La calculadora de diferencia de tiempo es gratuita? ¿Necesito una cuenta?",
        a: "La herramienta es completamente gratuita y no requiere cuenta.",
      },
      {
        q: "¿Puedo usarla en mi teléfono o tablet?",
        a: "La herramienta funciona en el navegador, por lo que puedes usarla desde móviles, tablets u ordenadores.",
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

export default async function TimeDifferencePage({
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
        <TimeDifferenceTool lang={lang} />

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