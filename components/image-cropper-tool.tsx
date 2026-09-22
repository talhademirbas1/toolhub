'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Scissors, Upload, Download, X, RotateCcw } from 'lucide-react'

const t = {
  tr: {
    title: 'Resim Kırpıcı',
    subtitle: 'MyToolKit Görsel Aracı',
    uploadBtn: 'Resim Yükle',
    dragText: 'Resmi buraya sürükleyin veya tıklayın',
    supportedFormats: 'PNG, JPG, WEBP desteklenir',
    downloadBtn: 'Kırpıp İndir',
    resetBtn: 'Yeni Resim',
    resetCrop: 'Sıfırla',
    errorType: 'Sadece PNG, JPG veya WEBP desteklenir.',
    errorSize: 'Dosya 20 MB\'dan küçük olmalıdır.',
    width: 'Genişlik (px)',
    height: 'Yükseklik (px)',
    x: 'Sol (X)',
    y: 'Üst (Y)',
    preview: 'Önizleme',
    format: 'Format',
    quality: 'Kalite',
    cropInfo: 'Kırpma alanını manuel olarak girin veya önizlemede sürükleyin.',
  },
  en: {
    title: 'Image Cropper',
    subtitle: 'MyToolKit Visual Suite',
    uploadBtn: 'Upload Image',
    dragText: 'Drag image here or click',
    supportedFormats: 'PNG, JPG, WEBP supported',
    downloadBtn: 'Crop & Download',
    resetBtn: 'New Image',
    resetCrop: 'Reset',
    errorType: 'Only PNG, JPG or WEBP files are supported.',
    errorSize: 'File must be smaller than 20 MB.',
    width: 'Width (px)',
    height: 'Height (px)',
    x: 'Left (X)',
    y: 'Top (Y)',
    preview: 'Preview',
    format: 'Format',
    quality: 'Quality',
    cropInfo: 'Enter crop area manually or drag in the preview.',
  },
  es: {
    title: 'Recortador de Imágenes',
    subtitle: 'Herramienta Visual MyToolKit',
    uploadBtn: 'Subir Imagen',
    dragText: 'Arrastra la imagen aquí o haz clic',
    supportedFormats: 'Se admiten PNG, JPG, WEBP',
    downloadBtn: 'Recortar y Descargar',
    resetBtn: 'Nueva Imagen',
    resetCrop: 'Reiniciar',
    errorType: 'Solo se admiten PNG, JPG o WEBP.',
    errorSize: 'El archivo debe ser menor de 20 MB.',
    width: 'Ancho (px)',
    height: 'Alto (px)',
    x: 'Izquierda (X)',
    y: 'Superior (Y)',
    preview: 'Vista previa',
    format: 'Formato',
    quality: 'Calidad',
    cropInfo: 'Introduce el área de recorte manualmente o arrastra en la vista previa.',
  },
} as const

type Lang = keyof typeof t

interface CropState { x: number; y: number; w: number; h: number }

