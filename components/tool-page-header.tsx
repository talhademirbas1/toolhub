'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Moon, Sun, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { i18n, type Locale } from '@/i18n.config'

export function ToolPageHeader({ lang }: { lang: Locale }) {
  const router = useRouter()
  const pathname = usePathname()
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && document.documentElement.classList.contains('dark'))) {
      setDark(true); document.documentElement.classList.add('dark');
    } else {
      setDark(false); document.documentElement.classList.remove('dark');
    }
  }, [])

  function toggleTheme() {
    const yeniDurum = !dark;
    setDark(yeniDurum);
    if (yeniDurum) { document.documentElement.classList.add('dark'); localStorage.setItem('theme', 'dark'); }
    else { document.documentElement.classList.remove('dark'); localStorage.setItem('theme', 'light'); }
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as Locale;
    if (dark) localStorage.setItem('theme', 'dark');
    else localStorage.setItem('theme', 'light');

    if (!pathname) return;
    const pathParts = pathname.split('/');
    pathParts[1] = newLang; // URL'deki dili günceller (örn: /tr/tools/... -> /es/tools/...)
    const newPath = pathParts.join('/');
    router.push(newPath);
  };

  return (
    <header className="flex items-center justify-between mb-8">
      <Link href={`/${lang}`} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="size-4" />
        {lang === 'tr' ? 'Ana Sayfaya Dön' : lang === 'es' ? 'Volver al Inicio' : 'Back to Home'}
      </Link>

      <div className="flex items-center gap-2">
        <select
          value={lang}
          onChange={handleLanguageChange}
          className="h-9 cursor-pointer rounded-md border border-input bg-transparent px-2 py-1 text-xs font-bold uppercase shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          {i18n.locales.map((l) => (
            <option key={l} value={l} className="uppercase bg-background text-foreground">
              {l.toUpperCase()}
            </option>
          ))}
        </select>

        <Button aria-label="Toggle Theme" onClick={toggleTheme} size="icon" variant="outline">
          {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
      </div>
    </header>
  )
}