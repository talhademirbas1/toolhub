"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/i18n.config";

const uiText: Record<
  Locale,
  {
    modeBetween: string;
    modeAdd: string;
    startDate: string;
    endDate: string;
    daysToAdd: string;
    calculate: string;
    resultBetweenPrefix: string;
    resultBetweenSuffix: string;
    resultAddPrefix: string;
    resultAddSuffix: string;
    fillAll: string;
    weekendNote: string;
  }
> = {
  tr: {
    modeBetween: "İki Tarih Arası",
    modeAdd: "Tarihe Ekle",
    startDate: "Başlangıç tarihi",
    endDate: "Bitiş tarihi",
    daysToAdd: "Eklenecek iş günü sayısı",
    calculate: "Hesapla",
    resultBetweenPrefix: "İki tarih arasında",
    resultBetweenSuffix: "iş günü var.",
    resultAddPrefix: "Sonuç tarih:",
    resultAddSuffix: "",
    fillAll: "Lütfen tüm alanları doldurun.",
    weekendNote: "Cumartesi ve pazar günleri hariç tutulur, resmi tatiller dahil değildir.",
  },
  en: {
    modeBetween: "Between Two Dates",
    modeAdd: "Add to Date",
    startDate: "Start date",
    endDate: "End date",
    daysToAdd: "Business days to add",
    calculate: "Calculate",
    resultBetweenPrefix: "There are",
    resultBetweenSuffix: "business days between these dates.",
    resultAddPrefix: "Resulting date:",
    resultAddSuffix: "",
    fillAll: "Please fill in all fields.",
    weekendNote: "Saturdays and Sundays are excluded; public holidays are not accounted for.",
  },
  es: {
    modeBetween: "Entre Dos Fechas",
    modeAdd: "Añadir a una Fecha",
    startDate: "Fecha de inicio",
    endDate: "Fecha de fin",
    daysToAdd: "Días hábiles a añadir",
    calculate: "Calcular",
    resultBetweenPrefix: "Hay",
    resultBetweenSuffix: "días hábiles entre estas fechas.",
    resultAddPrefix: "Fecha resultante:",
    resultAddSuffix: "",
    fillAll: "Por favor completa todos los campos.",
    weekendNote: "Se excluyen sábados y domingos; los días festivos no se tienen en cuenta.",
  },
};

function countBusinessDays(start: Date, end: Date): number {
  let count = 0;
  const cur = new Date(start);
  const [a, b] = start <= end ? [start, end] : [end, start];
  cur.setTime(a.getTime());
  while (cur <= b) {
    const day = cur.getDay();
    if (day !== 0 && day !== 6) count++;
    cur.setDate(cur.getDate() + 1);
  }
  return count;
}

function addBusinessDays(start: Date, days: number): Date {
  const result = new Date(start);
  let remaining = days;
  const direction = days >= 0 ? 1 : -1;
  remaining = Math.abs(remaining);
  while (remaining > 0) {
    result.setDate(result.getDate() + direction);
    const day = result.getDay();
    if (day !== 0 && day !== 6) remaining--;
  }
  return result;
}

function formatDate(date: Date, lang: Locale): string {
  const localeMap: Record<Locale, string> = { tr: "tr-TR", en: "en-US", es: "es-ES" };
  return date.toLocaleDateString(localeMap[lang], {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
}

export default function BusinessDaysCalculatorTool({ lang }: { lang: Locale }) {
  const t = uiText[lang];
  const [mode, setMode] = useState<"between" | "add">("between");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [addStartDate, setAddStartDate] = useState("");
  const [daysToAdd, setDaysToAdd] = useState("");
  const [error, setError] = useState("");

  const betweenResult = useMemo(() => {
    if (mode !== "between" || !startDate || !endDate) return null;
    const s = new Date(startDate);
    const e = new Date(endDate);
    if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return null;
    return countBusinessDays(s, e);
  }, [mode, startDate, endDate]);

  const addResult = useMemo(() => {
    if (mode !== "add" || !addStartDate || !daysToAdd) return null;
    const s = new Date(addStartDate);
    const n = parseInt(daysToAdd, 10);
    if (Number.isNaN(s.getTime()) || Number.isNaN(n)) return null;
    return addBusinessDays(s, n);
  }, [mode, addStartDate, daysToAdd]);

  function handleCalculate() {
    if (mode === "between" && (!startDate || !endDate)) {
      setError(t.fillAll);
      return;
    }
    if (mode === "add" && (!addStartDate || !daysToAdd)) {
      setError(t.fillAll);
      return;
    }
    setError("");
  }

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-10 space-y-6">
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setMode("between")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            mode === "between"
              ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
              : "border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
          }`}
        >
          {t.modeBetween}
        </button>
        <button
          onClick={() => setMode("add")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            mode === "add"
              ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
              : "border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
          }`}
        >
          {t.modeAdd}
        </button>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        {mode === "between" ? (
          <>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {t.startDate}
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {t.endDate}
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-400"
              />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {t.startDate}
              </label>
              <input
                type="date"
                value={addStartDate}
                onChange={(e) => setAddStartDate(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {t.daysToAdd}
              </label>
              <input
                type="number"
                value={daysToAdd}
                onChange={(e) => setDaysToAdd(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-400"
              />
            </div>
          </>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          onClick={handleCalculate}
          className="w-full rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium py-2.5 hover:opacity-90 transition-opacity"
        >
          {t.calculate}
        </button>

        {mode === "between" && betweenResult !== null && (
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4 text-center">
            <p className="text-lg">
              {t.resultBetweenPrefix}{" "}
              <span className="text-2xl font-bold">{betweenResult}</span>{" "}
              {t.resultBetweenSuffix}
            </p>
          </div>
        )}

        {mode === "add" && addResult && (
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4 text-center">
            <p className="text-sm text-zinc-500">{t.resultAddPrefix}</p>
            <p className="text-xl font-bold mt-1">{formatDate(addResult, lang)}</p>
          </div>
        )}

        <p className="text-xs text-zinc-500 text-center">{t.weekendNote}</p>
      </div>
    </div>
  );
}
