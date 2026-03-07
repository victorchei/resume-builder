import profileData from '../../data/profile.json';
import type { Profile, Locale, LocalizedString } from './types';

const profile = profileData as unknown as Profile;

export function getProfile(): Profile {
  return profile;
}

export function localize(obj: LocalizedString | string | undefined, locale: Locale): string {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[locale] || obj.en || '';
}

export function localizeArray(obj: { en: string[]; uk: string[] } | undefined, locale: Locale): string[] {
  if (!obj) return [];
  return obj[locale] || obj.en || [];
}

export function formatDateRange(startDate: string, endDate: string | null, locale: Locale): string {
  const formatDate = (d: string) => {
    const [year, month] = d.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString(locale === 'uk' ? 'uk-UA' : 'en-US', { year: 'numeric', month: 'short' });
  };
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : (locale === 'uk' ? 'Зараз' : 'Present');
  return `${start} — ${end}`;
}
