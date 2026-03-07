import { readFileSync, readdirSync } from 'fs';
import { resolve, basename } from 'path';
import yaml from 'js-yaml';
import { loadProfile } from './utils/profile.js';
import { scoreResume, formatScoreReport } from './scoring.js';

function loadVariant(root, name) {
  return yaml.load(readFileSync(resolve(root, 'variants', `${name}.yml`), 'utf-8'));
}

function resolveForScoring(profile, variant) {
  const lang = variant.language || 'en';
  const localize = (obj) => {
    if (!obj) return obj;
    if (typeof obj === 'object' && obj[lang] !== undefined) return obj[lang];
    return obj;
  };

  const personal = {
    name: `${profile.personal.name.first} ${profile.personal.name.last}`,
    title: variant.titleOverride || localize(profile.personal.title),
    location: localize(profile.personal.location),
    contacts: profile.personal.contacts,
    summary: variant.summaryOverride || localize(profile.personal.summary),
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

  const skills = {};
  const cats = variant.skillCategories || Object.keys(profile.skills);
  for (const cat of cats) {
    if (profile.skills[cat]?.length) skills[cat] = profile.skills[cat];
  }

  const education = profile.education.map(edu => ({
    ...edu,
    institution: localize(edu.institution),
    degree: localize(edu.degree),
    field: localize(edu.field),
  }));

  const languages = profile.languages.map(l => ({
    name: localize(l.name),
    level: localize(l.level),
  }));

  let projects = profile.projects?.map(p => ({
    ...p,
    description: localize(p.description),
  })) || [];

  if (variant.limits?.projects) projects = projects.slice(0, variant.limits.projects);

  return { personal, experience, education, skills, languages, projects, sections: variant.sections, certifications: profile.certifications || [] };
}

export async function scoreVariant(opts) {
  const { root, all } = opts;
  const profile = loadProfile(root);

  const variants = all
    ? readdirSync(resolve(root, 'variants')).filter(f => f.endsWith('.yml')).map(f => basename(f, '.yml'))
    : [opts.variant];

  for (const name of variants) {
    const variant = loadVariant(root, name);
    const data = resolveForScoring(profile, variant);
    const report = scoreResume(data);

    console.log(`\n--- ${name} (${variant.language}) ---`);
    console.log(formatScoreReport(report));
  }
}
