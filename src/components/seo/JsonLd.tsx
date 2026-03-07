import { getProfile, localize } from '@/lib/data';
import type { Locale } from '@/lib/types';

export function JsonLd({ locale }: { locale: Locale }) {
  const profile = getProfile();
  const p = profile.personal;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: `${p.name.first} ${p.name.last}`,
    jobTitle: localize(p.title, locale),
    description: localize(p.summary, locale),
    url: 'https://victorchei.github.io/resume-builder/',
    image: 'https://victorchei.github.io/resume-builder/images/photo.svg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: p.location.city,
      addressCountry: p.location.country,
    },
    sameAs: [
      p.contacts.linkedin,
      p.contacts.github,
    ].filter(Boolean),
    worksFor: {
      '@type': 'Organization',
      name: profile.experience[0]?.company || '',
    },
    knowsAbout: profile.skills.highlighted,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
