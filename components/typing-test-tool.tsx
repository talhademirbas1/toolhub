"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Keyboard, RotateCcw } from "lucide-react";

interface TypingTestToolProps {
  lang: string;
}

const WORD_LISTS = {
  tr: ["bilgisayar", "yazılım", "kodlama", "program", "donanım", "internet", "klavye", "ekran", "veri", "sunucu", "sistem", "güvenlik", "tasarım", "proje", "geliştirici", "teknoloji", "bellek", "işlemci", "ağ", "ağaç", "kalem", "defter", "masa", "kitap", "kahve", "müzik", "güneş", "yıldız", "telefon", "kulaklık", "pencere", "kapı", "çiçek", "bulut", "yağmur", "rüzgar", "şehir", "sokak", "araba", "tren", "uçak", "liman", "orman", "deniz", "nehir", "dağ", "tepe", "köprü", "yol", "saat", "yaz", "kış", "hava", "toprak", "yıldız", "gezegen", "bilgi", "okul", "öğrenci", "kitaplık", "yaprak", "kalp", "sevgi", "dostluk", "başarı", "hedef", "çalışma", "emek", "kazanç", "zaman", "saniye", "dakika", "hafta", "ay", "yıl", "asır", "tarih", "mühendis", "mimar", "doktor", "hastane", "sağlık", "spor", "futbol", "basketbol", "tenis", "koşu", "yüzme", "şarkı", "film", "tiyatro", "sanat", "resim", "müze", "saray", "kale", "bahçe", "meyve", "elma", "armut", "karpuz", "limon", "çilek"],
  en: ["computer", "software", "coding", "program", "hardware", "internet", "keyboard", "screen", "data", "server", "system", "security", "design", "project", "developer", "technology", "memory", "processor", "network", "pencil", "notebook", "desk", "book", "coffee", "music", "sun", "star", "phone", "headphone", "window", "door", "flower", "cloud", "rain", "wind", "city", "street", "car", "train", "plane", "port", "forest", "sea", "river", "mountain", "hill", "bridge", "road", "clock", "summer", "winter", "weather", "earth", "planet", "knowledge", "school", "student", "library", "leaf", "heart", "love", "friendship", "success", "goal", "work", "effort", "profit", "time", "second", "minute", "week", "month", "year", "century", "history", "engineer", "architect", "doctor", "hospital", "health", "sports", "football", "tennis", "running", "swimming", "song", "movie", "theater", "art", "painting", "museum", "palace", "castle", "garden", "fruit", "apple", "pear", "watermelon", "lemon", "strawberry"]
};

const generateRandomWords = (lang: string, count: number) => {
  const list = lang === "tr" ? WORD_LISTS.tr : WORD_LISTS.en;
  let result = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * list.length);
    result.push(list[randomIndex]);
  }
  return result.join(" ");
};