export default function ImageCropperTool({ lang }: { lang: string }) {
  const currentLang: Lang = (lang === 'en' || lang === 'es' || lang === 'tr') ? lang : 'tr'
  const texts = t[currentLang]

  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imageDims, setImageDims] = useState({ w: 0, h: 0 })
  const [crop, setCrop] = useState<CropState>({ x: 0, y: 0, w: 0, h: 0 })
  const [format, setFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/png')
  const [quality, setQuality] = useState(92)
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [isDraggingCrop, setIsDraggingCrop] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const inputRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<File | null>(null)

  const handleFile = useCallback((file: File) => {
    setError('')
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      setError(texts.errorType); return
    }
    if (file.size > 20 * 1024 * 1024) {
      setError(texts.errorSize); return
    }
    fileRef.current = file
    const url = URL.createObjectURL(file)
    setImageUrl(url)
    const img = new Image()
    img.onload = () => {
      setImageDims({ w: img.width, h: img.height })
      setCrop({ x: 0, y: 0, w: img.width, h: img.height })
    }
    img.src = url
  }, [texts])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false)
    const file = e.dataTransfer.files[0]; if (file) handleFile(file)
  }

  // Önizleme üzerinde sürükleyerek kırpma
  const getScaleFactor = () => {
    if (!imageRef.current || !imageDims.w) return 1
    return imageDims.w / imageRef.current.clientWidth
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    const scale = getScaleFactor()
    const x = Math.round((e.clientX - rect.left) * scale)
    const y = Math.round((e.clientY - rect.top) * scale)
    setDragStart({ x, y })
    setIsDraggingCrop(true)
    setCrop({ x, y, w: 0, h: 0 })
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingCrop || !imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    const scale = getScaleFactor()
    const cx = Math.round((e.clientX - rect.left) * scale)
    const cy = Math.round((e.clientY - rect.top) * scale)
    setCrop({
      x: Math.max(0, Math.min(dragStart.x, cx)),
      y: Math.max(0, Math.min(dragStart.y, cy)),
      w: Math.abs(cx - dragStart.x),
      h: Math.abs(cy - dragStart.y),
    })
  }, [isDraggingCrop, dragStart])

  const handleMouseUp = useCallback(() => setIsDraggingCrop(false), [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  const handleDownload = () => {
    if (!fileRef.current || !imageDims.w) return
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const cropW = Math.max(1, Math.min(crop.w, imageDims.w - crop.x))
      const cropH = Math.max(1, Math.min(crop.h, imageDims.h - crop.y))
      canvas.width = cropW
      canvas.height = cropH
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, crop.x, crop.y, cropW, cropH, 0, 0, cropW, cropH)
      const ext = format === 'image/png' ? 'png' : format === 'image/jpeg' ? 'jpg' : 'webp'
      canvas.toBlob((blob) => {
        if (!blob) return
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = `cropped.${ext}`
        a.click()
      }, format, quality / 100)
    }
    img.src = URL.createObjectURL(fileRef.current)
  }

  const handleReset = () => {
    setImageUrl(null); setImageDims({ w: 0, h: 0 })
    setCrop({ x: 0, y: 0, w: 0, h: 0 }); setError('')
    fileRef.current = null
    if (inputRef.current) inputRef.current.value = ''
  }

  // Önizleme üzerindeki kırpma kutusunun göreceli konumu
  const cropBoxStyle = (): React.CSSProperties => {
    if (!imageRef.current || !imageDims.w) return { display: 'none' }
    const scale = imageRef.current.clientWidth / imageDims.w
    return {
      position: 'absolute',
      left: crop.x * scale,
      top: crop.y * scale,
      width: crop.w * scale,
      height: crop.h * scale,
      border: '2px solid #a855f7',
      background: 'rgba(168,85,247,0.1)',
      pointerEvents: 'none',
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 ring-1 ring-rose-400/20">
          <Scissors className="size-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">{texts.title}</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{texts.subtitle}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {!imageUrl ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 cursor-pointer transition-colors
              ${isDragging ? 'border-rose-400 bg-rose-500/10' : 'border-border hover:border-rose-400/60 hover:bg-muted/40'}`}
          >
            <Upload className="size-8 text-muted-foreground" />
            <p className="text-sm font-medium">{texts.dragText}</p>
            <p className="text-xs text-muted-foreground">{texts.supportedFormats}</p>
            <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}>{texts.uploadBtn}</Button>
          </div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground text-center">{texts.cropInfo}</p>
            {/* Önizleme + sürükle kırp */}
            <div ref={containerRef} className="relative select-none cursor-crosshair rounded-xl overflow-hidden border border-border" onMouseDown={handleMouseDown}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img ref={imageRef} src={imageUrl} alt="crop preview" className="w-full object-contain max-h-72 pointer-events-none" draggable={false} />
              <div style={cropBoxStyle()} />
            </div>

            {/* Manuel giriş */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: texts.x, key: 'x' as const, max: imageDims.w },
                { label: texts.y, key: 'y' as const, max: imageDims.h },
                { label: texts.width, key: 'w' as const, max: imageDims.w },
                { label: texts.height, key: 'h' as const, max: imageDims.h },
              ].map(({ label, key, max }) => (
                <div key={key} className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">{label}</label>
                  <Input
                    type="number" min={0} max={max}
                    value={crop[key]}
                    onChange={(e) => setCrop(prev => ({ ...prev, [key]: Math.max(0, Math.min(Number(e.target.value), max)) }))}
                    className="h-8 text-sm font-mono"
                  />
                </div>
              ))}
            </div>

            {/* Format + Kalite */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">{texts.format}</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as typeof format)}
                  className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm"
                >
                  <option value="image/png">PNG</option>
                  <option value="image/jpeg">JPG</option>
                  <option value="image/webp">WEBP</option>
                </select>
              </div>
              {format !== 'image/png' && (
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">{texts.quality}: {quality}%</label>
                  <input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-rose-500" />
                </div>
              )}
            </div>
          </>
        )}

        <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />

        {error && <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-lg text-center">{error}</div>}

        {imageUrl && (
          <div className="flex gap-2">
            <Button onClick={handleReset} variant="outline" className="flex-1">
              <X className="size-4 mr-1" /> {texts.resetBtn}
            </Button>
            <Button onClick={() => setCrop({ x: 0, y: 0, w: imageDims.w, h: imageDims.h })} variant="ghost" size="icon">
              <RotateCcw className="size-4" />
            </Button>
            <Button onClick={handleDownload} disabled={crop.w < 1 || crop.h < 1} className="flex-1">
              <Download className="size-4 mr-1" /> {texts.downloadBtn}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}