import { formatDateRange } from '../utils/profile.js';

// ATS-safe fonts per research: Arial, Calibri, Lato, Source Sans Pro, Times New Roman, Garamond
const THEMES = {
  modern: {
    primary: '#1a1a2e',
    accent: '#0f3460',
    link: '#0f3460',
    bg: '#ffffff',
    text: '#333333',
    muted: '#555555',
    border: '#e0e0e0',
    sectionBg: '#f8f9fa',
    font: "'Calibri', 'Arial', sans-serif",
  },
  minimal: {
    primary: '#000000',
    accent: '#333333',
    link: '#0066cc',
    bg: '#ffffff',
    text: '#222222',
    muted: '#555555',
    border: '#dddddd',
    sectionBg: '#fafafa',
    font: "'Garamond', 'Times New Roman', serif",
  },
  ats: {
    primary: '#000000',
    accent: '#1a3a5c',
    link: '#1a3a5c',
    bg: '#ffffff',
    text: '#000000',
    muted: '#444444',
    border: '#cccccc',
    sectionBg: '#ffffff',
    font: "'Arial', sans-serif",
  },
};

export function generateHTML(data, variant) {
  const theme = THEMES[variant.theme] || THEMES.modern;
  const lang = variant.language || 'en';
  const sections = data.sections || ['personal', 'summary', 'experience', 'skills', 'education', 'languages'];

  const sectionRenderers = {
    personal: () => renderPersonal(data.personal, theme),
    summary: () => data.personal.summary ? renderSummary(data.personal.summary, theme) : '',
    experience: () => renderExperience(data.experience, lang, theme),
    skills: () => renderSkills(data.skills, theme),
    education: () => renderEducation(data.education, lang, theme),
    languages: () => renderLanguages(data.languages, theme),
    projects: () => renderProjects(data.projects, theme),
    certifications: () => renderCertifications(data.certifications, theme),
  };

  const labels = {
    en: { experience: 'Experience', skills: 'Skills', education: 'Education', languages: 'Languages', projects: 'Projects', certifications: 'Certifications', summary: 'Summary' },
    uk: { experience: 'Досвід', skills: 'Навички', education: 'Освіта', languages: 'Мови', projects: 'Проєкти', certifications: 'Сертифікати', summary: 'Про мене' },
  };

  const l = labels[lang] || labels.en;

  const body = sections
    .map(s => sectionRenderers[s]?.() || '')
    .filter(Boolean)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.personal.name} — ${data.personal.title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: ${theme.font};
      color: ${theme.text};
      background: ${theme.bg};
      line-height: 1.6;
      font-size: 15px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 40px;
    }
    @media print {
      .container { padding: 20px; max-width: 100%; }
      body { font-size: 13px; }
    }
    a { color: ${theme.link}; text-decoration: none; }
    a:hover { text-decoration: underline; }
    h1 { font-size: 2em; font-weight: 700; color: ${theme.primary}; margin-bottom: 4px; }
    h2 {
      font-size: 1.2em; font-weight: 600; color: ${theme.accent};
      text-transform: uppercase; letter-spacing: 1px;
      border-bottom: 2px solid ${theme.accent};
      padding-bottom: 6px; margin: 28px 0 16px;
    }
    h3 { font-size: 1.05em; font-weight: 600; color: ${theme.primary}; }
    .header { text-align: center; margin-bottom: 8px; }
    .header .title { font-size: 1.15em; color: ${theme.muted}; font-weight: 400; margin-bottom: 8px; }
    .header .contacts { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; font-size: 0.9em; color: ${theme.muted}; }
    .header .contacts span::before { content: '|'; margin-right: 12px; color: ${theme.border}; }
    .header .contacts span:first-child::before { content: ''; margin-right: 0; }
    .summary { font-style: italic; color: ${theme.muted}; padding: 12px 0; }
    .entry { margin-bottom: 18px; }
    .entry-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; }
    .entry-header .date { font-size: 0.9em; color: ${theme.muted}; white-space: nowrap; }
    .entry-sub { font-size: 0.95em; color: ${theme.muted}; margin: 2px 0 6px; }
    .entry ul { padding-left: 20px; }
    .entry li { margin-bottom: 4px; }
    .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
    .tag {
      background: ${theme.sectionBg}; border: 1px solid ${theme.border};
      border-radius: 4px; padding: 2px 8px; font-size: 0.8em; color: ${theme.muted};
    }
    .skills-grid { display: grid; grid-template-columns: 140px 1fr; gap: 8px 16px; }
    .skills-grid .cat { font-weight: 600; color: ${theme.accent}; text-transform: capitalize; }
    .skills-grid .items { display: flex; flex-wrap: wrap; gap: 6px; }
    .langs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 8px; }
    .lang-item { display: flex; justify-content: space-between; padding: 6px 12px; background: ${theme.sectionBg}; border-radius: 4px; }

    @media (max-width: 600px) {
      .container { padding: 20px; }
      h1 { font-size: 1.6em; }
      .entry-header { flex-direction: column; }
      .skills-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="container">
${body}
  </div>
</body>
</html>`;
}

function renderPersonal(p, theme) {
  const contacts = [];
  if (p.contacts.email) contacts.push(`<span><a href="mailto:${p.contacts.email}">${p.contacts.email}</a></span>`);
  if (p.contacts.phone) contacts.push(`<span>${p.contacts.phone}</span>`);
  if (p.contacts.linkedin) contacts.push(`<span><a href="${p.contacts.linkedin}">LinkedIn</a></span>`);
  if (p.contacts.github) contacts.push(`<span><a href="${p.contacts.github}">GitHub</a></span>`);
  if (p.contacts.website) contacts.push(`<span><a href="${p.contacts.website}">Website</a></span>`);
  if (p.location) contacts.push(`<span>${p.location}</span>`);

  return `    <header class="header">
      <h1>${p.name}</h1>
      <div class="title">${p.title}</div>
      <div class="contacts">${contacts.join('\n        ')}</div>
    </header>`;
}

function renderSummary(summary, theme) {
  return `    <section>
      <div class="summary">${summary}</div>
    </section>`;
}

function renderExperience(items, lang, theme) {
  if (!items?.length) return '';
  const label = lang === 'uk' ? 'Досвід' : 'Experience';
  const entries = items.map(exp => {
    const dateRange = formatDateRange(exp.startDate, exp.endDate, lang);
    const bullets = Array.isArray(exp.description)
      ? `\n        <ul>${exp.description.map(d => `\n          <li>${d}</li>`).join('')}\n        </ul>`
      : exp.description ? `<p>${exp.description}</p>` : '';
    const techs = exp.technologies?.length
      ? `\n        <div class="tags">${exp.technologies.map(t => `<span class="tag">${t}</span>`).join('')}</div>`
      : '';

    return `      <div class="entry">
        <div class="entry-header">
          <h3>${exp.position}</h3>
          <span class="date">${dateRange}</span>
        </div>
        <div class="entry-sub">${exp.company}${exp.location ? ` — ${exp.location}` : ''}</div>${bullets}${techs}
      </div>`;
  }).join('\n');

  return `    <section>
      <h2>${label}</h2>
${entries}
    </section>`;
}

function renderSkills(skills, theme) {
  if (!Object.keys(skills).length) return '';
  const rows = Object.entries(skills).map(([cat, items]) =>
    `        <div class="cat">${cat}</div>
        <div class="items">${items.map(s => `<span class="tag">${s}</span>`).join('')}</div>`
  ).join('\n');

  return `    <section>
      <h2>Skills</h2>
      <div class="skills-grid">
${rows}
      </div>
    </section>`;
}

function renderEducation(items, lang, theme) {
  if (!items?.length) return '';
  const label = lang === 'uk' ? 'Освіта' : 'Education';
  const entries = items.map(edu => {
    const dateRange = formatDateRange(edu.startDate, edu.endDate, lang);
    return `      <div class="entry">
        <div class="entry-header">
          <h3>${edu.degree}${edu.field ? ` — ${edu.field}` : ''}</h3>
          <span class="date">${dateRange}</span>
        </div>
        <div class="entry-sub">${edu.institution}</div>
        ${edu.description ? `<p>${edu.description}</p>` : ''}
      </div>`;
  }).join('\n');

  return `    <section>
      <h2>${label}</h2>
${entries}
    </section>`;
}

function renderLanguages(items, theme) {
  if (!items?.length) return '';
  const rows = items.map(l =>
    `        <div class="lang-item"><span>${l.name}</span><span>${l.level}</span></div>`
  ).join('\n');

  return `    <section>
      <h2>Languages</h2>
      <div class="langs-grid">
${rows}
      </div>
    </section>`;
}

function renderProjects(items, theme) {
  if (!items?.length) return '';
  const entries = items.map(p => {
    const link = p.url ? ` <a href="${p.url}">[link]</a>` : '';
    const techs = p.technologies?.length
      ? `\n        <div class="tags">${p.technologies.map(t => `<span class="tag">${t}</span>`).join('')}</div>`
      : '';
    return `      <div class="entry">
        <h3>${p.name}${link}</h3>
        <p>${p.description || ''}</p>${techs}
      </div>`;
  }).join('\n');

  return `    <section>
      <h2>Projects</h2>
${entries}
    </section>`;
}

function renderCertifications(items, theme) {
  if (!items?.length) return '';
  const entries = items.map(c =>
    `      <div class="entry"><h3>${c.name}</h3><div class="entry-sub">${c.issuer} — ${c.date}</div></div>`
  ).join('\n');

  return `    <section>
      <h2>Certifications</h2>
${entries}
    </section>`;
}
