'use client'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  Calculator,
  FileText,
  Image as ImageIcon,
  Moon,
  Search,
  Sun,
  Zap,
  Clock,
  Timer,
  Globe,
  Keyboard, // Klavye ikonu eklendi
  Cake, // Yaş hesaplama ikonu
  Scale, // BMI hesaplama ikonu
  GraduationCap, // GPA hesaplama ikonu
  QrCode, // QR Kod ikonu
  KeyRound, // Şifre Oluşturucu ikonu
  Ruler // Birim Çevirici ikonu
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

type CategoryKey = 'all' | 'visual' | 'text' | 'calculators' | 'time';

type ToolBase = {
  id: string;
  categoryKey: Exclude<CategoryKey, 'all'>;
  icon: typeof ImageIcon;
  accent: string;
  slug: string;
}

const categoryKeys: CategoryKey[] = ['all', 'visual', 'text', 'calculators', 'time'];

const baseTools: ToolBase[] = [
  { id: 'imageConverter', categoryKey: 'visual', icon: ImageIcon, accent: 'bg-sky-500/10 text-sky-400 ring-sky-400/20', slug: 'image-converter' },
  { id: 'textAnalyzer', categoryKey: 'text', icon: FileText, accent: 'bg-violet-500/10 text-violet-400 ring-violet-400/20', slug: 'text-analyzer' },
  // YENİ KLAVYE HIZ TESTİ ARACI BURAYA EKLENDİ:
  { id: 'typingTest', categoryKey: 'text', icon: Keyboard, accent: 'bg-indigo-500/10 text-indigo-400 ring-indigo-400/20', slug: 'typing-test' },
  { id: 'percentageCalculator', categoryKey: 'calculators', icon: Calculator, accent: 'bg-emerald-500/10 text-emerald-400 ring-emerald-400/20', slug: 'percentage-calculator' },
  { id: 'classicCalculator', categoryKey: 'calculators', icon: Calculator, accent: 'bg-amber-500/10 text-amber-500 ring-amber-500/20', slug: 'classic-calculator' },
  { id: 'timeDifference', categoryKey: 'time', icon: Clock, accent: 'bg-cyan-500/10 text-cyan-500 ring-cyan-500/20', slug: 'time-difference' },
  { id: 'stopwatchTool', categoryKey: 'time', icon: Timer, accent: 'bg-rose-500/10 text-rose-500 ring-rose-500/20', slug: 'stopwatch' },
  { id: 'worldClock', categoryKey: 'time', icon: Globe, accent: 'bg-blue-500/10 text-blue-500 ring-blue-500/20', slug: 'world-clock' },
  // YENİ ARAÇLAR (yurt dışı trafiği için yüksek arama hacimli araçlar):
  { id: 'ageCalculator', categoryKey: 'time', icon: Cake, accent: 'bg-pink-500/10 text-pink-500 ring-pink-500/20', slug: 'age-calculator' },
  { id: 'bmiCalculator', categoryKey: 'calculators', icon: Scale, accent: 'bg-teal-500/10 text-teal-500 ring-teal-500/20', slug: 'bmi-calculator' },
  { id: 'gpaCalculator', categoryKey: 'calculators', icon: GraduationCap, accent: 'bg-indigo-500/10 text-indigo-500 ring-indigo-500/20', slug: 'gpa-calculator' },
  // EN YENİ EKLENEN 3 ARAÇ (QR Kod, Şifre Oluşturucu, Birim Çevirici):
  { id: 'qrCodeGenerator', categoryKey: 'visual', icon: QrCode, accent: 'bg-indigo-500/10 text-indigo-400 ring-indigo-400/20', slug: 'qr-code-generator' },
  { id: 'passwordGenerator', categoryKey: 'text', icon: KeyRound, accent: 'bg-teal-500/10 text-teal-500 ring-teal-500/20', slug: 'password-generator' },
  { id: 'unitConverter', categoryKey: 'calculators', icon: Ruler, accent: 'bg-orange-500/10 text-orange-500 ring-orange-500/20', slug: 'unit-converter' },
]

