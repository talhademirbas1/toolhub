"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Superscript } from "lucide-react";

interface ExponentRootToolProps {
  lang: string;
}

const t = {
  tr: {
    title: "Üslü-Köklü Sayı Hesaplama",
    subtitle: "MyToolKit Matematik Aracı",
    tabPower: "Üs Alma",
    tabRoot: "Kök Alma",
    base: "Taban",
    exponent: "Üs",
    radicand: "Sayı",
    degree: "Kök Derecesi (n)",
    calcBtn: "Hesapla",
    resetBtn: "Sıfırla",
    result: "Sonuç",
    errInvalid: "Lütfen geçerli sayılar girin.",
    errNegRoot: "Negatif sayının çift dereceden kökü alınamaz.",
    errZeroDegree: "Kök derecesi sıfır olamaz.",
  },
  en: {
    title: "Exponent-Root Calculator",
    subtitle: "MyToolKit Math Suite",
    tabPower: "Power",
    tabRoot: "Root",
    base: "Base",
    exponent: "Exponent",
    radicand: "Number",
    degree: "Root Degree (n)",
    calcBtn: "Calculate",
    resetBtn: "Reset",
    result: "Result",
    errInvalid: "Please enter valid numbers.",
    errNegRoot: "Cannot take an even-degree root of a negative number.",
    errZeroDegree: "Root degree cannot be zero.",
  },
  es: {
    title: "Calculadora de Potencias y Raíces",
    subtitle: "Herramienta MyToolKit",
    tabPower: "Potencia",
    tabRoot: "Raíz",
    base: "Base",
    exponent: "Exponente",
    radicand: "Número",
    degree: "Grado de la Raíz (n)",
    calcBtn: "Calcular",
    resetBtn: "Reiniciar",
    result: "Resultado",
    errInvalid: "Introduce números válidos.",
    errNegRoot: "No se puede calcular la raíz de grado par de un número negativo.",
    errZeroDegree: "El grado de la raíz no puede ser cero.",
  },
} as const;

export default function ExponentRootCalculatorTool({ lang }: ExponentRootToolProps) {
  const currentLang = lang === "es" || lang === "en" || lang === "tr" ? lang : "tr";
  const texts = t[currentLang];

  const [mode, setMode] = useState<"power" | "root">("power");
  const [base, setBase] = useState("2");
  const [exponent, setExponent] = useState("10");
  const [radicand, setRadicand] = useState("27");
  const [degree, setDegree] = useState("3");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    setError("");
    if (mode === "power") {
      const b = parseFloat(base);
      const e = parseFloat(exponent);
      if (isNaN(b) || isNaN(e)) {
        setError(texts.errInvalid);
        setResult(null);
        return;
      }
      const res = Math.pow(b, e);
      if (!isFinite(res)) {
        setError(texts.errInvalid);
        setResult(null);
        return;
      }
      setResult(Number(res.toPrecision(10)));
    } else {
      const r = parseFloat(radicand);
      const n = parseFloat(degree);
      if (isNaN(r) || isNaN(n)) {
        setError(texts.errInvalid);
        setResult(null);
        return;
      }
      if (n === 0) {
        setError(texts.errZeroDegree);
        setResult(null);
        return;
      }
      if (r < 0 && n % 2 === 0) {
        setError(texts.errNegRoot);
        setResult(null);
        return;
      }
      const sign = r < 0 ? -1 : 1;
      const res = sign * Math.pow(Math.abs(r), 1 / n);
      if (!isFinite(res)) {
        setError(texts.errInvalid);
        setResult(null);
        return;
      }
      setResult(Number(res.toPrecision(10)));
    }
  };

  const handleReset = () => {
    setBase("2");
    setExponent("10");
    setRadicand("27");
    setDegree("3");
    setResult(null);
    setError("");
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500 ring-1 ring-rose-500/20">
          <Superscript className="size-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">{texts.title}</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{texts.subtitle}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex rounded-md border border-border overflow-hidden">
          <button
            onClick={() => {
              setMode("power");
              setResult(null);
              setError("");
            }}
            className={`flex-1 py-2 text-sm font-medium ${mode === "power" ? "bg-rose-500 text-white" : "bg-transparent text-muted-foreground"}`}
          >
            {texts.tabPower}
          </button>
          <button
            onClick={() => {
              setMode("root");
              setResult(null);
              setError("");
            }}
            className={`flex-1 py-2 text-sm font-medium ${mode === "root" ? "bg-rose-500 text-white" : "bg-transparent text-muted-foreground"}`}
          >
            {texts.tabRoot}
          </button>
        </div>

        {mode === "power" ? (
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">{texts.base}</label>
              <Input value={base} onChange={(e) => setBase(e.target.value)} className="font-mono" inputMode="decimal" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">{texts.exponent}</label>
              <Input value={exponent} onChange={(e) => setExponent(e.target.value)} className="font-mono" inputMode="decimal" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">{texts.radicand}</label>
              <Input value={radicand} onChange={(e) => setRadicand(e.target.value)} className="font-mono" inputMode="decimal" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">{texts.degree}</label>
              <Input value={degree} onChange={(e) => setDegree(e.target.value)} className="font-mono" inputMode="decimal" />
            </div>
          </div>
        )}

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
            <div className="text-xs text-muted-foreground mb-2">{texts.result}</div>
            <div className="text-3xl font-bold font-mono text-rose-500 break-all">{result}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
