import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Sparkles, ArrowLeft, KeyRound, Lock, Eye, EyeOff } from 'lucide-react';

// Perfect Glowing Animated Spider-Man Web & Emblem Component
const SpiderHeroAnimation = () => (
  <div className="relative w-full flex flex-col items-center justify-center p-4 sm:p-6 text-center select-none overflow-hidden min-h-[500px]">
    
    {/* Ambient Glowing Orbs behind Spider */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F0444B]/30 rounded-full blur-[140px] pointer-events-none" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-[#27D6D9]/15 rounded-full blur-[160px] pointer-events-none" />

    {/* Spider Container */}
    <div className="relative w-[340px] h-[460px] sm:w-[440px] sm:h-[560px] flex items-center justify-center">
      
      {/* 1. Spider Web Lines Spreading directly from the 8 Spider Leg Tips */}
      <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 440 560" fill="none">
        <defs>
          <linearGradient id="webGradientRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0444B" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#FF6B6B" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#27D6D9" stopOpacity="0.85" />
          </linearGradient>
          <filter id="webGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Concentric Spider Web Grid Rings extending outwards from legs */}
        <path d="M 40 50 Q 220 -30 400 50 Q 470 280 400 510 Q 220 590 40 510 Q -30 280 40 50 Z" stroke="url(#webGradientRed)" strokeWidth="1.5" strokeDasharray="6 4" className="animate-pulse" />
        <path d="M 70 90 Q 220 20 370 90 Q 430 280 370 470 Q 220 550 70 470 Q 10 280 70 90 Z" stroke="#F0444B" strokeOpacity="0.4" strokeWidth="1.2" />
        <path d="M 100 130 Q 220 60 340 130 Q 390 280 340 430 Q 220 500 100 430 Q 50 280 100 130 Z" stroke="#27D6D9" strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="4 4" />
        <path d="M 130 170 Q 220 110 310 170 Q 350 280 310 390 Q 220 450 130 390 Q 90 280 130 170 Z" stroke="#F0444B" strokeOpacity="0.5" strokeWidth="1" />

        {/* --- WEB STRANDS SPREADING DIRECTLY FROM THE 8 SPIDER LEGS --- */}
        
        {/* Top-Left Leg 1 & 2 Strands */}
        <line x1="85" y1="95" x2="-80" y2="-60" stroke="url(#webGradientRed)" strokeWidth="2" filter="url(#webGlowFilter)" className="animate-web-pulse" />
        <line x1="115" y1="145" x2="-90" y2="110" stroke="url(#webGradientRed)" strokeWidth="2" filter="url(#webGlowFilter)" />
        <line x1="70" y1="75" x2="-40" y2="-40" stroke="#F0444B" strokeWidth="1.5" />

        {/* Top-Right Leg 1 & 2 Strands */}
        <line x1="355" y1="95" x2="520" y2="-60" stroke="url(#webGradientRed)" strokeWidth="2" filter="url(#webGlowFilter)" className="animate-web-pulse" />
        <line x1="325" y1="145" x2="530" y2="110" stroke="url(#webGradientRed)" strokeWidth="2" filter="url(#webGlowFilter)" />
        <line x1="370" y1="75" x2="480" y2="-40" stroke="#F0444B" strokeWidth="1.5" />

        {/* Bottom-Left Leg 1 & 2 Strands */}
        <line x1="75" y1="365" x2="-90" y2="390" stroke="url(#webGradientRed)" strokeWidth="2" filter="url(#webGlowFilter)" />
        <line x1="135" y1="475" x2="-60" y2="620" stroke="url(#webGradientRed)" strokeWidth="2" filter="url(#webGlowFilter)" className="animate-web-pulse" />
        <line x1="160" y1="500" x2="70" y2="630" stroke="#27D6D9" strokeWidth="1.5" />

        {/* Bottom-Right Leg 1 & 2 Strands */}
        <line x1="365" y1="365" x2="530" y2="390" stroke="url(#webGradientRed)" strokeWidth="2" filter="url(#webGlowFilter)" />
        <line x1="305" y1="475" x2="500" y2="620" stroke="url(#webGradientRed)" strokeWidth="2" filter="url(#webGlowFilter)" className="animate-web-pulse" />
        <line x1="280" y1="500" x2="370" y2="630" stroke="#27D6D9" strokeWidth="1.5" />

        {/* Intersecting Cross Threads Linking Leg Tips */}
        <path d="M 85 95 L 355 95 M 115 145 L 325 145 M 75 365 L 365 365 M 135 475 L 305 475" stroke="#F0444B" strokeOpacity="0.5" strokeWidth="1.2" strokeDasharray="5 5" />

        {/* Glowing Pulsing Web Nodes at all 8 Leg Tips */}
        <circle cx="85" cy="95" r="4.5" fill="#F0444B" className="animate-ping" />
        <circle cx="355" cy="95" r="4.5" fill="#F0444B" className="animate-ping" />
        <circle cx="115" cy="145" r="3.5" fill="#27D6D9" />
        <circle cx="325" cy="145" r="3.5" fill="#27D6D9" />
        <circle cx="75" cy="365" r="4" fill="#F0444B" />
        <circle cx="365" cy="365" r="4" fill="#F0444B" />
        <circle cx="135" cy="475" r="5" fill="#F0444B" className="animate-ping" />
        <circle cx="305" cy="475" r="5" fill="#F0444B" className="animate-ping" />
      </svg>

      {/* 2. User's Uploaded Metallic Spider-Man Emblem Image with Breathing Glow */}
      <img
        src="/images/spiderman-emblem.png"
        alt="Spider-Man Emblem"
        className="relative z-10 w-full h-full object-contain animate-spider-glow transition-transform duration-500"
      />

    </div>

    {/* Header Titles under Spider */}
    <div className="space-y-1 mt-4 relative z-10">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0444B]/15 border border-[#F0444B]/60 text-[#F0444B] text-[11px] font-mono font-extrabold uppercase tracking-widest shadow-[0_0_20px_rgba(240,68,75,0.5)]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#F0444B] animate-ping" />
        SPIDER HERO CMS STUDIO
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase font-['Plus_Jakarta_Sans'] drop-shadow-md">
        SPIDER HERO AUTHENTICATION
      </h2>
      <p className="text-xs font-mono text-[#27D6D9] tracking-wider font-bold">
        MOHAMED RIYASKHAN S · ADMIN PORTAL
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
        
        {/* Left Side: Spider-Man Image & Spreading Web Animation */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <SpiderHeroAnimation />
        </div>

        {/* Right Side: Admin Password Box */}
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
