import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Code2,
  Network,
  Sparkles,
  UserCheck,
  Cpu,
  CheckCircle2,
  ShieldCheck,
  Terminal,
  Zap,
  Award,
  Layers
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { data } = usePortfolio();

  if (!data.settings.showSkills || data.skills.length === 0) {
    return null;
  }

  // Curated Professional Categories combining initial data and verified credentials
  const coreProgramming = [
    { name: 'Python', level: 'Proficient', rating: 85 },
    { name: 'C Programming', level: 'Foundational', rating: 75 },
    { name: 'HTML & CSS Web Basics', level: 'Proficient', rating: 80 },
    { name: 'Logic Building & Algorithms', level: 'Advanced', rating: 88 },
    { name: 'MS Excel Data Analysis', level: 'Certified', rating: 90 },
  ];

  const networkingSecurity = [
    { name: 'Cisco Packet Tracer', level: 'Certified', rating: 85 },
    { name: 'Network Addressing (IPv4/IPv6)', level: 'Certified', rating: 85 },
    { name: 'Basic Troubleshooting & Subnetting', level: 'Certified', rating: 82 },
    { name: 'Malware Guard & File Integrity', level: 'Internship Hands-on', rating: 80 },
    { name: 'Linux Basics & Shell Command', level: 'Practical', rating: 75 },
  ];

  const emergingTech = [
    { name: 'Agentic AI & LLM Workflows', level: 'IIT Madras Workshop', tag: 'IIT Madras' },
    { name: 'Generative AI Studio', level: 'Simplilearn Certified', tag: 'Simplilearn' },
    { name: 'SQL & Python Data Analytics', level: 'IIT Top Engineers', tag: 'IIT Workshop' },
    { name: 'Salesforce Admin & App Builder', level: 'Simplilearn Certified', tag: 'Salesforce' },
    { name: 'Vibe Coding & Rapid Pitching', level: 'Hackathon Champion', tag: 'Hackathons' },
  ];

  const professionalStrengths = [
    'Hackathon Sprint Execution',
    'Team Collaboration & Leadership',
    'Technical Case Study Analysis',
    'Rapid Prototyping & Pitching',
    'Problem Solving Mindset',
    'Continuous Self-Learning',
  ];

  return (
    <section id="skills" className="py-[60px] md:py-[80px] bg-[#12343b] border-b-2 border-[#e1b382]/40 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#e1b382]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#2d545e]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-block animate-float-subtle group cursor-default transition-all duration-300">
            <div className="px-6 py-2.5 rounded-2xl bg-[#2d545e]/50 border border-[#c89666]/40 shadow-xl group-hover:border-[#e1b382] group-hover:shadow-sand-glow group-hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-sm">
              <h2 className="text-3xl sm:text-[36px] font-bold text-[#ffffff] font-['Plus_Jakarta_Sans'] tracking-tight">
                Skills & <span className="text-[#e1b382] group-hover:drop-shadow-[0_0_12px_rgba(225,179,130,0.8)] transition-all">Technical Proficiencies</span>
              </h2>
            </div>
          </div>
          <p className="text-base font-regular text-[#f3e8d6]">
            Verified competencies, networking certifications, software tools, and professional strengths
          </p>
        </div>

        {/* 2x2 Professional Competency Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          
          {/* 1. Programming & Core Software Logic */}
          <div className="bg-[#2d545e] glow-card-running rounded-[24px] p-6 sm:p-7 hover:-translate-y-1 transition-all duration-300 space-y-5 group border border-[#c89666]/30 hover:border-[#e1b382]">
            <div className="flex items-center justify-between border-b border-[#c89666]/40 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#12343b] border border-[#c89666] text-[#e1b382] group-hover:bg-[#e1b382] group-hover:text-[#12343b] transition-colors duration-300 shadow-sand-glow">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                    Programming & Software Core
                  </h3>
                  <span className="text-xs font-mono text-[#e1b382]">
                    Languages, Logic & Web Foundations
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#e1b382] bg-[#12343b] px-2.5 py-1 rounded-full border border-[#c89666]/40">
                Core Tech
              </span>
            </div>

            <div className="space-y-3">
              {coreProgramming.map((skill) => (
                <div 
                  key={skill.name}
                  className="p-3 rounded-xl bg-[#12343b]/90 border border-[#c89666]/30 hover:border-[#e1b382] transition-all group/item space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#ffffff] group-hover/item:text-[#e1b382] transition-colors flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#e1b382]" />
                      {skill.name}
                    </span>
                    <span className="font-mono text-[10px] text-[#e1b382] bg-[#2d545e] px-2 py-0.5 rounded border border-[#c89666]/30">
                      {skill.level}
                    </span>
                  </div>
                  {/* Visual Progress Line */}
                  <div className="w-full bg-[#2d545e] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-[#c89666] to-[#e1b382] h-full rounded-full transition-all duration-1000 group-hover/item:shadow-[0_0_8px_#e1b382]"
                      style={{ width: `${skill.rating}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Networking & Cyber Security */}
          <div className="bg-[#2d545e] glow-card-running rounded-[24px] p-6 sm:p-7 hover:-translate-y-1 transition-all duration-300 space-y-5 group border border-[#c89666]/30 hover:border-[#e1b382]">
            <div className="flex items-center justify-between border-b border-[#c89666]/40 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#12343b] border border-[#c89666] text-[#e1b382] group-hover:bg-[#e1b382] group-hover:text-[#12343b] transition-colors duration-300 shadow-sand-glow">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                    Networking & Cyber Security
                  </h3>
                  <span className="text-xs font-mono text-[#e1b382]">
                    Cisco, TCP/IP & Threat Defense
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#e1b382] bg-[#12343b] px-2.5 py-1 rounded-full border border-[#c89666]/40">
                Security
              </span>
            </div>

            <div className="space-y-3">
              {networkingSecurity.map((skill) => (
                <div 
                  key={skill.name}
                  className="p-3 rounded-xl bg-[#12343b]/90 border border-[#c89666]/30 hover:border-[#e1b382] transition-all group/item space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#ffffff] group-hover/item:text-[#e1b382] transition-colors flex items-center gap-2">
                      <Network className="w-3.5 h-3.5 text-[#e1b382]" />
                      {skill.name}
                    </span>
                    <span className="font-mono text-[10px] text-[#e1b382] bg-[#2d545e] px-2 py-0.5 rounded border border-[#c89666]/30">
                      {skill.level}
                    </span>
                  </div>
                  {/* Visual Progress Line */}
                  <div className="w-full bg-[#2d545e] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-[#c89666] to-[#e1b382] h-full rounded-full transition-all duration-1000 group-hover/item:shadow-[0_0_8px_#e1b382]"
                      style={{ width: `${skill.rating}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Emerging Technologies & Specializations */}
          <div className="bg-[#2d545e] glow-card-running rounded-[24px] p-6 sm:p-7 hover:-translate-y-1 transition-all duration-300 space-y-5 group border border-[#c89666]/30 hover:border-[#e1b382]">
            <div className="flex items-center justify-between border-b border-[#c89666]/40 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#12343b] border border-[#c89666] text-[#e1b382] group-hover:bg-[#e1b382] group-hover:text-[#12343b] transition-colors duration-300 shadow-sand-glow">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                    Emerging Tech & AI Specializations
                  </h3>
                  <span className="text-xs font-mono text-[#e1b382]">
                    Agentic AI, GenAI & Cloud CRM
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#e1b382] bg-[#12343b] px-2.5 py-1 rounded-full border border-[#c89666]/40">
                Advanced
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {emergingTech.map((item) => (
                <div
                  key={item.name}
                  className="p-3 rounded-xl bg-[#12343b] border border-[#c89666]/30 hover:border-[#e1b382] flex items-center justify-between text-xs font-bold text-[#f3e8d6] hover:text-[#e1b382] transition-all cursor-default"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-[#e1b382]" />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-[10px] font-mono bg-[#e1b382] text-[#12343b] px-2 py-0.5 rounded font-extrabold shadow-sm">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Professional Strengths & Soft Skills */}
          <div className="bg-[#2d545e] glow-card-running rounded-[24px] p-6 sm:p-7 hover:-translate-y-1 transition-all duration-300 space-y-5 group border border-[#c89666]/30 hover:border-[#e1b382]">
            <div className="flex items-center justify-between border-b border-[#c89666]/40 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#12343b] border border-[#c89666] text-[#e1b382] group-hover:bg-[#e1b382] group-hover:text-[#12343b] transition-colors duration-300 shadow-sand-glow">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                    Professional Strengths & Leadership
                  </h3>
                  <span className="text-xs font-mono text-[#e1b382]">
                    Sprint Execution & Collaboration
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#e1b382] bg-[#12343b] px-2.5 py-1 rounded-full border border-[#c89666]/40">
                Workplace
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {professionalStrengths.map((strength) => (
                <div
                  key={strength}
                  className="p-3 rounded-xl bg-[#12343b] border border-[#c89666]/40 text-xs font-bold text-[#f3e8d6] hover:border-[#e1b382] hover:text-[#e1b382] hover:scale-[1.02] transition-all flex items-center gap-2 cursor-default shadow-sm"
                >
                  <Award className="w-3.5 h-3.5 text-[#e1b382] shrink-0" />
                  <span>{strength}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
