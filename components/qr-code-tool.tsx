"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QrCode, Download } from "lucide-react";

interface QrCodeToolProps {
  lang: string;
}

const t = {
  tr: {
    title: "QR Kod Oluşturucu",
    subtitle: "MyToolKit Görsel Aracı",
    label: "Metin veya URL",
    placeholder: "https://ornek.com",
    generateBtn: "QR Kod Oluştur",
    downloadBtn: "İndir"
  },
  en: {
    title: "QR Code Generator",
    subtitle: "MyToolKit Visual Suite",
    label: "Text or URL",
    placeholder: "https://example.com",
    generateBtn: "Generate QR Code",
    downloadBtn: "Download"
  },
  es: {
    title: "Generador de Códigos QR",
    subtitle: "Herramienta Visual MyToolKit",
    label: "Texto o URL",
    placeholder: "https://ejemplo.com",
    generateBtn: "Generar Código QR",
    downloadBtn: "Descargar"
  }
} as const;

export default function QrCodeTool({ lang }: QrCodeToolProps) {
  const currentLang = (lang === "es" || lang === "en" || lang === "tr") ? lang : "tr";
  const texts = t[currentLang];

  const [text, setText] = useState("");
  const [size, setSize] = useState(300);
  const [qrUrl, setQrUrl] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!text.trim()) return;
    const encoded = encodeURIComponent(text.trim());
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}`);
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 ring-1 ring-indigo-500/20">
          <QrCode className="size-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">{texts.title}</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{texts.subtitle}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">{texts.label}</label>
          <Input
            placeholder={texts.placeholder}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-center gap-2">
          {[200, 300, 400].map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`px-3 py-1.5 rounded-md border text-xs font-medium transition-colors ${
                size === s ? "bg-indigo-500 text-white border-indigo-500" : "border-border hover:bg-muted"
              }`}
            >
              {s}x{s}
            </button>
          ))}
        </div>

        <Button onClick={handleGenerate} className="w-full font-semibold">
          {texts.generateBtn}
        </Button>

        {qrUrl && (
          <div className="flex flex-col items-center gap-4 pt-2 p-4 bg-muted/30 rounded-xl border border-border/50">
            <img src={qrUrl} alt="QR Code" className="rounded-lg border border-border/50 bg-white p-2" />
            <a href={qrUrl} download="qr-code.png" className="w-full">
              <Button variant="outline" className="w-full gap-2">
                <Download className="size-4" />
                {texts.downloadBtn}
              </Button>
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}