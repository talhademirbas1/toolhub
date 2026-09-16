import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ToolHub",
  description: "Simple. Fast. Useful web tools.",
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