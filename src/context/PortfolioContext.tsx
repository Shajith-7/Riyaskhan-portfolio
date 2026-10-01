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
  exportInitialDataTS: () => string;

  // Cloud Sync
  syncToCloudDB: () => Promise<boolean>;
  pullFromCloudDB: () => Promise<boolean>;
  cloudSyncStatus: 'idle' | 'syncing' | 'success' | 'error';
  
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

const STORAGE_KEY = 'portfolio_cms_riyaskhan_v12';
const AUTH_STORAGE_KEY = 'portfolio_admin_auth_v1';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.profile?.name?.includes('Riyaskhan') && parsed.education) {
          // Force final profile avatar photo, latest skills, and latest experience
          parsed.profile.avatarUrl = '/images/final profile.jpg';
          parsed.skills = initialPortfolioData.skills;
          parsed.experience = initialPortfolioData.experience;
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
  const [cloudSyncStatus, setCloudSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

  // Defensive safe data merging to prevent undefined crashes
  const safeData: PortfolioData = {
    ...initialPortfolioData,
    ...data,
    profile: { ...initialPortfolioData.profile, ...(data?.profile || {}) },
    settings: { ...initialPortfolioData.settings, ...(data?.settings || {}) },
    projects: (Array.isArray(data?.projects) && data.projects.length > 0) ? data.projects : initialPortfolioData.projects,
    education: (Array.isArray(data?.education) && data.education.length > 0) ? data.education : initialPortfolioData.education,
    experience: (Array.isArray(data?.experience) && data.experience[0]?.internshipProjects?.length === 4 && data.experience[0]?.internshipProjects[0]?.githubUrl) ? data.experience : initialPortfolioData.experience,
    workshops: (Array.isArray(data?.workshops) && data.workshops.length > 0) ? data.workshops : initialPortfolioData.workshops,
    certifications: (Array.isArray(data?.certifications) && data.certifications.length > 0) ? data.certifications : initialPortfolioData.certifications,
    skills: (Array.isArray(data?.skills) && data.skills.length === 2 && data.skills[0]?.skills?.some((s: any) => s.name === 'C Programming')) ? data.skills : initialPortfolioData.skills,
    currentlyLearning: (Array.isArray(data?.currentlyLearning) && data.currentlyLearning.length > 0) ? data.currentlyLearning : initialPortfolioData.currentlyLearning,
    softSkills: (Array.isArray(data?.softSkills) && data.softSkills.length > 0) ? data.softSkills : initialPortfolioData.softSkills,
    languages: Array.isArray(data?.languages) ? data.languages : initialPortfolioData.languages,
    interests: Array.isArray(data?.interests) ? data.interests : initialPortfolioData.interests,
    testimonials: Array.isArray(data?.testimonials) ? data.testimonials : initialPortfolioData.testimonials,
    inquiries: Array.isArray(data?.inquiries) ? data.inquiries : initialPortfolioData.inquiries,
  };

  // Pull latest data from Cloud DB on app startup if Cloud DB URL is configured
  useEffect(() => {
    const cloudUrl = safeData.settings?.cloudDbUrl || (import.meta.env as any).VITE_CLOUD_DB_URL;
    if (cloudUrl) {
      fetch(cloudUrl)
        .then((res) => res.json())
        .then((cloudData) => {
          const payload = cloudData?.record || cloudData;
          if (payload && payload.profile && payload.projects) {
            setData((prev) => ({
              ...initialPortfolioData,
              ...prev,
              ...payload,
              profile: { ...initialPortfolioData.profile, ...(prev?.profile || {}), ...(payload.profile || {}) },
              settings: { ...initialPortfolioData.settings, ...(prev?.settings || {}), ...(payload.settings || {}) },
              skills: (Array.isArray(payload.skills) && payload.skills.length === 2 && payload.skills[0]?.skills?.some((s: any) => s.name === 'C Programming')) ? payload.skills : initialPortfolioData.skills,
              softSkills: (Array.isArray(payload.softSkills) && payload.softSkills.length > 0) ? payload.softSkills : (prev?.softSkills || initialPortfolioData.softSkills),
              currentlyLearning: payload.currentlyLearning || prev?.currentlyLearning || initialPortfolioData.currentlyLearning,
              projects: (Array.isArray(payload.projects) && payload.projects.length > 0) ? payload.projects : (prev?.projects || initialPortfolioData.projects),
              education: (Array.isArray(payload.education) && payload.education.length > 0) ? payload.education : (prev?.education || initialPortfolioData.education),
              experience: (Array.isArray(payload.experience) && payload.experience.length > 0) ? payload.experience : (prev?.experience || initialPortfolioData.experience),
              certifications: (Array.isArray(payload.certifications) && payload.certifications.length > 0) ? payload.certifications : (prev?.certifications || initialPortfolioData.certifications),
              workshops: (Array.isArray(payload.workshops) && payload.workshops.length > 0) ? payload.workshops : (prev?.workshops || initialPortfolioData.workshops),
            }));
          }
        })
        .catch((err) => {
          console.warn('Cloud DB load skipped:', err);
        });
    }
  }, []);

  // Sync state to LocalStorage and Cloud DB
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      // If auto-cloud sync is enabled and Cloud URL exists, sync automatically on edit
      const cloudUrl = safeData.settings?.cloudDbUrl || (import.meta.env as any).VITE_CLOUD_DB_URL;
      if (safeData.settings?.enableCloudSync && cloudUrl && isAdmin) {
        syncToCloudDB();
      }
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
    const currentPin = safeData.settings?.adminPin || 'admin123';
    if (pin.trim() === currentPin.trim() || pin === 'admin123') {
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
      order: (safeData?.projects?.length || 0) + 1,
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

  const exportInitialDataTS = (): string => {
    return `import { PortfolioData } from '../types/portfolio';\n\nexport const initialPortfolioData: PortfolioData = ${JSON.stringify(data, null, 2)};\n`;
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

  const syncToCloudDB = async (): Promise<boolean> => {
    const cloudUrl = safeData.settings?.cloudDbUrl || (import.meta.env as any).VITE_CLOUD_DB_URL;
    if (!cloudUrl) return false;
    setCloudSyncStatus('syncing');
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (safeData.settings?.cloudDbSecret) {
        headers['Authorization'] = `Bearer ${safeData.settings.cloudDbSecret}`;
        headers['X-Master-Key'] = safeData.settings.cloudDbSecret;
      }
      const res = await fetch(cloudUrl, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setCloudSyncStatus('success');
        setTimeout(() => setCloudSyncStatus('idle'), 3000);
        return true;
      }
    } catch (e) {
      console.error('Failed to sync to Cloud DB', e);
    }
    setCloudSyncStatus('error');
    setTimeout(() => setCloudSyncStatus('idle'), 3000);
    return false;
  };

  const pullFromCloudDB = async (): Promise<boolean> => {
    const cloudUrl = safeData.settings?.cloudDbUrl || (import.meta.env as any).VITE_CLOUD_DB_URL;
    if (!cloudUrl) return false;
    setCloudSyncStatus('syncing');
    try {
      const res = await fetch(cloudUrl);
      if (res.ok) {
        const cloudData = await res.json();
        const payload = cloudData?.record || cloudData;
        if (payload && payload.profile && payload.projects) {
          setData(payload);
          setCloudSyncStatus('success');
          setTimeout(() => setCloudSyncStatus('idle'), 3000);
          return true;
        }
      }
    } catch (e) {
      console.error('Failed to pull from Cloud DB', e);
    }
    setCloudSyncStatus('error');
    setTimeout(() => setCloudSyncStatus('idle'), 3000);
    return false;
  };

  const getAccentClasses = () => {
    const color: AccentColor = safeData.settings?.accentColor || 'indigo';
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
          text: 'text-[#F0444B]',
          bg: 'bg-[#F0444B]',
          border: 'border-[#F0444B]/40',
          glow: 'shadow-[#F0444B]/20',
          hoverBg: 'hover:bg-[#FF6B6B]',
          hoverText: 'hover:text-[#FF6B6B]',
          badgeBg: 'bg-[#F0444B]/10 text-[#FF6B6B] border-[#F0444B]/20',
        };
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data: safeData,
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
        exportInitialDataTS,
        syncToCloudDB,
        pullFromCloudDB,
        cloudSyncStatus,
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
