'use client'

import { useState } from 'react'
import trDict from '@/locales/tr.json'
import enDict from '@/locales/en.json'
import { ToolHubDashboard } from './toolhub-dashboard'

const dictionaries = { tr: trDict, en: enDict } as const

export default function DashboardClient({ initialLang }: { initialLang: 'tr' | 'en' }) {
  const [lang, setLang] = useState<'tr' | 'en'>(initialLang)
  const dict = dictionaries[lang]

  const switchLang = (newLang: 'tr' | 'en') => {
    setLang(newLang)
    const newPath = window.location.pathname.replace(`/${lang}`, `/${newLang}`)
    window.history.replaceState(null, '', newPath + window.location.hash)
  }

  return <ToolHubDashboard dict={dict} currentLang={lang} onLangChange={switchLang} />
}