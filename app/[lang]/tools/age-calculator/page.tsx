import type { Metadata } from "next";
import AgeCalculatorTool from "@/components/age-calculator-tool";
import { ToolPageHeader } from "@/components/tool-page-header";

type Lang = "tr" | "en";

// DİKKAT: Bu, sayfanın klasör adıyla birebir aynı olmalı (app/[lang]/tools/<klasör>/page.tsx)
const PATH = "/tools/age-calculator";

const content = {
  tr: {
    metaTitle: "Yaş Hesaplama",
    metaDescription:
      "Doğum tarihinizden yaşınızı yıl, ay ve gün olarak anında hesaplayın. Ücretsiz, kayıt gerektirmeyen online yaş hesaplama aracı.",
    h1: "Yaş Hesaplama",
    howToTitle: "Yaş nasıl hesaplanır?",
    howToText:
      "Doğum tarihinizi seçin, aracımız bugünün tarihine göre yaşınızı yıl, ay ve gün olarak anında hesaplasın. Ayrıca toplam yaşadığınız gün sayısını ve bir sonraki doğum gününüze kaç gün kaldığını da görebilirsiniz. Elle hesaplama yapmanıza gerek kalmaz, kayıt olmanız gerekmez.",
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Tam yaşınızı yıl, ay ve gün olarak öğrenmek",
      "Bir sonraki doğum gününüze kaç gün kaldığını görmek",
      "Resmi başvurularda veya formlarda yaş bilgisini doğrulamak",
      "Bir kişinin veya belgenin üzerinden ne kadar süre geçtiğini bulmak",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "Yaş hesaplama aracı ücretsiz mi, üyelik gerekiyor mu?",
        a: "Araç tamamen ücretsizdir ve üyelik gerektirmez.",
      },
      {
        q: "Hesaplama nasıl yapılıyor, doğum tarihim bir yere kaydediliyor mu?",
        a: "Hesaplama tamamen tarayıcınızda yapılır, girdiğiniz doğum tarihi hiçbir sunucuya gönderilmez.",
      },
      {
        q: "Telefondan veya tabletten kullanabilir miyim?",
        a: "Araç tarayıcıda çalışır, bu yüzden telefon, tablet ve bilgisayardan kullanabilirsiniz.",
      },
    ],
  },
  en: {
    metaTitle: "Age Calculator",
    metaDescription:
      "Instantly calculate your exact age in years, months and days from your date of birth. A free online age calculator that needs no sign-up.",
    h1: "Age Calculator",
    howToTitle: "How to calculate your age",
    howToText:
      "Pick your date of birth and the tool instantly calculates your age in years, months and days based on today's date. You can also see the total number of days you've lived and how many days are left until your next birthday. No manual calculation, no sign-up required.",
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Finding your exact age in years, months and days",
      "Seeing how many days are left until your next birthday",
      "Verifying age information on official forms or applications",
      "Finding out how much time has passed since a person's birth or a document's date",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Is the age calculator free? Do I need an account?",
        a: "The tool is completely free and requires no account.",
      },
      {
        q: "How is the calculation done, is my birth date stored anywhere?",
        a: "The calculation happens entirely in your browser; the date you enter is never sent to a server.",
      },
      {
        q: "Can I use it on my phone or tablet?",
        a: "The tool runs in your browser, so you can use it on a phone, tablet or computer.",
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

export default async function AgeCalculatorPage({
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
        <AgeCalculatorTool lang={lang} />

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
