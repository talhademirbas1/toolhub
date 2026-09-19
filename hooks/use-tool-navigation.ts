'use client'

import { useRouter } from 'next/navigation'

/**
 * Tüm araç sayfalarında ortak kullanılan navigasyon mantığı.
 *
 * handleBack:
 *   - Kullanıcı anasayfadan bir araca girdiyse, gerçek tarayıcı geçmişini kullanarak
 *     geri döner (scroll pozisyonu dahil, olduğu yere geri gelir).
 *   - Kullanıcı bu sayfaya doğrudan bir linkle/yenilemeyle geldiyse (history yoksa),
 *     anasayfaya güvenli bir şekilde yönlendirir.
 *
 * toggleLanguage:
 *   - Next.js'in kendi router API'sini (router.replace) kullanır.
 *   - window.history.replaceState + router.refresh KULLANMAZ, çünkü bu ikisi
 *     Next.js'in internal router state'i ile tarayıcı geçmişini birbirinden
 *     koparıp "geri" ve "dil değiştir" davranışlarının birbirine karışmasına
 *     (state senkronizasyon sorununa) yol açıyordu.
 */
export function useToolNavigation(lang: string) {
  const router = useRouter()

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push(`/${lang}`)
    }
  }

  const toggleLanguage = () => {
    const newLang = lang === 'tr' ? 'en' : 'tr'
    const currentPath = window.location.pathname
    const newPath = currentPath.replace(`/${lang}/`, `/${newLang}/`)
    router.replace(newPath)
  }

  return { handleBack, toggleLanguage }
}