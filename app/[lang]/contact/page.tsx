import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/tool-page-header";

type Lang = "tr" | "en";

const PATH = "/contact";

// !!! DEĞİŞTİR: Kendi gerçek e-posta adresini yaz. Bu satırı değiştirmeden yayına alma.
const CONTACT_EMAIL = "mytoolkitbase@gmail.com";

const content = {
  tr: {
    metaTitle: "İletişim",
    metaDescription:
      "MyToolKit ile iletişime geçin: hata bildirimi, araç önerisi, iş birliği ve diğer sorularınız için e-posta adresimiz.",
    title: "İletişim",
    intro:
      "Bir hata bildirmek, yeni bir araç önermek ya da başka bir konuda bize ulaşmak için e-posta gönderebilirsiniz.",
    emailLabel: "E-posta",
    topicsTitle: "Bize yazabileceğiniz konular",
    topics: [
      "Bir araçta bulduğunuz hata veya yanlış sonuç",
      "Eklenmesini istediğiniz yeni araç önerileri",
      "İş birliği ve reklam talepleri",
      "Gizlilik ve verilerinizle ilgili sorular",
    ],
    note: "Mesajlara en kısa sürede dönmeye çalışıyoruz.",
  },
  en: {
    metaTitle: "Contact",
    metaDescription:
      "Get in touch with MyToolKit: our email address for bug reports, tool suggestions, partnerships and other questions.",
    title: "Contact",
    intro:
      "You can email us to report a bug, suggest a new tool or reach us about anything else.",
    emailLabel: "Email",
    topicsTitle: "What you can write to us about",
    topics: [
      "A bug or wrong result you found in a tool",
      "Suggestions for new tools you would like to see",
      "Partnership and advertising requests",
      "Questions about privacy and your data",
    ],
    note: "We try to reply as soon as we can.",
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

export default async function ContactPage({
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
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight">{c.title}</h1>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {c.intro}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {c.emailLabel}
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-lg font-medium underline underline-offset-4"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">{c.topicsTitle}</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-600 dark:text-zinc-400">
              {c.topics.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <p className="text-sm text-zinc-500 dark:text-zinc-400">{c.note}</p>
        </article>
      </div>
    </div>
  );
}
