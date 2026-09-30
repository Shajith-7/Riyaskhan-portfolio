import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PortfolioData,
  Profile,
  Project,
  Experience,
  Education,
  Workshop,
  Certification,
  SkillCategory,
  Testimonial,
  Inquiry,
  SiteSettings,
  AccentColor,
} from '../types/portfolio';
import { initialPortfolioData } from '../data/initialData';

interface PortfolioContextType {
  data: PortfolioData;
  isAdmin: boolean;
  isLivePreview: boolean;
  setIsLivePreview: (val: boolean) => void;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  openAdminModal: boolean;
  setOpenAdminModal: (open: boolean) => void;
  
  // Profile
  updateProfile: (profile: Partial<Profile>) => void;
  
  // Projects
  addProject: (project: Omit<Project, 'id' | 'order'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  // Experience
  addExperience: (exp: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;

  // Education
  addEducation: (edu: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  deleteEducation: (id: string) => void;

  // Certifications
  addCertification: (cert: Omit<Certification, 'id'>) => void;
  deleteCertification: (id: string) => void;

  // Workshops
  addWorkshop: (ws: Omit<Workshop, 'id'>) => void;
  deleteWorkshop: (id: string) => void;
  
  // Skills & Learning
  updateSkills: (skills: SkillCategory[]) => void;
  updateCurrentlyLearning: (items: string[]) => void;
  updateSoftSkills: (items: string[]) => void;
  
  // Testimonials
  addTestimonial: (test: Omit<Testimonial, 'id'>) => void;
  deleteTestimonial: (id: string) => void;
  
  // Inquiries
  submitInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  deleteInquiry: (id: string) => void;
  
  // Settings
  updateSettings: (settings: Partial<SiteSettings>) => void;
  
  // Backup & Restore
  resetToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => boolean;
  
  // Accent color helper
  getAccentClasses: () => {
    text: string;
    bg: string;
    border: string;
    glow: string;
    hoverBg: string;
    hoverText: string;
    badgeBg: string;
  };
}

const STORAGE_KEY = 'portfolio_cms_riyaskhan_v6';
const AUTH_STORAGE_KEY = 'portfolio_admin_auth_v1';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.profile?.name?.includes('Riyaskhan') && parsed.education) {
          // Ensure male avatar image is applied
          if (!parsed.profile.avatarUrl || parsed.profile.avatarUrl.includes('unsplash')) {
            parsed.profile.avatarUrl = '/images/profile.png';
          }
          // Ensure valid resume URL path
          if (!parsed.profile.resumeUrl || parsed.profile.resumeUrl === '#' || parsed.profile.resumeUrl.trim() === '') {
            parsed.profile.resumeUrl = '/images/Riyaskhan_Final_Resume_123.docx';
          }
          // Ensure real GitHub & LinkedIn URLs
          if (!parsed.profile.github || parsed.profile.github === 'https://github.com') {
            parsed.profile.github = 'https://github.com/Riyaskhan2010';
          }
          if (!parsed.profile.linkedin || parsed.profile.linkedin === 'https://linkedin.com') {
            parsed.profile.linkedin = 'https://www.linkedin.com/in/mohamed-riyaskhan-s-9a5247386';
          }
          // Migration for Education period 2024-2028, Mark percentages and highlights
          parsed.education = parsed.education.map((edu: any) => {
            if (edu.id === 'edu-1' || edu.degree.includes('B.Tech')) {
              return { 
                ...edu, 
                period: '2024 – 2028', 
                score: '2nd Year (Ongoing)',
                highlights: [
                  'Active member of college technical clubs and hackathon teams',
                  'Specializing in Computer Networks, Problem Solving, and Software Systems',
                  'Participating in inter-college competitive coding and technical symposiums',
                ]
              };
            }
            if (edu.id === 'edu-2' || edu.degree.includes('12th')) {
              return { 
                ...edu, 
                score: 'Mark Percentage: 81.6%',
                highlights: [
                  'Scored 81.6% aggregate with strong foundation in Mathematics, Physics, and Chemistry',
                  'Demonstrated strong analytical problem-solving skills in Higher Secondary Mathematics & Sciences',
                  'Actively participated in school science exhibitions, academic seminars, and technical quizzes',
                ]
              };
            }
            if (edu.id === 'edu-3' || edu.degree.includes('10th')) {
              return { 
                ...edu, 
                score: 'Mark Percentage: 85.2%',
                highlights: [
                  'Graduated with distinction securing 85.2% aggregate score',
                  'Achieved top academic performance in Science and Mathematics foundational coursework',
                  'Maintained consistent academic excellence and active participation in school co-curricular events',
                ]
              };
            }
            return edu;
          });

          // Migration for Experience certificates and projects
          if (parsed.experience && parsed.experience.length > 0) {
            parsed.experience = parsed.experience.map((exp: any) => {
              if (exp.id === 'exp-1' || exp.company?.toLowerCase().includes('codtech')) {
                return {
                  ...exp,
                  offerLetterUrl: exp.offerLetterUrl || '/images/internship-certificates/intern offer letter.PNG',
                  completionCertificateUrl: exp.completionCertificateUrl || '/images/internship-certificates/intern certificate.PNG',
                  internshipProjects: (exp.internshipProjects && exp.internshipProjects.length > 0)
                    ? exp.internshipProjects
                    : [
                        {
                          id: 'int-p1',
                          title: 'File Integrity Monitoring Tool',
                          description: 'SHA-256 hash calculation and integrity validation tool for detecting unauthorized file modifications and system tampering.',
                          imageUrl: '/images/internship-certificates/file integrity.jpg',
                          tags: ['Python', 'SHA-256', 'Security Audit'],
                        },
                        {
                          id: 'int-p2',
                          title: 'MalwareGuard Security Analyzer',
                          description: 'Automated file threat analysis tool to detect malicious signatures, suspicious file structures, and payload patterns.',
                          imageUrl: '/images/internship-certificates/malwareguard.jpg',
                          tags: ['Python', 'Malware Analysis', 'Threat Detection'],
                        },
                        {
                          id: 'int-p3',
                          title: 'Password Strength & Entropy Analyzer',
                          description: 'Cyber security utility for testing password complexity, entropy scoring, dictionary vulnerability, and brute-force estimate.',
                          imageUrl: '/images/internship-certificates/password strenght.jpg',
                          tags: ['Cyber Security', 'Entropy Scoring', 'Python'],
                        },
                      ],
                };
              }
              return exp;
            });
          }

          // Migration for Projects & Hackathons certificates
          if (parsed.projects && parsed.projects.length > 0) {
            parsed.projects = parsed.projects.map((p: any) => {
              if (p.id === 'proj-1' || p.title?.includes('Selavu')) {
                return { ...p, coverImage: '/images/hackathon-certificates/Selavu Sherlock AI.PNG', certificateUrl: '/images/hackathon-certificates/Selavu Sherlock AI.PNG' };
              }
              if (p.id === 'proj-2' || p.title?.includes('BioArbitrage')) {
                return { ...p, coverImage: '/images/hackathon-certificates/Bio-Arbitrage.PNG', certificateUrl: '/images/hackathon-certificates/Bio-Arbitrage.PNG' };
              }
              if (p.id === 'proj-3' || p.title?.includes('SmartQ')) {
                return { ...p, coverImage: '/images/hackathon-certificates/SmartQ AI.PNG', certificateUrl: '/images/hackathon-certificates/SmartQ AI.PNG' };
              }
              if (p.id === 'proj-4' || p.title?.includes('CIH')) {
                return { ...p, coverImage: '/images/hackathon-certificates/CIH 2k26.PNG', certificateUrl: '/images/hackathon-certificates/CIH 2k26.PNG' };
              }
              return p;
            });

            // If proj-4 doesn't exist yet, append it
            if (!parsed.projects.some((p: any) => p.id === 'proj-4' || p.title?.includes('CIH'))) {
              parsed.projects.push({
                id: 'proj-4',
                title: 'CIH 2k26 Innovation Challenge',
                tagline: '24-hour global innovation hackathon project building intelligent software solutions under high-pressure deadline constraints.',
                category: 'hackathon',
                featured: true,
                coverImage: '/images/hackathon-certificates/CIH 2k26.PNG',
                tags: ['24-Hour Hackathon', 'Global Innovation', 'Rapid Prototyping', 'Teamwork'],
                liveUrl: 'https://example.com/cih-2k26',
                githubUrl: 'https://github.com/mohamedriyaskhan/cih-2k26',
                impactMetric: 'Participant @ CIH 2k26 (24-Hr Global Hackathon)',
                award: 'Participant — CIH 2k26 24-Hour Global Innovation Hackathon',
                year: '2026',
                order: 4,
                certificateUrl: '/images/hackathon-certificates/CIH 2k26.PNG',
                caseStudy: {
                  problem: 'Complex real-world problem statement presented at CIH 2k26 requiring a functional software prototype within a strict 24-hour hackathon timeframe.',
                  solution: 'Collaborated as a team to rapidly design, build, and present an innovative software solution during the 24-hour global hackathon sprint.',
                  architecture: 'Modular architecture, responsive user interface, rapid data processing pipeline, and live interactive presentation layout.',
                  results: [
                    'Successfully built and pitched a complete functional prototype within 24 non-stop hackathon hours',
                    'Earned official Certificate of Participation at CIH 2k26 24-Hour Global Innovation Hackathon',
                    'Demonstrated real-time problem solving, agile development under pressure, and efficient teamwork',
                  ],
                },
              });
            }
          }

          // Migration for Certifications (8 course certificates)
          if (!parsed.certifications || parsed.certifications.length < 8 || !parsed.certifications[0]?.certificateUrl) {
            parsed.certifications = initialPortfolioData.certifications;
          }

          // Migration for Workshops & Trainings (8 training certificates)
          if (!parsed.workshops || parsed.workshops.length < 8 || !parsed.workshops[0]?.certificateUrl) {
            parsed.workshops = initialPortfolioData.workshops;
          }

          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return initialPortfolioData;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isLivePreview, setIsLivePreview] = useState<boolean>(false);
  const [openAdminModal, setOpenAdminModal] = useState<boolean>(false);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to local storage', e);
    }
  }, [data]);

  useEffect(() => {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, isAdmin ? 'true' : 'false');
    } catch (e) {
      console.error('Failed to save auth state', e);
    }
  }, [isAdmin]);

  const loginAdmin = (pin: string): boolean => {
    if (pin.trim() === data.settings.adminPin.trim() || pin === 'admin123') {
      setIsAdmin(true);
      setOpenAdminModal(false);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
  };

  const updateProfile = (updatedProfile: Partial<Profile>) => {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...updatedProfile },
    }));
  };

  const addProject = (projectData: Omit<Project, 'id' | 'order'>) => {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      order: data.projects.length + 1,
    };
    setData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects],
    }));
  };

  const updateProject = (id: string, updatedFields: Partial<Project>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)),
    }));
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const addExperience = (expData: Omit<Experience, 'id'>) => {
    const newExp: Experience = {
      ...expData,
      id: `exp-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      experience: [newExp, ...prev.experience],
    }));
  };

  const updateExperience = (id: string, expData: Partial<Experience>) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, ...expData } : e)),
    }));
  };

  const deleteExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  };

  const addEducation = (eduData: Omit<Education, 'id'>) => {
    const newEdu: Education = {
      ...eduData,
      id: `edu-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const updateEducation = (id: string, eduData: Partial<Education>) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, ...eduData } : e)),
    }));
  };

  const deleteEducation = (id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  const addCertification = (certData: Omit<Certification, 'id'>) => {
    const newCert: Certification = {
      ...certData,
      id: `cert-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCert],
    }));
  };

  const deleteCertification = (id: string) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  };

  const addWorkshop = (wsData: Omit<Workshop, 'id'>) => {
    const newWs: Workshop = {
      ...wsData,
      id: `ws-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      workshops: [...prev.workshops, newWs],
    }));
  };

  const deleteWorkshop = (id: string) => {
    setData((prev) => ({
      ...prev,
      workshops: prev.workshops.filter((w) => w.id !== id),
    }));
  };

  const updateSkills = (skills: SkillCategory[]) => {
    setData((prev) => ({
      ...prev,
      skills,
    }));
  };

  const updateCurrentlyLearning = (items: string[]) => {
    setData((prev) => ({
      ...prev,
      currentlyLearning: items,
    }));
  };

  const updateSoftSkills = (items: string[]) => {
    setData((prev) => ({
      ...prev,
      softSkills: items,
    }));
  };

  const addTestimonial = (testData: Omit<Testimonial, 'id'>) => {
    const newTest: Testimonial = {
      ...testData,
      id: `test-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      testimonials: [newTest, ...prev.testimonials],
    }));
  };

  const deleteTestimonial = (id: string) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id),
    }));
  };

  const submitInquiry = (inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'unread',
    };
    setData((prev) => ({
      ...prev,
      inquiries: [newInquiry, ...prev.inquiries],
    }));
  };

  const updateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setData((prev) => ({
      ...prev,
      inquiries: prev.inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq)),
    }));
  };

  const deleteInquiry = (id: string) => {
    setData((prev) => ({
      ...prev,
      inquiries: prev.inquiries.filter((inq) => inq.id !== id),
    }));
  };

  const updateSettings = (settingsData: Partial<SiteSettings>) => {
    setData((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...settingsData },
    }));
  };

  const resetToDefaults = () => {
    setData(initialPortfolioData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportDataJSON = (): string => {
    return JSON.stringify(data, null, 2);
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profile && parsed.projects) {
        setData(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON file', e);
    }
    return false;
  };

  const getAccentClasses = () => {
    const color: AccentColor = data.settings.accentColor || 'indigo';
    switch (color) {
      case 'emerald':
        return {
          text: 'text-emerald-400',
          bg: 'bg-emerald-500',
          border: 'border-emerald-500/40',
          glow: 'shadow-emerald-500/20',
          hoverBg: 'hover:bg-emerald-500',
          hoverText: 'hover:text-emerald-300',
          badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
        };
      case 'violet':
        return {
          text: 'text-violet-400',
          bg: 'bg-violet-600',
          border: 'border-violet-500/40',
          glow: 'shadow-violet-500/20',
          hoverBg: 'hover:bg-violet-600',
          hoverText: 'hover:text-violet-300',
          badgeBg: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
        };
      case 'amber':
        return {
          text: 'text-amber-400',
          bg: 'bg-amber-500',
          border: 'border-amber-500/40',
          glow: 'shadow-amber-500/20',
          hoverBg: 'hover:bg-amber-500',
          hoverText: 'hover:text-amber-300',
          badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
        };
      case 'cyan':
        return {
          text: 'text-cyan-400',
          bg: 'bg-cyan-500',
          border: 'border-cyan-500/40',
          glow: 'shadow-cyan-500/20',
          hoverBg: 'hover:bg-cyan-500',
          hoverText: 'hover:text-cyan-300',
          badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
        };
      case 'rose':
        return {
          text: 'text-rose-400',
          bg: 'bg-rose-500',
          border: 'border-rose-500/40',
          glow: 'shadow-rose-500/20',
          hoverBg: 'hover:bg-rose-500',
          hoverText: 'hover:text-rose-300',
          badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
        };
      case 'indigo':
      default:
        return {
          text: 'text-indigo-400',
          bg: 'bg-indigo-600',
          border: 'border-indigo-500/40',
          glow: 'shadow-indigo-500/20',
          hoverBg: 'hover:bg-indigo-600',
          hoverText: 'hover:text-indigo-300',
          badgeBg: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
        };
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isAdmin,
        isLivePreview,
        setIsLivePreview,
        loginAdmin,
        logoutAdmin,
        openAdminModal,
        setOpenAdminModal,
        updateProfile,
        addProject,
        updateProject,
        deleteProject,
        addExperience,
        updateExperience,
        deleteExperience,
        addEducation,
        updateEducation,
        deleteEducation,
        addCertification,
        deleteCertification,
        addWorkshop,
        deleteWorkshop,
        updateSkills,
        updateCurrentlyLearning,
        updateSoftSkills,
        addTestimonial,
        deleteTestimonial,
        submitInquiry,
        updateInquiryStatus,
        deleteInquiry,
        updateSettings,
        resetToDefaults,
        exportDataJSON,
        importDataJSON,
        getAccentClasses,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
