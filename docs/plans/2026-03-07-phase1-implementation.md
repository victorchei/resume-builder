# Phase 1: Personal Brand Platform — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate resume-builder from Node.js CLI to Next.js 15 personal brand platform with real data, i18n, theme switching, responsive design, and SEO.

**Architecture:** Next.js 15 App Router with `next-intl` for i18n (EN/UK), Tailwind CSS with CSS variable themes, `profile.json` as single source of truth. SSG for all pages. Existing CLI generators preserved as scripts.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS 4, next-intl, next-sitemap, next/image

---

### Task 1: Populate profile.json with Real Data

**Files:**
- Modify: `data/profile.json`

**Step 1: Update profile.json with LinkedIn data**

Replace entire `data/profile.json` with real data extracted from LinkedIn profile snapshot:

```json
{
  "meta": {
    "version": "2.0.0",
    "lastUpdated": "2026-03-07",
    "sources": ["linkedin", "manual"]
  },
  "personal": {
    "name": { "first": "Viktor", "last": "Zhelizko" },
    "title": {
      "en": "Senior Software Engineer",
      "uk": "Senior Software Engineer"
    },
    "tagline": {
      "en": "Building robust web solutions with 5+ years of full-stack expertise",
      "uk": "Створюю надійні веб-рішення з 5+ роками full-stack досвіду"
    },
    "location": {
      "city": "Krakow",
      "country": "Poland",
      "en": "Krakow, Poland",
      "uk": "Краків, Польща"
    },
    "contacts": {
      "email": "",
      "phone": "",
      "linkedin": "https://www.linkedin.com/in/viktorzhelizko/",
      "github": "https://github.com/victorchei",
      "telegram": "",
      "website": "https://victorchei.github.io/resume-builder/"
    },
    "summary": {
      "en": "Dedicated software engineer with 5+ years of comprehensive full-stack experience. Specialized in React, TypeScript, and Node.js ecosystems. Built enterprise-grade SPAs for energy monitoring, design systems, and data collection platforms. Strong communicator, problem-solver, and team player who delivers high-quality solutions on time.",
      "uk": "Досвідчений software engineer з 5+ роками комплексного full-stack досвіду. Спеціалізація: React, TypeScript та Node.js екосистеми. Створював enterprise-рівня SPA для моніторингу енергії, дизайн-системи та платформи збору даних. Сильний комунікатор, problem-solver, командний гравець, який забезпечує якісні рішення вчасно."
    },
    "photo": "/images/photo.jpg",
    "availability": {
      "status": "open",
      "note": {
        "en": "Open to new opportunities",
        "uk": "Відкритий до нових можливостей"
      }
    }
  },
  "experience": [
    {
      "id": "exp-1",
      "company": "Infopulse",
      "position": {
        "en": "Senior Software Engineer (Web Solutions)",
        "uk": "Senior Software Engineer (Web Solutions)"
      },
      "location": "Krakow, Poland",
      "startDate": "2025-10",
      "endDate": null,
      "current": true,
      "description": {
        "en": [
          "Architected and developed enterprise SPA for energy domain — monitoring energy distribution, health insights, and asset lifecycle optimization",
          "Led front-end development with React, TypeScript, Redux Toolkit, MUI, and Vitest",
          "Built real-time data pipeline with NestJS, TypeORM, PostgreSQL, and WebSockets",
          "Integrated Azure Active Directory authentication across multiple applications"
        ],
        "uk": [
          "Архітектура та розробка enterprise SPA для енергетичного домену — моніторинг розподілу енергії, інсайти стану обладнання та оптимізація життєвого циклу активів",
          "Лідерство у front-end розробці: React, TypeScript, Redux Toolkit, MUI, Vitest",
          "Побудова real-time пайплайну даних: NestJS, TypeORM, PostgreSQL, WebSockets",
          "Інтеграція Azure Active Directory автентифікації між декількома додатками"
        ]
      },
      "technologies": ["React", "TypeScript", "Redux Toolkit", "MUI", "Vitest", "NestJS", "TypeORM", "PostgreSQL", "WebSockets", "Azure AD"],
      "tags": ["fullstack", "lead", "senior"]
    },
    {
      "id": "exp-2",
      "company": "Infopulse",
      "position": {
        "en": "Software Engineer (Web Solutions)",
        "uk": "Software Engineer (Web Solutions)"
      },
      "location": "Kyiv, Ukraine",
      "startDate": "2021-06",
      "endDate": "2025-10",
      "current": false,
      "description": {
        "en": [
          "Developed Infopulse Design System with React, TypeScript, MUI, Jest, and Redux Toolkit — used across 10+ internal projects",
          "Built interactive eDetailers as multi-page applications using Web Components and Lit Elements",
          "Led front-end development of Infopulse corporate website (JavaScript, SCSS, HTML)",
          "Created SPA for agriculture vacancies search using Next.js, SCSS, and Redux",
          "Developed platform for documenting signs of russian aggression — React, TypeScript, NestJS, CosmosDB",
          "Built staff data collection SPA with React, MUI, and Redux Toolkit",
          "Developed and integrated chatbots into SPA/MPA applications"
        ],
        "uk": [
          "Розробка Infopulse Design System: React, TypeScript, MUI, Jest, Redux Toolkit — використовується у 10+ внутрішніх проєктах",
          "Створення інтерактивних eDetailers як MPA з Web Components та Lit Elements",
          "Лідерство у front-end розробці корпоративного сайту Infopulse (JavaScript, SCSS, HTML)",
          "SPA для пошуку вакансій в агросекторі: Next.js, SCSS, Redux",
          "Платформа документування ознак російської агресії — React, TypeScript, NestJS, CosmosDB",
          "SPA для збору даних персоналу: React, MUI, Redux Toolkit",
          "Розробка та інтеграція чатботів у SPA/MPA додатки"
        ]
      },
      "technologies": ["React", "TypeScript", "Next.js", "JavaScript", "SCSS", "MUI", "Redux Toolkit", "Jest", "Web Components", "Lit", "NestJS", "CosmosDB", "Azure AD"],
      "tags": ["fullstack", "frontend"]
    }
  ],
  "education": [
    {
      "id": "edu-1",
      "institution": {
        "en": "Zhytomyr Polytechnic State University",
        "uk": "Державний університет «Житомирська політехніка»"
      },
      "degree": {
        "en": "Bachelor's Degree",
        "uk": "Бакалавр"
      },
      "field": {
        "en": "Computer Engineering",
        "uk": "Комп'ютерна інженерія"
      },
      "startDate": "2017-09",
      "endDate": "2021-06",
      "description": {
        "en": "",
        "uk": ""
      }
    }
  ],
  "skills": {
    "languages": ["TypeScript", "JavaScript", "HTML", "CSS/SCSS", "SQL", "Python"],
    "frameworks": ["React", "Next.js", "NestJS", "Redux Toolkit", "Node.js", "Express"],
    "ui": ["MUI", "Tailwind CSS", "Styled Components", "Web Components", "Lit"],
    "testing": ["Vitest", "Jest", "Playwright", "React Testing Library"],
    "databases": ["PostgreSQL", "CosmosDB", "MongoDB", "Redis"],
    "tools": ["Git", "Docker", "Azure DevOps", "GitHub Actions", "Webpack", "Vite"],
    "cloud": ["Azure", "Vercel", "AWS"],
    "methodologies": ["Agile/Scrum", "CI/CD", "TDD", "Code Review"],
    "highlighted": ["React", "TypeScript", "Node.js", "Next.js", "PostgreSQL"]
  },
  "languages": [
    {
      "name": { "en": "Ukrainian", "uk": "Українська" },
      "level": { "en": "Native", "uk": "Рідна" }
    },
    {
      "name": { "en": "English", "uk": "Англійська" },
      "level": { "en": "Upper-Intermediate (B2)", "uk": "Вище середнього (B2)" }
    },
    {
      "name": { "en": "Polish", "uk": "Польська" },
      "level": { "en": "Intermediate (B1)", "uk": "Середній (B1)" }
    }
  ],
  "certifications": [
    {
      "name": "NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)",
      "issuer": "Udemy Business",
      "date": "2024",
      "url": ""
    },
    {
      "name": "Master NestJS - a Node.js Framework",
      "issuer": "Udemy Business",
      "date": "2024",
      "url": ""
    }
  ],
  "projects": [],
  "recommendations": [],
  "achievements": [],
  "socialActivity": {
    "github": { "repos": 0, "contributions": 0, "lastUpdated": "" },
    "linkedin": { "followers": 657, "lastUpdated": "2026-03-07" }
  }
}
```

