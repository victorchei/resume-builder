import type { Locale } from '@/lib/types';
import { Hero } from '@/components/sections/Hero';
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline';
import { SkillsGrid } from '@/components/sections/SkillsGrid';
import { EducationSection } from '@/components/sections/EducationSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { LanguagesSection } from '@/components/sections/LanguagesSection';
import { ContactCTA } from '@/components/sections/ContactCTA';

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;

  return (
    <>
      <Hero locale={loc} />
      <div className="max-w-5xl mx-auto px-6 space-y-20 pb-20">
        <section id="experience">
          <ExperienceTimeline locale={loc} />
        </section>
        <section id="skills">
          <SkillsGrid locale={loc} />
        </section>
        <section id="education">
          <EducationSection locale={loc} />
        </section>
        <CertificationsSection locale={loc} />
        <LanguagesSection locale={loc} />
        <section id="contact">
          <ContactCTA locale={loc} />
        </section>
      </div>
    </>
  );
}
