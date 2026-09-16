"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Percent, TrendingUp } from "lucide-react";

interface ProfitLossToolProps {
  lang: string;
}

export default function ProfitLossTool({ lang }: ProfitLossToolProps) {
  // Hangi sekmedeyiz: 'profit' (Kâr/Zarar) veya 'percentage' (Yüzde Hesaplama)
  const [mode, setMode] = useState<"profit" | "percentage">("profit");

  // --- Kâr / Zarar State'leri ---
  const [cost, setCost] = useState("");
  const [revenue, setRevenue] = useState("");
  const [profitResult, setProfitResult] = useState<{
    profit: number;
    margin: number;
    markup: number;
    isProfit: boolean;
  } | null>(null);

  // --- Pratik Yüzde Hesaplama State'leri ---
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [percentType, setPercentType] = useState<"of" | "whatPercent" | "increase" | "decrease">("of");
  const [percentResult, setPercentResult] = useState<number | null>(null);

  const [error, setError] = useState("");

  // Kâr/Zarar Hesapla
  const handleCalculateProfit = () => {
    setError("");
    const c = parseFloat(cost);
    const r = parseFloat(revenue);

    if (isNaN(c) || isNaN(r)) {
      setError(lang === "tr" ? "Lütfen geçerli sayılar girin." : "Please enter valid numbers.");
      setProfitResult(null);
      return;
    }

    if (c <= 0) {
      setError(lang === "tr" ? "Maliyet 0'dan büyük olmalıdır." : "Cost must be greater than 0.");
      setProfitResult(null);
      return;
    }

    const profit = r - c;
    const margin = (profit / r) * 100;
    const markup = (profit / c) * 100;

    setProfitResult({
      profit,
      margin: isNaN(margin) ? 0 : margin,
      markup: isNaN(markup) ? 0 : markup,
      isProfit: profit >= 0,
    });
  };

  // Pratik Yüzde Hesapla
  const handleCalculatePercent = () => {
    setError("");
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      setError(lang === "tr" ? "Lütfen tüm alanları doldurun." : "Please fill in all fields.");
      setPercentResult(null);
      return;
    }

    let res = 0;
    if (percentType === "of") {
      res = (n1 * n2) / 100;
    } else if (percentType === "whatPercent") {
      if (n2 === 0) {
        setError(lang === "tr" ? "Payda 0 olamaz." : "Denominator cannot be 0.");
        return;
      }
      res = (n1 / n2) * 100;
    } else if (percentType === "increase") {
      res = n1 + (n1 * n2) / 100;
    } else if (percentType === "decrease") {
      res = n1 - (n1 * n2) / 100;
    }

    setPercentResult(res);
  };

  const handleReset = () => {
    setError("");
    if (mode === "profit") {
      setCost("");
      setRevenue("");
      setProfitResult(null);
    } else {
      setNum1("");
      setNum2("");
      setPercentResult(null);
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20">
          <Percent className="size-6" />
        </div>
        <CardTitle className="text-xl font-bold">
          {lang === "tr" ? "Yüzde ve Kâr Hesaplama" : "Percentage & Profit Calculator"}
        </CardTitle>

        {/* Sekme Geçiş Butonları */}
        <div className="flex justify-center gap-1 bg-muted p-1 rounded-lg text-xs mt-2">
          <button
            onClick={() => { setMode("profit"); handleReset(); }}
            className={`flex-1 py-2 px-3 rounded-md font-medium transition-all ${mode === "profit" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {lang === "tr" ? "Kâr / Zarar" : "Profit / Loss"}
          </button>
          <button
            onClick={() => { setMode("percentage"); handleReset(); }}
            className={`flex-1 py-2 px-3 rounded-md font-medium transition-all ${mode === "percentage" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {lang === "tr" ? "Pratik Yüzde" : "Percentage"}
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {mode === "profit" ? (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">
                  {lang === "tr" ? "Alış / Maliyet Fiyatı" : "Cost Price"}
                </label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">
                  {lang === "tr" ? "Satış / Gelir Fiyatı" : "Selling Price"}
                </label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-lg text-center">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={handleCalculateProfit} className="flex-1">
                {lang === "tr" ? "Hesapla" : "Calculate"}
              </Button>
              <Button onClick={handleReset} variant="outline">
                {lang === "tr" ? "Sıfırla" : "Reset"}
              </Button>
            </div>

            {profitResult !== null && (
              <div className="mt-6 p-4 bg-muted rounded-xl space-y-3 text-center">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">
                    {lang === "tr" ? "Net Kâr / Zarar" : "Net Profit / Loss"}
                  </span>
                  <span className={`text-3xl font-bold font-mono ${profitResult.isProfit ? "text-emerald-500" : "text-red-500"}`}>
                    {profitResult.profit.toFixed(2)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/60">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold font-mono">{profitResult.margin.toFixed(2)}%</span>
                    <span className="text-xs text-muted-foreground">{lang === "tr" ? "Kâr Marjı" : "Profit Margin"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold font-mono">{profitResult.markup.toFixed(2)}%</span>
                    <span className="text-xs text-muted-foreground">{lang === "tr" ? "Maliyet Artışı (Markup)" : "Markup"}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                {lang === "tr" ? "İşlem Türü" : "Calculation Type"}
              </label>
              <select
                value={percentType}
                onChange={(e) => setPercentType(e.target.value as any)}
                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="of">
                  {lang === "tr" ? "Bir sayının yüzde kaçı kaçtır? (% Y'si X'in)" : "What is X% of Y?"}
                </option>
                <option value="whatPercent">
                  {lang === "tr" ? "Bir sayı diğerinin yüzde kaçıdır? (X, Y'nin yüzde kaçı?)" : "X is what percent of Y?"}
                </option>
                <option value="increase">
                  {lang === "tr" ? "Bir sayıyı yüzde oranında artır (+%)" : "Increase number by %"}
                </option>
                <option value="decrease">
                  {lang === "tr" ? "Bir sayıyı yüzde oranında azalt (-%)" : "Decrease number by %"}
                </option>
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">
                  {percentType === "of" ? (lang === "tr" ? "Yüzde Oranı (%)" : "Percentage (%)") : percentType === "whatPercent" ? (lang === "tr" ? "Parça Sayı (X)" : "Part Value (X)") : (lang === "tr" ? "Ana Sayı" : "Base Number")}
                </label>
                <Input
                  type="number"
                  placeholder="0"
                  value={num1}
                  onChange={(e) => setNum1(e.target.value)}
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">
                  {percentType === "of" ? (lang === "tr" ? "Ana Sayı (Y)" : "Base Number (Y)") : percentType === "whatPercent" ? (lang === "tr" ? "Toplam Sayı (Y)" : "Total Value (Y)") : (lang === "tr" ? "Yüzde Oranı (%)" : "Percentage (%)")}
                </label>
                <Input
                  type="number"
                  placeholder="0"
                  value={num2}
                  onChange={(e) => setNum2(e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-lg text-center">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={handleCalculatePercent} className="flex-1">
                {lang === "tr" ? "Hesapla" : "Calculate"}
              </Button>
              <Button onClick={handleReset} variant="outline">
                {lang === "tr" ? "Sıfırla" : "Reset"}
              </Button>
            </div>

            {percentResult !== null && (
              <div className="mt-6 p-4 bg-muted rounded-xl text-center space-y-1">
                <span className="text-xs text-muted-foreground">
                  {lang === "tr" ? "Sonuç" : "Result"}
                </span>
                <div className="text-3xl font-bold font-mono text-emerald-500">
                  {percentResult % 1 !== 0 ? percentResult.toFixed(2) : percentResult}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}