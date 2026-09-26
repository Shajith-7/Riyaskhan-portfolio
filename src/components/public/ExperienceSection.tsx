import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const ExperienceSection: React.FC = () => {
  const { data } = usePortfolio();

  if (!data.settings.showExperience || data.experience.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="py-[60px] md:py-[80px] bg-[#12343b] border-b-2 border-[#e1b382]/40 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#e1b382]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-[40px]">
          <h2 className="text-3xl sm:text-[36px] font-bold text-[#ffffff] mb-2 font-['Plus_Jakarta_Sans'] tracking-tight">
            Internship <span className="text-[#e1b382]">Experience</span>
          </h2>
          <p className="text-base font-regular text-[#f3e8d6]">
            Practical technical exposure and hands-on skill development
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto pl-6 sm:pl-10 border-l-2 border-[#e1b382] space-y-10">
          {data.experience.map((exp) => (
            <div key={exp.id} className="relative group">
              
              {/* Connector Node with Glow animation */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-[#12343b] border-4 border-[#e1b382] shadow-sand-glow animate-glow-pulse" />

              {/* Date Header */}
              <div className="text-sm font-extrabold text-[#e1b382] mb-2">
                {exp.period}
              </div>

              {/* Content Card */}
              <div className="bg-[#2d545e] glow-card-running p-6 rounded-[18px] hover:-translate-y-1 transition-all duration-300">
                
                <h3 className="text-[18px] font-extrabold text-[#ffffff] font-['Plus_Jakarta_Sans'] mb-1">
                  {exp.role}
                </h3>

                <div className="text-sm font-bold text-[#e1b382] mb-1">
                  {exp.company}
                </div>

                <div className="text-xs font-medium text-[#f3e8d6] mb-4">
                  {exp.period} · {exp.location}
                </div>

                {/* Achievements List */}
                <ul className="space-y-2 text-sm font-regular text-[#f3e8d6] leading-[1.8]">
                  {exp.achievements.map((ach, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#e1b382] mt-2 shrink-0 shadow-sand-glow" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Badges */}
                <div className="mt-4 pt-4 border-t border-[#c89666]/60 flex flex-wrap items-center gap-2 font-mono text-xs">
                  {exp.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-[#12343b] text-[#e1b382] rounded-md border border-[#c89666]">
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
