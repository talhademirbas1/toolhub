import type { Metadata } from "next";
import CalculatorTool from "@/components/calculator-tool";

type Lang = "tr" | "en";

const PATH = "/tools/classic-calculator";

const content = {
  tr: {
    metaTitle: "Online Hesap Makinesi",
    metaDescription:
      "Toplama, çıkarma, çarpma ve bölme işlemlerini hızlıca yapın. Kayıt gerektirmeyen, ücretsiz ve kullanımı kolay online hesap makinesi.",
    h1: "Online Hesap Makinesi",
    howToTitle: "Online hesap makinesi nasıl kullanılır?",
    howToText:
      "Sayı ve işlem tuşlarına tıklayarak hesaplamanızı yapın, sonucu anında görün. Toplama, çıkarma, çarpma ve bölme gibi temel işlemleri hızlıca yapabilirsiniz. Kayıt olmanız veya bir şey kurmanız gerekmez, araç doğrudan tarayıcıda çalışır.",
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
    metaDescription:
      "Add, subtract, multiply and divide quickly. A free, easy-to-use online calculator that needs no sign-up.",
    h1: "Online Calculator",
    howToTitle: "How to use the online calculator",
    howToText:
      "Click the number and operator keys to make your calculation and see the result instantly. You can quickly do basic operations such as addition, subtraction, multiplication and division. You don't need to sign up or install anything, the tool works right in your browser.",
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
} as const;

// Next.js'in bu sayfayı statik olarak önceden üretmesini sağlar
export async function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const c = content[lang];

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: `/${lang}${PATH}`,
      languages: {
        tr: `/tr${PATH}`,
        en: `/en${PATH}`,
        "x-default": `/tr${PATH}`,
      },
    },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: `/${lang}${PATH}`,
      siteName: "MyToolKit",
      locale: lang === "tr" ? "tr_TR" : "en_US",
      type: "website",
    },
  };
}

export default async function ClassicCalculatorPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const c = content[lang];

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-zinc-100 dark:bg-background text-foreground transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Ekranda görünmez ama Google'ın sayfa başlığını anlaması için gerekli.
            CalculatorTool zaten bir h1 basıyorsa bu satırı sil. */}
        <h1 className="sr-only">{c.h1}</h1>

        {/* Üst barı buradan tamamen kaldırdık. Artık butonları CalculatorTool yönetecek. */}
        <CalculatorTool lang={lang} />

        {/* SEO içeriği: Google'a sayfanın ne hakkında olduğunu anlatır */}
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
