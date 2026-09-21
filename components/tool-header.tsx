'use client'

import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'
import { type Locale } from '@/i18n.config'

interface ToolHeaderProps {
  dict: any
  onBack?: () => void
  currentLang: Locale
  onLangChange: () => void
  dark: boolean
  onThemeToggle: () => void
}

export function ToolHeader({
  dict,
  currentLang,
  onLangChange,
  dark,
  onThemeToggle,
}: ToolHeaderProps) {
  const getNextLangLabel = () => {
    if (currentLang === 'tr') return 'EN';
    if (currentLang === 'en') return 'ES';
    return 'TR';
  };

  const handleBack = () => {
    // 1. Ana sayfaya dönmeden hemen önce en üstteki scroll pozisyonunu hafızaya al
    // (Bunu ana sayfa bileşeninde okuyacağız)
    window.history.back();
  };

  return (
    <header className="mb-6 flex justify-between items-center max-w-lg mx-auto">
      <Button onClick={handleBack} variant="ghost">
        ← {dict?.dashboard?.backButton || "Back"}
      </Button>
      
      <div className="flex items-center gap-2">
        <Button onClick={onLangChange} size="sm" variant="outline" className="font-bold uppercase">
          {getNextLangLabel()}
        </Button>
        <Button
          aria-label={dark ? dict?.dashboard?.themeLight : dict?.dashboard?.themeDark}
          onClick={onThemeToggle}
          size="icon"
          variant="outline"
          className="h-9 w-9"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  )
}