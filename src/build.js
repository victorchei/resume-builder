import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'fs';
import { resolve, basename } from 'path';
import yaml from 'js-yaml';
import { loadProfile } from './utils/profile.js';
import { generateHTML } from './generators/html.js';
import { generatePDF } from './generators/pdf.js';
import { generateDOCX } from './generators/docx.js';
import { scoreResume, formatScoreReport } from './scoring.js';
import { generateSite } from './generators/site.js';

function loadVariant(root, name) {
  const filePath = resolve(root, 'variants', `${name}.yml`);
  return yaml.load(readFileSync(filePath, 'utf-8'));
}

function getAllVariants(root) {
  const dir = resolve(root, 'variants');
  return readdirSync(dir)
    .filter(f => f.endsWith('.yml'))
    .map(f => basename(f, '.yml'));
}

export async function buildResume(opts) {
  const { root, format, output, all } = opts;
  const outDir = resolve(root, output);
  mkdirSync(outDir, { recursive: true });

  const profile = loadProfile(root);
  const variants = all ? getAllVariants(root) : [opts.variant];

  for (const variantName of variants) {
    const variant = loadVariant(root, variantName);
    console.log(`Building: ${variantName} (${variant.language})`);

    const resolvedData = resolveVariant(profile, variant);
    const formats = format === 'all' ? ['html', 'pdf', 'docx'] : [format];

    for (const fmt of formats) {
      const fileName = `${variantName}.${fmt}`;
      const filePath = resolve(outDir, fileName);

      switch (fmt) {
        case 'html': {
          const html = generateHTML(resolvedData, variant);
          writeFileSync(filePath, html, 'utf-8');
          break;
        }
        case 'pdf': {
          await generatePDF(resolvedData, variant, filePath);
          break;
        }
        case 'docx': {
          await generateDOCX(resolvedData, variant, filePath);
          break;
        }
      }
      console.log(`  -> ${fileName}`);
    }
  }

  // Auto-score after build
  for (const variantName of variants) {
    const variant = loadVariant(root, variantName);
    const resolvedData = resolveVariant(profile, variant);
    const report = scoreResume(resolvedData);
    console.log(`\n[Score: ${variantName}] ${report.score}/100${report.issues.length ? ` (${report.issues.length} issues)` : ' — all checks passed'}`);
  }

  // Build GitHub Pages site
  buildGitHubPages(root, profile);
  console.log('\nDone!');
}

function resolveVariant(profile, variant) {
  const lang = variant.language || 'en';

  const localize = (obj) => {
    if (!obj) return obj;
    if (typeof obj === 'object' && obj[lang] !== undefined) return obj[lang];
    return obj;
  };

  const personal = {
    name: `${profile.personal.name.first} ${profile.personal.name.last}`,
    title: localize(profile.personal.title),
    location: localize(profile.personal.location),
    contacts: profile.personal.contacts,
    summary: variant.summaryOverride || localize(profile.personal.summary),
    photo: profile.personal.photo,
  };

  let experience = profile.experience.map(exp => ({
    ...exp,
    position: localize(exp.position),
    description: localize(exp.description),
  }));

  if (variant.experienceTags?.length) {
    experience = experience.filter(exp =>
      exp.tags?.some(t => variant.experienceTags.includes(t))
    );
  }

  if (variant.limits?.experience) {
    experience = experience.slice(0, variant.limits.experience);
  }

  const education = profile.education.map(edu => ({
    ...edu,
    institution: localize(edu.institution),
    degree: localize(edu.degree),
    field: localize(edu.field),
    description: localize(edu.description),
  }));

  const skills = {};
  const cats = variant.skillCategories || Object.keys(profile.skills);
  for (const cat of cats) {
    if (profile.skills[cat]?.length) {
      skills[cat] = profile.skills[cat];
    }
  }

  const languages = profile.languages.map(l => ({
    name: localize(l.name),
    level: localize(l.level),
  }));

  let projects = profile.projects?.map(p => ({
    ...p,
    description: localize(p.description),
  })) || [];

  if (variant.limits?.projects) {
    projects = projects.slice(0, variant.limits.projects);
  }

  return {
    personal,
    experience,
    education,
    skills,
    languages,
    certifications: profile.certifications || [],
    projects,
    sections: variant.sections,
  };
}

function buildGitHubPages(root, profile) {
  const pagesDir = resolve(root, 'docs');
  mkdirSync(pagesDir, { recursive: true });

  // Generate dedicated site page (not ATS template)
  const siteHtml = generateSite(profile, 'en');
  writeFileSync(resolve(pagesDir, 'index.html'), siteHtml, 'utf-8');
  console.log('\nGitHub Pages: docs/index.html updated (site generator)');
}
