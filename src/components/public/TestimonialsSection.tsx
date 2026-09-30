import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { data } = usePortfolio();

  if (!data.settings.showTestimonials || data.testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-20 border-b border-[#2A2A2A] bg-[#000000] relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#27D6D9]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-block animate-float-subtle group cursor-default transition-all duration-300">
            <div className="px-6 py-2.5 rounded-2xl bg-[#050505] border border-[#2A2A2A] shadow-xl group-hover:border-[#F0444B] group-hover:shadow-[0_0_20px_rgba(240,68,75,0.2)] group-hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-sm">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#FFFFFF] font-['Plus_Jakarta_Sans'] tracking-tight">
                What <span className="text-[#F0444B]">Leaders Say</span>
              </h2>
            </div>
          </div>
          <p className="text-sm text-[#BDBDBD] max-w-xl mx-auto">
            Feedback from founders, engineering executives, and product leaders I've partnered with.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col justify-between rounded-2xl border border-[#2A2A2A] bg-[#050505] p-6 sm:p-8 space-y-6 relative hover:border-[#F0444B] transition-all duration-300 shadow-xl hover:-translate-y-1"
            >
              <Quote className="w-8 h-8 text-[#F0444B]/20 absolute top-6 right-6" />

              <p className="text-sm sm:text-base text-[#BDBDBD] leading-relaxed italic relative z-10">
                "{t.feedback}"
              </p>

              <div className="flex items-center gap-3.5 pt-4 border-t border-[#2A2A2A]">
                <img
                  src={t.avatarUrl}
                  alt={t.clientName}
                  className="w-11 h-11 rounded-full object-cover border border-[#2A2A2A]"
                />
                <div>
                  <h4 className="text-sm font-semibold text-white">{t.clientName}</h4>
                  <div className="text-xs text-[#27D6D9] font-mono">
                    <span>{t.role}</span>
                    <span aria-hidden="true" className="mx-1">·</span>
                    <span>{t.company}</span>
                  </div>
                  {t.projectRef && (
                    <div className="text-[11px] text-[#777777] mt-0.5">
                      Project: {t.projectRef}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

};
