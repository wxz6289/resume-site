export interface Profile {
  name: string;
  title: string;
  tagline: string;
  phone: string;
  email: string;
  location: string;
  experienceYears: string;
  salary: string;
  intents: string[];
  summary: string;
}

export interface Stat {
  label: string;
  value: string;
  unit: string;
}

export interface SkillRadar {
  subject: string;
  score: number;
  projects: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  tags: string[];
  highlights: string[];
  stack: string[];
}

export interface Project {
  id: string;
  name: string;
  role: string;
  period: string;
  description: string;
  stack: string[];
  highlights: string[];
  metrics: string[];
  links: { demo: string; repo: string };
}

export interface ResumeData {
  profile: Profile;
  stats: Stat[];
  skills: { radar: SkillRadar[]; tags: string[] };
  experience: Experience[];
  projects: Project[];
  education: { school: string; degree: string; major: string; period: string };
  social: { github: string; blog: string; juejin: string; zhihu: string };
}
