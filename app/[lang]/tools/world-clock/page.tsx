import WorldClockTool from "@/components/world-clock-tool";

// Next.js'in bu sayfayı statik olarak önceden üretmesini sağlar
export async function generateStaticParams() {
  return [{ lang: 'tr' }, { lang: 'en' }];
}

export default async function WorldClockPage({
  params,
}: {
  params: Promise<{ lang: 'tr' | 'en' }>
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-zinc-100 dark:bg-background text-foreground transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        <WorldClockTool lang={lang} />
      </div>
    </div>
  );
}