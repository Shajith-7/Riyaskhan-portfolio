import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project } from '../../types/portfolio';
import { CaseStudyModal } from './CaseStudyModal';
import { ArrowRight, Trophy } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { data } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'cyber', label: 'Cyber Security' },
  ];

  const filteredProjects = data.projects.filter((p) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'ai') return p.category === 'ai';
    if (selectedCategory === 'fullstack') return p.category === 'fullstack';
    if (selectedCategory === 'cyber') return p.category === 'cyber';
    return true;
  });

  return (
    <section id="projects" className="py-[60px] md:py-[80px] bg-[#12343b] border-b-2 border-[#e1b382]/40 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#2d545e]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-[40px]">
          <h2 className="text-3xl sm:text-[36px] font-bold text-[#ffffff] mb-2 font-['Plus_Jakarta_Sans'] tracking-tight">
            Hackathon Projects & <span className="text-[#e1b382]">Case Studies</span>
          </h2>
          <p className="text-base font-regular text-[#f3e8d6]">
            Award-winning projects showcasing innovation, teamwork, and technical excellence
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[28px]">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="bg-[#2d545e] glow-card-running rounded-[20px] overflow-hidden hover:-translate-y-2 transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative h-[200px] w-full overflow-hidden bg-[#12343b]">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                
                {/* Award Badge */}
                {project.impactMetric && (
                  <div className="absolute bottom-3 left-3 px-3.5 py-1.5 bg-[#e1b382] text-[#12343b] text-[12px] font-extrabold rounded-full flex items-center gap-1.5 shadow-sand-glow border border-[#c89666]">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{project.impactMetric}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 space-y-4">
                <h3 className="text-[20px] font-bold text-[#ffffff] group-hover:text-[#e1b382] transition-colors font-['Plus_Jakarta_Sans']">
                  {project.title}
                </h3>

                <p className="text-sm font-regular text-[#f3e8d6] line-clamp-2 leading-relaxed">
                  {project.tagline}
                </p>

                {/* Tech Tags */}
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

                {/* Card CTA Link */}
                <div className="pt-4 mt-auto border-t border-[#c89666]/60">
                  <button
                    onClick={() => setActiveCaseStudy(project)}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#e1b382] hover:text-[#ffffff] group/btn transition-colors"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1.5" />
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
    </section>
  );
};
