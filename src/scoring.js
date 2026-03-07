/**
 * Resume ATS/HR scoring engine.
 * Research-backed: TheLadders eye-tracking, Jobscan ATS rules, Scale.jobs rejection data.
 * Score model: Structure 20 + Quantification 20 + Format 10 + Length 5 + Verbs 5 + Content 40 = 100
 */

const WEAK_OPENERS = /^(responsible for|helped|worked on|assisted|was responsible|participated|involved in|contributed to|tasked with)/i;

const STRONG_ACTION_VERBS = /^(Led|Built|Designed|Developed|Implemented|Delivered|Reduced|Increased|Managed|Optimized|Architected|Migrated|Automated|Launched|Mentored|Scaled|Created|Integrated|Deployed|Refactored|Established|Streamlined|Coordinated|Negotiated|Spearheaded|Orchestrated|Pioneered|Transformed|Revamped|Achieved|Accelerated|Consolidated|Eliminated|Enhanced|Executed|Generated|Improved|Initiated|Modernized|Overhauled|Restructured|Secured|Simplified|Supervised|Trained)/i;

const METRIC_PATTERN = /\d+%|\d+x|\$[\d,]+|\d+[\s-]?(users|clients|team|projects|servers|developers|engineers|members|people|customers|partners|applications|services|requests|transactions|endpoints|modules|repositories|microservices|pages|components|tests|deployments)/i;

