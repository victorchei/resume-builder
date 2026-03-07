# Resume Builder — Backlog

## In Progress
- [ ] Replace placeholder photo with real photo (LinkedIn blocks download — user needs to save manually to `public/images/photo.jpg`)

## Phase 2 — Content & Polish
- [ ] Subpages: /experience, /projects, /skills, /contact
- [ ] Project case study pages (/projects/[slug])
- [ ] Recommendations section
- [ ] Achievements section
- [ ] Third theme (Bold Creative)
- [ ] Moodboard research + theme design refinement
- [ ] Animations polish (scroll reveals, hover effects, transitions)
- [ ] Get old CVs from Google Drive → populate data/sources/

## Phase 3 — Export & Tools
- [ ] PDF/DOCX export as API routes
- [ ] Download CV buttons on site
- [ ] ATS scoring integration into site
- [ ] Keyword matcher CLI preserved

## Phase 4 — Aggregation & Analytics
- [ ] GitHub API aggregation script
- [ ] Analytics (Umami/Plausible)
- [ ] Stack Overflow aggregation
- [ ] CI/CD auto-aggregation pipeline

## Phase 5 — Content & Growth
- [ ] Blog system (MDX)
- [ ] Social media feed aggregation
- [ ] PWA support
- [ ] Hosting decision (custom domain vs github.io)

## Next Session Context

**Last completed:** Phase 1 — all 10 tasks. Site live at https://victorchei.github.io/resume-builder/
**Continue with:** Visual review of live site → fix issues → Phase 2 planning
**Skills to preload:** frontend-design, responsive-design, accessibility, baseline-ui, core-web-vitals
**Notes:**
- Photo is placeholder SVG — user needs to save real photo from LinkedIn to `public/images/photo.jpg` and update `data/profile.json` photo field
- Middleware removed for static export — locale switching uses client-side navigation
- next-intl `setRequestLocale` required in every page/layout for static rendering
- Build: `npm run build:site` → copies to docs/ → push → GitHub Pages auto-deploys
