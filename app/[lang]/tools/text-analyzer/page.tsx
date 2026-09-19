import TextAnalyzerTool from "@/components/text-analyzer-tool";
import { ToolPageHeader } from "@/components/tool-page-header";

export async function generateStaticParams() {
  return [{ lang: 'tr' }, { lang: 'en' }];
}

export default async function TextAnalyzerPage({
  params,
}: {
  params: Promise<{ lang: 'tr' | 'en' }>
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  // Gerçek sözlük yapısına uygun dictionary objesi
  const dict = {
    dashboard: {
      backButton: lang === 'tr' ? "Ana Sayfaya Dön" : "Back to Home",
    },
    tools: {
      textAnalyzer: {
        title: lang === 'tr' ? "Akıllı Metin & Karakter Analizcisi" : "Smart Text & Character Analyzer",
        description: lang === 'tr' ? "Metninizdeki kelime, karakter, cümle ve paragraf sayısını anında analiz edin." : "Instantly analyze word, character, sentence, and paragraph counts in your text."
      }
    }
  };

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-zinc-100 dark:bg-background text-foreground transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        <ToolPageHeader lang={lang} />
        <TextAnalyzerTool dict={dict} />
      </div>
    </div>
  );
}