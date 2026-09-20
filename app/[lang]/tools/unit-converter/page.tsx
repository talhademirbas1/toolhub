import type { Metadata } from "next";
import UnitConverterTool from "@/components/unit-converter-tool";
import { ToolPageHeader } from "@/components/tool-page-header";

type Lang = "tr" | "en";

// DİKKAT: Bu, sayfanın klasör adıyla birebir aynı olmalı (app/[lang]/tools/<klasör>/page.tsx)
const PATH = "/tools/unit-converter";

const content = {
  tr: {
    metaTitle: "Birim Çevirici",
    metaDescription:
      "Uzunluk, ağırlık ve sıcaklık birimlerini anında çevirin. Metre, kilogram, Celsius ve daha fazlası. Ücretsiz online birim çevirici.",
    h1: "Birim Çevirici",
    howToTitle: "Birim çevirici nasıl kullanılır?",
    howToText:
      "Üstteki sekmelerden dönüştürmek istediğiniz kategoriyi (uzunluk, ağırlık veya sıcaklık) seçin. Ardından dönüştürmek istediğiniz değeri girin, kaynak ve hedef birimleri seçin. Sonuç anında hesaplanır ve ekranda gösterilir; birimleri tek tıkla yer değiştirebilirsiniz.",
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Yurt dışı alışverişte metre-fit veya kilogram-pound çevirisi yapmak",
      "Yemek tariflerindeki ölçü birimlerini kendi sisteminize çevirmek",
      "Hava durumu sıcaklıklarını Fahrenheit'ten Celsius'a çevirmek",
      "Okul veya iş projelerinde hızlı birim dönüşümü yapmak",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "Hangi birim kategorileri destekleniyor?",
        a: "Şu anda uzunluk, ağırlık ve sıcaklık birimleri arasında dönüşüm yapabilirsiniz.",
      },
      {
        q: "Dönüşümler ne kadar hassas?",
        a: "Dönüşümler standart uluslararası dönüşüm oranları kullanılarak hesaplanır ve ondalık basamaklara kadar hassastır.",
      },
      {
        q: "Sıcaklık dönüşümü nasıl çalışır?",
        a: "Celsius, Fahrenheit ve Kelvin arasında standart formüllerle anında dönüşüm yapılır.",
      },
      {
        q: "Araç ücretsiz mi?",
        a: "Evet, araç tamamen ücretsizdir ve üyelik gerektirmez.",
      },
    ],
  },
  en: {
    metaTitle: "Unit Converter",
    metaDescription:
      "Instantly convert length, weight and temperature units. Meters, kilograms, Celsius and more. A free online unit converter.",
    h1: "Unit Converter",
    howToTitle: "How to use the unit converter",
    howToText:
      "Choose the category you want to convert (length, weight or temperature) from the tabs above. Then enter the value you want to convert and select the source and target units. The result is calculated instantly and shown on screen; you can swap the units with one click.",
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Converting meters to feet or kilograms to pounds when shopping abroad",
      "Converting recipe measurement units to your own system",
      "Converting weather temperatures from Fahrenheit to Celsius",
      "Doing quick unit conversions for school or work projects",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Which unit categories are supported?",
        a: "You can currently convert between length, weight and temperature units.",
      },
      {
        q: "How accurate are the conversions?",
        a: "Conversions are calculated using standard international conversion rates and are accurate to several decimal places.",
      },
      {
        q: "How does temperature conversion work?",
        a: "Conversion between Celsius, Fahrenheit and Kelvin is done instantly using standard formulas.",
      },
      {
        q: "Is the tool free?",
        a: "Yes, the tool is completely free and requires no account.",
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

export default async function UnitConverterPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const c = content[lang];

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-zinc-100 dark:bg-background text-foreground transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="sr-only">{c.h1}</h1>

        <ToolPageHeader lang={lang} />
        <UnitConverterTool lang={lang} />

        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 space-y-8">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">{c.howToTitle}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{c.howToText}</p>
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
                <details key={item.q} className="group rounded-lg border border-zinc-200 dark:border-zinc-800 px-4 py-3">
                  <summary className="cursor-pointer font-medium">{item.q}</summary>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
