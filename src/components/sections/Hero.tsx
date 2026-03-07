import { getProfile, localize } from '@/lib/data';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/lib/types';

export async function Hero({ locale }: { locale: Locale }) {
  const profile = getProfile();
  const p = profile.personal;
  const t = await getTranslations({ locale, namespace: 'hero' });

  const fullName = `${p.name.first} ${p.name.last}`;

  return (
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">
        {/* Photo */}
        <div className="shrink-0">
          <div className="w-36 h-36 md:w-44 md:h-44 rounded-full border-2 border-accent shadow-[0_0_24px_var(--accent-glow)] overflow-hidden">
            <img
              src={p.photo}
              alt={fullName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text mb-3">
            {fullName}
          </h1>

          <p className="text-xl md:text-2xl text-accent font-medium mb-3">
            {localize(p.title, locale)}
          </p>

          <p className="text-text-muted text-lg mb-5">
            {localize(p.tagline, locale)}
          </p>

          {/* Location */}
          <div className="flex items-center justify-center md:justify-start gap-2 text-text-dim text-sm mb-4">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-text-dim">
              <path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5Zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" fill="currentColor" />
            </svg>
            <span>{localize(p.location, locale)}</span>
          </div>

          {/* Availability */}
          {p.availability.status === 'open' && (
            <div className="flex items-center justify-center md:justify-start gap-2 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-text-muted">{localize(p.availability.note, locale)}</span>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
            <a
              href="#contact"
              className="px-6 py-2.5 bg-accent text-[var(--bg)] font-medium rounded-md hover:opacity-90 transition-opacity"
            >
              {t('contactMe')}
            </a>
            <a
              href="/cv.pdf"
              className="px-6 py-2.5 border border-accent text-accent rounded-md hover:bg-accent-subtle transition-colors"
            >
              {t('downloadCv')}
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center md:justify-start gap-4">
            {p.contacts.linkedin && (
              <a href={p.contacts.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-accent transition-colors" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.04 17.043h-2.962v-4.64c0-1.107-.023-2.531-1.544-2.531-1.544 0-1.78 1.206-1.78 2.45v4.72H7.793V7.5h2.844v1.3h.039c.397-.75 1.364-1.54 2.808-1.54 3.001 0 3.556 1.974 3.556 4.545v5.238ZM4.447 6.194a1.72 1.72 0 1 1 0-3.439 1.72 1.72 0 0 1 0 3.44Zm1.484 10.849H2.96V7.5h2.971v9.543ZM18.522 0H1.476C.66 0 0 .645 0 1.44v17.12C0 19.355.66 20 1.476 20h17.042C19.34 20 20 19.355 20 18.56V1.44C20 .645 19.34 0 18.522 0Z" />
                </svg>
              </a>
            )}
            {p.contacts.github && (
              <a href={p.contacts.github} target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-accent transition-colors" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 10 4.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.138 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10Z" />
                </svg>
              </a>
            )}
          </div>

          {/* Summary */}
          <p className="mt-8 text-text-muted leading-relaxed max-w-2xl">
            {localize(p.summary, locale)}
          </p>
        </div>
      </div>
    </section>
  );
}
