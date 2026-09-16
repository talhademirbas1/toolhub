import { getDictionary } from './dictionaries'
import ToolHubDashboard from '@/components/toolhub-dashboard'
import { redirect } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: 'tr' | 'en' }>
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  async function handleLangChange(newLang: string) {
    'use server'
    redirect(`/${newLang}`);
  }

  return (
    <ToolHubDashboard
      dict={dict}
      currentLang={lang}
      onLangChange={handleLangChange}
    />
  )
}