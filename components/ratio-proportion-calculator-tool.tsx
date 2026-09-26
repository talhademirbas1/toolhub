"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRightLeft } from "lucide-react";

interface RatioProportionToolProps {
  lang: string;
}

const t = {
  tr: {
    title: "Oran-Orantı Hesaplama",
    subtitle: "MyToolKit Matematik Aracı",
    unknownLabel: "Bilinmeyen Değer",
    calcBtn: "Hesapla",
    resetBtn: "Sıfırla",
    resultPrefix: "Bilinmeyen değer (x) =",
    errInvalid: "Lütfen bilinmeyen dışındaki alanları geçerli sayılarla doldurun.",
    errZero: "Sıfıra bölme yapılamaz, ilgili alanları kontrol edin.",
  },
  en: {
    title: "Ratio-Proportion Calculator",
    subtitle: "MyToolKit Math Suite",
    unknownLabel: "Unknown Value",
    calcBtn: "Calculate",
    resetBtn: "Reset",
    resultPrefix: "Unknown value (x) =",
    errInvalid: "Please fill the non-unknown fields with valid numbers.",
    errZero: "Division by zero, please check the fields.",
  },
  es: {
    title: "Calculadora de Razón y Proporción",
    subtitle: "Herramienta MyToolKit",
    unknownLabel: "Valor Desconocido",
    calcBtn: "Calcular",
    resetBtn: "Reiniciar",
    resultPrefix: "Valor desconocido (x) =",
    errInvalid: "Completa los campos que no son la incógnita con números válidos.",
    errZero: "No se puede dividir entre cero, revisa los campos.",
  },
} as const;

type FieldKey = "a" | "b" | "c" | "d";

export default function RatioProportionCalculatorTool({ lang }: RatioProportionToolProps) {
  const currentLang = lang === "es" || lang === "en" || lang === "tr" ? lang : "tr";
  const texts = t[currentLang];

  const [values, setValues] = useState<Record<FieldKey, string>>({ a: "2", b: "5", c: "8", d: "" });
  const [unknown, setUnknown] = useState<FieldKey>("d");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleChange = (key: FieldKey, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleUnknownChange = (key: FieldKey) => {
    setUnknown(key);
    setValues((prev) => ({ ...prev, [key]: "" }));
    setResult(null);
  };

  const handleCalculate = () => {
    setError("");
    const nums: Record<FieldKey, number> = { a: NaN, b: NaN, c: NaN, d: NaN };
    (Object.keys(values) as FieldKey[]).forEach((k) => {
      if (k !== unknown) nums[k] = parseFloat(values[k]);
    });

    if ((Object.keys(nums) as FieldKey[]).some((k) => k !== unknown && isNaN(nums[k]))) {
      setError(texts.errInvalid);
      setResult(null);
      return;
    }

    // a/b = c/d  ->  a*d = b*c
    let x: number;
    try {
      if (unknown === "a") {
        if (nums.d === 0) throw new Error();
        x = (nums.b * nums.c) / nums.d;
      } else if (unknown === "b") {
        if (nums.c === 0) throw new Error();
        x = (nums.a * nums.d) / nums.c;
      } else if (unknown === "c") {
        if (nums.b === 0) throw new Error();
        x = (nums.a * nums.d) / nums.b;
      } else {
        if (nums.a === 0) throw new Error();
        x = (nums.b * nums.c) / nums.a;
      }
    } catch {
      setError(texts.errZero);
      setResult(null);
      return;
    }

    if (!isFinite(x)) {
      setError(texts.errZero);
      setResult(null);
      return;
    }

    setResult(Number(x.toFixed(6)));
    setValues((prev) => ({ ...prev, [unknown]: String(Number(x.toFixed(6))) }));
  };

  const handleReset = () => {
    setValues({ a: "2", b: "5", c: "8", d: "" });
    setUnknown("d");
    setResult(null);
    setError("");
  };

  const fieldBox = (key: FieldKey) => (
    <Input
      value={values[key]}
      onChange={(e) => handleChange(key, e.target.value)}
      placeholder={unknown === key ? "x" : ""}
      disabled={unknown === key}
      className="w-20 text-center font-mono"
      inputMode="decimal"
    />
  );

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20">
          <ArrowRightLeft className="size-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">{texts.title}</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{texts.subtitle}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {fieldBox("a")}
          <span className="text-lg font-bold text-muted-foreground">/</span>
          {fieldBox("b")}
          <span className="text-lg font-bold text-muted-foreground px-1">=</span>
          {fieldBox("c")}
          <span className="text-lg font-bold text-muted-foreground">/</span>
          {fieldBox("d")}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">{texts.unknownLabel}</label>
          <div className="grid grid-cols-4 gap-2">
            {(["a", "b", "c", "d"] as FieldKey[]).map((k) => (
              <Button
                key={k}
                size="sm"
                variant={unknown === k ? "default" : "outline"}
                onClick={() => handleUnknownChange(k)}
                className="font-mono"
              >
                {k}
              </Button>
            ))}
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

        {result !== null && (
          <div className="p-4 bg-muted/50 rounded-xl border border-border/50 text-center">
            <div className="text-xs text-muted-foreground mb-2">{texts.resultPrefix}</div>
            <div className="text-3xl font-bold font-mono text-amber-500">{result}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