**Step 2: Download profile photo from LinkedIn**

```bash
curl -L "https://media.licdn.com/dms/image/v2/D4D03AQH_ZnNjO7OSdg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727033330440" -o public/images/photo.jpg
```

**Step 3: Commit**

```bash
git add data/profile.json public/images/photo.jpg
git commit -m "feat: populate profile.json with real LinkedIn data + photo"
```

---

### Task 2: Initialize Next.js Project

**Files:**
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Modify: `package.json`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/styles/globals.css`

**Step 1: Install Next.js and dependencies**

```bash
npx create-next-app@latest temp-next --typescript --tailwind --app --src-dir --no-eslint --no-import-alias
# Copy config files from temp-next, then remove it
cp temp-next/next.config.ts temp-next/tsconfig.json temp-next/postcss.config.mjs .
rm -rf temp-next

# Install production deps
npm install next@latest react@latest react-dom@latest next-intl next-sitemap

# Install dev deps
npm install -D @types/react @types/react-dom @types/node tailwindcss @tailwindcss/postcss
```

**Step 2: Update package.json scripts**

Add to `package.json` scripts:
```json
{
  "scripts": {
    "dev": "next dev",
    "build:site": "next build",
    "start": "next start",
    "build:cv": "node src/cli.js build",
    "score": "node src/cli.js score"
  }
}
```

**Step 3: Configure Tailwind with theme variables**

Create `src/styles/globals.css`:
```css
@import "tailwindcss";

