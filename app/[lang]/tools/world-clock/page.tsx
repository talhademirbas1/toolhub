import type { Metadata } from "next";
import WorldClockTool from "@/components/world-clock-tool";
import { ToolPageHeader } from "@/components/tool-page-header";
import { i18n, type Locale } from "@/i18n.config";

const PATH = "/tools/world-clock";

const content = {
  tr: {
    metaTitle: "Dünya Saati",
    metaDescription: "Dünyanın farklı şehirlerindeki güncel saati aynı ekranda görün. Ücretsiz, kayıt gerektirmeyen online dünya saati.",
    h1: "Dünya Saati",
    howToTitle: "Dünya saati nasıl kullanılır?",
    howToText: "Sayfayı açtığınızda farklı şehirlerin ve saat dilimlerinin güncel saatini aynı ekranda görürsünüz. Yurt dışındaki biriyle görüşmeden önce veya uluslararası bir toplantı planlarken saat farkına bakmak için kullanabilirsiniz. Kayıt olmanız gerekmez, araç doğrudan tarayıcıda çalışır.",
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Yurt dışındaki aile ve arkadaşları ararken saati kontrol etmek",
      "Farklı ülkelerdeki ekiplerle toplantı zamanı planlamak",
      "Seyahat öncesi gidilecek şehirdeki saati öğrenmek",
      "Uluslararası etkinlik ve canlı yayın saatlerini kendi saatinize çevirmek",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "Türkiye'nin saat dilimi nedir?",
        a: "Türkiye UTC+3 saat dilimini kullanır ve bu saat yıl boyunca değişmez, yaz saati uygulaması yoktur.",
      },
      {
        q: "Yaz saati uygulaması saat farkını etkiler mi?",
        a: "Evet. Yaz saati uygulayan ülkelerde saat yılın belirli dönemlerinde bir saat ileri alınır, bu yüzden iki şehir arasındaki fark yıl içinde değişebilir.",
      },
      {
        q: "UTC nedir?",
        a: "UTC, dünya genelinde saat dilimlerinin referans aldığı Eş Güdümlü Evrensel Zaman'dır. Diğer saatler UTC'ye göre artı veya eksi olarak ifade edilir.",
      },
      {
        q: "Dünya saati ücretsiz mi, üyelik gerekiyor mu?",
        a: "Araç tamamen ücretsizdir ve üyelik gerektirmez.",
      },
    ],
  },
  en: {
    metaTitle: "World Clock",
    metaDescription: "See the current time in cities around the world on one screen. A free online world clock that needs no sign-up.",
    h1: "World Clock",
    howToTitle: "How to use the world clock",
    howToText: "When you open the page you see the current time in different cities and time zones on one screen. Use it to check the time difference before calling someone abroad or when planning an international meeting. You don't need to sign up, the tool works right in your browser.",
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Checking the time before calling family and friends abroad",
      "Planning meeting times with teams in different countries",
      "Finding out the local time of a city before you travel",
      "Converting international event and live stream times to your own time",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "What time zone is Turkey in?",
        a: "Turkey uses the UTC+3 time zone all year round and does not observe daylight saving time.",
      },
      {
        q: "Does daylight saving time affect the time difference?",
        a: "Yes. In countries that observe daylight saving time, clocks move forward one hour for part of the year, so the difference between two cities can change during the year.",
      },
      {
        q: "What is UTC?",
        a: "UTC is Coordinated Universal Time, the reference that time zones around the world are based on. Other times are expressed as plus or minus hours from UTC.",
      },
      {
        q: "Is the world clock free? Do I need an account?",
        a: "The tool is completely free and requires no account.",
      },
    ],
  },
  es: {
    metaTitle: "Reloj Mundial",
    metaDescription: "Consulta la hora actual en ciudades de todo el mundo en una sola pantalla. Reloj mundial online gratuito y sin registro.",
    h1: "Reloj Mundial",
    howToTitle: "¿Cómo usar el reloj mundial?",
    howToText: "Al abrir la página verás la hora actual en diferentes ciudades y zonas horarias en una sola pantalla. Úsalo para comprobar la diferencia horaria antes de llamar al extranjero o al planificar una reunión internacional. No requiere registro, funciona directamente en tu navegador.",
    useCasesTitle: "¿Para qué sirve?",
    useCases: [
      "Comprobar la hora antes de llamar a familiares y amigos en el extranjero",
      "Planificar horarios de reuniones con equipos en diferentes países",
      "Averiguar la hora local de una ciudad antes de viajar",
      "Convertir horarios de eventos internacionales y transmisiones en vivo a tu hora local",
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿En qué zona horaria está Turquía?",
        a: "Turquía utiliza la zona horaria UTC+3 durante todo el año y no aplica el horario de verano.",
      },
      {
        q: "¿El horario de verano afecta a la diferencia horaria?",
        a: "Sí. En los países que adoptan el horario de verano, los relojes se adelantan una hora durante parte del año, por lo que la diferencia entre dos ciudades puede variar.",
      },
      {
        q: "¿Qué es UTC?",
        a: "UTC es el Tiempo Universal Coordinado, la referencia en la que se basan las zonas horarias del mundo. Las demás horas se expresan como más o menos horas respecto a UTC.",
      },
      {
        q: "¿El reloj mundial es gratuito? ¿Necesito una cuenta?",
        a: "La herramienta es completamente gratuita y no requiere cuenta.",
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

export default async function WorldClockPage({
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
        <WorldClockTool lang={lang} />

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