import React, { useState, useEffect } from 'react';
import { Experience } from '../../types/portfolio';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, Save } from 'lucide-react';

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
  const { addExperience, updateExperience, getAccentClasses } = usePortfolio();
  const accent = getAccentClasses();

  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [period, setPeriod] = useState('');
  const [current, setCurrent] = useState(false);
  const [achievementsString, setAchievementsString] = useState('');
  const [techString, setTechString] = useState('');
  const [offerLetterUrl, setOfferLetterUrl] = useState('');
  const [completionCertificateUrl, setCompletionCertificateUrl] = useState('');

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
    } else {
      setRole('');
      setCompany('');
      setLocation('Virtual / Coimbatore');
      setPeriod('2026');
      setCurrent(false);
      setAchievementsString('Successfully completed internship deliverables\nDemonstrated technical proficiency in cyber security');
      setTechString('Cyber Security, Ethical Hacking, Linux');
      setOfferLetterUrl('/images/internship-certificates/intern offer letter.PNG');
      setCompletionCertificateUrl('/images/internship-certificates/intern certificate.PNG');
    }
  }, [expToEdit, isOpen]);

  if (!isOpen) return null;

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
      tech: parsedTech.length > 0 ? parsedTech : ['TypeScript', 'React'],
      offerLetterUrl: offerLetterUrl.trim() || undefined,
      completionCertificateUrl: completionCertificateUrl.trim() || undefined,
      internshipProjects: expToEdit?.internshipProjects,
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
        className="relative w-full max-w-2xl rounded-2xl bg-[#050505] border border-[#2A2A2A] shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]"
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

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-sm text-[#BDBDBD]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#BDBDBD]">Job Title / Role *</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Senior Full Stack Engineer"
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
                placeholder="Acme Labs"
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
                placeholder="2022 - Present"
                className="w-full rounded-lg border border-[#2A2A2A] bg-[#000000] px-3.5 py-2 text-sm text-white focus:border-[#F0444B] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#BDBDBD]">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="San Francisco, CA (or Remote)"
                className="w-full rounded-lg border border-[#2A2A2A] bg-[#000000] px-3.5 py-2 text-sm text-white focus:border-[#F0444B] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-1">
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
            <label className="text-xs font-medium text-[#BDBDBD]">Key Achievements (One per line)</label>
            <textarea
              rows={4}
              value={achievementsString}
              onChange={(e) => setAchievementsString(e.target.value)}
              placeholder="Architected edge caching layer&#10;Decreased build times by 50%"
              className="w-full rounded-lg border border-[#2A2A2A] bg-[#000000] px-3.5 py-2 text-sm text-white focus:border-[#F0444B] focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#BDBDBD]">Technologies Used (comma-separated)</label>
            <input
              type="text"
              value={techString}
              onChange={(e) => setTechString(e.target.value)}
              placeholder="React, TypeScript, GraphQL, Node.js, Kubernetes"
              className="w-full rounded-lg border border-[#2A2A2A] bg-[#000000] px-3.5 py-2 text-sm text-white focus:border-[#F0444B] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#2A2A2A]">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#BDBDBD]">Intern Offer Letter Image Path / URL</label>
              <input
                type="text"
                value={offerLetterUrl}
                onChange={(e) => setOfferLetterUrl(e.target.value)}
                placeholder="/images/internship-certificates/intern offer letter.PNG"
                className="w-full rounded-lg border border-[#2A2A2A] bg-[#000000] px-3.5 py-2 text-sm text-white focus:border-[#F0444B] focus:outline-none text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#BDBDBD]">Completion Certificate Image Path / URL</label>
              <input
                type="text"
                value={completionCertificateUrl}
                onChange={(e) => setCompletionCertificateUrl(e.target.value)}
                placeholder="/images/internship-certificates/intern certificate.PNG"
                className="w-full rounded-lg border border-[#2A2A2A] bg-[#000000] px-3.5 py-2 text-sm text-white focus:border-[#F0444B] focus:outline-none text-xs font-mono"
              />
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

