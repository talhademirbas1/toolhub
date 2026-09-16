import { getDictionary, Locale } from './dictionaries';
// Asıl tasarımını barındıran dosyayı sayfaya çağırıyoruz
import Dashboard from '../../components/toolhub-dashboard'; 

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main>
      {/* Dashboard bileşenimizi geri getiriyoruz ve çeviri sözlüğünü (dict) içine yolluyoruz */}
      <Dashboard dict={dict} />
    </main>
  );
}