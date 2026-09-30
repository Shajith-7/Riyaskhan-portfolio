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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        <div 
          className="relative w-full max-w-[850px] rounded-[24px] bg-[#050505] border border-[#2A2A2A] shadow-2xl overflow-hidden my-8 animate-float flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cover Banner */}
          <div className="relative h-60 sm:h-72 w-full bg-[#000000] overflow-hidden shrink-0">
            <img
              src={encodeURI(project.coverImage)}
              alt={project.title}
              className="w-full h-full object-cover opacity-80"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-[#000000]/80 text-[#F0444B] hover:bg-[#F0444B] hover:text-white transition-all shadow-md border border-[#2A2A2A]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-6 right-6">
              {project.impactMetric && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F0444B] text-white text-xs font-extrabold rounded-full shadow-md mb-2">
                  <Award className="w-3.5 h-3.5" />
                  <span>{project.impactMetric}</span>
                </div>
              )}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF] font-['Plus_Jakarta_Sans']">
                {project.title}
              </h2>
              <p className="text-sm font-medium text-[#27D6D9] mt-1">
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-10 space-y-6 overflow-y-auto flex-1">
            
            {/* Project Image Showcase Card */}
            {(project.coverImage || project.certificateUrl) && (
              <div className="p-4 rounded-2xl bg-[#000000] border border-[#2A2A2A] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Maximize2 className="w-5 h-5 text-[#F0444B]" />
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['Plus_Jakarta_Sans']">
                      Project Image Showcase
                    </h4>
                  </div>
                  <button
                    onClick={() => setShowCertificateZoom(true)}
                    className="px-3 py-1 bg-[#F0444B] hover:bg-[#FF6B6B] text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Image</span>
                  </button>
                </div>

                <div 
                  onClick={() => setShowCertificateZoom(true)}
                  className="relative h-48 sm:h-56 rounded-xl overflow-hidden cursor-pointer border border-[#2A2A2A] bg-black/40 group"
                >
                  <img
                    src={encodeURI(project.coverImage)}
                    alt={`${project.title} Showcase`}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-[#F0444B] text-white text-xs font-extrabold rounded-lg shadow-lg flex items-center gap-2">
                      <Maximize2 className="w-4 h-4" />
                      Click to View High-Res Image
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Challenge Section */}
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 text-lg font-bold text-[#FFFFFF] font-['Plus_Jakarta_Sans']">
                <span>🎯 Challenge</span>
              </h4>
              <p className="text-base font-normal text-[#BDBDBD] leading-[1.8] bg-[#000000] p-4 rounded-2xl border border-[#2A2A2A]">
                {project.caseStudy.problem}
              </p>
            </div>

            {/* Solution Section */}
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 text-lg font-bold text-[#FFFFFF] font-['Plus_Jakarta_Sans']">
                <span>⚙️ Solution</span>
              </h4>
              <p className="text-base font-normal text-[#BDBDBD] leading-[1.8] bg-[#000000] p-4 rounded-2xl border border-[#2A2A2A]">
                {project.caseStudy.solution}
              </p>
            </div>

            {/* Results Section */}
            {project.caseStudy.results && project.caseStudy.results.length > 0 && (
              <div className="space-y-3">
                <h4 className="flex items-center gap-2 text-lg font-bold text-[#FFFFFF] font-['Plus_Jakarta_Sans']">
                  <span>📊 Key Achievements & Results</span>
                </h4>
                <ul className="space-y-2 text-sm text-[#BDBDBD]">
                  {project.caseStudy.results.map((result, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-[#F0444B] font-bold">✓</span>
                      <span className="leading-relaxed">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Modal CTA Button */}
            <div className="pt-6 border-t border-[#2A2A2A] flex items-center justify-between">
              <a
                href={project.githubUrl || project.liveUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#F0444B] hover:bg-[#FF6B6B] transition-all shadow-md flex items-center gap-2 hover:scale-105"
              >
                <span>Explore Source / Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                className="text-sm font-bold text-[#27D6D9] hover:text-white transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* FULLSCREEN PROJECT IMAGE ZOOM MODAL */}
      {showCertificateZoom && (
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-lg"
          onClick={() => setShowCertificateZoom(false)}
        >
          <div 
            className="relative max-w-5xl w-full bg-[#050505] border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 bg-[#000000] border-b border-[#2A2A2A] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#27D6D9] font-bold">
                  Project Image Preview
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {project.title}
                </h3>
              </div>
              <button
                onClick={() => setShowCertificateZoom(false)}
                className="p-2 text-[#BDBDBD] hover:text-white hover:bg-[#1B1B1B] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-auto flex items-center justify-center bg-black/70 flex-1 min-h-[300px]">
              <img 
                src={encodeURI(project.coverImage)} 
                alt={`${project.title} Image`}
                className="max-h-[78vh] w-auto object-contain rounded-lg shadow-2xl border border-[#2A2A2A]"
              />
            </div>

            <div className="px-5 py-3 bg-[#000000] border-t border-[#2A2A2A] flex items-center justify-between text-xs text-[#BDBDBD]">
              <span>Press ESC or click anywhere outside to close</span>
              <a 
                href={project.coverImage} 
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
    </>
  );
};

