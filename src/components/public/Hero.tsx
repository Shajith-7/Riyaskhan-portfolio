import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Download, ArrowRight, Volume2, VolumeX } from 'lucide-react';

export const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const { profile } = data;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

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

  const toggleSound = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      if (!newMutedState) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

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
      
      {/* Background Smooth Ambient Glows & Radial Soft Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-radial from-[#27D6D9]/15 via-[#F0444B]/10 to-transparent blur-[140px]" />
        <div className="absolute top-1/4 left-5 w-[450px] h-[450px] bg-[#27D6D9]/10 rounded-full blur-[130px] animate-pulse" />
        <div className="absolute top-1/3 right-5 w-[500px] h-[500px] bg-[#FF8A65]/12 rounded-full blur-[150px]" />
        <div className="absolute bottom-5 left-1/3 w-[450px] h-[450px] bg-[#F0444B]/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#050505] border border-[#F0444B]/40 text-[#F0444B] text-xs font-mono font-bold tracking-wider shadow-sand-glow backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#F0444B] animate-ping" />
                <span className="w-2 h-2 rounded-full bg-[#27D6D9]" />
                <span className="uppercase text-[#BDBDBD]">AVAILABLE FOR TECH & SOFTWARE OPPORTUNITIES</span>
              </div>
            </div>

            {/* Headline Title matching Uploaded Image Screenshot */}
            <div className="space-y-2">
              <p className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Hi, I'm
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-[66px] font-extrabold tracking-tight uppercase font-['Plus_Jakarta_Sans'] leading-tight text-[#F0444B] drop-shadow-[0_0_25px_rgba(240,68,75,0.35)]">
                Mohamed Riyaskhan S
              </h1>
              
              {/* Cycling Running Role Subtitle with cursor */}
              <div className="pt-1 text-xs sm:text-sm font-mono font-extrabold uppercase tracking-widest text-[#27D6D9] flex items-center justify-center lg:justify-start gap-1 min-h-[28px]">
                <span>{displayText}</span>
                <span className="inline-block w-2 h-4 bg-[#F0444B] animate-pulse shrink-0" />
              </div>
            </div>

            {/* Description Paragraph */}
            <p className="text-sm sm:text-base font-normal text-[#BDBDBD] leading-[1.8] max-w-[620px] text-justify mx-auto lg:mx-0">
              Passionate <strong className="text-white font-bold">B.Tech Information Technology student</strong> at <strong className="text-white font-bold">Rathinam Technical Campus</strong> specializing in <strong className="text-[#27D6D9] font-bold">Cybersecurity</strong>, <strong className="text-[#27D6D9] font-bold">Artificial Intelligence</strong>, and <strong className="text-white font-bold">Software Development</strong>. Experienced in <strong className="text-white font-bold">Python</strong>, <strong className="text-white font-bold">Cisco Networking</strong>, <strong className="text-white font-bold">Web Development</strong>, and <strong className="text-white font-bold">Ethical Hacking</strong>. Hackathon Competitor (<strong className="text-[#F0444B] font-bold">Top 5th @ Corexathon 2.0</strong> & <strong className="text-[#F0444B] font-bold">Top 12th @ Inno Hack 2.0</strong>).
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              
              {/* Coral Red Pill Button */}
              <a
                href="#contact"
                className="px-8 py-3.5 bg-[#F0444B] hover:bg-[#FF6B6B] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-[0_0_20px_rgba(240,68,75,0.45)] hover:shadow-[0_0_30px_rgba(255,107,107,0.65)] hover:scale-105 transition-all duration-300 flex items-center gap-2.5 group active:scale-95"
              >
                <span>Let's Connect</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Secondary Download Resume Button */}
              <a
                href={resumePath}
                download="Riyaskhan Final Resume 123.docx"
                onClick={handleDownloadResume}
                className="px-8 py-3.5 bg-[#050505] hover:bg-[#1B1B1B] text-[#F0444B] hover:text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full border border-[#2A2A2A] hover:border-[#F0444B] shadow-sm hover:scale-105 transition-all duration-300 flex items-center gap-2.5 group backdrop-blur-sm"
              >
                <Download className="w-4 h-4 text-[#F0444B] group-hover:text-white transition-colors" />
                <span>Download Resume</span>
              </a>

            </div>

          </div>

          {/* Right Column: Clean Modern Rectangular Video Player (No circular frames or round badges) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-[#050505] border border-[#2A2A2A] rounded-2xl p-2.5 shadow-[0_0_40px_rgba(240,68,75,0.15)] relative">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-black border border-[#1B1B1B]">
                <video
                  ref={videoRef}
                  src="/profile video.mp4"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const parent = (e.target as HTMLElement).parentElement;
                    if (parent) {
                      const img = document.createElement('img');
                      img.src = profile.avatarUrl || '/images/profile.png';
                      img.className = 'w-full h-full object-cover rounded-xl';
                      parent.replaceChild(img, e.target as HTMLElement);
                    }
                  }}
                />
                
                {/* Interactive Sound Unmute Button */}
                <button
                  onClick={toggleSound}
                  className="absolute bottom-16 right-4 z-20 px-3.5 py-2 rounded-xl bg-black/80 hover:bg-[#F0444B] text-white border border-[#2A2A2A] hover:border-[#F0444B] backdrop-blur-md transition-all duration-300 flex items-center gap-2 text-xs font-bold shadow-lg"
                  title={isMuted ? "Click to Unmute Audio" : "Click to Mute Audio"}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4 text-[#F0444B]" />
                      <span>Click to Unmute Voice</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-[#27D6D9]" />
                      <span>Voice Sound Active</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

