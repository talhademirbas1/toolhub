import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyToolkit",
  description: "Simple. Fast. Useful web tools.",
  icons: {
    icon: "/icon?v=999", // Tarayıcıya "Bunu yeni bir dosya gibi zorla indir" diyoruz
  },
};

export function generateStaticParams() {
  return [{ lang: 'tr' }, { lang: 'en' }];
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
    </div>
  );
}