@theme {
  --color-bg: #0c0c0f;
  --color-bg-card: #141419;
  --color-bg-elevated: #1a1a22;
  --color-border: #2a2a35;
  --color-text: #e8e6e3;
  --color-text-muted: #8a8a95;
  --color-text-dim: #5a5a65;
  --color-accent: #c8a86e;
  --color-accent-glow: rgba(200, 168, 110, 0.15);
  --color-accent-subtle: rgba(200, 168, 110, 0.08);
  --font-serif: 'DM Serif Display', Georgia, serif;
  --font-sans: 'IBM Plex Sans', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

**Step 4: Create root layout**

Create `src/app/layout.tsx`:
```tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Viktor Zhelizko — Senior Software Engineer',
  description: 'Senior Software Engineer with 5+ years of full-stack expertise in React, TypeScript, and Node.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

**Step 5: Create placeholder page**

Create `src/app/page.tsx`:
```tsx
export default function Home() {
  return <main><h1>Viktor Zhelizko</h1></main>;
}
```

**Step 6: Verify dev server starts**

```bash
npm run dev
# Open http://localhost:3000 — should show "Viktor Zhelizko"
```

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: initialize Next.js 15 with TypeScript and Tailwind CSS 4"
```

---

### Task 3: Data Layer

**Files:**
- Create: `src/lib/data.ts`
- Create: `src/lib/types.ts`

**Step 1: Define TypeScript types**

Create `src/lib/types.ts` with types matching profile.json schema:
```typescript
export interface LocalizedString {
  en: string;
  uk: string;
}

export interface Profile {
  meta: { version: string; lastUpdated: string };
  personal: {
    name: { first: string; last: string };
    title: LocalizedString;
    tagline: LocalizedString;
    location: LocalizedString & { city: string; country: string };
    contacts: Record<string, string>;
    summary: LocalizedString;
    photo: string;
    availability: { status: string; note: LocalizedString };
  };
  experience: Experience[];
  education: Education[];
  skills: Record<string, string[]> & { highlighted: string[] };
  languages: { name: LocalizedString; level: LocalizedString }[];
  certifications: Certification[];
  projects: Project[];
  recommendations: Recommendation[];
  achievements: Achievement[];
  socialActivity: Record<string, Record<string, string | number>>;
}

export interface Experience {
  id: string;
  company: string;
  position: LocalizedString;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: { en: string[]; uk: string[] };
  technologies: string[];
  tags: string[];
}

export interface Education {
  id: string;
  institution: LocalizedString;
  degree: LocalizedString;
  field: LocalizedString;
  startDate: string;
  endDate: string;
  description: LocalizedString;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface Project {
  id: string;
  slug?: string;
  name: LocalizedString;
  description: LocalizedString;
  url: string;
  technologies: string[];
  tags: string[];
  featured?: boolean;
}

export interface Recommendation {
  author: string;
  role: string;
  company: string;
  text: LocalizedString;
  date: string;
}

export interface Achievement {
  title: LocalizedString;
  description: LocalizedString;
  date: string;
  type: string;
}

export type Locale = 'en' | 'uk';
```

**Step 2: Create data loader**

Create `src/lib/data.ts`:
```typescript
import profileData from '../../data/profile.json';
import type { Profile, Locale, LocalizedString } from './types';

const profile = profileData as unknown as Profile;

export function getProfile(): Profile {
  return profile;
}

export function localize(obj: LocalizedString | string | undefined, locale: Locale): string {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[locale] || obj.en || '';
}

export function formatDateRange(startDate: string, endDate: string | null, locale: Locale): string {
  const formatDate = (d: string) => {
    const [year, month] = d.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString(locale === 'uk' ? 'uk-UA' : 'en-US', { year: 'numeric', month: 'short' });
  };
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : (locale === 'uk' ? 'Зараз' : 'Present');
  return `${start} — ${end}`;
}
```

**Step 3: Commit**

```bash
git add src/lib/
git commit -m "feat: data layer — TypeScript types + profile loader + localization utils"
```

---

### Task 4: i18n Setup (next-intl)

**Files:**
- Create: `src/i18n/request.ts`
- Create: `src/i18n/routing.ts`
- Create: `src/messages/en.json`
- Create: `src/messages/uk.json`
- Create: `src/middleware.ts`
- Modify: `src/app/layout.tsx` → move to `src/app/[locale]/layout.tsx`
- Modify: `src/app/page.tsx` → move to `src/app/[locale]/page.tsx`
- Modify: `next.config.ts`

**Step 1: Create i18n routing config**

Create `src/i18n/routing.ts`:
```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'uk'],
  defaultLocale: 'en',
});
```

**Step 2: Create i18n request config**

Create `src/i18n/request.ts`:
```typescript
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

**Step 3: Create middleware**

Create `src/middleware.ts`:
```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(en|uk)/:path*'],
};
```

**Step 4: Create message files**

Create `src/messages/en.json`:
```json
{
  "nav": {
    "home": "Home",
    "experience": "Experience",
    "skills": "Skills",
    "contact": "Contact"
  },
  "hero": {
    "downloadCv": "Download CV",
    "contactMe": "Contact Me"
  },
  "sections": {
    "experience": "Experience",
    "skills": "Skills",
    "education": "Education",
    "languages": "Languages",
    "certifications": "Certifications",
    "contact": "Contact"
  },
  "common": {
    "present": "Present",
    "viewAll": "View All",
    "switchTheme": "Switch Theme",
    "switchLang": "Мова"
  },
  "footer": {
    "rights": "All rights reserved"
  }
}
```

Create `src/messages/uk.json`:
```json
{
  "nav": {
    "home": "Головна",
    "experience": "Досвід",
    "skills": "Навички",
    "contact": "Контакт"
  },
  "hero": {
    "downloadCv": "Завантажити CV",
    "contactMe": "Зв'язатися"
  },
  "sections": {
    "experience": "Досвід",
    "skills": "Навички",
    "education": "Освіта",
    "languages": "Мови",
    "certifications": "Сертифікати",
    "contact": "Контакт"
  },
  "common": {
    "present": "Зараз",
    "viewAll": "Переглянути все",
    "switchTheme": "Змінити тему",
    "switchLang": "Language"
  },
  "footer": {
    "rights": "Всі права захищені"
  }
}
```

**Step 5: Update next.config.ts**

```typescript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {};

