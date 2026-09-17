import './globals.css'

// Tarayıcı sekmesi için başlık, açıklama ve logo ayarları
export const metadata = {
  title: 'MyToolkit',
  description: 'Pratik ve hızlı dijital araçlar merkezi.',
  icons: {
    icon: '/icon.svg',
  },
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
      </body>
    </html>
  );
}