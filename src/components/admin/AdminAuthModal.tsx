import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, KeyRound, Sparkles, Eye, EyeOff } from 'lucide-react';

export const AdminAuthModal: React.FC = () => {
  const { openAdminModal, setOpenAdminModal, loginAdmin } = usePortfolio();
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');

  if (!openAdminModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) {
      setError('Please enter your admin PIN.');
      return;
    }
    const success = loginAdmin(pin.trim());
    if (success) {
      setError('');
      setPin('');
      setTimeout(() => {
        const el = document.getElementById('admin-dashboard');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setError('Invalid PIN code. Default demo PIN is: admin123');
    }
  };

  const handleQuickUnlock = () => {
    setPin('admin123');
    loginAdmin('admin123');
    setTimeout(() => {
      const el = document.getElementById('admin-dashboard');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl rounded-3xl bg-[#090205] border border-[#F0444B]/40 shadow-[0_0_60px_rgba(240,68,75,0.4)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setOpenAdminModal(false)}
          className="absolute top-4 right-4 z-20 p-2 text-[#BDBDBD] hover:text-[#FFFFFF] bg-black/60 rounded-full border border-[#2A2A2A] hover:border-[#F0444B] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Body: Grid layout (Spider Animation Left, Admin Password Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center p-6 sm:p-10 gap-6">
          
          {/* Left Column: Spider-Man Emblem Image & Web Overlay */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center text-center p-4">
            <div className="relative w-56 h-64 sm:w-72 sm:h-80 flex items-center justify-center">
              
              {/* Web SVG radiating from spider legs */}
              <svg className="absolute inset-0 w-full h-full text-[#F0444B]/35 overflow-visible" viewBox="0 0 300 350" fill="none">
                <path d="M 30 40 Q 150 -10 270 40 Q 310 175 270 310 Q 150 360 30 310 Q -10 175 30 40 Z" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="60" y1="60" x2="-30" y2="-30" stroke="currentColor" strokeWidth="1.5" />
                <line x1="240" y1="60" x2="330" y2="-30" stroke="currentColor" strokeWidth="1.5" />
                <line x1="50" y1="240" x2="-40" y2="280" stroke="currentColor" strokeWidth="1.5" />
                <line x1="250" y1="240" x2="340" y2="280" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="60" cy="60" r="3" fill="#F0444B" className="animate-ping" />
                <circle cx="240" cy="60" r="3" fill="#F0444B" className="animate-ping" />
              </svg>

              {/* Uploaded Spider-Man Emblem Image */}
              <img
                src="/images/spiderman-emblem.png"
                alt="Spider-Man Emblem"
                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(240,68,75,0.9)] animate-float-subtle"
              />
            </div>

            <div className="space-y-1 mt-2">
              <span className="text-[10px] font-mono text-[#27D6D9] uppercase font-bold tracking-widest">
                WELCOME HERO
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight uppercase font-['Plus_Jakarta_Sans']">
                SPIDER HERO AUTHENTICATION
              </h3>
            </div>
          </div>

          {/* Right Column: Password Form */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-1 border-b border-[#F0444B]/30 pb-3">
              <span className="text-[10px] font-mono text-[#27D6D9] font-bold">@SL_TECH_JOURNAL</span>
              <h3 className="text-xl font-bold text-white">
                Admin <span className="text-[#F0444B]">Password</span>
              </h3>
              <p className="text-xs text-[#BDBDBD]">
                Enter admin security PIN to unlock CMS Studio
              </p>
            </div>

            {error && (
              <div className="p-3 text-xs text-red-200 bg-red-950/80 border border-red-700 rounded-xl text-center font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#27D6D9] uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <KeyRound className="w-4 h-4 text-[#F0444B]" />
                    Admin Password / PIN
                  </span>
                </label>
                
                <div className="relative">
                  <input
                    type={showPin ? 'text' : 'password'}
                    required
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter password..."
                    className="w-full rounded-2xl border border-[#F0444B]/40 focus:border-[#F0444B] bg-[#000000] px-4 py-3.5 pr-12 text-lg font-mono text-white placeholder:text-neutral-600 focus:outline-none transition-all shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#BDBDBD] hover:text-white transition-colors"
                  >
                    {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl text-sm font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-[#F0444B] to-[#FF6B6B] hover:from-[#FF6B6B] hover:to-[#F0444B] border border-[#F0444B] shadow-[0_0_20px_rgba(240,68,75,0.5)] transition-all hover:scale-[1.02] active:scale-95"
              >
                ENTER ADMIN STUDIO 🔓
              </button>
            </form>

            <div className="pt-2 border-t border-[#2A2A2A]">
              <button
                type="button"
                onClick={handleQuickUnlock}
                className="w-full py-2.5 text-xs font-bold text-[#27D6D9] hover:text-black bg-[#000000] hover:bg-[#27D6D9] border border-[#2A2A2A] rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#27D6D9]" />
                <span>1-Click Fast Access (admin123)</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
