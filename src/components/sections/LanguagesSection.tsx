import { getProfile, localize } from '@/lib/data';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/lib/types';
import { SectionLabel } from '@/components/ui/SectionLabel';

export async function LanguagesSection({ locale }: { locale: Locale }) {
  const profile = getProfile();
  const t = await getTranslations({ locale, namespace: 'sections' });

  if (profile.languages.length === 0) return null;

  return (
    <section id="languages">
      <SectionLabel>{t('languages')}</SectionLabel>

      <div className="flex flex-wrap gap-3">
        {profile.languages.map((lang) => (
          <div
            key={localize(lang.name, locale)}
            className="bg-bg-card border border-border rounded-lg px-5 py-3 flex items-center gap-3"
          >
            <span className="text-text font-medium">{localize(lang.name, locale)}</span>
            <span className="text-text-dim text-sm">{localize(lang.level, locale)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
