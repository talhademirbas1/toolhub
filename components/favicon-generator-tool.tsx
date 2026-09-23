"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/i18n.config";

const uiText: Record<
  Locale,
  {
    dropLabel: string;
    formats: string;
    uploadButton: string;
    generating: string;
    downloadAll: string;
    downloadSingle: string;
    changeImage: string;
    note: string;
  }
> = {
  tr: {
    dropLabel: "Görseli buraya sürükleyin veya tıklayın",
    formats: "PNG, JPG, WEBP desteklenir (kare görsel önerilir)",
    uploadButton: "Görsel Yükle",
    generating: "Favicon boyutları oluşturuluyor...",
    downloadAll: "Tümünü İndir",
    downloadSingle: "İndir",
    changeImage: "Görseli Değiştir",
    note: "Modern tarayıcılar ve cihazlar için PNG formatında 5 farklı boyut üretilir (16x16, 32x32, 180x180 Apple Touch Icon, 192x192 ve 512x512 Android/PWA ikonu).",
  },
  en: {
    dropLabel: "Drag an image here or click to upload",
    formats: "PNG, JPG, WEBP supported (a square image is recommended)",
    uploadButton: "Upload Image",
    generating: "Generating favicon sizes...",
    downloadAll: "Download All",
    downloadSingle: "Download",
    changeImage: "Change Image",
    note: "Generates 5 PNG sizes for modern browsers and devices (16x16, 32x32, 180x180 Apple Touch Icon, and 192x192 / 512x512 Android/PWA icons).",
  },
  es: {
    dropLabel: "Arrastra una imagen aquí o haz clic para subirla",
    formats: "Compatible con PNG, JPG, WEBP (se recomienda una imagen cuadrada)",
    uploadButton: "Subir Imagen",
    generating: "Generando tamaños de favicon...",
    downloadAll: "Descargar Todo",
    downloadSingle: "Descargar",
    changeImage: "Cambiar Imagen",
    note: "Genera 5 tamaños PNG para navegadores y dispositivos modernos (16x16, 32x32, 180x180 Apple Touch Icon, y 192x192 / 512x512 para Android/PWA).",
  },
};

const SIZES = [16, 32, 180, 192, 512];

function sizeLabel(size: number) {
  if (size === 180) return "apple-touch-icon";
  if (size === 192) return "android-chrome-192x192";
  if (size === 512) return "android-chrome-512x512";
  return `favicon-${size}x${size}`;
}

export default function FaviconGeneratorTool({ lang }: { lang: Locale }) {
  const t = uiText[lang];
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [generated, setGenerated] = useState<{ size: number; url: string }[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setSourceImage(dataUrl);
      generateFavicons(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  function generateFavicons(dataUrl: string) {
    setIsGenerating(true);
    const img = new Image();
    img.onload = () => {
      const results: { size: number; url: string }[] = [];
      SIZES.forEach((size) => {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const scale = Math.max(size / img.width, size / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        const x = (size - w) / 2;
        const y = (size - h) / 2;
        ctx.drawImage(img, x, y, w, h);

        results.push({ size, url: canvas.toDataURL("image/png") });
      });
      setGenerated(results);
      setIsGenerating(false);
    };
    img.src = dataUrl;
  }

  function downloadOne(size: number, url: string) {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${sizeLabel(size)}.png`;
    a.click();
  }

  function downloadAll() {
    generated.forEach((item, idx) => {
      setTimeout(() => downloadOne(item.size, item.url), idx * 200);
    });
  }

  function reset() {
    setSourceImage(null);
    setGenerated([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-10 space-y-6">
      {!sourceImage ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) handleFile(file);
          }}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl py-16 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
        >
          <p className="font-medium text-center">{t.dropLabel}</p>
          <p className="text-sm text-zinc-500">{t.formats}</p>
          <button
            type="button"
            className="mt-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium px-5 py-2 hover:opacity-90 transition-opacity"
          >
            {t.uploadButton}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>
      ) : (
        <div className="space-y-6">
          {isGenerating ? (
            <p className="text-center text-zinc-500">{t.generating}</p>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {generated.map((item) => (
                  <div
                    key={item.size}
                    className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 flex flex-col items-center gap-2"
                  >
                    <img
                      src={item.url}
                      alt={sizeLabel(item.size)}
                      className="w-12 h-12 object-contain"
                    />
                    <span className="text-xs text-zinc-500 text-center break-all">
                      {item.size}x{item.size}
                    </span>
                    <button
                      onClick={() => downloadOne(item.size, item.url)}
                      className="text-xs rounded-md border border-zinc-300 dark:border-zinc-700 px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors w-full"
                    >
                      {t.downloadSingle}
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={downloadAll}
                  className="rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium px-6 py-2.5 hover:opacity-90 transition-opacity"
                >
                  {t.downloadAll}
                </button>
                <button
                  onClick={reset}
                  className="rounded-lg border border-zinc-300 dark:border-zinc-700 px-6 py-2.5 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  {t.changeImage}
                </button>
              </div>
            </>
          )}

          <p className="text-xs text-zinc-500 text-center">{t.note}</p>
        </div>
      )}
    </div>
  );
}
