import React, { useState, useEffect } from 'react';
import { Experience, InternshipProject } from '../../types/portfolio';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, Save, Plus, Trash2 } from 'lucide-react';
import { ImageUploader } from './ImageUploader';

interface ExperienceEditorModalProps {
  isOpen: boolean;
  expToEdit: Experience | null;
  onClose: () => void;
}

export const ExperienceEditorModal: React.FC<ExperienceEditorModalProps> = ({
  isOpen,
  expToEdit,
  onClose,
}) => {
  const { addExperience, updateExperience } = usePortfolio();

  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [period, setPeriod] = useState('');
  const [current, setCurrent] = useState(false);
  const [achievementsString, setAchievementsString] = useState('');
  const [techString, setTechString] = useState('');
  const [offerLetterUrl, setOfferLetterUrl] = useState('');
  const [completionCertificateUrl, setCompletionCertificateUrl] = useState('');
  const [internshipProjects, setInternshipProjects] = useState<InternshipProject[]>([]);

  // Inline state for adding internship project
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjImg, setNewProjImg] = useState('');
  const [newProjGithubUrl, setNewProjGithubUrl] = useState('');

  useEffect(() => {
    if (expToEdit) {
      setRole(expToEdit.role);
      setCompany(expToEdit.company);
      setLocation(expToEdit.location);
      setPeriod(expToEdit.period);
      setCurrent(expToEdit.current);
      setAchievementsString(expToEdit.achievements.join('\n'));
      setTechString(expToEdit.tech.join(', '));
      setOfferLetterUrl(expToEdit.offerLetterUrl || '');
      setCompletionCertificateUrl(expToEdit.completionCertificateUrl || '');
      setInternshipProjects(expToEdit.internshipProjects || []);
    } else {
      setRole('');
      setCompany('');
      setLocation('Virtual / Coimbatore');
      setPeriod('2026');
      setCurrent(false);
      setAchievementsString('Successfully completed intensive internship focused on cyber security\nAnalyzed web vulnerabilities (OWASP Top 10) and practiced packet capture');
      setTechString('Cyber Security, Ethical Hacking, Linux, Network Protocols');
      setOfferLetterUrl('/images/internship-certificates/offer-letter.png');
      setCompletionCertificateUrl('/images/internship-certificates/internship-certificate.png');
      setInternshipProjects([
        {
          id: 'int-p1',
          title: 'File Integrity Monitoring Tool',
          description: 'SHA-256 hash calculation and integrity validation tool for detecting unauthorized file modifications and system tampering.',
          imageUrl: '/images/internship-certificates/file-integrity.jpg',
          tags: ['Python', 'SHA-256', 'Security Audit'],
          githubUrl: 'https://github.com/Riyaskhan2010/FILE-INTEGRITY-CHECKER',
        },
        {
          id: 'int-p2',
          title: 'AI-Powered Malware Detection',
          description: 'Automated file threat analysis tool to detect malicious signatures, suspicious file structures, and payload patterns.',
          imageUrl: '/images/internship-certificates/malwareguard.jpg',
          tags: ['Python', 'Malware Analysis', 'Threat Detection'],
          githubUrl: 'https://github.com/Riyaskhan2010/AI-Powered-Malware-Detection',
        },
        {
          id: 'int-p3',
          title: 'Password Strength & Entropy Analyzer',
          description: 'Cyber security utility for testing password complexity, entropy scoring, dictionary vulnerability, and brute-force estimate.',
          imageUrl: '/images/internship-certificates/password-strength.jpg',
          tags: ['Cyber Security', 'Entropy Scoring', 'Python'],
          githubUrl: 'https://github.com/Riyaskhan2010/Password-Strength-Checker',
        },
        {
          id: 'int-p4',
          title: 'Cloud Security Auditor for AWS',
          description: 'Automated cloud security & compliance auditor scanning AWS S3 bucket encryption, IAM user roles, and security group vulnerabilities.',
          imageUrl: '/images/internship-certificates/aws-security-auditor.jpg',
          tags: ['AWS', 'Cloud Security', 'Python', 'IAM Audit'],
          githubUrl: 'https://github.com/Riyaskhan2010/Cloud-Security-Auditor-for-AWS',
        },
      ]);
    }
  }, [expToEdit, isOpen]);

  if (!isOpen) return null;

  const handleAddProject = () => {
    if (!newProjTitle.trim()) return;
    const newProject: InternshipProject = {
      id: `iproj-${Date.now()}`,
      title: newProjTitle.trim(),
      description: newProjDesc.trim() || 'Key deliverable completed during internship.',
      imageUrl: newProjImg.trim() || '/images/internship-certificates/file-integrity.jpg',
      githubUrl: newProjGithubUrl.trim() || undefined,
    };
    setInternshipProjects([...internshipProjects, newProject]);
    setNewProjTitle('');
    setNewProjDesc('');
    setNewProjImg('');
    setNewProjGithubUrl('');
  };

  const handleDeleteProject = (id: string) => {
    setInternshipProjects(internshipProjects.filter((p) => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim() || !company.trim()) return;

    const parsedAchievements = achievementsString
      .split('\n')
      .map((a) => a.trim())
      .filter(Boolean);

    const parsedTech = techString
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      role: role.trim(),
      company: company.trim(),
      location: location.trim(),
      period: period.trim(),
      current,
      achievements: parsedAchievements.length > 0 ? parsedAchievements : ['Key deliverables completed'],
      tech: parsedTech.length > 0 ? parsedTech : ['Cyber Security', 'Linux'],
      offerLetterUrl: offerLetterUrl.trim() || undefined,
      completionCertificateUrl: completionCertificateUrl.trim() || undefined,
      internshipProjects,
    };

    if (expToEdit) {
      updateExperience(expToEdit.id, payload);
    } else {
      addExperience(payload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl rounded-2xl bg-[#050505] border border-[#2A2A2A] shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[#2A2A2A] flex items-center justify-between bg-[#000000]">
          <div className="space-y-0.5">
            <span className="text-xs font-mono text-[#27D6D9] uppercase tracking-wider font-bold">
              {expToEdit ? 'Edit Role' : 'Add Experience Entry'}
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              {expToEdit ? `${expToEdit.role} @ ${expToEdit.company}` : 'Career Timeline Editor'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#BDBDBD] hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-sm text-[#BDBDBD]">
          {/* Main Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#BDBDBD]">Job Title / Role *</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Cyber Security Intern"
                className="w-full rounded-lg border border-[#2A2A2A] bg-[#000000] px-3.5 py-2 text-sm text-white focus:border-[#F0444B] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#BDBDBD]">Company Name *</label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="CodTech IT Solutions"
                className="w-full rounded-lg border border-[#2A2A2A] bg-[#000000] px-3.5 py-2 text-sm text-white focus:border-[#F0444B] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#BDBDBD]">Period *</label>
              <input
                type="text"
                required
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="09 Aug 2026 – 20 Sep 2026 (6 Weeks)"
                className="w-full rounded-lg border border-[#2A2A2A] bg-[#000000] px-3.5 py-2 text-sm text-white focus:border-[#F0444B] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#BDBDBD]">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Virtual / Coimbatore"
                className="w-full rounded-lg border border-[#2A2A2A] bg-[#000000] px-3.5 py-2 text-sm text-white focus:border-[#F0444B] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={current}
                onChange={(e) => setCurrent(e.target.checked)}
                className="rounded border-[#2A2A2A] bg-[#000000] text-[#F0444B] h-4 w-4"
              />
              <span className="text-xs text-[#BDBDBD] font-medium">Currently working in this role</span>
            </label>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#BDBDBD]">Key Highlights & Responsibilities (One per line)</label>
            <textarea
              rows={4}
              value={achievementsString}
              onChange={(e) => setAchievementsString(e.target.value)}
              placeholder="Successfully completed intensive 6-week internship&#10;Analyzed web vulnerabilities (OWASP Top 10)"
              className="w-full rounded-lg border border-[#2A2A2A] bg-[#000000] px-3.5 py-2 text-sm text-white focus:border-[#F0444B] focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#BDBDBD]">Skills & Tools (comma-separated)</label>
            <input
              type="text"
              value={techString}
              onChange={(e) => setTechString(e.target.value)}
              placeholder="Cyber Security, Ethical Hacking, Network Protocols, Linux"
              className="w-full rounded-lg border border-[#2A2A2A] bg-[#000000] px-3.5 py-2 text-sm text-white focus:border-[#F0444B] focus:outline-none"
            />
          </div>

          {/* Certificates Section */}
          <div className="space-y-4 pt-4 border-t border-[#2A2A2A]">
            <h4 className="text-xs font-bold text-[#F0444B] uppercase tracking-wider">
              Offer Letter & Internship Completion Certificate Uploads
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white">Offer Letter Image</label>
                <ImageUploader
                  value={offerLetterUrl}
                  onChange={setOfferLetterUrl}
                  placeholder="Upload offer letter image or paste image URL"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white">Completion Certificate Image</label>
                <ImageUploader
                  value={completionCertificateUrl}
                  onChange={setCompletionCertificateUrl}
                  placeholder="Upload completion certificate image or paste image URL"
                />
              </div>
            </div>
          </div>

          {/* Internship Projects Section */}
          <div className="space-y-4 pt-4 border-t border-[#2A2A2A]">
            <h4 className="text-xs font-bold text-[#27D6D9] uppercase tracking-wider">
              Internship Projects & Deliverables
            </h4>

            {/* List of existing projects */}
            <div className="space-y-2">
              {internshipProjects.map((p) => (
                <div key={p.id} className="p-3 rounded-xl bg-[#000000] border border-[#2A2A2A] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {p.imageUrl && (
                      <img src={encodeURI(p.imageUrl)} alt={p.title} className="w-12 h-10 object-cover rounded-lg border border-[#2A2A2A] bg-black" />
                    )}
                    <div>
                      <div className="text-xs font-bold text-white">{p.title}</div>
                      <div className="text-[11px] text-[#BDBDBD] line-clamp-1">{p.description}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteProject(p.id)}
                    className="p-1.5 text-neutral-500 hover:text-red-400 shrink-0"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Project Form */}
            <div className="p-4 rounded-xl border border-[#2A2A2A] bg-[#000000] space-y-3">
              <span className="text-xs font-bold text-white">Add New Internship Project</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={newProjTitle}
                  onChange={(e) => setNewProjTitle(e.target.value)}
                  className="rounded-lg border border-[#2A2A2A] bg-[#050505] px-3 py-2 text-xs text-white focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Project Description"
                  value={newProjDesc}
                  onChange={(e) => setNewProjDesc(e.target.value)}
                  className="rounded-lg border border-[#2A2A2A] bg-[#050505] px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <input
                  type="url"
                  placeholder="Project GitHub Link (e.g. https://github.com/User/Repo)"
                  value={newProjGithubUrl}
                  onChange={(e) => setNewProjGithubUrl(e.target.value)}
                  className="w-full rounded-lg border border-[#2A2A2A] bg-[#050505] px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#BDBDBD] mb-1">Project Showcase Image</label>
                <ImageUploader
                  value={newProjImg}
                  onChange={setNewProjImg}
                  placeholder="Upload internship project screenshot or paste image URL"
                />
              </div>

              <button
                type="button"
                onClick={handleAddProject}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#27D6D9]/20 hover:bg-[#27D6D9]/30 text-[#27D6D9] border border-[#27D6D9]/40 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Internship Project</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-[#2A2A2A] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#BDBDBD] hover:text-white rounded-lg transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-xs font-semibold text-white bg-[#F0444B] hover:bg-[#FF6B6B] shadow-md transition-all flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Entry</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


