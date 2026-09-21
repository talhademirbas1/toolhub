"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Timer, Play, Pause, RotateCcw, Flag } from "lucide-react";

interface StopwatchToolProps {
  lang: string;
}

interface Lap {
  id: number;
  time: string;
}

const t = {
  tr: {
    title: "Kronometre",
    subtitle: "MyToolKit Zaman Aracı",
    swTab: "Kronometre",
    cdTab: "Zamanlayıcı",
    start: "Başlat",
    pause: "Durdur",
    reset: "Sıfırla",
    lap: "Tur",
    timesUp: "Süre Bitti!",
    hours: "Saat",
    minutes: "Dakika",
    seconds: "Saniye",
    lapTimesHeader: "TUR ZAMANLARI",
    timeHeader: "SÜRE",
    lapPrefix: "Tur"
  },
  en: {
    title: "Stopwatch",
    subtitle: "MyToolKit Timer Suite",
    swTab: "Stopwatch",
    cdTab: "Countdown",
    start: "Start",
    pause: "Pause",
    reset: "Reset",
    lap: "Lap",
    timesUp: "Time's Up!",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    lapTimesHeader: "LAP TIMES",
    timeHeader: "TIME",
    lapPrefix: "Lap"
  },
  es: {
    title: "Cronómetro",
    subtitle: "Herramienta de Tiempo MyToolKit",
    swTab: "Cronómetro",
    cdTab: "Temporizador",
    start: "Iniciar",
    pause: "Pausar",
    reset: "Reiniciar",
    lap: "Vuelta",
    timesUp: "¡Tiempo Agotado!",
    hours: "Horas",
    minutes: "Minutos",
    seconds: "Segundos",
    lapTimesHeader: "TIEMPOS DE VUELTA",
    timeHeader: "TIEMPO",
    lapPrefix: "Vuelta"
  }
} as const;