export default withNextIntl(nextConfig);
```

**Step 6: Move app files to [locale] directory**

```bash
mkdir -p src/app/\[locale\]
mv src/app/layout.tsx src/app/\[locale\]/layout.tsx
mv src/app/page.tsx src/app/\[locale\]/page.tsx
```

Update `src/app/[locale]/layout.tsx`:
```tsx
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Viktor Zhelizko — Senior Software Engineer',
  description: 'Senior Software Engineer with 5+ years of full-stack expertise',
};

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
```

**Step 7: Verify both locales work**

```bash
npm run dev
# http://localhost:3000/en — English
# http://localhost:3000/uk — Ukrainian
```

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: i18n setup — next-intl with EN/UK locales, middleware, messages"
```

---

### Task 5: Theme System

**Files:**
- Create: `src/lib/themes.ts`
- Create: `src/components/layout/ThemeSwitcher.tsx`
- Modify: `src/styles/globals.css`
- Modify: `src/app/[locale]/layout.tsx`

**Step 1: Define theme CSS variables**

Update `src/styles/globals.css` with theme classes:
```css
@import "tailwindcss";

/* Dark Editorial (default) */
:root, [data-theme="dark"] {
  --bg: #0c0c0f;
  --bg-card: #141419;
  --bg-elevated: #1a1a22;
  --border: #2a2a35;
  --text: #e8e6e3;
  --text-muted: #8a8a95;
  --text-dim: #5a5a65;
  --accent: #c8a86e;
  --accent-glow: rgba(200, 168, 110, 0.15);
  --accent-subtle: rgba(200, 168, 110, 0.08);
}

/* Light Professional */
[data-theme="light"] {
  --bg: #fafafa;
  --bg-card: #ffffff;
  --bg-elevated: #f0f0f5;
  --border: #e2e2ea;
  --text: #1a1a2e;
  --text-muted: #555566;
  --text-dim: #888899;
  --accent: #1a3a5c;
  --accent-glow: rgba(26, 58, 92, 0.12);
  --accent-subtle: rgba(26, 58, 92, 0.06);
}

@theme {
  --font-serif: 'DM Serif Display', Georgia, serif;
  --font-sans: 'IBM Plex Sans', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  transition: background 0.3s ease, color 0.3s ease;
}
```

