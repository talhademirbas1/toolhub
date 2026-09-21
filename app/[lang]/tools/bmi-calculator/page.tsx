import type { Metadata } from "next";
import BmiCalculatorTool from "@/components/bmi-calculator-tool";
import { ToolPageHeader } from "@/components/tool-page-header";
import { i18n, type Locale } from "@/i18n.config";

const PATH = "/tools/bmi-calculator";

const content = {
  tr: {
    metaTitle: "Vücut Kitle Endeksi (BMI) Hesaplama",
    metaDescription: "Boy ve kilonuzu girerek vücut kitle endeksinizi (BMI) anında hesaplayın. Ücretsiz, kayıt gerektirmeyen online BMI hesaplama aracı.",
    h1: "Vücut Kitle Endeksi (BMI) Hesaplama",
    howToTitle: "BMI nasıl hesaplanır?",
    howToText: "Boyunuzu ve kilonuzu metrik (cm/kg) veya İngiliz (ft/lb) birim sisteminde girin, vücut kitle endeksiniz (BMI) ve hangi kategoriye (zayıf, normal, fazla kilolu, obez) girdiğiniz anında hesaplansın. Sonuç Dünya Sağlık Örgütü'nün (WHO) standart BMI aralıklarına göre belirlenir.",
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Vücut ağırlığınızın boyunuza göre sağlıklı aralıkta olup olmadığını kontrol etmek",
      "Kilo verme veya alma hedeflerinizi takip etmek",
      "Doktor veya diyetisyen görüşmesi öncesi ön bilgi edinmek",
      "Zaman içindeki BMI değişiminizi karşılaştırmak",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "BMI hesaplama aracı ücretsiz mi, üyelik gerekiyor mu?",
        a: "Araç tamamen ücretsizdir ve üyelik gerektirmez.",
      },
      {
        q: "BMI değeri tek başına sağlık durumumu gösterir mi?",
        a: "BMI genel bir gösterge sunar ama kas kütlesi, yaş ve cinsiyet gibi etkenleri hesaba katmaz. Kesin değerlendirme için bir sağlık uzmanına danışmanız önerilir.",
      },
      {
        q: "Girdiğim boy ve kilo bilgileri kaydediliyor mu?",
        a: "Hesaplama tamamen tarayıcınızda yapılır, verileriniz hiçbir sunucuya gönderilmez.",
      },
    ],
  },
  en: {
    metaTitle: "BMI Calculator",
    metaDescription: "Enter your height and weight to instantly calculate your Body Mass Index (BMI). A free online BMI calculator that needs no sign-up.",
    h1: "BMI Calculator",
    howToTitle: "How to calculate your BMI",
    howToText: "Enter your height and weight in metric (cm/kg) or imperial (ft/lb) units, and your Body Mass Index (BMI) plus its category (underweight, normal, overweight, obese) is calculated instantly. The result follows the World Health Organization's (WHO) standard BMI ranges.",
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Checking whether your body weight is in a healthy range for your height",
      "Tracking your weight loss or weight gain goals",
      "Getting a quick reference before talking to a doctor or dietitian",
      "Comparing how your BMI changes over time",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Is the BMI calculator free? Do I need an account?",
        a: "The tool is completely free and requires no account.",
      },
      {
        q: "Does BMI alone tell me about my health?",
        a: "BMI gives a general indicator but doesn't account for factors like muscle mass, age or sex. For a full assessment, it's best to consult a healthcare professional.",
      },
      {
        q: "Is the height and weight I enter stored anywhere?",
        a: "The calculation happens entirely in your browser; your data is never sent to a server.",
      },
    ],
  },
  es: {
    metaTitle: "Calculadora de IMC",
    metaDescription: "Introduce tu altura y peso para calcular al instante tu Índice de Masa Corporal (IMC). Calculadora de IMC online gratis sin registro.",
    h1: "Calculadora de IMC",
    howToTitle: "¿Cómo calcular tu IMC?",
    howToText: "Introduce tu altura y peso en sistema métrico (cm/kg) o imperial (ft/lb) y tu Índice de Masa Corporal (IMC) junto con su categoría (bajo peso, normal, sobrepeso, obesidad) se calculará al instante. El resultado sigue los rangos estándar de la OMS.",
    useCasesTitle: "¿Para qué sirve?",
    useCases: [
      "Comprobar si tu peso corporal está en un rango saludable para tu altura",
      "Hacer un seguimiento de tus objetivos de pérdida o ganancia de peso",
      "Obtener una referencia rápida antes de hablar con un médico o dietista",
      "Comparar cómo cambia tu IMC con el tiempo"
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿La calculadora de IMC es gratuita? ¿Necesito una cuenta?",
        a: "La herramienta es completamente gratuita y no requiere cuenta."
      },
      {
        q: "¿El IMC por sí solo me informa sobre mi salud?",
        a: "El IMC proporciona un indicador general pero no tiene en cuenta factores como la masa muscular, la edad o el sexo. Para una evaluación completa, consulta a un profesional."
      },
      {
        q: "¿Se guardan los datos de altura y peso que introduzco?",
        a: "El cálculo se realiza completamente en tu navegador; tus datos nunca se envían a un servidor."
      }
    ]
  }
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

export default async function BmiCalculatorPage({
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
        <BmiCalculatorTool lang={lang} />

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