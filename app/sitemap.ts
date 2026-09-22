import type { MetadataRoute } from "next";
import { i18n } from "@/i18n.config";

const baseUrl = "https://www.mytoolkitbase.com";
const locales = i18n.locales;

const tools = [
  "classic-calculator",
  "image-converter",
  "typing-test",
  "world-clock",
  "text-analyzer",
  "stopwatch",
  "percentage-calculator",
  "time-difference",
  "age-calculator",
  "bmi-calculator",
  "gpa-calculator",
  "unit-converter",
  "qr-code-generator",
  "password-generator",
  "background-remover",
  "image-cropper",
  "case-converter",
  "pomodoro-timer",
  "color-picker",
  "lorem-ipsum",
  "text-diff",
];

const staticRoutes = [
  "",
  "/about",
  "/contact",
  "/privacy",
  ...tools.map((t) => `/tools/${t}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.flatMap((route) =>
    locales.map((locale) => {
      const languagesMap = Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}${route}`])
      );
      languagesMap["x-default"] = `${baseUrl}/${i18n.defaultLocale}${route}`;
      return {
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1.0 : route.startsWith("/tools") ? 0.8 : 0.5,
        alternates: { languages: languagesMap },
      };
    })
  );
}