'use client'

import { useState, useRef, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eraser, Upload, Download, X, Loader2 } from 'lucide-react'

const t = {
  tr: {
    title: 'Arka Plan Silici',
    subtitle: 'MyToolKit Görsel Aracı',
    uploadBtn: 'Resim Yükle',
    dragText: 'Resmi buraya sürükleyin veya tıklayın',
    supportedFormats: 'PNG, JPG, WEBP desteklenir',
    processing: 'İşleniyor...',
    downloadBtn: 'İndir (PNG)',
    resetBtn: 'Yeni Resim',
    errorSize: 'Dosya 10 MB\'dan küçük olmalıdır.',
    errorType: 'Sadece PNG, JPG veya WEBP dosyaları desteklenir.',
    errorApi: 'İşlem sırasında hata oluştu. Lütfen tekrar deneyin.',
    original: 'Orijinal',
    result: 'Sonuç',
    hint: 'Sonuç şeffaf arka planlı PNG olarak indirilir.',
  },
  en: {
    title: 'Background Remover',
    subtitle: 'MyToolKit Visual Suite',
    uploadBtn: 'Upload Image',
    dragText: 'Drag image here or click',
    supportedFormats: 'PNG, JPG, WEBP supported',
    processing: 'Processing...',
    downloadBtn: 'Download (PNG)',
    resetBtn: 'New Image',
    errorSize: 'File must be smaller than 10 MB.',
    errorType: 'Only PNG, JPG or WEBP files are supported.',
    errorApi: 'An error occurred. Please try again.',
    original: 'Original',
    result: 'Result',
    hint: 'Result is downloaded as a transparent PNG.',
  },
  es: {
    title: 'Eliminador de Fondo',
    subtitle: 'Herramienta Visual MyToolKit',
    uploadBtn: 'Subir Imagen',
    dragText: 'Arrastra la imagen aquí o haz clic',
    supportedFormats: 'Se admiten PNG, JPG, WEBP',
    processing: 'Procesando...',
    downloadBtn: 'Descargar (PNG)',
    resetBtn: 'Nueva Imagen',
    errorSize: 'El archivo debe ser menor de 10 MB.',
    errorType: 'Solo se admiten archivos PNG, JPG o WEBP.',
    errorApi: 'Ocurrió un error. Por favor, inténtalo de nuevo.',
    original: 'Original',
    result: 'Resultado',
    hint: 'El resultado se descarga como PNG transparente.',
  },
} as const

type Lang = keyof typeof t

/* ------------------------------------------------------------------
   remove.bg ücretsiz API kullanır (50 çağrı/ay).
   Kullanıcı kendi API anahtarını .env dosyasına ekler:
   NEXT_PUBLIC_REMOVE_BG_API_KEY=your_key_here
   ------------------------------------------------------------------ */
async function removeBackground(file: File): Promise<Blob> {
  const apiKey = process.env.NEXT_PUBLIC_REMOVE_BG_API_KEY

  if (!apiKey) {
    // API anahtarı yoksa canvas ile basit beyaz arkaplan silme (demo)
    return await clientSideFallback(file)
  }

  const formData = new FormData()
  formData.append('image_file', file)
  formData.append('size', 'auto')

  const res = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: { 'X-Api-Key': apiKey },
    body: formData,
  })

  if (!res.ok) throw new Error('API error')
  return await res.blob()
}

// API anahtarı olmadan çalışan canvas tabanlı fallback
async function clientSideFallback(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      // Köşe rengi referans al (basit arka plan tahmini)
      const rRef = data[0], gRef = data[1], bRef = data[2]
      const threshold = 40

      for (let i = 0; i < data.length; i += 4) {
        const dr = Math.abs(data[i] - rRef)
        const dg = Math.abs(data[i + 1] - gRef)
        const db = Math.abs(data[i + 2] - bRef)
        if (dr < threshold && dg < threshold && db < threshold) {
          data[i + 3] = 0
        }
      }

      ctx.putImageData(imageData, 0, 0)
      URL.revokeObjectURL(url)
      canvas.toBlob((blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Canvas blob failed'))
      }, 'image/png')
    }
    img.onerror = reject
    img.src = url
  })
}

export default function BackgroundRemoverTool({ lang }: { lang: string }) {
  const currentLang: Lang = (lang === 'en' || lang === 'es' || lang === 'tr') ? lang : 'tr'
  const texts = t[currentLang]

  const [originalUrl, setOriginalUrl] = useState<string | null>(null)
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [resultBlob, setResultBlob] = useState<Blob | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(async (file: File) => {
    setError('')
    setResultUrl(null)
    setResultBlob(null)

    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      setError(texts.errorType)
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError(texts.errorSize)
      return
    }

    const objUrl = URL.createObjectURL(file)
    setOriginalUrl(objUrl)
    setLoading(true)

    try {
      const blob = await removeBackground(file)
      const resultObjUrl = URL.createObjectURL(blob)
      setResultUrl(resultObjUrl)
      setResultBlob(blob)
    } catch {
      setError(texts.errorApi)
    } finally {
      setLoading(false)
    }
  }, [texts])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleReset = () => {
    setOriginalUrl(null)
    setResultUrl(null)
    setResultBlob(null)
    setError('')
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleDownload = () => {
    if (!resultBlob) return
    const a = document.createElement('a')
    a.href = URL.createObjectURL(resultBlob)
    a.download = 'background-removed.png'
    a.click()
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 ring-1 ring-purple-400/20">
          <Eraser className="size-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">{texts.title}</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{texts.subtitle}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {!originalUrl ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 cursor-pointer transition-colors
              ${isDragging
                ? 'border-purple-400 bg-purple-500/10'
                : 'border-border hover:border-purple-400/60 hover:bg-muted/40'
              }`}
          >
            <Upload className="size-8 text-muted-foreground" />
            <p className="text-sm font-medium">{texts.dragText}</p>
            <p className="text-xs text-muted-foreground">{texts.supportedFormats}</p>
            <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}>
              {texts.uploadBtn}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-xs font-medium text-center text-muted-foreground">{texts.original}</p>
              <div className="rounded-xl overflow-hidden border border-border bg-muted/30 aspect-square flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={originalUrl} alt="original" className="object-contain w-full h-full" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-center text-muted-foreground">{texts.result}</p>
              <div
                className="rounded-xl overflow-hidden border border-border aspect-square flex items-center justify-center"
                style={{ background: 'repeating-conic-gradient(#80808020 0% 25%, transparent 0% 50%) 0 0 / 16px 16px' }}
              >
                {loading ? (
                  <Loader2 className="size-8 animate-spin text-muted-foreground" />
                ) : resultUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={resultUrl} alt="result" className="object-contain w-full h-full" />
                ) : null}
              </div>
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
        />

        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-lg text-center">{error}</div>
        )}

        {originalUrl && (
          <div className="flex gap-2">
            <Button onClick={handleReset} variant="outline" className="flex-1">
              <X className="size-4 mr-1" /> {texts.resetBtn}
            </Button>
            <Button
              onClick={handleDownload}
              disabled={!resultUrl || loading}
              className="flex-1"
            >
              <Download className="size-4 mr-1" /> {texts.downloadBtn}
            </Button>
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center">{texts.hint}</p>
      </CardContent>
    </Card>
  )
}