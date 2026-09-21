"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Sun, Moon, ArrowLeft } from "lucide-react";
import { i18n, type Locale } from "@/i18n.config";

interface CalculatorToolProps {
  lang: string;
}

const t = {
  tr: {
    backBtn: "Ana Sayfaya Dön",
    title: "Hesap Makinesi",
    subtitle: "MyToolKit Hesaplama Aracı",
    errorNum: "Sayı çok büyük",
    zero: "sıfır",
  },
  en: {
    backBtn: "Back to Home",
    title: "Calculator",
    subtitle: "MyToolKit Math Suite",
    errorNum: "Number too large",
    zero: "zero",
  },
  es: {
    backBtn: "Volver al Inicio",
    title: "Calculadora",
    subtitle: "Herramienta de Matemáticas MyToolKit",
    errorNum: "Número demasiado grande",
    zero: "cero",
  }
} as const;

// İspanyolca sayı çevirme (Basit form)
const numberToSpanishWords = (n: number): string => {
  if (n === 0) return "";
  const unidades = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
  const decenas = ["", "", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
  const centenas = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];

  if (n < 20) return unidades[n];
  if (n < 30) return n === 20 ? "veinte" : "veinti" + unidades[n % 10];
  if (n < 100) return decenas[Math.floor(n / 10)] + (n % 10 !== 0 ? " y " + unidades[n % 10] : "");
  if (n < 1000) return n === 100 ? "cien" : centenas[Math.floor(n / 100)] + (n % 100 !== 0 ? " " + numberToSpanishWords(n % 100) : "");
  if (n < 1000000) return (Math.floor(n / 1000) === 1 ? "mil" : numberToSpanishWords(Math.floor(n / 1000)) + " mil") + (n % 1000 !== 0 ? " " + numberToSpanishWords(n % 1000) : "");
  if (n < 1000000000) return (Math.floor(n / 1000000) === 1 ? "un millón" : numberToSpanishWords(Math.floor(n / 1000000)) + " millones") + (n % 1000000 !== 0 ? " " + numberToSpanishWords(n % 1000000) : "");
  return (Math.floor(n / 1000000000) === 1 ? "mil millones" : numberToSpanishWords(Math.floor(n / 1000000000)) + " mil millones") + (n % 1000000000 !== 0 ? " " + numberToSpanishWords(n % 1000000000) : "");
};

const numberToTurkishWords = (n: number): string => {
  if (n === 0) return "";
  const birler = ["", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz"];
  const onlar = ["", "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan"];
  
  if (n < 10) return birler[n];
  if (n < 100) return onlar[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + birler[n % 10] : "");
  if (n < 1000) {
    const yuz = Math.floor(n / 100);
    const kalan = n % 100;
    const yuzStr = yuz === 1 ? "yüz" : birler[yuz] + " yüz";
    return yuzStr + (kalan !== 0 ? " " + numberToTurkishWords(kalan) : "");
  }
  if (n < 1000000) {
    const bin = Math.floor(n / 1000);
    const kalan = n % 1000;
    const binStr = bin === 1 ? "bin" : numberToTurkishWords(bin) + " bin";
    return binStr + (kalan !== 0 ? " " + numberToTurkishWords(kalan) : "");
  }
  if (n < 1000000000) {
    const milyon = Math.floor(n / 1000000);
    const kalan = n % 1000000;
    return numberToTurkishWords(milyon) + " milyon" + (kalan !== 0 ? " " + numberToTurkishWords(kalan) : "");
  }
  const milyar = Math.floor(n / 1000000000);
  const kalan = n % 1000000000;
  return numberToTurkishWords(milyar) + " milyar" + (kalan !== 0 ? " " + numberToTurkishWords(kalan) : "");
};

const numberToEnglishWords = (n: number): string => {
  if (n === 0) return "";
  const a = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const b = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

  if (n < 20) return a[n];
  if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : "");
  if (n < 1000) return a[Math.floor(n / 100)] + " hundred" + (n % 100 !== 0 ? " " + numberToEnglishWords(n % 100) : "");
  if (n < 1000000) return numberToEnglishWords(Math.floor(n / 1000)) + " thousand" + (n % 1000 !== 0 ? " " + numberToEnglishWords(n % 1000) : "");
  if (n < 1000000000) return numberToEnglishWords(Math.floor(n / 1000000)) + " million" + (n % 1000000 !== 0 ? " " + numberToEnglishWords(n % 1000000) : "");
  return numberToEnglishWords(Math.floor(n / 1000000000)) + " billion" + (n % 1000000000 !== 0 ? " " + numberToEnglishWords(n % 1000000000) : "");
};

const formatNumberWithCommas = (val: string) => {
  if (val === "Error" || val === "") return val;
  const parts = val.split(".");
  let integerPart = parts[0];
  const decimalPart = parts[1] !== undefined ? "." + parts[1] : "";
  
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return integerPart + decimalPart;
};

