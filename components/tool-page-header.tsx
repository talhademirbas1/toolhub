'use client'

import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { useToolNavigation } from '@/hooks/use-tool-navigation'

interface ToolPageHeaderProps {
  lang: 'tr' | 'en'
}

export function ToolPageHeader({ lang }: ToolPageHeaderProps) {
  const { handleBack, toggleLanguage } = useToolNavigation(lang)

  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-4">
      <Button onClick={handleBack} variant="ghost" className="gap-2 -ml-2">
        <ArrowLeft className="size-4" />
        {lang === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home'}
      </Button>
      <div className="flex items-center gap-2">
        <Button onClick={toggleLanguage} size="icon" variant="outline" className="font-bold text-xs">
          {lang === 'tr' ? 'EN' : 'TR'}
        </Button>
        <ThemeToggle />
      </div>
    </div>
  )
}