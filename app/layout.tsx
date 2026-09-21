import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script'; // <-- YENİ EKLENDİ

export const metadata = {
  title: 'MyToolKit',
  description: 'Pratik ve hızlı dijital araçlar merkezi.',
  verification: {
    google: 'WroaGcnuy3Wy4pTACYI-40MIBEmFZHMeSosCK25r38U',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning tema geçişlerinde uyuşmazlığı engeller
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* Next.js Script componenti ile senkron tema yükleme (Beyaz parlama engellenir) */}
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased transition-colors">
        {children}
        <Analytics />
      </body>
    </html>
  );
}