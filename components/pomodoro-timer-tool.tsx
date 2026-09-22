'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Timer, Play, Pause, RotateCcw, SkipForward } from 'lucide-react'

const t = {
  tr: {
    title: 'Pomodoro Zamanlayıcı',
    subtitle: 'MyToolKit Zaman Aracı',
    work: 'Çalışma',
    shortBreak: 'Kısa Mola',
    longBreak: 'Uzun Mola',
    start: 'Başlat',
    pause: 'Duraklat',
    reset: 'Sıfırla',
    skip: 'Geç',
    session: 'Oturum',
    settings: 'Süreler (dakika)',
    workDuration: 'Çalışma',
    shortBreakDuration: 'Kısa Mola',
    longBreakDuration: 'Uzun Mola',
    longBreakAfter: 'Uzun mola aralığı',
    notifications: 'Bildirimler',
    notifEnabled: 'Açık',
    notifDisabled: 'Kapalı',
    notifWork: '🍅 Mola zamanı!',
    notifBreak: '💪 Çalışma zamanı!',
    notifBody: 'MyToolKit Pomodoro',
  },
  en: {
    title: 'Pomodoro Timer',
    subtitle: 'MyToolKit Time Suite',
    work: 'Work',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
    start: 'Start',
    pause: 'Pause',
    reset: 'Reset',
    skip: 'Skip',
    session: 'Session',
    settings: 'Durations (minutes)',
    workDuration: 'Work',
    shortBreakDuration: 'Short Break',
    longBreakDuration: 'Long Break',
    longBreakAfter: 'Long break every',
    notifications: 'Notifications',
    notifEnabled: 'On',
    notifDisabled: 'Off',
    notifWork: '🍅 Time for a break!',
    notifBreak: '💪 Time to work!',
    notifBody: 'MyToolKit Pomodoro',
  },
  es: {
    title: 'Temporizador Pomodoro',
    subtitle: 'Herramienta de Tiempo MyToolKit',
    work: 'Trabajo',
    shortBreak: 'Descanso Corto',
    longBreak: 'Descanso Largo',
    start: 'Iniciar',
    pause: 'Pausar',
    reset: 'Reiniciar',
    skip: 'Saltar',
    session: 'Sesión',
    settings: 'Duraciones (minutos)',
    workDuration: 'Trabajo',
    shortBreakDuration: 'Descanso Corto',
    longBreakDuration: 'Descanso Largo',
    longBreakAfter: 'Descanso largo cada',
    notifications: 'Notificaciones',
    notifEnabled: 'Activado',
    notifDisabled: 'Desactivado',
    notifWork: '🍅 ¡Hora de descansar!',
    notifBreak: '💪 ¡Hora de trabajar!',
    notifBody: 'MyToolKit Pomodoro',
  },
} as const

type Lang = keyof typeof t
type Phase = 'work' | 'shortBreak' | 'longBreak'

const PHASE_COLORS: Record<Phase, string> = {
  work: 'text-red-500',
  shortBreak: 'text-emerald-500',
  longBreak: 'text-blue-500',
}

const PHASE_RING: Record<Phase, string> = {
  work: 'stroke-red-500',
  shortBreak: 'stroke-emerald-500',
  longBreak: 'stroke-blue-500',
}

const PHASE_BG: Record<Phase, string> = {
  work: 'bg-red-500/10 ring-red-500/20 text-red-500',
  shortBreak: 'bg-emerald-500/10 ring-emerald-500/20 text-emerald-500',
  longBreak: 'bg-blue-500/10 ring-blue-500/20 text-blue-500',
}

