import ProfitLossCalculatorTool from "@/components/profit-loss-tool";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Next.js'in bu sayfayı statik olarak önceden üretmesini sağlar
export async function generateStaticParams() {
  return [{ lang: 'tr' }, { lang: 'en' }];
}

export default async function PercentageCalculatorPage({
  params,
}: {
  params: Promise<{ lang: 'tr' | 'en' }>
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const otherLang = lang === 'tr' ? 'en' : 'tr';

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-zinc-100 dark:bg-background text-foreground transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <Link href={`/${lang}`}>
            <Button variant="ghost" className="gap-2 -ml-2">
              <ArrowLeft className="size-4" />
              {lang === 'tr' ? "Ana Sayfaya Dön" : "Back to Home"}
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Link href={`/${otherLang}/tools/percentage-calculator`}>
              <Button size="icon" variant="outline" className="font-bold text-xs">
                {lang === 'tr' ? 'EN' : 'TR'}
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
        <ProfitLossCalculatorTool lang={lang} />
      </div>
    </div>
  );
}