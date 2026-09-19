import type { Metadata } from "next";
import TextAnalyzerTool from "@/components/text-analyzer-tool";
import { ToolPageHeader } from "@/components/tool-page-header";

type Lang = "tr" | "en";

const PATH = "/tools/text-analyzer";

const content = {
  tr: {
    metaTitle: "Kelime ve Karakter Sayacı",
    metaDescription:
      "Metninizdeki kelime, karakter, cümle sayısını ve okuma süresini anında öğrenin. Boşluksuz karakter sayımı dahil, ücretsiz online sayaç.",
    backButton: "Ana Sayfaya Dön",
    h1: "Kelime ve Karakter Sayacı",
    toolTitle: "Kelime ve Karakter Sayacı",
    toolDescription:
      "Metninizdeki kelime, karakter, cümle sayısını ve tahmini okuma süresini anında görün.",
    howToTitle: "Kelime ve karakter sayacı nasıl kullanılır?",
    howToText:
      "Metninizi yukarıdaki kutuya yazın veya yapıştırın. Kelime sayısı, karakter sayısı, boşluksuz karakter sayısı, cümle sayısı ve tahmini okuma süresi siz yazdıkça anında güncellenir. Kayıt olmanız veya bir şey indirmeniz gerekmez. Sonucu görmek için sayfayı açıp metni yapıştırmanız yeterlidir. İşiniz bitince Kopyala ile metni alabilir, Temizle ile kutuyu sıfırlayabilirsiniz.",
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Ödev, makale ve tez metinlerinde kelime sınırını kontrol etmek",
      "X (Twitter) için 280, Instagram biyografisi için 150 karakter gibi sosyal medya sınırlarına uymak",
      "Meta açıklaması, ilan ve ürün metni gibi yazılarda uzunluğu ayarlamak",
      "Konuşma veya sunum metninin yaklaşık okuma süresini öğrenmek",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "Okuma süresi nasıl hesaplanıyor?",
        a: "Okuma süresi, kelime sayısı ortalama bir okuma hızına bölünerek tahmin edilir. Bu değer kişiden kişiye ve metnin zorluğuna göre değişebilir, bu yüzden yaklaşık bir süre olarak düşünmelisiniz.",
      },
      {
        q: "Boşluksuz karakter sayısı ne işe yarar?",
        a: "Bazı platformlar, çeviri ve yazı işleri boşlukları saymadan ücretlendirme veya sınır belirler. Boşluksuz karakter sayısı bu durumlarda doğru ölçüyü verir.",
      },
      {
        q: "Cümleler nasıl sayılıyor?",
        a: "Cümle sayısı; nokta, soru işareti ve ünlem gibi cümle sonu işaretlerine göre hesaplanır. Kısaltmalar veya üç noktalı ifadeler sonucu biraz etkileyebilir.",
      },
      {
        q: "Bu araç ücretsiz mi, üyelik gerekiyor mu?",
        a: "Araç tamamen ücretsizdir ve üyelik gerektirmez.",
      },
    ],
  },
  en: {
    metaTitle: "Word and Character Counter",
    metaDescription:
      "Count words, characters and sentences instantly and see the estimated reading time. Includes character count without spaces. Free online counter.",
    backButton: "Back to Home",
    h1: "Word and Character Counter",
    toolTitle: "Word and Character Counter",
    toolDescription:
      "Instantly see the word, character and sentence count of your text, plus the estimated reading time.",
    howToTitle: "How to use the word and character counter",
    howToText:
      "Type or paste your text into the box above. The word count, character count, character count without spaces, sentence count and estimated reading time update as you type. You don't need to sign up or download anything. Just open the page and paste your text. When you're done, use Copy to grab the text or Clear to reset the box.",
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Checking the word limit of essays, articles and theses",
      "Staying within social media limits such as 280 characters on X (Twitter) or 150 on an Instagram bio",
      "Adjusting the length of meta descriptions, listings and product copy",
      "Estimating the reading time of a speech or presentation script",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "How is the reading time calculated?",
        a: "Reading time is estimated by dividing the word count by an average reading speed. It varies from person to person and with the difficulty of the text, so treat it as an approximation.",
      },
      {
        q: "What is the character count without spaces used for?",
        a: "Some platforms, translation jobs and writing gigs set limits or pricing without counting spaces. The count without spaces gives you the right measure in those cases.",
      },
      {
        q: "How are sentences counted?",
        a: "The sentence count is based on sentence-ending marks such as periods, question marks and exclamation marks. Abbreviations or ellipses can slightly affect the result.",
      },
      {
        q: "Is this tool free? Do I need an account?",
        a: "The tool is completely free and requires no account.",
      },
    ],
  },
} as const;

export function generateStaticParams() {
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

export default async function TextAnalyzerPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const c = content[lang];

  // Araç bileşeninin beklediği sözlük yapısı
  const dict = {
    dashboard: {
      backButton: c.backButton,
    },
    tools: {
      textAnalyzer: {
        title: c.toolTitle,
        description: c.toolDescription,
      },
    },
  };

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-zinc-100 dark:bg-background text-foreground transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Ekranda görünmez ama Google'ın sayfa başlığını anlaması için gerekli.
            TextAnalyzerTool zaten bir h1 basıyorsa bu satırı sil. */}
        <h1 className="sr-only">{c.h1}</h1>

        <ToolPageHeader lang={lang} />
        <TextAnalyzerTool dict={dict} />

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
