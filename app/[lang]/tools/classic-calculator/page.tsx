import type { Metadata } from "next";
import CalculatorTool from "@/components/calculator-tool";
import { i18n, type Locale } from "@/i18n.config";

const PATH = "/tools/classic-calculator";

const content = {
  tr: {
    metaTitle: "Online Hesap Makinesi",
    metaDescription: "Toplama, çıkarma, çarpma ve bölme işlemlerini hızlıca yapın. Kayıt gerektirmeyen, ücretsiz ve kullanımı kolay online hesap makinesi.",
    h1: "Online Hesap Makinesi",
    howToTitle: "Online hesap makinesi nasıl kullanılır?",
    howToText: "Sayı ve işlem tuşlarına tıklayarak hesaplamanızı yapın, sonucu anında görün. Toplama, çıkarma, çarpma ve bölme gibi temel işlemleri hızlıca yapabilirsiniz. Kayıt olmanız veya bir şey kurmanız gerekmez, araç doğrudan tarayıcıda çalışır.",
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Günlük alışveriş ve bütçe hesaplarını hızlıca yapmak",
      "Ödev ve sınav hazırlığında işlemleri kontrol etmek",
      "Fatura, indirim ve kısa iş hesaplamalarında pratik sonuç almak",
      "Elinizde hesap makinesi yokken tarayıcıdan hemen hesaplama yapmak",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "Hesap makinesi ücretsiz mi, üyelik gerekiyor mu?",
        a: "Araç tamamen ücretsizdir ve üyelik gerektirmez.",
      },
      {
        q: "Hangi işlemleri yapabilirim?",
        a: "Toplama, çıkarma, çarpma ve bölme gibi temel işlemleri yapabilirsiniz.",
      },
      {
        q: "Telefondan veya tabletten kullanabilir miyim?",
        a: "Araç tarayıcıda çalışır, bu yüzden telefon, tablet ve bilgisayardan kullanabilirsiniz.",
      },
    ],
  },
  en: {
    metaTitle: "Online Calculator",
    metaDescription: "Add, subtract, multiply and divide quickly. A free, easy-to-use online calculator that needs no sign-up.",
    h1: "Online Calculator",
    howToTitle: "How to use the online calculator",
    howToText: "Click the number and operator keys to make your calculation and see the result instantly. You can quickly do basic operations such as addition, subtraction, multiplication and division. You don't need to sign up or install anything, the tool works right in your browser.",
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Doing everyday shopping and budget calculations quickly",
      "Checking your work while studying or doing homework",
      "Getting quick results for bills, discounts and short work calculations",
      "Calculating right in your browser when you don't have a calculator at hand",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Is the calculator free? Do I need an account?",
        a: "The tool is completely free and requires no account.",
      },
      {
        q: "Which operations can I do?",
        a: "You can do basic operations such as addition, subtraction, multiplication and division.",
      },
      {
        q: "Can I use it on my phone or tablet?",
        a: "The tool runs in your browser, so you can use it on a phone, tablet or computer.",
      },
    ],
  },
  es: {
    metaTitle: "Calculadora Online",
    metaDescription: "Suma, resta, multiplica y divide rápidamente. Calculadora online gratis, fácil de usar y sin necesidad de registro.",
    h1: "Calculadora Online",
    howToTitle: "¿Cómo usar la calculadora online?",
    howToText: "Haz clic en los números y operadores para realizar tu cálculo y ver el resultado al instante. Puedes realizar rápidamente operaciones básicas como suma, resta, multiplicación y división. No necesitas registrarte ni instalar nada, la herramienta funciona directamente en tu navegador.",
    useCasesTitle: "¿Para qué sirve?",
    useCases: [
      "Hacer compras diarias y cálculos de presupuesto rápidamente",
      "Revisar tus cálculos mientras estudias o haces los deberes",
      "Obtener resultados rápidos para facturas, descuentos y cálculos cortos",
      "Calcular directamente en tu navegador cuando no tienes una calculadora a mano",
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿La calculadora es gratuita? ¿Necesito una cuenta?",
        a: "La herramienta es completamente gratuita y no requiere cuenta."
      },
      {
        q: "¿Qué operaciones puedo hacer?",
        a: "Puedes hacer operaciones básicas como suma, resta, multiplicación y división."
      },
      {
        q: "¿Puedo usarla en mi teléfono o tablet?",
        a: "La herramienta funciona en tu navegador, por lo que puedes usarla desde un móvil, tablet u ordenador."
      },
    ],
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

export default async function ClassicCalculatorPage({
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

        <CalculatorTool lang={lang} />

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