// Ana sayfadaki tanıtım bölümü: Google'a sitenin ne olduğunu anlatır
const aboutContent = {
  tr: {
    title: 'MyToolKit nedir?',
    text: 'MyToolKit, günlük işlerde işinize yarayan ücretsiz online araçları tek bir yerde toplar. Yüzde, kâr zarar ve indirim hesaplayabilir, metninizin kelime ve karakter sayısını öğrenebilir, yazma hızınızı ölçebilir, dünya saatlerine bakabilir ve resim formatlarını dönüştürebilirsiniz. Araçların hepsi tarayıcıda çalışır, kayıt veya kurulum gerektirmez.',
    featuresTitle: 'Neden MyToolKit?',
    features: [
      'Tamamen ücretsiz, üyelik gerektirmez',
      'Tarayıcıda çalışır, program kurmanız gerekmez',
      'Türkçe ve İngilizce dil desteği',
      'Telefon, tablet ve bilgisayarda kullanılabilir',
    ],
  },
  en: {
    title: 'What is MyToolKit?',
    text: 'MyToolKit brings together free online tools for everyday tasks in one place. You can calculate percentages, profit and loss and discounts, count the words and characters in your text, test your typing speed, check the world clock and convert image formats. All tools run in your browser and need no sign-up or installation.',
    featuresTitle: 'Why MyToolKit?',
    features: [
      'Completely free, no account required',
      'Runs in your browser, nothing to install',
      'Available in Turkish and English',
      'Works on phone, tablet and computer',
    ],
  },
} as const

