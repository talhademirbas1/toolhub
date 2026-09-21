"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Percent } from "lucide-react";

interface ProfitLossCalculatorToolProps {
  lang: string;
}

const t = {
  tr: {
    title: "Yüzde & Kar/Zarar Hesaplayıcı",
    subtitle: "MyToolKit Finansal Araç",
    tabPercent: "Yüzde Hesapla",
    tabProfit: "Kar / Zarar",
    tabDiscount: "İndirim Oranı",
    calcBtn: "Hesapla",
    resetBtn: "Sıfırla",
    resultLabel: "Sonuç",
    errValid: "Lütfen geçerli sayılar girin.",
    percentLabels: { val1: "Sayı", val2: "Yüzde (%)" },
    profitLabels: { val1: "Maliyet Fiyatı", val2: "Satış Fiyatı" },
    discountLabels: { val1: "Orijinal Fiyat", val2: "İndirim Yüzdesi (%)" },
    profitText: "Kar",
    lossText: "Zarar",
    marginText: "oran",
    discountAmount: "İndirim Tutarı",
    finalPrice: "İndirimli Fiyat"
  },
  en: {
    title: "Percentage & Profit/Loss Calculator",
    subtitle: "MyToolKit Finance Suite",
    tabPercent: "Percentage",
    tabProfit: "Profit / Loss",
    tabDiscount: "Discount",
    calcBtn: "Calculate",
    resetBtn: "Reset",
    resultLabel: "Result",
    errValid: "Please enter valid numbers.",
    percentLabels: { val1: "Number", val2: "Percentage (%)" },
    profitLabels: { val1: "Cost Price", val2: "Selling Price" },
    discountLabels: { val1: "Original Price", val2: "Discount %" },
    profitText: "Profit",
    lossText: "Loss",
    marginText: "margin",
    discountAmount: "Discount",
    finalPrice: "Final Price"
  },
  es: {
    title: "Calculadora de Porcentajes y Ganancias",
    subtitle: "Herramienta Financiera MyToolKit",
    tabPercent: "Porcentaje",
    tabProfit: "Ganancia / Pérdida",
    tabDiscount: "Descuento",
    calcBtn: "Calcular",
    resetBtn: "Reiniciar",
    resultLabel: "Resultado",
    errValid: "Por favor introduce números válidos.",
    percentLabels: { val1: "Número", val2: "Porcentaje (%)" },
    profitLabels: { val1: "Precio de Coste", val2: "Precio de Venta" },
    discountLabels: { val1: "Precio Original", val2: "% de Descuento" },
    profitText: "Ganancia",
    lossText: "Pérdida",
    marginText: "margen",
    discountAmount: "Descuento",
    finalPrice: "Precio Final"
  }
} as const;

export default function ProfitLossCalculatorTool({ lang }: ProfitLossCalculatorToolProps) {
  const currentLang = (lang === "es" || lang === "en" || lang === "tr") ? lang : "tr";
  const texts = t[currentLang];

  const [isMounted, setIsMounted] = useState(false);
  const [mode, setMode] = useState<"percent" | "profit" | "discount">("percent");
  
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedMode = localStorage.getItem("plc_mode");
      if (savedMode) setMode(savedMode as any);
      const savedVal1 = localStorage.getItem("plc_val1");
      if (savedVal1) setVal1(savedVal1);
      const savedVal2 = localStorage.getItem("plc_val2");
      if (savedVal2) setVal2(savedVal2);
      const savedResult = localStorage.getItem("plc_result");
      if (savedResult) setResult(savedResult);
    } catch (e) {
      console.warn("Hafızadan okunamadı.");
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem("plc_mode", mode);
        localStorage.setItem("plc_val1", val1);
        localStorage.setItem("plc_val2", val2);
        if (result) localStorage.setItem("plc_result", result);
        else localStorage.removeItem("plc_result");
      } catch (e) {
        console.warn("Hafızaya yazılamadı.");
      }
    }
  }, [mode, val1, val2, result, isMounted]);

  const handleCalculate = () => {
    const num1 = parseFloat(val1);
    const num2 = parseFloat(val2);

    if (isNaN(num1) || isNaN(num2)) {
      setResult(texts.errValid);
      return;
    }

    if (mode === "percent") {
      const res = (num1 * num2) / 100;
      setResult(res.toString());
    } else if (mode === "profit") {
      const profit = num2 - num1;
      const margin = (profit / num1) * 100;
      const prefix = profit >= 0 ? texts.profitText : texts.lossText;
      setResult(`${prefix}: ${Math.abs(profit)} (${Math.abs(margin).toFixed(2)}% ${texts.marginText})`);
    } else if (mode === "discount") {
      const discountAmount = (num1 * num2) / 100;
      const finalPrice = num1 - discountAmount;
      setResult(`${texts.discountAmount}: ${discountAmount} | ${texts.finalPrice}: ${finalPrice}`);
    }
  };

  const handleReset = () => {
    setVal1("");
    setVal2("");
    setResult(null);
    localStorage.removeItem("plc_val1");
    localStorage.removeItem("plc_val2");
    localStorage.removeItem("plc_result");
  };

  if (!isMounted) return null;

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20">
          <Percent className="size-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">
            {texts.title}
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            {texts.subtitle}
          </p>
        </div>

        <div className="flex justify-center gap-1 bg-muted p-1 rounded-lg text-xs mt-2">
          <button
            onClick={() => { setMode("percent"); handleReset(); }}
            className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-all ${mode === "percent" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {texts.tabPercent}
          </button>
          <button
            onClick={() => { setMode("profit"); handleReset(); }}
            className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-all ${mode === "profit" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {texts.tabProfit}
          </button>
          <button
            onClick={() => { setMode("discount"); handleReset(); }}
            className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-all ${mode === "discount" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {texts.tabDiscount}
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              {mode === "percent" ? texts.percentLabels.val1 : mode === "profit" ? texts.profitLabels.val1 : texts.discountLabels.val1}
            </label>
            <Input
              type="number"
              placeholder="0"
              value={val1}
              onChange={(e) => setVal1(e.target.value)}
              className="w-full text-sm font-mono"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              {mode === "percent" ? texts.percentLabels.val2 : mode === "profit" ? texts.profitLabels.val2 : texts.discountLabels.val2}
            </label>
            <Input
              type="number"
              placeholder="0"
              value={val2}
              onChange={(e) => setVal2(e.target.value)}
              className="w-full text-sm font-mono"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCalculate} className="flex-1 font-semibold">
            {texts.calcBtn}
          </Button>
          <Button onClick={handleReset} variant="outline" className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10">
            {texts.resetBtn}
          </Button>
        </div>

        {result !== null && (
          <div className="mt-6 p-4 bg-muted/50 rounded-xl text-center border border-border/50">
            <span className="text-xs text-muted-foreground block mb-1">{texts.resultLabel}</span>
            <span className="text-2xl font-bold font-mono text-emerald-500">{result}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}