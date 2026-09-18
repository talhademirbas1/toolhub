import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mytoolkitbase.com/' // BURAYI KENDİ SİTENLE DEĞİŞTİR

  return [
    {
      url: `${baseUrl}/tr`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Hesap Makinesi
    { url: `${baseUrl}/tr/tools/classic-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/en/tools/classic-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    // Görsel Dönüştürücü
    { url: `${baseUrl}/tr/tools/image-converter`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/en/tools/image-converter`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    // Klavye Hız Testi
    { url: `${baseUrl}/tr/tools/typing-test`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/en/tools/typing-test`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    // Dünya Saatleri
    { url: `${baseUrl}/tr/tools/world-clock`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/en/tools/world-clock`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]
}