import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageHeader } from "@/components/tool-page-header";

type Lang = "tr" | "en";

const PATH = "/about";

const content = {
  tr: {
    metaTitle: "Hakkımızda",
    metaDescription:
      "MyToolKit, günlük işlerde işe yarayan ücretsiz online araçları tek bir yerde toplayan bağımsız bir projedir.",
    title: "Hakkımızda",
    sections: [
      {
        title: "MyToolKit nedir?",
        text: "MyToolKit, günlük işlerde işe yarayan ücretsiz online araçları tek bir yerde toplayan bağımsız bir projedir. Yüzde ve indirim hesaplama, kelime sayacı, yazma hızı testi, dünya saati, resim dönüştürücü gibi araçları kayıt olmadan, doğrudan tarayıcıdan kullanabilirsiniz.",
      },
      {
        title: "Amacımız",
        text: "İhtiyacınız olan küçük işi en az adımda çözmenizi sağlamak. Araçlar sade, hızlı ve anlaşılır olacak şekilde tasarlanır, her aracın yanında nasıl kullanıldığını ve hangi formülün kullanıldığını anlatan bir açıklama bulunur.",
      },
      {
        title: "Nasıl çalışır?",
        text: "Araçlar Türkçe ve İngilizce sunulur, telefon, tablet ve bilgisayarda kullanılabilir. Yeni araçlar düzenli olarak eklenir.",
      },
      {
        title: "Geri bildirim",
        text: "Bir hata bulduysanız ya da eklenmesini istediğiniz bir araç varsa bize yazın.",
      },
    ],
    contactLink: "İletişim sayfasına git",
  },
  en: {
    metaTitle: "About",
    metaDescription:
      "MyToolKit is an independent project that brings together free online tools for everyday tasks in one place.",
    title: "About",
    sections: [
      {
        title: "What is MyToolKit?",
        text: "MyToolKit is an independent project that brings together free online tools for everyday tasks in one place. You can use tools such as a percentage and discount calculator, word counter, typing speed test, world clock and image converter right in your browser, without signing up.",
      },
      {
        title: "Our goal",
        text: "To help you solve the small task in front of you in as few steps as possible. The tools are designed to be simple, fast and clear, and each one comes with an explanation of how to use it and which formula it relies on.",
      },
      {
        title: "How it works",
        text: "The tools are available in Turkish and English and work on phone, tablet and computer. New tools are added regularly.",
      },
      {
        title: "Feedback",
        text: "If you find a bug or there is a tool you would like to see added, write to us.",
      },
    ],
    contactLink: "Go to the contact page",
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
  };
}

export default async function AboutPage({
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

        <article className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 space-y-8">
          <h1 className="text-3xl font-semibold tracking-tight">{c.title}</h1>

          {c.sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {section.text}
              </p>
            </section>
          ))}

          <Link
            href={`/${lang}/contact`}
            className="inline-block text-sm font-medium underline underline-offset-4"
          >
            {c.contactLink}
          </Link>
        </article>
      </div>
    </div>
  );
}
