import { readFileSync } from 'fs';
import { resolve } from 'path';

export function loadProfile(root) {
  const filePath = resolve(root, 'data', 'profile.json');
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

export function formatDate(dateStr, lang = 'en') {
  if (!dateStr) return lang === 'uk' ? 'Теперішній час' : 'Present';

  const [year, month] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);

  const locale = lang === 'uk' ? 'uk-UA' : 'en-US';
  return date.toLocaleDateString(locale, { year: 'numeric', month: 'short' });
}

export function formatDateRange(startDate, endDate, lang = 'en') {
  const start = formatDate(startDate, lang);
  const end = endDate ? formatDate(endDate, lang) : (lang === 'uk' ? 'Теперішній час' : 'Present');
  return `${start} — ${end}`;
}
