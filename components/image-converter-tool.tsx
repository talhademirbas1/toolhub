"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Download, Upload } from "lucide-react";

interface ImageConverterToolProps {
  lang: string;
}

export default function ImageConverterTool({ lang }: ImageConverterToolProps) {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [format, setFormat] = useState<"image/png" | "image/jpeg" | "image/webp">("image/jpeg");
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name.substring(0, file.name.lastIndexOf('.')) || file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
      setConvertedUrl(null);
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
        
        const dataUrl = canvas.toDataURL(format, 0.9);
        setConvertedUrl(dataUrl);
      }
      setIsProcessing(false);
    };
  };

  const getExtension = () => {
    if (format === "image/png") return "png";
    if (format === "image/jpeg") return "jpg";
    return "webp";
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 ring-1 ring-sky-400/20">
          <ImageIcon className="size-6" />
        </div>
        <CardTitle className="text-xl font-bold">
          {lang === "tr" ? "Görsel Format Dönüştürücü" : "Image Format Converter"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer relative bg-muted/30">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <Upload className="size-8 text-muted-foreground mb-2" />
          <p className="text-sm font-medium">
            {lang === "tr" ? "Görsel yüklemek için tıklayın veya sürükleyin" : "Click or drag to upload an image"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP</p>
        </div>

        {image && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-muted p-3 rounded-lg">
              <span className="text-xs font-medium truncate max-w-[200px]">{fileName}</span>
              <div className="flex items-center gap-2">
                <label className="text-xs text-muted-foreground">{lang === "tr" ? "Hedef Format:" : "Target Format:"}</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as any)}
                  className="h-8 rounded-md border border-input bg-background px-2 text-xs font-medium"
                >
                  <option value="image/jpeg">JPG</option>
                  <option value="image/png">PNG</option>
                  <option value="image/webp">WEBP</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleConvert} disabled={isProcessing} className="flex-1">
                {isProcessing ? (lang === "tr" ? "Dönüştürülüyor..." : "Converting...") : (lang === "tr" ? "Dönüştür" : "Convert")}
              </Button>
            </div>
          </div>
        )}

        {convertedUrl && (
          <div className="mt-4 p-4 bg-muted/60 rounded-xl text-center space-y-3 border border-border/60">
            <p className="text-xs font-medium text-emerald-500">
              {lang === "tr" ? "Dönüştürme Başarılı!" : "Conversion Successful!"}
            </p>
            <div className="flex justify-center">
              <img src={convertedUrl} alt="Converted" className="max-h-40 rounded-lg shadow-sm object-contain" />
            </div>
            <a
              href={convertedUrl}
              download={`${fileName}-converted.${getExtension()}`}
              className="inline-flex w-full"
            >
              <Button variant="default" className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                <Download className="size-4" />
                {lang === "tr" ? "Görseli İndir" : "Download Image"}
              </Button>
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}