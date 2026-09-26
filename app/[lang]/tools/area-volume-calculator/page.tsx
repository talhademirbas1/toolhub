import type { Metadata } from "next";
import AreaVolumeCalculatorTool from "@/components/area-volume-calculator-tool";
import { ToolPageHeader } from "@/components/tool-page-header";
import { i18n, type Locale } from "@/i18n.config";

const PATH = "/tools/area-volume-calculator";

const content = {
  tr: {
    metaTitle: "Alan-Hacim Hesaplama",
    metaDescription:
      "Kare, dikdörtgen, üçgen, daire, küp, küre, silindir ve koni için alan veya hacim hesaplayın. Ücretsiz, kayıt gerektirmeyen online araç.",
    h1: "Alan-Hacim Hesaplama",
    howToTitle: "Alan veya hacim nasıl hesaplanır?",
    howToText:
      "Hesaplamak istediğiniz şekli listeden seçin, ilgili kenar, yarıçap veya yükseklik değerlerini girin. Araç seçtiğiniz şekle göre alan (2 boyutlu) veya hacim (3 boyutlu) sonucunu anında hesaplar.",
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Geometrik şekillerin alanını hızlıca hesaplamak",
      "3 boyutlu cisimlerin hacmini bulmak",
      "Okul ödevlerinde ve sınavlarda hızlı kontrol yapmak",
      "Boya, döşeme veya malzeme miktarı hesaplarında kullanmak",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      { q: "Alan-hacim hesaplama aracı ücretsiz mi?", a: "Evet, araç tamamen ücretsizdir ve üyelik gerektirmez." },
      { q: "Hangi şekiller destekleniyor?", a: "Kare, dikdörtgen, üçgen ve daire için alan; küp, dikdörtgenler prizması, küre, silindir ve koni için hacim hesaplanabilir." },
      { q: "Sonuçlar hangi birimde veriliyor?", a: "Sonuç, girdiğiniz birimin karesi (alan) veya küpü (hacim) cinsindendir; örneğin metre girerseniz sonuç metrekare veya metreküp olur." },
    ],
  },
  en: {
    metaTitle: "Area-Volume Calculator",
    metaDescription:
      "Calculate the area or volume of squares, rectangles, triangles, circles, cubes, spheres, cylinders and cones. A free online tool, no sign-up.",
    h1: "Area-Volume Calculator",
    howToTitle: "How to calculate area or volume",
    howToText:
      "Select the shape you want to calculate from the list, then enter the relevant side, radius or height values. The tool instantly calculates the area (2D) or volume (3D) result based on your selected shape.",
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Quickly calculating the area of geometric shapes",
      "Finding the volume of 3D solids",
      "Quickly checking school homework and exams",
      "Estimating paint, flooring or material quantities",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Is the area-volume calculator free?", a: "Yes, the tool is completely free and requires no account." },
      { q: "Which shapes are supported?", a: "Area for square, rectangle, triangle and circle; volume for cube, rectangular prism, sphere, cylinder and cone." },
      { q: "What unit is the result in?", a: "The result is in the square (area) or cube (volume) of the unit you entered — for example, entering meters gives a result in square or cubic meters." },
    ],
  },
  es: {
    metaTitle: "Calculadora de Área y Volumen",
    metaDescription:
      "Calcula el área o el volumen de cuadrados, rectángulos, triángulos, círculos, cubos, esferas, cilindros y conos. Herramienta online gratis, sin registro.",
    h1: "Calculadora de Área y Volumen",
    howToTitle: "¿Cómo calcular el área o el volumen?",
    howToText:
      "Selecciona la forma que quieres calcular en la lista, luego introduce los valores de lado, radio o altura correspondientes. La herramienta calcula al instante el resultado del área (2D) o del volumen (3D) según la forma elegida.",
    useCasesTitle: "¿Para qué sirve?",
    useCases: [
      "Calcular rápidamente el área de figuras geométricas",
      "Encontrar el volumen de cuerpos en 3D",
      "Verificar tareas y exámenes escolares rápidamente",
      "Estimar cantidades de pintura, suelo o materiales",
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿La calculadora de área y volumen es gratis?", a: "Sí, la herramienta es completamente gratuita y no requiere cuenta." },
      { q: "¿Qué formas son compatibles?", a: "Área para cuadrado, rectángulo, triángulo y círculo; volumen para cubo, prisma rectangular, esfera, cilindro y cono." },
      { q: "¿En qué unidad se da el resultado?", a: "El resultado está en el cuadrado (área) o cubo (volumen) de la unidad introducida; por ejemplo, si introduces metros, el resultado será en metros cuadrados o cúbicos." },
    ],
  },
} as const;

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const c = content[lang];

  const languages = i18n.locales.reduce((acc, locale) => {
    acc[locale] = `/${locale}${PATH}`;
    return acc;
  }, {} as Record<string, string>);
  languages["x-default"] = `/${i18n.defaultLocale}${PATH}`;

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: `/${lang}${PATH}`,
      languages: languages,
    },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: `/${lang}${PATH}`,
      siteName: "MyToolKit",
      locale: lang === "tr" ? "tr_TR" : lang === "es" ? "es_ES" : "en_US",
      type: "website",
    },
  };
}

export default async function AreaVolumeCalculatorPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const c = content[lang];

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-zinc-100 dark:bg-background text-foreground transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="sr-only">{c.h1}</h1>

        <ToolPageHeader lang={lang} />
        <AreaVolumeCalculatorTool lang={lang} />

        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 space-y-8">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">{c.howToTitle}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{c.howToText}</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">{c.useCasesTitle}</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-600 dark:text-zinc-400">
              {c.useCases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">{c.faqTitle}</h2>
            <div className="space-y-2">
              {c.faq.map((item) => (
                <details key={item.q} className="group rounded-lg border border-zinc-200 dark:border-zinc-800 px-4 py-3">
                  <summary className="cursor-pointer font-medium">{item.q}</summary>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
