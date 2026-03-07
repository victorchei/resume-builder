# Personal Brand Platform — Design Document

**Status:** Draft
**Date:** 2026-03-07
**Author:** Viktor Zhelizko

---

## 1. Vision

Full personal brand platform — a living, always-current professional presence online. Not a static resume — a dynamic representation of skills, experience, projects, and professional activity. Serves three audiences simultaneously: recruiters evaluating a candidate, clients seeking a developer, and professional community for networking.

## 2. Architecture

### 2.1 Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 15 (App Router) | SSG/SSR/ISR hybrid, built-in API routes, best SEO |
| Language | TypeScript | Type safety, existing expertise |
| Styling | Tailwind CSS + CSS variables | Theme switching, responsive, utility-first |
| i18n | next-intl | Proven Next.js i18n, SSG-compatible, type-safe |
| Data | profile.json + MDX (future) | Single source of truth, git-versioned |
| Export | Puppeteer (PDF) + docx (DOCX) | Existing generators, migrate as API routes |
| Analytics | Umami (self-hosted) or Plausible | Privacy-first, free, GDPR-compliant |
| SEO | next-sitemap + JSON-LD + OG | Full search engine optimization |
| Testing | Vitest + Playwright | Unit + E2E |

### 2.2 Project Structure

```
resume-builder/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx          # Root layout with i18n
│   │   │   ├── page.tsx            # Hero + summary
│   │   │   ├── experience/
│   │   │   │   └── page.tsx        # Detailed experience
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx        # Portfolio grid
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx    # Project case study
│   │   │   ├── skills/
│   │   │   │   └── page.tsx        # Skills breakdown
│   │   │   ├── recommendations/
│   │   │   │   └── page.tsx        # Testimonials
│   │   │   └── contact/
│   │   │       └── page.tsx        # Contact form + links
│   │   └── api/
│   │       ├── export/
│   │       │   ├── pdf/route.ts    # PDF generation endpoint
│   │       │   └── docx/route.ts   # DOCX generation endpoint
│   │       └── aggregate/
│   │           └── route.ts        # Manual data aggregation trigger
│   ├── components/
│   │   ├── layout/                 # Header, Footer, Navigation, ThemeSwitcher, LocaleSwitcher
│   │   ├── sections/               # Hero, Experience, Skills, Projects, Recommendations, Contact
│   │   ├── ui/                     # Button, Card, Badge, Tag, Timeline, etc.
│   │   └── seo/                    # JsonLd, OpenGraph, StructuredData
│   ├── lib/
│   │   ├── data.ts                 # Profile data loader + resolver
│   │   ├── i18n.ts                 # i18n config + utilities
│   │   ├── themes.ts               # Theme definitions + switching logic
│   │   ├── scoring.ts              # ATS scoring engine (migrated)
│   │   ├── keywords.ts             # Keyword matcher (migrated)
│   │   └── export/
│   │       ├── pdf.ts              # PDF generator (migrated)
│   │       └── docx.ts             # DOCX generator (migrated)
│   ├── styles/
│   │   ├── globals.css             # Base + Tailwind
│   │   └── themes/                 # Theme CSS variable sets
│   └── messages/
│       ├── en.json                 # English translations
│       └── uk.json                 # Ukrainian translations
├── data/
│   ├── profile.json                # Master data (bilingual)
│   ├── projects/                   # Individual project case studies (MDX, future)
│   ├── recommendations.json        # Testimonials
│   ├── sources/                    # Raw imports (gitignored)
│   └── job-descriptions/           # JD files for keyword matching
├── public/
│   ├── images/                     # Photos, project screenshots
│   ├── files/                      # Downloadable CV files
│   └── og/                         # Generated OG images
├── variants/                       # CV variant configs (existing)
├── scripts/
│   ├── aggregate.ts                # Manual data collection script
│   └── build-cv.ts                 # CLI for PDF/DOCX generation
├── docs/
│   └── plans/
└── .claude/
```

### 2.3 Data Model

`profile.json` extends current schema:

