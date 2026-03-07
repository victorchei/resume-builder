import { readFileSync, readdirSync } from 'fs';
import { resolve, basename } from 'path';
import yaml from 'js-yaml';
import { loadProfile } from './utils/profile.js';
import { matchKeywords, formatKeywordReport } from './keyword-match.js';

function loadVariant(root, name) {
  return yaml.load(readFileSync(resolve(root, 'variants', `${name}.yml`), 'utf-8'));
}

function resolveForMatch(profile, variant) {
  const lang = variant.language || 'en';
  const localize = (obj) => {
    if (!obj) return obj;
    if (typeof obj === 'object' && obj[lang] !== undefined) return obj[lang];
    return obj;
  };

  return {
    personal: {
      title: variant.titleOverride || localize(profile.personal.title),
      summary: variant.summaryOverride || localize(profile.personal.summary),
    },
    experience: profile.experience.map(exp => ({
      position: localize(exp.position),
      description: localize(exp.description),
      technologies: exp.technologies,
    })),
    skills: (() => {
      const s = {};
      const cats = variant.skillCategories || Object.keys(profile.skills);
      for (const cat of cats) {
        if (profile.skills[cat]?.length) s[cat] = profile.skills[cat];
      }
      return s;
    })(),
  };
}

export async function matchCmd(opts) {
  const { root, variant: variantName, jdFile } = opts;
  const profile = loadProfile(root);
  const variant = loadVariant(root, variantName);
  const data = resolveForMatch(profile, variant);

  const jdPath = resolve(process.cwd(), jdFile);
  const jdText = readFileSync(jdPath, 'utf-8');

  console.log(`\nMatching: ${variantName} vs ${jdFile}`);
  const result = matchKeywords(data, jdText);
  console.log(formatKeywordReport(result));
}
