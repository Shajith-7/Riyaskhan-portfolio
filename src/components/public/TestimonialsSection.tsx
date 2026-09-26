import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { data } = usePortfolio();

  if (!data.settings.showTestimonials || data.testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-20 border-b border-neutral-900 bg-neutral-950/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            04. Client &amp; Peer Endorsements
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            What Leaders Say
          </h2>
          <p className="text-sm text-neutral-400 mt-2 max-w-xl">
            Feedback from founders, engineering executives, and product leaders I've partnered with.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 sm:p-8 space-y-6 relative"
            >
              <Quote className="w-8 h-8 text-neutral-700/60 absolute top-6 right-6" />

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed italic relative z-10">
                "{t.feedback}"
              </p>

              <div className="flex items-center gap-3.5 pt-4 border-t border-neutral-800/80">
                <img
                  src={t.avatarUrl}
                  alt={t.clientName}
                  className="w-11 h-11 rounded-full object-cover border border-neutral-700"
                />
                <div>
                  <h4 className="text-sm font-semibold text-white">{t.clientName}</h4>
                  <div className="text-xs text-neutral-400 font-mono">
                    <span>{t.role}</span>
                    <span aria-hidden="true" className="mx-1">·</span>
                    <span>{t.company}</span>
                  </div>
                  {t.projectRef && (
                    <div className="text-[11px] text-neutral-400 mt-0.5">
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
