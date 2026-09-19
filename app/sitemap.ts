// app/sitemap.ts
import type { MetadataRoute } from "next";
 
const baseUrl = "https://www.mytoolkitbase.com";
const locales = ["tr", "en"];
 
// DİKKAT: Buradaki adlar app/[lang]/tools/ altındaki klasör adlarıyla birebir aynı olmalı.
// Yanlış yazılan bir ad sitemap'te 404 veren bir adres olarak görünür.
const tools = [
  "classic-calculator",
  "image-converter",
  "typing-test",
  "world-clock",
  "text-analyzer",
  "stopwatch",
  "percentage-calculator",
  "time-difference",
];
 
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", ...tools.map((t) => `/tools/${t}`)];
 
  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}${page}`])
        ),
      },
    }))
  );
}
 