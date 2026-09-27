import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Download } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { data } = usePortfolio();
  const { profile } = data;

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

  const stats = [
    { number: '2nd Year', label: 'B.Tech IT Student' },
    { number: '3', label: 'Hackathon Awards' },
    { number: '10+', label: 'Certifications Earned' },
    { number: '6 Weeks', label: 'Internship Completed' },
  ];

  return (
    <section id="about" className="py-[60px] md:py-[80px] bg-[#12343b] border-b-2 border-[#e1b382]/40 relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-[#e1b382]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (Profile Image with Glowing Running Border) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] rounded-3xl bg-[#2d545e] glow-card-running p-2.5 flex items-center justify-center transition-all duration-300 hover:scale-[1.03]">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Right Column (Text) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Section Title */}
            <div>
              <h2 className="text-3xl sm:text-[36px] font-bold text-[#ffffff] mb-6 font-['Plus_Jakarta_Sans'] tracking-tight">
                About <span className="text-[#e1b382]">Me</span>
              </h2>
              
              <p className="text-base font-regular text-[#f3e8d6] leading-[1.8] mb-4 text-justify">
                I am a 2nd-year B.Tech Information Technology student at Rathinam Technical Campus in Coimbatore. Driven by curiosity and a hands-on learning mindset, I build intelligent web applications, solve complex software logic problems, and explore cyber security defense strategies.
              </p>

              <p className="text-base font-regular text-[#f3e8d6] leading-[1.8] mb-4 text-justify">
                Leveraging full-stack web technologies, AI integrations, and secure architecture, I build resilient applications designed to solve real-world engineering challenges. Constantly expanding technical capabilities through competitive hackathons and open-source contributions.
              </p>

              <p className="text-base font-regular text-[#f3e8d6] leading-[1.8] mb-4 text-justify">
                Through competitive hackathons, I have developed award-winning projects like Selavu Sherlock AI (Top 5th Place @ Corexathon 2.0) and BioArbitrage (Top 12th Place @ Inno Hack 2.0). I thrive in collaborative sprint environments and am eager to contribute to real-world software teams.
              </p>

              <div className="pt-1 mb-6">
                <a
                  href={resumePath}
                  download="Riyaskhan Final Resume 123.docx"
                  onClick={handleDownloadResume}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#e1b382] hover:bg-[#ffffff] text-[#12343b] font-bold text-xs sm:text-sm rounded-xl border-2 border-[#c89666] shadow-sand-glow hover:scale-105 transition-all duration-300 group"
                >
                  <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                  <span>Download Resume (.docx)</span>
                </a>
              </div>
            </div>

            {/* Quick Stats Grid with Running Glow Borders */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-[#2d545e] glow-card-running p-5 rounded-[18px] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="text-2xl sm:text-[26px] font-extrabold text-[#e1b382] leading-tight font-['Plus_Jakarta_Sans'] h-[38px] flex items-center">
                    {stat.number}
                  </div>
                  <div className="text-xs font-semibold text-[#f3e8d6] mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
