import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Download, ArrowRight } from 'lucide-react';

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
    <section className="relative min-h-[90vh] flex flex-col justify-center py-16 md:py-24 bg-[#000000] border-b border-[#2A2A2A] overflow-hidden">
      
      {/* Background Full-Screen Professional Video */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <video
          src="/profile video.mp4"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          className="w-full h-full object-cover opacity-35 sm:opacity-45 filter brightness-90 contrast-105 scale-105"
        />
        {/* Dark Cinematic Vignette & Gradient Overlay for Maximum Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/85 to-[#000000]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-[#000000]/60" />
        
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[#27D6D9]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-[#F0444B]/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="max-w-3xl space-y-6 text-center lg:text-left">
          
          {/* Top Pill Badge */}
          <div className="flex justify-center lg:justify-start">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#050505]/80 border border-[#F0444B]/40 text-[#F0444B] text-xs font-mono font-bold tracking-wider shadow-sand-glow backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#F0444B] animate-ping" />
              <span className="w-2 h-2 rounded-full bg-[#27D6D9]" />
              <span className="uppercase text-[#BDBDBD]">AVAILABLE FOR TECH & SOFTWARE OPPORTUNITIES</span>
            </div>
          </div>

          {/* Headline Title */}
          <div className="space-y-2">
            <p className="text-2xl sm:text-4xl font-bold text-white tracking-tight drop-shadow-md">
              Hi, I'm
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-[66px] font-extrabold tracking-tight uppercase font-['Plus_Jakarta_Sans'] leading-tight text-[#F0444B] drop-shadow-[0_0_30px_rgba(240,68,75,0.45)]">
              Mohamed Riyaskhan S
            </h1>
            
            {/* Cycling Running Role Subtitle with cursor */}
            <div className="pt-1 text-xs sm:text-sm font-mono font-extrabold uppercase tracking-widest text-[#27D6D9] flex items-center justify-center lg:justify-start gap-1 min-h-[28px] drop-shadow-sm">
              <span>{displayText}</span>
              <span className="inline-block w-2 h-4 bg-[#F0444B] animate-pulse shrink-0" />
            </div>
          </div>

          {/* Description Paragraph */}
          <p className="text-sm sm:text-base font-normal text-[#E0E0E0] leading-[1.8] max-w-[640px] text-justify mx-auto lg:mx-0 drop-shadow-sm">
            Passionate <strong className="text-white font-bold">B.Tech Information Technology student</strong> at <strong className="text-white font-bold">Rathinam Technical Campus</strong> specializing in <strong className="text-[#27D6D9] font-bold">Cybersecurity</strong>, <strong className="text-[#27D6D9] font-bold">Artificial Intelligence</strong>, and <strong className="text-white font-bold">Software Development</strong>. Experienced in <strong className="text-white font-bold">Python</strong>, <strong className="text-white font-bold">Cisco Networking</strong>, <strong className="text-white font-bold">Web Development</strong>, and <strong className="text-white font-bold">Ethical Hacking</strong>. Hackathon Competitor (<strong className="text-[#F0444B] font-bold">Top 5th @ Corexathon 2.0</strong> & <strong className="text-[#F0444B] font-bold">Top 12th @ Inno Hack 2.0</strong>).
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            
            {/* Coral Red Pill Button */}
            <a
              href="#contact"
              className="px-8 py-3.5 bg-[#F0444B] hover:bg-[#FF6B6B] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-[0_0_25px_rgba(240,68,75,0.5)] hover:shadow-[0_0_35px_rgba(255,107,107,0.7)] hover:scale-105 transition-all duration-300 flex items-center gap-2.5 group active:scale-95"
            >
              <span>Let's Connect</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Secondary Download Resume Button */}
            <a
              href={resumePath}
              download="Riyaskhan Final Resume 123.docx"
              onClick={handleDownloadResume}
              className="px-8 py-3.5 bg-[#050505]/80 hover:bg-[#1B1B1B] text-[#F0444B] hover:text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full border border-[#2A2A2A] hover:border-[#F0444B] shadow-md hover:scale-105 transition-all duration-300 flex items-center gap-2.5 group backdrop-blur-md"
            >
              <Download className="w-4 h-4 text-[#F0444B] group-hover:text-white transition-colors" />
              <span>Download Resume</span>
            </a>

          </div>

        </div>
      </div>
    </section>
  );
};


