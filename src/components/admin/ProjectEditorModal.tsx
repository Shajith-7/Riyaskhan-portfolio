import React, { useState, useEffect } from 'react';
import { Project } from '../../types/portfolio';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, Image, Save, Sparkles } from 'lucide-react';
import { ImageUploader } from './ImageUploader';

interface ProjectEditorModalProps {
  isOpen: boolean;
  projectToEdit: Project | null;
  onClose: () => void;
}

const PRESET_COVERS = [
  { label: 'Cloud Telemetry / Dashboard', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Abstract 3D / Creative Canvas', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80' },
  { label: 'FinTech / Trading System', url: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80' },
  { label: 'AI / Network Topology', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Mobile & Minimal UI', url: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=1200&q=80' },
];

export const ProjectEditorModal: React.FC<ProjectEditorModalProps> = ({
  isOpen,
  projectToEdit,
  onClose,
}) => {
  const { addProject, updateProject, getAccentClasses } = usePortfolio();
  const accent = getAccentClasses();

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<Project['category']>('fullstack');
  const [featured, setFeatured] = useState(false);
  const [coverImage, setCoverImage] = useState(PRESET_COVERS[0].url);
  const [tagsString, setTagsString] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [impactMetric, setImpactMetric] = useState('');
  const [year, setYear] = useState('2025');
  const [certificateUrl, setCertificateUrl] = useState('');
  
  // Case study
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [architecture, setArchitecture] = useState('');
  const [resultsString, setResultsString] = useState('');

  useEffect(() => {
    if (projectToEdit) {
      setTitle(projectToEdit.title);
      setTagline(projectToEdit.tagline);
      setCategory(projectToEdit.category);
      setFeatured(projectToEdit.featured);
      setCoverImage(projectToEdit.coverImage);
      setTagsString(projectToEdit.tags.join(', '));
      setLiveUrl(projectToEdit.liveUrl || '');
      setGithubUrl(projectToEdit.githubUrl || '');
      setImpactMetric(projectToEdit.impactMetric || '');
      setYear(projectToEdit.year);
      setCertificateUrl(projectToEdit.certificateUrl || '');
      setProblem(projectToEdit.caseStudy.problem);
      setSolution(projectToEdit.caseStudy.solution);
      setArchitecture(projectToEdit.caseStudy.architecture);
      setResultsString(projectToEdit.caseStudy.results.join('\n'));
    } else {
      // Defaults for new project
      setTitle('');
      setTagline('');
      setCategory('fullstack');
      setFeatured(false);
      setCoverImage(PRESET_COVERS[0].url);
      setTagsString('TypeScript, React, Node.js');
      setLiveUrl('https://example.com');
      setGithubUrl('https://github.com');
      setImpactMetric('99.9% Uptime · 50k Users');
      setYear(new Date().getFullYear().toString());
      setProblem('Describe the critical business or technical friction the previous system suffered from.');
      setSolution('Detail how you architected and implemented the solution.');
      setArchitecture('Client (React) -> Edge Gateway (Express/Go) -> Database (PostgreSQL) -> Cache (Redis)');
      setResultsString('Reduced query latency by 45%\nScaled to 50k concurrent users\nCut hosting infrastructure overhead');
    }
  }, [projectToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !tagline.trim()) return;

    const parsedTags = tagsString
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const parsedResults = resultsString
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const projectPayload = {
      title: title.trim(),
      tagline: tagline.trim(),
      category,
      featured,
      coverImage: coverImage.trim(),
      tags: parsedTags.length > 0 ? parsedTags : ['TypeScript', 'React'],
      liveUrl: liveUrl.trim() || undefined,
      githubUrl: githubUrl.trim() || undefined,
      impactMetric: impactMetric.trim() || undefined,
      year: year.trim() || '2025',
      certificateUrl: certificateUrl.trim() || undefined,
      caseStudy: {
        problem: problem.trim(),
        solution: solution.trim(),
        architecture: architecture.trim(),
        results: parsedResults.length > 0 ? parsedResults : ['Successful delivery and rollout'],
      },
    };

    if (projectToEdit) {
      updateProject(projectToEdit.id, projectPayload);
    } else {
      addProject(projectPayload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl rounded-2xl bg-[#050505] border border-[#2A2A2A] shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-[#2A2A2A] flex items-center justify-between bg-[#000000]">
          <div className="space-y-0.5">
            <span className="text-xs font-mono text-[#27D6D9] uppercase tracking-wider font-bold">
              {projectToEdit ? 'Edit Case Study' : 'Create New Project'}
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              {projectToEdit ? projectToEdit.title : 'Project & Case Study Editor'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#BDBDBD] hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-sm text-[#BDBDBD]">
          {/* Main Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#F0444B] border-b border-[#2A2A2A] pb-1 font-bold">
              Primary Metadata
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#BDBDBD]">Project Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Aura Cloud Telemetry"
                  className="w-full rounded-lg border border-[#2A2A2A] bg-[#000000] px-3.5 py-2 text-sm text-white focus:border-[#F0444B] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#BDBDBD]">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full rounded-lg border border-[#2A2A2A] bg-[#000000] px-3 py-2 text-sm text-white focus:border-[#F0444B] focus:outline-none"
                >
                  <option value="cloud">Cloud &amp; Systems</option>
                  <option value="frontend">Frontend &amp; UI</option>
                  <option value="fullstack">Full-Stack</option>
                  <option value="ai">AI &amp; Data</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#BDBDBD]">Short Tagline (1-2 sentences) *</label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="High-throughput distributed event streaming platform..."
                className="w-full rounded-lg border border-[#2A2A2A] bg-[#000000] px-3.5 py-2 text-sm text-white focus:border-[#F0444B] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#BDBDBD]">Impact Metric</label>
                <input
                  type="text"
                  value={impactMetric}
                  onChange={(e) => setImpactMetric(e.target.value)}
                  placeholder="4.2M events/sec · 99.9% SLA"
                  className="w-full rounded-lg border border-[#2A2A2A] bg-[#000000] px-3.5 py-2 text-sm text-white focus:border-[#F0444B] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#BDBDBD]">Year</label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="2025"
                  className="w-full rounded-lg border border-[#2A2A2A] bg-[#000000] px-3.5 py-2 text-sm text-white focus:border-[#F0444B] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5 flex flex-col justify-end">
                <label className="flex items-center gap-2 cursor-pointer py-2">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded border-[#2A2A2A] bg-[#000000] text-[#F0444B] h-4 w-4"
                  />
                  <span className="text-xs text-[#BDBDBD] font-medium">Feature on Homepage</span>
                </label>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#BDBDBD]">Tech Stack Tags (comma-separated)</label>
              <input
                type="text"
                value={tagsString}
                onChange={(e) => setTagsString(e.target.value)}
                placeholder="TypeScript, React, Node.js, ClickHouse, Docker"
                className="w-full rounded-lg border border-[#2A2A2A] bg-[#000000] px-3.5 py-2 text-sm text-white focus:border-[#F0444B] focus:outline-none"
              />
            </div>

            {/* Cover Image Selector */}
            <ImageUploader
              value={coverImage}
              onChange={setCoverImage}
              label="Project Cover Image"
              placeholder="e.g. /images/selavu-sherlock.png or upload image file"
              presetImages={PRESET_COVERS}
            />

            {/* Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#BDBDBD]">Live Demo URL</label>
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://myproject.com"
                  className="w-full rounded-lg border border-[#2A2A2A] bg-[#000000] px-3.5 py-2 text-sm text-white focus:border-[#F0444B] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#BDBDBD]">GitHub Repository URL</label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full rounded-lg border border-[#2A2A2A] bg-[#000000] px-3.5 py-2 text-sm text-white focus:border-[#F0444B] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Deep Case Study Fields */}
          <div className="space-y-4 pt-4 border-t border-[#2A2A2A]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#F0444B] border-b border-[#2A2A2A] pb-1 font-bold">
              Deep Case Study Details (Shown in Reader Modal)
            </h4>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#BDBDBD]">The Problem Statement</label>
              <textarea
                rows={2}
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="What challenge or friction did the previous architecture face?"
                className="w-full rounded-lg border border-[#2A2A2A] bg-[#000000] px-3.5 py-2 text-sm text-white focus:border-[#F0444B] focus:outline-none resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#BDBDBD]">The Architectural Solution</label>
              <textarea
                rows={2}
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                placeholder="How did you solve it technically?"
                className="w-full rounded-lg border border-[#2A2A2A] bg-[#000000] px-3.5 py-2 text-sm text-white focus:border-[#F0444B] focus:outline-none resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#BDBDBD]">System Flow / Topology Notes</label>
              <textarea
                rows={2}
                value={architecture}
                onChange={(e) => setArchitecture(e.target.value)}
                placeholder="Microservices, data pipeline flow, caching layers..."
                className="w-full rounded-lg border border-[#2A2A2A] bg-[#000000] px-3.5 py-2 text-sm text-white focus:border-[#F0444B] focus:outline-none resize-none font-mono text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#BDBDBD]">Results &amp; Impact (One bullet per line)</label>
              <textarea
                rows={3}
                value={resultsString}
                onChange={(e) => setResultsString(e.target.value)}
                placeholder="Decreased median incident response time from 22m to under 4m&#10;Reduced cloud infrastructure spend by 48%"
                className="w-full rounded-lg border border-[#2A2A2A] bg-[#000000] px-3.5 py-2 text-sm text-white focus:border-[#F0444B] focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Form Actions */}
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
              <span>{projectToEdit ? 'Save Changes' : 'Create Project'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

