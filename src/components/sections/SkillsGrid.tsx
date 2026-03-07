import { getProfile } from '@/lib/data';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/lib/types';
import { SectionLabel } from '@/components/ui/SectionLabel';

export async function SkillsGrid({ locale }: { locale: Locale }) {
  const profile = getProfile();
  const t = await getTranslations({ locale, namespace: 'sections' });
  const { highlighted, ...categories } = profile.skills;

  return (
    <div>
      <SectionLabel>{t('skills')}</SectionLabel>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries(categories).map(([category, skills]) => (
          <div key={category} className="bg-bg-card border border-border rounded-lg p-4">
            <h3 className="font-mono text-xs text-accent uppercase tracking-wider mb-3">
              {category}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {(skills as string[]).map((skill) => (
                <span
                  key={skill}
                  className={`text-xs px-2 py-1 rounded ${
                    highlighted.includes(skill)
                      ? 'border border-accent text-accent bg-accent-subtle'
                      : 'text-text-muted bg-bg-elevated'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
