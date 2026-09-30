import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Code2,
  Sparkles,
  ShieldCheck,
  Brain,
  FileSpreadsheet,
  Globe,
  Terminal,
  Cpu,
  Zap,
  CheckCircle2,
  Award,
  Layers,
  ArrowRight,
  Bot,
  Flame,
  Star,
  Database
} from 'lucide-react';

// Custom SVG Icons for Tech Skills
const CIcon = () => (
  <svg className="w-8 h-8 text-[#5C6BC0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6H9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h9" />
    <path d="M14 9h4" />
    <path d="M14 15h4" />
  </svg>
);

const PythonIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.926 0C6.012 0 6.37 2.57 6.37 2.57l.006 2.66h5.666v.81H4.14S0 5.564 0 11.513c0 5.95 3.639 5.73 3.639 5.73h2.17v-3.072s-.118-3.66 3.61-3.66h5.586s3.475.056 3.475-3.396V3.535S18.847 0 11.926 0zM8.91 1.834a1.08 1.08 0 1 1 0 2.16 1.08 1.08 0 0 1 0-2.16zm3.176 22.166c5.914 0 5.556-2.57 5.556-2.57l-.006-2.66H11.97v-.81h7.902s4.14.477 4.14-5.472c0-5.95-3.639-5.73-3.639-5.73h-2.17v3.072s.118 3.66-3.61 3.66H9.007s-3.475-.056-3.475 3.396v3.535S5.165 24 12.086 24zm3.016-1.834a1.08 1.08 0 1 1 0-2.16 1.08 1.08 0 0 1 0 2.16z" fill="#3776AB"/>
  </svg>
);

