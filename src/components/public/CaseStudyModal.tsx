import React, { useEffect } from 'react';
import { Project } from '../../types/portfolio';
import { X, ArrowUpRight } from 'lucide-react';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#12343b]/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-[800px] rounded-[24px] bg-[#12343b] border-2 border-[#e1b382] shadow-sand-glow-lg overflow-hidden my-8 animate-float"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover Banner */}
        <div className="relative h-60 sm:h-72 w-full bg-[#2d545e] overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover opacity-80"
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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ffffff] font-['Plus_Jakarta_Sans']">
              {project.title}
            </h2>
            <p className="text-sm font-medium text-[#e1b382] mt-1">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-6 max-h-[calc(85vh-16rem)] overflow-y-auto">
          
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
                <span>📊 Results</span>
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
              href={project.liveUrl || '#'}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl text-sm font-bold text-[#12343b] bg-[#e1b382] hover:bg-[#ffffff] transition-all shadow-sand-glow flex items-center gap-2 hover:scale-105 border-2 border-[#c89666]"
            >
              <span>Explore Full Project</span>
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
  );
};
