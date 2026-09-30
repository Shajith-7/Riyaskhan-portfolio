import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenArchitecture: () => void;
  onGoToAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onGoToAdmin }) => {
  const { data, isAdmin } = usePortfolio();

  return (
    <footer className="bg-[#000000] border-t border-[#2A2A2A] pt-12 pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="mx-auto max-w-7xl">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#2A2A2A]">
          
          {/* Column 1 — Branding & Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F0444B] text-white font-extrabold flex items-center justify-center font-['Plus_Jakarta_Sans'] text-base shadow-lg">
                MR
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#FFFFFF] font-['Plus_Jakarta_Sans']">
                  Mohamed Riyaskhan S
                </h3>
                <p className="text-xs font-semibold text-[#27D6D9]">
                  B.Tech IT Student · Rathinam Technical Campus
                </p>
              </div>
            </div>
            
            <p className="text-xs text-[#BDBDBD] leading-relaxed max-w-sm">
              B.Tech Information Technology student specializing in Cybersecurity, AI solutions, and Web Engineering. Open for engineering internships and technical collaborations.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold text-[#F0444B] uppercase tracking-wider font-mono">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-[#BDBDBD]">
              <li><a href="#about" className="hover:text-[#F0444B] transition-colors flex items-center gap-1"><span>About Me</span></a></li>
              <li><a href="#projects" className="hover:text-[#F0444B] transition-colors flex items-center gap-1"><span>Projects & Hackathons</span></a></li>
              <li><a href="#education" className="hover:text-[#F0444B] transition-colors flex items-center gap-1"><span>Education</span></a></li>
              <li><a href="#experience" className="hover:text-[#F0444B] transition-colors flex items-center gap-1"><span>Internships</span></a></li>
              <li><a href="#skills" className="hover:text-[#F0444B] transition-colors flex items-center gap-1"><span>Skills & Technologies</span></a></li>
              <li><a href="#contact" className="hover:text-[#F0444B] transition-colors flex items-center gap-1"><span>Get in Touch</span></a></li>
              <li>
                <button onClick={onGoToAdmin} className="hover:text-[#FF6B6B] transition-colors flex items-center gap-1 text-[#F0444B] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isAdmin ? 'Admin Studio CMS' : 'Admin Portal Login'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 — Contact & Location */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-extrabold text-[#F0444B] uppercase tracking-wider font-mono">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs font-medium text-[#BDBDBD]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#27D6D9] shrink-0" />
                <span>Coimbatore, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#27D6D9] shrink-0" />
                <a href={`mailto:${data.profile.email}`} className="hover:text-[#F0444B] hover:underline">
                  {data.profile.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#27D6D9] shrink-0" />
                <a href={`tel:${data.profile.phone}`} className="hover:text-[#F0444B] hover:underline">
                  {data.profile.phone}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar — Sajid Yaqub Style Clean Copyright Statement */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-[#BDBDBD]">
          <div>
            Copyright © {new Date().getFullYear()} <strong className="text-[#FFFFFF]">{data.profile.name}</strong> | All Rights Reserved
          </div>
          <div className="flex items-center gap-3 text-[11px] text-[#27D6D9] font-mono">
            <span>B.Tech IT Portfolio</span>
            <span>·</span>
            <button onClick={onGoToAdmin} className="hover:underline text-[#27D6D9] font-bold">
              Admin Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};



