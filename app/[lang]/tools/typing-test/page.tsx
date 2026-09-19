import type { Metadata } from "next";
import TypingTestTool from "@/components/typing-test-tool";
import { ToolPageHeader } from "@/components/tool-page-header";

type Lang = "tr" | "en";

// DİKKAT: Bu, sayfanın klasör adıyla birebir aynı olmalı (app/[lang]/tools/<klasör>/page.tsx)
const PATH = "/tools/typing-test";

const content = {
  tr: {
    metaTitle: "Yazma Hızı Testi",
    metaDescription:
      "Klavyede yazma hızınızı ölçün. Ücretsiz, kayıt gerektirmeyen online yazma hızı testi ile dakikada kaç kelime yazdığınızı öğrenin.",
    h1: "Yazma Hızı Testi",
    howToTitle: "Yazma hızı testi nasıl yapılır?",
    howToText:
      "Testi başlatın ve ekrandaki metni olabildiğince hızlı ve hatasız yazın. Test bitince yazma hızınızı görürsünüz. Yazma hızı genellikle dakikadaki kelime sayısı (WPM) ile ölçülür. Kayıt olmanız gerekmez, test doğrudan tarayıcıda çalışır.",
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
    metaDescription:
      "Measure your typing speed on the keyboard. Find out how many words per minute you type with this free online typing test that needs no sign-up.",
    h1: "Typing Speed Test",
    howToTitle: "How to take a typing speed test",
    howToText:
      "Start the test and type the text on the screen as fast and as accurately as you can. When the test ends you can see your typing speed. Typing speed is usually measured in words per minute (WPM). You don't need to sign up, the test works right in your browser.",
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

export default async function TypingTestPage({
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
            TypingTestTool zaten bir h1 basıyorsa bu satırı sil. */}
        <h1 className="sr-only">{c.h1}</h1>

        <ToolPageHeader lang={lang} />
        <TypingTestTool lang={lang} />

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
