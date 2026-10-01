import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ShieldCheck, Sparkles, ArrowLeft, KeyRound, Lock, Eye, EyeOff } from 'lucide-react';

interface AdminLoginPageProps {
  onBackToPublic: () => void;
}

// Glowing Animated Spider-Man Web & Emblem Component
const SpiderHeroAnimation = () => (
  <div className="relative w-full flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
    
    {/* Ambient Glow Orbs */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#F0444B]/20 rounded-full blur-[100px] pointer-events-none" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#27D6D9]/10 rounded-full blur-[120px] pointer-events-none" />

    {/* Spider Web Canvas SVG Container */}
    <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
      
      {/* Animated Web Rings */}
      <svg className="absolute inset-0 w-full h-full text-[#F0444B]/25 animate-spin-slow opacity-80" viewBox="0 0 400 400" fill="none">
        <polygon points="200,40 313,86 360,200 313,314 200,360 87,314 40,200 87,86" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4" />
        <polygon points="200,75 288,111 325,200 288,289 200,325 112,289 75,200 112,111" stroke="currentColor" strokeWidth="1" />
        <polygon points="200,110 263,136 290,200 263,264 200,290 137,264 110,200 137,136" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
        <polygon points="200,145 238,161 255,200 238,239 200,255 162,239 145,200 162,161" stroke="currentColor" strokeWidth="1" />
        <polygon points="200,175 217,182 225,200 217,218 200,225 183,218 175,200 183,182" stroke="currentColor" strokeWidth="1" />
        
        {/* Radial Web Spokes */}
        <line x1="200" y1="10" x2="200" y2="390" stroke="currentColor" strokeWidth="1" />
        <line x1="10" y1="200" x2="390" y2="200" stroke="currentColor" strokeWidth="1" />
        <line x1="65" y1="65" x2="335" y2="335" stroke="currentColor" strokeWidth="1" />
        <line x1="335" y1="65" x2="65" y2="335" stroke="currentColor" strokeWidth="1" />
      </svg>

      {/* Cyber Glowing Red Spider Emblem */}
      <svg className="w-56 h-56 sm:w-72 sm:h-72 relative z-10 filter drop-shadow-[0_0_35px_rgba(240,68,75,0.95)] animate-float-subtle" viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="spiderRedGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0444B" />
            <stop offset="50%" stopColor="#FF6B6B" />
            <stop offset="100%" stopColor="#27D6D9" />
          </linearGradient>
        </defs>

        {/* Spider Eyes & Head */}
        <path d="M50 34 L46 44 L50 47 L54 44 Z" fill="url(#spiderRedGlow)" />
        <path d="M50 47 C42 55 42 72 50 80 C58 72 58 55 50 47 Z" fill="url(#spiderRedGlow)" />
        <circle cx="50" cy="32" r="3.5" fill="url(#spiderRedGlow)" />

        {/* Top Left Legs */}
        <path d="M48 43 Q32 22 18 25 Q30 36 46 46" stroke="url(#spiderRedGlow)" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M47 49 Q28 36 12 43 Q26 51 46 53" stroke="url(#spiderRedGlow)" strokeWidth="2.8" strokeLinecap="round" />

        {/* Bottom Left Legs */}
        <path d="M47 57 Q26 64 10 76 Q26 71 46 62" stroke="url(#spiderRedGlow)" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M48 65 Q33 82 22 96 Q36 86 48 72" stroke="url(#spiderRedGlow)" strokeWidth="2.8" strokeLinecap="round" />

        {/* Top Right Legs */}
        <path d="M52 43 Q68 22 82 25 Q70 36 54 46" stroke="url(#spiderRedGlow)" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M53 49 Q72 36 88 43 Q74 51 54 53" stroke="url(#spiderRedGlow)" strokeWidth="2.8" strokeLinecap="round" />

        {/* Bottom Right Legs */}
        <path d="M53 57 Q74 64 90 76 Q74 71 54 62" stroke="url(#spiderRedGlow)" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M52 65 Q67 82 78 96 Q64 86 52 72" stroke="url(#spiderRedGlow)" strokeWidth="2.8" strokeLinecap="round" />
      </svg>
    </div>

    {/* Header Titles under Spider */}
    <div className="space-y-1 mt-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0444B]/10 border border-[#F0444B]/40 text-[#F0444B] text-[10px] font-mono font-extrabold uppercase tracking-widest">
        <span className="w-2 h-2 rounded-full bg-[#F0444B] animate-ping" />
        WELCOME HERO
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase font-['Plus_Jakarta_Sans'] drop-shadow-md">
        SPIDER HERO AUTHENTICATION
      </h2>
      <p className="text-xs font-mono text-[#27D6D9] tracking-wider">
        MOHAMED RIYASKHAN S · CMS ADMIN STUDIO
      </p>
    </div>

  </div>
);

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onBackToPublic }) => {
  const { loginAdmin } = usePortfolio();
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) {
      setError('Please enter your admin password / PIN.');
      return;
    }
    const success = loginAdmin(pin.trim());
    if (success) {
      setError('');
      setPin('');
    } else {
      setError('Invalid PIN code. Default demo PIN is: admin123');
    }
  };

  const handleQuickUnlock = () => {
    setPin('admin123');
    loginAdmin('admin123');
  };

  return (
    <div className="min-h-screen bg-[#040103] text-[#FFFFFF] flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden font-sans select-none">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F0444B]/10 via-[#040103]/80 to-[#040103] pointer-events-none" />

      {/* Top Header Navigation */}
      <div className="relative z-20 flex items-center justify-between max-w-7xl w-full mx-auto pb-4 border-b border-[#2A2A2A]/60">
        <button
          onClick={onBackToPublic}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0a0205] border border-[#2A2A2A] text-[#F0444B] font-bold text-xs shadow-md hover:bg-[#F0444B] hover:text-white transition-all hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Site</span>
        </button>

        <div className="flex items-center gap-2 font-mono text-xs text-[#27D6D9] bg-[#0a0205] px-3.5 py-1.5 rounded-full border border-[#2A2A2A]">
          <Lock className="w-3.5 h-3.5 text-[#F0444B]" />
          <span className="font-bold">@SL_TECH_JOURNAL</span>
        </div>
      </div>

      {/* Main Split Grid: Left Spider-Man Animation, Right Password Box */}
      <div className="relative z-10 max-w-7xl w-full mx-auto my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Spider-Man Animation */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <SpiderHeroAnimation />
        </div>

        {/* Right Side: Admin Password Box matching User Screenshot */}
        <div className="lg:col-span-5 w-full max-w-md mx-auto">
          <div className="relative rounded-3xl bg-[#0d0307]/90 border border-[#F0444B]/50 p-6 sm:p-8 shadow-[0_0_50px_rgba(240,68,75,0.35)] backdrop-blur-2xl space-y-6">
            
            {/* Top Red Glow Accent Header */}
            <div className="space-y-1 text-left border-b border-[#F0444B]/30 pb-4">
              <span className="text-[10px] font-mono text-[#27D6D9] uppercase tracking-widest font-extrabold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F0444B]" />
                @SL_TECH_JOURNAL · MATHIAS FRITSCHE
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Plus_Jakarta_Sans'] tracking-tight">
                Admin <span className="text-[#F0444B]">Password</span>
              </h3>
              <p className="text-xs text-[#BDBDBD]">
                Enter admin security PIN to unlock CMS Studio
              </p>
            </div>

            {error && (
              <div className="p-3 text-xs text-red-200 bg-red-950/80 border border-red-700 rounded-xl text-center font-semibold animate-shake">
                {error}
              </div>
            )}

            {/* Admin Password / PIN Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#27D6D9] uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <KeyRound className="w-4 h-4 text-[#F0444B]" />
                    Admin Password / PIN
                  </span>
                  <span className="text-[10px] text-[#BDBDBD] font-mono">Demo: admin123</span>
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
                    placeholder="Enter admin password..."
                    className="w-full rounded-2xl border border-[#F0444B]/40 focus:border-[#F0444B] bg-[#000000] px-4 py-3.5 pr-12 text-lg font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#F0444B]/40 transition-all shadow-inner"
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

              {/* ENTER / ACCESS BUTTON */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl text-sm font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-[#F0444B] to-[#FF6B6B] hover:from-[#FF6B6B] hover:to-[#F0444B] border border-[#F0444B] shadow-[0_0_25px_rgba(240,68,75,0.6)] hover:shadow-[0_0_35px_rgba(240,68,75,0.8)] transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 active:scale-95"
              >
                <span>ENTER ADMIN STUDIO 🔓</span>
              </button>
            </form>

            {/* 1-Click Fast Unlock */}
            <div className="pt-4 border-t border-[#2A2A2A] space-y-2">
              <button
                type="button"
                onClick={handleQuickUnlock}
                className="w-full py-3 text-xs font-bold text-[#27D6D9] hover:text-black bg-[#000000] hover:bg-[#27D6D9] border border-[#2A2A2A] hover:border-[#27D6D9] rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-[#27D6D9]" />
                <span>1-Click Fast Access (PIN: admin123)</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="relative z-20 text-xs font-mono text-[#BDBDBD] text-center pt-4 border-t border-[#2A2A2A]/40">
        © {new Date().getFullYear()} MOHAMED RIYASKHAN S · SPIDER HERO CMS AUTHENTICATION
      </div>

    </div>
  );
};