export default function StopwatchTool({ lang }: StopwatchToolProps) {
  const currentLang = (lang === "es" || lang === "en" || lang === "tr") ? lang : "tr";
  const texts = t[currentLang];

  const [isMounted, setIsMounted] = useState(false);
  const [mode, setMode] = useState<"stopwatch" | "countdown">("stopwatch");

  const [swMs, setSwMs] = useState(0);
  const [swRunning, setSwRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);

  const [cdHours, setCdHours] = useState("0");
  const [cdMinutes, setCdMinutes] = useState("0");
  const [cdSeconds, setCdSeconds] = useState("0");
  const [cdTimeLeftMs, setCdTimeLeftMs] = useState(0);
  const [cdRunning, setCdRunning] = useState(false);

  const swTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cdTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedMode = localStorage.getItem("sw_mode");
      if (savedMode) setMode(savedMode as any);

      const isRunning = localStorage.getItem("sw_running") === "true";
      const startTimestamp = Number(localStorage.getItem("sw_start_timestamp") || "0");
      const accumulatedMs = Number(localStorage.getItem("sw_accumulated_ms") || "0");

      if (isRunning && startTimestamp > 0) {
        const currentElapsed = Date.now() - startTimestamp + accumulatedMs;
        setSwMs(currentElapsed);
        setSwRunning(true);
      } else {
        setSwMs(accumulatedMs);
      }

      const savedLaps = localStorage.getItem("sw_laps");
      if (savedLaps) setLaps(JSON.parse(savedLaps));

      const savedH = localStorage.getItem("cd_h") || "0";
      const savedM = localStorage.getItem("cd_m") || "0";
      const savedS = localStorage.getItem("cd_s") || "0";
      setCdHours(savedH);
      setCdMinutes(savedM);
      setCdSeconds(savedS);

      const isCdRunning = localStorage.getItem("cd_running") === "true";
      const cdTargetEnd = Number(localStorage.getItem("cd_target_end") || "0");
      const cdSavedLeft = Number(localStorage.getItem("cd_left_ms") || "0");

      if (isCdRunning && cdTargetEnd > 0) {
        const remaining = cdTargetEnd - Date.now();
        if (remaining > 0) {
          setCdTimeLeftMs(remaining);
          setCdRunning(true);
        } else {
          setCdTimeLeftMs(0);
          setCdRunning(false);
          localStorage.setItem("cd_running", "false");
        }
      } else {
        setCdTimeLeftMs(cdSavedLeft);
      }
    } catch (e) {
      console.warn("Storage okuma hatası.");
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (swRunning) {
      let startTimestamp = Number(localStorage.getItem("sw_start_timestamp"));
      const accumulatedMs = Number(localStorage.getItem("sw_accumulated_ms") || "0");

      if (!startTimestamp || startTimestamp === 0) {
        startTimestamp = Date.now();
        localStorage.setItem("sw_start_timestamp", startTimestamp.toString());
      }

      localStorage.setItem("sw_running", "true");

      swTimerRef.current = setInterval(() => {
        const now = Date.now();
        const start = Number(localStorage.getItem("sw_start_timestamp") || now);
        const accumulated = Number(localStorage.getItem("sw_accumulated_ms") || "0");
        const currentMs = now - start + accumulated;
        
        setSwMs(currentMs);
      }, 10);
    } else {
      if (swTimerRef.current) clearInterval(swTimerRef.current);
      localStorage.setItem("sw_running", "false");
      localStorage.setItem("sw_accumulated_ms", swMs.toString());
      localStorage.setItem("sw_start_timestamp", "0");
    }

    return () => {
      if (swTimerRef.current) clearInterval(swTimerRef.current);
    };
  }, [swRunning, isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    if (cdRunning && cdTimeLeftMs > 0) {
      let targetEnd = Number(localStorage.getItem("cd_target_end"));
      if (!targetEnd || targetEnd === 0) {
        targetEnd = Date.now() + cdTimeLeftMs;
        localStorage.setItem("cd_target_end", targetEnd.toString());
      }

      localStorage.setItem("cd_running", "true");

      cdTimerRef.current = setInterval(() => {
        const end = Number(localStorage.getItem("cd_target_end") || Date.now());
        const remaining = end - Date.now();

        if (remaining <= 0) {
          setCdTimeLeftMs(0);
          setCdRunning(false);
          localStorage.setItem("cd_running", "false");
          localStorage.setItem("cd_target_end", "0");
          clearInterval(cdTimerRef.current!);
        } else {
          setCdTimeLeftMs(remaining);
          localStorage.setItem("cd_left_ms", remaining.toString());
        }
      }, 10);
    } else {
      if (cdTimerRef.current) clearInterval(cdTimerRef.current);
      localStorage.setItem("cd_running", "false");
      localStorage.setItem("cd_target_end", "0");
      localStorage.setItem("cd_left_ms", cdTimeLeftMs.toString());
    }

    return () => {
      if (cdTimerRef.current) clearInterval(cdTimerRef.current);
    };
  }, [cdRunning, isMounted]);

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const mins = Math.floor((ms % 3600000) / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const centisecs = Math.floor((ms % 1000) / 10);

    return `${hours > 0 ? hours.toString().padStart(2, "0") + ":" : ""}${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${centisecs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleLap = () => {
    const currentTimeStr = formatTime(swMs);
    const newLap: Lap = {
      id: laps.length + 1,
      time: currentTimeStr,
    };
    const updated = [newLap, ...laps];
    setLaps(updated);
    try {
      localStorage.setItem("sw_laps", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleSetCdInput = (h: string, m: string, s: string) => {
    setCdHours(h);
    setCdMinutes(m);
    setCdSeconds(s);

    const hNum = parseInt(h || "0");
    const mNum = parseInt(m || "0");
    const sNum = parseInt(s || "0");

    const total = (hNum * 3600 + mNum * 60 + sNum) * 1000;
    setCdTimeLeftMs(total);

    localStorage.setItem("cd_h", h);
    localStorage.setItem("cd_m", m);
    localStorage.setItem("cd_s", s);
    localStorage.setItem("cd_left_ms", total.toString());
    localStorage.setItem("cd_target_end", "0");
  };

  if (!isMounted) return null;

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl border-border/60">
      <CardHeader className="text-center space-y-3 pb-4">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500 ring-1 ring-rose-500/20">
          <Timer className="size-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">{texts.title}</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{texts.subtitle}</p>
        </div>

        <div className="flex justify-center gap-1 bg-muted p-1 rounded-lg text-xs mt-2">
          <button
            onClick={() => { setMode("stopwatch"); localStorage.setItem("sw_mode", "stopwatch"); }}
            className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-all ${mode === "stopwatch" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {texts.swTab}
          </button>
          <button
            onClick={() => { setMode("countdown"); localStorage.setItem("sw_mode", "countdown"); }}
            className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-all ${mode === "countdown" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {texts.cdTab}
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 text-center">
        {mode === "stopwatch" ? (
          <>
            <div className="py-8 bg-muted/30 rounded-2xl border border-border/50">
              <span className="text-5xl sm:text-6xl font-mono font-bold tracking-wider text-foreground">
                {formatTime(swMs)}
              </span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <Button
                onClick={() => setSwRunning(!swRunning)}
                className={`w-36 font-semibold gap-2 text-white ${
                  swRunning 
                    ? "bg-rose-600 hover:bg-rose-700" 
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {swRunning ? <Pause className="size-4" /> : <Play className="size-4" />}
                {swRunning ? texts.pause : texts.start}
              </Button>

              {swRunning && (
                <Button onClick={handleLap} variant="outline" className="gap-2">
                  <Flag className="size-4" />
                  {texts.lap}
                </Button>
              )}

              <Button
                onClick={() => {
                  setSwRunning(false);
                  setSwMs(0);
                  setLaps([]);
                  localStorage.removeItem("sw_accumulated_ms");
                  localStorage.removeItem("sw_start_timestamp");
                  localStorage.removeItem("sw_laps");
                  localStorage.setItem("sw_running", "false");
                }}
                variant="outline"
                className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 px-4"
              >
                <RotateCcw className="size-4 mr-1" />
                {texts.reset}
              </Button>
            </div>

            {laps.length > 0 && (
              <div className="border border-border/60 rounded-xl overflow-hidden bg-muted/20 text-xs font-mono text-left">
                <div className="bg-muted/50 px-4 py-2 font-semibold text-muted-foreground border-b border-border/40 flex justify-between">
                  <span>{texts.lapTimesHeader}</span>
                  <span>{texts.timeHeader}</span>
                </div>
                <div className="max-h-40 overflow-y-auto divide-y divide-border/30">
                  {laps.map((lap) => (
                    <div key={lap.id} className="flex justify-between px-4 py-2">
                      <span className="text-muted-foreground">
                        {texts.lapPrefix} {lap.id}
                      </span>
                      <span className="font-bold">{lap.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="py-6 bg-muted/30 rounded-2xl border border-border/50 space-y-2">
              <span className="text-5xl sm:text-6xl font-mono font-bold tracking-wider text-foreground block">
                {formatTime(cdTimeLeftMs)}
              </span>
              {cdTimeLeftMs === 0 && (
                <span className="text-sm font-semibold text-rose-500 animate-pulse block">
                  {texts.timesUp}
                </span>
              )}
            </div>

            <div className="flex items-center justify-center gap-2">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground">{texts.hours}</span>
                <Input
                  type="number"
                  value={cdHours}
                  onChange={(e) => handleSetCdInput(e.target.value, cdMinutes, cdSeconds)}
                  disabled={cdRunning}
                  className="w-16 text-center font-mono"
                  min="0"
                />
              </div>
              <span className="text-xl font-bold mt-5">:</span>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground">{texts.minutes}</span>
                <Input
                  type="number"
                  value={cdMinutes}
                  onChange={(e) => handleSetCdInput(cdHours, e.target.value, cdSeconds)}
                  disabled={cdRunning}
                  className="w-16 text-center font-mono"
                  min="0"
                  max="59"
                />
              </div>
              <span className="text-xl font-bold mt-5">:</span>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground">{texts.seconds}</span>
                <Input
                  type="number"
                  value={cdSeconds}
                  onChange={(e) => handleSetCdInput(cdHours, cdMinutes, e.target.value)}
                  disabled={cdRunning}
                  className="w-16 text-center font-mono"
                  min="0"
                  max="59"
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                onClick={() => setCdRunning(!cdRunning)}
                className={`w-36 font-semibold gap-2 text-white ${
                  cdRunning 
                    ? "bg-rose-600 hover:bg-rose-700" 
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {cdRunning ? <Pause className="size-4" /> : <Play className="size-4" />}
                {cdRunning ? texts.pause : texts.start}
              </Button>
              <Button
                onClick={() => {
                  setCdRunning(false);
                  handleSetCdInput("0", "0", "0");
                  localStorage.removeItem("cd_target_end");
                  localStorage.removeItem("cd_left_ms");
                  localStorage.setItem("cd_running", "false");
                }}
                variant="outline"
                className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 px-4"
              >
                <RotateCcw className="size-4 mr-1" />
                {texts.reset}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}