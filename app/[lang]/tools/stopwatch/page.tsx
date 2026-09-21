import type { Metadata } from "next";
import StopwatchTool from "@/components/stopwatch-tool";
import { ToolPageHeader } from "@/components/tool-page-header";
import { i18n, type Locale } from "@/i18n.config";

const PATH = "/tools/stopwatch";

const content = {
  tr: {
    metaTitle: "Online Kronometre",
    metaDescription: "Başlat, durdur ve sıfırla düğmeleriyle zamanı ölçün. Ücretsiz, kayıt gerektirmeyen ve kullanımı kolay online kronometre.",
    h1: "Online Kronometre",
    howToTitle: "Online kronometre nasıl kullanılır?",
    howToText: "Başlat düğmesine basarak süreyi ölçmeye başlayın, işiniz bitince durdurun. Sıfırla düğmesiyle kronometreyi baştan başlatabilirsiniz. Kayıt olmanız veya bir uygulama indirmeniz gerekmez, araç doğrudan tarayıcıda çalışır.",
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Spor ve antrenmanlarda süre tutmak",
      "Ders çalışırken veya sınav denemelerinde geçen süreyi ölçmek",
      "Yemek pişirme ve günlük işlerde geçen zamanı takip etmek",
      "Sunum ve konuşma provalarında süreyi kontrol etmek",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "Kronometre ile zamanlayıcı arasındaki fark nedir?",
        a: "Kronometre sıfırdan başlayarak süreyi ileri doğru sayar ve geçen zamanı ölçer. Zamanlayıcı ise belirlediğiniz süreden geriye doğru sayar.",
      },
      {
        q: "Kronometre ücretsiz mi, üyelik gerekiyor mu?",
        a: "Araç tamamen ücretsizdir ve üyelik gerektirmez.",
      },
      {
        q: "Telefondan veya tabletten kullanabilir miyim?",
        a: "Araç tarayıcıda çalışır, bu yüzden telefon, tablet ve bilgisayardan kullanabilirsiniz.",
      },
    ],
  },
  en: {
    metaTitle: "Online Stopwatch",
    metaDescription: "Measure time with start, stop and reset buttons. A free, easy-to-use online stopwatch that needs no sign-up.",
    h1: "Online Stopwatch",
    howToTitle: "How to use the online stopwatch",
    howToText: "Press the start button to begin measuring time and stop it when you're done. Use the reset button to start over. You don't need to sign up or download an app, the tool works right in your browser.",
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Timing sports and workouts",
      "Measuring how long you study or take practice exams",
      "Tracking the time spent cooking or on daily tasks",
      "Checking the length of presentations and speech rehearsals",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "What is the difference between a stopwatch and a timer?",
        a: "A stopwatch starts from zero and counts up, measuring the time that has passed. A timer counts down from a time you set.",
      },
      {
        q: "Is the stopwatch free? Do I need an account?",
        a: "The tool is completely free and requires no account.",
      },
      {
        q: "Can I use it on my phone or tablet?",
        a: "The tool runs in your browser, so you can use it on a phone, tablet or computer.",
      },
    ],
  },
  es: {
    metaTitle: "Cronómetro Online",
    metaDescription: "Mide el tiempo con los botones de inicio, pausa y reinicio. Un cronómetro online gratuito, fácil de usar y sin registro.",
    h1: "Cronómetro Online",
    howToTitle: "¿Cómo usar el cronómetro online?",
    howToText: "Pulsa el botón de inicio para empezar a medir el tiempo y páralo cuando termines. Utiliza el botón de reinicio para empezar de nuevo. No necesitas registrarte ni descargar ninguna aplicación, la herramienta funciona directamente en tu navegador.",
    useCasesTitle: "¿Para qué sirve?",
    useCases: [
      "Cronometrar deportes y entrenamientos",
      "Medir cuánto tiempo estudias o haces exámenes de práctica",
      "Hacer un seguimiento del tiempo dedicado a cocinar o tareas diarias",
      "Controlar la duración de presentaciones y ensayos de discursos",
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Cuál es la diferencia entre un cronómetro y un temporizador?",
        a: "El cronómetro empieza desde cero y cuenta hacia adelante, midiendo el tiempo transcurrido. El temporizador cuenta hacia atrás desde un tiempo establecido.",
      },
      {
        q: "¿El cronómetro es gratuito? ¿Necesito una cuenta?",
        a: "La herramienta es completamente gratuita y no requiere cuenta.",
      },
      {
        q: "¿Puedo usarlo en mi teléfono o tablet?",
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

export default async function StopwatchPage({
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
        <StopwatchTool lang={lang} />

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