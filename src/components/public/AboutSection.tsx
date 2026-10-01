import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ShieldCheck, Cpu, Zap, Trophy, GraduationCap, Award, CheckCircle2, ArrowRight, Sparkles, Terminal, FileCode2, MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { data } = usePortfolio();
  const { profile } = data;

  // Dynamically compute Executive Highlights from live CMS state
  const currentEdu = data.education[0];
  const eduValue = currentEdu ? (currentEdu.degree.includes('B.Tech') ? 'B.Tech IT' : currentEdu.degree) : 'B.Tech IT';
  const eduDetail = currentEdu ? `${currentEdu.institution.split(' ')[0]} (${currentEdu.period.replace(/\s+/g, '')})` : 'Rathinam Tech (2024–28)';

  const currentExp = data.experience[0];
  const expValue = currentExp ? (currentExp.period.includes('Week') ? `${currentExp.period} Cert.` : currentExp.period) : '6-Week Cert.';
  const expDetail = currentExp ? currentExp.company : 'CodTech IT Solutions';

  // Extract Hackathon ranks dynamically from projects
  const hackathonProjects = data.projects.filter(p => p.award || p.category === 'hackathon');
  const hackValue = hackathonProjects.length > 0 
    ? hackathonProjects.map(p => p.award?.split('@')[0]?.trim() || p.award || 'Top Rank').join(' & ').replace(/Place/g, '').replace(/th/g, '') 
    : 'Top 5 & 12';
  const hackDetail = hackathonProjects.length > 0
    ? hackathonProjects.map(p => p.title.replace('Hackathon Project', '').replace('System', '').trim()).slice(0, 2).join(' & ')
    : 'Corexathon & Inno Hack';

  const keyMetrics = [
    { label: 'Hackathon Rank', value: hackValue, detail: hackDetail, icon: Trophy, color: 'text-amber-400' },
    { label: 'Internship', value: expValue, detail: expDetail, icon: ShieldCheck, color: 'text-emerald-400' },
    { label: 'Degree Track', value: eduValue, detail: eduDetail, icon: GraduationCap, color: 'text-cyan-400' },
    { label: 'Specializations', value: 'Cyber & AI', detail: 'Python, Web & Security', icon: Cpu, color: 'text-rose-400' },
  ];

  return (
    <section id="about" className="py-[60px] md:py-[80px] bg-[#000000] border-b border-[#2A2A2A] relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#27D6D9]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F0444B]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 2-Column Professional Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Left Column (5 Cols): Clean Profile & Competencies Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-[#050505] rounded-3xl p-6 sm:p-8 border border-[#2A2A2A] shadow-2xl backdrop-blur-sm flex-1 flex flex-col justify-between space-y-6">
              
              {/* Header with Portrait & Identity */}
              <div className="flex items-center gap-4 border-b border-[#2A2A2A] pb-6">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-1 bg-gradient-to-tr from-[#F0444B] via-[#FF8A65] to-[#27D6D9] shadow-[0_0_20px_rgba(240,68,75,0.3)]">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover rounded-xl bg-[#000000]"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 p-1 bg-[#000000] rounded-full border border-[#F0444B] text-[#F0444B] shadow-md">
                    <CheckCircle2 className="w-4 h-4 fill-[#F0444B] text-[#000000]" />
                  </span>
                </div>

                <div className="space-y-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Plus_Jakarta_Sans'] tracking-tight truncate">
                    Mohamed Riyaskhan S
                  </h3>
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#F0444B]">
                    B.Tech IT Student & Developer
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-[#BDBDBD] pt-0.5">
                    <MapPin className="w-3 h-3 text-[#F0444B]" />
                    <span>{profile.location || 'Coimbatore, Tamil Nadu'}</span>
                  </div>
                </div>
              </div>

              {/* Exact Requested Competency Items */}
              <div className="space-y-3 flex-1 flex flex-col justify-around">
                
                <div className="p-3.5 rounded-2xl bg-[#000000] border border-[#2A2A2A] hover:border-[#F0444B]/60 transition-all duration-300 flex items-center gap-3.5 text-xs sm:text-sm font-semibold text-white group shadow-sm">
                  <div className="p-2 rounded-xl bg-[#F0444B]/15 text-[#F0444B] border border-[#F0444B]/30 group-hover:scale-110 transition-transform shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span>Cybersecurity & Ethical Hacking</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#000000] border border-[#2A2A2A] hover:border-[#FF8A65]/60 transition-all duration-300 flex items-center gap-3.5 text-xs sm:text-sm font-semibold text-white group shadow-sm">
                  <div className="p-2 rounded-xl bg-[#FF8A65]/15 text-[#FF8A65] border border-[#FF8A65]/30 group-hover:scale-110 transition-transform shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span>AI & Intelligent Systems Development</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#000000] border border-[#2A2A2A] hover:border-[#27D6D9]/60 transition-all duration-300 flex items-center gap-3.5 text-xs sm:text-sm font-semibold text-white group shadow-sm">
                  <div className="p-2 rounded-xl bg-[#27D6D9]/15 text-[#27D6D9] border border-[#27D6D9]/30 group-hover:scale-110 transition-transform shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span>Python & Web Engineering</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#000000] border border-[#2A2A2A] hover:border-[#FF8A65]/60 transition-all duration-300 flex items-center gap-3.5 text-xs sm:text-sm font-semibold text-white group shadow-sm">
                  <div className="p-2 rounded-xl bg-[#FF8A65]/15 text-[#FF8A65] border border-[#FF8A65]/30 group-hover:scale-110 transition-transform shrink-0">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <span>Hackathon Competitor (Top 5 & 12)</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#000000] border border-[#2A2A2A] hover:border-[#F0444B]/60 transition-all duration-300 flex items-center gap-3.5 text-xs sm:text-sm font-semibold text-white group shadow-sm">
                  <div className="p-2 rounded-xl bg-[#F0444B]/15 text-[#F0444B] border border-[#F0444B]/30 group-hover:scale-110 transition-transform shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span>B.Tech IT (2024–2028)</span>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column (7 Cols): Professional Narrative & Career Objective */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Header Badge & Narrative Paragraphs */}
            <div className="space-y-6">
              
              <div className="inline-block animate-float-subtle group cursor-default transition-all duration-300">
                <div className="px-6 py-2.5 rounded-2xl bg-[#050505] border border-[#F0444B]/40 shadow-xl group-hover:border-[#FF6B6B] group-hover:shadow-[0_0_20px_rgba(255,107,107,0.3)] group-hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-sm">
                  <h2 className="text-3xl sm:text-[36px] font-bold text-white font-['Plus_Jakarta_Sans'] tracking-tight flex items-center gap-2">
                    Who I <span className="text-[#F0444B]">Am</span>
                  </h2>
                </div>
              </div>
              
              {/* Narrative Content */}
              <div className="space-y-4 text-sm sm:text-base font-regular text-[#BDBDBD] leading-relaxed text-justify">
                <p>
                  Hi, I'm <strong className="text-white font-bold">Mohamed Riyaskhan S</strong>, a passionate <strong className="text-[#F0444B] font-bold">B.Tech Information Technology student</strong> at <strong className="text-white font-bold">Rathinam Technical Campus, Coimbatore</strong>, with a strong interest in <strong className="text-white font-bold">Cybersecurity</strong>, <strong className="text-white font-bold">Artificial Intelligence</strong>, and <strong className="text-white font-bold">Software Development</strong>.
                </p>

                <p>
                  I enjoy exploring emerging technologies, solving real-world problems, and building innovative solutions through hands-on projects and hackathons. I have competed in several hackathons, earning <strong className="text-[#F0444B] font-bold">Top 5th Place at Corexathon 2.0</strong> and <strong className="text-[#F0444B] font-bold">Top 12th Place at Inno Hack 2.0</strong>, where I collaborated with teams to develop AI-powered applications.
                </p>

                <p>
                  I recently completed a <strong className="text-white font-bold">6-week Cybersecurity and Ethical Hacking internship at CodTech IT Solutions</strong>, gaining practical exposure to network security, vulnerability scanning, and defense tools. I am continuously refining my skills in Python, full-stack web development, and AI agentic workflows.
                </p>

                <p>
                  As a curious and self-motivated learner, I believe in continuous growth, teamwork, and turning ideas into practical solutions. My goal is to become a skilled technology professional who builds meaningful, secure, and innovative digital experiences.
                </p>
              </div>

            </div>

            {/* Executive Career Objective Glass Card */}
            <div className="bg-[#050505] rounded-2xl p-5 sm:p-6 border border-[#2A2A2A] border-l-4 border-l-[#F0444B] shadow-xl space-y-3 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-[#F0444B] tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F0444B]" />
                  CAREER OBJECTIVE & FOCUS
                </span>
                <span className="text-[10px] font-mono text-[#BDBDBD] bg-[#000000] px-2.5 py-0.5 rounded border border-[#2A2A2A]">
                  Open for Opportunities
                </span>
              </div>
              
              <div className="space-y-2 text-xs sm:text-sm text-white leading-relaxed font-mono">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#27D6D9] shrink-0 mt-0.5" />
                  <span>Seeking role as Cybersecurity Trainee, AI/Software Developer, or Web Engineering Intern.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#27D6D9] shrink-0 mt-0.5" />
                  <span>Available for immediate internships, technical project development, and hackathon collaborations.</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