**Step 2: Create theme switcher component**

Create `src/components/layout/ThemeSwitcher.tsx`:
```tsx
'use client';

import { useEffect, useState } from 'react';

const themes = ['dark', 'light'] as const;
type Theme = typeof themes[number];

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
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
  };

  return (
    <button onClick={toggle} aria-label="Switch theme"
      className="p-2 rounded-md border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors text-sm font-mono">
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}
```

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: theme system — dark/light with CSS variables + ThemeSwitcher"
```

---

### Task 6: Layout Components

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/LocaleSwitcher.tsx`
- Modify: `src/app/[locale]/layout.tsx`

**Step 1: Create Header with navigation, theme switcher, locale switcher**

Create `src/components/layout/Header.tsx`:
```tsx
'use client';

import { useTranslations } from 'next-intl';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LocaleSwitcher } from './LocaleSwitcher';

export function Header() {
  const t = useTranslations('nav');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="font-mono text-sm text-[var(--accent)] tracking-wider">VZ</a>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#experience" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">{t('experience')}</a>
          <a href="#skills" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">{t('skills')}</a>
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
```

**Step 2: Create LocaleSwitcher**

Create `src/components/layout/LocaleSwitcher.tsx`:
```tsx
'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggle = () => {
    const next = locale === 'en' ? 'uk' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${next}`);
    router.push(newPath);
  };

  return (
    <button onClick={toggle} aria-label="Switch language"
      className="p-2 rounded-md border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors text-sm font-mono">
      {locale === 'en' ? 'UK' : 'EN'}
    </button>
  );
}
```

**Step 3: Create Footer**

Create `src/components/layout/Footer.tsx`:
```tsx
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
```

**Step 4: Wire layout**

Update `src/app/[locale]/layout.tsx` to include Header + Footer + Google Fonts.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: layout — Header (nav, theme, locale), Footer, LocaleSwitcher"
```

---

### Task 7: Homepage Sections

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Create: `src/components/sections/ExperienceTimeline.tsx`
- Create: `src/components/sections/SkillsGrid.tsx`
- Create: `src/components/sections/EducationSection.tsx`
- Create: `src/components/sections/ContactCTA.tsx`
- Create: `src/components/sections/CertificationsSection.tsx`
- Create: `src/components/ui/SectionLabel.tsx`
- Modify: `src/app/[locale]/page.tsx`