export const SkillsSection: React.FC = () => {
  const { data } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'all' | 'technical' | 'soft'>('all');

  if (!data.settings.showSkills || data.skills.length === 0) {
    return null;
  }

  // 1. Technical & Programming Skills with Floating Icons
  const technicalSkills = [
    {
      id: 'c-lang',
      name: 'C Language',
      category: 'Core Programming',
      level: 'Foundational & Logic',
      icon: <CIcon />,
      color: '#5C6BC0',
      tag: 'Core Tech',
      rating: 85,
      desc: 'Structured Programming, Memory Allocation & Algorithms'
    },
    {
      id: 'python',
      name: 'Python',
      category: 'Programming & Automation',
      level: 'Proficient',
      icon: <PythonIcon />,
      color: '#3776AB',
      tag: 'Scripting & AI',
      rating: 90,
      desc: 'Data Processing, Scripting, AI Workflows & Logic'
    },
    {
      id: 'web-dev',
      name: 'Web Development',
      category: 'Frontend & UI',
      level: 'Proficient',
      icon: <Globe className="w-8 h-8 text-[#38bdf8]" />,
      color: '#38bdf8',
      tag: 'Fullstack UI',
      rating: 88,
      desc: 'HTML5, CSS3, JavaScript, React & Modern Web Design'
    },
    {
      id: 'ms-office',
      name: 'MS Office Suite',
      category: 'Productivity & Analysis',
      level: 'Certified (Excel)',
      icon: <FileSpreadsheet className="w-8 h-8 text-[#107C41]" />,
      color: '#107C41',
      tag: 'Data & Reports',
      rating: 92,
      desc: 'MS Excel Data Analysis, Word Documentation & Presentations'
    },
    {
      id: 'machine-learning',
      name: 'Machine Learning',
      category: 'Artificial Intelligence',
      level: 'Hands-on Projects',
      icon: <Brain className="w-8 h-8 text-[#AB47BC]" />,
      color: '#AB47BC',
      tag: 'AI & Data',
      rating: 82,
      desc: 'Predictive Modeling, Scikit-Learn & Intelligent Systems'
    },
    {
      id: 'vibe-coding',
      name: 'Vibe Coding',
      category: 'AI-Assisted Dev',
      level: 'Hackathon Champion',
      icon: <Sparkles className="w-8 h-8 text-[#FFD700]" />,
      color: '#FFD700',
      tag: 'Rapid Dev',
      rating: 95,
      desc: 'Rapid Prototyping, Prompt Engineering & Agentic Tooling'
    },
    {
      id: 'cybersecurity',
      name: 'Cybersecurity',
      category: 'Security & Defense',
      level: 'Internship Certified',
      icon: <ShieldCheck className="w-8 h-8 text-[#00E676]" />,
      color: '#00E676',
      tag: 'CodTech Certified',
      rating: 86,
      desc: 'Network Auditing, Security Tools, Vulnerability Scan'
    },
    {
      id: 'database',
      name: 'Database',
      category: 'Data & Storage',
      level: 'Practical Hands-on',
      icon: <Database className="w-8 h-8 text-[#009688]" />,
      color: '#009688',
      tag: 'SQL & Storage',
      rating: 85,
      desc: 'Relational Databases, SQL Queries, Data Modeling & Management'
    }
  ];

  // 2. Soft Skills & Strengths
  const softSkillsRow1 = [
    'Quick Learner',
    'Team Collaboration',
    'Time Management',
    'Adaptability'
  ];

  const softSkillsRow2 = [
    'Curious & Self-Motivated',
    'Consistent Learner',
    'Open to Feedback'
  ];

  const allSoftSkills = [...softSkillsRow1, ...softSkillsRow2];

  return (
    <section id="skills" className="py-[60px] md:py-[80px] bg-[#000000] border-b border-[#2A2A2A] relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#27D6D9]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#F0444B]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header matching Sajid Yaqub Screenshot */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block animate-float-subtle group cursor-default transition-all duration-300">
            <div className="px-6 py-2.5 rounded-2xl bg-[#050505] border border-[#2A2A2A] shadow-xl group-hover:border-[#F0444B] group-hover:shadow-[0_0_20px_rgba(240,68,75,0.3)] group-hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-sm">
              <h2 className="text-3xl sm:text-[36px] font-bold text-[#FFFFFF] font-['Plus_Jakarta_Sans'] tracking-tight">
                Skills & <span className="text-[#F0444B]">Technologies</span>
              </h2>
            </div>
          </div>

          {/* Interactive Dual Option Switcher */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="inline-flex p-1.5 rounded-2xl bg-[#050505] border border-[#2A2A2A] shadow-inner">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                  activeTab === 'all'
                    ? 'bg-[#F0444B] text-white shadow-[0_0_15px_rgba(240,68,75,0.4)]'
                    : 'text-[#BDBDBD] hover:text-[#F0444B]'
                }`}
              >
                All Competencies
              </button>
              <button
                onClick={() => setActiveTab('technical')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 ${
                  activeTab === 'technical'
                    ? 'bg-[#F0444B] text-white shadow-[0_0_15px_rgba(240,68,75,0.4)]'
                    : 'text-[#BDBDBD] hover:text-[#F0444B]'
                }`}
              >
                <Code2 className="w-4 h-4" />
                Technical & Programming Skills
              </button>
              <button
                onClick={() => setActiveTab('soft')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 ${
                  activeTab === 'soft'
                    ? 'bg-[#F0444B] text-white shadow-[0_0_15px_rgba(240,68,75,0.4)]'
                    : 'text-[#BDBDBD] hover:text-[#F0444B]'
                }`}
              >
                <Award className="w-4 h-4" />
                Soft Skills & Strengths
              </button>
            </div>
          </div>
        </div>

        {/* ================= OPTION 1: TECHNICAL & PROGRAMMING SKILLS ================= */}
        {(activeTab === 'all' || activeTab === 'technical') && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Sub-header */}
            <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#050505] border border-[#2A2A2A] text-[#F0444B]">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-['Plus_Jakarta_Sans'] flex items-center gap-2">
                    Technical & Programming Skills
                  </h3>
                </div>
              </div>
            </div>

            {/* Infinite Horizontal Running Marquee Icon Ticker */}
            <div className="relative w-full overflow-hidden py-4 rounded-2xl bg-[#050505]/90 border border-[#2A2A2A] shadow-night-md">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

              <div className="animate-marquee gap-6 items-center">
                {[...technicalSkills, ...technicalSkills, ...technicalSkills].map((skill, idx) => (
                  <div
                    key={`marquee-${skill.id}-${idx}`}
                    className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#000000] border border-[#2A2A2A] hover:border-[#F0444B] hover:shadow-[0_0_15px_rgba(240,68,75,0.3)] transition-all duration-300 shrink-0 group cursor-default"
                  >
                    <div className="p-2 rounded-xl bg-[#050505] border border-[#2A2A2A] group-hover:scale-110 transition-transform">
                      {skill.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#F0444B] transition-colors">
                        {skill.name}
                      </h4>
                      <span className="text-[10px] font-mono text-[#27D6D9]">
                        {skill.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Floating Technical Icon Cards Grid matching Sajid Yaqub Screenshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {technicalSkills.map((skill, idx) => {
                const floatClass = idx % 3 === 0 
                  ? 'animate-float-icon-1' 
                  : idx % 3 === 1 
                  ? 'animate-float-icon-2' 
                  : 'animate-float-icon-3';

                return (
                  <div
                    key={skill.id}
                    className={`bg-[#050505] rounded-2xl p-5 hover:-translate-y-2 transition-all duration-300 space-y-4 group border border-[#2A2A2A] hover:border-[#F0444B] shadow-xl ${floatClass}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-[#000000] border border-[#2A2A2A] group-hover:border-[#F0444B] group-hover:scale-110 transition-all duration-300">
                        {skill.icon}
                      </div>
                      <span className="text-[10px] font-mono text-[#27D6D9] bg-[#000000] px-2.5 py-1 rounded-full border border-[#2A2A2A] font-bold">
                        {skill.tag}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-[#F0444B] transition-colors font-['Plus_Jakarta_Sans']">
                        {skill.name}
                      </h4>
                      <p className="text-xs font-mono text-[#27D6D9] mt-0.5">
                        {skill.category}
                      </p>
                    </div>

                    <p className="text-xs text-[#BDBDBD] leading-relaxed">
                      {skill.desc}
                    </p>

                    {/* Progress indicator bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#BDBDBD] font-medium">{skill.level}</span>
                        <span className="font-mono text-[#F0444B] font-bold">{skill.rating}%</span>
                      </div>
                      <div className="w-full bg-[#000000] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#F0444B] to-[#FF6B6B] h-full rounded-full transition-all duration-1000 group-hover:shadow-[0_0_10px_#F0444B]"
                          style={{ width: `${skill.rating}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ================= OPTION 2: SOFT SKILLS & STRENGTHS ================= */}
        {(activeTab === 'all' || activeTab === 'soft') && (
          <div className="space-y-8 animate-fadeIn pt-4">
            
            {/* Sub-header */}
            <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#050505] border border-[#2A2A2A] text-[#F0444B]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-['Plus_Jakarta_Sans'] flex items-center gap-2">
                    Soft Skills & Strengths
                  </h3>
                </div>
              </div>
            </div>

            {/* Modern Bullet Strengths Box */}
            <div className="bg-[#050505] rounded-3xl p-6 sm:p-8 space-y-6 border border-[#2A2A2A] text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 text-[#27D6D9]/10 pointer-events-none">
                <Sparkles className="w-32 h-32" />
              </div>

              <div className="space-y-4 relative z-10 max-w-4xl mx-auto">
                
                {/* Line 1 Bullet Row */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-sm sm:text-base font-bold text-[#FFFFFF]">
                  {softSkillsRow1.map((item, index) => (
                    <React.Fragment key={item}>
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#000000] border border-[#2A2A2A] hover:border-[#F0444B] hover:text-[#F0444B] hover:shadow-[0_0_15px_rgba(240,68,75,0.3)] transition-all duration-300 cursor-default">
                        <span className="text-[#F0444B] text-lg">•</span>
                        {item}
                      </span>
                      {index < softSkillsRow1.length - 1 && (
                        <span className="text-[#2A2A2A] hidden sm:inline">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Line 2 Bullet Row */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-sm sm:text-base font-bold text-[#FFFFFF]">
                  {softSkillsRow2.map((item, index) => (
                    <React.Fragment key={item}>
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#000000] border border-[#2A2A2A] hover:border-[#F0444B] hover:text-[#F0444B] hover:shadow-[0_0_15px_rgba(240,68,75,0.3)] transition-all duration-300 cursor-default">
                        <span className="text-[#F0444B] text-lg">•</span>
                        {item}
                      </span>
                      {index < softSkillsRow2.length - 1 && (
                        <span className="text-[#2A2A2A] hidden sm:inline">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

              </div>

              {/* Running Marquee Banner for Soft Skills */}
              <div className="relative w-full overflow-hidden py-3 rounded-xl bg-[#000000]/90 border border-[#2A2A2A] mt-4">
                <div className="animate-marquee-reverse gap-4 items-center">
                  {[...allSoftSkills, ...allSoftSkills, ...allSoftSkills].map((skill, idx) => (
                    <div 
                      key={`soft-marquee-${idx}`}
                      className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#050505] border border-[#2A2A2A] text-xs font-bold text-[#27D6D9] shrink-0"
                    >
                      <Star className="w-3 h-3 text-[#27D6D9]" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};


