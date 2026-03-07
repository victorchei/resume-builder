/**
 * Keyword matcher — compares resume content against a job description.
 * Extracts keywords from JD, finds matches/gaps in resume, suggests improvements.
 */

// Common filler words to ignore
const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
  'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
  'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'shall',
  'this', 'that', 'these', 'those', 'it', 'its', 'we', 'our', 'you', 'your', 'they', 'their',
  'as', 'if', 'not', 'no', 'so', 'up', 'out', 'about', 'into', 'than', 'then', 'also',
  'more', 'other', 'new', 'all', 'any', 'each', 'every', 'both', 'few', 'most', 'some',
  'such', 'only', 'own', 'same', 'very', 'just', 'work', 'working', 'able', 'within',
  'across', 'through', 'over', 'under', 'between', 'during', 'after', 'before',
  'experience', 'required', 'preferred', 'strong', 'excellent', 'good', 'proven',
  'including', 'using', 'related', 'relevant', 'etc', 'well', 'must',
]);

// Tech-specific compound terms to preserve
const COMPOUND_TERMS = [
  'react native', 'node.js', 'next.js', 'vue.js', 'angular.js',
  'machine learning', 'deep learning', 'artificial intelligence',
  'ci/cd', 'ci cd', 'continuous integration', 'continuous deployment',
  'amazon web services', 'aws', 'google cloud', 'azure devops',
  'rest api', 'graphql api', 'web services',
  'agile methodology', 'scrum master', 'product owner',
  'full stack', 'full-stack', 'front end', 'front-end', 'back end', 'back-end',
  'sql server', 'postgresql', 'mongodb', 'redis',
  'docker', 'kubernetes', 'terraform', 'ansible',
  'typescript', 'javascript', 'python', 'java', 'c#', '.net',
  'unit testing', 'integration testing', 'e2e testing',
  'design patterns', 'clean architecture', 'microservices',
  'team lead', 'tech lead', 'project management',
];

function extractKeywords(text) {
  const lower = text.toLowerCase();

  // Extract compound terms first
  const compounds = [];
  for (const term of COMPOUND_TERMS) {
    if (lower.includes(term)) {
      compounds.push(term);
    }
  }

  // Extract single words
  const words = lower
    .replace(/[^a-z0-9#+./\s-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOP_WORDS.has(w));

  // Deduplicate and count
  const freq = new Map();
  for (const w of words) {
    freq.set(w, (freq.get(w) || 0) + 1);
  }
  for (const c of compounds) {
    freq.set(c, (freq.get(c) || 0) + 2); // Compound terms get double weight
  }

  return freq;
}

function getResumeText(data) {
  const parts = [];
  parts.push(data.personal.title || '');
  parts.push(data.personal.summary || '');

  for (const exp of data.experience) {
    parts.push(exp.position || '');
    const desc = Array.isArray(exp.description) ? exp.description.join(' ') : (exp.description || '');
    parts.push(desc);
    parts.push((exp.technologies || []).join(' '));
  }

  for (const items of Object.values(data.skills)) {
    parts.push(items.join(' '));
  }

  return parts.join(' ');
}

export function matchKeywords(resolvedData, jobDescription) {
  const jdKeywords = extractKeywords(jobDescription);
  const resumeText = getResumeText(resolvedData).toLowerCase();

  const matched = [];
  const missing = [];

  // Sort by frequency (importance)
  const sorted = [...jdKeywords.entries()].sort((a, b) => b[1] - a[1]);

  for (const [keyword, freq] of sorted) {
    if (resumeText.includes(keyword)) {
      matched.push({ keyword, freq });
    } else {
      missing.push({ keyword, freq });
    }
  }

  const matchRate = sorted.length > 0
    ? Math.round((matched.length / sorted.length) * 100)
    : 0;

  return { matched, missing, matchRate, totalKeywords: sorted.length };
}

export function formatKeywordReport(result) {
  const lines = [];
  lines.push(`\nKeyword Match Rate: ${result.matchRate}% (${result.matched.length}/${result.totalKeywords})\n`);
  lines.push('='.repeat(40));

  if (result.missing.length) {
    lines.push('\nMISSING KEYWORDS (add to resume):');
    // Show top missing by frequency
    const topMissing = result.missing.slice(0, 20);
    for (const { keyword, freq } of topMissing) {
      const bar = freq > 2 ? ' [HIGH PRIORITY]' : '';
      lines.push(`  - ${keyword}${bar}`);
    }
    if (result.missing.length > 20) {
      lines.push(`  ... and ${result.missing.length - 20} more`);
    }
  }

  lines.push('\nMATCHED KEYWORDS:');
  for (const { keyword } of result.matched.slice(0, 15)) {
    lines.push(`  + ${keyword}`);
  }
  if (result.matched.length > 15) {
    lines.push(`  ... and ${result.matched.length - 15} more`);
  }

  if (result.matchRate < 40) {
    lines.push('\n!! LOW MATCH — resume needs significant tailoring for this role.');
  } else if (result.matchRate < 60) {
    lines.push('\n! MODERATE MATCH — add missing high-priority keywords to improve ranking.');
  } else {
    lines.push('\nGOOD MATCH — resume aligns well with this job description.');
  }

  return lines.join('\n');
}