```jsonc
{
  "meta": { "version": "2.0.0", "lastUpdated": "..." },
  "personal": {
    "name": { "first": "Viktor", "last": "Zhelizko" },
    "title": { "en": "...", "uk": "..." },
    "tagline": { "en": "...", "uk": "..." },      // NEW: short memorable phrase
    "location": { "en": "...", "uk": "..." },
    "contacts": { "email": "", "phone": "", "linkedin": "", "github": "", "website": "", "telegram": "" },
    "summary": { "en": "...", "uk": "..." },
    "photo": "...",
    "availability": { "status": "open", "note": { "en": "...", "uk": "..." } }  // NEW
  },
  "experience": [/* existing + enhanced descriptions */],
  "education": [/* existing */],
  "skills": {
    // existing categories + NEW:
    "highlighted": ["React", "TypeScript", "Node.js"],  // top skills for hero
    "learning": ["Rust", "Go"]                           // currently learning
  },
  "languages": [/* existing */],
  "certifications": [/* existing */],
  "projects": [
    {
      "id": "proj-1",
      "slug": "energy-monitoring",                // NEW: URL slug
      "name": { "en": "...", "uk": "..." },
      "description": { "en": "...", "uk": "..." },
      "longDescription": { "en": "...", "uk": "..." },  // NEW: case study
      "url": "",
      "repo": "",                                  // NEW
      "image": "",                                 // NEW: screenshot/preview
      "technologies": [],
      "tags": [],
      "metrics": { "en": "...", "uk": "..." },    // NEW: impact/results
      "featured": true                             // NEW: show on homepage
    }
  ],
  "recommendations": [                             // NEW section
    {
      "author": "",
      "role": "",
      "company": "",
      "text": { "en": "...", "uk": "..." },
      "linkedin": "",
      "date": ""
    }
  ],
  "achievements": [                                // NEW section
    {
      "title": { "en": "...", "uk": "..." },
      "description": { "en": "...", "uk": "..." },
      "date": "",
      "type": "hackathon|certification|award|publication|talk"
    }
  ],
  "socialActivity": {                              // NEW: aggregated data
    "github": { "repos": 0, "contributions": 0, "lastUpdated": "" },
    "linkedin": { "followers": 0, "lastUpdated": "" },
    "stackoverflow": { "reputation": 0, "lastUpdated": "" }
  }
}
```

## 3. Pages & Sections

### 3.1 Homepage (/)

| Section | Content | Priority |
|---------|---------|----------|
| Hero | Name, title, tagline, photo, CTA (contact + download CV) | P0 |
| Summary | 2-3 sentences, highlighted skills badges | P0 |
| Featured Projects | 2-3 cards with images, tech stack, metrics | P0 |
| Experience Timeline | Last 3 roles, expandable | P0 |
| Skills Overview | Categorized grid, highlighted top skills | P0 |
| Recommendations | 2-3 featured quotes | P1 |
| Achievements | Recent certifications, hackathons | P1 |
| GitHub Activity | Contribution graph or stats (when aggregation ready) | P2 |
| Contact CTA | Email, LinkedIn, form | P0 |

### 3.2 Subpages

| Page | Content |
|------|---------|
| /experience | Full work history with detailed descriptions, technologies per role |
| /projects | Portfolio grid, filterable by tech/tag |
| /projects/[slug] | Case study: problem, solution, tech, screenshots, metrics |
| /skills | Full skill breakdown, proficiency indicators, learning roadmap |
| /recommendations | All testimonials |
| /contact | Contact form + all social links + availability status |

### 3.3 Utility Pages

| Page | Content |
|------|---------|
| /api/export/pdf?variant=fullstack | Generate PDF on-the-fly |
| /api/export/docx?variant=fullstack | Generate DOCX on-the-fly |
| /sitemap.xml | Auto-generated |
| /robots.txt | SEO |
| /manifest.json | PWA-ready (future) |

## 4. Design System

### 4.1 Multi-Theme

Themes as CSS variable sets. User preference stored in localStorage + cookie (for SSR).

| Theme | Direction | Audience |
|-------|-----------|----------|
| Dark Editorial | Dark bg, gold accent, serif headings | Creative/developer feel |
| Light Professional | White, navy accent, clean sans | Recruiter/corporate |
| Bold Creative | High contrast, vibrant accent | Standout/portfolio |

Switching: toggle in header, smooth transition with `transition: color 0.3s, background 0.3s`.

### 4.2 Typography

| Element | Font |
|---------|------|
| Display/headings | Variable — per theme (DM Serif Display / Playfair / Space Grotesk) |
| Body | IBM Plex Sans or equivalent per theme |
| Code/mono | JetBrains Mono |

### 4.3 Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| < 480px | Mobile portrait |
| 480-768px | Mobile landscape / small tablet |
| 768-1024px | Tablet |
| 1024-1280px | Laptop |
| > 1280px | Desktop |

### 4.4 Animations

- Page load: staggered fade-up for sections
- Scroll: intersection observer reveals
- Hover: subtle scale/glow on cards and buttons
- Theme switch: smooth color transition
- Timeline: progressive reveal on scroll
- Skill tags: hover expansion with detail

## 5. SEO Strategy

### 5.1 Technical SEO

- SSG for all pages → perfect Lighthouse score
- `<head>` metadata per page via Next.js Metadata API
- JSON-LD structured data: Person, WebSite, WebPage, Article (future blog)
- Open Graph + Twitter Card meta tags
- Canonical URLs with locale prefix (/en/, /uk/)
- sitemap.xml auto-generated via next-sitemap
- robots.txt with sitemap reference
- Image optimization via next/image (WebP, lazy loading, srcset)

### 5.2 Content SEO

- Semantic HTML5 (header, main, nav, article, section, aside)
- Proper heading hierarchy (h1 per page, structured h2-h4)
- Alt text on all images
- Internal linking between pages
- Schema.org markup for: Person, Organization (employers), Project

