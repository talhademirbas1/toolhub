'use client'

import { useState, useEffect } from "react";
import StopwatchTool from "@/components/stopwatch-tool";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Moon, Sun } from "lucide-react";

export default function StopwatchPage({
  params,
}: {
  params: Promise<{ lang: 'tr' | 'en' }>
}) {
  const [lang, setLang] = useState<'tr' | 'en'>('tr');
  const [dark, setDark] = useState(false);

  useEffect(() => {
    params.then((p) => {
      if (p.lang) setLang(p.lang);
    });
    
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

  const targetLang = lang === 'tr' ? 'en' : 'tr';

  const dict = {
    dashboard: {
      backButton: lang === 'tr' ? "Ana Sayfaya Dön" : "Back to Home",
    },
    tools: {
      stopwatchTool: {
        title: lang === 'tr' ? "Kronometre ve Geri Sayım" : "Stopwatch & Timer",
        description: lang === 'tr' ? "Zamanı hassas bir şekilde ölçün ve geri sayım kurun." : "Measure time precisely and set countdowns."
      }
    }
  };

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-zinc-100 dark:bg-background text-foreground transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <Link href={`/${lang}`}>
            <Button variant="ghost" className="gap-2 -ml-2">
              <ArrowLeft className="size-4" />
              {dict.dashboard.backButton}
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Link href={`/${targetLang}/tools/stopwatch`}>
              <Button size="icon" variant="outline" className="font-bold text-xs" aria-label="Dil Değiştir">
                {lang === 'tr' ? 'EN' : 'TR'}
              </Button>
            </Link>
            <Button onClick={toggleTheme} size="icon" variant="outline" aria-label="Tema Değiştir">
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
          </div>
        </div>
        <StopwatchTool dict={dict} />
      </div>
    </div>
  );
}