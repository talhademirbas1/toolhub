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
  tr: ["bilgisayar", "yazılım", "kodlama", "program", "donanım", "internet", "klavye", "ekran", "veri", "sunucu", "sistem", "güvenlik", "tasarım", "proje", "geliştirici", "teknoloji", "bellek", "işlemci", "ağ", "kalem", "defter", "masa", "kitap", "kahve", "müzik", "güneş", "yıldız", "telefon", "kulaklık", "pencere", "kapı", "çiçek", "bulut", "yağmur", "rüzgar", "şehir", "sokak", "araba", "tren", "uçak", "liman", "orman", "deniz", "nehir", "dağ", "tepe", "köprü", "yol", "saat", "yaz", "kış", "hava", "toprak", "gezegen", "bilgi", "okul", "öğrenci", "kitaplık", "yaprak", "kalp", "sevgi", "dostluk", "başarı", "hedef", "çalışma", "emek", "kazanç", "zaman", "saniye", "dakika", "hafta", "ay", "yıl", "asır", "tarih", "mühendis", "mimar", "doktor", "hastane", "sağlık", "spor", "futbol", "basketbol", "tenis", "koşu", "yüzme", "şarkı", "film", "tiyatro", "sanat", "resim", "müze", "saray", "kale", "bahçe", "meyve", "elma", "armut", "karpuz", "limon", "çilek"],
  en: ["computer", "software", "coding", "program", "hardware", "internet", "keyboard", "screen", "data", "server", "system", "security", "design", "project", "developer", "technology", "memory", "processor", "network", "pencil", "notebook", "desk", "book", "coffee", "music", "sun", "star", "phone", "headphone", "window", "door", "flower", "cloud", "rain", "wind", "city", "street", "car", "train", "plane", "port", "forest", "sea", "river", "mountain", "hill", "bridge", "road", "clock", "summer", "winter", "weather", "earth", "planet", "knowledge", "school", "student", "library", "leaf", "heart", "love", "friendship", "success", "goal", "work", "effort", "profit", "time", "second", "minute", "week", "month", "year", "century", "history", "engineer", "architect", "doctor", "hospital", "health", "sports", "football", "tennis", "running", "swimming", "song", "movie", "theater", "art", "painting", "museum", "palace", "castle", "garden", "fruit", "apple", "pear", "watermelon", "lemon", "strawberry"],
  es: ["computadora", "software", "codigo", "programa", "hardware", "internet", "teclado", "pantalla", "datos", "servidor", "sistema", "seguridad", "diseno", "proyecto", "desarrollador", "tecnologia", "memoria", "procesador", "red", "lapiz", "cuaderno", "escritorio", "libro", "cafe", "musica", "sol", "estrella", "telefono", "auriculares", "ventana", "puerta", "flor", "nube", "lluvia", "viento", "ciudad", "calle", "auto", "tren", "avion", "puerto", "bosque", "mar", "rio", "montana", "colina", "puente", "camino", "reloj", "verano", "invierno", "clima", "tierra", "planeta", "conocimiento", "escuela", "estudiante", "biblioteca", "hoja", "corazon", "amor", "amistad", "exito", "meta", "trabajo", "esfuerzo", "ganancia", "tiempo", "segundo", "minuto", "semana", "mes", "ano", "siglo", "historia", "ingeniero", "arquitecto", "doctor", "hospital", "salud", "deporte", "futbol", "tenis", "correr", "natacion", "cancion", "pelicula", "teatro", "arte", "pintura", "museo", "palacio", "castillo", "jardin", "fruta", "manzana", "pera", "sandia", "limon", "fresa"]
};

const generateRandomWords = (lang: string, count: number) => {
  const currentLang = (lang === "es" || lang === "en" || lang === "tr") ? lang : "tr";
  const list = WORD_LISTS[currentLang];
  let result = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * list.length);
    result.push(list[randomIndex]);
  }
  return result.join(" ");
};

const t = {
  tr: {
    title: "Klavye Hız Testi",
    subtitle: "Rekor seviyesinde zengin kelime havuzu ile hızını test et",
    tabTime: "Süreye Göre Kelime (WPM)",
    tabWords: "Kelimeye Göre Süre (Sn)",
    timeLabel: "Süre (sn):",
    wordCountLabel: "Kelime Sayısı:",
    custom: "Özel:",
    timeLeft: "Kalan Süre",
    elapsedTime: "Geçen Süre",
    placeholder: "Kelimeleri buraya yazmaya başla (boşluk tuşunu kullan)...",
    successTitle: "🎉 Test Tamamlandı!",
    tryAgain: "Tekrar Dene",
    reset: "Sıfırla",
    accuracy: "Doğruluk"
  },
  en: {
    title: "Typing Speed Test",
    subtitle: "Test your speed with a record-level rich word pool",
    tabTime: "Time to Words",
    tabWords: "Words to Time",
    timeLabel: "Time (sec):",
    wordCountLabel: "Word Count:",
    custom: "Custom:",
    timeLeft: "Time Left",
    elapsedTime: "Elapsed Time",
    placeholder: "Start typing words here (use space)...",
    successTitle: "🎉 Test Completed!",
    tryAgain: "Try Again",
    reset: "Reset",
    accuracy: "Accuracy"
  },
  es: {
    title: "Test de Velocidad de Escritura",
    subtitle: "Prueba tu velocidad con un rico repertorio de palabras",
    tabTime: "Tiempo a Palabras (WPM)",
    tabWords: "Palabras a Tiempo (Seg)",
    timeLabel: "Tiempo (seg):",
    wordCountLabel: "Nº de Palabras:",
    custom: "Personalizado:",
    timeLeft: "Tiempo Restante",
    elapsedTime: "Tiempo Transcurrido",
    placeholder: "Empieza a escribir aquí (usa la barra espaciadora)...",
    successTitle: "🎉 ¡Prueba Completada!",
    tryAgain: "Intentar de nuevo",
    reset: "Reiniciar",
    accuracy: "Precisión"
  }
} as const;

