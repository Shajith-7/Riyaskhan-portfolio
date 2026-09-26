import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Award, BookOpen } from 'lucide-react';

export const WorkshopsAndCertsSection: React.FC = () => {
  const { data } = usePortfolio();

  if (
    (!data.settings.showWorkshops && !data.settings.showCertifications) ||
    (data.workshops.length === 0 && data.certifications.length === 0)
  ) {
    return null;
  }

  return (
    <section id="workshops-certs" className="py-[60px] md:py-[80px] bg-[#12343b] border-b-2 border-[#e1b382]/40 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-[#e1b382]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-[40px]">
          <h2 className="text-3xl sm:text-[36px] font-bold text-[#ffffff] mb-2 font-['Plus_Jakarta_Sans'] tracking-tight">
            Certifications & <span className="text-[#e1b382]">Training</span>
          </h2>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {data.certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-[#2d545e] glow-card-running rounded-[20px] p-6 hover:scale-[1.04] transition-all duration-300 flex flex-col items-center text-center space-y-3 group"
            >
              {/* Certificate Icon */}
              <div className="w-[54px] h-[54px] rounded-full bg-[#12343b] border border-[#c89666] flex items-center justify-center text-[#e1b382] group-hover:bg-[#e1b382] group-hover:text-[#12343b] transition-colors duration-300 shadow-sand-glow">
                <Award className="w-6 h-6" />
              </div>

              {/* Issuer */}
              <div className="text-xs font-bold text-[#e1b382]">
                {cert.issuer}
              </div>

              {/* Title */}
              <h3 className="text-[16px] font-extrabold text-[#ffffff] font-['Plus_Jakarta_Sans'] leading-snug group-hover:text-[#e1b382] transition-colors">
                {cert.title}
              </h3>

              {/* Description */}
              {cert.details && (
                <p className="text-[12px] font-medium text-[#f3e8d6] leading-relaxed">
                  {cert.details}
                </p>
              )}

              {/* Date */}
              <div className="text-[12px] font-medium text-[#e1b382] pt-3 border-t border-[#c89666]/60 w-full mt-auto font-mono">
                {cert.date}
              </div>
            </div>
          ))}
        </div>

        {/* Workshops Subgrid */}
        {data.workshops.length > 0 && (
          <div className="pt-8 border-t border-[#c89666]/60">
            <h3 className="text-[18px] font-bold text-[#ffffff] mb-6 font-['Plus_Jakarta_Sans'] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#e1b382]" />
              <span>Attended Workshops & Training Sessions</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.workshops.map((ws) => (
                <div
                  key={ws.id}
                  className="bg-[#2d545e] glow-card-running p-5 rounded-[16px] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-xs font-bold text-[#e1b382] mb-1 font-mono">
                    {ws.dateOrDuration}
                  </div>
                  <h4 className="text-sm font-bold text-[#ffffff] font-['Plus_Jakarta_Sans'] leading-snug">
                    {ws.title}
                  </h4>
                  <p className="text-xs font-medium text-[#f3e8d6] mt-2">
                    {ws.organizer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
