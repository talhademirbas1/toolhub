import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let locales = ['tr', 'en'];
let defaultLocale = 'tr';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Eğer kullanıcı zaten /tr veya /en yolundaysa karışma
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Eğer url'de dil yoksa (örneğin sadece localhost:3000 yazıldıysa) varsayılan dile (tr) yönlendir
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Resimler, ikonlar ve arka plan dosyalarını bu yönlendirmeden hariç tutuyoruz
    '/((?!_next|api|favicon.ico).*)',
  ],
};