export default function TypingTestTool({ lang }: TypingTestToolProps) {
  const currentLang = (lang === "es" || lang === "en" || lang === "tr") ? lang : "tr";
  const texts = t[currentLang];

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
      setTargetWords(generateRandomWords(currentLang, calculatedWordCount).split(" "));
      setTimeLeft(selectedTime);
    } else {
      const safeWordCount = Math.min(300, Math.max(5, selectedWordCount));
      setTargetWords(generateRandomWords(currentLang, safeWordCount).split(" "));
    }

    try {
      localStorage.setItem("tt_mode", testMode);
      localStorage.setItem("tt_time", selectedTime.toString());
      localStorage.setItem("tt_words", selectedWordCount.toString());
    } catch (e) {
      console.warn("Hafızaya yazılamadı.");
    }
  }, [currentLang, testMode, selectedTime, selectedWordCount, isMounted]);

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
    setTargetWords(generateRandomWords(currentLang, calculatedWordCount).split(" "));

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
    setTargetWords(generateRandomWords(currentLang, safeWordCount).split(" "));
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
        setTargetWords((prev) => [...prev, ...generateRandomWords(currentLang, 50).split(" ")]);
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
      primaryResult = currentLang === "tr" ? `${wpm} WPM (Dakikada Kelime)` : currentLang === "es" ? `${wpm} WPM (Palabras por minuto)` : `${wpm} WPM (Words Per Minute)`;
      secondaryResult = currentLang === "tr" ? `Toplam ${wordsTyped} kelime yazdınız.` : currentLang === "es`" ? `Escribiste un total de ${wordsTyped} palabras.` : `You typed a total of ${wordsTyped} words.`;
    } else {
      const secondsSpent = elapsedTime > 0 ? elapsedTime : 1;
      primaryResult = currentLang === "tr" ? `${selectedWordCount} kelimeyi ${secondsSpent} saniyede yazdınız!` : currentLang === "es" ? `¡Escribiste ${selectedWordCount} palabras en ${secondsSpent} segundos!` : `Typed ${selectedWordCount} words in ${secondsSpent} seconds!`;
      const calculatedWpm = Math.round((wordsTyped / secondsSpent) * 60);
      secondaryResult = currentLang === "tr" ? `Yaklaşık Hız: ${calculatedWpm} WPM` : currentLang === "es" ? `Velocidad aproximada: ${calculatedWpm} WPM` : `Approximate Speed: ${calculatedWpm} WPM`;
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
      secondary: `${secondaryResult} — ${texts.accuracy}: %${accuracy}`
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
            <CardTitle className="text-xl font-bold">{texts.title}</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">{texts.subtitle}</p>
          </div>

          <div className="flex justify-center gap-1 bg-muted p-1 rounded-lg text-xs mt-2">
            <button
              onClick={() => handleModeSwitch("time-to-words")}
              className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-all ${testMode === "time-to-words" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {texts.tabTime}
            </button>
            <button
              onClick={() => handleModeSwitch("words-to-time")}
              className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-all ${testMode === "words-to-time" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {texts.tabWords}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-muted-foreground">
            {testMode === "time-to-words" ? (
              <div className="flex flex-wrap gap-1.5 items-center justify-center">
                <span>{texts.timeLabel}</span>
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
                  <span className="text-[11px]">{texts.custom}</span>
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
                <span>{texts.wordCountLabel}</span>
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
                  <span className="text-[11px]">{texts.custom}</span>
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
              {testMode === "time-to-words" ? texts.timeLeft : texts.elapsedTime}
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
            placeholder={texts.placeholder}
            className="w-full h-12 p-3 rounded-xl border border-input bg-background text-sm font-mono focus:ring-2 focus:ring-violet-500 outline-none"
          />

          {isFinished && resultMetric ? (
            <div className="p-4 bg-violet-500/10 rounded-xl border border-violet-500/20 text-center space-y-2">
              <div className="font-bold text-violet-600 dark:text-violet-400">
                {texts.successTitle}
              </div>
              <div className="text-base font-semibold text-foreground">
                {resultMetric.primary}
              </div>
              <div className="text-xs text-muted-foreground">
                {resultMetric.secondary}
              </div>
              <Button onClick={() => testMode === "time-to-words" ? handleResetTime() : handleResetWords()} className="w-full mt-2 gap-2">
                <RotateCcw className="size-4" />
                {texts.tryAgain}
              </Button>
            </div>
          ) : (
            <Button onClick={() => testMode === "time-to-words" ? handleResetTime() : handleResetWords()} variant="outline" className="w-full gap-2">
              <RotateCcw className="size-4" />
              {texts.reset}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}