import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('nav');
  return (
    <main className="min-h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-4xl font-bold text-accent">Viktor Zhelizko</h1>
      <p className="text-text-muted">{t('experience')} | {t('skills')} | {t('contact')}</p>
    </main>
  );
}
