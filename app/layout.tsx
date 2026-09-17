import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'MyToolKit',
  description: 'Pratik ve hızlı dijital araçlar merkezi.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* Sayfa boyanmadan (paint) ÖNCE senkron çalışarak beyaz flash'ı engeller */}
        <script
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