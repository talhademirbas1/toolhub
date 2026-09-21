import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";

const siteUrl = "https://www.mytoolkitbase.com";

export function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isTr = lang === "tr";

  return {
    // canonical, hreflang ve OG adreslerini tam URL'ye çevirir
    metadataBase: new URL(siteUrl),
    title: {
      default: isTr
        ? "MyToolKit | Ücretsiz Online Araçlar"
        : "MyToolKit | Free Online Tools",
      // Alt sayfalarda başlık "Sayfa Adı | MyToolKit" olur
      template: "%s | MyToolKit",
    },
    description: isTr
      ? "Basit, hızlı ve kullanışlı ücretsiz web araçları."
      : "Simple. Fast. Useful web tools.",
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <div lang={lang} className="contents">
      {children}
      <SiteFooter lang={lang === "en" ? "en" : "tr"} />
    </div>
  );
}
