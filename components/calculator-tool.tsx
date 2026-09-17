"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

interface CalculatorToolProps {
  lang: string;
}

export default function CalculatorTool({ lang }: CalculatorToolProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");

  // 1. SAYFA YÜKLENDİKTEN SONRA HAFIZAYI KONTROL ET
  useEffect(() => {
    setIsMounted(true);
    const savedDisplay = localStorage.getItem('calc_display');
    const savedEquation = localStorage.getItem('calc_equation');
    
    if (savedDisplay) setDisplay(savedDisplay);
    if (savedEquation) setEquation(savedEquation);
  }, []);

  // 2. İŞLEM YAPILDIKÇA HAFIZAYI GÜNCELLE
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('calc_display', display);
      localStorage.setItem('calc_equation', equation);
    }
  }, [display, equation, isMounted]);

  const handleNumber = (num: string) => {
    if (display === "0" || display === "Error") {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + " " + op + " ");
    setDisplay("0");
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
    localStorage.removeItem('calc_display');
    localStorage.removeItem('calc_equation');
  };

  const handleCalculate = () => {
    try {
      const fullExpression = equation + display;
      // Güvenli hesaplama fonksiyonu
      const result = Function(`'use strict'; return (${fullExpression})`)();
      setDisplay(String(result));
      setEquation("");
    } catch {
      setDisplay("Error");
      setEquation("");
    }
  };

  // Hydration hatasını engellemek için yüklenene kadar bir şey gösterme
  if (!isMounted) return null;

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20">
          <Calculator className="size-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">
            {lang === "tr" ? "Hesap Makinesi" : "Calculator"}
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            {lang === "tr" ? "MyToolKit Hesaplama Aracı" : "MyToolKit Math Suite"}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Ekran Alanı */}
        <div className="bg-muted p-4 rounded-lg text-right overflow-hidden border border-border/50">
          <div className="text-xs text-muted-foreground h-4">{equation}</div>
          <div className="text-3xl font-mono font-bold tracking-wider truncate mt-1">
            {display}
          </div>
        </div>

        {/* Tuş Takımı */}
        <div className="grid grid-cols-4 gap-2">
          <Button variant="destructive" onClick={handleClear} className="col-span-2 font-bold">
            AC
          </Button>
          <Button variant="outline" onClick={() => handleOperator("/")} className="text-lg">
            ÷
          </Button>
          <Button variant="outline" onClick={() => handleOperator("*")} className="text-lg">
            ×
          </Button>

          <Button variant="secondary" onClick={() => handleNumber("7")} className="text-lg font-medium">7</Button>
          <Button variant="secondary" onClick={() => handleNumber("8")} className="text-lg font-medium">8</Button>
          <Button variant="secondary" onClick={() => handleNumber("9")} className="text-lg font-medium">9</Button>
          <Button variant="outline" onClick={() => handleOperator("-")} className="text-lg">
            -
          </Button>

          <Button variant="secondary" onClick={() => handleNumber("4")} className="text-lg font-medium">4</Button>
          <Button variant="secondary" onClick={() => handleNumber("5")} className="text-lg font-medium">5</Button>
          <Button variant="secondary" onClick={() => handleNumber("6")} className="text-lg font-medium">6</Button>
          <Button variant="outline" onClick={() => handleOperator("+")} className="text-lg">
            +
          </Button>

          <Button variant="secondary" onClick={() => handleNumber("1")} className="text-lg font-medium">1</Button>
          <Button variant="secondary" onClick={() => handleNumber("2")} className="text-lg font-medium">2</Button>
          <Button variant="secondary" onClick={() => handleNumber("3")} className="text-lg font-medium">3</Button>
          <Button onClick={handleCalculate} className="row-span-2 bg-amber-500 hover:bg-amber-600 text-white h-full text-xl shadow-md">
            =
          </Button>

          <Button variant="secondary" onClick={() => handleNumber("0")} className="col-span-2 text-lg font-medium">
            0
          </Button>
          <Button variant="secondary" onClick={() => handleNumber(".")} className="text-lg font-bold">
            .
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}