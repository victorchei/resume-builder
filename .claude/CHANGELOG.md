# Resume Builder — CHANGELOG

## 2026-03-07

### Session 1 — Personal Brand Platform Phase 1

#### Added
- Design document: `docs/plans/2026-03-07-personal-brand-platform-design.md` — full platform vision, architecture, data model, SEO, i18n, phases
- Phase 1 implementation plan: `docs/plans/2026-03-07-phase1-implementation.md` — 10-task breakdown
- Next.js 15 with TypeScript, Tailwind CSS 4, App Router
- `data/profile.json` populated with real LinkedIn data (experience at Infopulse, education, skills, certifications, languages)
- Data layer: `src/lib/types.ts` + `src/lib/data.ts` (TypeScript types, profile loader, localize/formatDateRange utils)
- i18n with next-intl: EN/UK locales, message files, routing, locale switcher
- Theme system: dark editorial (default) + light professional, CSS variables, ThemeSwitcher component
- Layout: Header (nav, theme/locale switchers), Footer, Google Fonts (DM Serif Display, IBM Plex Sans, JetBrains Mono)
- Homepage sections: Hero, ExperienceTimeline, SkillsGrid, EducationSection, CertificationsSection, LanguagesSection, ContactCTA
- SEO: JSON-LD Person schema, Open Graph tags, hreflang alternates, next-sitemap (sitemap.xml + robots.txt)
- Scroll reveal animations (IntersectionObserver fade-up), noise texture overlay, smooth scrolling
- Static export to `docs/` for GitHub Pages, `.nojekyll`, root redirect
- ATS/HR scoring engine (20 rules, 6 categories) — from earlier CLI work
- Keyword matcher for JD gap analysis — from earlier CLI work

#### Changed
- package.json: existing CLI scripts preserved as `build:cv`, `dev:cv`; new `dev`, `build:site`, `start` for Next.js

#### Technical Notes
- LinkedIn photo download blocked — using placeholder SVG (`public/images/photo.svg`)
- Middleware removed for static export compatibility (next-intl `setRequestLocale` used instead)
- next-sitemap config uses ESM (`export default`) due to `"type": "module"` in package.json
