"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n.config";

const uiText: Record<
  Locale,
  {
    label: string;
    titleLabel: string;
    titlePlaceholder: string;
    start: string;
    reset: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    finished: string;
    pickFuture: string;
  }
> = {
  tr: {
    label: "Hedef tarih ve saat",
    titleLabel: "Başlık (opsiyonel)",
    titlePlaceholder: "Örn. Yılbaşı, Doğum Günü, Sınav...",
    start: "Geri Sayımı Başlat",
    reset: "Sıfırla",
    days: "Gün",
    hours: "Saat",
    minutes: "Dakika",
    seconds: "Saniye",
    finished: "Süre doldu! 🎉",
    pickFuture: "Lütfen gelecekte bir tarih seçin.",
  },
  en: {
    label: "Target date and time",
    titleLabel: "Title (optional)",
    titlePlaceholder: "e.g. New Year, Birthday, Exam...",
    start: "Start Countdown",
    reset: "Reset",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    finished: "Time's up! 🎉",
    pickFuture: "Please pick a date in the future.",
  },
  es: {
    label: "Fecha y hora objetivo",
    titleLabel: "Título (opcional)",
    titlePlaceholder: "Ej. Año Nuevo, Cumpleaños, Examen...",
    start: "Iniciar Cuenta Atrás",
    reset: "Reiniciar",
    days: "Días",
    hours: "Horas",
    minutes: "Minutos",
    seconds: "Segundos",
    finished: "¡Se acabó el tiempo! 🎉",
    pickFuture: "Por favor elige una fecha futura.",
  },
};

type TimeLeft = { d: number; h: number; m: number; s: number };

function diffToParts(ms: number): TimeLeft {
  const clamped = Math.max(ms, 0);
  const d = Math.floor(clamped / (1000 * 60 * 60 * 24));
  const h = Math.floor((clamped / (1000 * 60 * 60)) % 24);
  const m = Math.floor((clamped / (1000 * 60)) % 60);
  const s = Math.floor((clamped / 1000) % 60);
  return { d, h, m, s };
}

export default function CountdownTimerTool({ lang }: { lang: Locale }) {
  const t = uiText[lang];
  const [targetDate, setTargetDate] = useState("");
  const [title, setTitle] = useState("");
  const [activeTarget, setActiveTarget] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ d: 0, h: 0, m: 0, s: 0 });
  const [error, setError] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function handleStart() {
    if (!targetDate) return;
    const targetMs = new Date(targetDate).getTime();
    if (Number.isNaN(targetMs) || targetMs <= Date.now()) {
      setError(t.pickFuture);
      return;
    }
    setError("");
    setActiveTarget(targetMs);

    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(diffToParts(targetMs - Date.now()));
    intervalRef.current = setInterval(() => {
      const remaining = targetMs - Date.now();
      setTimeLeft(diffToParts(remaining));
      if (remaining <= 0 && intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }, 1000);
  }

  function handleReset() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActiveTarget(null);
    setTargetDate("");
    setTitle("");
    setError("");
    setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
  }

  const isFinished = activeTarget !== null && activeTarget - Date.now() <= 0;

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-10 space-y-6">
      {activeTarget === null ? (
        <div className="space-y-4 max-w-md mx-auto">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              {t.titleLabel}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.titlePlaceholder}
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              {t.label}
            </label>
            <input
              type="datetime-local"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-400"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            onClick={handleStart}
            className="w-full rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium py-2.5 hover:opacity-90 transition-opacity"
          >
            {t.start}
          </button>
        </div>
      ) : (
        <div className="space-y-6 text-center">
          {title && (
            <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
              {title}
            </h3>
          )}

          {isFinished ? (
            <p className="text-2xl font-bold">{t.finished}</p>
          ) : (
            <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto">
              {[
                { value: timeLeft.d, label: t.days },
                { value: timeLeft.h, label: t.hours },
                { value: timeLeft.m, label: t.minutes },
                { value: timeLeft.s, label: t.seconds },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 py-4"
                >
                  <div className="text-3xl font-bold tabular-nums">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleReset}
            className="rounded-lg border border-zinc-300 dark:border-zinc-700 px-5 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {t.reset}
          </button>
        </div>
      )}
    </div>
  );
}
