import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowLeft, KeyRound, Lock, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';

interface AdminLoginPageProps {
  onBackToPublic: () => void;
}

// Realistic Animated Mini Spider Component with 8 Wiggling Legs
const RealisticMiniSpider = ({ className = '' }: { className?: string }) => (
  <div className={`pointer-events-none absolute z-20 ${className}`}>
    <svg width="28" height="28" viewBox="0 0 100 100" fill="none" className="filter drop-shadow-[0_0_8px_rgba(240,68,75,0.9)]">
      {/* Spider Head & Body */}
      <ellipse cx="50" cy="40" rx="8" ry="10" fill="#F0444B" />
      <circle cx="50" cy="58" r="14" fill="#C0392B" stroke="#F0444B" strokeWidth="2" />
      <circle cx="47" cy="35" r="2.5" fill="#FFFFFF" className="animate-ping" />
      <circle cx="53" cy="35" r="2.5" fill="#FFFFFF" className="animate-ping" />

      {/* Left 4 Legs */}
      <g className="animate-leg-wiggle-left">
        <path d="M 46 42 Q 25 20 5 15" stroke="#F0444B" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 44 48 Q 20 38 4 38" stroke="#F0444B" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 44 54 Q 18 58 6 68" stroke="#F0444B" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 46 62 Q 22 75 10 90" stroke="#F0444B" strokeWidth="3.5" strokeLinecap="round" />
      </g>

      {/* Right 4 Legs */}
      <g className="animate-leg-wiggle-right">
        <path d="M 54 42 Q 75 20 95 15" stroke="#F0444B" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 56 48 Q 80 38 96 38" stroke="#F0444B" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 56 54 Q 82 58 94 68" stroke="#F0444B" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 54 62 Q 78 75 90 90" stroke="#F0444B" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    </svg>
  </div>
);

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onBackToPublic }) => {
  const { loginAdmin } = usePortfolio();
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [mousePos, setMousePos] = useState({ x: 400, y: 300 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) {
      setError('Please enter your admin password.');
      return;
    }
    const success = loginAdmin(pin.trim());
    if (success) {
      setError('');
      setPin('');
    } else {
      setError('Invalid admin password. Please try again.');
    }
  };

  // Spider Emblem center coordinates on left
  const spiderX = 220;
  const spiderY = 320;

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#040103] text-[#FFFFFF] flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden font-sans select-none"
    >
      
      {/* 1. Fullscreen Original Spider Background Image (Spider on Left Side) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="/images/spiderman-bg.png"
          alt="Spider Web Background"
          className="w-full h-full object-cover object-left opacity-75 lg:opacity-85 filter brightness-110 contrast-125 transition-opacity duration-1000 animate-spider-glow"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#040103]/40 to-[#040103]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040103] via-transparent to-[#040103]/70" />
      </div>

      {/* 2. Interactive Mouse-Following Spider Web Strand Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" fill="none">
        <defs>
          <linearGradient id="cursorWebGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0444B" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FF6B6B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#27D6D9" stopOpacity="0.8" />
          </linearGradient>
          <filter id="webGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dynamic Spider Web lines connecting left Spider to Mouse Cursor Arrow */}
        {mousePos.x > 0 && (
          <g filter="url(#webGlow)">
            {/* Primary Strand to Cursor */}
            <line
              x1={spiderX}
              y1={spiderY}
              x2={mousePos.x}
              y2={mousePos.y}
              stroke="url(#cursorWebGrad)"
              strokeWidth="2"
              className="animate-web-pulse"
            />
            
            {/* Curved Web Arc 1 */}
            <path
              d={`M ${spiderX} ${spiderY - 80} Q ${(spiderX + mousePos.x) / 2} ${(spiderY + mousePos.y) / 2 - 40} ${mousePos.x} ${mousePos.y}`}
              stroke="#F0444B"
              strokeOpacity="0.5"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />

            {/* Curved Web Arc 2 */}
            <path
              d={`M ${spiderX} ${spiderY + 80} Q ${(spiderX + mousePos.x) / 2} ${(spiderY + mousePos.y) / 2 + 40} ${mousePos.x} ${mousePos.y}`}
              stroke="#27D6D9"
              strokeOpacity="0.5"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />

            {/* Glowing Web Node at Cursor Pointer */}
            <circle cx={mousePos.x} cy={mousePos.y} r="6" fill="#F0444B" className="animate-ping" />
            <circle cx={mousePos.x} cy={mousePos.y} r="3" fill="#FFFFFF" />
          </g>
        )}
      </svg>

      {/* 3. Realistically Crawling Mini Spiders across Screen */}
      <RealisticMiniSpider className="animate-spider-crawl-1" />
      <RealisticMiniSpider className="animate-spider-crawl-2" />
      <RealisticMiniSpider className="animate-spider-crawl-3" />

      {/* Ambient Glowing Orbs behind Spider Logo on the Left */}
      <div className="absolute top-1/2 left-20 -translate-y-1/2 w-[550px] h-[550px] bg-[#F0444B]/25 rounded-full blur-[150px] pointer-events-none animate-pulse" />

      {/* Top Header Navigation */}
      <div className="relative z-30 flex items-center justify-between max-w-7xl w-full mx-auto pb-4 border-b border-[#2A2A2A]/60">
        <button
          onClick={onBackToPublic}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0a0205]/90 border border-[#2A2A2A] text-[#F0444B] font-bold text-xs shadow-md hover:bg-[#F0444B] hover:text-white transition-all hover:scale-105 backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Portfolio</span>
        </button>

        <div className="flex items-center gap-2 font-mono text-xs text-[#27D6D9] bg-[#0a0205]/90 px-3.5 py-1.5 rounded-full border border-[#2A2A2A] backdrop-blur-md">
          <Lock className="w-3.5 h-3.5 text-[#F0444B]" />
          <span className="font-bold">ADMIN CMS PORTAL</span>
        </div>
      </div>

      {/* Admin Login Detail Card (Positioned on the RIGHT Side) */}
      <div className="relative z-30 max-w-7xl w-full mx-auto my-auto py-8 flex items-center justify-end">
        <div className="w-full max-w-md mr-0 sm:mr-6 lg:mr-12">
          
          <div className="relative rounded-3xl bg-[#0d0307]/90 border border-[#F0444B]/50 p-7 sm:p-9 shadow-[0_0_60px_rgba(240,68,75,0.4)] backdrop-blur-2xl space-y-6 overflow-hidden">
            
            {/* Corner Decorative Web Accents inside Card */}
            <svg className="absolute top-0 right-0 w-24 h-24 text-[#F0444B]/20 pointer-events-none" viewBox="0 0 100 100">
              <path d="M0,0 L100,0 L100,100 Z" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="100" y1="0" x2="20" y2="80" stroke="currentColor" strokeWidth="1.5" />
            </svg>

            {/* Top Red Glow Accent Header */}
            <div className="space-y-3 border-b border-[#F0444B]/30 pb-5 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#F0444B]/15 border border-[#F0444B]/40 flex items-center justify-center text-[#F0444B] shadow-[0_0_20px_rgba(240,68,75,0.3)]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-[#27D6D9] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-[#000000] border border-[#2A2A2A] flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#F0444B]" />
                  AUTHENTICATION
                </span>
              </div>

              <div className="space-y-1 text-left">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Plus_Jakarta_Sans'] tracking-tight">
                  Admin <span className="text-[#F0444B]">Portal</span>
                </h2>
                <p className="text-xs text-[#BDBDBD]">
                  Enter security password to unlock CMS Dashboard
                </p>
              </div>
            </div>

            {error && (
              <div className="p-3 text-xs text-red-200 bg-red-950/80 border border-red-700/60 rounded-xl text-center font-semibold animate-shake relative z-10">
                {error}
              </div>
            )}

            {/* Admin Password Form */}
            <form onSubmit={handleSubmit} className="space-y-5 text-left relative z-10">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#27D6D9] uppercase tracking-wider flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-[#F0444B]" />
                  <span>Admin Password</span>
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
                    className="w-full rounded-2xl border border-[#F0444B]/40 focus:border-[#F0444B] bg-[#000000] px-4 py-3.5 pr-12 text-base font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#F0444B]/40 transition-all shadow-inner"
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl text-sm font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-[#F0444B] to-[#FF6B6B] hover:from-[#FF6B6B] hover:to-[#F0444B] border border-[#F0444B] shadow-[0_0_25px_rgba(240,68,75,0.6)] hover:shadow-[0_0_35px_rgba(240,68,75,0.85)] transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 active:scale-95"
              >
                <span>ENTER DASHBOARD 🔓</span>
              </button>
            </form>

          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-30 text-xs font-mono text-[#BDBDBD] text-center pt-4 border-t border-[#2A2A2A]/40">
        © {new Date().getFullYear()} MOHAMED RIYASKHAN S · ADMIN CMS PORTAL
      </div>

    </div>
  );
};




