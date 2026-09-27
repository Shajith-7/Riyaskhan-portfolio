import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project, Experience, Education, Certification, Workshop, SkillCategory, AccentColor } from '../../types/portfolio';
import { ProjectEditorModal } from './ProjectEditorModal';
import { ExperienceEditorModal } from './ExperienceEditorModal';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  GraduationCap,
  Briefcase,
  Layers,
  Inbox,
  Settings,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  Mail,
  Eye,
  LogOut,
  Save,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  Star,
  Award,
  BookOpen,
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToPublic?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToPublic }) => {
  const {
    data,
    updateProfile,
    deleteProject,
    updateProject,
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
    updateInquiryStatus,
    deleteInquiry,
    updateSettings,
    resetToDefaults,
    exportDataJSON,
    importDataJSON,
    logoutAdmin,
    getAccentClasses,
  } = usePortfolio();

  const accent = getAccentClasses();

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'profile' | 'education' | 'projects' | 'experience' | 'workshops_certs' | 'skills' | 'inquiries' | 'settings'
  >('overview');

  // Modal states
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const [expModalOpen, setExpModalOpen] = useState(false);
  const [expToEdit, setExpToEdit] = useState<Experience | null>(null);

  // Profile Form state
  const [profileForm, setProfileForm] = useState(data.profile);
  const [profileSaved, setProfileSaved] = useState(false);

  useEffect(() => {
    setProfileForm(data.profile);
  }, [data.profile]);

  // Education inline form & edit state
  const [newDegree, setNewDegree] = useState('');
  const [newInstitution, setNewInstitution] = useState('');
  const [newEduPeriod, setNewEduPeriod] = useState('');
  const [newEduScore, setNewEduScore] = useState('');
  const [editingEduId, setEditingEduId] = useState<string | null>(null);
  const [editEduForm, setEditEduForm] = useState<Education | null>(null);

  // Skill category and skill editing state
  const [newCatName, setNewCatName] = useState('');
  const [newSkillInput, setNewSkillInput] = useState<{ [catId: string]: string }>({});

  // Cert inline form state
  const [newCertTitle, setNewCertTitle] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('');
  const [newCertDate, setNewCertDate] = useState('');

  // Workshop inline form state
  const [newWsTitle, setNewWsTitle] = useState('');
  const [newWsOrg, setNewWsOrg] = useState('');
  const [newWsDate, setNewWsDate] = useState('');

  // Currently learning text
  const [learningText, setLearningText] = useState(data.currentlyLearning.join('\n'));
  const [softSkillsText, setSoftSkillsText] = useState(data.softSkills.join(', '));
  const [skillsSaved, setSkillsSaved] = useState(false);

  // Settings State
  const [newPin, setNewPin] = useState(data.settings.adminPin);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Import JSON state
  const [jsonImportText, setJsonImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const unreadInquiries = data.inquiries.filter((i) => i.status === 'unread');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      adminPin: newPin.trim() || 'admin123',
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  const handleExport = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.profile.name.toLowerCase().replace(/\s+/g, '_')}_portfolio_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!jsonImportText.trim()) return;
    const success = importDataJSON(jsonImportText.trim());
    if (success) {
      setImportStatus('Backup restored successfully!');
      setJsonImportText('');
    } else {
      setImportStatus('Invalid JSON format. Check syntax and retry.');
    }
    setTimeout(() => setImportStatus(null), 3000);
  };

  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDegree.trim() || !newInstitution.trim()) return;
    addEducation({
      degree: newDegree.trim(),
      institution: newInstitution.trim(),
      location: 'Tamil Nadu',
      period: newEduPeriod.trim() || '2024 – Present',
      score: newEduScore.trim() || undefined,
      current: newEduPeriod.toLowerCase().includes('expected') || newEduPeriod.toLowerCase().includes('present'),
      highlights: ['Active coursework and technical involvement'],
    });
    setNewDegree('');
    setNewInstitution('');
    setNewEduPeriod('');
    setNewEduScore('');
  };

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertTitle.trim() || !newCertIssuer.trim()) return;
    addCertification({
      title: newCertTitle.trim(),
      issuer: newCertIssuer.trim(),
      date: newCertDate.trim() || 'Oct 2025',
      details: 'Credential completed and verified.',
    });
    setNewCertTitle('');
    setNewCertIssuer('');
    setNewCertDate('');
  };

  const handleAddWorkshop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWsTitle.trim() || !newWsOrg.trim()) return;
    addWorkshop({
      title: newWsTitle.trim(),
      organizer: newWsOrg.trim(),
      dateOrDuration: newWsDate.trim() || 'Hands-on Bootcamp',
      type: 'workshop',
    });
    setNewWsTitle('');
    setNewWsOrg('');
    setNewWsDate('');
  };

  const handleSaveLearningAndSoftSkills = () => {
    const parsedLearning = learningText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const parsedSoft = softSkillsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    updateCurrentlyLearning(parsedLearning);
    updateSoftSkills(parsedSoft);
    setSkillsSaved(true);
    setTimeout(() => setSkillsSaved(false), 2500);
  };

  return (
    <div id="admin-dashboard" className="min-h-screen bg-[#12343b] text-[#ffffff] py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Top CMS Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#c89666]/60">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#e1b382] text-[#12343b] shadow-sand-glow border-2 border-[#c89666]">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold text-[#ffffff] tracking-tight font-['Plus_Jakarta_Sans']">
                  {data.profile.name} — CMS Admin Studio
                </h2>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#e1b382] text-[#12343b] border border-[#c89666] font-extrabold">
                  Live CMS Active
                </span>
              </div>
              <p className="text-xs text-[#f3e8d6] mt-0.5">
                Manage your resume details, hackathons, education, certifications, and inquiries.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {onBackToPublic && (
              <button
                onClick={onBackToPublic}
                className="px-4 py-2 text-xs font-bold text-[#12343b] bg-[#e1b382] hover:bg-[#ffffff] border-2 border-[#c89666] rounded-xl transition-all shadow-sand-glow flex items-center gap-1.5 hover:scale-105"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Return to Public Site</span>
              </button>
            )}

            <button
              onClick={handleExport}
              className="px-3.5 py-2 text-xs font-bold text-[#e1b382] border-2 border-[#e1b382] hover:bg-[#e1b382] hover:text-[#12343b] rounded-xl transition-colors flex items-center gap-1.5 shadow-sand-glow"
              title="Download full JSON backup of portfolio"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={() => {
                logoutAdmin();
                if (onBackToPublic) onBackToPublic();
              }}
              className="px-3.5 py-2 text-xs font-bold text-red-300 bg-red-950/80 hover:bg-red-900 border border-red-700 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit Admin</span>
            </button>
          </div>
        </div>

        {/* Main Tabbed Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-1">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#e1b382] px-3 pb-2 font-bold">
              Resume Modules
            </div>

            {[
              { id: 'overview', label: 'Overview & Metrics', icon: LayoutDashboard },
              { id: 'profile', label: 'Profile & Contact', icon: User },
              { id: 'education', label: 'Education & Academics', icon: GraduationCap, badge: data.education.length },
              { id: 'projects', label: 'Hackathons & Projects', icon: FolderGit2, badge: data.projects.length },
              { id: 'experience', label: 'Internships', icon: Briefcase, badge: data.experience.length },
              { id: 'workshops_certs', label: 'Workshops & Certs', icon: Award, badge: data.certifications.length + data.workshops.length },
              { id: 'skills', label: 'Skills & Learning', icon: Layers },
              { id: 'inquiries', label: 'Inquiries Inbox', icon: Inbox, badge: unreadInquiries.length, highlightBadge: unreadInquiries.length > 0 },
              { id: 'settings', label: 'Settings & Theme', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-[#e1b382] text-[#12343b] shadow-sand-glow border-2 border-[#c89666]'
                      : 'text-[#f3e8d6] hover:text-[#e1b382] hover:bg-[#2d545e]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </div>

                  {tab.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        tab.highlightBadge
                          ? 'bg-amber-500 text-neutral-950 font-bold'
                          : active
                          ? 'bg-white/20 text-white'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Panel */}
          <div className="lg:col-span-9 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 sm:p-8 min-h-[500px]">
            
            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Portfolio &amp; Resume Snapshot</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    All updates here sync immediately to the public site and local storage.
                  </p>
                </div>

                {/* Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/60">
                    <div className="text-xs text-neutral-400 font-mono">Hackathons</div>
                    <div className="text-2xl font-bold text-white mt-1">{data.projects.length}</div>
                    <div className="text-[11px] text-amber-400 mt-0.5">Top 5 &amp; Top 12</div>
                  </div>

                  <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/60">
                    <div className="text-xs text-neutral-400 font-mono">Education</div>
                    <div className="text-2xl font-bold text-white mt-1">{data.education.length}</div>
                    <div className="text-[11px] text-indigo-400 mt-0.5">2nd Year B.Tech IT</div>
                  </div>

                  <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/60">
                    <div className="text-xs text-neutral-400 font-mono">Workshops / Certs</div>
                    <div className="text-2xl font-bold text-white mt-1">
                      {data.certifications.length + data.workshops.length}
                    </div>
                    <div className="text-[11px] text-emerald-400 mt-0.5">
                      {data.certifications.length} Certifications
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/60">
                    <div className="text-xs text-neutral-400 font-mono">Inquiries</div>
                    <div className="text-2xl font-bold text-white mt-1">{data.inquiries.length}</div>
                    <div className="text-[11px] text-amber-400 font-medium mt-0.5">
                      {unreadInquiries.length} unread
                    </div>
                  </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/50 space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Quick Resume Summary
                  </h4>
                  <div className="text-xs text-neutral-300 space-y-1">
                    <p><strong className="text-white">Name:</strong> {data.profile.name}</p>
                    <p><strong className="text-white">College:</strong> Rathinam Technical Campus, Coimbatore</p>
                    <p><strong className="text-white">Internship:</strong> Cyber Security &amp; Ethical Hacking at CodTech IT Solutions (Completed)</p>
                    <p><strong className="text-white">Contact:</strong> {data.profile.email} | {data.profile.phone}</p>
                  </div>
                </div>

                {/* Recent Inquiries List */}
                <div className="space-y-3 pt-4 border-t border-neutral-800">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">Recent Inquiries</h4>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="text-xs text-indigo-400 hover:underline"
                    >
                      View All ({data.inquiries.length})
                    </button>
                  </div>

                  {data.inquiries.length === 0 ? (
                    <div className="p-6 text-center text-xs text-neutral-500 border border-dashed border-neutral-800 rounded-xl">
                      No inquiries yet. Test the contact form on the public page!
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {data.inquiries.slice(0, 3).map((inq) => (
                        <div
                          key={inq.id}
                          className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-white">{inq.name}</span>
                              <span className="text-neutral-500 text-[11px]">({inq.email})</span>
                              {inq.status === 'unread' && (
                                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
                                  New
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-neutral-300 font-medium">{inq.subject}</div>
                            <div className="text-[11px] text-neutral-400 line-clamp-1">{inq.message}</div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <a
                              href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject)}`}
                              className="px-2.5 py-1 text-xs font-medium text-neutral-200 bg-neutral-800 hover:text-white rounded transition-colors"
                            >
                              Reply
                            </a>
                            <button
                              onClick={() => updateInquiryStatus(inq.id, inq.status === 'unread' ? 'read' : 'unread')}
                              className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white rounded border border-neutral-800"
                            >
                              {inq.status === 'unread' ? 'Mark Read' : 'Mark Unread'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: PROFILE & CONTACT */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Personal &amp; Contact Details</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Updates the Hero section, contact links, and resume generator.
                    </p>
                  </div>
                  {profileSaved && (
                    <div className="text-xs text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Changes Saved!</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300">Professional Headline</label>
                    <input
                      type="text"
                      value={profileForm.title}
                      onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300">Short Bio (Hero Tagline)</label>
                  <input
                    type="text"
                    value={profileForm.shortBio}
                    onChange={(e) => setProfileForm({ ...profileForm, shortBio: e.target.value })}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300">Full Profile Statement</label>
                  <textarea
                    rows={3}
                    value={profileForm.fullBio}
                    onChange={(e) => setProfileForm({ ...profileForm, fullBio: e.target.value })}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-sm text-white focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300">Location</label>
                    <input
                      type="text"
                      value={profileForm.location}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300">Email Address</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300">Phone Number</label>
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className={`px-5 py-2.5 rounded-lg text-xs font-semibold text-white ${accent.bg} hover:opacity-90 shadow-md ${accent.glow} transition-all flex items-center gap-1.5`}
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Profile Information</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB: EDUCATION */}
            {activeTab === 'education' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Academic Records</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Manage university degrees, 12th, and 10th standard educational qualifications.
                  </p>
                </div>

                {/* Add Education Form */}
                <form onSubmit={handleAddEducation} className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/60 space-y-3">
                  <div className="text-xs font-bold text-white">Add New Education Entry</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Degree / Qualification (e.g. B.Tech IT)"
                      value={newDegree}
                      onChange={(e) => setNewDegree(e.target.value)}
                      className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-white focus:outline-none"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Institution (e.g. Rathinam Technical Campus)"
                      value={newInstitution}
                      onChange={(e) => setNewInstitution(e.target.value)}
                      className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Period (e.g. 2024 – 2029)"
                      value={newEduPeriod}
                      onChange={(e) => setNewEduPeriod(e.target.value)}
                      className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-white focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Score / Status (e.g. 81.6% or Currently 2nd Year)"
                      value={newEduScore}
                      onChange={(e) => setNewEduScore(e.target.value)}
                      className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-lg text-xs font-semibold text-white ${accent.bg} hover:opacity-90 flex items-center gap-1.5`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Qualification</span>
                  </button>
                </form>

                {/* List of Education */}
                <div className="space-y-3">
                  {data.education.map((edu) => (
                    <div
                      key={edu.id}
                      className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/60 space-y-3"
                    >
                      {editingEduId === edu.id && editEduForm ? (
                        <div className="space-y-3 p-3 bg-neutral-900 rounded-lg border border-neutral-700">
                          <div className="text-xs font-bold text-[#e1b382]">Edit Qualification Entry</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-[11px] font-semibold text-neutral-300">Degree / School</label>
                              <input
                                type="text"
                                value={editEduForm.degree}
                                onChange={(e) => setEditEduForm({ ...editEduForm, degree: e.target.value })}
                                className="w-full rounded border border-neutral-800 bg-neutral-950 px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] font-semibold text-neutral-300">Institution Name</label>
                              <input
                                type="text"
                                value={editEduForm.institution}
                                onChange={(e) => setEditEduForm({ ...editEduForm, institution: e.target.value })}
                                className="w-full rounded border border-neutral-800 bg-neutral-950 px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-[11px] font-semibold text-neutral-300">Period (e.g. 2024 – 2028)</label>
                              <input
                                type="text"
                                value={editEduForm.period}
                                onChange={(e) => setEditEduForm({ ...editEduForm, period: e.target.value })}
                                className="w-full rounded border border-neutral-800 bg-neutral-950 px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] font-semibold text-neutral-300">Mark Percentage / Score Badge</label>
                              <input
                                type="text"
                                value={editEduForm.score || ''}
                                onChange={(e) => setEditEduForm({ ...editEduForm, score: e.target.value })}
                                className="w-full rounded border border-neutral-800 bg-neutral-950 px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2 pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                updateEducation(edu.id, editEduForm);
                                setEditingEduId(null);
                                setEditEduForm(null);
                              }}
                              className="px-3 py-1.5 bg-[#e1b382] text-[#12343b] text-xs font-bold rounded-lg hover:bg-white transition-colors"
                            >
                              Save Entry
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingEduId(null);
                                setEditEduForm(null);
                              }}
                              className="px-3 py-1.5 bg-neutral-800 text-neutral-300 text-xs font-semibold rounded-lg hover:bg-neutral-700"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
                              {edu.score && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  {edu.score}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-neutral-300">{edu.institution}, {edu.location}</div>
                            <div className="text-[11px] text-neutral-500 font-mono">{edu.period}</div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingEduId(edu.id);
                                setEditEduForm({ ...edu });
                              }}
                              className="p-2 rounded border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
                              title="Edit Education Record"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete ${edu.degree}?`)) {
                                  deleteEducation(edu.id);
                                }
                              }}
                              className="p-2 rounded border border-red-900/40 text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors"
                              title="Delete Entry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: PROJECTS & HACKATHONS */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Hackathons &amp; Projects</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Create, modify, or update project case studies and competition awards.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setProjectToEdit(null);
                      setProjectModalOpen(true);
                    }}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold text-white ${accent.bg} hover:opacity-90 flex items-center gap-1.5 shadow-sm`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {data.projects.map((project) => (
                    <div
                      key={project.id}
                      className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="w-16 h-12 rounded-lg object-cover border border-neutral-800 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">{project.title}</h4>
                            <span className="text-[10px] font-mono text-neutral-400 capitalize">
                              {project.category} · {project.year}
                            </span>
                            {project.impactMetric && (
                              <span className="text-[10px] text-amber-400 flex items-center gap-0.5 font-medium">
                                <Award className="w-3 h-3" />
                                {project.impactMetric}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">{project.tagline}</p>
                          <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                            {project.tags.join(' · ')}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => {
                            setProjectToEdit(project);
                            setProjectModalOpen(true);
                          }}
                          className="p-2 rounded border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-850 transition-colors"
                          title="Edit Case Study"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
                              deleteProject(project.id);
                            }
                          }}
                          className="p-2 rounded border border-red-900/40 text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: INTERNSHIPS & EXPERIENCE */}
            {activeTab === 'experience' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Internships &amp; Experience</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Maintain internship records, company deliverables, and cyber security skills.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setExpToEdit(null);
                      setExpModalOpen(true);
                    }}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold text-white ${accent.bg} hover:opacity-90 flex items-center gap-1.5 shadow-sm`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Experience</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {data.experience.map((exp) => (
                    <div
                      key={exp.id}
                      className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{exp.role}</h4>
                          <span className="text-neutral-400 text-xs">@ {exp.company}</span>
                        </div>
                        <div className="text-xs text-neutral-400 font-mono">
                          {exp.period} · {exp.location}
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          {exp.achievements.length} achievements listed · Stack: {exp.tech.join(', ')}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => {
                            setExpToEdit(exp);
                            setExpModalOpen(true);
                          }}
                          className="p-2 rounded border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-850 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete role "${exp.role} @ ${exp.company}"?`)) {
                              deleteExperience(exp.id);
                            }
                          }}
                          className="p-2 rounded border border-red-900/40 text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: WORKSHOPS & CERTS */}
            {activeTab === 'workshops_certs' && (
              <div className="space-y-8">
                {/* Certifications Manager */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white tracking-tight">Certifications</h3>
                  
                  <form onSubmit={handleAddCert} className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/60 space-y-3">
                    <div className="text-xs font-bold text-white">Add New Certification</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Certificate Title"
                        value={newCertTitle}
                        onChange={(e) => setNewCertTitle(e.target.value)}
                        className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-white focus:outline-none"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Issuer (e.g. Cisco / Scaler)"
                        value={newCertIssuer}
                        onChange={(e) => setNewCertIssuer(e.target.value)}
                        className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-white focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Date (e.g. Oct 2025)"
                        value={newCertDate}
                        onChange={(e) => setNewCertDate(e.target.value)}
                        className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className={`px-4 py-2 rounded-lg text-xs font-semibold text-white ${accent.bg} hover:opacity-90 flex items-center gap-1.5`}
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Certificate</span>
                    </button>
                  </form>

                  <div className="space-y-2">
                    {data.certifications.map((cert) => (
                      <div key={cert.id} className="p-3 rounded-lg border border-neutral-800 bg-neutral-950/50 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-white">{cert.title}</div>
                          <div className="text-[11px] text-indigo-400">{cert.issuer} · {cert.date}</div>
                        </div>
                        <button
                          onClick={() => deleteCertification(cert.id)}
                          className="p-1.5 text-neutral-500 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Workshops Manager */}
                <div className="space-y-4 pt-4 border-t border-neutral-800">
                  <h3 className="text-base font-bold text-white tracking-tight">Workshops &amp; Technical Trainings</h3>

                  <form onSubmit={handleAddWorkshop} className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/60 space-y-3">
                    <div className="text-xs font-bold text-white">Add Workshop / Training</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Workshop Title"
                        value={newWsTitle}
                        onChange={(e) => setNewWsTitle(e.target.value)}
                        className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-white focus:outline-none"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Organizer / Institution"
                        value={newWsOrg}
                        onChange={(e) => setNewWsOrg(e.target.value)}
                        className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-white focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Duration / Date"
                        value={newWsDate}
                        onChange={(e) => setNewWsDate(e.target.value)}
                        className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className={`px-4 py-2 rounded-lg text-xs font-semibold text-white ${accent.bg} hover:opacity-90 flex items-center gap-1.5`}
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Workshop</span>
                    </button>
                  </form>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {data.workshops.map((ws) => (
                      <div key={ws.id} className="p-3 rounded-lg border border-neutral-850 bg-neutral-950/50 flex items-center justify-between">
                        <div className="pr-2">
                          <div className="text-xs font-semibold text-white line-clamp-1">{ws.title}</div>
                          <div className="text-[11px] text-neutral-400 line-clamp-1">{ws.organizer}</div>
                        </div>
                        <button
                          onClick={() => deleteWorkshop(ws.id)}
                          className="p-1.5 text-neutral-500 hover:text-red-400 shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SKILLS & LEARNING */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Skills &amp; Learning Journey</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Add, edit, or remove technical skills, competency categories, currently learning items, and soft skills.
                    </p>
                  </div>
                  {skillsSaved && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Saved!
                    </span>
                  )}
                </div>

                {/* Add New Skill Category Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newCatName.trim()) return;
                    const newCategory: SkillCategory = {
                      id: `cat-${Date.now()}`,
                      name: newCatName.trim(),
                      skills: [],
                    };
                    updateSkills([...data.skills, newCategory]);
                    setNewCatName('');
                  }}
                  className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/60 flex items-center gap-3"
                >
                  <input
                    type="text"
                    placeholder="New Skill Category Name (e.g. Cloud & DevOps)"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    className="flex-1 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-lg text-xs font-semibold text-white ${accent.bg} hover:opacity-90 flex items-center gap-1.5 shrink-0`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Category</span>
                  </button>
                </form>

                {/* Technical Proficiency Bars & Skill Item Management */}
                <div className="space-y-4">
                  {data.skills.map((cat, cIdx) => (
                    <div key={cat.id} className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/60 space-y-4">
                      {/* Category Header */}
                      <div className="flex items-center justify-between border-b border-neutral-850 pb-2">
                        <div className="flex items-center gap-2 flex-1 mr-4">
                          <input
                            type="text"
                            value={cat.name}
                            onChange={(e) => {
                              const newSkills = [...data.skills];
                              newSkills[cIdx].name = e.target.value;
                              updateSkills(newSkills);
                            }}
                            className="text-xs font-bold text-[#e1b382] uppercase bg-transparent border-b border-dashed border-neutral-700 focus:border-[#e1b382] focus:outline-none px-1 py-0.5"
                          />
                          <span className="text-[10px] text-neutral-500 font-mono">({cat.skills.length} skills)</span>
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete skill category "${cat.name}"?`)) {
                              const newSkills = data.skills.filter((_, idx) => idx !== cIdx);
                              updateSkills(newSkills);
                            }
                          }}
                          className="p-1 text-red-400 hover:text-red-300 text-xs"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Skills Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {cat.skills.map((skill, sIdx) => (
                          <div key={sIdx} className="p-2.5 bg-neutral-900 rounded-lg border border-neutral-800 space-y-2">
                            <div className="flex items-center justify-between text-xs gap-2">
                              <input
                                type="text"
                                value={skill.name}
                                onChange={(e) => {
                                  const newSkills = [...data.skills];
                                  newSkills[cIdx].skills[sIdx].name = e.target.value;
                                  updateSkills(newSkills);
                                }}
                                className="font-semibold text-white bg-transparent border-b border-neutral-700 focus:border-[#e1b382] focus:outline-none text-xs flex-1"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newSkills = [...data.skills];
                                  newSkills[cIdx].skills.splice(sIdx, 1);
                                  updateSkills(newSkills);
                                }}
                                className="text-neutral-500 hover:text-red-400 p-0.5"
                                title="Remove Skill"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add Skill to this Category */}
                      <div className="flex items-center gap-2 pt-2 border-t border-neutral-850">
                        <input
                          type="text"
                          placeholder="Add new skill to this category (e.g. Docker)"
                          value={newSkillInput[cat.id] || ''}
                          onChange={(e) =>
                            setNewSkillInput({ ...newSkillInput, [cat.id]: e.target.value })
                          }
                          className="flex-1 rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-white focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const val = (newSkillInput[cat.id] || '').trim();
                            if (!val) return;
                            const newSkills = [...data.skills];
                            newSkills[cIdx].skills.push({ name: val, level: 80, highlight: true });
                            updateSkills(newSkills);
                            setNewSkillInput({ ...newSkillInput, [cat.id]: '' });
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#e1b382] text-[#12343b] hover:bg-white transition-colors flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Skill</span>
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

                {/* Currently Learning & Soft Skills Editor */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white">Currently Learning (One per line)</label>
                    <textarea
                      rows={4}
                      value={learningText}
                      onChange={(e) => setLearningText(e.target.value)}
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 p-2.5 text-xs text-white focus:outline-none resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white">Soft Skills &amp; Strengths (Comma separated)</label>
                    <textarea
                      rows={4}
                      value={softSkillsText}
                      onChange={(e) => setSoftSkillsText(e.target.value)}
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 p-2.5 text-xs text-white focus:outline-none resize-none"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSaveLearningAndSoftSkills}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold text-white ${accent.bg} hover:opacity-90 flex items-center gap-1.5`}
                >
                  <Save className="w-4 h-4" />
                  <span>Save Skills &amp; Strengths</span>
                </button>
              </div>
            )}

            {/* TAB: INQUIRIES INBOX */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Inquiries Inbox</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Messages submitted by visitors through the contact form are stored here.
                    </p>
                  </div>
                  <div className="text-xs font-mono text-neutral-400">
                    Total: {data.inquiries.length} · Unread: {unreadInquiries.length}
                  </div>
                </div>

                {data.inquiries.length === 0 ? (
                  <div className="p-12 text-center text-xs text-neutral-400 border border-dashed border-neutral-800 rounded-xl space-y-2">
                    <Inbox className="w-8 h-8 text-neutral-600 mx-auto" />
                    <p>Inbox is empty.</p>
                    <p className="text-[11px] text-neutral-500">
                      Submit an inquiry on the public contact section to test reception!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {data.inquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className={`p-5 rounded-xl border transition-all ${
                          inq.status === 'unread'
                            ? 'border-indigo-500/50 bg-indigo-950/20'
                            : 'border-neutral-800 bg-neutral-950/60'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{inq.name}</span>
                            <span className="text-xs text-neutral-400">&lt;{inq.email}&gt;</span>
                            {inq.status === 'unread' && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                                Unread
                              </span>
                            )}
                            {inq.status === 'replied' && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                                Replied
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-neutral-500 font-mono">
                            {new Date(inq.createdAt).toLocaleDateString()} · {new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>

                        <div className="py-3 space-y-2">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                            <span className="text-neutral-200 font-semibold">{inq.subject}</span>
                            <span aria-hidden="true">·</span>
                            <span>{inq.projectType}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-neutral-300 bg-neutral-900 p-3.5 rounded-lg border border-neutral-850 leading-relaxed whitespace-pre-wrap">
                            {inq.message}
                          </p>
                        </div>

                        <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <a
                              href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject)}`}
                              onClick={() => updateInquiryStatus(inq.id, 'replied')}
                              className={`px-3 py-1.5 text-xs font-semibold text-white ${accent.bg} hover:opacity-90 rounded-lg flex items-center gap-1.5`}
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>Reply via Email</span>
                            </a>

                            <button
                              onClick={() => updateInquiryStatus(inq.id, inq.status === 'unread' ? 'read' : 'unread')}
                              className="px-3 py-1.5 text-xs text-neutral-300 hover:text-white bg-neutral-850 rounded-lg transition-colors"
                            >
                              {inq.status === 'unread' ? 'Mark as Read' : 'Mark as Unread'}
                            </button>
                          </div>

                          <button
                            onClick={() => {
                              if (confirm('Delete this inquiry?')) {
                                deleteInquiry(inq.id);
                              }
                            }}
                            className="p-1.5 text-neutral-500 hover:text-red-400 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: SETTINGS & THEME */}
            {activeTab === 'settings' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Settings &amp; Theme Studio</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Customize the portfolio accent color palette, toggle visibility, and manage backups.
                  </p>
                </div>

                {/* Accent Color Palette Selector */}
                <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-950/60 space-y-3">
                  <div className="text-xs font-bold text-white">Accent Color Palette</div>
                  <div className="flex flex-wrap items-center gap-3">
                    {[
                      { id: 'indigo', label: 'Indigo', colorClass: 'bg-indigo-500' },
                      { id: 'emerald', label: 'Emerald', colorClass: 'bg-emerald-500' },
                      { id: 'amber', label: 'Amber', colorClass: 'bg-amber-500' },
                      { id: 'violet', label: 'Violet', colorClass: 'bg-violet-600' },
                      { id: 'cyan', label: 'Cyan', colorClass: 'bg-cyan-500' },
                      { id: 'rose', label: 'Rose', colorClass: 'bg-rose-500' },
                    ].map((palette) => (
                      <button
                        key={palette.id}
                        type="button"
                        onClick={() => updateSettings({ accentColor: palette.id as AccentColor })}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                          data.settings.accentColor === palette.id
                            ? 'border-white text-white bg-neutral-800 shadow-sm'
                            : 'border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900'
                        }`}
                      >
                        <span className={`h-3 w-3 rounded-full ${palette.colorClass}`} />
                        <span>{palette.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section Visibility Toggles */}
                <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-950/60 space-y-3">
                  <div className="text-xs font-bold text-white">Public Section Toggles</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                      <input
                        type="checkbox"
                        checked={data.settings.showEducation}
                        onChange={(e) => updateSettings({ showEducation: e.target.checked })}
                        className="rounded border-neutral-800 bg-neutral-950 text-indigo-600 h-4 w-4"
                      />
                      <span>Education</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                      <input
                        type="checkbox"
                        checked={data.settings.showExperience}
                        onChange={(e) => updateSettings({ showExperience: e.target.checked })}
                        className="rounded border-neutral-800 bg-neutral-950 text-indigo-600 h-4 w-4"
                      />
                      <span>Internships</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                      <input
                        type="checkbox"
                        checked={data.settings.showCertifications}
                        onChange={(e) => updateSettings({ showCertifications: e.target.checked })}
                        className="rounded border-neutral-800 bg-neutral-950 text-indigo-600 h-4 w-4"
                      />
                      <span>Certifications</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                      <input
                        type="checkbox"
                        checked={data.settings.showSkills}
                        onChange={(e) => updateSettings({ showSkills: e.target.checked })}
                        className="rounded border-neutral-800 bg-neutral-950 text-indigo-600 h-4 w-4"
                      />
                      <span>Skills Matrix</span>
                    </label>
                  </div>
                </div>

                {/* Admin PIN Configuration */}
                <form onSubmit={handleSaveSettings} className="p-5 rounded-xl border border-neutral-800 bg-neutral-950/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-white">Admin Security PIN</div>
                    {settingsSaved && (
                      <span className="text-xs text-emerald-400">PIN updated!</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      placeholder="e.g. admin123"
                      className="rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-xs text-white focus:outline-none w-48 font-mono"
                    />
                    <button
                      type="submit"
                      className={`px-4 py-2 rounded-lg text-xs font-semibold text-white ${accent.bg} hover:opacity-90 transition-all`}
                    >
                      Update PIN
                    </button>
                  </div>
                </form>

                {/* Backup & Import Data */}
                <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-950/60 space-y-3">
                  <div className="text-xs font-bold text-white">Import JSON Backup</div>
                  <p className="text-xs text-neutral-400">
                    Paste previously exported JSON data to restore state:
                  </p>
                  <textarea
                    rows={3}
                    value={jsonImportText}
                    onChange={(e) => setJsonImportText(e.target.value)}
                    placeholder='{"profile": {...}, "projects": [...]}'
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 p-2.5 text-xs text-white font-mono focus:outline-none resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleImport}
                      className="px-4 py-2 text-xs font-semibold text-neutral-200 bg-neutral-800 hover:text-white rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Restore from JSON</span>
                    </button>
                    {importStatus && (
                      <span className="text-xs text-emerald-400 font-medium">{importStatus}</span>
                    )}
                  </div>
                </div>

                {/* Reset to Default Mohamed Riyaskhan Data */}
                <div className="p-5 rounded-xl border border-red-950/50 bg-red-950/10 space-y-2">
                  <div className="text-xs font-bold text-red-300">Reset to Defaults</div>
                  <p className="text-xs text-neutral-400">
                    Restores Mohamed Riyaskhan's baseline resume data.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Reset all changes back to Mohamed Riyaskhan initial resume dataset?')) {
                        resetToDefaults();
                      }
                    }}
                    className="px-4 py-2 text-xs font-semibold text-red-300 hover:text-white bg-red-950/40 hover:bg-red-900/60 border border-red-900/50 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Resume Data</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Project Editor Modal */}
      <ProjectEditorModal
        isOpen={projectModalOpen}
        projectToEdit={projectToEdit}
        onClose={() => {
          setProjectModalOpen(false);
          setProjectToEdit(null);
        }}
      />

      {/* Experience Editor Modal */}
      <ExperienceEditorModal
        isOpen={expModalOpen}
        expToEdit={expToEdit}
        onClose={() => {
          setExpModalOpen(false);
          setExpToEdit(null);
        }}
      />
    </div>
  );
};
