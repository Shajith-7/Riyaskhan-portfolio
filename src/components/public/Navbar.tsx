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
    <header className="sticky top-0 z-40 w-full h-[75px] border-b-2 border-[#e1b382]/40 bg-[#12343b]/90 backdrop-blur-md transition-all shadow-[0_4px_20px_rgba(225,179,130,0.15)]">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Side (Logo) */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center px-3.5 py-1.5 bg-[#e1b382] border-2 border-[#c89666] rounded-xl text-[#12343b] font-extrabold text-lg tracking-tight shadow-sand-glow group-hover:bg-[#ffffff] group-hover:text-[#12343b] transition-all duration-300">
            MR
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-base text-[#ffffff] group-hover:text-[#e1b382] transition-colors font-['Plus_Jakarta_Sans']">
              {data.profile.name}
            </span>
            <span className="text-[11px] text-[#e1b382] font-mono">
              B.Tech IT · Coimbatore
            </span>
          </div>
        </a>

        {/* Center (Navigation Links) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#f3e8d6]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[#f3e8d6] hover:text-[#e1b382] hover:underline decoration-2 underline-offset-8 transition-all text-sm font-medium hover:scale-105"
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
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#12343b] bg-[#e1b382] hover:bg-[#ffffff] border-2 border-[#c89666] rounded-xl shadow-sand-glow transition-all hover:scale-105"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Studio</span>
                {unreadCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 bg-[#12343b] text-[#e1b382] font-bold text-[10px] rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 text-xs text-[#e1b382] hover:text-[#ffffff] border border-[#c89666] rounded-xl hover:bg-[#2d545e]"
              >
                Exit
              </button>
            </div>
          ) : (
            <button
              onClick={onGoToAdmin}
              className="px-4 py-2 text-xs font-bold text-[#e1b382] hover:text-[#12343b] border-2 border-[#e1b382] hover:bg-[#e1b382] rounded-xl shadow-sand-glow transition-all duration-300 flex items-center gap-1.5 hover:scale-105"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Portal</span>
            </button>
          )}

          <a
            href="#contact"
            className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-[#12343b] bg-[#e1b382] hover:bg-[#ffffff] border-2 border-[#c89666] rounded-xl shadow-sand-glow transition-all hover:scale-105"
          >
            <span>Let's Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile (Hamburger Menu) */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onGoToAdmin}
            className="p-2 text-[#e1b382]"
            aria-label="Admin Portal"
          >
            <ShieldCheck className="w-6 h-6" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#ffffff] hover:text-[#e1b382]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[75px] bg-[#12343b] border-b-2 border-[#e1b382] px-6 py-6 space-y-4 shadow-night-md">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#ffffff] hover:text-[#e1b382] text-base font-medium py-1 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-[#2d545e] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onGoToAdmin();
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-[#e1b382] border-2 border-[#e1b382] rounded-xl"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Portal</span>
            </button>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-bold text-[#12343b] bg-[#e1b382] rounded-xl"
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
