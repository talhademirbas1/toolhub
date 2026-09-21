'use client'

import { useState } from 'react'
import trDict from '@/locales/tr.json'
import enDict from '@/locales/en.json'
import esDict from '@/locales/es.json'
import { ToolHubDashboard } from './toolhub-dashboard'
import { type Locale } from '@/i18n.config'

const dictionaries = { 
  tr: trDict, 
  en: enDict,
  es: esDict 
} as const

export default function DashboardClient({ initialLang }: { initialLang: Locale }) {
  const [lang, setLang] = useState<Locale>(initialLang)
  const dict = dictionaries[lang] || dictionaries.tr

  const switchLang = (newLang: Locale) => {
    setLang(newLang)
    const newPath = window.location.pathname.replace(`/${lang}`, `/${newLang}`)
    window.history.replaceState(null, '', newPath + window.location.hash)
  }

  return <ToolHubDashboard dict={dict} currentLang={lang} onLangChange={switchLang} />
}