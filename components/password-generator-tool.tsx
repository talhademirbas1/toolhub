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

export default function PasswordGeneratorTool({ lang }: PasswordGeneratorToolProps) {
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

    if (score <= 1) return { label: lang === "tr" ? "Zayıf" : "Weak", color: "bg-rose-500", width: "25%" };
    if (score <= 3) return { label: lang === "tr" ? "Orta" : "Medium", color: "bg-amber-500", width: "60%" };
    return { label: lang === "tr" ? "Güçlü" : "Strong", color: "bg-emerald-500", width: "100%" };
  };

  const strength = getStrength();

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-500 ring-1 ring-teal-500/20">
          <KeyRound className="size-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">
            {lang === "tr" ? "Şifre Oluşturucu" : "Password Generator"}
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            {lang === "tr" ? "MyToolKit Güvenlik Aracı" : "MyToolKit Security Suite"}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-muted p-4 rounded-lg border border-border/50 flex items-center justify-between gap-2">
          <span className="font-mono text-sm break-all">
            {password || (lang === "tr" ? "Şifre oluşturmak için butona basın" : "Click the button to generate a password")}
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
            <label className="font-medium text-muted-foreground">
              {lang === "tr" ? "Uzunluk" : "Length"}
            </label>
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
            {lang === "tr" ? "Büyük Harf (A-Z)" : "Uppercase (A-Z)"}
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} className="accent-teal-500" />
            {lang === "tr" ? "Küçük Harf (a-z)" : "Lowercase (a-z)"}
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} className="accent-teal-500" />
            {lang === "tr" ? "Sayılar (0-9)" : "Numbers (0-9)"}
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} className="accent-teal-500" />
            {lang === "tr" ? "Semboller (!@#)" : "Symbols (!@#)"}
          </label>
        </div>

        <Button onClick={generatePassword} className="w-full gap-2 font-semibold">
          <RefreshCw className="size-4" />
          {lang === "tr" ? "Şifre Oluştur" : "Generate Password"}
        </Button>
      </CardContent>
    </Card>
  );
}
