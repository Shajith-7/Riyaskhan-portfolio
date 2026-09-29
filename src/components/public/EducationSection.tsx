import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { GraduationCap, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { data } = usePortfolio();

  if (!data.settings.showEducation || data.education.length === 0) {
    return null;
  }

  return (
    <section id="education" className="py-[60px] md:py-[80px] bg-[#12343b] border-b-2 border-[#e1b382]/40 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#e1b382]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-[40px] space-y-3">
          <div className="inline-block animate-float-subtle group cursor-default transition-all duration-300">
            <div className="px-6 py-2.5 rounded-2xl bg-[#2d545e]/50 border border-[#c89666]/40 shadow-xl group-hover:border-[#e1b382] group-hover:shadow-sand-glow group-hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-sm">
              <h2 className="text-3xl sm:text-[36px] font-bold text-[#ffffff] font-['Plus_Jakarta_Sans'] tracking-tight">
                Education & <span className="text-[#e1b382] group-hover:drop-shadow-[0_0_12px_rgba(225,179,130,0.8)] transition-all">Academic Path</span>
              </h2>
            </div>
          </div>
          <p className="text-base font-regular text-[#f3e8d6]">
            Rigorous undergraduate IT studies combined with solid secondary analytical foundations
          </p>
        </div>

        {/* Education Timeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {data.education.map((edu) => (
            <div
              key={edu.id}
              className="bg-[#2d545e] glow-card-running rounded-[20px] p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Header Icon & Degree Title */}
                <div className="flex items-center gap-3 border-b border-[#c89666]/60 pb-4">
                  <div className="p-3 rounded-xl bg-[#12343b] border border-[#c89666] text-[#e1b382] group-hover:bg-[#e1b382] group-hover:text-[#12343b] transition-colors duration-300 shadow-sand-glow">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-extrabold text-[#ffffff] font-['Plus_Jakarta_Sans'] leading-tight">
                      {edu.degree}
                    </h3>
                    <div className="text-xs font-bold text-[#e1b382] mt-1">
                      {edu.institution}
                    </div>
                  </div>
                </div>

                {/* Period & Location */}
                <div className="space-y-1.5 text-xs text-[#f3e8d6] font-mono">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#e1b382]" />
                    <span className="font-semibold text-[#e1b382]">{edu.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#e1b382]" />
                    <span>{edu.location}</span>
                  </div>
                </div>

                {/* Highlights */}
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="pt-3 border-t border-[#c89666]/60 space-y-2 text-xs text-[#f3e8d6] leading-relaxed">
                    {edu.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#e1b382] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Bottom Center Aligned Mark & Score Badge */}
              <div className="pt-4 border-t border-[#c89666]/60 flex flex-col items-center justify-center text-center">
                {edu.score && (
                  <div className="w-full py-2 px-4 rounded-xl bg-[#12343b] border-2 border-[#e1b382] shadow-sand-glow flex items-center justify-center gap-2">
                    <Award className="w-4 h-4 text-[#e1b382]" />
                    <span className="text-xs font-extrabold text-[#e1b382] tracking-wide font-mono uppercase">
                      {edu.score}
                    </span>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

