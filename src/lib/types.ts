export interface LocalizedString {
  en: string;
  uk: string;
}

export interface Profile {
  meta: { version: string; lastUpdated: string; sources: string[] };
  personal: {
    name: { first: string; last: string };
    title: LocalizedString;
    tagline: LocalizedString;
    location: LocalizedString & { city: string; country: string };
    contacts: Record<string, string>;
    summary: LocalizedString;
    photo: string;
    availability: { status: string; note: LocalizedString };
  };
  experience: Experience[];
  education: Education[];
  skills: Record<string, string[]> & { highlighted: string[] };
  languages: { name: LocalizedString; level: LocalizedString }[];
  certifications: Certification[];
  projects: Project[];
  recommendations: Recommendation[];
  achievements: Achievement[];
  socialActivity: Record<string, Record<string, string | number>>;
}

export interface Experience {
  id: string;
  company: string;
  position: LocalizedString;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: { en: string[]; uk: string[] };
  technologies: string[];
  tags: string[];
}

export interface Education {
  id: string;
  institution: LocalizedString;
  degree: LocalizedString;
  field: LocalizedString;
  startDate: string;
  endDate: string;
  description: LocalizedString;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface Project {
  id: string;
  slug?: string;
  name: LocalizedString;
  description: LocalizedString;
  url: string;
  technologies: string[];
  tags: string[];
  featured?: boolean;
}

export interface Recommendation {
  author: string;
  role: string;
  company: string;
  text: LocalizedString;
  date: string;
}

export interface Achievement {
  title: LocalizedString;
  description: LocalizedString;
  date: string;
  type: string;
}

export type Locale = 'en' | 'uk';
