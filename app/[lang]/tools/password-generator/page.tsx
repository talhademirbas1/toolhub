import type { Metadata } from "next";
import PasswordGeneratorTool from "@/components/password-generator-tool";
import { ToolPageHeader } from "@/components/tool-page-header";

type Lang = "tr" | "en";

// DİKKAT: Bu, sayfanın klasör adıyla birebir aynı olmalı (app/[lang]/tools/<klasör>/page.tsx)
const PATH = "/tools/password-generator";

const content = {
  tr: {
    metaTitle: "Şifre Oluşturucu",
    metaDescription:
      "Güçlü, rastgele ve güvenli şifreler oluşturun. Uzunluk ve karakter türlerini özelleştirin. Ücretsiz, kayıt gerektirmeyen online şifre üretici.",
    h1: "Şifre Oluşturucu",
    howToTitle: "Şifre oluşturucu nasıl kullanılır?",
    howToText:
      "Şifrenizin uzunluğunu kaydırıcıdan seçin, hangi karakter türlerinin (büyük harf, küçük harf, sayı, sembol) kullanılacağını işaretleyin ve 'Şifre Oluştur' butonuna basın. Oluşan şifreyi tek tıkla panoya kopyalayabilirsiniz. Şifre, tarayıcınızda üretilir ve hiçbir sunucuya gönderilmez.",
    useCasesTitle: "Ne işe yarar?",
    useCases: [
      "Yeni bir hesap veya uygulama için güçlü bir şifre oluşturmak",
      "Zayıf veya tahmin edilebilir şifreleri yenilemek",
      "Şifre yöneticinize eklemek üzere rastgele şifreler üretmek",
      "Belirli uzunlukta veya karakter kısıtlamalı bir şifre oluşturmak",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "Oluşturulan şifreler bir yere kaydediliyor mu?",
        a: "Hayır, şifre tamamen tarayıcınızda üretilir ve hiçbir sunucuya gönderilmez veya kaydedilmez.",
      },
      {
        q: "Şifre ne kadar uzun olmalı?",
        a: "Güvenlik açısından en az 12 karakter önerilir, 16 karakter ve üzeri daha güçlü kabul edilir.",
      },
      {
        q: "Sembol içeren şifreler her sitede kabul ediliyor mu?",
        a: "Çoğu site sembol içeren şifreleri kabul eder, ancak bazı eski sistemler kısıtlama getirebilir; bu durumda sembol seçeneğini kapatabilirsiniz.",
      },
      {
        q: "Araç ücretsiz mi?",
        a: "Evet, araç tamamen ücretsizdir ve üyelik gerektirmez.",
      },
    ],
  },
  en: {
    metaTitle: "Password Generator",
    metaDescription:
      "Generate strong, random and secure passwords. Customize length and character types. A free online password generator that needs no sign-up.",
    h1: "Password Generator",
    howToTitle: "How to use the password generator",
    howToText:
      "Choose your password length with the slider, select which character types (uppercase, lowercase, numbers, symbols) to include, and click 'Generate Password'. You can copy the resulting password to your clipboard with one click. The password is generated in your browser and is never sent to any server.",
    useCasesTitle: "What is it useful for?",
    useCases: [
      "Creating a strong password for a new account or app",
      "Replacing weak or guessable passwords",
      "Generating random passwords to add to your password manager",
      "Creating a password with a specific length or character restrictions",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Are the generated passwords stored anywhere?",
        a: "No, the password is generated entirely in your browser and is never sent to or stored on any server.",
      },
      {
        q: "How long should a password be?",
        a: "At least 12 characters is recommended for security, with 16 characters or more considered stronger.",
      },
      {
        q: "Are passwords with symbols accepted on every site?",
        a: "Most sites accept passwords with symbols, but some older systems may have restrictions; in that case you can turn off the symbols option.",
      },
      {
        q: "Is the tool free?",
        a: "Yes, the tool is completely free and requires no account.",
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

export default async function PasswordGeneratorPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const c = content[lang];
