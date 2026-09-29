import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ShieldCheck, Cpu, Zap, Trophy, GraduationCap, Mail, MessageSquare, Send } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { data } = usePortfolio();
  const { profile } = data;

  const quickCapabilities = [
    { text: 'Cybersecurity & Ethical Hacking', icon: ShieldCheck },
    { text: 'AI & Intelligent Systems Development', icon: Cpu },
    { text: 'Python & Web Engineering', icon: Zap },
    { text: 'Hackathon Competitor (Top 5 & 12)', icon: Trophy },
    { text: 'B.Tech IT (2024–2028)', icon: GraduationCap },
  ];

  return (
    <section id="about" className="py-[60px] md:py-[80px] bg-[#12343b] border-b-2 border-[#e1b382]/40 relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#e1b382]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#2d545e]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Dark Profile Card & Quick Contact Card matching Screenshot */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start space-y-6">
            
            {/* Profile Card */}
            <div className="w-full max-w-md bg-[#2d545e]/90 glow-card-running rounded-3xl p-6 sm:p-8 space-y-6 border border-[#c89666]/40 shadow-2xl backdrop-blur-sm text-center sm:text-left">
              
              {/* Circular Avatar with Glowing Ring Gradient */}
              <div className="flex justify-center sm:justify-start">
                <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-[#e1b382] via-[#c89666] to-[#ffffff] shadow-sand-glow">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover rounded-full bg-[#12343b]"
                  />
                </div>
              </div>

              {/* Name & Title */}
              <div className="space-y-1">
                <h3 className="text-2xl font-extrabold text-[#ffffff] font-['Plus_Jakarta_Sans'] tracking-tight">
                  Mohamed Riyaskhan S
                </h3>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#e1b382]">
                  B.Tech IT Student & Developer
                </div>
              </div>

              {/* Competencies List */}
              <div className="pt-4 border-t border-[#c89666]/40 space-y-3">
                {quickCapabilities.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div 
                      key={idx} 
                      className="flex items-center gap-3 text-xs font-semibold text-[#f3e8d6] group hover:text-[#e1b382] transition-colors"
                    >
                      <div className="p-1.5 rounded-lg bg-[#12343b] border border-[#c89666]/40 text-[#e1b382] shrink-0 group-hover:bg-[#e1b382] group-hover:text-[#12343b] transition-colors">
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-snug">{item.text}</span>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Quick Contact Card in Empty Space Below Profile Card */}
            <div className="w-full max-w-md bg-[#2d545e]/90 glow-card-running rounded-3xl p-5 sm:p-6 space-y-4 border border-[#c89666]/40 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-2 border-b border-[#c89666]/30 pb-3">
                <div className="p-1.5 rounded-lg bg-[#12343b] text-[#e1b382] border border-[#c89666]/40">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono font-extrabold uppercase text-[#e1b382] tracking-wider">
                  QUICK CONTACT & REACH OUT
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {/* Email Contact Button */}
                <a
                  href={`mailto:${profile.email || 'mriyaskhan254@gmail.com'}`}
                  className="p-3 rounded-xl bg-[#12343b] hover:bg-[#e1b382] text-[#f3e8d6] hover:text-[#12343b] border border-[#c89666]/40 transition-all duration-300 flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Mail className="w-4 h-4 text-[#e1b382] group-hover:text-[#12343b] shrink-0" />
                    <div className="truncate">
                      <div className="text-[10px] font-mono text-[#e1b382] group-hover:text-[#12343b] uppercase font-bold">Contact Me (Email)</div>
                      <div className="text-xs font-semibold truncate">{profile.email || 'mriyaskhan254@gmail.com'}</div>
                    </div>
                  </div>
                  <Send className="w-3.5 h-3.5 shrink-0 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* WhatsApp Text Button */}
                <a
                  href={`https://wa.me/${(profile.phone || '+91 9150900577').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#12343b] hover:bg-[#e1b382] text-[#f3e8d6] hover:text-[#12343b] border border-[#c89666]/40 transition-all duration-300 flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <MessageSquare className="w-4 h-4 text-[#e1b382] group-hover:text-[#12343b] shrink-0" />
                    <div className="truncate">
                      <div className="text-[10px] font-mono text-[#e1b382] group-hover:text-[#12343b] uppercase font-bold">Text Me (WhatsApp)</div>
                      <div className="text-xs font-semibold truncate">{profile.phone || '+91 9150900577'}</div>
                    </div>
                  </div>
                  <Send className="w-3.5 h-3.5 shrink-0 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Bio Paragraphs & Career Objective Box */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Section Title */}
            <div>
              <div className="inline-block animate-float-subtle group cursor-default transition-all duration-300 mb-6">
                <div className="px-6 py-2.5 rounded-2xl bg-[#2d545e]/50 border border-[#c89666]/40 shadow-xl group-hover:border-[#e1b382] group-hover:shadow-sand-glow group-hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-sm">
                  <h2 className="text-3xl sm:text-[36px] font-bold text-[#ffffff] font-['Plus_Jakarta_Sans'] tracking-tight">
                    About <span className="text-[#e1b382] group-hover:drop-shadow-[0_0_12px_rgba(225,179,130,0.8)] transition-all">Me</span>
                  </h2>
                </div>
              </div>
              
              {/* User Requested Exact Bio Text */}
              <div className="space-y-4 text-base font-regular text-[#f3e8d6] leading-[1.8] text-justify">
                <p>
                  Hi, I'm <strong className="text-white">Mohamed Riyaskhan S</strong>, a passionate <strong className="text-[#e1b382]">B.Tech Information Technology student</strong> at <strong className="text-white">Rathinam Technical Campus, Coimbatore</strong>, with a strong interest in <strong className="text-white">Cybersecurity</strong>, <strong className="text-white">Artificial Intelligence</strong>, and <strong className="text-white">Software Development</strong>.
                </p>

                <p>
                  I enjoy exploring emerging technologies, solving real-world problems, and building innovative solutions through hands-on projects and hackathons. I have participated in several competitive hackathons, earning <strong className="text-[#e1b382]">Top 5th Place at Corexathon 2.0</strong> and <strong className="text-[#e1b382]">Top 12th Place at Inno Hack 2.0</strong>, where I collaborated with teams to develop AI-powered solutions.
                </p>

                <p>
                  I recently completed a <strong className="text-white">6-week Cybersecurity and Ethical Hacking internship at CodTech IT Solutions</strong>, gaining practical exposure to network security, vulnerability assessment, and security tools. I'm also continuously improving my skills in Python, web development, and AI technologies.
                </p>

                <p>
                  As a curious and self-motivated learner, I believe in continuous growth, teamwork, and turning ideas into practical solutions. My goal is to become a skilled technology professional who builds meaningful, secure, and innovative digital experiences.
                </p>

                <div className="pt-2">
                  <span className="text-xs font-mono font-extrabold text-[#e1b382] bg-[#2d545e]/60 px-4 py-2 rounded-xl border border-[#c89666]/40 inline-block shadow-sm">
                    Always learning. Always building. Always growing.
                  </span>
                </div>
              </div>
            </div>

            {/* Career Objective Box matching Screenshot */}
            <div className="bg-[#2d545e]/80 rounded-2xl p-5 sm:p-6 border border-[#c89666]/40 border-l-4 border-l-[#e1b382] shadow-xl space-y-3 backdrop-blur-sm">
              <span className="text-xs font-mono font-extrabold uppercase text-[#e1b382] tracking-wider">
                CAREER OBJECTIVE
              </span>
              <div className="space-y-2 text-xs sm:text-sm font-semibold text-[#ffffff] font-mono leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-[#e1b382] shrink-0 font-bold">&gt;&gt;</span>
                  <span>Seeking opportunities as a Cybersecurity Trainee, AI/Software Developer, or Web Engineering Intern.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#e1b382] shrink-0 font-bold">&gt;&gt;</span>
                  <span>Available for internships, technical projects & hackathon collaborations.</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
