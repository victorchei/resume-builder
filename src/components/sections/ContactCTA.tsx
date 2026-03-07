import { getProfile } from '@/lib/data';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/lib/types';
import { SectionLabel } from '@/components/ui/SectionLabel';

const icons: Record<string, React.ReactNode> = {
  email: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="16" height="12" rx="2" />
      <path d="M2 6l8 5 8-5" />
    </svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M17.04 17.043h-2.962v-4.64c0-1.107-.023-2.531-1.544-2.531-1.544 0-1.78 1.206-1.78 2.45v4.72H7.793V7.5h2.844v1.3h.039c.397-.75 1.364-1.54 2.808-1.54 3.001 0 3.556 1.974 3.556 4.545v5.238ZM4.447 6.194a1.72 1.72 0 1 1 0-3.439 1.72 1.72 0 0 1 0 3.44Zm1.484 10.849H2.96V7.5h2.971v9.543ZM18.522 0H1.476C.66 0 0 .645 0 1.44v17.12C0 19.355.66 20 1.476 20h17.042C19.34 20 20 19.355 20 18.56V1.44C20 .645 19.34 0 18.522 0Z" />
    </svg>
  ),
  github: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 10 4.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.138 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10Z" />
    </svg>
  ),
  telegram: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 0C4.478 0 0 4.478 0 10s4.478 10 10 10 10-4.478 10-10S15.522 0 10 0Zm4.884 6.802l-1.665 7.846c-.125.56-.454.696-.92.433l-2.54-1.872-1.226 1.18c-.136.136-.25.25-.512.25l.182-2.586 4.71-4.256c.205-.182-.044-.283-.318-.1L6.58 11.546l-2.502-.782c-.544-.17-.555-.544.113-.805l9.776-3.768c.454-.17.85.1.702.805l.215.006Z" />
    </svg>
  ),
};

const labels: Record<string, string> = {
  email: 'Email',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  telegram: 'Telegram',
};

function contactHref(type: string, value: string): string {
  if (type === 'email') return `mailto:${value}`;
  return value;
}

export async function ContactCTA({ locale }: { locale: Locale }) {
  const profile = getProfile();
  const t = await getTranslations({ locale, namespace: 'sections' });
  const contacts = profile.personal.contacts;

  const visibleContacts = Object.entries(contacts).filter(
    ([key, value]) => value && icons[key]
  );

  return (
    <div>
      <SectionLabel>{t('contact')}</SectionLabel>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {visibleContacts.map(([type, value]) => (
          <a
            key={type}
            href={contactHref(type, value)}
            target={type === 'email' ? undefined : '_blank'}
            rel={type === 'email' ? undefined : 'noopener noreferrer'}
            className="bg-bg-card border border-border rounded-lg p-4 flex items-center gap-4 text-text-muted hover:text-accent hover:border-accent/50 transition-colors group"
          >
            <span className="text-text-dim group-hover:text-accent transition-colors">
              {icons[type]}
            </span>
            <span className="font-medium">{labels[type]}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
