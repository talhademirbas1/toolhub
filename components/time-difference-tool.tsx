"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";

interface TimeDifferenceToolProps {
  lang: string;
}

export default function TimeDifferenceTool({ lang }: TimeDifferenceToolProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  const [mode, setMode] = useState<"datetime" | "date" | "time">("datetime");
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");
  const [result, setResult] = useState<{
    days?: number;
    hours?: number;
    minutes?: number;
    totalDays?: number;
  } | null>(null);

  const [error, setError] = useState("");

  // 1. SAYFA YÜKLENDİKTEN SONRA HAFIZAYI KONTROL ET (Hydration Koruması)
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedMode = localStorage.getItem("td_mode");
      if (savedMode) setMode(savedMode as any);

      const savedStart = localStorage.getItem("td_start");
      if (savedStart) setStartValue(savedStart);

      const savedEnd = localStorage.getItem("td_end");
      if (savedEnd) setEndValue(savedEnd);

      const savedResult = localStorage.getItem("td_result");
      if (savedResult) setResult(JSON.parse(savedResult));
    } catch (error) {
      console.warn("Hafızadan veri okunamadı.");
    }
  }, []);

  // 2. DEĞİŞİKLİK YAPILDIKÇA HAFIZAYI GÜNCELLE
  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem("td_mode", mode);
        localStorage.setItem("td_start", startValue);
        localStorage.setItem("td_end", endValue);
        if (result) {
          localStorage.setItem("td_result", JSON.stringify(result));
        } else {
          localStorage.removeItem("td_result");
        }
      } catch (error) {
        console.warn("Hafızaya kaydedilemedi.");
      }
    }
  }, [mode, startValue, endValue, result, isMounted]);

  const handleCalculate = () => {
    setError("");
    if (!startValue || !endValue) {
      setError(lang === "tr" ? "Lütfen tüm alanları doldurun." : "Please fill in all fields.");
      setResult(null);
      return;
    }

    if (mode === "datetime") {
      const start = new Date(startValue).getTime();
      const end = new Date(endValue).getTime();

      if (isNaN(start) || isNaN(end)) {
        setError(lang === "tr" ? "Geçersiz tarih formatı." : "Invalid date format.");
        setResult(null);
        return;
      }

      const diffMs = end - start;
      if (diffMs < 0) {
        setError(lang === "tr" ? "Bitiş zamanı başlangıçtan önce olamaz." : "End time cannot be earlier than start.");
        setResult(null);
        return;
      }

      const minutes = Math.floor(diffMs / (1000 * 60)) % 60;
      const hours = Math.floor(diffMs / (1000 * 60 * 60)) % 24;
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      setResult({ days, hours, minutes });
    } else if (mode === "date") {
      const start = new Date(startValue).getTime();
      const end = new Date(endValue).getTime();

      if (isNaN(start) || isNaN(end)) {
        setError(lang === "tr" ? "Geçersiz tarih formatı." : "Invalid date format.");
        setResult(null);
        return;
      }

      const diffMs = end - start;
      if (diffMs < 0) {
        setError(lang === "tr" ? "Bitiş tarihi başlangıçtan önce olamaz." : "End date cannot be earlier than start.");
        setResult(null);
        return;
      }

      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      setResult({ totalDays });
    } else if (mode === "time") {
      const [startH, startM] = startValue.split(":").map(Number);
      const [endH, endM] = endValue.split(":").map(Number);

      const startTotalMins = startH * 60 + startM;
      const endTotalMins = endH * 60 + endM;

      let diffMins = endTotalMins - startTotalMins;
      if (diffMins < 0) {
        diffMins += 24 * 60;
      }

      const hours = Math.floor(diffMins / 60);
      const minutes = diffMins % 60;

      setResult({ hours, minutes });
    }
  };

  const handleReset = () => {
    setStartValue("");
    setEndValue("");
    setResult(null);
    setError("");
    localStorage.removeItem("td_start");
    localStorage.removeItem("td_end");
    localStorage.removeItem("td_result");
  };

  // Hydration hatasını önlemek için bileşen yüklenene kadar boş döndür
  if (!isMounted) return null;

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500 ring-1 ring-cyan-500/20">
          <Clock className="size-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">
            {lang === "tr" ? "Tarih ve Saat Farkı" : "Time Difference"}
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            {lang === "tr" ? "MyToolKit Zaman Aracı" : "MyToolKit Time Suite"}
          </p>
        </div>
        
        {/* Mod Seçim Sekmeleri */}
        <div className="flex justify-center gap-1 bg-muted p-1 rounded-lg text-xs mt-2">
          <button
            onClick={() => { setMode("datetime"); handleReset(); }}
            className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-all ${mode === "datetime" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {lang === "tr" ? "Tam Tarih & Saat" : "Date & Time"}
          </button>
          <button
            onClick={() => { setMode("date"); handleReset(); }}
            className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-all ${mode === "date" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {lang === "tr" ? "Sadece Tarih" : "Only Date"}
          </button>
          <button
            onClick={() => { setMode("time"); handleReset(); }}
            className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-all ${mode === "time" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {lang === "tr" ? "Sadece Saat" : "Only Time"}
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              {lang === "tr" ? "Başlangıç" : "Start"}
            </label>
            <Input
              type={mode === "date" ? "date" : mode === "time" ? "time" : "datetime-local"}
              value={startValue}
              onChange={(e) => setStartValue(e.target.value)}
              min={mode === "date" ? "1000-01-01" : mode === "time" ? undefined : "1000-01-01T00:00"}
              max={mode === "date" ? "9999-12-31" : mode === "time" ? undefined : "9999-12-31T23:59"}
              className="w-full text-sm font-mono truncate"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              {lang === "tr" ? "Bitiş" : "End"}
            </label>
            <Input
              type={mode === "date" ? "date" : mode === "time" ? "time" : "datetime-local"}
              value={endValue}
              onChange={(e) => setEndValue(e.target.value)}
              min={mode === "date" ? "1000-01-01" : mode === "time" ? undefined : "1000-01-01T00:00"}
              max={mode === "date" ? "9999-12-31" : mode === "time" ? undefined : "9999-12-31T23:59"}
              className="w-full text-sm font-mono truncate"
            />
          </div>
        </div>

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

        {result !== null && (
          <div className="mt-6 p-4 bg-muted/50 rounded-xl text-center border border-border/50">
            {mode === "datetime" && result.days !== undefined && (
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col"><span className="text-3xl font-bold font-mono text-cyan-500">{result.days}</span><span className="text-xs text-muted-foreground">{lang === "tr" ? "Gün" : "Days"}</span></div>
                <div className="flex flex-col"><span className="text-3xl font-bold font-mono text-cyan-500">{result.hours}</span><span className="text-xs text-muted-foreground">{lang === "tr" ? "Saat" : "Hours"}</span></div>
                <div className="flex flex-col"><span className="text-3xl font-bold font-mono text-cyan-500">{result.minutes}</span><span className="text-xs text-muted-foreground">{lang === "tr" ? "Dakika" : "Mins"}</span></div>
              </div>
            )}
            {mode === "date" && result.totalDays !== undefined && (
              <div className="flex flex-col items-center py-2">
                <span className="text-3xl font-bold font-mono text-cyan-500">{result.totalDays}</span>
                <span className="text-xs text-muted-foreground mt-1">{lang === "tr" ? "Toplam Gün Farkı" : "Total Days Difference"}</span>
              </div>
            )}
            {mode === "time" && result.hours !== undefined && (
              <div className="grid grid-cols-2 gap-4 py-1">
                <div className="flex flex-col"><span className="text-3xl font-bold font-mono text-cyan-500">{result.hours}</span><span className="text-xs text-muted-foreground">{lang === "tr" ? "Saat" : "Hours"}</span></div>
                <div className="flex flex-col"><span className="text-3xl font-bold font-mono text-cyan-500">{result.minutes}</span><span className="text-xs text-muted-foreground">{lang === "tr" ? "Dakika" : "Minutes"}</span></div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}