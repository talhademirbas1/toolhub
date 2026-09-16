'use client'

import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'

interface ToolHeaderProps {
  dict: any
  onBack: () => void
  currentLang: 'tr' | 'en'
  onLangChange: () => void
  dark: boolean
  onThemeToggle: () => void
}

export function ToolHeader({
  dict,
  onBack,
  currentLang,
  onLangChange,
  dark,
  onThemeToggle,
}: ToolHeaderProps) {
  return (
    <header className="mb-6 flex justify-between items-center max-w-lg mx-auto">
      <Button onClick={onBack} variant="ghost">
        ← {dict.dashboard.backButton}
      </Button>
      
      <div className="flex items-center gap-2">
        <Button onClick={onLangChange} size="sm" variant="outline" className="font-bold">
          {currentLang === 'tr' ? 'EN' : 'TR'}
        </Button>
        <Button
          aria-label={dark ? dict.dashboard.themeLight : dict.dashboard.themeDark}
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