import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project } from '../../types/portfolio';
import { CaseStudyModal } from './CaseStudyModal';
import { ArrowRight, Trophy, Award, Maximize2, X, ExternalLink, Sparkles } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { data } = usePortfolio();
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);
  const [activeCertificate, setActiveCertificate] = useState<{ url: string; title: string; award?: string } | null>(null);

  return (
    <section id="projects" className="py-[60px] md:py-[80px] bg-[#000000] border-b border-[#2A2A2A] relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#27D6D9]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#F0444B]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-block animate-float-subtle group cursor-default transition-all duration-300">
            <div className="px-6 py-2.5 rounded-2xl bg-[#050505] border border-[#2A2A2A] shadow-xl group-hover:border-[#F0444B] group-hover:shadow-[0_0_20px_rgba(240,68,75,0.3)] group-hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-sm">
              <h2 className="text-3xl sm:text-[36px] font-bold text-[#FFFFFF] font-['Plus_Jakarta_Sans'] tracking-tight">
                Hackathons & <span className="text-[#F0444B]">Projects</span>
              </h2>
            </div>
          </div>
          <p className="text-base font-regular text-[#BDBDBD]">
            Competitive hackathon awards, project showcases, and technical case studies
          </p>
        </div>

        {/* Compact & Interactive Project Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {data.projects.map((project) => (
            <article
              key={project.id}
              className="bg-[#050505] rounded-[20px] overflow-hidden border border-[#2A2A2A] hover:border-[#F0444B] transition-all duration-300 flex flex-col justify-between group shadow-lg hover:-translate-y-1.5"
            >
              <div>
                {/* Interactive Cover Image Container - Click to open project details/description modal */}
                <div 
                  onClick={() => setActiveCaseStudy(project)}
                  className="relative h-44 w-full overflow-hidden bg-black/40 cursor-pointer border-b border-[#2A2A2A]"
                >
                  <img
                    src={encodeURI(project.coverImage)}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Award Badge Top Left */}
                  {project.impactMetric && (
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-[#F0444B] text-[#FFFFFF] text-[10px] font-extrabold rounded-full flex items-center gap-1 shadow-md border border-[#F0444B]">
                      <Trophy className="w-3 h-3 text-[#FFFFFF]" />
                      <span className="line-clamp-1">{project.impactMetric}</span>
                    </div>
                  )}

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 transition-opacity duration-300 p-3">
                    <span className="px-3 py-1.5 rounded-lg bg-[#F0444B] hover:bg-[#FF6B6B] text-white font-bold text-xs shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>View Project</span>
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-4 space-y-2.5">
                  
                  {/* Hackathon Name Subtitle */}
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#27D6D9] font-bold uppercase tracking-wider line-clamp-1">
                      {project.award && project.award.includes('—')
                        ? project.award.split('—')[1].trim()
                        : project.impactMetric?.replace('🏆', '').trim() || 'Hackathon Project'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => setActiveCaseStudy(project)}
                    className="text-base font-bold text-[#FFFFFF] group-hover:text-[#F0444B] transition-colors font-['Plus_Jakarta_Sans'] leading-snug line-clamp-2 cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  {/* Description / Tagline */}
                  <p className="text-[11px] text-[#BDBDBD] line-clamp-3 leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#000000] text-[#27D6D9] px-2 py-0.5 rounded text-[10px] font-mono border border-[#2A2A2A]"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] font-mono text-[#777777]">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                </div>
              </div>

              {/* Card Footer CTAs */}
              <div className="p-4 pt-0 space-y-2">
                <div className="pt-3 border-t border-[#2A2A2A] grid grid-cols-2 gap-2">
                  
                  {/* View Project Button (Direct to GitHub) */}
                  <a
                    href={project.githubUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-1.5 bg-[#000000] hover:bg-[#1B1B1B] text-[#BDBDBD] hover:text-[#F0444B] text-[11px] font-bold rounded-lg border border-[#2A2A2A] transition-colors flex items-center justify-center gap-1"
                  >
                    <span>View Project</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {/* View Certificate Button */}
                  <button
                    onClick={() => setActiveCertificate({
                      url: project.certificateUrl || project.coverImage,
                      title: project.title,
                      award: project.award || project.impactMetric,
                    })}
                    className="w-full py-1.5 bg-[#F0444B] hover:bg-[#FF6B6B] text-white text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm"
                  >
                    <Award className="w-3 h-3" />
                    <span>View Certificate</span>
                  </button>

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
            className="relative max-w-4xl w-full bg-[#050505] border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-5 py-4 bg-[#000000] border-b border-[#2A2A2A] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#27D6D9] font-bold">
                  Official Hackathon Certificate
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {activeCertificate.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveCertificate(null)}
                className="p-2 text-[#BDBDBD] hover:text-white hover:bg-[#1B1B1B] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Box */}
            <div className="p-4 overflow-auto flex items-center justify-center bg-black/60 flex-1 min-h-[300px]">
              <img 
                src={encodeURI(activeCertificate.url)} 
                alt={activeCertificate.title}
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-lg border border-[#2A2A2A]"
              />
            </div>

            {/* Footer */}
            <div className="px-5 py-3 bg-[#000000] border-t border-[#2A2A2A] flex items-center justify-between text-xs text-[#BDBDBD]">
              <span>Click anywhere outside or press X to close</span>
              <a 
                href={activeCertificate.url} 
                target="_blank" 
                rel="noreferrer"
                className="px-3 py-1.5 bg-[#F0444B] hover:bg-[#FF6B6B] text-white font-bold rounded-md transition-colors"
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



