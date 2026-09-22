'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Type, Copy, Check, Trash2 } from 'lucide-react'

const t = {
  tr: {
    title: 'Büyük / Küçük Harf Dönüştürücü',
    subtitle: 'MyToolKit Metin Aracı',
    placeholder: 'Metninizi buraya yazın veya yapıştırın...',
    clear: 'Temizle',
    copy: 'Kopyala',
    copied: 'Kopyalandı!',
    modes: [
      { key: 'upper', label: 'BÜYÜK HARF' },
      { key: 'lower', label: 'küçük harf' },
      { key: 'title', label: 'Başlık Formatı' },
      { key: 'sentence', label: 'Cümle formatı' },
      { key: 'alternate', label: 'DöNüŞüMlÜ' },
      { key: 'reverse', label: 'fretsreT' },
    ],
  },
  en: {
    title: 'Case Converter',
    subtitle: 'MyToolKit Text Suite',
    placeholder: 'Type or paste your text here...',
    clear: 'Clear',
    copy: 'Copy',
    copied: 'Copied!',
    modes: [
      { key: 'upper', label: 'UPPER CASE' },
      { key: 'lower', label: 'lower case' },
      { key: 'title', label: 'Title Case' },
      { key: 'sentence', label: 'Sentence case' },
      { key: 'alternate', label: 'aLtErNaTe' },
      { key: 'reverse', label: 'esreveR' },
    ],
  },
  es: {
    title: 'Convertidor de Mayúsculas/Minúsculas',
    subtitle: 'Herramienta de Texto MyToolKit',
    placeholder: 'Escribe o pega tu texto aquí...',
    clear: 'Limpiar',
    copy: 'Copiar',
    copied: '¡Copiado!',
    modes: [
      { key: 'upper', label: 'MAYÚSCULAS' },
      { key: 'lower', label: 'minúsculas' },
      { key: 'title', label: 'Formato Título' },
      { key: 'sentence', label: 'Formato oración' },
      { key: 'alternate', label: 'AlTeRnAdO' },
      { key: 'reverse', label: 'odartseveR' },
    ],
  },
} as const

type Lang = keyof typeof t
type ModeKey = 'upper' | 'lower' | 'title' | 'sentence' | 'alternate' | 'reverse'

function convert(text: string, mode: ModeKey): string {
  switch (mode) {
    case 'upper': return text.toUpperCase()
    case 'lower': return text.toLowerCase()
    case 'title': return text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    case 'sentence': return text
      .split(/([.!?]\s+)/)
      .map((part, i) => i % 2 === 0 ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() : part)
      .join('')
    case 'alternate': return [...text].map((c, i) => i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join('')
    case 'reverse': return [...text].reverse().join('')
    default: return text
  }
}

export default function CaseConverterTool({ lang }: { lang: string }) {
  const currentLang: Lang = (lang === 'en' || lang === 'es' || lang === 'tr') ? lang : 'tr'
  const texts = t[currentLang]

  const [input, setInput] = useState('')
  const [activeMode, setActiveMode] = useState<ModeKey>('upper')
  const [copied, setCopied] = useState(false)

  const output = input ? convert(input, activeMode) : ''

  const handleCopy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500 ring-1 ring-yellow-500/20">
          <Type className="size-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">{texts.title}</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{texts.subtitle}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Mod seçici */}
        <div className="flex flex-wrap gap-2">
          {texts.modes.map((mode) => (
            <Button
              key={mode.key}
              size="sm"
              variant={activeMode === mode.key ? 'default' : 'outline'}
              onClick={() => setActiveMode(mode.key as ModeKey)}
              className="rounded-full text-xs px-3"
            >
              {mode.label}
            </Button>
          ))}
        </div>

        {/* Giriş — native textarea */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={texts.placeholder}
          rows={5}
          className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm font-mono shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />

        {/* Çıktı */}
        {output && (
          <div className="relative rounded-xl border border-border bg-muted/40 p-4">
            <p className="text-sm font-mono whitespace-pre-wrap break-words leading-relaxed pr-10">
              {output}
            </p>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleCopy}
              className="absolute top-2 right-2 h-8 w-8"
            >
              {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
            </Button>
          </div>
        )}

        {/* Aksiyonlar */}
        <div className="flex gap-2">
          <Button
            onClick={() => setInput('')}
            variant="outline"
            className="flex-1 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
          >
            <Trash2 className="size-4 mr-1" /> {texts.clear}
          </Button>
          <Button onClick={handleCopy} disabled={!output} className="flex-1">
            {copied
              ? <><Check className="size-4 mr-1" />{texts.copied}</>
              : <><Copy className="size-4 mr-1" />{texts.copy}</>
            }
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}