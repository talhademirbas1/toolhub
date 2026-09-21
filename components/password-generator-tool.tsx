"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KeyRound, Copy, RefreshCw, Check } from "lucide-react";

interface PasswordGeneratorToolProps {
  lang: string;
}

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

const t = {
  tr: {
    title: "Şifre Oluşturucu",
    subtitle: "MyToolKit Güvenlik Aracı",
    placeholder: "Şifre oluşturmak için butona basın",
    weak: "Zayıf",
    medium: "Orta",
    strong: "Güçlü",
    length: "Uzunluk",
    uppercase: "Büyük Harf (A-Z)",
    lowercase: "Küçük Harf (a-z)",
    numbers: "Sayılar (0-9)",
    symbols: "Semboller (!@#)",
    generateBtn: "Şifre Oluştur"
  },
  en: {
    title: "Password Generator",
    subtitle: "MyToolKit Security Suite",
    placeholder: "Click the button to generate a password",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    length: "Length",
    uppercase: "Uppercase (A-Z)",
    lowercase: "Lowercase (a-z)",
    numbers: "Numbers (0-9)",
    symbols: "Symbols (!@#)",
    generateBtn: "Generate Password"
  },
  es: {
    title: "Generador de Contraseñas",
    subtitle: "Herramienta de Seguridad MyToolKit",
    placeholder: "Haz clic en el botón para generar una contraseña",
    weak: "Débil",
    medium: "Medio",
    strong: "Fuerte",
    length: "Longitud",
    uppercase: "Mayúsculas (A-Z)",
    lowercase: "Minúsculas (a-z)",
    numbers: "Números (0-9)",
    symbols: "Símbolos (!@#)",
    generateBtn: "Generar Contraseña"
  }
} as const;

export default function PasswordGeneratorTool({ lang }: PasswordGeneratorToolProps) {
  const currentLang = (lang === "es" || lang === "en" || lang === "tr") ? lang : "tr";
  const texts = t[currentLang];

  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = "";
    if (useUpper) charset += UPPER;
    if (useLower) charset += LOWER;
    if (useNumbers) charset += NUMBERS;
    if (useSymbols) charset += SYMBOLS;

    if (!charset) {
      setPassword("");
      return;
    }

    let result = "";
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }
    setPassword(result);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.warn("Kopyalanamadı.");
    }
  };

  const getStrength = () => {
    let score = 0;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (useUpper && useLower) score++;
    if (useNumbers) score++;
    if (useSymbols) score++;

    if (score <= 1) return { label: texts.weak, color: "bg-rose-500", width: "25%" };
    if (score <= 3) return { label: texts.medium, color: "bg-amber-500", width: "60%" };
    return { label: texts.strong, color: "bg-emerald-500", width: "100%" };
  };

  const strength = getStrength();

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-500 ring-1 ring-teal-500/20">
          <KeyRound className="size-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">{texts.title}</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{texts.subtitle}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-muted p-4 rounded-lg border border-border/50 flex items-center justify-between gap-2">
          <span className="font-mono text-sm break-all">
            {password || texts.placeholder}
          </span>
          {password && (
            <Button size="icon" variant="ghost" onClick={handleCopy} className="shrink-0">
              {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
            </Button>
          )}
        </div>

        {password && (
          <div className="space-y-1">
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div className={`h-full ${strength.color} transition-all`} style={{ width: strength.width }} />
            </div>
            <p className="text-xs text-muted-foreground text-right">{strength.label}</p>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <label className="font-medium text-muted-foreground">{texts.length}</label>
            <span className="font-bold text-teal-500">{length}</span>
          </div>
          <input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-teal-500 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} className="accent-teal-500" />
            {texts.uppercase}
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} className="accent-teal-500" />
            {texts.lowercase}
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} className="accent-teal-500" />
            {texts.numbers}
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} className="accent-teal-500" />
            {texts.symbols}
          </label>
        </div>

        <Button onClick={generatePassword} className="w-full gap-2 font-semibold">
          <RefreshCw className="size-4" />
          {texts.generateBtn}
        </Button>
      </CardContent>
    </Card>
  );
}