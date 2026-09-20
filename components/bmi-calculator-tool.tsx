"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Scale } from "lucide-react";

interface BmiCalculatorToolProps {
  lang: string;
}

interface BmiResult {
  bmi: number;
  categoryKey: "under" | "normal" | "over" | "obese";
}

const CATEGORY_LABELS = {
  under: { tr: "Zayıf", en: "Underweight", color: "text-sky-500" },
  normal: { tr: "Normal", en: "Normal", color: "text-emerald-500" },
  over: { tr: "Fazla Kilolu", en: "Overweight", color: "text-amber-500" },
  obese: { tr: "Obez", en: "Obese", color: "text-rose-500" },
};

const getCategory = (bmi: number): BmiResult["categoryKey"] => {
  if (bmi < 18.5) return "under";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "over";
  return "obese";
};

export default function BmiCalculatorTool({ lang }: BmiCalculatorToolProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");

  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weightLb, setWeightLb] = useState("");

  const [result, setResult] = useState<BmiResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedUnit = localStorage.getItem("bmi_unit");
      if (savedUnit === "metric" || savedUnit === "imperial") setUnit(savedUnit);

      const savedHeightCm = localStorage.getItem("bmi_height_cm");
      if (savedHeightCm) setHeightCm(savedHeightCm);
      const savedWeightKg = localStorage.getItem("bmi_weight_kg");
      if (savedWeightKg) setWeightKg(savedWeightKg);

      const savedHeightFt = localStorage.getItem("bmi_height_ft");
      if (savedHeightFt) setHeightFt(savedHeightFt);
      const savedHeightIn = localStorage.getItem("bmi_height_in");
      if (savedHeightIn) setHeightIn(savedHeightIn);
      const savedWeightLb = localStorage.getItem("bmi_weight_lb");
      if (savedWeightLb) setWeightLb(savedWeightLb);

      const savedResult = localStorage.getItem("bmi_result");
      if (savedResult) setResult(JSON.parse(savedResult));
    } catch (e) {
      console.warn("Hafızadan veri okunamadı.");
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem("bmi_unit", unit);
        localStorage.setItem("bmi_height_cm", heightCm);
        localStorage.setItem("bmi_weight_kg", weightKg);
        localStorage.setItem("bmi_height_ft", heightFt);
        localStorage.setItem("bmi_height_in", heightIn);
        localStorage.setItem("bmi_weight_lb", weightLb);
        if (result) {
          localStorage.setItem("bmi_result", JSON.stringify(result));
        } else {
          localStorage.removeItem("bmi_result");
        }
      } catch (e) {
        console.warn("Hafızaya kaydedilemedi.");
      }
    }
  }, [unit, heightCm, weightKg, heightFt, heightIn, weightLb, result, isMounted]);

  const handleCalculate = () => {
    setError("");

    if (unit === "metric") {
      const h = parseFloat(heightCm);
      const w = parseFloat(weightKg);
      if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
        setError(lang === "tr" ? "Lütfen geçerli boy ve kilo girin." : "Please enter a valid height and weight.");
        setResult(null);
        return;
      }
      const heightM = h / 100;
      const bmi = w / (heightM * heightM);
      setResult({ bmi: Math.round(bmi * 10) / 10, categoryKey: getCategory(bmi) });
    } else {
      const ft = parseFloat(heightFt || "0");
      const inch = parseFloat(heightIn || "0");
      const w = parseFloat(weightLb);
      const totalInches = ft * 12 + inch;
      if (isNaN(totalInches) || totalInches <= 0 || isNaN(w) || w <= 0) {
        setError(lang === "tr" ? "Lütfen geçerli boy ve kilo girin." : "Please enter a valid height and weight.");
        setResult(null);
        return;
      }
      const bmi = (703 * w) / (totalInches * totalInches);
      setResult({ bmi: Math.round(bmi * 10) / 10, categoryKey: getCategory(bmi) });
    }
  };

  const handleReset = () => {
    setHeightCm("");
    setWeightKg("");
    setHeightFt("");
    setHeightIn("");
    setWeightLb("");
    setResult(null);
    setError("");
    localStorage.removeItem("bmi_height_cm");
    localStorage.removeItem("bmi_weight_kg");
    localStorage.removeItem("bmi_height_ft");
    localStorage.removeItem("bmi_height_in");
    localStorage.removeItem("bmi_weight_lb");
    localStorage.removeItem("bmi_result");
  };

  if (!isMounted) return null;

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-500 ring-1 ring-teal-500/20">
          <Scale className="size-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">
            {lang === "tr" ? "Vücut Kitle Endeksi Hesaplama" : "BMI Calculator"}
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            {lang === "tr" ? "MyToolKit Sağlık Aracı" : "MyToolKit Health Suite"}
          </p>
        </div>

        <div className="flex justify-center gap-1 bg-muted p-1 rounded-lg text-xs mt-2">
          <button
            onClick={() => { setUnit("metric"); setResult(null); setError(""); }}
            className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-all ${unit === "metric" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {lang === "tr" ? "Metrik (cm/kg)" : "Metric (cm/kg)"}
          </button>
          <button
            onClick={() => { setUnit("imperial"); setResult(null); setError(""); }}
            className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-all ${unit === "imperial" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {lang === "tr" ? "İngiliz (ft/lb)" : "Imperial (ft/lb)"}
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {unit === "metric" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                {lang === "tr" ? "Boy (cm)" : "Height (cm)"}
              </label>
              <Input
                type="number"
                placeholder="170"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="w-full text-sm font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                {lang === "tr" ? "Kilo (kg)" : "Weight (kg)"}
              </label>
              <Input
                type="number"
                placeholder="65"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="w-full text-sm font-mono"
              />
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                {lang === "tr" ? "Boy (fit)" : "Height (ft)"}
              </label>
              <Input
                type="number"
                placeholder="5"
                value={heightFt}
                onChange={(e) => setHeightFt(e.target.value)}
                className="w-full text-sm font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                {lang === "tr" ? "Boy (inç)" : "Height (in)"}
              </label>
              <Input
                type="number"
                placeholder="7"
                value={heightIn}
                onChange={(e) => setHeightIn(e.target.value)}
                className="w-full text-sm font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                {lang === "tr" ? "Kilo (lb)" : "Weight (lb)"}
              </label>
              <Input
                type="number"
                placeholder="145"
                value={weightLb}
                onChange={(e) => setWeightLb(e.target.value)}
                className="w-full text-sm font-mono"
              />
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
            {lang === "tr" ? "Hesapla" : "Calculate"}
          </Button>
          <Button onClick={handleReset} variant="outline" className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10">
            {lang === "tr" ? "Sıfırla" : "Reset"}
          </Button>
        </div>

        {result && (
          <div className="p-4 bg-muted/50 rounded-xl text-center border border-border/50 space-y-2">
            <span className="text-xs text-muted-foreground block">
              {lang === "tr" ? "Vücut Kitle Endeksiniz" : "Your BMI"}
            </span>
            <span className="text-4xl font-bold font-mono text-teal-500 block">{result.bmi}</span>
            <span className={`text-sm font-semibold ${CATEGORY_LABELS[result.categoryKey].color}`}>
              {lang === "tr" ? CATEGORY_LABELS[result.categoryKey].tr : CATEGORY_LABELS[result.categoryKey].en}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