### 5.3 Performance SEO

- Target: Lighthouse 95+ across all metrics
- Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
- Font display: swap + preload
- CSS: Tailwind purge, minimal runtime CSS
- JS: minimal client-side JS, React Server Components where possible

## 6. i18n Architecture

### 6.1 Implementation

- `next-intl` with App Router integration
- Locale prefix: `/en/...`, `/uk/...`
- Default locale: `en` (no prefix redirect)
- Locale detection: Accept-Language header → cookie → default
- All UI strings in `messages/{locale}.json`
- Content (profile data) uses existing `{ "en": "...", "uk": "..." }` pattern
- `hreflang` tags for SEO

### 6.2 Testing

- Every page tested in both locales
- RTL-ready architecture (for future language support)
- Date/number formatting via Intl API
- Playwright E2E tests per locale

## 7. Data Aggregation

### 7.1 V1 — Manual/On-Demand

```bash
# CLI command to pull data from sources
node scripts/aggregate.ts --source=github
node scripts/aggregate.ts --source=linkedin  # requires auth token
node scripts/aggregate.ts --all
```

Script reads API data → updates relevant sections in `profile.json` → commit.

### 7.2 Sources & APIs

| Source | API | Auth | Data |
|--------|-----|------|------|
| GitHub | REST/GraphQL API | PAT | Repos, contributions, languages, stars |
| LinkedIn | Manual export (no public API for profiles) | CSV/JSON export | Experience, skills, recommendations |
| Stack Overflow | Public API | None | Reputation, top answers, tags |

### 7.3 V2 — CI/CD Auto (Backlog)

GitHub Actions workflow:
- Cron: weekly
- Triggers aggregation scripts
- Commits updated profile.json
- Rebuilds + deploys site

## 8. Export System

### 8.1 Migration from Current CLI

Current generators (HTML, PDF, DOCX) migrate to:
- `lib/export/pdf.ts` — Puppeteer-based, renders HTML template → PDF
- `lib/export/docx.ts` — docx library, programmatic generation
- API routes: `/api/export/pdf?variant=fullstack&lang=en`
- Download buttons on site trigger API routes
- ATS scoring engine (`lib/scoring.ts`) validates before export
- Keyword matcher available as CLI tool for job-specific tailoring

### 8.2 Variant System

Existing `variants/*.yml` preserved. Each variant defines:
- Sections to include/exclude
- Experience filters (tags)
- Skill categories
- Language
- Theme (for PDF styling)

## 9. Implementation Phases

### Phase 1 — Foundation (current session scope)
- [ ] Next.js project setup with TypeScript, Tailwind, next-intl
- [ ] Data layer: profile.json loader with locale resolution
- [ ] Base layout: header, footer, navigation, theme switcher, locale switcher
- [ ] Homepage: hero, summary, experience timeline, skills grid, contact CTA
- [ ] Responsive design across all breakpoints
- [ ] Basic SEO: metadata, JSON-LD, sitemap, OG tags
- [ ] Populate profile.json with real data from LinkedIn

### Phase 2 — Content & Polish
- [ ] Subpages: /experience, /projects, /skills, /contact
- [ ] Project case study pages (/projects/[slug])
- [ ] Recommendations section
- [ ] Achievements section
- [ ] Multi-theme implementation (3 themes)
- [ ] Animations (scroll reveals, transitions)
- [ ] Moodboard research + theme design

### Phase 3 — Export & Tools
- [ ] PDF/DOCX export as API routes
- [ ] Download CV buttons on site
- [ ] ATS scoring integration
- [ ] Keyword matcher CLI preserved

### Phase 4 — Aggregation & Analytics (Backlog)
- [ ] GitHub API aggregation script
- [ ] Basic analytics integration (Umami/Plausible)
- [ ] Stack Overflow aggregation
- [ ] CI/CD auto-aggregation pipeline

### Phase 5 — Content & Growth (Backlog)
- [ ] Blog system (MDX)
- [ ] Social media feed aggregation
- [ ] Extended analytics + conversion tracking
- [ ] PWA support
- [ ] A/B testing for themes
- [ ] Hosting decision + deployment

## 10. Success Criteria

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 95+ |
| Lighthouse SEO | 100 |
| Lighthouse Accessibility | 100 |
| ATS Score (exported CV) | 85+ |
| Page load (LCP) | < 2.0s |
| Mobile responsive | All breakpoints tested |
| i18n coverage | 100% strings translated |
| Theme switching | Smooth, no flash |

## Open Questions

1. **Домен** — використовувати github.io чи купувати персональний домен (viktorzhelizko.dev)?
2. **Фото** — де взяти професійне фото для hero? Є на LinkedIn?
3. **Рекомендації** — є люди яких можеш попросити написати відгук? Скільки?
4. **Проєкти** — які проєкти можна показати публічно (NDA обмеження)?
5. **Контактна форма** — потрібна чи достатньо прямих лінків (email, LinkedIn, Telegram)?
