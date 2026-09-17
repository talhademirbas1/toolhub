"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Download, Upload, Settings2 } from "lucide-react";

interface ImageConverterToolProps {
  lang: string;
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export default function ImageConverterTool({ lang }: ImageConverterToolProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [convertedSize, setConvertedSize] = useState<number>(0);
  const [format, setFormat] = useState<"image/png" | "image/jpeg" | "image/webp" | "image/svg+xml">("image/webp");
  const [quality, setQuality] = useState<number>(85);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedImage = localStorage.getItem('ic_image');
      if (savedImage) setImage(savedImage);

      const savedFileName = localStorage.getItem('ic_fileName');
      if (savedFileName) setFileName(savedFileName);

      const savedOriginalSize = localStorage.getItem('ic_originalSize');
      if (savedOriginalSize) setOriginalSize(Number(savedOriginalSize));

      const savedConvertedUrl = localStorage.getItem('ic_convertedUrl');
      if (savedConvertedUrl) setConvertedUrl(savedConvertedUrl);

      const savedConvertedSize = localStorage.getItem('ic_convertedSize');
      if (savedConvertedSize) setConvertedSize(Number(savedConvertedSize));

      const savedFormat = localStorage.getItem('ic_format');
      if (savedFormat) setFormat(savedFormat as any);

      const savedQuality = localStorage.getItem('ic_quality');
      if (savedQuality) setQuality(Number(savedQuality));
    } catch (error) {
      console.warn("Storage okuma hatası.");
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        if (image) localStorage.setItem('ic_image', image);
        localStorage.setItem('ic_fileName', fileName);
        localStorage.setItem('ic_originalSize', String(originalSize));
        if (convertedUrl) localStorage.setItem('ic_convertedUrl', convertedUrl);
        localStorage.setItem('ic_convertedSize', String(convertedSize));
        localStorage.setItem('ic_format', format);
        localStorage.setItem('ic_quality', String(quality));
      } catch (error) {
        console.warn("Kayıt hatası.");
      }
    }
  }, [image, fileName, originalSize, convertedUrl, convertedSize, format, quality, isMounted]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalSize(file.size);
    setFileName(file.name.substring(0, file.name.lastIndexOf('.')) || file.name);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImage(result);
      setConvertedUrl(null);
      setConvertedSize(0);
      try {
        localStorage.setItem('ic_image', result);
        localStorage.removeItem('ic_convertedUrl');
      } catch (e) {}
    };
    reader.readAsDataURL(file);
  };

  const handleConvert = () => {
    if (!image) return;
    setIsProcessing(true);

    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      
      if (ctx) {
        if (format === "image/jpeg") {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);
        
        const targetFormat = format === "image/svg+xml" ? "image/png" : format;

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              setConvertedUrl(url);
              setConvertedSize(blob.size);
            }
            setIsProcessing(false);
          },
          targetFormat,
          quality / 100
        );
      } else {
        setIsProcessing(false);
      }
    };
  };

  const getExtension = () => {
    if (format === "image/png") return "png";
    if (format === "image/jpeg") return "jpg";
    if (format === "image/svg+xml") return "svg";
    return "webp";
  };

  const showQualitySlider = format === "image/jpeg" || format === "image/webp";

  if (!isMounted) return null;

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 ring-1 ring-sky-400/20">
          <ImageIcon className="size-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">
            {lang === "tr" ? "Görsel Dönüştürücü & Sıkıştırıcı" : "Image Converter & Compressor"}
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            {lang === "tr" ? "Limitsiz & Hızlı Format Dönüşümü" : "Unlimited & Fast Format Conversion"}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer relative bg-muted/30">
          <input
            type="file"
            accept="image/*,.svg"
            onChange={handleImageUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <Upload className="size-8 text-muted-foreground mb-2" />
          <p className="text-sm font-medium">
            {lang === "tr" ? "Görsel yüklemek için tıklayın veya sürükleyin" : "Click or drag to upload an image"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP, SVG</p>
        </div>

        {image && (
          <div className="space-y-4 bg-muted/30 p-4 rounded-xl border border-border/50">
            <div className="flex items-center justify-between pb-3 border-b border-border/50">
              <span className="text-sm font-medium truncate max-w-[200px]">{fileName}</span>
              <span className="text-xs font-semibold text-muted-foreground bg-background px-2 py-1 rounded-md border border-border">
                {formatBytes(originalSize)}
              </span>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between gap-4">
                <label className="text-sm font-medium text-muted-foreground">
                  {lang === "tr" ? "Hedef Format:" : "Target Format:"}
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as any)}
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm font-medium focus:ring-2 focus:ring-sky-500 outline-none"
                >
                  <option value="image/webp">
                    {lang === "tr" ? "WEBP (Önerilen)" : "WEBP (Recommended)"}
                  </option>
                  <option value="image/png">
                    {lang === "tr" ? "PNG (Şeffaf / Kayıpsız)" : "PNG (Transparent / Lossless)"}
                  </option>
                  <option value="image/jpeg">
                    {lang === "tr" ? "JPG (Standart Fotoğraf)" : "JPG (Standard Photo)"}
                  </option>
                  <option value="image/svg+xml">
                    {lang === "tr" ? "SVG (Vektör Çıkışı)" : "SVG (Vector Output)"}
                  </option>
                </select>
              </div>

              {showQualitySlider && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium flex items-center gap-1.5 text-muted-foreground">
                      <Settings2 className="size-4" />
                      {lang === "tr" ? "Sıkıştırma Kalitesi:" : "Compression Quality:"}
                    </span>
                    <span className="font-bold text-sky-500">%{quality}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    step="5"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                  <p className="text-[10px] text-muted-foreground text-right">
                    {lang === "tr" ? "Düşük kalite = Daha küçük dosya boyutu" : "Lower quality = Smaller file size"}
                  </p>
                </div>
              )}
            </div>

            <Button onClick={handleConvert} disabled={isProcessing} className="w-full mt-2 font-semibold">
              {isProcessing 
                ? (lang === "tr" ? "İşleniyor..." : "Processing...") 
                : (lang === "tr" ? "Dönüştür ve Sıkıştır" : "Convert & Compress")}
            </Button>
          </div>
        )}

        {convertedUrl && (
          <div className="mt-4 p-5 bg-emerald-500/10 rounded-xl text-center space-y-4 border border-emerald-500/20">
            <div className="flex items-center justify-center gap-3 text-sm">
              <span className="font-medium text-muted-foreground line-through decoration-emerald-500/50">
                {formatBytes(originalSize)}
              </span>
              <span className="text-emerald-500 font-bold text-lg">➔</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded-md">
                {formatBytes(convertedSize)}
              </span>
            </div>
            
            <div className="flex justify-center p-2 bg-background rounded-lg border border-border/50">
              <img src={convertedUrl} alt="Converted" className="max-h-48 rounded-md shadow-sm object-contain" />
            </div>
            
            <a
              href={convertedUrl}
              download={`${fileName}-converted.${getExtension()}`}
              className="inline-flex w-full"
            >
              <Button size="lg" className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5">
                <Download className="size-5" />
                {lang === "tr" ? "Yeni Görseli İndir" : "Download New Image"}
              </Button>
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}