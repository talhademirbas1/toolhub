import DashboardClient from '@/components/dashboard-client'

export default async function Page({ params }: { params: Promise<{ lang: 'tr' | 'en' }> }) {
  const { lang } = await params
  return <DashboardClient initialLang={lang} />
}