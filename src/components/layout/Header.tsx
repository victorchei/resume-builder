'use client';

import { useTranslations } from 'next-intl';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LocaleSwitcher } from './LocaleSwitcher';

export function Header() {
  const t = useTranslations('nav');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="font-mono text-sm text-[var(--accent)] tracking-wider font-bold">VZ</a>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#experience" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">{t('experience')}</a>
          <a href="#skills" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">{t('skills')}</a>
          <a href="#education" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">{t('education')}</a>
          <a href="#contact" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">{t('contact')}</a>
        </nav>
        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