export default function PomodoroTimerTool({ lang }: { lang: string }) {
  const currentLang: Lang = (lang === 'en' || lang === 'es' || lang === 'tr') ? lang : 'tr'
  const texts = t[currentLang]

  const [settings, setSettings] = useState({ work: 25, shortBreak: 5, longBreak: 15, longBreakAfter: 4 })
  const [phase, setPhase] = useState<Phase>('work')
  const [timeLeft, setTimeLeft] = useState(settings.work * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [session, setSession] = useState(1)
  const [notifAllowed, setNotifAllowed] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const phaseDuration = useCallback((p: Phase) => {
    if (p === 'work') return settings.work * 60
    if (p === 'shortBreak') return settings.shortBreak * 60
    return settings.longBreak * 60
  }, [settings])

  const notify = useCallback((title: string) => {
    if (notifAllowed && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body: texts.notifBody, icon: '/favicon.ico' })
    }
  }, [notifAllowed, texts])

  const nextPhase = useCallback(() => {
    setIsRunning(false)
    setPhase((prev) => {
      if (prev === 'work') {
        const newSession = session + 1
        setSession(newSession)
        if ((newSession - 1) % settings.longBreakAfter === 0) {
          notify(texts.notifWork)
          setTimeLeft(settings.longBreak * 60)
          return 'longBreak'
        }
        notify(texts.notifWork)
        setTimeLeft(settings.shortBreak * 60)
        return 'shortBreak'
      } else {
        notify(texts.notifBreak)
        setTimeLeft(settings.work * 60)
        return 'work'
      }
    })
  }, [session, settings, notify, texts])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) { clearInterval(intervalRef.current!); nextPhase(); return 0 }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isRunning, nextPhase])

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(phaseDuration(phase))
  }

  const handleSkip = () => nextPhase()

  const handleNotifToggle = async () => {
    if (!notifAllowed) {
      if ('Notification' in window) {
        const perm = await Notification.requestPermission()
        if (perm === 'granted') setNotifAllowed(true)
      }
    } else {
      setNotifAllowed(false)
    }
  }

  const updateSetting = (key: keyof typeof settings, val: number) => {
    const newSettings = { ...settings, [key]: val }
    setSettings(newSettings)
    setIsRunning(false)
    if (key !== 'longBreakAfter') {
      const map: Record<string, Phase> = { work: 'work', shortBreak: 'shortBreak', longBreak: 'longBreak' }
      if (map[key] === phase) setTimeLeft(val * 60)
    }
  }

  const total = phaseDuration(phase)
  const progress = total > 0 ? (timeLeft / total) : 1
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const secs = String(timeLeft % 60).padStart(2, '0')

  // SVG dairesel progress
  const R = 80
  const CIRC = 2 * Math.PI * R

  const phaseLabel = phase === 'work' ? texts.work : phase === 'shortBreak' ? texts.shortBreak : texts.longBreak

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader className="text-center space-y-3">
        <div className={`mx-auto flex size-12 items-center justify-center rounded-xl ring-1 ${PHASE_BG[phase]}`}>
          <Timer className="size-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">{texts.title}</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{texts.subtitle}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Faz seçici */}
        <div className="flex gap-2 rounded-xl bg-muted/40 p-1">
          {(['work', 'shortBreak', 'longBreak'] as Phase[]).map((p) => (
            <button
              key={p}
              onClick={() => { setPhase(p); setIsRunning(false); setTimeLeft(phaseDuration(p)) }}
              className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition-colors
                ${phase === p ? `${PHASE_COLORS[p]} bg-background shadow-sm` : 'text-muted-foreground hover:text-foreground'}`}
            >
              {p === 'work' ? texts.work : p === 'shortBreak' ? texts.shortBreak : texts.longBreak}
            </button>
          ))}
        </div>

        {/* Timer dairesi */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative flex items-center justify-center">
            <svg width="200" height="200" className="-rotate-90">
              <circle cx="100" cy="100" r={R} fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
              <circle
                cx="100" cy="100" r={R} fill="none" strokeWidth="8"
                strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - progress)}
                strokeLinecap="round"
                className={`transition-all duration-1000 ${PHASE_RING[phase]}`}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className={`text-4xl font-mono font-bold tabular-nums ${PHASE_COLORS[phase]}`}>{mins}:{secs}</span>
              <span className="text-xs text-muted-foreground mt-1">{phaseLabel}</span>
              <span className="text-xs text-muted-foreground">{texts.session} {session}</span>
            </div>
          </div>

          {/* Kontroller */}
          <div className="flex gap-3 mt-2">
            <Button onClick={handleReset} variant="outline" size="icon"><RotateCcw className="size-4" /></Button>
            <Button onClick={() => setIsRunning(r => !r)} size="lg" className={`px-8 ${isRunning ? '' : ''}`}>
              {isRunning ? <><Pause className="size-4 mr-2" />{texts.pause}</> : <><Play className="size-4 mr-2" />{texts.start}</>}
            </Button>
            <Button onClick={handleSkip} variant="outline" size="icon"><SkipForward className="size-4" /></Button>
          </div>
        </div>

        {/* Ayarlar */}
        <div className="space-y-3 rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-medium text-muted-foreground">{texts.settings}</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: texts.workDuration, key: 'work' as const, min: 1, max: 90 },
              { label: texts.shortBreakDuration, key: 'shortBreak' as const, min: 1, max: 30 },
              { label: texts.longBreakDuration, key: 'longBreak' as const, min: 1, max: 60 },
              { label: texts.longBreakAfter, key: 'longBreakAfter' as const, min: 1, max: 10 },
            ].map(({ label, key, min, max }) => (
              <div key={key} className="space-y-1">
                <label className="text-xs text-muted-foreground">{label}</label>
                <input
                  type="number" min={min} max={max} value={settings[key]}
                  onChange={(e) => updateSetting(key, Math.max(min, Math.min(max, Number(e.target.value))))}
                  className="w-full h-8 rounded-md border border-input bg-background px-2 text-sm font-mono"
                />
              </div>
            ))}
          </div>

          {/* Bildirim */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-muted-foreground">{texts.notifications}</span>
            <Button size="sm" variant={notifAllowed ? 'default' : 'outline'} onClick={handleNotifToggle} className="h-7 text-xs px-3">
              {notifAllowed ? texts.notifEnabled : texts.notifDisabled}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}