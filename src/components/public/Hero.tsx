import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Download, ArrowRight, Sparkles, Terminal, Code2, ShieldCheck, Brain, Globe, FileSpreadsheet } from 'lucide-react';

export const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const { profile } = data;

  // Running Typewriter animation for Tagline Roles
  const roles = [
    'B.TECH IT STUDENT | CYBERSECURITY & AI DEVELOPER',
    'CYBER SECURITY & ETHICAL HACKING ENTHUSIAST',
    'HACKATHON COMPETITOR (TOP 5 & 12 FINISHES)',
    'PYTHON & WEB ENGINEERING DEVELOPER',
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let typingSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && displayText === currentRole) {
      typingSpeed = 2200;
      const timeout = setTimeout(() => setIsDeleting(true), typingSpeed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(
        currentRole.substring(
          0,
          isDeleting ? displayText.length - 1 : displayText.length + 1
        )
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  const resumePath = profile.resumeUrl && profile.resumeUrl !== '#' && profile.resumeUrl.trim() !== ''
    ? profile.resumeUrl 
    : '/images/Riyaskhan_Final_Resume_123.docx';

  const handleDownloadResume = (e: React.MouseEvent) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = resumePath;
    link.setAttribute('download', 'Riyaskhan Final Resume 123.docx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center py-16 md:py-24 bg-[#0b0d17] bg-night-grid border-b border-[#38bdf8]/20 overflow-hidden">
      
      {/* Background Ambient Glows & Purple/Cyan Lights matching Screenshot */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-[450px] h-[450px] bg-[#38bdf8]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#818cf8]/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] bg-[#ef4444]/10 rounded-full blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161a2e] border border-[#38bdf8]/40 text-[#38bdf8] text-xs font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(56,189,248,0.25)] backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-ping" />
                <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                <span className="uppercase text-[#cbd5e1]">AVAILABLE FOR TECH & SOFTWARE OPPORTUNITIES</span>
              </div>
            </div>

            {/* Headline Title matching Sajid Yaqub Screenshot */}
            <div className="space-y-2">
              <p className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Hi, I'm
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-[66px] font-extrabold tracking-tight uppercase font-['Plus_Jakarta_Sans'] leading-tight bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#ef4444] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]">
                Mohamed Riyaskhan S
              </h1>
              
              {/* Cycling Running Role Subtitle with cursor */}
              <div className="pt-1 text-xs sm:text-sm font-mono font-extrabold uppercase tracking-widest text-[#38bdf8] flex items-center justify-center lg:justify-start gap-1 min-h-[28px]">
                <span>{displayText}</span>
                <span className="inline-block w-2 h-4 bg-[#ef4444] animate-pulse shrink-0" />
              </div>
            </div>

            {/* Description Paragraph matching Sajid Yaqub Screenshot */}
            <p className="text-sm sm:text-base font-normal text-[#94a3b8] leading-[1.8] max-w-[620px] text-justify mx-auto lg:mx-0">
              Passionate <strong className="text-white font-bold">B.Tech Information Technology student</strong> at <strong className="text-white font-bold">Rathinam Technical Campus</strong> specializing in <strong className="text-[#38bdf8] font-bold">Cybersecurity</strong>, <strong className="text-[#38bdf8] font-bold">Artificial Intelligence</strong>, and <strong className="text-white font-bold">Software Development</strong>. Experienced in <strong className="text-white font-bold">Python</strong>, <strong className="text-white font-bold">Cisco Networking</strong>, <strong className="text-white font-bold">Web Development</strong>, and <strong className="text-white font-bold">Ethical Hacking</strong>. Hackathon Competitor (<strong className="text-[#ef4444] font-bold">Top 5th @ Corexathon 2.0</strong> & <strong className="text-[#ef4444] font-bold">Top 12th @ Inno Hack 2.0</strong>).
            </p>

            {/* Action Buttons matching Sajid Yaqub Pill Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              
              {/* Cyan Gradient View Projects / Resume Pill Button */}
              <a
                href="#projects"
                className="px-8 py-3.5 bg-gradient-to-r from-[#38bdf8] to-[#3b82f6] hover:from-[#3b82f6] hover:to-[#ef4444] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-[0_0_20px_rgba(56,189,248,0.45)] hover:shadow-[0_0_30px_rgba(239,68,68,0.65)] hover:scale-105 transition-all duration-300 flex items-center gap-2.5 group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Cyan Glass Border Let's Connect Pill Button */}
              <a
                href={resumePath}
                download="Riyaskhan Final Resume 123.docx"
                onClick={handleDownloadResume}
                className="px-8 py-3.5 bg-[#161a2e]/90 hover:bg-[#38bdf8] text-[#38bdf8] hover:text-[#0b0d17] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full border border-[#38bdf8]/60 hover:border-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:scale-105 transition-all duration-300 flex items-center gap-2.5 group backdrop-blur-sm"
              >
                <Download className="w-4 h-4 text-[#38bdf8] group-hover:text-[#0b0d17] transition-colors" />
                <span>Download Resume</span>
              </a>

            </div>

          </div>

          {/* Right Column: Circular Profile Portrait with Floating Tech Skill Badges matching Sajid Yaqub Screenshot */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative">
              
              {/* Outer Glowing Circle Container */}
              <div className="w-[280px] h-[280px] sm:w-[370px] sm:h-[370px] rounded-full p-3 relative flex items-center justify-center bg-[#161a2e]/60 border border-[#38bdf8]/40 shadow-[0_0_50px_rgba(56,189,248,0.3)]">
                
                {/* Outer Spinning Orbit Ring */}
                <div className="absolute -inset-4 rounded-full border border-dashed border-[#38bdf8]/50 animate-spin-slow pointer-events-none" />

                {/* Circular Profile Photo Frame */}
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#0b0d17] bg-[#0b0d17] shadow-2xl relative group">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/profile.png';
                    }}
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#0b0d17]/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Skill Badges Orbiting Around Profile (Matching Sajid Yaqub Screenshot) */}
                
                {/* 1. Python Badge (Top Left) */}
                <div className="absolute -top-3 left-4 p-2.5 rounded-2xl bg-[#161a2e] border border-[#38bdf8] text-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.5)] animate-float-icon-1">
                  <Terminal className="w-5 h-5 text-[#3776AB]" />
                </div>

                {/* 2. AI Brain Badge (Top Right) */}
                <div className="absolute -top-3 right-6 p-2.5 rounded-2xl bg-[#161a2e] border border-[#ef4444] text-[#ef4444] shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-float-icon-2">
                  <Brain className="w-5 h-5 text-[#AB47BC]" />
                </div>

                {/* 3. Cybersecurity Shield Badge (Middle Left) */}
                <div className="absolute top-1/2 -left-6 -translate-y-1/2 p-2.5 rounded-2xl bg-[#161a2e] border border-[#00E676] text-[#00E676] shadow-[0_0_15px_rgba(0,230,118,0.5)] animate-float-icon-3">
                  <ShieldCheck className="w-5 h-5 text-[#00E676]" />
                </div>

                {/* 4. Web Dev React Badge (Middle Right) */}
                <div className="absolute top-1/2 -right-6 -translate-y-1/2 p-2.5 rounded-2xl bg-[#161a2e] border border-[#38bdf8] text-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.5)] animate-float-icon-1">
                  <Globe className="w-5 h-5 text-[#38bdf8]" />
                </div>

                {/* 5. C Code Badge (Bottom Left) */}
                <div className="absolute -bottom-2 left-6 p-2.5 rounded-2xl bg-[#161a2e] border border-[#5C6BC0] text-[#5C6BC0] shadow-[0_0_15px_rgba(92,107,192,0.5)] animate-float-icon-2">
                  <Code2 className="w-5 h-5 text-[#5C6BC0]" />
                </div>

                {/* 6. Vibe Coding Sparkles Badge (Bottom Right) */}
                <div className="absolute -bottom-2 right-8 p-2.5 rounded-2xl bg-[#161a2e] border border-[#FFD700] text-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.5)] animate-float-icon-3">
                  <Sparkles className="w-5 h-5 text-[#FFD700]" />
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
