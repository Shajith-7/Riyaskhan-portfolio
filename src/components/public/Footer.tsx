import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <footer className="bg-[#12343b] border-t-2 border-[#e1b382]/40 pt-12 pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="mx-auto max-w-7xl">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#c89666]/50">
          
          {/* Column 1 — Branding & Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#e1b382] text-[#12343b] font-extrabold flex items-center justify-center font-['Plus_Jakarta_Sans'] text-base shadow-sand-glow">
                MR
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#ffffff] font-['Plus_Jakarta_Sans']">
                  Mohamed Riyaskhan S
                </h3>
                <p className="text-xs font-semibold text-[#e1b382]">
                  B.Tech IT Student · Rathinam Technical Campus
                </p>
              </div>
            </div>
            
            <p className="text-xs text-[#f3e8d6] leading-relaxed max-w-sm">
              Second-year Information Technology student specializing in web engineering, AI solutions, and cyber security defense. Open for engineering internships and technical collaborations.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold text-[#e1b382] uppercase tracking-wider font-mono">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-[#f3e8d6]">
              <li><a href="#about" className="hover:text-[#e1b382] transition-colors flex items-center gap-1"><span>About Me</span></a></li>
              <li><a href="#projects" className="hover:text-[#e1b382] transition-colors flex items-center gap-1"><span>Projects & Case Studies</span></a></li>
              <li><a href="#education" className="hover:text-[#e1b382] transition-colors flex items-center gap-1"><span>Education</span></a></li>
              <li><a href="#experience" className="hover:text-[#e1b382] transition-colors flex items-center gap-1"><span>Internships</span></a></li>
              <li><a href="#skills" className="hover:text-[#e1b382] transition-colors flex items-center gap-1"><span>Skills & Competencies</span></a></li>
              <li><a href="#contact" className="hover:text-[#e1b382] transition-colors flex items-center gap-1"><span>Get in Touch</span></a></li>
            </ul>
          </div>

          {/* Column 3 — Contact & Location */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-extrabold text-[#e1b382] uppercase tracking-wider font-mono">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs font-medium text-[#f3e8d6]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#e1b382] shrink-0" />
                <span>Coimbatore, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#e1b382] shrink-0" />
                <a href={`mailto:${data.profile.email}`} className="hover:text-[#e1b382] hover:underline">
                  {data.profile.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#e1b382] shrink-0" />
                <a href={`tel:${data.profile.phone}`} className="hover:text-[#e1b382] hover:underline">
                  {data.profile.phone}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar — Clean Copyright Statement */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-[#f3e8d6]">
          <div>
            © {new Date().getFullYear()} <strong className="text-[#ffffff]">{data.profile.name}</strong>. All rights reserved.
          </div>
          <div className="text-[11px] text-[#e1b382] font-mono">
            B.Tech Information Technology Portfolio & Integrated CMS
          </div>
        </div>

      </div>
    </footer>
  );
};

