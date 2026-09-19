import type { Metadata } from "next";
import ImageConverterTool from "@/components/image-converter-tool";
import { ToolPageHeader } from "@/components/tool-page-header";

type Lang = "tr" | "en";

const PATH = "/tools/image-converter";

const content = {
  tr: {
    metaTitle: "Online Resim Dönüştürücü",
    metaDescription:
      "Görsellerinizi farklı resim formatlarına kolayca dönüştürün. Ücretsiz, kayıt gerektirmeyen ve kullanımı basit online resim dönüştürücü.",
    h1: "Online Resim Dönüştürücü",
    howToTitle: "Resim dönüştürücü nasıl kullanılır?",
    howToText:
      "Dönüştürmek istediğiniz görseli araca yükleyin, istediğiniz çıktı formatını seçin ve dönüştürme işlemini başlatın. Sonuç hazır olunca yeni dosyayı bilgisayarınıza veya telefonunuza kaydedebilirsiniz. Kayıt olmanız veya bir program kurmanız gerekmez, araç doğrudan tarayıcıda çalışır.",
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Bir siteye veya forma yüklerken istenen resim formatına çevirmek",
      "Uyumsuz bir formattaki görseli her cihazda açılabilir hale getirmek",
      "Web sitesi ve blog görsellerini uygun formata dönüştürmek",
      "Program kurmadan tarayıcıdan hızlıca format değiştirmek",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "Resim dönüştürücü ücretsiz mi, üyelik gerekiyor mu?",
        a: "Araç tamamen ücretsizdir ve üyelik gerektirmez.",
      },
      {
        q: "Hangi formatlara dönüştürebilirim?",
        a: "Seçebileceğiniz çıktı formatları dönüştürme ekranında listelenir.",
      },
      {
        q: "Telefondan veya tabletten kullanabilir miyim?",
        a: "Araç tarayıcıda çalışır, bu yüzden telefon, tablet ve bilgisayardan kullanabilirsiniz.",
      },
    ],
  },
  en: {
    metaTitle: "Online Image Converter",
    metaDescription:
      "Convert your images to other image formats with ease. A free, simple online image converter that needs no sign-up.",
    h1: "Online Image Converter",
    howToTitle: "How to use the image converter",
    howToText:
      "Upload the image you want to convert, choose the output format you need and start the conversion. When the result is ready, you can save the new file to your computer or phone. You don't need to sign up or install a program, the tool works right in your browser.",
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Converting an image to the format a website or form asks for",
      "Making an image in an incompatible format open on any device",
      "Converting website and blog images to a suitable format",
      "Changing formats quickly in your browser without installing software",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Is the image converter free? Do I need an account?",
        a: "The tool is completely free and requires no account.",
      },
      {
        q: "Which formats can I convert to?",
        a: "The output formats you can choose from are listed on the conversion screen.",
      },
      {
        q: "Can I use it on my phone or tablet?",
        a: "The tool runs in your browser, so you can use it on a phone, tablet or computer.",
      },
    ],
  },
} as const;

export async function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const c = content[lang];

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: `/${lang}${PATH}`,
      languages: {
        tr: `/tr${PATH}`,
        en: `/en${PATH}`,
        "x-default": `/tr${PATH}`,
      },
    },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: `/${lang}${PATH}`,
      siteName: "MyToolKit",
      locale: lang === "tr" ? "tr_TR" : "en_US",
      type: "website",
    },
  };
}

export default async function ImageConverterPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const c = content[lang];

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-zinc-100 dark:bg-background text-foreground transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Ekranda görünmez ama Google'ın sayfa başlığını anlaması için gerekli.
            ImageConverterTool zaten bir h1 basıyorsa bu satırı sil. */}
        <h1 className="sr-only">{c.h1}</h1>

        <ToolPageHeader lang={lang} />
        <ImageConverterTool lang={lang} />

        {/* SEO içeriği: Google'a sayfanın ne hakkında olduğunu anlatır */}
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
