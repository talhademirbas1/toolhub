import type { Metadata } from "next";
import ProfitLossCalculatorTool from "@/components/profit-loss-tool";
import { ToolPageHeader } from "@/components/tool-page-header";

type Lang = "tr" | "en";

// DİKKAT: Bu, sayfanın klasör adıyla birebir aynı olmalı (app/[lang]/tools/<klasör>/page.tsx)
const PATH = "/tools/percentage-calculator";

const content = {
  tr: {
    metaTitle: "Yüzde, Kâr Zarar ve İndirim Hesaplama",
    metaDescription:
      "Yüzde hesaplama, kâr zarar hesaplama ve indirim hesaplama aracı. Bir sayının yüzdesini, kâr oranını ve indirimli fiyatı anında bulun. Ücretsiz.",
    h1: "Yüzde, Kâr Zarar ve İndirim Hesaplama",
    howToTitle: "Hesaplama aracı nasıl kullanılır?",
    howToText:
      "Üstteki sekmelerden yapmak istediğiniz hesabı seçin: Yüzde Hesapla, Kar / Zarar veya İndirim Oranı. Alanlara değerleri girip Hesapla düğmesine basın, sonuç anında görünür. Kayıt olmanız gerekmez, araç doğrudan tarayıcıda çalışır.",
    formulasTitle: "Yüzde, kâr zarar ve indirim formülleri",
    blocks: [
      {
        title: "Yüzde hesaplama",
        lines: ["Sonuç = Sayı × Yüzde ÷ 100"],
        example: "Örnek: 250'nin %20'si = 250 × 20 ÷ 100 = 50.",
      },
      {
        title: "Kâr zarar hesaplama",
        lines: [
          "Kâr veya zarar = Satış fiyatı − Maliyet fiyatı",
          "Kâr veya zarar oranı = (Satış fiyatı − Maliyet fiyatı) ÷ Maliyet fiyatı × 100",
          "Sonuç pozitifse kâr, negatifse zarardır.",
        ],
        example:
          "Örnek: 200 TL'ye aldığınız bir ürünü 250 TL'ye satarsanız kârınız 50 TL, kâr oranınız %25 olur.",
      },
      {
        title: "İndirim hesaplama",
        lines: [
          "İndirim tutarı = Orijinal fiyat × İndirim yüzdesi ÷ 100",
          "İndirimli fiyat = Orijinal fiyat − İndirim tutarı",
        ],
        example:
          "Örnek: 1.000 TL'lik bir ürüne %15 indirim uygulanırsa indirim tutarı 150 TL, indirimli fiyat 850 TL olur.",
      },
    ],
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Alışverişte indirimli fiyatı ve ne kadar tasarruf ettiğinizi görmek",
      "Bir sayının yüzdesini bulmak (komisyon, bahşiş, zam gibi)",
      "Esnaf ve küçük işletmelerde ürün bazında kâr veya zararı hızlıca görmek",
      "Yüzde, kâr zarar ve indirim problemlerinde ödev ve sınav hazırlığı yapmak",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "Bir sayının yüzdesi nasıl hesaplanır?",
        a: "Sayıyı yüzde değeriyle çarpıp 100'e bölersiniz. Örneğin 250'nin %20'si için 250 × 20 ÷ 100 = 50 bulunur.",
      },
      {
        q: "Kâr oranı neye göre hesaplanır?",
        a: "Kâr oranı bu araçta maliyet fiyatına göre hesaplanır. Kâr tutarı maliyet fiyatına bölünür ve 100 ile çarpılır.",
      },
      {
        q: "İndirimli fiyat nasıl bulunur?",
        a: "Önce orijinal fiyatın indirim yüzdesi kadarını bulup indirim tutarını hesaplarsınız, sonra bu tutarı orijinal fiyattan çıkarırsınız.",
      },
      {
        q: "Araç ücretsiz mi, üyelik gerekiyor mu?",
        a: "Araç tamamen ücretsizdir ve üyelik gerektirmez.",
      },
    ],
  },
  en: {
    metaTitle: "Percentage, Profit/Loss and Discount Calculator",
    metaDescription:
      "A percentage, profit and loss and discount calculator. Instantly find the percentage of a number, your profit margin and the discounted price. Free.",
    h1: "Percentage, Profit/Loss and Discount Calculator",
    howToTitle: "How to use the calculator",
    howToText:
      "Pick the calculation you need from the tabs above: Percentage, Profit / Loss or Discount. Enter the values, press Calculate and the result appears instantly. You don't need to sign up, the tool works right in your browser.",
    formulasTitle: "Percentage, profit/loss and discount formulas",
    blocks: [
      {
        title: "Percentage calculation",
        lines: ["Result = Number × Percentage ÷ 100"],
        example: "Example: 20% of 250 = 250 × 20 ÷ 100 = 50.",
      },
      {
        title: "Profit and loss calculation",
        lines: [
          "Profit or loss = Selling price − Cost price",
          "Profit or loss percentage = (Selling price − Cost price) ÷ Cost price × 100",
          "A positive result is a profit, a negative result is a loss.",
        ],
        example:
          "Example: if you buy an item for 200 and sell it for 250, your profit is 50, which is 25%.",
      },
      {
        title: "Discount calculation",
        lines: [
          "Discount amount = Original price × Discount percentage ÷ 100",
          "Final price = Original price − Discount amount",
        ],
        example:
          "Example: an item priced at 1,000 with a 15% discount has a discount of 150 and a final price of 850.",
      },
    ],
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Seeing the discounted price and how much you save when shopping",
      "Finding the percentage of a number (commission, tip, raise and so on)",
      "Quickly seeing the profit or loss on each product for shops and small businesses",
      "Practicing percentage, profit/loss and discount problems for homework and exams",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "How do I calculate the percentage of a number?",
        a: "Multiply the number by the percentage and divide by 100. For example, 20% of 250 is 250 × 20 ÷ 100 = 50.",
      },
      {
        q: "What is the profit percentage based on?",
        a: "In this tool the percentage is based on the cost price. The profit is divided by the cost price and multiplied by 100.",
      },
      {
        q: "How do I find the discounted price?",
        a: "First work out the discount amount as the discount percentage of the original price, then subtract it from the original price.",
      },
      {
        q: "Is the tool free? Do I need an account?",
        a: "The tool is completely free and requires no account.",
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

export default async function PercentageCalculatorPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const c = content[lang];

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-zinc-100 dark:bg-background text-foreground transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        <ToolPageHeader lang={lang} />

        {/* Ekranda görünmez ama Google'ın sayfa başlığını anlaması için gerekli.
            ToolPageHeader zaten bir h1 basıyorsa bu satırı sil. */}
        <h1 className="sr-only">{c.h1}</h1>

        <ProfitLossCalculatorTool lang={lang} />

        {/* SEO içeriği: Google'a sayfanın ne hakkında olduğunu anlatır */}
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 space-y-8">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">{c.howToTitle}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {c.howToText}
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">{c.formulasTitle}</h2>
            {c.blocks.map((block) => (
              <div key={block.title} className="space-y-2">
                <h3 className="text-lg font-medium">{block.title}</h3>
                <ul className="list-disc pl-5 space-y-1.5 text-zinc-600 dark:text-zinc-400">
                  {block.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {block.example}
                </p>
              </div>
            ))}
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
