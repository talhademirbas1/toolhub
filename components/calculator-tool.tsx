"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

interface CalculatorToolProps {
  lang: string;
}

export default function CalculatorTool({ lang }: CalculatorToolProps) {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");

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
  };

  const handleCalculate = () => {
    try {
      const fullExpression = equation + display;
      const result = Function(`'use strict'; return (${fullExpression})`)();
      setDisplay(String(result));
      setEquation("");
    } catch {
      setDisplay("Error");
      setEquation("");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20">
          <Calculator className="size-6" />
        </div>
        <CardTitle className="text-xl font-bold">
          {lang === "tr" ? "Hesap Makinesi" : "Calculator"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Ekran Alanı */}
        <div className="bg-muted p-4 rounded-lg text-right overflow-hidden">
          <div className="text-xs text-muted-foreground h-4">{equation}</div>
          <div className="text-3xl font-mono font-bold tracking-wider truncate">
            {display}
          </div>
        </div>

        {/* Tuş Takımı */}
        <div className="grid grid-cols-4 gap-2">
          <Button variant="destructive" onClick={handleClear} className="col-span-2">
            AC
          </Button>
          <Button variant="outline" onClick={() => handleOperator("/")}>
            ÷
          </Button>
          <Button variant="outline" onClick={() => handleOperator("*")}>
            ×
          </Button>

          <Button variant="secondary" onClick={() => handleNumber("7")}>7</Button>
          <Button variant="secondary" onClick={() => handleNumber("8")}>8</Button>
          <Button variant="secondary" onClick={() => handleNumber("9")}>9</Button>
          <Button variant="outline" onClick={() => handleOperator("-")}>
            -
          </Button>

          <Button variant="secondary" onClick={() => handleNumber("4")}>4</Button>
          <Button variant="secondary" onClick={() => handleNumber("5")}>5</Button>
          <Button variant="secondary" onClick={() => handleNumber("6")}>6</Button>
          <Button variant="outline" onClick={() => handleOperator("+")}>
            +
          </Button>

          <Button variant="secondary" onClick={() => handleNumber("1")}>1</Button>
          <Button variant="secondary" onClick={() => handleNumber("2")}>2</Button>
          <Button variant="secondary" onClick={() => handleNumber("3")}>3</Button>
          <Button onClick={handleCalculate} className="row-span-2 bg-primary text-primary-foreground h-full">
            =
          </Button>

          <Button variant="secondary" onClick={() => handleNumber("0")} className="col-span-2">
            0
          </Button>
          <Button variant="secondary" onClick={() => handleNumber(".")}>
            .
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}