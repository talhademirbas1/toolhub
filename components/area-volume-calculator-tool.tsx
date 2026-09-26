"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shapes } from "lucide-react";

interface AreaVolumeToolProps {
  lang: string;
}

const t = {
  tr: {
    title: "Alan-Hacim Hesaplama",
    subtitle: "MyToolKit Matematik Aracı",
    shapeLabel: "Şekil Seçin",
    calcBtn: "Hesapla",
    resetBtn: "Sıfırla",
    resultArea: "Alan Sonucu",
    resultVolume: "Hacim Sonucu",
    errInvalid: "Lütfen tüm alanları geçerli ve pozitif sayılarla doldurun.",
    fields: { side: "Kenar", width: "Genişlik", height: "Yükseklik", base: "Taban", radius: "Yarıçap", length: "Uzunluk" },
    shapes: {
      square: "Kare (Alan)",
      rectangle: "Dikdörtgen (Alan)",
      triangle: "Üçgen (Alan)",
      circle: "Daire (Alan)",
      cube: "Küp (Hacim)",
      cuboid: "Dikdörtgenler Prizması (Hacim)",
      sphere: "Küre (Hacim)",
      cylinder: "Silindir (Hacim)",
      cone: "Koni (Hacim)",
    },
  },
  en: {
    title: "Area-Volume Calculator",
    subtitle: "MyToolKit Math Suite",
    shapeLabel: "Select Shape",
    calcBtn: "Calculate",
    resetBtn: "Reset",
    resultArea: "Area Result",
    resultVolume: "Volume Result",
    errInvalid: "Please fill all fields with valid, positive numbers.",
    fields: { side: "Side", width: "Width", height: "Height", base: "Base", radius: "Radius", length: "Length" },
    shapes: {
      square: "Square (Area)",
      rectangle: "Rectangle (Area)",
      triangle: "Triangle (Area)",
      circle: "Circle (Area)",
      cube: "Cube (Volume)",
      cuboid: "Rectangular Prism (Volume)",
      sphere: "Sphere (Volume)",
      cylinder: "Cylinder (Volume)",
      cone: "Cone (Volume)",
    },
  },
  es: {
    title: "Calculadora de Área y Volumen",
    subtitle: "Herramienta MyToolKit",
    shapeLabel: "Selecciona la Forma",
    calcBtn: "Calcular",
    resetBtn: "Reiniciar",
    resultArea: "Resultado del Área",
    resultVolume: "Resultado del Volumen",
    errInvalid: "Completa todos los campos con números válidos y positivos.",
    fields: { side: "Lado", width: "Ancho", height: "Altura", base: "Base", radius: "Radio", length: "Longitud" },
    shapes: {
      square: "Cuadrado (Área)",
      rectangle: "Rectángulo (Área)",
      triangle: "Triángulo (Área)",
      circle: "Círculo (Área)",
      cube: "Cubo (Volumen)",
      cuboid: "Prisma Rectangular (Volumen)",
      sphere: "Esfera (Volumen)",
      cylinder: "Cilindro (Volumen)",
      cone: "Cono (Volumen)",
    },
  },
} as const;

type ShapeKey = "square" | "rectangle" | "triangle" | "circle" | "cube" | "cuboid" | "sphere" | "cylinder" | "cone";

const shapeFields: Record<ShapeKey, ("side" | "width" | "height" | "base" | "radius" | "length")[]> = {
  square: ["side"],
  rectangle: ["width", "height"],
  triangle: ["base", "height"],
  circle: ["radius"],
  cube: ["side"],
  cuboid: ["width", "height", "length"],
  sphere: ["radius"],
  cylinder: ["radius", "height"],
  cone: ["radius", "height"],
};

const volumeShapes: ShapeKey[] = ["cube", "cuboid", "sphere", "cylinder", "cone"];

export default function AreaVolumeCalculatorTool({ lang }: AreaVolumeToolProps) {
  const currentLang = lang === "es" || lang === "en" || lang === "tr" ? lang : "tr";
  const texts = t[currentLang];

  const [shape, setShape] = useState<ShapeKey>("square");
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const fields = useMemo(() => shapeFields[shape], [shape]);
  const isVolume = volumeShapes.includes(shape);

  const handleShapeChange = (s: ShapeKey) => {
    setShape(s);
    setInputs({});
    setResult(null);
    setError("");
  };

  const handleCalculate = () => {
    setError("");
    const vals: Record<string, number> = {};
    for (const f of fields) {
      const v = parseFloat(inputs[f]);
      if (isNaN(v) || v <= 0) {
        setError(texts.errInvalid);
        setResult(null);
        return;
      }
      vals[f] = v;
    }

    let res = 0;
    switch (shape) {
      case "square":
        res = vals.side ** 2;
        break;
      case "rectangle":
        res = vals.width * vals.height;
        break;
      case "triangle":
        res = (vals.base * vals.height) / 2;
        break;
      case "circle":
        res = Math.PI * vals.radius ** 2;
        break;
      case "cube":
        res = vals.side ** 3;
        break;
      case "cuboid":
        res = vals.width * vals.height * vals.length;
        break;
      case "sphere":
        res = (4 / 3) * Math.PI * vals.radius ** 3;
        break;
      case "cylinder":
        res = Math.PI * vals.radius ** 2 * vals.height;
        break;
      case "cone":
        res = (1 / 3) * Math.PI * vals.radius ** 2 * vals.height;
        break;
    }

    setResult(Number(res.toFixed(4)));
  };

  const handleReset = () => {
    setInputs({});
    setResult(null);
    setError("");
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20">
          <Shapes className="size-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">{texts.title}</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{texts.subtitle}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">{texts.shapeLabel}</label>
          <select
            value={shape}
            onChange={(e) => handleShapeChange(e.target.value as ShapeKey)}
            className="w-full h-10 rounded-md border border-input bg-transparent px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {(Object.keys(texts.shapes) as ShapeKey[]).map((s) => (
              <option key={s} value={s} className="bg-background text-foreground">
                {texts.shapes[s]}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {fields.map((f) => (
            <div key={f} className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">{texts.fields[f]}</label>
              <Input
                value={inputs[f] || ""}
                onChange={(e) => setInputs((prev) => ({ ...prev, [f]: e.target.value }))}
                className="font-mono"
                inputMode="decimal"
              />
            </div>
          ))}
        </div>

        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={handleCalculate} className="flex-1 font-semibold">
            {texts.calcBtn}
          </Button>
          <Button onClick={handleReset} variant="outline" className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10">
            {texts.resetBtn}
          </Button>
        </div>

        {result !== null && (
          <div className="p-4 bg-muted/50 rounded-xl border border-border/50 text-center">
            <div className="text-xs text-muted-foreground mb-2">{isVolume ? texts.resultVolume : texts.resultArea}</div>
            <div className="text-3xl font-bold font-mono text-emerald-500">{result}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