export default function TypingTestTool({ lang }: TypingTestToolProps) {
  const [isMounted, setIsMounted] = useState(false);

  const [testMode, setTestMode] = useState<"time-to-words" | "words-to-time">("time-to-words");
  const [selectedTime, setSelectedTime] = useState<number>(30); 
  const [customTimeInput, setCustomTimeInput] = useState<string>("30");
  const [selectedWordCount, setSelectedWordCount] = useState<number>(20); 
  const [customWordInput, setCustomWordInput] = useState<string>("20");

  const [targetWords, setTargetWords] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [resultMetric, setResultMetric] = useState<{ primary: string; secondary: string } | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedMode = localStorage.getItem("tt_mode");
      if (savedMode === "time-to-words" || savedMode === "words-to-time") {
        setTestMode(savedMode);
      }
      const savedTimeVal = localStorage.getItem("tt_time");
      if (savedTimeVal) {
        const parsed = Math.min(300, Math.max(1, parseInt(savedTimeVal, 10)));
        setSelectedTime(parsed);
        setCustomTimeInput(parsed.toString());
        setTimeLeft(parsed);
      }
      const savedWordsVal = localStorage.getItem("tt_words");
      if (savedWordsVal) {
        const parsed = Math.min(300, Math.max(1, parseInt(savedWordsVal, 10)));
        setSelectedWordCount(parsed);
        setCustomWordInput(parsed.toString());
      }
    } catch (e) {
      console.warn("Hafızadan okunamadı.");
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (testMode === "time-to-words") {
      const calculatedWordCount = Math.min(750, Math.max(30, Math.floor(selectedTime * 2.5)));
      setTargetWords(generateRandomWords(lang, calculatedWordCount).split(" "));
      setTimeLeft(selectedTime);
    } else {
      const safeWordCount = Math.min(300, Math.max(5, selectedWordCount));
      setTargetWords(generateRandomWords(lang, safeWordCount).split(" "));
    }

    try {
      localStorage.setItem("tt_mode", testMode);
      localStorage.setItem("tt_time", selectedTime.toString());
      localStorage.setItem("tt_words", selectedWordCount.toString());
    } catch (e) {
      console.warn("Hafızaya yazılamadı.");
    }
  }, [lang, testMode, selectedTime, selectedWordCount, isMounted]);

  const handleModeSwitch = (mode: "time-to-words" | "words-to-time") => {
    setTestMode(mode);
    if (mode === "time-to-words") {
      handleResetTime(selectedTime);
    } else {
      handleResetWords(selectedWordCount);
    }
  };

  const handleResetTime = (time = selectedTime) => {
    setInputVal("");
    setStartTime(null);
    setTimeLeft(time);
    setElapsedTime(0);
    setIsFinished(false);
    setResultMetric(null);

    const calculatedWordCount = Math.min(750, Math.max(30, Math.floor(time * 2.5)));
    setTargetWords(generateRandomWords(lang, calculatedWordCount).split(" "));

    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleResetWords = (wordCount = selectedWordCount) => {
    setInputVal("");
    setStartTime(null);
    setTimeLeft(30);
    setElapsedTime(0);
    setIsFinished(false);
    setResultMetric(null);
    const safeWordCount = Math.min(300, Math.max(5, wordCount));
    setTargetWords(generateRandomWords(lang, safeWordCount).split(" "));
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    let num = parseInt(val, 10);
    if (isNaN(num)) num = 1;
    if (num > 300) num = 300; 

    setCustomTimeInput(num.toString());
    setSelectedTime(num);
    handleResetTime(num);
  };

  const handleCustomWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    let num = parseInt(val, 10);
    if (isNaN(num)) num = 5;
    if (num > 300) num = 300; 

    setCustomWordInput(num.toString());
    setSelectedWordCount(num);
    handleResetWords(num);
  };

  useEffect(() => {
    if (!startTime || isFinished) return;

    if (testMode === "time-to-words") {
      if (timeLeft > 0) {
        timerRef.current = setTimeout(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
      } else {
        finishTest();
      }
    } else {
      timerRef.current = setTimeout(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [startTime, timeLeft, elapsedTime, isFinished, testMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!startTime && val.length > 0) {
      setStartTime(Date.now());
    }
    if (isFinished) return;

    if (val.endsWith(" ")) {
      const typedWords = val.trim().split(/\s+/);
      if (testMode === "words-to-time" && typedWords.length >= targetWords.length) {
        setInputVal(val);
        finishTest(val);
        return;
      }
      if (testMode === "time-to-words" && typedWords.length >= targetWords.length - 10) {
        setTargetWords((prev) => [...prev, ...generateRandomWords(lang, 50).split(" ")]);
      }
    }

    setInputVal(val);

    if (testMode === "words-to-time") {
      const typedWords = val.trim().split(/\s+/).filter(Boolean);
      if (typedWords.length >= targetWords.length && val.endsWith(" ")) {
        finishTest(val);
      }
    }
  };

  const finishTest = (currentInput = inputVal) => {
    setIsFinished(true);
    if (timerRef.current) clearTimeout(timerRef.current);

    const typedWordsArray = currentInput.trim().split(/\s+/).filter(Boolean);
    const wordsTyped = typedWordsArray.length;

    let primaryResult = "";
    let secondaryResult = "";

    if (testMode === "time-to-words") {
      const timeSpentMinutes = (selectedTime - timeLeft > 0 ? selectedTime - timeLeft : 1) / 60;
      const wpm = Math.round(wordsTyped / timeSpentMinutes);
      primaryResult = lang === "tr" ? `${wpm} WPM (Dakikada Kelime)` : `${wpm} WPM (Words Per Minute)`;
      secondaryResult = lang === "tr" ? `Toplam ${wordsTyped} kelime yazdınız.` : `You typed a total of ${wordsTyped} words.`;
    } else {
      const secondsSpent = elapsedTime > 0 ? elapsedTime : 1;
      primaryResult = lang === "tr" ? `${selectedWordCount} kelimeyi ${secondsSpent} saniyede yazdınız!` : `Typed ${selectedWordCount} words in ${secondsSpent} seconds!`;
      const calculatedWpm = Math.round((wordsTyped / secondsSpent) * 60);
      secondaryResult = lang === "tr" ? `Yaklaşık Hız: ${calculatedWpm} WPM` : `Approximate Speed: ${calculatedWpm} WPM`;
    }

    let correctChars = 0;
    let totalChars = currentInput.length;
    const fullTargetStr = targetWords.join(" ");

    for (let i = 0; i < currentInput.length; i++) {
      if (currentInput[i] === fullTargetStr[i]) correctChars++;
    }
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;

    setResultMetric({
      primary: primaryResult,
      secondary: `${secondaryResult} — ${lang === "tr" ? "Doğruluk" : "Accuracy"}: %${accuracy}`
    });
  };

  if (!isMounted) return null;

  const typedWords = inputVal.split(" ");
  const activeWordIndex = typedWords.length - 1;

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      <Card className="shadow-xl">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500 ring-1 ring-violet-500/20">
            <Keyboard className="size-6" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">
              {lang === "tr" ? "Klavye Hız Testi" : "Typing Speed Test"}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              {lang === "tr" ? "Rekor seviyesinde zengin kelime havuzu ile hızını test et" : "Test your speed with a record-level rich word pool"}
            </p>
          </div>

          <div className="flex justify-center gap-1 bg-muted p-1 rounded-lg text-xs mt-2">
            <button
              onClick={() => handleModeSwitch("time-to-words")}
              className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-all ${testMode === "time-to-words" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {lang === "tr" ? "Süreye Göre Kelime (WPM)" : "Time to Words"}
            </button>
            <button
              onClick={() => handleModeSwitch("words-to-time")}
              className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-all ${testMode === "words-to-time" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {lang === "tr" ? "Kelimeye Göre Süre (Sn)" : "Words to Time"}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-muted-foreground">
            {testMode === "time-to-words" ? (
              <div className="flex flex-wrap gap-1.5 items-center justify-center">
                <span>{lang === "tr" ? "Süre (sn):" : "Time (sec):"}</span>
                {[15, 30, 60, 120].map((t) => (
                  <button
                    key={t}
                    onClick={() => { 
                      setSelectedTime(t); 
                      setCustomTimeInput(t.toString());
                      handleResetTime(t); 
                    }}
                    className={`px-2.5 py-1 rounded border transition-colors ${selectedTime === t ? "bg-violet-500 text-white border-violet-500" : "border-border hover:bg-muted"}`}
                  >
                    {t}s
                  </button>
                ))}
                <div className="flex items-center gap-1 ml-2">
                  <span className="text-[11px]">{lang === "tr" ? "Özel:" : "Custom:"}</span>
                  <Input
                    type="number"
                    min="1"
                    max="300"
                    value={customTimeInput}
                    onChange={handleCustomTimeChange}
                    className="h-7 w-16 text-xs text-center font-mono p-1"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5 items-center justify-center">
                <span>{lang === "tr" ? "Kelime Sayısı:" : "Word Count:"}</span>
                {[10, 25, 50, 100].map((w) => (
                  <button
                    key={w}
                    onClick={() => { 
                      setSelectedWordCount(w); 
                      setCustomWordInput(w.toString());
                      handleResetWords(w); 
                    }}
                    className={`px-2.5 py-1 rounded border transition-colors ${selectedWordCount === w ? "bg-violet-500 text-white border-violet-500" : "border-border hover:bg-muted"}`}
                  >
                    {w}
                  </button>
                ))}
                <div className="flex items-center gap-1 ml-2">
                  <span className="text-[11px]">{lang === "tr" ? "Özel:" : "Custom:"}</span>
                  <Input
                    type="number"
                    min="1"
                    max="300"
                    value={customWordInput}
                    onChange={handleCustomWordChange}
                    className="h-7 w-16 text-xs text-center font-mono p-1"
                  />
                </div>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center bg-muted/40 p-3 rounded-xl border border-border/50">
            <div className="text-xs text-muted-foreground">
              {testMode === "time-to-words" ? (lang === "tr" ? "Kalan Süre" : "Time Left") : (lang === "tr" ? "Geçen Süre" : "Elapsed Time")}
            </div>
            <div className="text-2xl font-bold font-mono text-violet-500">
              {testMode === "time-to-words" ? `${timeLeft}s` : `${elapsedTime}s`}
            </div>
          </div>

          <div className="p-5 bg-muted/30 rounded-xl border border-border/50 text-base leading-loose font-mono select-none max-h-44 overflow-y-auto flex flex-wrap gap-x-2 gap-y-1">
            {targetWords.map((word, wIdx) => {
              const isCurrent = wIdx === activeWordIndex;
              const isPast = wIdx < activeWordIndex;
              const typedWord = isPast ? typedWords[wIdx] || "" : isCurrent ? typedWords[activeWordIndex] || "" : "";

              return (
                <span
                  key={wIdx}
                  className={`px-1 rounded ${
                    isCurrent
                      ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold underline"
                      : isPast
                      ? typedWord === word
                        ? "text-emerald-500"
                        : "text-rose-500 line-through"
                      : "text-muted-foreground/60"
                  }`}
                >
                  {word.split("").map((char, cIdx) => {
                    let charColor = "";
                    if (isCurrent && cIdx < typedWord.length) {
                      charColor = typedWord[cIdx] === char ? "text-emerald-500" : "text-rose-500 bg-rose-500/20";
                    }
                    return (
                      <span key={cIdx} className={charColor}>
                        {char}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </div>

          <input
            type="text"
            value={inputVal}
            onChange={handleInputChange}
            disabled={isFinished}
            placeholder={lang === "tr" ? "Kelimeleri buraya yazmaya başla (boşluk tuşunu kullan)..." : "Start typing words here (use space)..."}
            className="w-full h-12 p-3 rounded-xl border border-input bg-background text-sm font-mono focus:ring-2 focus:ring-violet-500 outline-none"
          />

          {isFinished && resultMetric ? (
            <div className="p-4 bg-violet-500/10 rounded-xl border border-violet-500/20 text-center space-y-2">
              <div className="font-bold text-violet-600 dark:text-violet-400">
                {lang === "tr" ? "🎉 Test Tamamlandı!" : "🎉 Test Completed!"}
              </div>
              <div className="text-base font-semibold text-foreground">
                {resultMetric.primary}
              </div>
              <div className="text-xs text-muted-foreground">
                {resultMetric.secondary}
              </div>
              <Button onClick={() => testMode === "time-to-words" ? handleResetTime() : handleResetWords()} className="w-full mt-2 gap-2">
                <RotateCcw className="size-4" />
                {lang === "tr" ? "Tekrar Dene" : "Try Again"}
              </Button>
            </div>
          ) : (
            <Button onClick={() => testMode === "time-to-words" ? handleResetTime() : handleResetWords()} variant="outline" className="w-full gap-2">
              <RotateCcw className="size-4" />
              {lang === "tr" ? "Sıfırla" : "Reset"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}