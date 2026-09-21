"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap, Plus, Trash2 } from "lucide-react";

interface GpaCalculatorToolProps {
  lang: string;
}

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: string;
}

const GRADE_POINTS: Record<string, number> = {
  "A+": 4.0, A: 4.0, "A-": 3.7,
  "B+": 3.3, B: 3.0, "B-": 2.7,
  "C+": 2.3, C: 2.0, "C-": 1.7,
  "D+": 1.3, D: 1.0, "D-": 0.7,
  F: 0.0,
};

const GRADE_OPTIONS = Object.keys(GRADE_POINTS);

const createCourse = (): Course => ({
  id: Math.random().toString(36).slice(2, 9),
  name: "",
  grade: "A",
  credits: "3",
});

const t = {
  tr: {
    title: "Ders Ortalaması (GPA) Hesaplama",
    subtitle: "MyToolKit Eğitim Aracı",
    courseName: "Ders Adı (opsiyonel)",
    grade: "Not",
    credits: "Kredi",
    coursePrefix: "Ders",
    addCourse: "Ders Ekle",
    calcBtn: "Ortalamayı Hesapla",
    resetBtn: "Sıfırla",
    resultLabel: "Genel Not Ortalamanız (4.0 üzerinden)"
  },
  en: {
    title: "GPA Calculator",
    subtitle: "MyToolKit Education Suite",
    courseName: "Course Name (optional)",
    grade: "Grade",
    credits: "Credits",
    coursePrefix: "Course",
    addCourse: "Add Course",
    calcBtn: "Calculate GPA",
    resetBtn: "Reset",
    resultLabel: "Your GPA (out of 4.0)"
  },
  es: {
    title: "Calculadora de GPA",
    subtitle: "Herramienta de Educación MyToolKit",
    courseName: "Asignatura (opcional)",
    grade: "Nota",
    credits: "Créditos",
    coursePrefix: "Asignatura",
    addCourse: "Añadir Asignatura",
    calcBtn: "Calcular GPA",
    resetBtn: "Reiniciar",
    resultLabel: "Tu GPA (sobre 4.0)"
  }
} as const;

export default function GpaCalculatorTool({ lang }: GpaCalculatorToolProps) {
  const currentLang = (lang === "es" || lang === "en" || lang === "tr") ? lang : "tr";
  const texts = t[currentLang];

  const [isMounted, setIsMounted] = useState(false);
  const [courses, setCourses] = useState<Course[]>([createCourse(), createCourse()]);
  const [gpa, setGpa] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem("gpa_courses");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setCourses(parsed);
      }
    } catch (e) {
      console.warn("Hafızadan veri okunamadı.");
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem("gpa_courses", JSON.stringify(courses));
      } catch (e) {
        console.warn("Hafızaya kaydedilemedi.");
      }
    }
  }, [courses, isMounted]);

  const updateCourse = (id: string, field: keyof Course, value: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const addCourse = () => {
    setCourses((prev) => [...prev, createCourse()]);
  };

  const removeCourse = (id: string) => {
    setCourses((prev) => (prev.length > 1 ? prev.filter((c) => c.id !== id) : prev));
  };

  const handleCalculate = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    for (const course of courses) {
      const credits = parseFloat(course.credits);
      const points = GRADE_POINTS[course.grade];
      if (!isNaN(credits) && credits > 0 && points !== undefined) {
        totalPoints += credits * points;
        totalCredits += credits;
      }
    }

    if (totalCredits === 0) {
      setGpa(null);
      return;
    }

    setGpa(Math.round((totalPoints / totalCredits) * 100) / 100);
  };

  const handleReset = () => {
    setCourses([createCourse(), createCourse()]);
    setGpa(null);
    localStorage.removeItem("gpa_courses");
  };

  if (!isMounted) return null;

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 ring-1 ring-indigo-500/20">
          <GraduationCap className="size-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">{texts.title}</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{texts.subtitle}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="hidden sm:grid grid-cols-[1fr,110px,90px,36px] gap-2 px-1 text-xs font-medium text-muted-foreground">
          <span>{texts.courseName}</span>
          <span>{texts.grade}</span>
          <span>{texts.credits}</span>
          <span />
        </div>

        <div className="space-y-3">
          {courses.map((course, idx) => (
            <div key={course.id} className="grid grid-cols-2 sm:grid-cols-[1fr,110px,90px,36px] gap-2 items-center">
              <Input
                type="text"
                placeholder={`${texts.coursePrefix} ${idx + 1}`}
                value={course.name}
                onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                className="col-span-2 sm:col-span-1 text-sm"
              />
              <select
                value={course.grade}
                onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-2 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {GRADE_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g} ({GRADE_POINTS[g].toFixed(1)})
                  </option>
                ))}
              </select>
              <Input
                type="number"
                min="0"
                step="0.5"
                value={course.credits}
                onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                className="text-sm font-mono"
              />
              <Button
                onClick={() => removeCourse(course.id)}
                variant="outline"
                size="icon"
                disabled={courses.length <= 1}
                className="h-9 w-9 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 disabled:opacity-30"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </div>

        <Button onClick={addCourse} variant="outline" className="w-full gap-2">
          <Plus className="size-4" />
          {texts.addCourse}
        </Button>

        <div className="flex gap-2">
          <Button onClick={handleCalculate} className="flex-1 font-semibold">{texts.calcBtn}</Button>
          <Button onClick={handleReset} variant="outline" className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10">
            {texts.resetBtn}
          </Button>
        </div>

        {gpa !== null && (
          <div className="p-4 bg-muted/50 rounded-xl text-center border border-border/50">
            <span className="text-xs text-muted-foreground block mb-1">{texts.resultLabel}</span>
            <span className="text-4xl font-bold font-mono text-indigo-500">{gpa.toFixed(2)}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}