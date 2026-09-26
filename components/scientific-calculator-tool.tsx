"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sigma } from "lucide-react";

interface ScientificCalculatorToolProps {
  lang: string;
}

const t = {
  tr: {
    title: "Bilimsel Hesap Makinesi",
    subtitle: "MyToolKit Matematik Aracı",
    errInvalid: "Geçersiz işlem.",
    modeLabel: "Açı Birimi",
    deg: "Derece",
    rad: "Radyan",
  },
  en: {
    title: "Scientific Calculator",
    subtitle: "MyToolKit Math Suite",
    errInvalid: "Invalid expression.",
    modeLabel: "Angle Unit",
    deg: "Degrees",
    rad: "Radians",
  },
  es: {
    title: "Calculadora Científica",
    subtitle: "Herramienta MyToolKit",
    errInvalid: "Expresión inválida.",
    modeLabel: "Unidad de Ángulo",
    deg: "Grados",
    rad: "Radianes",
  },
} as const;

const buttonRows: string[][] = [
  ["sin(", "cos(", "tan(", "√(", "C"],
  ["log(", "ln(", "(", ")", "⌫"],
  ["7", "8", "9", "/", "^"],
  ["4", "5", "6", "*", "%"],
  ["1", "2", "3", "-", "π"],
  ["0", ".", "e", "+", "="],
];

export default function ScientificCalculatorTool({ lang }: ScientificCalculatorToolProps) {
  const currentLang = lang === "es" || lang === "en" || lang === "tr" ? lang : "tr";
  const texts = t[currentLang];

  const [expr, setExpr] = useState("");
  const [display, setDisplay] = useState("0");
  const [error, setError] = useState("");
  const [degMode, setDegMode] = useState(true);

  const calculate = (finalExpr: string) => {
    try {
      let sanitized = finalExpr
        .replace(/π/g, "Math.PI")
        .replace(/√\(/g, "Math.sqrt(")
        .replace(/sin\(/g, degMode ? "Math.sin(Math.PI/180*" : "Math.sin(")
        .replace(/cos\(/g, degMode ? "Math.cos(Math.PI/180*" : "Math.cos(")
        .replace(/tan\(/g, degMode ? "Math.tan(Math.PI/180*" : "Math.tan(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/\^/g, "**")
        .replace(/(\d)e(\d)/g, "$1*Math.E*$2")
        .replace(/%/g, "/100");

      if (!/^[0-9+\-*/.()\s,MathPIElogsqrtincota]*$/i.test(sanitized)) {
        throw new Error("invalid chars");
      }

      // eslint-disable-next-line no-new-func
      const value = Function(`"use strict"; return (${sanitized});`)();
      if (typeof value !== "number" || !isFinite(value) || isNaN(value)) {
        throw new Error("invalid result");
      }
      return Number(value.toFixed(10)).toString();
    } catch {
      return null;
    }
  };

  const handlePress = (val: string) => {
    setError("");
    if (val === "C") {
      setExpr("");
      setDisplay("0");
      return;
    }
    if (val === "⌫") {
      const next = expr.slice(0, -1);
      setExpr(next);
      setDisplay(next || "0");
      return;
    }
    if (val === "=") {
      const result = calculate(expr);
      if (result === null) {
        setError(texts.errInvalid);
        return;
      }
      setDisplay(result);
      setExpr(result);
      return;
    }
    const next = expr + val;
    setExpr(next);
    setDisplay(next);
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500 ring-1 ring-violet-500/20">
          <Sigma className="size-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">{texts.title}</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{texts.subtitle}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-end gap-2 text-xs">
          <span className="text-muted-foreground">{texts.modeLabel}</span>
          <div className="flex rounded-md border border-border overflow-hidden">
            <button
              onClick={() => setDegMode(true)}
              className={`px-2 py-1 ${degMode ? "bg-violet-500 text-white" : "bg-transparent text-muted-foreground"}`}
            >
              {texts.deg}
            </button>
            <button
              onClick={() => setDegMode(false)}
              className={`px-2 py-1 ${!degMode ? "bg-violet-500 text-white" : "bg-transparent text-muted-foreground"}`}
            >
              {texts.rad}
            </button>
          </div>
        </div>

        <div className="p-4 bg-muted/50 rounded-xl border border-border/50 text-right">
          <div className="text-3xl font-mono font-bold truncate">{display}</div>
        </div>

        {error && (
          <div className="p-2 text-sm text-red-500 bg-red-500/10 rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-5 gap-2">
          {buttonRows.flat().map((btn, i) => (
            <Button
              key={`${btn}-${i}`}
              variant={btn === "=" ? "default" : "outline"}
              onClick={() => handlePress(btn)}
              className={`font-mono text-sm ${btn === "C" || btn === "⌫" ? "text-rose-500" : ""}`}
            >
              {btn}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
