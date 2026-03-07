# Resume Builder

Inherits: [life-ecosystem CLAUDE.md](../../../CLAUDE.md)

Resume/CV generator: single `data/profile.json` -> PDF, DOCX, GitHub Pages. ATS/HR scoring engine with 20 research-backed rules.

## Structure

- `data/profile.json` — master data (bilingual EN/UK)
- `data/sources/` — raw imports (LinkedIn export, old CVs) — gitignored
- `data/job-descriptions/` — target JDs for keyword matching
- `variants/*.yml` — per-goal configs (sections, filters, language, theme)
- `src/scoring.js` — 20-rule ATS/HR scoring engine (structure, quantification, format, length, verbs, content)
- `src/keyword-match.js` — JD keyword gap analysis
- `docs/` — GitHub Pages output
- `docs/ats-research.md` — HR screening research reference

## Commands

| Command | Purpose |
|---------|---------|
| `node src/cli.js build -v fullstack -f all` | Build specific variant (pdf/docx/html/all) |
| `node src/cli.js build --all` | Build all variants, all formats |
| `node src/cli.js score --all` | ATS/HR score all variants (20 rules, 6 categories) |
| `node src/cli.js match <jd.txt> -v fullstack` | Keyword gap analysis vs job description |
| `node src/cli.js serve --open` | Local GitHub Pages preview |

## Variants

| Variant | Language | Theme | Focus |
|---------|----------|-------|-------|
| `fullstack` | EN | modern | Full-stack dev, all sections |
| `fullstack-uk` | UK | modern | Ukrainian version |
| `lead` | EN | modern | Tech lead, management focus |
| `ats-safe` | EN | ats | Maximum ATS compatibility, skills-first order |

## Score Model (research-backed)

Structure 20 + Quantification 20 + Format 10 + Length 5 + Verbs 5 + Content 40 = 100. Grades: 85+=excellent, 70+=good, 50+=borderline, <50=weak.

## Data Sources

- LinkedIn: https://www.linkedin.com/in/viktorzhelizko/
- Google Drive (old CVs): https://drive.google.com/drive/folders/1DXx0xhVg7T_CfbhfYqXLEEIwLRA5GjUC
