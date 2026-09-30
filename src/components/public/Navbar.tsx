import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  ShieldCheck,
  Menu,
  X,
  ArrowUpRight,
} from 'lucide-react';

interface NavbarProps {
  onOpenArchitecture: () => void;
  onGoToAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onGoToAdmin }) => {
  const { data, isAdmin, logoutAdmin } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Internship', href: '#experience' },
    { name: 'Certifications', href: '#workshops-certs' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const unreadCount = data.inquiries.filter((i) => i.status === 'unread').length;

  return (
    <header className="sticky top-0 z-40 w-full h-[75px] border-b border-[#2A2A2A] bg-[#000000]/95 backdrop-blur-md transition-all shadow-night-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Side (Logo) */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center px-3.5 py-1.5 bg-[#F0444B] hover:bg-[#FF6B6B] rounded-xl text-white font-extrabold text-lg tracking-tight shadow-[0_0_15px_rgba(240,68,75,0.4)] group-hover:scale-105 transition-all duration-300">
            MR
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-base text-white group-hover:text-[#F0444B] transition-colors font-['Plus_Jakarta_Sans']">
              {data.profile.name.split(' ')[0]} <span className="text-[#F0444B]">{data.profile.name.split(' ').slice(1).join(' ')}</span>
            </span>
            <span className="text-[11px] text-[#BDBDBD] font-mono">
              B.Tech IT · Cybersecurity & AI
            </span>
          </div>
        </a>

        {/* Center (Navigation Links) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#BDBDBD]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[#BDBDBD] hover:text-[#F0444B] hover:underline decoration-2 underline-offset-8 transition-all text-sm font-medium hover:scale-105"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Side (Action) */}
        <div className="hidden sm:flex items-center gap-3">
          {isAdmin ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onGoToAdmin}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#1B1B1B] border border-[#F0444B]/50 hover:border-[#FF6B6B] rounded-xl shadow-sand-glow transition-all hover:scale-105"
              >
                <ShieldCheck className="w-4 h-4 text-[#F0444B]" />
                <span>Admin Studio</span>
                {unreadCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 bg-[#F0444B] text-white font-bold text-[10px] rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 text-xs text-[#BDBDBD] hover:text-white border border-[#2A2A2A] rounded-xl hover:bg-[#1B1B1B]"
              >
                Exit
              </button>
            </div>
          ) : (
            <button
              onClick={onGoToAdmin}
              className="px-4 py-2 text-xs font-bold text-[#F0444B] hover:text-white border border-[#F0444B]/50 hover:bg-[#F0444B]/10 rounded-xl transition-all duration-300 flex items-center gap-1.5 hover:scale-105"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Portal</span>
            </button>
          )}

          <a
            href="#contact"
            className="flex items-center gap-1 px-5 py-2 text-xs font-bold text-white bg-[#F0444B] hover:bg-[#FF6B6B] rounded-full shadow-[0_0_18px_rgba(240,68,75,0.45)] hover:shadow-[0_0_25px_rgba(255,107,107,0.65)] transition-all hover:scale-105 active:scale-95"
          >
            <span>Let's Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white" />
          </a>
        </div>

        {/* Mobile (Hamburger Menu) */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onGoToAdmin}
            className="p-2 text-[#F0444B]"
            aria-label="Admin Portal"
          >
            <ShieldCheck className="w-6 h-6" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-[#F0444B]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[75px] bg-[#050505] border-b border-[#2A2A2A] px-6 py-6 space-y-4 shadow-night-md">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#BDBDBD] hover:text-[#F0444B] text-base font-medium py-1 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-[#2A2A2A] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onGoToAdmin();
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-[#F0444B] border border-[#F0444B]/50 rounded-xl"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Portal</span>
            </button>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-bold text-white bg-[#F0444B] rounded-xl"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
