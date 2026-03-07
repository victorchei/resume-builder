import { getProfile } from '@/lib/data';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/lib/types';
import { SectionLabel } from '@/components/ui/SectionLabel';

export async function CertificationsSection({ locale }: { locale: Locale }) {
  const profile = getProfile();
  const t = await getTranslations({ locale, namespace: 'sections' });

  if (profile.certifications.length === 0) return null;

  return (
    <section id="certifications">
      <SectionLabel>{t('certifications')}</SectionLabel>

      <div className="space-y-3">
        {profile.certifications.map((cert) => (
          <div key={cert.name} className="bg-bg-card border border-border rounded-lg p-5 flex items-start gap-4">
            {/* Certificate icon */}
            <div className="text-accent shrink-0 mt-0.5">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 1L12.39 6.26L18 7.27L14 11.14L14.76 17L10 14.27L5.24 17L6 11.14L2 7.27L7.61 6.26L10 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h3 className="text-text font-medium">{cert.name}</h3>
              <p className="text-text-dim text-sm">
                {cert.issuer} &middot; {cert.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
