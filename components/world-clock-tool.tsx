"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, ArrowRightLeft } from "lucide-react";

interface WorldClockToolProps {
  lang: string;
}

const CITIES = [
  { name: "Istanbul (TR)", zone: "Europe/Istanbul" },
  { name: "London (UK)", zone: "Europe/London" },
  { name: "New York (US)", zone: "America/New_York" },
  { name: "Tokyo (JP)", zone: "Asia/Tokyo" },
  { name: "Berlin (DE)", zone: "Europe/Berlin" },
  { name: "Dubai (AE)", zone: "Asia/Dubai" },
  { name: "Paris (FR)", zone: "Europe/Paris" },
  { name: "Sydney (AU)", zone: "Australia/Sydney" },
];

export default function WorldClockTool({ lang }: WorldClockToolProps) {
  const [isMounted, setIsMounted] = useState(false);

  const [city1, setCity1] = useState("Europe/Istanbul");
  const [city2, setCity2] = useState("America/New_York");
  const [time1, setTime1] = useState<string>("");
  const [time2, setTime2] = useState<string>("");
  const [date1, setDate1] = useState<string>("");
  const [date2, setDate2] = useState<string>("");
  const [diffText, setDiffText] = useState<string>("");

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedCity1 = localStorage.getItem("wc_city1");
      if (savedCity1) setCity1(savedCity1);

      const savedCity2 = localStorage.getItem("wc_city2");
      if (savedCity2) setCity2(savedCity2);
    } catch (error) {
      console.warn("Hafızadan veri okunamadı.");
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem("wc_city1", city1);
        localStorage.setItem("wc_city2", city2);
      } catch (error) {
        console.warn("Hafızaya kaydedilemedi.");
      }
    }
  }, [city1, city2, isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    const updateTimes = () => {
      const now = new Date();

      try {
        const t1 = new Intl.DateTimeFormat("en-GB", {
          timeZone: city1,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now);

        const d1 = new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-US", {
          timeZone: city1,
          weekday: "short",
          month: "short",
          day: "numeric",
        }).format(now);

        const t2 = new Intl.DateTimeFormat("en-GB", {
          timeZone: city2,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now);

        const d2 = new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-US", {
          timeZone: city2,
          weekday: "short",
          month: "short",
          day: "numeric",
        }).format(now);

        setTime1(t1);
        setDate1(d1);
        setTime2(t2);
        setDate2(d2);

        const getOffsetHours = (zone: string, date: Date) => {
          const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
          const tzDate = new Date(date.toLocaleString("en-US", { timeZone: zone }));
          return (tzDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60);
        };

        const offset1 = getOffsetHours(city1, now);
        const offset2 = getOffsetHours(city2, now);
        const diff = offset2 - offset1;

        const cityName1 = CITIES.find((c) => c.zone === city1)?.name.split(" ")[0] || "";
        const cityName2 = CITIES.find((c) => c.zone === city2)?.name.split(" ")[0] || "";

        if (diff === 0) {
          setDiffText(lang === "tr" ? "Aynı zaman dilimindeler" : "Same time zone");
        } else {
          const sign = diff > 0 ? "+" : "";
          setDiffText(
            lang === "tr"
              ? `${cityName2}, ${cityName1} konumundan ${sign}${diff} saat ileride`
              : `${cityName2} is ${sign}${diff} hours ahead of ${cityName1}`
          );
        }
      } catch (e) {
        console.error("Zaman dilimi hesaplama hatası", e);
      }
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [city1, city2, isMounted, lang]);

  const handleSwap = () => {
    const temp = city1;
    setCity1(city2);
    setCity2(temp);
  };

  if (!isMounted) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      <Card className="shadow-xl">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 ring-1 ring-sky-400/20">
            <Globe className="size-6" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">
              {lang === "tr" ? "Dünya Saatleri & Saat Farkı" : "World Clock & Time Difference"}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              {lang === "tr" ? "Havalimanı Tarzı Canlı Zaman Karşılaştırıcı" : "Airport-Style Live Time Comparator"}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
            
            <div className="space-y-3 bg-muted/30 p-4 rounded-xl border border-border/50 text-center">
              <select
                value={city1}
                onChange={(e) => setCity1(e.target.value)}
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm font-medium focus:ring-2 focus:ring-sky-500 outline-none"
              >
                {CITIES.map((c) => (
                  <option key={c.zone} value={c.zone}>
                    {c.name}
                  </option>
                ))}
              </select>
              
              <div className="py-2">
                <div className="text-3xl font-extrabold tracking-tight text-sky-500 font-mono">
                  {time1 || "00:00:00"}
                </div>
                <div className="text-xs text-muted-foreground mt-1 font-medium">
                  {date1}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={handleSwap}
                className="rounded-full shadow-sm hover:bg-sky-500/10 hover:text-sky-500 transition-colors"
                title={lang === "tr" ? "Şehirleri Değiştir" : "Swap Cities"}
              >
                <ArrowRightLeft className="size-4" />
              </Button>
            </div>

            <div className="space-y-3 bg-muted/30 p-4 rounded-xl border border-border/50 text-center">
              <select
                value={city2}
                onChange={(e) => setCity2(e.target.value)}
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm font-medium focus:ring-2 focus:ring-sky-500 outline-none"
              >
                {CITIES.map((c) => (
                  <option key={c.zone} value={c.zone}>
                    {c.name}
                  </option>
                ))}
              </select>
              
              <div className="py-2">
                <div className="text-3xl font-extrabold tracking-tight text-emerald-500 font-mono">
                  {time2 || "00:00:00"}
                </div>
                <div className="text-xs text-muted-foreground mt-1 font-medium">
                  {date2}
                </div>
              </div>
            </div>

          </div>

          <div className="p-3 bg-sky-500/10 rounded-xl border border-sky-500/20 text-center">
            <p className="text-xs font-semibold text-sky-600 dark:text-sky-400">
              {diffText}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}