export function ToolHubDashboard({
  dict,
  currentLang,
  onLangChange,
}: {
  dict: any
  currentLang: 'tr' | 'en'
  onLangChange: (lang: 'tr' | 'en') => void
}) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all')
  const [dark, setDark] = useState(false)
  const about = aboutContent[currentLang]

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && document.documentElement.classList.contains('dark'))) {
      setDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, [])

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

  function toggleLanguage() {
    const newLang = currentLang === 'tr' ? 'en' : 'tr'
    if (dark) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
    onLangChange(newLang);
  }

  const filteredTools = useMemo(() => {
    // Arama dilini aktif arayüz diline göre ayarlıyoruz. 'tr-TR' sabit kullanılırsa
    // İngilizce arayüzde büyük "I" harfi yanlışlıkla "ı" (noktasız i) olarak küçültülür
    // ve İngilizce aramalar hatalı sonuç verebilir.
    const localeCode = currentLang === 'tr' ? 'tr-TR' : 'en-US'
    const normalizedQuery = query.toLocaleLowerCase(localeCode)
    return baseTools.filter((tool) => {
      const matchesCategory = activeCategory === 'all' || tool.categoryKey === activeCategory;
      const translatedTitle = dict.tools[tool.id]?.title || '';
      const translatedDesc = dict.tools[tool.id]?.description || '';
      const translatedCategory = dict.categories[tool.categoryKey] || '';
      
      const matchesQuery = `${translatedTitle} ${translatedDesc} ${translatedCategory}`.toLocaleLowerCase(localeCode).includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query, dict, currentLang])

  return (
    <main className="min-h-screen bg-zinc-100 dark:bg-background text-foreground transition-colors">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-border/60 pb-6">
          <Link href={`/${currentLang}`} className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black shadow-sm font-bold text-sm tracking-tighter">
              MT
            </div>
            <span className="text-base font-semibold tracking-tight">MyToolKit</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="relative hidden w-64 sm:block">
              <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label={dict.dashboard.searchPlaceholder}
                className="h-9 border-border/70 bg-muted/30 pl-9 text-sm placeholder:text-muted-foreground/70"
                onChange={(event) => setQuery(event.target.value)}
                placeholder={dict.dashboard.searchPlaceholder}
                value={query}
              />
            </div>
            <Button
              onClick={toggleLanguage}
              size="icon"
              variant="outline"
              className="font-bold text-xs"
              aria-label={currentLang === 'tr' ? 'Switch to English' : "Türkçe'ye geç"}
            >
              {currentLang === 'tr' ? 'EN' : 'TR'}
            </Button>
            <Button aria-label={dark ? dict.dashboard.themeLight : dict.dashboard.themeDark} onClick={toggleTheme} size="icon" variant="outline">
              {dark ? <Sun data-icon="inline-start" /> : <Moon data-icon="inline-start" />}
            </Button>
          </div>
        </header>

        <section className="flex flex-1 flex-col py-14 sm:py-20">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">{dict.dashboard.subtitle}</p>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{dict.dashboard.title1}<br /><span className="text-muted-foreground">{dict.dashboard.title2}</span></h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">{dict.dashboard.description}</p>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-b border-border/60 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <nav aria-label={currentLang === 'tr' ? 'Araç kategorileri' : 'Tool categories'} className="flex flex-wrap gap-2">
              {categoryKeys.map((catKey) => (
                <Button
                  className="rounded-full px-4"
                  key={catKey}
                  onClick={() => setActiveCategory(catKey)}
                  size="sm"
                  variant={activeCategory === catKey ? 'default' : 'outline'}
                >
                  {dict.categories[catKey]}
                </Button>
              ))}
            </nav>
            <div className="relative w-full sm:hidden">
              <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input aria-label={dict.dashboard.searchPlaceholder} className="pl-9" onChange={(event) => setQuery(event.target.value)} placeholder={dict.dashboard.searchPlaceholder} value={query} />
            </div>
            <span className="text-xs text-muted-foreground">{filteredTools.length} {dict.dashboard.toolsCount}</span>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => {
              const Icon = tool.icon
              const toolRoute = `/${currentLang}/tools/${tool.slug}`
              return (
                <Card className="group relative flex min-h-[300px] flex-col border-border/70 bg-card/60 transition-all duration-300 hover:-translate-y-1 hover:border-border hover:bg-card hover:shadow-2xl hover:shadow-black/10" key={tool.id}>
                  <CardHeader className="gap-6">
                    <div className="flex items-start justify-between">
                      <div className={`flex size-11 items-center justify-center rounded-xl ring-1 ${tool.accent}`}>
                        <Icon aria-hidden="true" className="size-5" />
                      </div>
                      <ArrowUpRight aria-hidden="true" className="size-4 text-muted-foreground/50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </div>
                    <div className="space-y-2">
                      <Badge className="rounded-md font-normal" variant="secondary">{dict.categories[tool.categoryKey]}</Badge>
                      {/* Başlık gerçek bir link: Google araç adını bağlantı metni olarak görür.
                          after:absolute after:inset-0 tüm kartı tıklanabilir yapar. */}
                      <h2 className="text-lg font-medium tracking-tight">
                        <Link href={toolRoute} className="after:absolute after:inset-0">
                          {dict.tools[tool.id]?.title}
                        </Link>
                      </h2>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm leading-6 text-muted-foreground">{dict.tools[tool.id]?.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={toolRoute} className="w-full" tabIndex={-1} aria-hidden="true">
                      <Button
                        className="w-full justify-between pointer-events-none"
                        variant="outline"
                        tabIndex={-1}
                      >
                        {dict.dashboard.useButton}
                        <ArrowUpRight data-icon="inline-end" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              )
            })}
          </div>

          {filteredTools.length === 0 && (
            <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground">
              {dict.dashboard.notFound}
            </div>
          )}

          {/* Tanıtım bölümü: sitenin ne olduğunu ve neden kullanılacağını anlatır */}
          <div className="mt-20 grid gap-10 border-t border-border/60 pt-12 md:grid-cols-2">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight">{about.title}</h2>
              <p className="text-sm leading-7 text-muted-foreground">{about.text}</p>
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight">{about.featuresTitle}</h2>
              <ul className="list-disc space-y-1.5 pl-5 text-sm leading-7 text-muted-foreground">
                {about.features.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default ToolHubDashboard
