import type { Metadata } from "next";
import TypingTestTool from "@/components/typing-test-tool";
import { ToolPageHeader } from "@/components/tool-page-header";
import { i18n, type Locale } from "@/i18n.config";

const PATH = "/tools/typing-test";

const content = {
  tr: {
    metaTitle: "Yazma Hızı Testi",
    metaDescription: "Klavyede yazma hızınızı ölçün. Ücretsiz, kayıt gerektirmeyen online yazma hızı testi ile dakikada kaç kelime yazdığınızı öğrenin.",
    h1: "Yazma Hızı Testi",
    howToTitle: "Yazma hızı testi nasıl yapılır?",
    howToText: "Testi başlatın ve ekrandaki metni olabildiğince hızlı ve hatasız yazın. Test bitince yazma hızınızı görürsünüz. Yazma hızı genellikle dakikadaki kelime sayısı (WPM) ile ölçülür. Kayıt olmanız gerekmez, test doğrudan tarayıcıda çalışır.",
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Klavyede ne kadar hızlı yazdığınızı öğrenmek",
      "Zaman içinde yazma hızınızdaki gelişimi takip etmek",
      "İş başvurusu veya sınav öncesi klavye becerinizi denemek",
      "Klavye pratiği yaparak yazma alışkanlığınızı geliştirmek",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "WPM nedir?",
        a: "WPM, dakikada yazılan kelime sayısını gösteren ölçüdür. Yazma hızı testlerinde en sık kullanılan birimdir.",
      },
      {
        q: "Ortalama yazma hızı kaçtır?",
        a: "Ortalama bir kullanıcı genellikle dakikada 40 kelime civarında yazar. Düzenli pratik yapanlar 60-80 kelime ve üzerine çıkabilir.",
      },
      {
        q: "Yazma hızı nasıl artırılır?",
        a: "Ekrana bakarak, parmaklarınızı doğru tuşlara yerleştirerek (on parmak) ve düzenli pratik yaparak hızınızı artırabilirsiniz. Önce hatasız yazmaya odaklanın, hız zamanla gelir.",
      },
      {
        q: "Yazma hızı testi ücretsiz mi, üyelik gerekiyor mu?",
        a: "Test tamamen ücretsizdir ve üyelik gerektirmez.",
      },
    ],
  },
  en: {
    metaTitle: "Typing Speed Test",
    metaDescription: "Measure your typing speed on the keyboard. Find out how many words per minute you type with this free online typing test that needs no sign-up.",
    h1: "Typing Speed Test",
    howToTitle: "How to take a typing speed test",
    howToText: "Start the test and type the text on the screen as fast and as accurately as you can. When the test ends you can see your typing speed. Typing speed is usually measured in words per minute (WPM). You don't need to sign up, the test works right in your browser.",
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Finding out how fast you type on the keyboard",
      "Tracking how your typing speed improves over time",
      "Testing your keyboard skills before a job application or exam",
      "Building your typing habits with regular practice",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "What is WPM?",
        a: "WPM stands for words per minute, the number of words you type in a minute. It is the most common unit used in typing tests.",
      },
      {
        q: "What is an average typing speed?",
        a: "An average user usually types around 40 words per minute. People who practice regularly can reach 60-80 words per minute and beyond.",
      },
      {
        q: "How can I type faster?",
        a: "You can improve by looking at the screen instead of the keyboard, placing your fingers on the right keys (touch typing) and practicing regularly. Focus on accuracy first and speed will follow.",
      },
      {
        q: "Is the typing test free? Do I need an account?",
        a: "The test is completely free and requires no account.",
      },
    ],
  },
  es: {
    metaTitle: "Test de Velocidad de Escritura",
    metaDescription: "Mide tu velocidad de escritura en el teclado. Descubre cuántas palabras por minuto escribes con este test online gratuito sin registro.",
    h1: "Test de Velocidad de Escritura",
    howToTitle: "¿Cómo hacer el test de velocidad de escritura?",
    howToText: "Inicia la prueba y escribe el texto en pantalla tan rápido y con tanta precisión como puedas. Al terminar, verás tu velocidad de escritura, medida habitualmente en palabras por minuto (WPM). No necesitas registrarte, la prueba funciona directamente en tu navegador.",
    useCasesTitle: "¿Para qué sirve?",
    useCases: [
      "Averiguar qué tan rápido escribes en el teclado",
      "Hacer un seguimiento de cómo mejora tu velocidad de escritura con el tiempo",
      "Probar tus habilidades con el teclado antes de una entrevista de trabajo o examen",
      "Desarrollar tus hábitos de escritura con práctica regular",
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Qué es WPM?",
        q_es: "¿Qué es WPM?",
        a: "WPM significa palabras por minuto (Words Per Minute), el número de palabras que escribes en un minuto. Es la unidad más común en las pruebas de mecanografía.",
      },
      {
        q: "¿Cuál es una velocidad de escritura promedio?",
        a: "Un usuario promedio suele escribir alrededor de 40 palabras por minuto. Quienes practican regularmente pueden alcanzar de 60 a 80 palabras por minuto o más.",
      },
      {
        q: "¿Cómo puedo escribir más rápido?",
        a: "Puedes mejorar mirando a la pantalla en lugar del teclado, colocando los dedos en las teclas correctas y practicando con regularidad. Céntrate primero en la precisión y la velocidad llegará sola.",
      },
      {
        q: "¿El test de velocidad es gratuito? ¿Necesito una cuenta?",
        a: "La prueba es completamente gratuita y no requiere cuenta.",
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

export default async function TypingTestPage({
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
        <TypingTestTool lang={lang} />

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