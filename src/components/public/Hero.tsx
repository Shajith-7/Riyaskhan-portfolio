import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Download, ArrowRight, Sparkles } from 'lucide-react';

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
    <section className="relative min-h-[90vh] flex flex-col justify-center py-16 md:py-24 bg-[#12343b] bg-night-grid border-b-2 border-[#e1b382]/40 overflow-hidden">
      
      {/* Background Ambient Lighting & Floating Orbs matching Screenshot */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-10 w-96 h-96 bg-[#e1b382]/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-[#2d545e]/60 rounded-full blur-3xl" />
        <div className="absolute top-10 right-16 w-32 h-32 bg-[#e1b382]/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Badge matching Screenshot */}
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2d545e]/90 border border-[#e1b382]/50 text-[#e1b382] text-xs font-mono font-bold tracking-wider shadow-sand-glow backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#e1b382] animate-ping" />
                <span className="w-2 h-2 rounded-full bg-[#e1b382]" />
                <span className="uppercase">AVAILABLE FOR TECH & SOFTWARE OPPORTUNITIES</span>
              </div>
            </div>

            {/* Huge Two-Line Typography Title matching Screenshot */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold text-white tracking-wider uppercase font-['Plus_Jakarta_Sans'] leading-tight">
                MOHAMED
              </h1>
              <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold tracking-wider uppercase font-['Plus_Jakarta_Sans'] leading-tight bg-gradient-to-r from-[#e1b382] via-[#f3d4b2] to-[#c89666] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(225,179,130,0.4)]">
                RIYASKHAN S
              </h1>
              
              {/* Cycling Running Role Subtitle with pulsing cursor indicator */}
              <div className="pt-2 text-xs sm:text-sm font-mono font-extrabold uppercase tracking-widest text-[#e1b382] flex items-center justify-center lg:justify-start gap-1 min-h-[28px]">
                <span>{displayText}</span>
                <span className="inline-block w-2 h-4 bg-[#e1b382] animate-pulse shrink-0" />
              </div>
            </div>

            {/* Description Paragraph with Bold Keywords matching Screenshot */}
            <p className="text-sm sm:text-base font-normal text-[#f3e8d6]/90 leading-[1.8] max-w-[620px] text-justify mx-auto lg:mx-0">
              Passionate <strong className="text-white font-bold">B.Tech Information Technology student</strong> at <strong className="text-white font-bold">Rathinam Technical Campus</strong> specializing in <strong className="text-[#e1b382] font-bold">Cybersecurity</strong>, <strong className="text-[#e1b382] font-bold">Artificial Intelligence</strong>, and <strong className="text-white font-bold">Software Engineering</strong>. Experienced in <strong className="text-white font-bold">Python</strong>, <strong className="text-white font-bold">Cisco Networking</strong>, <strong className="text-white font-bold">Web Development</strong>, and <strong className="text-white font-bold">Ethical Hacking</strong>. Proven track record in competitive hackathons (<strong className="text-[#e1b382] font-bold">Top 5th @ Corexathon 2.0</strong> & <strong className="text-[#e1b382] font-bold">Top 12th @ Inno Hack 2.0</strong>).
            </p>

            {/* Action CTA Buttons (Download Resume & Let's Connect as requested) */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              
              {/* Download Resume Button */}
              <a
                href={resumePath}
                download="Riyaskhan Final Resume 123.docx"
                onClick={handleDownloadResume}
                className="px-8 py-3.5 bg-gradient-to-r from-[#e1b382] to-[#c89666] hover:from-white hover:to-[#e1b382] text-[#12343b] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl border-2 border-[#c89666] shadow-sand-glow hover:shadow-sand-glow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2.5 group"
              >
                <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 text-[#12343b]" />
                <span>Download Resume</span>
              </a>

              {/* Let's Connect Button */}
              <a
                href="#contact"
                className="px-8 py-3.5 bg-[#2d545e]/90 hover:bg-[#e1b382] text-[#e1b382] hover:text-[#12343b] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl border-2 border-[#e1b382] shadow-sand-glow hover:scale-105 transition-all duration-300 flex items-center gap-2.5 group backdrop-blur-sm"
              >
                <span>Let's Connect</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

            </div>

          </div>

          {/* Right Column: Large Circular Profile Portrait Container matching Screenshot */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative">
              
              {/* Outer Dashed Glowing Circle Ring matching Screenshot */}
              <div className="w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full p-2.5 relative flex items-center justify-center bg-[#2d545e]/40 border-2 border-[#c89666]/30 shadow-2xl">
                
                {/* Animated Outer Orbit Ring */}
                <div className="absolute -inset-3 rounded-full border border-dashed border-[#e1b382]/60 animate-spin-slow pointer-events-none" />

                {/* Profile Image Circular Frame */}
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#12343b] bg-[#12343b] shadow-inner relative group">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/profile.png';
                    }}
                  />
                  {/* Subtle ambient overlay */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#12343b]/40 via-transparent to-transparent pointer-events-none" />
                </div>

              </div>

              {/* 3D Sphere / Floating Orb Accent matching Screenshot (Top Right) */}
              <div className="absolute -top-4 -right-4 w-14 h-14 rounded-full bg-gradient-to-br from-[#ffffff] via-[#e1b382] to-[#2d545e] shadow-sand-glow border-2 border-white/40 animate-pulse pointer-events-none" />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
