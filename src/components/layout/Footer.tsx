'use client';

import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] py-8 mt-20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="font-mono text-xs text-[var(--text-dim)] tracking-wider">
          &copy; {year} Viktor Zhelizko. {t('rights')}.
        </p>
      </div>
    </footer>
  );
}