const RULES = [
  // === STRUCTURE (20 pts) ===
  {
    id: 'struct-required-sections',
    category: 'structure',
    weight: 8,
    check: (d) => {
      const required = ['personal', 'experience', 'skills', 'education'];
      const missing = required.filter(s => !d.sections.includes(s));
      return missing.length === 0
        ? { pass: true }
        : { pass: false, message: `Missing ATS-critical sections: ${missing.join(', ')}. ATS rejects resumes without standard sections.` };
    },
  },
  {
    id: 'struct-contact-info',
    category: 'structure',
    weight: 6,
    check: (d) => {
      const c = d.personal.contacts;
      const missing = [];
      if (!c.email) missing.push('email');
      if (!c.phone) missing.push('phone');
      if (!c.linkedin) missing.push('linkedin');
      return missing.length === 0
        ? { pass: true }
        : { pass: false, message: `Missing: ${missing.join(', ')}. Incomplete contact info = ATS flag.` };
    },
  },
  {
    id: 'struct-no-empty-sections',
    category: 'structure',
    weight: 4,
    check: (d) => {
      const empty = [];
      if (d.sections.includes('experience') && !d.experience?.length) empty.push('experience');
      if (d.sections.includes('skills') && !Object.keys(d.skills).length) empty.push('skills');
      if (d.sections.includes('education') && !d.education?.length) empty.push('education');
      return empty.length === 0
        ? { pass: true }
        : { pass: false, message: `Empty sections: ${empty.join(', ')}. Remove or populate.` };
    },
  },
  {
    id: 'struct-section-order',
    category: 'structure',
    weight: 2,
    check: (d) => {
      // Optimal ATS order: personal -> summary -> skills -> experience -> education
      const s = d.sections;
      const personalIdx = s.indexOf('personal');
      const expIdx = s.indexOf('experience');
      const skillsIdx = s.indexOf('skills');
      if (personalIdx > 0) return { pass: false, message: 'Personal/contact info must be first section.' };
      if (expIdx !== -1 && skillsIdx !== -1 && skillsIdx > expIdx + 2) {
        return { pass: false, message: 'Skills too far from Experience. ATS weights adjacent sections higher.' };
      }
      return { pass: true };
    },
  },

  // === QUANTIFICATION (20 pts) ===
  {
    id: 'quant-metrics-ratio',
    category: 'quantification',
    weight: 12,
    check: (d) => {
      const allBullets = d.experience.flatMap(e => Array.isArray(e.description) ? e.description : []);
      if (!allBullets.length) return { pass: false, message: 'No experience bullets. Add 3-5 per role with quantified outcomes.' };

      const quantified = allBullets.filter(b => METRIC_PATTERN.test(b));
      const ratio = quantified.length / allBullets.length;

      if (ratio === 0) return { pass: false, message: 'Zero quantified achievements. Numbers draw recruiter attention in 7.4s scan. Add: "Reduced X by 40%", "Led team of 5".' };
      if (ratio < 0.5) return { pass: false, message: `${Math.round(ratio * 100)}% bullets quantified (target: 50%+). Formula: [Action Verb] + [Context] + [Quantified Result].` };
      return { pass: true };
    },
  },
  {
    id: 'quant-bullet-count',
    category: 'quantification',
    weight: 5,
    check: (d) => {
      const issues = [];
      for (const exp of d.experience) {
        const bullets = Array.isArray(exp.description) ? exp.description : [];
        const label = `${exp.position || '?'}${exp.company ? ` at ${exp.company}` : ''}`;
        if (bullets.length === 0) issues.push(`${label}: no bullets`);
        else if (bullets.length < 3) issues.push(`${label}: ${bullets.length} bullets (min 3)`);
        else if (bullets.length > 6) issues.push(`${label}: ${bullets.length} bullets (max 5-6)`);
      }
      return issues.length === 0 ? { pass: true } : { pass: false, message: issues.join('; ') };
    },
  },
  {
    id: 'quant-use-numerals',
    category: 'quantification',
    weight: 3,
    check: (d) => {
      const WRITTEN_NUMBERS = /\b(one|two|three|four|five|six|seven|eight|nine|ten|twenty|thirty|forty|fifty|hundred|thousand)\b/i;
      const allBullets = d.experience.flatMap(e => Array.isArray(e.description) ? e.description : []);
      const writtenNum = allBullets.filter(b => WRITTEN_NUMBERS.test(b));
      return writtenNum.length === 0
        ? { pass: true }
        : { pass: false, message: `${writtenNum.length} bullets use written numbers. Use "35%" not "thirty-five percent" — numerals draw eye attention.` };
    },
  },

  // === FORMAT SAFETY (10 pts) ===
  {
    id: 'fmt-name-present',
    category: 'format',
    weight: 4,
    check: (d) => {
      if (!d.personal.name || d.personal.name.trim().length < 3) return { pass: false, message: 'Name missing or too short. Must be top of resume, 14-18pt bold.' };
      return { pass: true };
    },
  },
  {
    id: 'fmt-title-present',
    category: 'format',
    weight: 4,
    check: (d) => {
      if (!d.personal.title) return { pass: false, message: 'Professional title missing. Must match target role keywords. Appears immediately below name.' };
      return { pass: true };
    },
  },
  {
    id: 'fmt-skills-text-only',
    category: 'format',
    weight: 2,
    check: (d) => {
      // Our generator always outputs text — this validates the data doesn't contain HTML/emoji skill bars
      const allSkills = Object.values(d.skills).flat();
      const hasGraphics = allSkills.some(s => /[★●■▪▸◆🟢🟡⭐]|bar|level|rating/i.test(s));
      return !hasGraphics ? { pass: true } : { pass: false, message: 'Skills contain visual indicators. ATS requires plain text only — no bars, stars, or ratings.' };
    },
  },

  // === LENGTH (5 pts) ===
  {
    id: 'len-page-count',
    category: 'length',
    weight: 3,
    check: (d) => {
      const totalBullets = d.experience.reduce((n, e) => n + (Array.isArray(e.description) ? e.description.length : 0), 0);
      const totalSections = d.sections.length;
      const estimatedLines = 10 + totalBullets * 1.5 + totalSections * 4 + Object.values(d.skills).flat().length * 0.3;
      if (estimatedLines > 80) return { pass: false, message: `Estimated 2+ pages. Mid-career (<10yr): 1 page. Senior (10+yr): max 2. Page 1 must be self-contained.` };
      return { pass: true };
    },
  },
  {
    id: 'len-skills-count',
    category: 'length',
    weight: 2,
    check: (d) => {
      const allSkills = Object.values(d.skills).flat();
      if (allSkills.length < 5) return { pass: false, message: `${allSkills.length} skills (min 8-15). ATS expects keyword-rich skills section.` };
      if (allSkills.length > 30) return { pass: false, message: `${allSkills.length} skills — keyword stuffing. Limit to 15-20 most relevant.` };
      return { pass: true };
    },
  },

  // === VERB STRENGTH (5 pts) ===
  {
    id: 'verb-strong-openers',
    category: 'verbs',
    weight: 3,
    check: (d) => {
      const allBullets = d.experience.flatMap(e => Array.isArray(e.description) ? e.description : []);
      if (!allBullets.length) return { pass: true };

      const strong = allBullets.filter(b => STRONG_ACTION_VERBS.test(b.trim()));
      const ratio = strong.length / allBullets.length;

      if (ratio < 0.5) return { pass: false, message: `${Math.round(ratio * 100)}% strong action verb openers (target: 80%+). Use: Led, Built, Reduced, Architected, Scaled.` };
      return { pass: true };
    },
  },
  {
    id: 'verb-no-weak',
    category: 'verbs',
    weight: 2,
    check: (d) => {
      const allBullets = d.experience.flatMap(e => Array.isArray(e.description) ? e.description : []);
      const weak = allBullets.filter(b => WEAK_OPENERS.test(b.trim()));
      return weak.length === 0
        ? { pass: true }
        : { pass: false, message: `${weak.length} bullets start with weak phrases ("Responsible for", "Helped", "Worked on"). These score near-zero in ATS keyword matching.` };
    },
  },

  // === CONTENT (40 pts) ===
  {
    id: 'content-summary',
    category: 'content',
    weight: 10,
    check: (d) => {
      if (!d.personal.summary) return { pass: false, message: 'Missing professional summary. First thing recruiters read in 7.4s scan. 2-4 sentences: years exp + key strengths + target role.' };
      if (d.personal.summary.length < 80) return { pass: false, message: 'Summary too short (<80 chars). Should include years of experience, 2-3 key strengths, target role keywords.' };
      if (d.personal.summary.length > 500) return { pass: false, message: 'Summary too long (>500 chars). Keep 2-4 sentences. Recruiters scan, not read.' };
      return { pass: true };
    },
  },
  {
    id: 'content-experience-dates',
    category: 'content',
    weight: 8,
    check: (d) => {
      const noDate = d.experience.filter(e => !e.startDate);
      if (noDate.length) return { pass: false, message: `${noDate.length} entries without dates. Missing dates = ATS gap flag + recruiter suspicion.` };

      // Check date consistency — all should be YYYY-MM format
      const inconsistent = d.experience.filter(e => e.startDate && !/^\d{4}-\d{2}$/.test(e.startDate));
      if (inconsistent.length) return { pass: false, message: `Inconsistent date format. Use YYYY-MM consistently. Mixed formats trigger ATS parsing errors.` };
      return { pass: true };
    },
  },
  {
    id: 'content-experience-tech',
    category: 'content',
    weight: 7,
    check: (d) => {
      const noTech = d.experience.filter(e => !e.technologies?.length);
      if (noTech.length === d.experience.length && d.experience.length > 0) {
        return { pass: false, message: 'No technologies listed on any experience entry. Tech stack per role boosts ATS keyword score in Experience section (Very High weight).' };
      }
      return { pass: true };
    },
  },
  {
    id: 'content-education-complete',
    category: 'content',
    weight: 5,
    check: (d) => {
      if (!d.education?.length) return { pass: true }; // Optional section
      const incomplete = d.education.filter(e => !e.degree || !e.institution);
      return incomplete.length === 0
        ? { pass: true }
        : { pass: false, message: `${incomplete.length} education entries missing degree or institution. JDs with degree requirements use these for filtering.` };
    },
  },
  {
    id: 'content-languages',
    category: 'content',
    weight: 5,
    check: (d) => {
      if (!d.languages?.length) return { pass: true };
      const noLevel = d.languages.filter(l => !l.level);
      return noLevel.length === 0
        ? { pass: true }
        : { pass: false, message: `${noLevel.length} languages without proficiency level. Include: Native, Fluent, Professional, Conversational.` };
    },
  },
  {
    id: 'content-summary-keywords',
    category: 'content',
    weight: 5,
    check: (d) => {
      if (!d.personal.summary) return { pass: true }; // Already caught by content-summary
      // Check if summary contains any skills mentioned in skills section
      const allSkills = Object.values(d.skills).flat().map(s => s.toLowerCase());
      if (!allSkills.length) return { pass: true };

      const summaryLower = d.personal.summary.toLowerCase();
      const matched = allSkills.filter(s => summaryLower.includes(s.toLowerCase()));
      if (matched.length === 0) return { pass: false, message: 'Summary contains zero skill keywords. First 100 words must include highest-priority keywords for ATS matching.' };
      return { pass: true };
    },
  },
];

