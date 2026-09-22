import type { Metadata } from 'next'
import PomodoroTimerTool from '@/components/pomodoro-timer-tool'
import { ToolPageHeader } from '@/components/tool-page-header'
import { i18n, type Locale } from '@/i18n.config'

const PATH = '/tools/pomodoro-timer'

const content = {
  tr: {
    metaTitle: 'Pomodoro Zamanlayıcı',
    metaDescription: '25 dakika çalış, 5 dakika mola ver. Ücretsiz online Pomodoro zamanlayıcı. Odaklanmak ve üretken olmak için klasik teknik.',
    h1: 'Pomodoro Zamanlayıcı',
    howToTitle: 'Pomodoro tekniği nedir?',
    howToText: 'Pomodoro tekniği, 25 dakika kesintisiz çalışma ve ardından 5 dakika mola verme döngüsüne dayanır. Her 4 turdan sonra 15-30 dakikalık uzun bir mola yapılır. Bu yöntem odaklanmayı artırır, zihinsel yorgunluğu azaltır ve üretkenliği yükseltir.',
    useCasesTitle: 'Ne işe yarar?',
    useCases: [
      'Ders çalışırken odaklanmayı artırmak',
      'Uzun yazma veya kodlama seanslarını yönetmek',
      'Erteleme alışkanlığını kırmak',
      'Gün içindeki çalışma süresini takip etmek',
    ],
    faqTitle: 'Sık sorulan sorular',
    faq: [
      { q: 'Pomodoro sürelerini değiştirebilir miyim?', a: 'Evet, çalışma, kısa mola ve uzun mola sürelerini istediğiniz gibi ayarlayabilirsiniz.' },
      { q: 'Bildirimler nasıl çalışır?', a: 'Tarayıcı bildirimi için "Açık" seçeneğini tıklamanız yeterli. Tarayıcı izin isteyecektir.' },
      { q: 'Sayfa kapatılırsa sayaç sıfırlanır mı?', a: 'Evet, sayaç yalnızca sayfa açık olduğu sürece çalışır.' },
    ],
  },
  en: {
    metaTitle: 'Pomodoro Timer',
    metaDescription: 'Work 25 minutes, break 5 minutes. Free online Pomodoro timer. The classic technique to stay focused and productive.',
    h1: 'Pomodoro Timer',
    howToTitle: 'What is the Pomodoro technique?',
    howToText: 'The Pomodoro technique is based on a cycle of 25 minutes of uninterrupted work followed by a 5-minute break. After every 4 rounds, a longer break of 15-30 minutes is taken. This method improves focus, reduces mental fatigue and boosts productivity.',
    useCasesTitle: 'What is it useful for?',
    useCases: [
      'Increasing focus while studying',
      'Managing long writing or coding sessions',
      'Breaking the habit of procrastination',
      'Tracking working time throughout the day',
    ],
    faqTitle: 'Frequently asked questions',
    faq: [
      { q: 'Can I change the Pomodoro durations?', a: 'Yes, you can adjust the work, short break and long break durations as you like.' },
      { q: 'How do notifications work?', a: 'Just click "On" for browser notifications. The browser will ask for permission.' },
      { q: 'Does the timer reset if I close the page?', a: 'Yes, the timer only runs while the page is open.' },
    ],
  },
  es: {
    metaTitle: 'Temporizador Pomodoro',
    metaDescription: 'Trabaja 25 minutos, descansa 5 minutos. Temporizador Pomodoro online gratuito. La técnica clásica para mantenerte enfocado y productivo.',
    h1: 'Temporizador Pomodoro',
    howToTitle: '¿Qué es la técnica Pomodoro?',
    howToText: 'La técnica Pomodoro se basa en un ciclo de 25 minutos de trabajo ininterrumpido seguido de un descanso de 5 minutos. Tras cada 4 rondas, se hace un descanso más largo de 15-30 minutos. Este método mejora la concentración, reduce la fatiga mental y aumenta la productividad.',
    useCasesTitle: '¿Para qué sirve?',
    useCases: [
      'Aumentar la concentración al estudiar',
      'Gestionar largas sesiones de escritura o programación',
      'Romper el hábito de la procrastinación',
      'Hacer un seguimiento del tiempo de trabajo durante el día',
    ],
    faqTitle: 'Preguntas frecuentes',
    faq: [
      { q: '¿Puedo cambiar las duraciones del Pomodoro?', a: 'Sí, puedes ajustar las duraciones de trabajo, descanso corto y descanso largo como quieras.' },
      { q: '¿Cómo funcionan las notificaciones?', a: 'Solo haz clic en "Activado" para las notificaciones del navegador. El navegador pedirá permiso.' },
      { q: '¿El temporizador se reinicia si cierro la página?', a: 'Sí, el temporizador solo funciona mientras la página está abierta.' },
    ],
  },
} as const

export async function generateStaticParams() { return i18n.locales.map((lang) => ({ lang })) }

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const c = content[lang]
  const languages = i18n.locales.reduce((acc, locale) => { acc[locale] = `/${locale}${PATH}`; return acc }, {} as Record<string, string>)
  languages['x-default'] = `/${i18n.defaultLocale}${PATH}`
  return {
    title: c.metaTitle, description: c.metaDescription,
    alternates: { canonical: `/${lang}${PATH}`, languages },
    openGraph: { title: c.metaTitle, description: c.metaDescription, url: `/${lang}${PATH}`, siteName: 'MyToolKit', locale: lang === 'tr' ? 'tr_TR' : lang === 'es' ? 'es_ES' : 'en_US', type: 'website' },
  }
}

export default async function PomodoroTimerPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const c = content[lang]
  return (
    <div className="min-h-screen p-6 sm:p-10 bg-zinc-100 dark:bg-background text-foreground transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="sr-only">{c.h1}</h1>
        <ToolPageHeader lang={lang} />
        <PomodoroTimerTool lang={lang} />
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 space-y-8">
          <div className="space-y-3"><h2 className="text-xl font-semibold">{c.howToTitle}</h2><p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{c.howToText}</p></div>
          <div className="space-y-3"><h2 className="text-xl font-semibold">{c.useCasesTitle}</h2><ul className="list-disc pl-5 space-y-1.5 text-zinc-600 dark:text-zinc-400">{c.useCases.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div className="space-y-3"><h2 className="text-xl font-semibold">{c.faqTitle}</h2><div className="space-y-2">{c.faq.map((item) => (<details key={item.q} className="group rounded-lg border border-zinc-200 dark:border-zinc-800 px-4 py-3"><summary className="cursor-pointer font-medium">{item.q}</summary><p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.a}</p></details>))}</div></div>
        </section>
      </div>
    </div>
  )
}