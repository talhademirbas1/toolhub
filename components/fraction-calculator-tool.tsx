"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Divide } from "lucide-react";

interface FractionCalculatorToolProps {
  lang: string;
}

const t = {
  tr: {
    title: "Kesir Hesaplama",
    subtitle: "MyToolKit Matematik Aracı",
    calcBtn: "Hesapla",
    resetBtn: "Sıfırla",
    result: "Sonuç",
    decimal: "Ondalık Değer",
    errInvalid: "Lütfen tüm alanları geçerli sayılarla doldurun.",
    errZero: "Payda sıfır olamaz.",
  },
  en: {
    title: "Fraction Calculator",
    subtitle: "MyToolKit Math Suite",
    calcBtn: "Calculate",
    resetBtn: "Reset",
    result: "Result",
    decimal: "Decimal Value",
    errInvalid: "Please fill all fields with valid numbers.",
    errZero: "Denominator cannot be zero.",
  },
  es: {
    title: "Calculadora de Fracciones",
    subtitle: "Herramienta MyToolKit",
    calcBtn: "Calcular",
    resetBtn: "Reiniciar",
    result: "Resultado",
    decimal: "Valor Decimal",
    errInvalid: "Completa todos los campos con números válidos.",
    errZero: "El denominador no puede ser cero.",
  },
} as const;

const ops = ["+", "-", "×", "÷"] as const;

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  return b === 0 ? a : gcd(b, a % b);
}

export default function FractionCalculatorTool({ lang }: FractionCalculatorToolProps) {
  const currentLang = lang === "es" || lang === "en" || lang === "tr" ? lang : "tr";
  const texts = t[currentLang];

  const [n1, setN1] = useState("1");
  const [d1, setD1] = useState("2");
  const [op, setOp] = useState<(typeof ops)[number]>("+");
  const [n2, setN2] = useState("1");
  const [d2, setD2] = useState("3");
  const [result, setResult] = useState<{ n: number; d: number; decimal: number } | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    setError("");
    const a = parseInt(n1, 10);
    const b = parseInt(d1, 10);
    const c = parseInt(n2, 10);
    const d = parseInt(d2, 10);

    if ([a, b, c, d].some((v) => isNaN(v))) {
      setError(texts.errInvalid);
      setResult(null);
      return;
    }
    if (b === 0 || d === 0) {
      setError(texts.errZero);
      setResult(null);
      return;
    }

    let resN = 0;
    let resD = 1;
    if (op === "+") {
      resN = a * d + c * b;
      resD = b * d;
    } else if (op === "-") {
      resN = a * d - c * b;
      resD = b * d;
    } else if (op === "×") {
      resN = a * c;
      resD = b * d;
    } else {
      resN = a * d;
      resD = b * c;
    }

    if (resD === 0) {
      setError(texts.errZero);
      setResult(null);
      return;
    }

    const divisor = gcd(resN, resD) || 1;
    let simpN = resN / divisor;
    let simpD = resD / divisor;
    if (simpD < 0) {
      simpN = -simpN;
      simpD = -simpD;
    }

    setResult({ n: simpN, d: simpD, decimal: simpN / simpD });
  };

  const handleReset = () => {
    setN1("1");
    setD1("2");
    setN2("1");
    setD2("3");
    setOp("+");
    setResult(null);
    setError("");
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500 ring-1 ring-sky-500/20">
          <Divide className="size-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">{texts.title}</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{texts.subtitle}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center justify-center gap-3">
          <div className="flex flex-col items-center gap-1">
            <Input value={n1} onChange={(e) => setN1(e.target.value)} className="w-16 text-center font-mono" inputMode="numeric" />
            <div className="w-16 border-t border-foreground" />
            <Input value={d1} onChange={(e) => setD1(e.target.value)} className="w-16 text-center font-mono" inputMode="numeric" />
          </div>

          <select
            value={op}
            onChange={(e) => setOp(e.target.value as (typeof ops)[number])}
            className="h-9 rounded-md border border-input bg-transparent px-2 text-lg font-bold shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {ops.map((o) => (
              <option key={o} value={o} className="bg-background text-foreground">
                {o}
              </option>
            ))}
          </select>

          <div className="flex flex-col items-center gap-1">
            <Input value={n2} onChange={(e) => setN2(e.target.value)} className="w-16 text-center font-mono" inputMode="numeric" />
            <div className="w-16 border-t border-foreground" />
            <Input value={d2} onChange={(e) => setD2(e.target.value)} className="w-16 text-center font-mono" inputMode="numeric" />
          </div>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={handleCalculate} className="flex-1 font-semibold">
            {texts.calcBtn}
          </Button>
          <Button onClick={handleReset} variant="outline" className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10">
            {texts.resetBtn}
          </Button>
        </div>

        {result && (
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-4 bg-muted/50 rounded-xl border border-border/50">
              <div className="text-xs text-muted-foreground mb-2">{texts.result}</div>
              <div className="text-2xl font-bold font-mono text-sky-500">
                {result.d === 1 ? result.n : `${result.n}/${result.d}`}
              </div>
            </div>
            <div className="p-4 bg-muted/50 rounded-xl border border-border/50">
              <div className="text-xs text-muted-foreground mb-2">{texts.decimal}</div>
              <div className="text-2xl font-bold font-mono">{Number(result.decimal.toFixed(6))}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