export default function CalculatorTool({ lang }: CalculatorToolProps) {
  const currentLang = (lang === "es" || lang === "en" || lang === "tr") ? lang : "tr";
  const texts = t[currentLang];
  
  const router = useRouter();
  const pathname = usePathname();
  
  const [isMounted, setIsMounted] = useState(false);
  const [dark, setDark] = useState(false);
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");

  const numberToWords = (numStr: string, lng: typeof currentLang): string => {
    const num = parseFloat(numStr);
    if (isNaN(num)) return "";
    if (num === 0) return texts.zero;
    if (num > 999999999999) return texts.errorNum;
  
    try {
      if (lng === "tr") return numberToTurkishWords(num);
      if (lng === "es") return numberToSpanishWords(num);
      return numberToEnglishWords(num);
    } catch {
      return "";
    }
  };

  useEffect(() => {
    setIsMounted(true);
    const savedDisplay = localStorage.getItem('calc_display');
    const savedEquation = localStorage.getItem('calc_equation');
    
    if (savedDisplay) setDisplay(savedDisplay);
    if (savedEquation) setEquation(savedEquation);

    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark" || (!savedTheme && document.documentElement.classList.contains("dark"))) {
        setDark(true);
        document.documentElement.classList.add("dark");
      } else {
        setDark(false);
        document.documentElement.classList.remove("dark");
      }
    } catch (e) {
      console.warn("Tema yüklenemedi.");
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('calc_display', display);
      localStorage.setItem('calc_equation', equation);
    }
  }, [display, equation, isMounted]);

  function toggleTheme() {
    const yeniDurum = !dark;
    setDark(yeniDurum);
    if (yeniDurum) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as Locale;
    if (dark) localStorage.setItem('theme', 'dark');
    else localStorage.setItem('theme', 'light');

    if (!pathname) return;
    const pathParts = pathname.split('/');
    pathParts[1] = newLang; 
    const newPath = pathParts.join('/');
    router.push(newPath);
  };

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
      const result = Function(`'use strict'; return (${fullExpression})`)();
      const cleanResult = Number.isInteger(result) ? result.toString() : parseFloat(result.toFixed(6)).toString();
      setDisplay(cleanResult);
      setEquation("");
    } catch {
      setDisplay("Error");
      setEquation("");
    }
  };

  if (!isMounted) return null;

  const numberInWords = numberToWords(display, currentLang);

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="flex items-center justify-between px-1 border-b border-border/60 pb-4">
        <Link
          href={`/${currentLang}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          {texts.backBtn}
        </Link>
        <div className="flex items-center gap-2">
          
          <select
            value={currentLang}
            onChange={handleLanguageChange}
            className="h-9 cursor-pointer rounded-md border border-input bg-transparent px-2 py-1 text-xs font-bold uppercase shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {i18n.locales.map((l) => (
              <option key={l} value={l} className="uppercase bg-background text-foreground">
                {l.toUpperCase()}
              </option>
            ))}
          </select>

          <Button onClick={toggleTheme} size="icon" variant="outline" className="h-9 w-9">
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20">
            <Calculator className="size-6" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">
              {texts.title}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              {texts.subtitle}
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg text-right overflow-hidden border border-border/50">
            <div className="text-xs text-muted-foreground h-4 truncate">{equation}</div>
            <div className="text-3xl font-mono font-bold tracking-wider truncate mt-1">
              {formatNumberWithCommas(display)}
            </div>
            {numberInWords && display !== "Error" && (
              <div className="text-[11px] text-muted-foreground/80 font-medium italic mt-1 truncate">
                {numberInWords}
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            <Button variant="destructive" onClick={handleClear} className="col-span-2 font-bold">AC</Button>
            <Button variant="outline" onClick={() => handleOperator("/")} className="text-lg">÷</Button>
            <Button variant="outline" onClick={() => handleOperator("*")} className="text-lg">×</Button>

            <Button variant="secondary" onClick={() => handleNumber("7")} className="text-lg font-medium">7</Button>
            <Button variant="secondary" onClick={() => handleNumber("8")} className="text-lg font-medium">8</Button>
            <Button variant="secondary" onClick={() => handleNumber("9")} className="text-lg font-medium">9</Button>
            <Button variant="outline" onClick={() => handleOperator("-")} className="text-lg">-</Button>

            <Button variant="secondary" onClick={() => handleNumber("4")} className="text-lg font-medium">4</Button>
            <Button variant="secondary" onClick={() => handleNumber("5")} className="text-lg font-medium">5</Button>
            <Button variant="secondary" onClick={() => handleNumber("6")} className="text-lg font-medium">6</Button>
            <Button variant="outline" onClick={() => handleOperator("+")} className="text-lg">+</Button>

            <Button variant="secondary" onClick={() => handleNumber("1")} className="text-lg font-medium">1</Button>
            <Button variant="secondary" onClick={() => handleNumber("2")} className="text-lg font-medium">2</Button>
            <Button variant="secondary" onClick={() => handleNumber("3")} className="text-lg font-medium">3</Button>
            <Button onClick={handleCalculate} className="row-span-2 bg-amber-500 hover:bg-amber-600 text-white h-full text-xl shadow-md">=</Button>

            <Button variant="secondary" onClick={() => handleNumber("0")} className="col-span-2 text-lg font-medium">0</Button>
            <Button variant="secondary" onClick={() => handleNumber(".")} className="text-lg font-bold">.</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}