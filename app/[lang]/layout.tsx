import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { i18n, type Locale } from "@/i18n.config";

const siteUrl = "https://www.mytoolkitbase.com";

// Dinamik diller (tr, en, es)
export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isTr = lang === "tr";
  const isEs = lang === "es";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: isTr
        ? "MyToolKit | Ücretsiz Online Araçlar"
        : isEs
        ? "MyToolKit | Herramientas Online Gratuitas"
        : "MyToolKit | Free Online Tools",
      template: "%s | MyToolKit",
    },
    description: isTr
      ? "Basit, hızlı ve kullanışlı ücretsiz web araçları."
      : isEs
      ? "Herramientas web simples, rápidas y útiles."
      : "Simple. Fast. Useful web tools.",
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const currentLang = i18n.locales.includes(lang) ? lang : i18n.defaultLocale;

  return (
    <div lang={currentLang} className="contents">
      {children}
      <SiteFooter lang={currentLang} />
    </div>
  );
}