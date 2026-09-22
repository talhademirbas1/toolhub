'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Palette, Copy, Check, Plus, Trash2 } from 'lucide-react'

const t = {
  tr: {
    title: 'Renk Seçici ve Dönüştürücü',
    subtitle: 'MyToolKit Görsel Aracı',
    hex: 'HEX',
    rgb: 'RGB',
    hsl: 'HSL',
    copy: 'Kopyala',
    copied: 'Kopyalandı!',
    addPalette: 'Palete Ekle',
    palette: 'Renk Paleti',
    clearPalette: 'Paleti Temizle',
    preview: 'Önizleme',
    invalidHex: 'Geçersiz HEX renk kodu.',
    invalidRgb: 'Geçersiz RGB değerleri.',
    invalidHsl: 'Geçersiz HSL değerleri.',
  },
  en: {
    title: 'Color Picker and Converter',
    subtitle: 'MyToolKit Visual Suite',
    hex: 'HEX',
    rgb: 'RGB',
    hsl: 'HSL',
    copy: 'Copy',
    copied: 'Copied!',
    addPalette: 'Add to Palette',
    palette: 'Color Palette',
    clearPalette: 'Clear Palette',
    preview: 'Preview',
    invalidHex: 'Invalid HEX color code.',
    invalidRgb: 'Invalid RGB values.',
    invalidHsl: 'Invalid HSL values.',
  },
  es: {
    title: 'Selector y Conversor de Colores',
    subtitle: 'Herramienta Visual MyToolKit',
    hex: 'HEX',
    rgb: 'RGB',
    hsl: 'HSL',
    copy: 'Copiar',
    copied: '¡Copiado!',
    addPalette: 'Añadir a paleta',
    palette: 'Paleta de Colores',
    clearPalette: 'Limpiar paleta',
    preview: 'Vista previa',
    invalidHex: 'Código HEX inválido.',
    invalidRgb: 'Valores RGB inválidos.',
    invalidHsl: 'Valores HSL inválidos.',
  },
} as const

type Lang = keyof typeof t

// --- Dönüşüm yardımcıları ---
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '')
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  }
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rn = r / 255, gn = g / 255, bn = b / 255
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break
      case gn: h = ((bn - rn) / d + 2) / 6; break
      case bn: h = ((rn - gn) / d + 4) / 6; break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const sn = s / 100, ln = l / 100
  const k = (n: number) => (n + h / 30) % 12
  const a = sn * Math.min(ln, 1 - ln)
  const f = (n: number) => ln - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return { r: Math.round(f(0) * 255), g: Math.round(f(8) * 255), b: Math.round(f(4) * 255) }
}

