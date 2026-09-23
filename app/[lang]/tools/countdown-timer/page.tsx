import type { Metadata } from "next";
import CountdownTimerTool from "@/components/countdown-timer-tool";
import { ToolPageHeader } from "@/components/tool-page-header";
import { i18n, type Locale } from "@/i18n.config";

const PATH = "/tools/countdown-timer";

const content = {
  tr: {
    metaTitle: "Online Geri Sayım Sayacı",
    metaDescription:
      "Yılbaşı, doğum günü, sınav veya özel bir etkinlik için ücretsiz online geri sayım sayacı. Kayıt gerektirmez, tarayıcıda anında çalışır.",
    h1: "Online Geri Sayım Sayacı",
    howToTitle: "Geri sayım sayacı nasıl kullanılır?",
    howToText:
      "İsteğe bağlı bir başlık girin (örneğin 'Yılbaşı' veya 'Sınav Günü'), ardından geri sayımın biteceği tarih ve saati seçin. 'Geri Sayımı Başlat' düğmesine bastığınızda gün, saat, dakika ve saniye cinsinden kalan süreyi canlı olarak görürsünüz. Kayıt olmanız veya bir uygulama indirmeniz gerekmez.",
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Yılbaşı, bayram veya doğum günü gibi özel günlere geri sayım yapmak",
      "Sınav, teslim tarihi veya proje son gününü takip etmek",
      "Etkinlik, konser veya tatil öncesi heyecanı canlı tutmak",
      "Bir hedefe kalan süreyi net şekilde görselleştirmek",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "Geri sayım sayacı ücretsiz mi?",
        a: "Evet, araç tamamen ücretsizdir ve herhangi bir kayıt gerektirmez.",
      },
      {
        q: "Sayfayı kapatırsam geri sayım devam eder mi?",
        a: "Hayır, geri sayım tarayıcınızda çalışır; sayfayı kapatırsanız durur. Tekrar açtığınızda aynı tarihi seçip yeniden başlatabilirsiniz.",
      },
      {
        q: "Birden fazla geri sayım oluşturabilir miyim?",
        a: "Evet, 'Sıfırla' düğmesine basıp istediğiniz kadar yeni geri sayım başlatabilirsiniz.",
      },
    ],
  },
  en: {
    metaTitle: "Online Countdown Timer",
    metaDescription:
      "Free online countdown timer for New Year, birthdays, exams or any special event. No sign-up, works instantly in your browser.",
    h1: "Online Countdown Timer",
    howToTitle: "How to use the countdown timer",
    howToText:
      "Enter an optional title (such as 'New Year' or 'Exam Day'), then pick the date and time you want to count down to. Once you click 'Start Countdown', you'll see the remaining time live in days, hours, minutes and seconds. No sign-up or app download required.",
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Counting down to New Year, holidays or birthdays",
      "Tracking an exam, deadline or project due date",
      "Keeping the excitement alive before an event, concert or trip",
      "Visualizing exactly how much time is left until a goal",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Is the countdown timer free?",
        a: "Yes, the tool is completely free and requires no sign-up.",
      },
      {
        q: "Does the countdown keep running if I close the page?",
        a: "No, the countdown runs in your browser and stops if you close the page. You can pick the same date again and restart it any time.",
      },
      {
        q: "Can I create more than one countdown?",
        a: "Yes, click 'Reset' and start as many new countdowns as you like.",
      },
    ],
  },
  es: {
    metaTitle: "Cuenta Atrás Online",
    metaDescription:
      "Cuenta atrás online gratuita para Año Nuevo, cumpleaños, exámenes o cualquier evento especial. Sin registro, funciona al instante en tu navegador.",
    h1: "Cuenta Atrás Online",
    howToTitle: "¿Cómo usar la cuenta atrás?",
    howToText:
      "Escribe un título opcional (como 'Año Nuevo' o 'Día del Examen') y elige la fecha y hora hasta la que quieres contar. Al pulsar 'Iniciar Cuenta Atrás' verás el tiempo restante en directo, en días, horas, minutos y segundos. No necesitas registrarte ni instalar nada.",
    useCasesTitle: "¿Para qué sirve?",
    useCases: [
      "Contar los días para Año Nuevo, fiestas o cumpleaños",
      "Seguir la fecha de un examen, entrega o proyecto",
      "Mantener la emoción antes de un evento, concierto o viaje",
      "Visualizar con claridad cuánto tiempo queda para una meta",
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿La cuenta atrás es gratuita?",
        a: "Sí, la herramienta es completamente gratuita y no requiere registro.",
      },
      {
        q: "¿Sigue corriendo si cierro la página?",
        a: "No, la cuenta atrás funciona en tu navegador y se detiene si cierras la página. Puedes elegir la misma fecha y reiniciarla cuando quieras.",
      },
      {
        q: "¿Puedo crear más de una cuenta atrás?",
        a: "Sí, pulsa 'Reiniciar' y empieza tantas cuentas atrás nuevas como quieras.",
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

export default async function CountdownTimerPage({
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
        <CountdownTimerTool lang={lang} />

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
