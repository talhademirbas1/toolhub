import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./i18n.config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Eğer kullanıcı zaten desteklenen bir dil yolundaysa karışma
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Url'de dil yoksa (örneğin sadece localhost:3000 yazıldıysa) varsayılan dile yönlendir
  request.nextUrl.pathname = `/${i18n.defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Nokta içeren tüm yolları (sitemap.xml, robots.txt, görseller, ikonlar) hariç tutar
    "/((?!_next|_vercel|api|.*\\..*).*)",
  ],
};