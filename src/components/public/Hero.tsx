import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Download,
  ArrowRight,
  Code2,
  Trophy,
  Award,
  ShieldCheck,
  Terminal,
  Cpu,
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const { profile } = data;

  // Typewriter effect for Name
  const fullName = "Mohamed Riyaskhan S";
  const [typedName, setTypedName] = useState('');

  useEffect(() => {
    if (typedName.length < fullName.length) {
      const timeout = setTimeout(() => {
        setTypedName(fullName.substring(0, typedName.length + 1));
      }, 90);
      return () => clearTimeout(timeout);
    }
  }, [typedName]);

  // Typewriter effect for Tagline Roles
  const roles = [
    'B.Tech IT Student | Web Developer | Innovator',
    'Cyber Security & Ethical Hacking Enthusiast',
    'Hackathon Competitor (Top 5 & 12 Finishes)',
    'Full-Stack Web & AI Developer',
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
    <section className="relative min-h-[85vh] flex flex-col justify-center py-16 md:py-24 bg-[#12343b] bg-night-grid border-b-2 border-[#e1b382]/40 overflow-hidden">
      
      {/* Floating Animated Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-10 w-96 h-96 bg-[#e1b382]/15 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-[#2d545e]/50 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-[#c89666]/20 rounded-full blur-3xl animate-float" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Web Developer Badge */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2d545e] border-2 border-[#e1b382] text-[#e1b382] text-sm font-bold shadow-sand-glow">
                <Code2 className="w-4 h-4 text-[#e1b382]" />
                <span>Web Developer</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#e1b382] animate-ping" />
              </span>
            </div>

            {/* Headline with Typewriter Animation for Name */}
            <div className="space-y-3 min-h-[140px]">
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#ffffff] leading-[1.2] tracking-tight font-['Plus_Jakarta_Sans']">
                {typedName}
                <span className="inline-block w-1 h-10 sm:h-12 bg-[#e1b382] animate-pulse ml-1 align-middle" />
              </h1>
              
              {/* Typewriter Animation for Tagline Roles */}
              <div className="text-lg sm:text-xl font-semibold text-[#e1b382] leading-[1.6] flex items-center min-h-[32px]">
                <span>{displayText}</span>
                <span className="inline-block w-0.5 h-5 bg-[#e1b382] animate-pulse ml-1" />
              </div>
            </div>

            {/* Description Paragraph */}
            <p className="text-base font-normal text-[#cbd5e1] leading-[1.8] max-w-[540px]">
              Second-year B.Tech IT student passionate about software engineering, cyber security, and building intelligent solutions. Active hackathon participant and dedicated continuous learner. Leveraging full-stack web technologies, AI integrations, and secure architecture to solve complex real-world challenges. Constantly expanding technical capabilities through hands-on project engineering and open-source contributions.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {/* Button 1 — Primary */}
              <a
                href={resumePath}
                download="Riyaskhan Final Resume 123.docx"
                onClick={handleDownloadResume}
                className="px-8 py-3.5 bg-[#e1b382] hover:bg-[#ffffff] text-[#12343b] font-bold text-base rounded-xl border-2 border-[#c89666] shadow-sand-glow hover:shadow-sand-glow-lg hover:scale-[1.03] transition-all duration-300 flex items-center gap-2 group"
              >
                <Download className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
                <span>Download Resume</span>
              </a>

              {/* Button 2 — Secondary */}
              <a
                href="#contact"
                className="px-8 py-3.5 border-2 border-[#e1b382] bg-[#2d545e] hover:bg-[#12343b] text-[#e1b382] font-bold text-base rounded-xl shadow-sand-glow hover:scale-[1.03] transition-all duration-300 flex items-center gap-2 group"
              >
                <span>Let's Connect</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

          </div>

          {/* Right Visual (Profile Card with Circular Tech Stack Icons) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group animate-float">
              
              {/* Profile image container */}
              <div className="w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] rounded-3xl bg-[#2d545e] glow-card-running overflow-hidden relative flex items-center justify-center p-2.5 transition-all duration-500">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Tech Icon 1: Top-Left (Web / React / Code) */}
              <div
                className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-[#e1b382] border-2 border-[#c89666] text-[#12343b] flex items-center justify-center shadow-sand-glow animate-bounce"
                title="Web & Full-Stack Development"
              >
                <Code2 className="w-5 h-5 text-[#12343b]" />
              </div>

              {/* Tech Icon 2: Top-Right (Cyber Security) */}
              <div
                className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[#2d545e] border-2 border-[#e1b382] text-[#e1b382] flex items-center justify-center shadow-sand-glow animate-pulse"
                title="Cyber Security & Ethical Hacking"
              >
                <ShieldCheck className="w-5 h-5 text-[#e1b382]" />
              </div>

              {/* Tech Icon 3: Left-Center (Python / Terminal) */}
              <div
                className="absolute top-1/2 -left-5 -translate-y-1/2 w-10 h-10 rounded-full bg-[#12343b] border-2 border-[#e1b382] text-[#e1b382] flex items-center justify-center shadow-sand-glow"
                title="Python Programming & Logic"
              >
                <Terminal className="w-5 h-5 text-[#e1b382]" />
              </div>

              {/* Tech Icon 4: Bottom-Left (AI & Systems) */}
              <div
                className="absolute -bottom-2 -left-3 w-10 h-10 rounded-full bg-[#e1b382] border-2 border-[#c89666] text-[#12343b] flex items-center justify-center shadow-sand-glow"
                title="AI Systems & Optimization"
              >
                <Cpu className="w-5 h-5 text-[#12343b]" />
              </div>

              {/* Floating Badges Overlay (Bottom-Right) */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 flex flex-col gap-2 z-10">
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#e1b382] text-[#12343b] text-xs font-extrabold shadow-sand-glow border-2 border-[#c89666]">
                  <Code2 className="w-4 h-4 text-[#12343b]" />
                  <span>Developer</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#2d545e] text-[#e1b382] text-xs font-bold border-2 border-[#e1b382] shadow-sand-glow">
                  <Award className="w-4 h-4 text-[#e1b382]" />
                  <span>Hackathon Winner</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
