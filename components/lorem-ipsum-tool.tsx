'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AlignLeft, Copy, Check, RefreshCw } from 'lucide-react'

const t = {
  tr: {
    title: 'Lorem Ipsum Üretici',
    subtitle: 'MyToolKit Metin Aracı',
    type: 'Tür',
    count: 'Adet',
    paragraphs: 'Paragraf',
    sentences: 'Cümle',
    words: 'Kelime',
    generate: 'Üret',
    copy: 'Kopyala',
    copied: 'Kopyalandı!',
    startWithLorem: '"Lorem ipsum..." ile başlat',
  },
  en: {
    title: 'Lorem Ipsum Generator',
    subtitle: 'MyToolKit Text Suite',
    type: 'Type',
    count: 'Count',
    paragraphs: 'Paragraphs',
    sentences: 'Sentences',
    words: 'Words',
    generate: 'Generate',
    copy: 'Copy',
    copied: 'Copied!',
    startWithLorem: 'Start with "Lorem ipsum..."',
  },
  es: {
    title: 'Generador de Lorem Ipsum',
    subtitle: 'Herramienta de Texto MyToolKit',
    type: 'Tipo',
    count: 'Cantidad',
    paragraphs: 'Párrafos',
    sentences: 'Oraciones',
    words: 'Palabras',
    generate: 'Generar',
    copy: 'Copiar',
    copied: '¡Copiado!',
    startWithLorem: 'Empezar con "Lorem ipsum..."',
  },
} as const

type Lang = keyof typeof t

const WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'perspiciatis', 'unde',
  'omnis', 'iste', 'natus', 'error', 'voluptatem', 'accusantium', 'doloremque',
  'laudantium', 'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo',
  'inventore', 'veritatis', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta',
]

function randomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function generateWords(count: number): string {
  return Array.from({ length: count }, randomWord).join(' ')
}

function generateSentences(count: number): string {
  return Array.from({ length: count }, () => {
    const len = Math.floor(Math.random() * 10) + 6
    return capitalize(generateWords(len)) + '.'
  }).join(' ')
}

function generateParagraphs(count: number): string {
  return Array.from({ length: count }, () => {
    const sentenceCount = Math.floor(Math.random() * 4) + 3
    return generateSentences(sentenceCount)
  }).join('\n\n')
}

const LOREM_START = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

export default function LoremIpsumTool({ lang }: { lang: string }) {
  const currentLang: Lang = (lang === 'en' || lang === 'es' || lang === 'tr') ? lang : 'tr'
  const texts = t[currentLang]

  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs')
  const [count, setCount] = useState(3)
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    let result = ''
    if (type === 'paragraphs') result = generateParagraphs(count)
    else if (type === 'sentences') result = generateSentences(count)
    else result = generateWords(count)

    if (startWithLorem) {
      if (type === 'paragraphs') {
        const paras = result.split('\n\n')
        paras[0] = LOREM_START + ' ' + paras[0]
        result = paras.join('\n\n')
      } else if (type === 'sentences') {
        result = LOREM_START + ' ' + result
      } else {
        result = 'lorem ipsum dolor sit amet ' + result
      }
    }
    setOutput(result)
    setCopied(false)
  }

  const handleCopy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-slate-500/10 text-slate-400 ring-1 ring-slate-400/20">
          <AlignLeft className="size-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">{texts.title}</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{texts.subtitle}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Tür + Adet */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">{texts.type}</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as typeof type)}
              className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm"
            >
              <option value="paragraphs">{texts.paragraphs}</option>
              <option value="sentences">{texts.sentences}</option>
              <option value="words">{texts.words}</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">{texts.count}</label>
            <Input
              type="number"
              min={1}
              max={type === 'words' ? 500 : type === 'sentences' ? 50 : 10}
              value={count}
              onChange={(e) => setCount(Math.max(1, Number(e.target.value)))}
              className="h-9 text-sm font-mono"
            />
          </div>
        </div>

        {/* Lorem ile başlat */}
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={startWithLorem}
            onChange={(e) => setStartWithLorem(e.target.checked)}
            className="rounded accent-slate-500"
          />
          {texts.startWithLorem}
        </label>

        {/* Üret butonu */}
        <Button onClick={handleGenerate} className="w-full">
          <RefreshCw className="size-4 mr-2" /> {texts.generate}
        </Button>

        {/* Çıktı */}
        {output && (
          <div className="relative">
            <div className="rounded-xl border border-border bg-muted/40 p-4 pr-12 max-h-64 overflow-y-auto">
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">{output}</p>
            </div>
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
      </CardContent>
    </Card>
  )
}