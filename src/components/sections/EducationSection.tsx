import { getProfile, localize, formatDateRange } from '@/lib/data';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/lib/types';
import { SectionLabel } from '@/components/ui/SectionLabel';

export async function EducationSection({ locale }: { locale: Locale }) {
  const profile = getProfile();
  const t = await getTranslations({ locale, namespace: 'sections' });

  return (
    <div>
      <SectionLabel>{t('education')}</SectionLabel>

      <div className="space-y-4">
        {profile.education.map((edu) => (
          <div key={edu.id} className="bg-bg-card border border-border rounded-lg p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="font-serif text-lg text-text">
                  {localize(edu.institution, locale)}
                </h3>
                <p className="text-text-muted">
                  {localize(edu.degree, locale)} &mdash; {localize(edu.field, locale)}
                </p>
              </div>
              <span className="text-text-dim text-sm shrink-0">
                {formatDateRange(edu.startDate, edu.endDate, locale)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
