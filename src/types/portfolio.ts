export interface Profile {
  name: string;
  title: string;
  shortBio: string;
  fullBio: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
  resumeUrl: string;
  avatarUrl: string;
  status: 'available' | 'busy' | 'selective';
  heroTags: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  score?: string;
  current?: boolean;
  highlights?: string[];
}

export interface Workshop {
  id: string;
  title: string;
  organizer: string;
  dateOrDuration: string;
  type: 'workshop' | 'training' | 'internship';
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  details?: string;
  credentialUrl?: string;
}

export interface CaseStudy {
  problem: string;
  solution: string;
  architecture: string;
  results: string[];
  gallery?: string[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'fullstack' | 'frontend' | 'mobile' | 'ai' | 'cloud' | 'hackathon';
  featured: boolean;
  coverImage: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  impactMetric?: string;
  award?: string;
  year: string;
  order: number;
  caseStudy: CaseStudy;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  achievements: string[];
  tech: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Array<{
    name: string;
    level: number; // 1-100
    highlight?: boolean;
  }>;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  avatarUrl: string;
  feedback: string;
  projectRef?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  projectType: string;
  budget?: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
}

export type AccentColor = 'indigo' | 'emerald' | 'amber' | 'violet' | 'cyan' | 'rose';

export interface SiteSettings {
  accentColor: AccentColor;
  showTestimonials: boolean;
  showExperience: boolean;
  showSkills: boolean;
  showEducation: boolean;
  showCertifications: boolean;
  showWorkshops: boolean;
  adminPin: string;
}

export interface PortfolioData {
  profile: Profile;
  education: Education[];
  projects: Project[];
  experience: Experience[];
  workshops: Workshop[];
  certifications: Certification[];
  skills: SkillCategory[];
  currentlyLearning: string[];
  softSkills: string[];
  languages: string[];
  interests: string[];
  testimonials: Testimonial[];
  inquiries: Inquiry[];
  settings: SiteSettings;
}

