'use client'

import { useState, useEffect } from "react";
import ImageConverterTool from "@/components/image-converter-tool";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Moon, Sun } from "lucide-react";

export default function ImageConverterPage({
  params,
}: {
  params: Promise<{ lang: 'tr' | 'en' }>
}) {
  const [lang, setLang] = useState<'tr' | 'en'>('tr');
  const [dark, setDark] = useState(false);

  useEffect(() => {
    params.then((p) => setLang(p.lang));

    // Tema tercihini yükle
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && document.documentElement.classList.contains('dark'))) {
      setDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, [params]);

  function toggleTheme() {
    const yeniDurum = !dark;
    setDark(yeniDurum);
    
    if (yeniDurum) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  const otherLang = lang === 'tr' ? 'en' : 'tr';

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-zinc-100 dark:bg-background text-foreground transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Üst Navigasyon ve Kontroller (Ana Sayfa ile Birebir Aynı) */}
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <Link href={`/${lang}`}>
            <Button variant="ghost" className="gap-2 -ml-2">
              <ArrowLeft className="size-4" />
              {lang === 'tr' ? "Ana Sayfaya Dön" : "Back to Home"}
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <Link href={`/${otherLang}/tools/image-converter`}>
              <Button size="icon" variant="outline" className="font-bold text-xs">
                {lang === 'tr' ? 'EN' : 'TR'}
              </Button>
            </Link>
            <Button onClick={toggleTheme} size="icon" variant="outline" aria-label="Tema Değiştir">
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
          </div>
        </div>

        {/* Araç İçeriği */}
        <ImageConverterTool lang={lang} />
      </div>
    </div>
  );
}