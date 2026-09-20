import type { Metadata } from "next";
import GpaCalculatorTool from "@/components/gpa-calculator-tool";
import { ToolPageHeader } from "@/components/tool-page-header";

type Lang = "tr" | "en";

// DİKKAT: Bu, sayfanın klasör adıyla birebir aynı olmalı (app/[lang]/tools/<klasör>/page.tsx)
const PATH = "/tools/gpa-calculator";

const content = {
  tr: {
    metaTitle: "Ders Ortalaması (GPA) Hesaplama",
    metaDescription:
      "Derslerinizin notlarını ve kredilerini girerek genel not ortalamanızı (GPA) 4.0 üzerinden anında hesaplayın. Ücretsiz, kayıt gerektirmeyen online GPA hesaplama aracı.",
    h1: "Ders Ortalaması (GPA) Hesaplama",
    howToTitle: "GPA nasıl hesaplanır?",
    howToText:
      "Aldığınız her ders için harf notunu (A, B+, C- gibi) ve kredi sayısını girin. Araç, her dersin not katsayısını kredisiyle çarpıp toplayarak kredi ağırlıklı genel not ortalamanızı (GPA) 4.0 üzerinden hesaplar. İstediğiniz kadar ders ekleyip çıkarabilirsiniz.",
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Dönem sonu veya kümülatif GPA'nızı hızlıca hesaplamak",
      "Farklı not senaryolarında GPA'nızın nasıl değişeceğini görmek",
      "Yurt dışı üniversite başvurularında GPA bilgisini doğrulamak",
      "Burs veya akademik başarı şartlarını takip etmek",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "GPA hesaplama aracı ücretsiz mi, üyelik gerekiyor mu?",
        a: "Araç tamamen ücretsizdir ve üyelik gerektirmez.",
      },
      {
        q: "Hangi not sistemi kullanılıyor?",
        a: "Araç, A+ ile F arasındaki standart 4.0'lık Amerikan harf notu sistemini kullanır. Okulunuzun notlandırma sistemi farklıysa en yakın harf notunu seçebilirsiniz.",
      },
      {
        q: "Girdiğim ders bilgileri bir yere kaydediliyor mu?",
        a: "Hesaplama tamamen tarayıcınızda yapılır, girdiğiniz bilgiler hiçbir sunucuya gönderilmez.",
      },
    ],
  },
  en: {
    metaTitle: "GPA Calculator",
    metaDescription:
      "Enter your course grades and credits to instantly calculate your GPA on a 4.0 scale. A free online GPA calculator that needs no sign-up.",
    h1: "GPA Calculator",
    howToTitle: "How to calculate your GPA",
    howToText:
      "For each course you've taken, enter the letter grade (A, B+, C- and so on) and the number of credits. The tool multiplies each grade's point value by its credits and adds them up to give you your credit-weighted GPA on a 4.0 scale. You can add or remove as many courses as you need.",
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Quickly calculating your semester or cumulative GPA",
      "Seeing how your GPA would change under different grade scenarios",
      "Verifying your GPA for university applications abroad",
      "Tracking scholarship or academic standing requirements",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Is the GPA calculator free? Do I need an account?",
        a: "The tool is completely free and requires no account.",
      },
      {
        q: "Which grading scale does it use?",
        a: "The tool uses the standard 4.0 US letter grade scale, from A+ to F. If your school uses a different scale, pick the closest matching letter grade.",
      },
      {
        q: "Is the course data I enter stored anywhere?",
        a: "The calculation happens entirely in your browser; the data you enter is never sent to a server.",
      },
    ],
  },
} as const;

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

export default async function GpaCalculatorPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const c = content[lang];

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-zinc-100 dark:bg-background text-foreground transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Ekranda görünmez ama Google'ın sayfa başlığını anlaması için gerekli. */}
        <h1 className="sr-only">{c.h1}</h1>

        <ToolPageHeader lang={lang} />
        <GpaCalculatorTool lang={lang} />

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
