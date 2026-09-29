import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Award, BookOpen, Eye, X, Maximize2, CheckCircle2, Sparkles } from 'lucide-react';

interface ActiveCertModal {
  url: string;
  title: string;
  issuerOrOrganizer: string;
  category: string;
}

export const WorkshopsAndCertsSection: React.FC = () => {
  const { data } = usePortfolio();
  const [activeCert, setActiveCert] = useState<ActiveCertModal | null>(null);
  const [activeTab, setActiveTab] = useState<'courses' | 'training'>('courses');

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
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#2d545e]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-block animate-float-subtle group cursor-default transition-all duration-300">
            <div className="px-6 py-2.5 rounded-2xl bg-[#2d545e]/50 border border-[#c89666]/40 shadow-xl group-hover:border-[#e1b382] group-hover:shadow-sand-glow group-hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-sm">
              <h2 className="text-3xl sm:text-[36px] font-bold text-[#ffffff] font-['Plus_Jakarta_Sans'] tracking-tight">
                Certifications & <span className="text-[#e1b382] group-hover:drop-shadow-[0_0_12px_rgba(225,179,130,0.8)] transition-all">Technical Training</span>
              </h2>
            </div>
          </div>
          <p className="text-base font-regular text-[#f3e8d6]">
            Verified professional course certifications, hands-on workshops, and technical training credentials
          </p>
        </div>

        {/* ========================================================================= */}
        {/* TOGGLE TAB CONTROLS */}
        {/* ========================================================================= */}
        <div className="flex justify-center">
          <div className="bg-[#2d545e]/90 p-1.5 rounded-2xl border border-[#c89666]/40 shadow-xl inline-flex max-w-full overflow-x-auto gap-1.5 backdrop-blur-sm">
            
            {/* Professional Courses Tab */}
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === 'courses'
                  ? 'bg-[#e1b382] text-[#12343b] shadow-lg shadow-[#e1b382]/20 scale-[1.02]'
                  : 'text-[#f3e8d6]/80 hover:text-white hover:bg-[#12343b]/40'
              }`}
            >
              <Award className={`w-4 h-4 ${activeTab === 'courses' ? 'text-[#12343b]' : 'text-[#e1b382]'}`} />
              <span>Professional Courses</span>
            </button>

            {/* Technical Training Tab */}
            <button
              onClick={() => setActiveTab('training')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === 'training'
                  ? 'bg-[#e1b382] text-[#12343b] shadow-lg shadow-[#e1b382]/20 scale-[1.02]'
                  : 'text-[#f3e8d6]/80 hover:text-white hover:bg-[#12343b]/40'
              }`}
            >
              <BookOpen className={`w-4 h-4 ${activeTab === 'training' ? 'text-[#12343b]' : 'text-[#e1b382]'}`} />
              <span>Technical Training</span>
            </button>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 1. PROFESSIONAL COURSES CONTENT */}
        {/* ========================================================================= */}
        {activeTab === 'courses' && data.certifications.length > 0 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#c89666]/40 pb-3">
              <h3 className="text-xl font-bold text-white font-['Plus_Jakarta_Sans'] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#e1b382]" />
                <span>Professional Course Certifications</span>
              </h3>
              <span className="text-xs font-mono text-[#e1b382] bg-[#2d545e] px-3 py-1 rounded-full border border-[#c89666]/40 hidden sm:inline-block">
                Simplilearn · Coursera · Cisco · Scaler · MY Bharat
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {data.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-[#2d545e] glow-card-running rounded-[20px] overflow-hidden border border-[#c89666]/30 hover:border-[#e1b382] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Thumbnail Image Box */}
                    {cert.certificateUrl ? (
                      <div 
                        onClick={() => setActiveCert({
                          url: cert.certificateUrl!,
                          title: cert.title,
                          issuerOrOrganizer: cert.issuer,
                          category: 'Course Certification'
                        })}
                        className="h-40 relative overflow-hidden bg-black/40 cursor-pointer border-b border-[#c89666]/30"
                      >
                        <img 
                          src={encodeURI(cert.certificateUrl)} 
                          alt={cert.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 transition-opacity">
                          <span className="px-3 py-1.5 rounded-lg bg-[#e1b382] text-[#12343b] font-bold text-xs shadow-lg flex items-center gap-1.5">
                            <Maximize2 className="w-3.5 h-3.5" />
                            View Certificate
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-20 bg-[#12343b] flex items-center justify-center text-[#e1b382]">
                        <Award className="w-8 h-8" />
                      </div>
                    )}

                    {/* Text Information */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#e1b382] uppercase tracking-wider font-mono">
                          {cert.issuer}
                        </span>
                        <span className="text-[10px] font-mono text-[#f3e8d6]/80 bg-[#12343b] px-2 py-0.5 rounded border border-[#c89666]/30">
                          {cert.date}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-[#ffffff] font-['Plus_Jakarta_Sans'] leading-snug group-hover:text-[#e1b382] transition-colors line-clamp-2">
                        {cert.title}
                      </h4>

                      {cert.details && (
                        <p className="text-[11px] text-[#f3e8d6]/90 line-clamp-3 leading-relaxed">
                          {cert.details}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Footer CTA */}
                  {cert.certificateUrl && (
                    <div className="p-4 pt-0">
                      <button
                        onClick={() => setActiveCert({
                          url: cert.certificateUrl!,
                          title: cert.title,
                          issuerOrOrganizer: cert.issuer,
                          category: 'Course Certification'
                        })}
                        className="w-full py-1.5 bg-[#12343b] hover:bg-[#e1b382] text-[#e1b382] hover:text-[#12343b] text-xs font-bold rounded-lg border border-[#c89666]/40 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Certificate Image</span>
                      </button>
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. TECHNICAL TRAINING CONTENT */}
        {/* ========================================================================= */}
        {activeTab === 'training' && data.workshops.length > 0 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#c89666]/40 pb-3">
              <h3 className="text-xl font-bold text-white font-['Plus_Jakarta_Sans'] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#e1b382]" />
                <span>Workshops & Technical Training</span>
              </h3>
              <span className="text-xs font-mono text-[#e1b382] bg-[#2d545e] px-3 py-1 rounded-full border border-[#c89666]/40 hidden sm:inline-block">
                IIT Madras · Rathinam Tech · AIC RAISE · IIT Top Engineers
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {data.workshops.map((ws) => (
                <div
                  key={ws.id}
                  className="bg-[#2d545e] glow-card-running rounded-[20px] overflow-hidden border border-[#c89666]/30 hover:border-[#e1b382] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Thumbnail Image Box */}
                    {ws.certificateUrl ? (
                      <div 
                        onClick={() => setActiveCert({
                          url: ws.certificateUrl!,
                          title: ws.title,
                          issuerOrOrganizer: ws.organizer,
                          category: 'Workshop & Training Certificate'
                        })}
                        className="h-40 relative overflow-hidden bg-black/40 cursor-pointer border-b border-[#c89666]/30"
                      >
                        <img 
                          src={encodeURI(ws.certificateUrl)} 
                          alt={ws.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 transition-opacity">
                          <span className="px-3 py-1.5 rounded-lg bg-[#e1b382] text-[#12343b] font-bold text-xs shadow-lg flex items-center gap-1.5">
                            <Maximize2 className="w-3.5 h-3.5" />
                            View Certificate
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-20 bg-[#12343b] flex items-center justify-center text-[#e1b382]">
                        <BookOpen className="w-8 h-8" />
                      </div>
                    )}

                    {/* Text Info */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#e1b382] bg-[#12343b] px-2 py-0.5 rounded border border-[#c89666]/30">
                          {ws.dateOrDuration}
                        </span>
                        <span className="text-[10px] font-mono uppercase text-[#e1b382]/80">
                          {ws.type}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-[#ffffff] font-['Plus_Jakarta_Sans'] leading-snug group-hover:text-[#e1b382] transition-colors line-clamp-2">
                        {ws.title}
                      </h4>

                      <p className="text-[11px] text-[#f3e8d6]/90 line-clamp-2 leading-relaxed">
                        {ws.organizer}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer CTA */}
                  {ws.certificateUrl && (
                    <div className="p-4 pt-0">
                      <button
                        onClick={() => setActiveCert({
                          url: ws.certificateUrl!,
                          title: ws.title,
                          issuerOrOrganizer: ws.organizer,
                          category: 'Workshop & Training Certificate'
                        })}
                        className="w-full py-1.5 bg-[#12343b] hover:bg-[#e1b382] text-[#e1b382] hover:text-[#12343b] text-xs font-bold rounded-lg border border-[#c89666]/40 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Training Certificate</span>
                      </button>
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* FULLSCREEN CERTIFICATE LIGHTBOX MODAL */}
      {activeCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveCert(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#12343b] border-2 border-[#e1b382] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-5 py-4 bg-[#2d545e] border-b border-[#e1b382]/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#e1b382] font-bold">
                  {activeCert.category} · {activeCert.issuerOrOrganizer}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {activeCert.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveCert(null)}
                className="p-2 text-[#f3e8d6] hover:text-white hover:bg-[#12343b] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Box */}
            <div className="p-4 overflow-auto flex items-center justify-center bg-black/60 flex-1 min-h-[300px]">
              <img 
                src={encodeURI(activeCert.url)} 
                alt={activeCert.title}
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-lg border border-[#e1b382]/20"
              />
            </div>

            {/* Footer */}
            <div className="px-5 py-3 bg-[#2d545e] border-t border-[#e1b382]/30 flex items-center justify-between text-xs text-[#f3e8d6]">
              <span>Click anywhere outside or press X to close</span>
              <a 
                href={activeCert.url} 
                target="_blank" 
                rel="noreferrer"
                className="px-3 py-1.5 bg-[#e1b382] text-[#12343b] font-bold rounded-md hover:bg-white transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Open Original Certificate</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
