import type { Metadata } from "next";
import TextAnalyzerTool from "@/components/text-analyzer-tool";
import { ToolPageHeader } from "@/components/tool-page-header";
import { i18n, type Locale } from "@/i18n.config";

const PATH = "/tools/text-analyzer";

const content = {
  tr: {
    metaTitle: "Kelime ve Karakter Sayacı",
    metaDescription: "Metninizdeki kelime, karakter, cümle sayısını ve okuma süresini anında öğrenin. Boşluksuz karakter sayımı dahil, ücretsiz online sayaç.",
    backButton: "Ana Sayfaya Dön",
    h1: "Kelime ve Karakter Sayacı",
    toolTitle: "Kelime ve Karakter Sayacı",
    toolDescription: "Metninizdeki kelime, karakter, cümle sayısını ve tahmini okuma süresini anında görün.",
    howToTitle: "Kelime ve karakter sayacı nasıl kullanılır?",
    howToText: "Metninizi yukarıdaki kutuya yazın veya yapıştırın. Kelime sayısı, karakter sayısı, boşluksuz karakter sayısı, cümle sayısı ve tahmini okuma süresi siz yazdıkça anında güncellenir. Kayıt olmanız veya bir şey indirmeniz gerekmez. Sonucu görmek için sayfayı açıp metni yapıştırmanız yeterlidir. İşiniz bitince Kopyala ile metni alabilir, Temizle ile kutuyu sıfırlayabilirsiniz.",
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Ödev, makale ve tez metinlerinde kelime sınırını kontrol etmek",
      "X (Twitter) için 280, Instagram biyografisi için 150 karakter gibi sosyal medya sınırlarına uymak",
      "Meta açıklaması, ilan ve ürün metni gibi yazılarda uzunluğu ayarlamak",
      "Konuşma veya sunum metninin yaklaşık okuma süresini öğrenmek",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "Okuma süresi nasıl hesaplanıyor?",
        a: "Okuma süresi, kelime sayısı ortalama bir okuma hızına bölünerek tahmin edilir. Bu değer kişiden kişiye ve metnin zorluğuna göre değişebilir, bu yüzden yaklaşık bir süre olarak düşünmelisiniz.",
      },
      {
        q: "Boşluksuz karakter sayısı ne işe yarar?",
        a: "Bazı platformlar, çeviri ve yazı işleri boşlukları saymadan ücretlendirme veya sınır belirler. Boşluksuz karakter sayısı bu durumlarda doğru ölçüyü verir.",
      },
      {
        q: "Cümleler nasıl sayılıyor?",
        a: "Cümle sayısı; nokta, soru işareti ve ünlem gibi cümle sonu işaretlerine göre hesaplanır. Kısaltmalar veya üç noktalı ifadeler sonucu biraz etkileyebilir.",
      },
      {
        q: "Bu araç ücretsiz mi, üyelik gerekiyor mu?",
        a: "Araç tamamen ücretsizdir ve üyelik gerektirmez.",
      },
    ],
  },
  en: {
    metaTitle: "Word and Character Counter",
    metaDescription: "Count words, characters and sentences instantly and see the estimated reading time. Includes character count without spaces. Free online counter.",
    backButton: "Back to Home",
    h1: "Word and Character Counter",
    toolTitle: "Word and Character Counter",
    toolDescription: "Instantly see the word, character and sentence count of your text, plus the estimated reading time.",
    howToTitle: "How to use the word and character counter",
    howToText: "Type or paste your text into the box above. The word count, character count, character count without spaces, sentence count and estimated reading time update as you type. You don't need to sign up or download anything. Just open the page and paste your text. When you're done, use Copy to grab the text or Clear to reset the box.",
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Checking the word limit of essays, articles and theses",
      "Staying within social media limits such as 280 characters on X (Twitter) or 150 on an Instagram bio",
      "Adjusting the length of meta descriptions, listings and product copy",
      "Estimating the reading time of a speech or presentation script",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "How is the reading time calculated?",
        a: "Reading time is estimated by dividing the word count by an average reading speed. It varies from person to person and with the difficulty of the text, so treat it as an approximation.",
      },
      {
        q: "What is the character count without spaces used for?",
        a: "Some platforms, translation jobs and writing gigs set limits or pricing without counting spaces. The count without spaces gives you the right measure in those cases.",
      },
      {
        q: "How are sentences counted?",
        a: "The sentence count is based on sentence-ending marks such as periods, question marks and exclamation marks. Abbreviations or ellipses can slightly affect the result.",
      },
      {
        q: "Is this tool free? Do I need an account?",
        a: "The tool is completely free and requires no account.",
      },
    ],
  },
  es: {
    metaTitle: "Contador de Palabras y Caracteres",
    metaDescription: "Cuenta palabras, caracteres y oraciones al instante y consulta el tiempo de lectura estimado. Incluye recuento sin espacios. Contador online gratuito.",
    backButton: "Volver al Inicio",
    h1: "Contador de Palabras y Caracteres",
    toolTitle: "Contador de Palabras y Caracteres",
    toolDescription: "Visualiza al instante el recuento de palabras, caracteres, oraciones y el tiempo estimado de lectura de tu texto.",
    howToTitle: "¿Cómo usar el contador de palabras y caracteres?",
    howToText: "Escribe o pega tu texto en el cuadro de arriba. El recuento de palabras, caracteres, caracteres sin espacios, oraciones y el tiempo de lectura estimado se actualizan al instante mientras escribes. No necesitas registrarte ni descargar nada. Abre la página y pega tu texto. Cuando termines, usa Copiar o Limpiar para restablecer el cuadro.",
    useCasesTitle: "¿Para qué sirve?",
    useCases: [
      "Comprobar el límite de palabras en ensayos, artículos y tesis",
      "Mantenerse dentro de los límites de redes sociales como 280 caracteres en X (Twitter) o 150 en la biografía de Instagram",
      "Ajustar la longitud de metadescripciones, listados y textos de productos",
      "Estimar el tiempo de lectura de un discurso o presentación",
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Cómo se calcula el tiempo de lectura?",
        a: "El tiempo de lectura se estima dividiendo el número de palabras por una velocidad de lectura promedio. Varía según la persona y la dificultad del texto, por lo que debe tomarse como una aproximación.",
      },
      {
        q: "¿Para qué sirve el recuento de caracteres sin espacios?",
        a: "Algunas plataformas y trabajos de traducción establecen límites o tarifas sin contar los espacios. El recuento sin espacios te da la medida correcta en esos casos.",
      },
      {
        q: "¿Cómo se cuentan las oraciones?",
        a: "El recuento de oraciones se basa en los signos de puntuación finales como puntos, signos de interrogación y exclamación. Las abreviaturas o puntos suspensivos pueden afectar ligeramente al resultado.",
      },
      {
        q: "¿La herramienta es gratuita? ¿Necesito una cuenta?",
        a: "La herramienta es completamente gratuita y no requiere cuenta.",
      },
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

export default async function TextAnalyzerPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const c = content[lang];

  const dict = {
    dashboard: {
      backButton: c.backButton,
    },
    tools: {
      textAnalyzer: {
        title: c.toolTitle,
        description: c.toolDescription,
      },
    },
  };

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-zinc-100 dark:bg-background text-foreground transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="sr-only">{c.h1}</h1>

        <ToolPageHeader lang={lang} />
        <TextAnalyzerTool dict={dict} />

        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 space-y-8">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">{c.howToTitle}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {c.howToText}
            </p>
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
                <details
                  key={item.q}
                  className="group rounded-lg border border-zinc-200 dark:border-zinc-800 px-4 py-3"
                >
                  <summary className="cursor-pointer font-medium">
                    {item.q}
                  </summary>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}