export function scoreResume(resolvedData) {
  const results = RULES.map(rule => {
    const result = rule.check(resolvedData);
    return { id: rule.id, category: rule.category, weight: rule.weight, ...result };
  });

  const maxScore = RULES.reduce((s, r) => s + r.weight, 0);
  const earned = results.filter(r => r.pass).reduce((s, r) => s + r.weight, 0);
  const score = Math.round((earned / maxScore) * 100);

  const issues = results.filter(r => !r.pass);
  const categoryOrder = ['structure', 'quantification', 'format', 'length', 'verbs', 'content'];
  const categories = {};
  for (const cat of categoryOrder) {
    categories[cat] = results.filter(r => r.category === cat);
  }

  // Grade
  let grade;
  if (score >= 85) grade = 'EXCELLENT — ready to submit';
  else if (score >= 70) grade = 'GOOD — minor improvements needed';
  else if (score >= 50) grade = 'BORDERLINE — significant gaps, likely filtered by ATS';
  else grade = 'WEAK — high rejection risk, needs rework';

  return { score, maxScore: 100, grade, issues, categories, results };
}

export function formatScoreReport(report) {
  const lines = [];
  lines.push(`\nResume Score: ${report.score}/100 — ${report.grade}\n`);
  lines.push('='.repeat(50));

  for (const [cat, rules] of Object.entries(report.categories)) {
    const catScore = rules.filter(r => r.pass).reduce((s, r) => s + r.weight, 0);
    const catMax = rules.reduce((s, r) => s + r.weight, 0);
    const icon = catScore === catMax ? 'PASS' : 'WARN';
    lines.push(`\n[${icon}] ${cat.toUpperCase()} (${catScore}/${catMax})`);

    for (const r of rules) {
      const status = r.pass ? '  OK' : '  !!';
      lines.push(`${status} ${r.id}${r.message ? ': ' + r.message : ''}`);
    }
  }

  if (report.issues.length === 0) {
    lines.push('\nAll checks passed!');
  } else {
    lines.push(`\n${report.issues.length} issue(s) to fix. Priority: content > quantification > structure > verbs > format > length.`);
  }

  return lines.join('\n');
}
