"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Ruler, ArrowRightLeft } from "lucide-react";

interface UnitConverterToolProps {
  lang: string;
}

type Category = "length" | "weight" | "temperature";

const UNITS: Record<Category, { key: string; tr: string; en: string; es: string }[]> = {
  length: [
    { key: "mm", tr: "Milimetre", en: "Millimeter", es: "Milímetro" },
    { key: "cm", tr: "Santimetre", en: "Centimeter", es: "Centímetro" },
    { key: "m", tr: "Metre", en: "Meter", es: "Metro" },
    { key: "km", tr: "Kilometre", en: "Kilometer", es: "Kilómetro" },
    { key: "inch", tr: "İnç", en: "Inch", es: "Pulgada" },
    { key: "ft", tr: "Fit", en: "Feet", es: "Pie" },
    { key: "mile", tr: "Mil", en: "Mile", es: "Milla" },
  ],
  weight: [
    { key: "mg", tr: "Miligram", en: "Milligram", es: "Miligramo" },
    { key: "g", tr: "Gram", en: "Gram", es: "Gramo" },
    { key: "kg", tr: "Kilogram", en: "Kilogram", es: "Kilogramo" },
    { key: "lb", tr: "Pound", en: "Pound", es: "Libra" },
    { key: "oz", tr: "Ons", en: "Ounce", es: "Onza" },
  ],
  temperature: [
    { key: "celsius", tr: "Celsius (°C)", en: "Celsius (°C)", es: "Celsius (°C)" },
    { key: "fahrenheit", tr: "Fahrenheit (°F)", en: "Fahrenheit (°F)", es: "Fahrenheit (°F)" },
    { key: "kelvin", tr: "Kelvin (K)", en: "Kelvin (K)", es: "Kelvin (K)" },
  ],
};

const LENGTH_TO_M: Record<string, number> = {
  mm: 0.001, cm: 0.01, m: 1, km: 1000, inch: 0.0254, ft: 0.3048, mile: 1609.344,
};

const WEIGHT_TO_G: Record<string, number> = {
  mg: 0.001, g: 1, kg: 1000, lb: 453.592, oz: 28.3495,
};

const toCelsius = (value: number, unit: string): number => {
  if (unit === "celsius") return value;
  if (unit === "fahrenheit") return (value - 32) * (5 / 9);
  return value - 273.15;
};

const fromCelsius = (celsius: number, unit: string): number => {
  if (unit === "celsius") return celsius;
  if (unit === "fahrenheit") return celsius * (9 / 5) + 32;
  return celsius + 273.15;
};

const t = {
  tr: {
    title: "Birim Çevirici",
    subtitle: "MyToolKit Hesaplama Aracı",
    valueLabel: "Değer",
    resultLabel: "Sonuç",
    swapTitle: "Birimleri Değiştir",
    categories: { length: "Uzunluk", weight: "Ağırlık", temperature: "Sıcaklık" }
  },
  en: {
    title: "Unit Converter",
    subtitle: "MyToolKit Calculation Suite",
    valueLabel: "Value",
    resultLabel: "Result",
    swapTitle: "Swap Units",
    categories: { length: "Length", weight: "Weight", temperature: "Temperature" }
  },
  es: {
    title: "Conversor de Unidades",
    subtitle: "Herramienta de Cálculo MyToolKit",
    valueLabel: "Valor",
    resultLabel: "Resultado",
    swapTitle: "Intercambiar Unidades",
    categories: { length: "Longitud", weight: "Peso", temperature: "Temperatura" }
  }
} as const;

export default function UnitConverterTool({ lang }: UnitConverterToolProps) {
  const currentLang = (lang === "es" || lang === "en" || lang === "tr") ? lang : "tr";
  const texts = t[currentLang];

  const [category, setCategory] = useState<Category>("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");
  const [inputValue, setInputValue] = useState("1");
  const [result, setResult] = useState("");

  useEffect(() => {
    const units = UNITS[category];
    setFromUnit(units[0].key);
    setToUnit(units[1].key);
  }, [category]);

  useEffect(() => {
    const num = parseFloat(inputValue);
    if (isNaN(num)) {
      setResult("");
      return;
    }

    let converted: number;

    if (category === "length") {
      const meters = num * LENGTH_TO_M[fromUnit];
      converted = meters / LENGTH_TO_M[toUnit];
    } else if (category === "weight") {
      const grams = num * WEIGHT_TO_G[fromUnit];
      converted = grams / WEIGHT_TO_G[toUnit];
    } else {
      const celsius = toCelsius(num, fromUnit);
      converted = fromCelsius(celsius, toUnit);
    }

    setResult(
      Number.isInteger(converted) ? converted.toString() : converted.toFixed(4).replace(/\.?0+$/, "")
    );
  }, [inputValue, fromUnit, toUnit, category]);

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const getUnitLabel = (unitKey: string) => {
    const unit = UNITS[category].find((u) => u.key === unitKey);
    return unit ? unit[currentLang] : unitKey;
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 ring-1 ring-orange-500/20">
          <Ruler className="size-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">{texts.title}</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{texts.subtitle}</p>
        </div>

        <div className="flex justify-center gap-1 bg-muted p-1 rounded-lg text-xs mt-2">
          {(Object.keys(UNITS) as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-all ${
                category === cat ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {texts.categories[cat]}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-3 items-end">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">{texts.valueLabel}</label>
            <Input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full font-mono"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm font-medium focus:ring-2 focus:ring-orange-500 outline-none"
            >
              {UNITS[category].map((u) => (
                <option key={u.key} value={u.key}>
                  {u[currentLang]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center pb-2">
            <button
              onClick={handleSwap}
              className="rounded-full p-2 border border-border hover:bg-muted transition-colors"
              title={texts.swapTitle}
            >
              <ArrowRightLeft className="size-4" />
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">{texts.resultLabel}</label>
            <div className="h-9 flex items-center px-3 rounded-md border border-border/50 bg-muted/50 font-mono font-bold text-orange-500 truncate">
              {result || "0"}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm font-medium focus:ring-2 focus:ring-orange-500 outline-none"
            >
              {UNITS[category].map((u) => (
                <option key={u.key} value={u.key}>
                  {u[currentLang]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {result && (
          <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20 text-center">
            <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">
              {inputValue} {getUnitLabel(fromUnit)} = {result} {getUnitLabel(toUnit)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}