**Step 1: Create SectionLabel component**

```tsx
// src/components/ui/SectionLabel.tsx
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-xs text-[var(--accent)] uppercase tracking-[3px] mb-8 flex items-center gap-4">
      {children}
      <div className="flex-1 h-px bg-gradient-to-r from-[var(--border)] to-transparent" />
    </div>
  );
}
```

**Step 2: Create Hero section**

Hero with name, title, tagline, photo (from LinkedIn), location, contact links, Download CV + Contact Me buttons.

**Step 3: Create ExperienceTimeline**

Timeline with markers, dates, descriptions, tech tags. Use data from profile.json.

**Step 4: Create SkillsGrid**

Card grid grouped by category. Highlighted skills have accent border.

**Step 5: Create EducationSection, CertificationsSection**

Simple cards with institution, degree, dates.

**Step 6: Create ContactCTA**

Contact links with SVG icons (email, LinkedIn, GitHub, Telegram). No form — direct links only.

**Step 7: Assemble homepage**

Update `src/app/[locale]/page.tsx` to compose all sections with profile data.

**Step 8: Verify all sections render with real data in both locales**

```bash
npm run dev
# Check http://localhost:3000/en and http://localhost:3000/uk
```

**Step 9: Commit**

```bash
git add -A
git commit -m "feat: homepage — Hero, Experience, Skills, Education, Certs, Contact sections"
```

---

### Task 8: SEO

**Files:**
- Create: `src/components/seo/JsonLd.tsx`
- Modify: `src/app/[locale]/layout.tsx` — metadata
- Create: `next-sitemap.config.js`
- Modify: `package.json` — postbuild script

**Step 1: Create JSON-LD structured data**

Person schema with name, title, employer, skills, social profiles, image.

**Step 2: Configure metadata per locale**

Dynamic metadata with `generateMetadata()` — title, description, OG image, Twitter card, canonical URL, hreflang alternate.

**Step 3: Setup next-sitemap**

```javascript
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://victorchei.github.io/resume-builder',
  generateRobotsTxt: true,
  outDir: './out',
};
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: SEO — JSON-LD Person schema, OG tags, sitemap, robots.txt"
```

---

### Task 9: Responsive Polish + Animations

**Files:**
- Modify: all section components for responsive breakpoints
- Add: intersection observer scroll animations

**Step 1: Test all breakpoints (480, 768, 1024, 1280)**

Use Chrome DevTools device toolbar. Fix any layout issues.

**Step 2: Add scroll reveal animations**

Simple intersection observer — fade-up on section enter.

**Step 3: Lighthouse audit**

Run Lighthouse on both locales. Target: Performance 95+, SEO 100, Accessibility 100.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: responsive design + scroll animations + Lighthouse optimization"
```

---

### Task 10: Build + Deploy

**Step 1: Configure static export for GitHub Pages**

Update `next.config.ts`:
```typescript
const nextConfig = {
  output: 'export',
  basePath: '/resume-builder',
  images: { unoptimized: true },
};
```

**Step 2: Build and verify**

```bash
npm run build:site
npx serve out
# Verify all pages work with basePath
```

**Step 3: Copy output to docs/ for GitHub Pages**

```bash
rm -rf docs
cp -r out docs
```

**Step 4: Push and verify live site**

```bash
git add -A
git commit -m "feat: Phase 1 complete — Next.js personal brand platform"
git push
```

Verify: `https://victorchei.github.io/resume-builder/`

---

## Task Summary

| # | Task | Est. |
|---|------|------|
| 1 | Populate profile.json + photo | 10 min |
| 2 | Init Next.js project | 15 min |
| 3 | Data layer (types + loader) | 10 min |
| 4 | i18n (next-intl EN/UK) | 15 min |
| 5 | Theme system (dark/light) | 10 min |
| 6 | Layout (Header, Footer, Switchers) | 15 min |
| 7 | Homepage sections (Hero, Exp, Skills, Edu, Contact) | 30 min |
| 8 | SEO (JSON-LD, OG, sitemap) | 15 min |
| 9 | Responsive + animations + Lighthouse | 20 min |
| 10 | Build + deploy to GitHub Pages | 10 min |
