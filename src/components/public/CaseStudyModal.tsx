import React, { useEffect, useState } from 'react';
import { Project } from '../../types/portfolio';
import { X, ArrowUpRight, Award, Maximize2 } from 'lucide-react';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const [showCertificateZoom, setShowCertificateZoom] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showCertificateZoom) {
          setShowCertificateZoom(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, showCertificateZoom]);

  if (!project) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#12343b]/85 backdrop-blur-md overflow-y-auto">
        <div 
          className="relative w-full max-w-[850px] rounded-[24px] bg-[#12343b] border-2 border-[#e1b382] shadow-sand-glow-lg overflow-hidden my-8 animate-float flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cover Banner */}
          <div className="relative h-60 sm:h-72 w-full bg-[#2d545e] overflow-hidden shrink-0">
            <img
              src={encodeURI(project.coverImage)}
              alt={project.title}
              className="w-full h-full object-cover opacity-80"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12343b] via-[#12343b]/50 to-transparent" />
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-[#12343b]/80 text-[#e1b382] hover:bg-[#e1b382] hover:text-[#12343b] transition-all shadow-sand-glow border border-[#c89666]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-6 right-6">
              {project.impactMetric && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e1b382] text-[#12343b] text-xs font-extrabold rounded-full shadow-md mb-2">
                  <Award className="w-3.5 h-3.5" />
                  <span>{project.impactMetric}</span>
                </div>
              )}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ffffff] font-['Plus_Jakarta_Sans']">
                {project.title}
              </h2>
              <p className="text-sm font-medium text-[#e1b382] mt-1">
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-10 space-y-6 overflow-y-auto flex-1">
            
            {/* Hackathon Certificate Preview Card */}
            {project.certificateUrl && (
              <div className="p-4 rounded-2xl bg-[#2d545e]/90 border border-[#e1b382]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#e1b382]" />
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['Plus_Jakarta_Sans']">
                      Official Hackathon Certificate
                    </h4>
                  </div>
                  <button
                    onClick={() => setShowCertificateZoom(true)}
                    className="px-3 py-1 bg-[#e1b382] text-[#12343b] rounded-lg text-xs font-bold hover:bg-white transition-colors flex items-center gap-1"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                  </button>
                </div>

                <div 
                  onClick={() => setShowCertificateZoom(true)}
                  className="relative h-48 sm:h-56 rounded-xl overflow-hidden cursor-pointer border border-[#c89666]/40 bg-black/40 group"
                >
                  <img
                    src={encodeURI(project.certificateUrl)}
                    alt={`${project.title} Certificate`}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-[#e1b382] text-[#12343b] text-xs font-extrabold rounded-lg shadow-lg flex items-center gap-2">
                      <Maximize2 className="w-4 h-4" />
                      Click to View High-Res Certificate
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Challenge Section */}
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 text-lg font-bold text-[#ffffff] font-['Plus_Jakarta_Sans']">
                <span>🎯 Challenge</span>
              </h4>
              <p className="text-base font-normal text-[#f3e8d6] leading-[1.8] bg-[#2d545e] p-4 rounded-2xl border border-[#c89666]/60">
                {project.caseStudy.problem}
              </p>
            </div>

            {/* Solution Section */}
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 text-lg font-bold text-[#ffffff] font-['Plus_Jakarta_Sans']">
                <span>⚙️ Solution</span>
              </h4>
              <p className="text-base font-normal text-[#f3e8d6] leading-[1.8] bg-[#2d545e] p-4 rounded-2xl border border-[#c89666]/60">
                {project.caseStudy.solution}
              </p>
            </div>

            {/* Results Section */}
            {project.caseStudy.results && project.caseStudy.results.length > 0 && (
              <div className="space-y-3">
                <h4 className="flex items-center gap-2 text-lg font-bold text-[#ffffff] font-['Plus_Jakarta_Sans']">
                  <span>📊 Key Achievements & Results</span>
                </h4>
                <ul className="space-y-2 text-sm text-[#f3e8d6]">
                  {project.caseStudy.results.map((result, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-[#e1b382] font-bold">✓</span>
                      <span className="leading-relaxed">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Modal CTA Button */}
            <div className="pt-6 border-t border-[#c89666]/60 flex items-center justify-between">
              <a
                href={project.githubUrl || project.liveUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl text-sm font-bold text-[#12343b] bg-[#e1b382] hover:bg-[#ffffff] transition-all shadow-sand-glow flex items-center gap-2 hover:scale-105 border-2 border-[#c89666]"
              >
                <span>Explore Source / Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                className="text-sm font-bold text-[#e1b382] hover:text-[#ffffff] transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* FULLSCREEN CERTIFICATE ZOOM MODAL */}
      {showCertificateZoom && project.certificateUrl && (
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-lg"
          onClick={() => setShowCertificateZoom(false)}
        >
          <div 
            className="relative max-w-5xl w-full bg-[#12343b] border-2 border-[#e1b382] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 bg-[#2d545e] border-b border-[#e1b382]/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#e1b382] font-bold">
                  Official Certificate Verification
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {project.award || project.title}
                </h3>
              </div>
              <button
                onClick={() => setShowCertificateZoom(false)}
                className="p-2 text-[#f3e8d6] hover:text-white hover:bg-[#12343b] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-auto flex items-center justify-center bg-black/70 flex-1 min-h-[300px]">
              <img 
                src={encodeURI(project.certificateUrl)} 
                alt={`${project.title} Certificate`}
                className="max-h-[78vh] w-auto object-contain rounded-lg shadow-2xl border border-[#e1b382]/30"
              />
            </div>

            <div className="px-5 py-3 bg-[#2d545e] border-t border-[#e1b382]/30 flex items-center justify-between text-xs text-[#f3e8d6]">
              <span>Press ESC or click anywhere outside to close</span>
              <a 
                href={project.certificateUrl} 
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
    </>
  );
};
