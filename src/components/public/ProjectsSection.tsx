import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project } from '../../types/portfolio';
import { CaseStudyModal } from './CaseStudyModal';
import { ArrowRight, Trophy, Award, Maximize2, X } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { data } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);
  const [activeCertificate, setActiveCertificate] = useState<{ url: string; title: string; award?: string } | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'hackathon', label: '🏆 Hackathons (4)' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'fullstack', label: 'Full-Stack' },
  ];

  const filteredProjects = data.projects.filter((p) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'hackathon') return p.category === 'hackathon' || !!p.award || !!p.certificateUrl;
    if (selectedCategory === 'ai') return p.category === 'ai';
    if (selectedCategory === 'fullstack') return p.category === 'fullstack';
    return true;
  });

  return (
    <section id="projects" className="py-[60px] md:py-[80px] bg-[#12343b] border-b-2 border-[#e1b382]/40 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#2d545e]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#e1b382]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-[40px]">
          <h2 className="text-3xl sm:text-[36px] font-bold text-[#ffffff] mb-2 font-['Plus_Jakarta_Sans'] tracking-tight">
            Hackathons & <span className="text-[#e1b382]">Projects</span>
          </h2>
          <p className="text-base font-regular text-[#f3e8d6]">
            4 Hackathons completed with verified certificates, competitive awards, and technical case studies
          </p>
        </div>

        {/* Filtering Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 text-xs font-bold rounded-full border-2 transition-all duration-300 ${
                  active
                    ? 'bg-[#e1b382] text-[#12343b] border-[#c89666] shadow-sand-glow scale-105'
                    : 'bg-[#2d545e] text-[#f3e8d6] border-[#c89666]/60 hover:border-[#e1b382] hover:text-[#e1b382]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Project Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[28px] max-w-6xl mx-auto">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="bg-[#2d545e] glow-card-running rounded-[24px] overflow-hidden hover:-translate-y-2 transition-all duration-300 flex flex-col group border border-[#c89666]/30 hover:border-[#e1b382]"
            >
              {/* Cover Image Container */}
              <div className="relative h-[220px] w-full overflow-hidden bg-[#12343b]">
                <img
                  src={encodeURI(project.coverImage)}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                
                {/* Award Badge */}
                {project.impactMetric && (
                  <div className="absolute top-3 left-3 px-3.5 py-1.5 bg-[#e1b382] text-[#12343b] text-[12px] font-extrabold rounded-full flex items-center gap-1.5 shadow-sand-glow border border-[#c89666]">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{project.impactMetric}</span>
                  </div>
                )}

                {/* Certificate Quick Preview Badge */}
                {project.certificateUrl && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCertificate({
                        url: project.certificateUrl!,
                        title: project.title,
                        award: project.award || project.impactMetric,
                      });
                    }}
                    className="absolute bottom-3 right-3 px-3 py-1.5 bg-[#12343b]/90 hover:bg-[#e1b382] text-[#e1b382] hover:text-[#12343b] text-[11px] font-bold rounded-lg flex items-center gap-1.5 border border-[#e1b382]/40 transition-all backdrop-blur-xs shadow-md"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Certificate</span>
                    <Maximize2 className="w-3 h-3 ml-0.5" />
                  </button>
                )}
              </div>

              {/* Content */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 space-y-4">
                
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#ffffff] group-hover:text-[#e1b382] transition-colors font-['Plus_Jakarta_Sans'] mb-1">
                    {project.title}
                  </h3>
                  {project.award && (
                    <div className="text-xs font-semibold text-[#e1b382]/90 font-mono">
                      {project.award}
                    </div>
                  )}
                </div>

                <p className="text-sm font-regular text-[#f3e8d6] line-clamp-3 leading-relaxed">
                  {project.tagline}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[12px]">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#12343b] text-[#e1b382] px-2.5 py-1 rounded-md border border-[#c89666]/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card CTA Buttons */}
                <div className="pt-4 mt-auto border-t border-[#c89666]/60 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveCaseStudy(project)}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#e1b382] hover:text-[#ffffff] group/btn transition-colors"
                  >
                    <span>View Full Case Study</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1.5" />
                  </button>

                  {project.certificateUrl && (
                    <button
                      onClick={() => setActiveCertificate({
                        url: project.certificateUrl!,
                        title: project.title,
                        award: project.award || project.impactMetric,
                      })}
                      className="px-3 py-1.5 text-xs font-bold text-[#12343b] bg-[#e1b382] hover:bg-white rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>View Certificate</span>
                    </button>
                  )}
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Case Study Modal Overlay */}
      <CaseStudyModal
        project={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
      />

      {/* Standalone Certificate Lightbox Modal */}
      {activeCertificate && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveCertificate(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#12343b] border-2 border-[#e1b382] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-5 py-4 bg-[#2d545e] border-b border-[#e1b382]/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#e1b382] font-bold">
                  Official Hackathon Certificate
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {activeCertificate.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveCertificate(null)}
                className="p-2 text-[#f3e8d6] hover:text-white hover:bg-[#12343b] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Box */}
            <div className="p-4 overflow-auto flex items-center justify-center bg-black/60 flex-1 min-h-[300px]">
              <img 
                src={encodeURI(activeCertificate.url)} 
                alt={activeCertificate.title}
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-lg border border-[#e1b382]/20"
              />
            </div>

            {/* Footer */}
            <div className="px-5 py-3 bg-[#2d545e] border-t border-[#e1b382]/30 flex items-center justify-between text-xs text-[#f3e8d6]">
              <span>Click anywhere outside or press X to close</span>
              <a 
                href={activeCertificate.url} 
                target="_blank" 
                rel="noreferrer"
                className="px-3 py-1.5 bg-[#e1b382] text-[#12343b] font-bold rounded-md hover:bg-white transition-colors"
              >
                Open Original Image
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
