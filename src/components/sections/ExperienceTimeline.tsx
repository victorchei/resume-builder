import { getProfile, localize, localizeArray, formatDateRange } from '@/lib/data';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/lib/types';
import { SectionLabel } from '@/components/ui/SectionLabel';

export async function ExperienceTimeline({ locale }: { locale: Locale }) {
  const profile = getProfile();
  const t = await getTranslations({ locale, namespace: 'sections' });

  return (
    <div>
      <SectionLabel>{t('experience')}</SectionLabel>

      <div className="relative pl-8">
        {/* Timeline line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-accent/30" />

        <div className="space-y-10">
          {profile.experience.map((exp) => (
            <div key={exp.id} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-8 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-accent bg-bg" />

              <div className="bg-bg-card border border-border rounded-lg p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-serif text-xl text-text">
                      {localize(exp.position, locale)}
                    </h3>
                    <p className="text-accent font-medium">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-dim shrink-0">
                    {exp.current && (
                      <span className="px-2 py-0.5 text-xs font-mono uppercase tracking-wider border border-accent text-accent rounded">
                        Current
                      </span>
                    )}
                    <span>{formatDateRange(exp.startDate, exp.endDate, locale)}</span>
                  </div>
                </div>

                <p className="text-text-dim text-sm mb-4">{exp.location}</p>

                <ul className="space-y-2 mb-4">
                  {localizeArray(exp.description, locale).map((item, i) => (
                    <li key={i} className="text-text-muted text-sm flex gap-2">
                      <span className="text-accent mt-1 shrink-0">&#8250;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2 py-1 rounded bg-accent-subtle text-text-dim border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