export default function ColorPickerTool({ lang }: { lang: string }) {
  const currentLang: Lang = (lang === 'en' || lang === 'es' || lang === 'tr') ? lang : 'tr'
  const texts = t[currentLang]

  const [color, setColor] = useState('#6366f1')
  const [hexInput, setHexInput] = useState('#6366f1')
  const [rgbInput, setRgbInput] = useState({ r: '99', g: '102', b: '241' })
  const [hslInput, setHslInput] = useState({ h: '239', s: '84', l: '67' })
  const [palette, setPalette] = useState<string[]>([])
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState('')

  const applyColor = useCallback((hex: string) => {
    const rgb = hexToRgb(hex)
    if (!rgb) return
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    setColor(hex)
    setHexInput(hex)
    setRgbInput({ r: String(rgb.r), g: String(rgb.g), b: String(rgb.b) })
    setHslInput({ h: String(hsl.h), s: String(hsl.s), l: String(hsl.l) })
    setError('')
  }, [])

  const handlePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    applyColor(e.target.value)
  }

  const handleHexInput = (val: string) => {
    setHexInput(val)
    const hex = val.startsWith('#') ? val : '#' + val
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
      applyColor(hex)
    }
  }

  const handleRgbInput = (key: 'r' | 'g' | 'b', val: string) => {
    const next = { ...rgbInput, [key]: val }
    setRgbInput(next)
    const r = parseInt(next.r), g = parseInt(next.g), b = parseInt(next.b)
    if ([r, g, b].every((v) => !isNaN(v) && v >= 0 && v <= 255)) {
      applyColor(rgbToHex(r, g, b))
    }
  }

  const handleHslInput = (key: 'h' | 's' | 'l', val: string) => {
    const next = { ...hslInput, [key]: val }
    setHslInput(next)
    const h = parseInt(next.h), s = parseInt(next.s), l = parseInt(next.l)
    if (!isNaN(h) && h >= 0 && h <= 360 && !isNaN(s) && s >= 0 && s <= 100 && !isNaN(l) && l >= 0 && l <= 100) {
      const rgb = hslToRgb(h, s, l)
      applyColor(rgbToHex(rgb.r, rgb.g, rgb.b))
    }
  }

  const handleCopy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleAddPalette = () => {
    if (!palette.includes(color)) {
      setPalette((prev) => [...prev, color])
    }
  }

  const rgb = hexToRgb(color) ?? { r: 0, g: 0, b: 0 }
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

  const hexStr = color.toUpperCase()
  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400 ring-1 ring-pink-400/20">
          <Palette className="size-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">{texts.title}</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{texts.subtitle}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Renk seçici + önizleme */}
        <div className="flex gap-4 items-center">
          <div className="relative">
            <input
              type="color"
              value={color}
              onChange={handlePickerChange}
              className="sr-only"
              id="colorpicker"
            />
            <label
              htmlFor="colorpicker"
              className="block w-20 h-20 rounded-2xl cursor-pointer shadow-lg border-4 border-white dark:border-zinc-700 transition-transform hover:scale-105"
              style={{ backgroundColor: color }}
            />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-xs text-muted-foreground">{texts.preview}</p>
            <div className="h-8 rounded-lg w-full" style={{ background: `linear-gradient(to right, #000, ${color}, #fff)` }} />
            <div className="h-4 rounded-md w-full" style={{
              background: `linear-gradient(to right, 
                hsl(0,100%,50%), hsl(30,100%,50%), hsl(60,100%,50%), 
                hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), 
                hsl(300,100%,50%), hsl(360,100%,50%))`
            }} />
          </div>
        </div>

        {error && <p className="text-xs text-red-500 text-center">{error}</p>}

        {/* HEX */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">{texts.hex}</label>
          <div className="flex gap-2">
            <Input
              value={hexInput}
              onChange={(e) => handleHexInput(e.target.value)}
              className="font-mono text-sm uppercase"
              maxLength={7}
            />
            <Button size="icon" variant="outline" onClick={() => handleCopy(hexStr, 'hex')}>
              {copied === 'hex' ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
            </Button>
          </div>
        </div>

        {/* RGB */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">{texts.rgb}</label>
          <div className="flex gap-2">
            <div className="flex gap-1 flex-1">
              {(['r', 'g', 'b'] as const).map((ch) => (
                <Input
                  key={ch}
                  value={rgbInput[ch]}
                  onChange={(e) => handleRgbInput(ch, e.target.value)}
                  className="font-mono text-sm text-center px-1"
                  placeholder={ch.toUpperCase()}
                  type="number"
                  min={0}
                  max={255}
                />
              ))}
            </div>
            <Button size="icon" variant="outline" onClick={() => handleCopy(rgbStr, 'rgb')}>
              {copied === 'rgb' ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
            </Button>
          </div>
        </div>

        {/* HSL */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">{texts.hsl}</label>
          <div className="flex gap-2">
            <div className="flex gap-1 flex-1">
              {(['h', 's', 'l'] as const).map((ch) => (
                <Input
                  key={ch}
                  value={hslInput[ch]}
                  onChange={(e) => handleHslInput(ch, e.target.value)}
                  className="font-mono text-sm text-center px-1"
                  placeholder={ch.toUpperCase()}
                  type="number"
                  min={0}
                  max={ch === 'h' ? 360 : 100}
                />
              ))}
            </div>
            <Button size="icon" variant="outline" onClick={() => handleCopy(hslStr, 'hsl')}>
              {copied === 'hsl' ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
            </Button>
          </div>
        </div>

        {/* Palete ekle */}
        <Button onClick={handleAddPalette} variant="outline" className="w-full">
          <Plus className="size-4 mr-2" /> {texts.addPalette}
        </Button>

        {/* Palet */}
        {palette.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">{texts.palette}</p>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setPalette([])}
                className="h-6 text-xs text-rose-500 hover:text-rose-600 px-2"
              >
                <Trash2 className="size-3 mr-1" /> {texts.clearPalette}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {palette.map((c) => (
                <button
                  key={c}
                  onClick={() => applyColor(c)}
                  title={c.toUpperCase()}
                  className="w-8 h-8 rounded-lg border-2 border-white dark:border-zinc-700 shadow hover:scale-110 transition-transform"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}