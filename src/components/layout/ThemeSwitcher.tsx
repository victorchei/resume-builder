'use client';

import { useEffect, useState } from 'react';

const themes = ['dark', 'light'] as const;
type Theme = (typeof themes)[number];

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored && themes.includes(stored)) {
      setTheme(stored);
      document.documentElement.setAttribute('data-theme', stored);
    }
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    document.cookie = `theme=${next};path=/;max-age=31536000`;
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label="Switch theme"
      className="p-2 rounded-md border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors text-sm font-mono"
    >
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  );
}
