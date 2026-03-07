import { formatDateRange } from '../utils/profile.js';

/**
 * GitHub Pages resume site generator.
 * Design: Editorial dark theme with geometric accents.
 * Separate from ATS HTML — this is for humans, not robots.
 */
export function generateSite(profile, lang = 'en') {
  const localize = (obj) => {
    if (!obj) return '';
    if (typeof obj === 'object' && obj[lang] !== undefined) return obj[lang];
    return obj || '';
  };

  const name = `${profile.personal.name.first} ${profile.personal.name.last}`;
  const title = localize(profile.personal.title);
  const location = localize(profile.personal.location);
  const summary = localize(profile.personal.summary);
  const contacts = profile.personal.contacts;

  const experience = profile.experience.map(exp => ({
    position: localize(exp.position),
    company: exp.company,
    location: exp.location,
    startDate: exp.startDate,
    endDate: exp.endDate,
    current: exp.current,
    description: localize(exp.description),
    technologies: exp.technologies || [],
  }));

  const education = profile.education.map(edu => ({
    institution: localize(edu.institution),
    degree: localize(edu.degree),
    field: localize(edu.field),
    startDate: edu.startDate,
    endDate: edu.endDate,
  }));

  const skills = profile.skills;
  const languages = profile.languages.map(l => ({
    name: localize(l.name),
    level: localize(l.level),
  }));

  const labels = lang === 'uk'
    ? { exp: 'Досвід', skills: 'Навички', edu: 'Освіта', langs: 'Мови', projects: 'Проєкти', download: 'Завантажити CV', present: 'Зараз' }
    : { exp: 'Experience', skills: 'Skills', edu: 'Education', langs: 'Languages', projects: 'Projects', download: 'Download CV', present: 'Present' };

  const expHTML = experience.filter(e => e.position || e.company).map(exp => {
    const dateRange = formatDateRange(exp.startDate, exp.endDate, lang);
    const bullets = Array.isArray(exp.description)
      ? exp.description.map(d => `<li>${d}</li>`).join('\n              ')
      : '';
    const techs = exp.technologies.length
      ? `<div class="tech-stack">${exp.technologies.map(t => `<span>${t}</span>`).join('')}</div>`
      : '';

    return `
          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="timeline-header">
                <div>
                  <h3>${exp.position}</h3>
                  <div class="company">${exp.company}${exp.location ? ` <span class="loc">${exp.location}</span>` : ''}</div>
                </div>
                <time>${dateRange}</time>
              </div>
              ${bullets ? `<ul>${bullets}</ul>` : ''}
              ${techs}
            </div>
          </div>`;
  }).join('\n');

  const skillsHTML = Object.entries(skills)
    .filter(([, items]) => items.length)
    .map(([cat, items]) => `
          <div class="skill-group">
            <h4>${cat}</h4>
            <div class="skill-tags">${items.map(s => `<span>${s}</span>`).join('')}</div>
          </div>`
    ).join('\n');

  const eduHTML = education.filter(e => e.institution || e.degree).map(edu => {
    const dateRange = formatDateRange(edu.startDate, edu.endDate, lang);
    return `
          <div class="edu-item">
            <h3>${edu.degree}${edu.field ? ` — ${edu.field}` : ''}</h3>
            <div class="edu-meta">${edu.institution} <time>${dateRange}</time></div>
          </div>`;
  }).join('\n');

  const langsHTML = languages.filter(l => l.name).map(l =>
    `<div class="lang-item"><span class="lang-name">${l.name}</span><span class="lang-level">${l.level}</span></div>`
  ).join('\n            ');

  const contactLinks = [];
  if (contacts.email) contactLinks.push(`<a href="mailto:${contacts.email}" class="contact-link"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>${contacts.email}</a>`);
  if (contacts.phone) contactLinks.push(`<a href="tel:${contacts.phone}" class="contact-link"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>${contacts.phone}</a>`);
  if (contacts.linkedin) contactLinks.push(`<a href="${contacts.linkedin}" target="_blank" class="contact-link"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>LinkedIn</a>`);
  if (contacts.github) contactLinks.push(`<a href="${contacts.github}" target="_blank" class="contact-link"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>GitHub</a>`);
  if (contacts.website) contactLinks.push(`<a href="${contacts.website}" target="_blank" class="contact-link"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>Website</a>`);

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — ${title}</title>
  <meta name="description" content="${name} — ${title}. ${summary ? summary.slice(0, 155) : ''}">
  <meta property="og:title" content="${name} — ${title}">
  <meta property="og:type" content="profile">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=IBM+Plex+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
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
      --serif: 'DM Serif Display', Georgia, serif;
      --sans: 'IBM Plex Sans', -apple-system, sans-serif;
      --mono: 'JetBrains Mono', 'Fira Code', monospace;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    html { scroll-behavior: smooth; }

    body {
      font-family: var(--sans);
      background: var(--bg);
      color: var(--text);
      line-height: 1.7;
      font-size: 15px;
      -webkit-font-smoothing: antialiased;
    }

    /* === NOISE TEXTURE === */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 0;
    }

    /* === GEOMETRIC ACCENT === */
    .geo-accent {
      position: fixed;
      top: -200px;
      right: -200px;
      width: 600px;
      height: 600px;
      border: 1px solid var(--border);
      border-radius: 50%;
      opacity: 0.3;
      pointer-events: none;
      z-index: 0;
    }
    .geo-accent::after {
      content: '';
      position: absolute;
      top: 80px;
      left: 80px;
      right: 80px;
      bottom: 80px;
      border: 1px solid var(--border);
      border-radius: 50%;
    }

    /* === LAYOUT === */
    .page {
      position: relative;
      z-index: 1;
      max-width: 860px;
      margin: 0 auto;
      padding: 80px 40px 60px;
    }

    /* === HERO === */
    .hero {
      margin-bottom: 64px;
      padding-bottom: 48px;
      border-bottom: 1px solid var(--border);
    }
    .hero-eyebrow {
      font-family: var(--mono);
      font-size: 0.75em;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 3px;
      margin-bottom: 16px;
      opacity: 0;
      animation: fadeUp 0.6s ease forwards;
    }
    .hero h1 {
      font-family: var(--serif);
      font-size: clamp(2.5rem, 6vw, 4rem);
      font-weight: 400;
      color: var(--text);
      line-height: 1.1;
      margin-bottom: 12px;
      opacity: 0;
      animation: fadeUp 0.6s ease 0.1s forwards;
    }
    .hero h1 .accent { color: var(--accent); }
    .hero .subtitle {
      font-size: 1.2em;
      color: var(--text-muted);
      font-weight: 300;
      margin-bottom: 24px;
      opacity: 0;
      animation: fadeUp 0.6s ease 0.2s forwards;
    }
    .hero .location {
      font-family: var(--mono);
      font-size: 0.8em;
      color: var(--text-dim);
      display: flex;
      align-items: center;
      gap: 6px;
      opacity: 0;
      animation: fadeUp 0.6s ease 0.25s forwards;
    }
    .hero .location::before {
      content: '';
      width: 6px;
      height: 6px;
      background: var(--accent);
      border-radius: 50%;
    }

    /* === CONTACTS === */
    .contacts-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-top: 28px;
      opacity: 0;
      animation: fadeUp 0.6s ease 0.3s forwards;
    }
    .contact-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--text-muted);
      font-size: 0.85em;
      padding: 8px 16px;
      border: 1px solid var(--border);
      border-radius: 6px;
      transition: all 0.25s ease;
      text-decoration: none;
    }
    .contact-link:hover {
      color: var(--accent);
      border-color: var(--accent);
      background: var(--accent-subtle);
      text-decoration: none;
    }
    .contact-link svg { flex-shrink: 0; }

    /* === SUMMARY === */
    .summary {
      font-size: 1.05em;
      line-height: 1.8;
      color: var(--text-muted);
      max-width: 680px;
      margin-bottom: 64px;
      opacity: 0;
      animation: fadeUp 0.6s ease 0.35s forwards;
    }

    /* === SECTIONS === */
    section {
      margin-bottom: 56px;
    }
    .section-label {
      font-family: var(--mono);
      font-size: 0.7em;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 3px;
      margin-bottom: 32px;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .section-label::after {
      content: '';
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, var(--border), transparent);
    }

    /* === TIMELINE === */
    .timeline { position: relative; }
    .timeline::before {
      content: '';
      position: absolute;
      left: 7px;
      top: 8px;
      bottom: 0;
      width: 1px;
      background: linear-gradient(180deg, var(--accent), var(--border) 80%, transparent);
    }
    .timeline-item {
      position: relative;
      padding-left: 40px;
      margin-bottom: 36px;
    }
    .timeline-item:last-child { margin-bottom: 0; }
    .timeline-marker {
      position: absolute;
      left: 3px;
      top: 8px;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      border: 2px solid var(--accent);
      background: var(--bg);
    }
    .timeline-item:first-child .timeline-marker {
      background: var(--accent);
      box-shadow: 0 0 12px var(--accent-glow);
    }
    .timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 8px;
    }
    .timeline-header h3 {
      font-size: 1.05em;
      font-weight: 600;
      color: var(--text);
    }
    .timeline-header time {
      font-family: var(--mono);
      font-size: 0.78em;
      color: var(--text-dim);
      white-space: nowrap;
    }
    .company {
      font-size: 0.9em;
      color: var(--text-muted);
      margin-bottom: 8px;
    }
    .company .loc {
      color: var(--text-dim);
      font-size: 0.9em;
    }
    .company .loc::before { content: ' / '; }
    .timeline-content ul {
      list-style: none;
      padding: 0;
    }
    .timeline-content li {
      position: relative;
      padding-left: 18px;
      margin-bottom: 6px;
      color: var(--text-muted);
      font-size: 0.92em;
    }
    .timeline-content li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 10px;
      width: 4px;
      height: 1px;
      background: var(--accent);
    }
    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 12px;
    }
    .tech-stack span {
      font-family: var(--mono);
      font-size: 0.72em;
      color: var(--text-dim);
      padding: 3px 10px;
      border: 1px solid var(--border);
      border-radius: 3px;
      transition: all 0.2s ease;
    }
    .tech-stack span:hover {
      border-color: var(--accent);
      color: var(--accent);
    }

    /* === SKILLS === */
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 24px;
    }
    .skill-group {
      padding: 20px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 8px;
      transition: border-color 0.25s ease;
    }
    .skill-group:hover { border-color: var(--accent); }
    .skill-group h4 {
      font-family: var(--mono);
      font-size: 0.72em;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 12px;
    }
    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .skill-tags span {
      font-size: 0.85em;
      color: var(--text-muted);
      padding: 4px 10px;
      background: var(--bg-elevated);
      border-radius: 4px;
      transition: all 0.2s ease;
    }
    .skill-tags span:hover {
      color: var(--text);
      background: var(--accent-subtle);
    }

    /* === EDUCATION === */
    .edu-item {
      padding: 20px 24px;
      background: var(--bg-card);
      border-left: 2px solid var(--accent);
      margin-bottom: 16px;
      border-radius: 0 8px 8px 0;
    }
    .edu-item h3 {
      font-size: 1em;
      font-weight: 500;
      margin-bottom: 4px;
    }
    .edu-meta {
      font-size: 0.85em;
      color: var(--text-muted);
    }
    .edu-meta time {
      font-family: var(--mono);
      font-size: 0.9em;
      color: var(--text-dim);
    }
    .edu-meta time::before { content: ' / '; }

    /* === LANGUAGES === */
    .langs-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .lang-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 20px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 8px;
      min-width: 180px;
    }
    .lang-name {
      font-weight: 500;
      font-size: 0.95em;
    }
    .lang-level {
      font-family: var(--mono);
      font-size: 0.75em;
      color: var(--text-dim);
    }

    /* === DOWNLOAD BAR === */
    .download-bar {
      margin-top: 56px;
      padding-top: 40px;
      border-top: 1px solid var(--border);
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }
    .download-bar .label {
      font-family: var(--mono);
      font-size: 0.72em;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .btn-download {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 24px;
      background: transparent;
      border: 1px solid var(--accent);
      color: var(--accent);
      font-family: var(--mono);
      font-size: 0.8em;
      text-decoration: none;
      border-radius: 6px;
      transition: all 0.25s ease;
      letter-spacing: 0.5px;
    }
    .btn-download:hover {
      background: var(--accent);
      color: var(--bg);
      text-decoration: none;
    }

    /* === FOOTER === */
    footer {
      margin-top: 80px;
      padding: 24px 0;
      border-top: 1px solid var(--border);
      text-align: center;
    }
    footer p {
      font-family: var(--mono);
      font-size: 0.7em;
      color: var(--text-dim);
      letter-spacing: 1px;
    }

    /* === ANIMATIONS === */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* === RESPONSIVE === */
    @media (max-width: 640px) {
      .page { padding: 40px 20px; }
      .hero h1 { font-size: 2.2rem; }
      .timeline-header { flex-direction: column; }
      .skills-grid { grid-template-columns: 1fr; }
      .contacts-bar { flex-direction: column; }
      .contact-link { justify-content: center; }
      .download-bar { flex-direction: column; align-items: flex-start; }
    }

    @media (max-width: 400px) {
      .hero h1 { font-size: 1.8rem; }
      .langs-row { flex-direction: column; }
      .lang-item { min-width: 100%; }
    }

    @media print {
      body { background: white; color: #111; }
      body::before, .geo-accent { display: none; }
      .page { padding: 20px; max-width: 100%; }
      .hero { margin-bottom: 24px; padding-bottom: 16px; }
      .contact-link { border: none; padding: 4px 0; color: #333; }
      .skill-group, .edu-item, .lang-item { background: #f5f5f5; border-color: #ddd; }
      .btn-download { display: none; }
      .timeline::before { background: #ccc; }
      .timeline-marker { border-color: #666; }
      section { margin-bottom: 24px; }
      a { color: #333; }
    }
  </style>
</head>
<body>
  <div class="geo-accent"></div>
  <div class="page">
    <header class="hero">
      <div class="hero-eyebrow">Portfolio & Resume</div>
      <h1>${name.split(' ')[0]} <span class="accent">${name.split(' ').slice(1).join(' ')}</span></h1>
      <div class="subtitle">${title}</div>
      ${location ? `<div class="location">${location}</div>` : ''}
      <div class="contacts-bar">
        ${contactLinks.join('\n        ')}
      </div>
    </header>

    ${summary ? `<div class="summary">${summary}</div>` : ''}

    ${expHTML ? `
    <section>
      <div class="section-label">${labels.exp}</div>
      <div class="timeline">
        ${expHTML}
      </div>
    </section>` : ''}

    ${skillsHTML ? `
    <section>
      <div class="section-label">${labels.skills}</div>
      <div class="skills-grid">
        ${skillsHTML}
      </div>
    </section>` : ''}

    ${eduHTML ? `
    <section>
      <div class="section-label">${labels.edu}</div>
      ${eduHTML}
    </section>` : ''}

    ${langsHTML ? `
    <section>
      <div class="section-label">${labels.langs}</div>
      <div class="langs-row">
        ${langsHTML}
      </div>
    </section>` : ''}

    <div class="download-bar">
      <span class="label">${labels.download}</span>
      <a href="./fullstack.pdf" class="btn-download">PDF</a>
      <a href="./fullstack.docx" class="btn-download">DOCX</a>
    </div>

    <footer>
      <p>&copy; ${new Date().getFullYear()} ${name}</p>
    </footer>
  </div>
</body>
</html>`;
}
