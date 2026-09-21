import Link from "next/link";

type Lang = "tr" | "en";

const labels = {
  tr: {
    privacy: "Gizlilik Politikası",
    about: "Hakkımızda",
    contact: "İletişim",
    nav: "Site bağlantıları",
  },
  en: {
    privacy: "Privacy Policy",
    about: "About",
    contact: "Contact",
    nav: "Site links",
  },
} as const;

export function SiteFooter({ lang }: { lang: Lang }) {
  const t = labels[lang];

  return (
    <footer className="border-t border-border/60 bg-zinc-100 dark:bg-background text-muted-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-8 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <span>© {new Date().getFullYear()} MyToolKit</span>
        <nav aria-label={t.nav} className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href={`/${lang}/about`} className="hover:text-foreground">
            {t.about}
          </Link>
          <Link href={`/${lang}/contact`} className="hover:text-foreground">
            {t.contact}
          </Link>
          <Link href={`/${lang}/privacy`} className="hover:text-foreground">
            {t.privacy}
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default SiteFooter;
