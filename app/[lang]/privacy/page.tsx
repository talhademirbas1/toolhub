import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/tool-page-header";

type Lang = "tr" | "en";

const PATH = "/privacy";
const LAST_UPDATED = "21.09.2026";

const content = {
  tr: {
    metaTitle: "Gizlilik Politikası",
    metaDescription:
      "MyToolKit gizlilik politikası: hangi verilerin işlendiği, tarayıcıda saklanan tercihler, ziyaret istatistikleri ve reklamlar hakkında bilgi.",
    title: "Gizlilik Politikası",
    updatedLabel: "Son güncelleme",
    sections: [
      {
        title: "Genel",
        text: [
          "Bu politika, www.mytoolkitbase.com adresindeki MyToolKit sitesini kullandığınızda verilerinizin nasıl ele alındığını açıklar. Siteyi kullanmak için üye olmanız veya kişisel bilgi vermeniz gerekmez.",
        ],
      },
      {
        title: "Araçlara girdiğiniz veriler",
        text: [
          "Sitedeki araçlara yazdığınız metinler, sayılar veya yüklediğiniz görseller sitenin sunucusuna kaydedilmez, tarayıcınızda işlenir.",
        ],
      },
      {
        title: "Tarayıcıda saklanan tercihler",
        text: [
          "Tema tercihiniz ve bazı araçlarda son girdiğiniz değerler gibi ayarları, kullanım kolaylığı için tarayıcınızın yerel depolamasında saklarız. Bu bilgiler cihazınızda kalır, bize gönderilmez. Tarayıcı ayarlarınızdan istediğiniz zaman silebilirsiniz.",
        ],
      },
      {
        title: "Ziyaret istatistikleri",
        text: [
          "Siteyi geliştirmek için Vercel Web Analytics kullanıyoruz. Bu hizmet sayfa görüntülemeleri, yönlendiren site, ülke, tarayıcı ve cihaz türü gibi toplu istatistik verileri toplar. Bu veriler sizi kişisel olarak tanımlamak için kullanılmaz.",
        ],
      },
      {
        title: "Reklamlar ve çerezler",
        text: [
          "İleride sitede Google AdSense gibi reklam hizmetleri kullanılabilir. Bu durumda Google ve iş ortakları, reklamları göstermek ve ölçmek için çerez ve benzeri teknolojiler kullanabilir. Reklamlar yayınlanmaya başlarsa bu politikayı ve çerez tercihlerinizi buna göre güncelleriz.",
        ],
      },
      {
        title: "Barındırma",
        text: [
          "Site Vercel altyapısında barındırılır. Bu hizmet, sunucu kayıtları gibi teknik verileri işleyebilir.",
        ],
      },
      {
        title: "Haklarınız ve iletişim",
        text: [
          "Verilerinizle ilgili sorularınız ve talepleriniz için İletişim sayfasındaki e-posta adresinden bize ulaşabilirsiniz.",
        ],
      },
      {
        title: "Değişiklikler",
        text: [
          "Bu politikayı zaman zaman güncelleyebiliriz. Son güncelleme tarihi bu sayfanın başında yer alır.",
        ],
      },
    ],
  },
  en: {
    metaTitle: "Privacy Policy",
    metaDescription:
      "MyToolKit privacy policy: what data is processed, preferences stored in your browser, visit statistics and advertising.",
    title: "Privacy Policy",
    updatedLabel: "Last updated",
    sections: [
      {
        title: "Overview",
        text: [
          "This policy explains how your data is handled when you use MyToolKit at www.mytoolkitbase.com. You don't need to create an account or provide personal information to use the site.",
        ],
      },
      {
        title: "Data you enter into the tools",
        text: [
          "The text, numbers or images you enter into the tools are not saved on the site's servers, they are processed in your browser.",
        ],
      },
      {
        title: "Preferences stored in your browser",
        text: [
          "We store settings such as your theme preference and, in some tools, the values you last entered in your browser's local storage for convenience. This information stays on your device and is not sent to us. You can delete it at any time from your browser settings.",
        ],
      },
      {
        title: "Visit statistics",
        text: [
          "We use Vercel Web Analytics to improve the site. It collects aggregated statistics such as page views, referring site, country, browser and device type. This data is not used to identify you personally.",
        ],
      },
      {
        title: "Advertising and cookies",
        text: [
          "Advertising services such as Google AdSense may be used on the site in the future. In that case Google and its partners may use cookies and similar technologies to show and measure ads. If ads go live, we will update this policy and your cookie choices accordingly.",
        ],
      },
      {
        title: "Hosting",
        text: [
          "The site is hosted on Vercel. This service may process technical data such as server logs.",
        ],
      },
      {
        title: "Your rights and contact",
        text: [
          "For questions and requests about your data, you can reach us at the email address on the Contact page.",
        ],
      },
      {
        title: "Changes",
        text: [
          "We may update this policy from time to time. The last update date is shown at the top of this page.",
        ],
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
  };
}

export default async function PrivacyPage({
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
          <header className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">{c.title}</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {c.updatedLabel}: {LAST_UPDATED}
            </p>
          </header>

          {c.sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              {section.text.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-zinc-600 dark:text-zinc-400 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
