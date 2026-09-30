import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { FileText, Award, Eye, X, Maximize2, ShieldCheck, FolderGit2 } from 'lucide-react';

interface ActiveImageModal {
  url: string;
  title: string;
  category: string;
}

export const ExperienceSection: React.FC = () => {
  const { data } = usePortfolio();
  const [activeImage, setActiveImage] = useState<ActiveImageModal | null>(null);

  if (!data.settings.showExperience || data.experience.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="py-[60px] md:py-[80px] bg-[#000000] border-b border-[#2A2A2A] relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#27D6D9]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#F0444B]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-[40px] space-y-3">
          <div className="inline-block animate-float-subtle group cursor-default transition-all duration-300">
            <div className="px-6 py-2.5 rounded-2xl bg-[#050505] border border-[#2A2A2A] shadow-xl group-hover:border-[#F0444B] group-hover:shadow-[0_0_20px_rgba(240,68,75,0.4)] group-hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-sm">
              <h2 className="text-3xl sm:text-[36px] font-bold text-[#FFFFFF] font-['Plus_Jakarta_Sans'] tracking-tight">
                Internship <span className="text-[#F0444B]">Experience</span>
              </h2>
            </div>
          </div>
          <p className="text-base font-regular text-[#BDBDBD]">
            Practical cyber security engineering, verified credentials, and completed project deliverables
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-5xl mx-auto pl-6 sm:pl-10 border-l-2 border-[#F0444B] space-y-12">
          {data.experience.map((exp) => (
            <div key={exp.id} className="relative group">
              
              {/* Connector Node with Glow animation */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-[#000000] border-4 border-[#F0444B] shadow-[0_0_15px_rgba(240,68,75,0.5)] animate-glow-pulse" />

              {/* Date Header */}
              <div className="text-sm font-extrabold text-[#F0444B] mb-2 flex items-center gap-2">
                <span>{exp.period}</span>
                {exp.current && (
                  <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Current
                  </span>
                )}
              </div>

              {/* Main Experience Content Card */}
              <div className="bg-[#050505] p-6 sm:p-8 rounded-[20px] transition-all duration-300 space-y-6 border border-[#2A2A2A] hover:border-[#F0444B] shadow-xl">
                
                {/* Role Header */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] font-['Plus_Jakarta_Sans']">
                      {exp.role}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#000000] text-[#27D6D9] border border-[#2A2A2A]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#27D6D9]" />
                      Verified Internship
                    </span>
                  </div>

                  <div className="text-base font-bold text-[#F0444B] mb-1">
                    {exp.company}
                  </div>

                  <div className="text-xs font-medium text-[#BDBDBD]">
                    {exp.period} · {exp.location}
                  </div>
                </div>

                {/* Key Achievements List */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-extrabold text-[#F0444B] mb-3">
                    Key Highlights & Responsibilities
                  </h4>
                  <ul className="space-y-2.5 text-sm font-regular text-[#BDBDBD] leading-[1.8]">
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#F0444B] mt-2 shrink-0 shadow-[0_0_10px_rgba(240,68,75,0.5)]" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Badges */}
                <div className="pt-2 border-t border-[#2A2A2A] flex flex-wrap items-center gap-2 font-mono text-xs">
                  <span className="text-[#BDBDBD] text-[11px] font-sans mr-1">Skills & Tools:</span>
                  {exp.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-[#000000] text-[#27D6D9] rounded-md border border-[#2A2A2A]">
                      {t}
                    </span>
                  ))}
                </div>

                {/* OFFICIAL DOCUMENTS & CERTIFICATES SECTION */}
                {(exp.offerLetterUrl || exp.completionCertificateUrl) && (
                  <div className="pt-4 border-t border-[#2A2A2A]">
                    <h4 className="text-xs uppercase tracking-wider font-extrabold text-[#F0444B] mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#F0444B]" />
                      Official Internship Credentials & Documents
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Offer Letter Card */}
                      {exp.offerLetterUrl && (
                        <div 
                          onClick={() => setActiveImage({
                            url: exp.offerLetterUrl!,
                            title: `Internship Offer Letter - ${exp.company}`,
                            category: 'Official Offer Letter'
                          })}
                          className="group/doc relative rounded-xl border border-[#2A2A2A] bg-[#000000] overflow-hidden cursor-pointer hover:border-[#F0444B] transition-all duration-300"
                        >
                          <div className="h-44 overflow-hidden relative bg-black/40">
                            <img 
                              src={encodeURI(exp.offerLetterUrl)} 
                              alt="Internship Offer Letter"
                              className="w-full h-full object-cover object-top group-hover/doc:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-black/20 opacity-80 group-hover/doc:opacity-40 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/doc:opacity-100 bg-black/50 backdrop-blur-xs transition-all duration-300">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F0444B] hover:bg-[#FF6B6B] text-white font-bold text-xs shadow-lg">
                                <Maximize2 className="w-3.5 h-3.5" />
                                View Full Letter
                              </span>
                            </div>
                          </div>
                          <div className="p-3 flex items-center justify-between bg-[#000000]">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-[#F0444B]" />
                              <span className="text-xs font-bold text-white">Intern Offer Letter</span>
                            </div>
                            <span className="text-[10px] font-mono text-[#27D6D9] bg-[#050505] px-2 py-0.5 rounded border border-[#2A2A2A]">
                              Verified PDF/Img
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Completion Certificate Card */}
                      {exp.completionCertificateUrl && (
                        <div 
                          onClick={() => setActiveImage({
                            url: exp.completionCertificateUrl!,
                            title: `Internship Completion Certificate - ${exp.company}`,
                            category: 'Official Completion Certificate'
                          })}
                          className="group/doc relative rounded-xl border border-[#2A2A2A] bg-[#000000] overflow-hidden cursor-pointer hover:border-[#F0444B] transition-all duration-300"
                        >
                          <div className="h-44 overflow-hidden relative bg-black/40">
                            <img 
                              src={encodeURI(exp.completionCertificateUrl)} 
                              alt="Internship Completion Certificate"
                              className="w-full h-full object-cover object-top group-hover/doc:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-black/20 opacity-80 group-hover/doc:opacity-40 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/doc:opacity-100 bg-black/50 backdrop-blur-xs transition-all duration-300">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F0444B] hover:bg-[#FF6B6B] text-white font-bold text-xs shadow-lg">
                                <Maximize2 className="w-3.5 h-3.5" />
                                View Certificate
                              </span>
                            </div>
                          </div>
                          <div className="p-3 flex items-center justify-between bg-[#000000]">
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-[#F0444B]" />
                              <span className="text-xs font-bold text-white">Completion Certificate</span>
                            </div>
                            <span className="text-[10px] font-mono text-[#27D6D9] bg-[#050505] px-2 py-0.5 rounded border border-[#2A2A2A]">
                              Verified
                            </span>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                )}

                {/* PROJECTS COMPLETED DURING INTERNSHIP */}
                {exp.internshipProjects && exp.internshipProjects.length > 0 && (
                  <div className="pt-4 border-t border-[#2A2A2A]">
                    <h4 className="text-xs uppercase tracking-wider font-extrabold text-[#F0444B] mb-3 flex items-center gap-2">
                      <FolderGit2 className="w-4 h-4 text-[#F0444B]" />
                      Projects Developed During Internship
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {exp.internshipProjects.map((proj) => (
                        <div 
                          key={proj.id}
                          className="group/proj bg-[#000000] border border-[#2A2A2A] rounded-xl overflow-hidden hover:border-[#F0444B] transition-all duration-300 flex flex-col justify-between"
                        >
                          <div>
                            {/* Image Container */}
                            <div 
                              onClick={() => setActiveImage({
                                url: proj.imageUrl,
                                title: proj.title,
                                category: `Internship Project @ ${exp.company}`
                              })}
                              className="h-36 relative overflow-hidden bg-black/50 cursor-pointer"
                            >
                              <img 
                                src={encodeURI(proj.imageUrl)} 
                                alt={proj.title}
                                className="w-full h-full object-cover group-hover/proj:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-black/40 group-hover/proj:bg-black/20 transition-colors" />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/proj:opacity-100 bg-black/60 transition-opacity">
                                <span className="p-2 rounded-full bg-[#F0444B] text-white">
                                  <Eye className="w-4 h-4" />
                                </span>
                              </div>
                            </div>

                            {/* Text Info */}
                            <div className="p-4 space-y-2">
                              <h5 className="text-sm font-bold text-white group-hover/proj:text-[#F0444B] transition-colors leading-snug">
                                {proj.title}
                              </h5>
                              <p className="text-xs text-[#BDBDBD] line-clamp-3 leading-relaxed">
                                {proj.description}
                              </p>
                            </div>
                          </div>

                          {/* Tags */}
                          {proj.tags && (
                            <div className="p-4 pt-0 flex flex-wrap gap-1">
                              {proj.tags.map((tag) => (
                                <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#050505] text-[#27D6D9] border border-[#2A2A2A]">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX / PREVIEW MODAL */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#050505] border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-5 py-4 bg-[#000000] border-b border-[#2A2A2A] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#27D6D9] font-bold">
                  {activeImage.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {activeImage.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveImage(null)}
                className="p-2 text-[#BDBDBD] hover:text-white hover:bg-[#1B1B1B] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Box */}
            <div className="p-4 overflow-auto flex items-center justify-center bg-black/60 flex-1 min-h-[300px]">
              <img 
                src={encodeURI(activeImage.url)} 
                alt={activeImage.title}
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-lg border border-[#2A2A2A]"
              />
            </div>

            {/* Footer */}
            <div className="px-5 py-3 bg-[#000000] border-t border-[#2A2A2A] flex items-center justify-between text-xs text-[#BDBDBD]">
              <span>Click anywhere outside or press X to close</span>
              <a 
                href={activeImage.url} 
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

    </section>
  );
};

