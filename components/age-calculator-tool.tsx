"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cake } from "lucide-react";

interface AgeCalculatorToolProps {
  lang: string;
}

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  daysUntilNextBirthday: number;
  dayOfWeek: string;
}

// BİLEŞEN İÇİ ÇEVİRİ OBJESİ (Araç içindeki metinler için)
const t = {
  tr: {
    errEmpty: "Lütfen doğum tarihinizi girin.",
    errFormat: "Geçersiz tarih formatı.",
    errFuture: "Doğum tarihi gelecekte olamaz.",
    title: "Yaş Hesaplama",
    subtitle: "MyToolKit Yaşam Aracı",
    dob: "Doğum Tarihi",
    calcBtn: "Hesapla",
    resetBtn: "Sıfırla",
    years: "Yıl",
    months: "Ay",
    days: "Gün",
    totalDays: "Toplam Gün",
    nextBday: "Sonraki Doğum Günü",
    bornOn: "Doğduğunuz Gün",
    today: "Bugün! 🎉",
    daysSuffix: "gün",
    locale: "tr-TR"
  },
  en: {
    errEmpty: "Please enter your birth date.",
    errFormat: "Invalid date format.",
    errFuture: "Birth date cannot be in the future.",
    title: "Age Calculator",
    subtitle: "MyToolKit Life Suite",
    dob: "Date of Birth",
    calcBtn: "Calculate",
    resetBtn: "Reset",
    years: "Years",
    months: "Months",
    days: "Days",
    totalDays: "Total Days Lived",
    nextBday: "Next Birthday In",
    bornOn: "Born On",
    today: "Today! 🎉",
    daysSuffix: "days",
    locale: "en-US"
  },
  es: {
    errEmpty: "Por favor introduce tu fecha de nacimiento.",
    errFormat: "Formato de fecha inválido.",
    errFuture: "La fecha de nacimiento no puede ser futura.",
    title: "Calculadora de Edad",
    subtitle: "Herramienta MyToolKit",
    dob: "Fecha de Nacimiento",
    calcBtn: "Calcular",
    resetBtn: "Reiniciar",
    years: "Años",
    months: "Meses",
    days: "Días",
    totalDays: "Días Totales Vividos",
    nextBday: "Próximo Cumpleaños En",
    bornOn: "Naciste el",
    today: "¡Hoy! 🎉",
    daysSuffix: "días",
    locale: "es-ES"
  }
} as const;

export default function AgeCalculatorTool({ lang }: AgeCalculatorToolProps) {
  // Geçerli dili belirle (Eğer lang prop'u es, en, tr dışındaysa varsayılan tr olsun)
  const currentLang = (lang === "es" || lang === "en" || lang === "tr") ? lang : "tr";
  const texts = t[currentLang];

  const [isMounted, setIsMounted] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<AgeResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedDate = localStorage.getItem("age_birthdate");
      if (savedDate) setBirthDate(savedDate);
      const savedResult = localStorage.getItem("age_result");
      if (savedResult) setResult(JSON.parse(savedResult));
    } catch (e) {
      console.warn("Hafızadan veri okunamadı.");
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem("age_birthdate", birthDate);
        if (result) {
          localStorage.setItem("age_result", JSON.stringify(result));
        } else {
          localStorage.removeItem("age_result");
        }
      } catch (e) {
        console.warn("Hafızaya kaydedilemedi.");
      }
    }
  }, [birthDate, result, isMounted]);

  const handleCalculate = () => {
    setError("");
    if (!birthDate) {
      setError(texts.errEmpty);
      setResult(null);
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();

    if (isNaN(birth.getTime())) {
      setError(texts.errFormat);
      setResult(null);
      return;
    }

    if (birth > today) {
      setError(texts.errFuture);
      setResult(null);
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonthEnd.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let nextBirthday = new Date(todayZero.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < todayZero) {
      nextBirthday = new Date(todayZero.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysUntilNextBirthday = Math.round(
      (nextBirthday.getTime() - todayZero.getTime()) / (1000 * 60 * 60 * 24)
    );

    const dayOfWeek = new Intl.DateTimeFormat(texts.locale, {
      weekday: "long",
    }).format(birth);

    setResult({ years, months, days, totalDays, daysUntilNextBirthday, dayOfWeek });
  };

  const handleReset = () => {
    setBirthDate("");
    setResult(null);
    setError("");
    localStorage.removeItem("age_birthdate");
    localStorage.removeItem("age_result");
  };

  if (!isMounted) return null;

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-pink-500/10 text-pink-500 ring-1 ring-pink-500/20">
          <Cake className="size-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">{texts.title}</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{texts.subtitle}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">{texts.dob}</label>
          <Input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            min="1000-01-01"
            max="9999-12-31"
            className="w-full text-sm font-mono"
          />
        </div>

        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={handleCalculate} className="flex-1 font-semibold">{texts.calcBtn}</Button>
          <Button onClick={handleReset} variant="outline" className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10">
            {texts.resetBtn}
          </Button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-xl border border-border/50">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold font-mono text-pink-500">{result.years}</span>
                  <span className="text-xs text-muted-foreground">{texts.years}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold font-mono text-pink-500">{result.months}</span>
                  <span className="text-xs text-muted-foreground">{texts.months}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold font-mono text-pink-500">{result.days}</span>
                  <span className="text-xs text-muted-foreground">{texts.days}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-muted/30 rounded-lg border border-border/40 text-center">
                <div className="text-muted-foreground mb-1">{texts.totalDays}</div>
                <div className="font-bold font-mono">{result.totalDays.toLocaleString(texts.locale)}</div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg border border-border/40 text-center">
                <div className="text-muted-foreground mb-1">{texts.nextBday}</div>
                <div className="font-bold font-mono">
                  {result.daysUntilNextBirthday === 0
                    ? texts.today
                    : `${result.daysUntilNextBirthday} ${texts.daysSuffix}`}
                </div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg border border-border/40 text-center">
                <div className="text-muted-foreground mb-1">{texts.bornOn}</div>
                <div className="font-bold capitalize">{result.dayOfWeek}</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}