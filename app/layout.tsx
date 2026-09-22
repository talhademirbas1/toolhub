import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

export const metadata = {
  title: 'MyToolKit',
  description: 'Pratik ve hızlı dijital araçlar merkezi.',
  verification: {
    google: 'WroaGcnuy3Wy4pTACYI-40MIBEmFZHMeSosCK25r38U',
  },
  other: {
    'google-adsense-account': 'ca-pub-7088352321084753',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7088352321084753"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-background text-foreground antialiased transition-colors">
        {children}
        <Analytics />
      </body>
    </html>
  );
}