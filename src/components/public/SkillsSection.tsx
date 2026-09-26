import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Code2,
  Network,
  Sparkles,
  UserCheck,
  Cpu,
  CheckCircle2,
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { data } = usePortfolio();

  if (!data.settings.showSkills || data.skills.length === 0) {
    return null;
  }

  return (
    <section id="skills" className="py-[60px] md:py-[80px] bg-[#12343b] border-b-2 border-[#e1b382]/40 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#e1b382]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-[40px]">
          <h2 className="text-3xl sm:text-[36px] font-bold text-[#ffffff] mb-2 font-['Plus_Jakarta_Sans'] tracking-tight">
            Skills & <span className="text-[#e1b382]">Technical Proficiencies</span>
          </h2>
          <p className="text-base font-regular text-[#f3e8d6]">
            Technical foundations, networking tools, and active learning specializations
          </p>
        </div>

        {/* 2x2 Grid Layout for Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          
          {/* Technical Categories */}
          {data.skills.map((category) => (
            <div
              key={category.id}
              className="bg-[#2d545e] glow-card-running rounded-[24px] p-6 sm:p-7 hover:-translate-y-1 transition-all duration-300 space-y-5 group"
            >
              <div className="flex items-center gap-3 border-b border-[#c89666]/60 pb-4">
                <div className="p-2.5 rounded-xl bg-[#12343b] border border-[#c89666] text-[#e1b382] group-hover:bg-[#e1b382] group-hover:text-[#12343b] transition-colors duration-300 shadow-sand-glow">
                  {category.id.includes('network') ? (
                    <Network className="w-5 h-5" />
                  ) : (
                    <Code2 className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="text-[18px] font-extrabold text-[#ffffff] font-['Plus_Jakarta_Sans']">
                    {category.name}
                  </h3>
                  <span className="text-xs font-semibold text-[#e1b382]">
                    {category.skills.length} Competencies
                  </span>
                </div>
              </div>

              {/* Skill Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-[#12343b] border border-[#c89666]/80 text-sm font-semibold text-[#f3e8d6] hover:border-[#e1b382] hover:text-[#e1b382] hover:scale-[1.02] transition-all duration-200 shadow-sm cursor-default"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#e1b382] shrink-0" />
                    <span className="truncate">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Currently Learning Card */}
          <div className="bg-[#2d545e] glow-card-running rounded-[24px] p-6 sm:p-7 hover:-translate-y-1 transition-all duration-300 space-y-5 group">
            <div className="flex items-center gap-3 border-b border-[#c89666]/60 pb-4">
              <div className="p-2.5 rounded-xl bg-[#12343b] border border-[#c89666] text-[#e1b382] group-hover:bg-[#e1b382] group-hover:text-[#12343b] transition-colors duration-300 shadow-sand-glow">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[18px] font-extrabold text-[#ffffff] font-['Plus_Jakarta_Sans']">
                  Currently Learning & Upskilling
                </h3>
                <span className="text-xs font-semibold text-[#e1b382]">
                  Active Focus Areas
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {data.currentlyLearning.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 bg-[#12343b] border-2 border-[#e1b382] text-[#e1b382] px-4 py-2 rounded-full text-xs font-bold hover:bg-[#e1b382] hover:text-[#12343b] hover:scale-105 transition-all duration-300 shadow-sand-glow cursor-default"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Soft Skills Card */}
          <div className="bg-[#2d545e] glow-card-running rounded-[24px] p-6 sm:p-7 hover:-translate-y-1 transition-all duration-300 space-y-5 group">
            <div className="flex items-center gap-3 border-b border-[#c89666]/60 pb-4">
              <div className="p-2.5 rounded-xl bg-[#12343b] border border-[#c89666] text-[#e1b382] group-hover:bg-[#e1b382] group-hover:text-[#12343b] transition-colors duration-300 shadow-sand-glow">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[18px] font-extrabold text-[#ffffff] font-['Plus_Jakarta_Sans']">
                  Soft Skills & Strengths
                </h3>
                <span className="text-xs font-semibold text-[#e1b382]">
                  Workplace & Team Values
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {data.softSkills.map((s) => (
                <span
                  key={s}
                  className="px-3.5 py-2 bg-[#12343b] border border-[#c89666]/80 rounded-xl text-xs font-semibold text-[#f3e8d6] hover:border-[#e1b382] hover:text-[#e1b382] hover:scale-105 transition-all shadow-sm cursor-default"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
