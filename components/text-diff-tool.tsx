'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GitCompare, RotateCcw } from 'lucide-react'

const t = {
  tr: {
    title: 'Metin Karşılaştırıcı',
    subtitle: 'MyToolKit Metin Aracı',
    original: 'Orijinal Metin',
    modified: 'Değiştirilmiş Metin',
    originalPlaceholder: 'Orijinal metni buraya yapıştırın...',
    modifiedPlaceholder: 'Değiştirilmiş metni buraya yapıştırın...',
    compare: 'Karşılaştır',
    reset: 'Sıfırla',
    result: 'Karşılaştırma Sonucu',
    added: 'Eklenen',
    removed: 'Silinen',
    unchanged: 'Değişmeyen',
    noChanges: 'İki metin aynı, fark bulunamadı.',
    linesAdded: 'satır eklendi',
    linesRemoved: 'satır silindi',
    linesUnchanged: 'satır aynı',
  },
  en: {
    title: 'Text Comparator',
    subtitle: 'MyToolKit Text Suite',
    original: 'Original Text',
    modified: 'Modified Text',
    originalPlaceholder: 'Paste your original text here...',
    modifiedPlaceholder: 'Paste your modified text here...',
    compare: 'Compare',
    reset: 'Reset',
    result: 'Comparison Result',
    added: 'Added',
    removed: 'Removed',
    unchanged: 'Unchanged',
    noChanges: 'Both texts are the same, no differences found.',
    linesAdded: 'lines added',
    linesRemoved: 'lines removed',
    linesUnchanged: 'lines unchanged',
  },
  es: {
    title: 'Comparador de Textos',
    subtitle: 'Herramienta de Texto MyToolKit',
    original: 'Texto Original',
    modified: 'Texto Modificado',
    originalPlaceholder: 'Pega tu texto original aquí...',
    modifiedPlaceholder: 'Pega tu texto modificado aquí...',
    compare: 'Comparar',
    reset: 'Reiniciar',
    result: 'Resultado de la Comparación',
    added: 'Añadido',
    removed: 'Eliminado',
    unchanged: 'Sin cambios',
    noChanges: 'Ambos textos son iguales, no se encontraron diferencias.',
    linesAdded: 'líneas añadidas',
    linesRemoved: 'líneas eliminadas',
    linesUnchanged: 'líneas sin cambios',
  },
} as const

type Lang = keyof typeof t

type DiffLine =
  | { type: 'added'; text: string }
  | { type: 'removed'; text: string }
  | { type: 'unchanged'; text: string }

// Basit LCS tabanlı satır diff algoritması
function diffLines(a: string, b: string): DiffLine[] {
  const linesA = a.split('\n')
  const linesB = b.split('\n')
  const m = linesA.length
  const n = linesB.length

  // LCS dp tablosu
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (linesA[i - 1] === linesB[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  // Geri izle
  const result: DiffLine[] = []
  let i = m, j = n
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && linesA[i - 1] === linesB[j - 1]) {
      result.unshift({ type: 'unchanged', text: linesA[i - 1] })
      i--; j--
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: 'added', text: linesB[j - 1] })
      j--
    } else {
      result.unshift({ type: 'removed', text: linesA[i - 1] })
      i--
    }
  }
  return result
}

export default function TextDiffTool({ lang }: { lang: string }) {
  const currentLang: Lang = (lang === 'en' || lang === 'es' || lang === 'tr') ? lang : 'tr'
  const texts = t[currentLang]

  const [original, setOriginal] = useState('')
  const [modified, setModified] = useState('')
  const [diff, setDiff] = useState<DiffLine[] | null>(null)

  const handleCompare = () => {
    setDiff(diffLines(original, modified))
  }

  const handleReset = () => {
    setOriginal('')
    setModified('')
    setDiff(null)
  }

  const stats = diff ? {
    added: diff.filter((d) => d.type === 'added').length,
    removed: diff.filter((d) => d.type === 'removed').length,
    unchanged: diff.filter((d) => d.type === 'unchanged').length,
  } : null

  const noChanges = diff && stats?.added === 0 && stats?.removed === 0

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-lime-500/10 text-lime-500 ring-1 ring-lime-500/20">
          <GitCompare className="size-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">{texts.title}</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{texts.subtitle}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* İki metin alanı */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">{texts.original}</label>
            <textarea
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              placeholder={texts.originalPlaceholder}
              rows={8}
              className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm font-mono shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">{texts.modified}</label>
            <textarea
              value={modified}
              onChange={(e) => setModified(e.target.value)}
              placeholder={texts.modifiedPlaceholder}
              rows={8}
              className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm font-mono shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </div>

        {/* Butonlar */}
        <div className="flex gap-2">
          <Button onClick={handleReset} variant="outline" size="icon">
            <RotateCcw className="size-4" />
          </Button>
          <Button onClick={handleCompare} className="flex-1">
            <GitCompare className="size-4 mr-2" /> {texts.compare}
          </Button>
        </div>

        {/* Sonuç */}
        {diff && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{texts.result}</p>
              {stats && !noChanges && (
                <div className="flex gap-3 text-xs">
                  <span className="text-green-600 dark:text-green-400">+{stats.added} {texts.linesAdded}</span>
                  <span className="text-red-500">-{stats.removed} {texts.linesRemoved}</span>
                  <span className="text-muted-foreground">{stats.unchanged} {texts.linesUnchanged}</span>
                </div>
              )}
            </div>

            {noChanges ? (
              <div className="p-4 rounded-xl border border-border bg-muted/30 text-sm text-center text-muted-foreground">
                {texts.noChanges}
              </div>
            ) : (
              <div className="rounded-xl border border-border overflow-hidden">
                {/* Legand */}
                <div className="flex gap-4 px-4 py-2 border-b border-border bg-muted/30 text-xs">
                  <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm bg-green-500/20 border border-green-500/40" />{texts.added}</span>
                  <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm bg-red-500/20 border border-red-500/40" />{texts.removed}</span>
                  <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm bg-muted border border-border" />{texts.unchanged}</span>
                </div>

                {/* Diff satırları */}
                <div className="max-h-96 overflow-y-auto">
                  {diff.map((line, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-3 px-4 py-1 font-mono text-sm border-b border-border/40 last:border-0
                        ${line.type === 'added' ? 'bg-green-500/10 text-green-700 dark:text-green-400' : ''}
                        ${line.type === 'removed' ? 'bg-red-500/10 text-red-600 dark:text-red-400 line-through' : ''}
                        ${line.type === 'unchanged' ? 'text-muted-foreground' : ''}
                      `}
                    >
                      <span className="select-none w-4 shrink-0 text-xs pt-0.5">
                        {line.type === 'added' ? '+' : line.type === 'removed' ? '−' : ' '}
                      </span>
                      <span className="break-all whitespace-pre-wrap">{line.text || ' '}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}