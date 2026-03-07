import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/types';
import { Hero } from '@/components/sections/Hero';
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline';
import { SkillsGrid } from '@/components/sections/SkillsGrid';
import { EducationSection } from '@/components/sections/EducationSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { LanguagesSection } from '@/components/sections/LanguagesSection';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;

  return (
    <>
      <Hero locale={loc} />
      <div className="max-w-5xl mx-auto px-6 space-y-20 pb-20">
        <ScrollReveal>
          <section id="experience">
            <ExperienceTimeline locale={loc} />
          </section>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <section id="skills">
            <SkillsGrid locale={loc} />
          </section>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <section id="education">
            <EducationSection locale={loc} />
          </section>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <CertificationsSection locale={loc} />
        </ScrollReveal>
        <ScrollReveal delay={250}>
          <LanguagesSection locale={loc} />
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <section id="contact">
            <ContactCTA locale={loc} />
          </section>
        </ScrollReveal>
      </div>
    </>
  );
}
