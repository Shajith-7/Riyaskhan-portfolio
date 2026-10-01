import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowLeft, KeyRound, Lock, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';

interface AdminLoginPageProps {
  onBackToPublic: () => void;
}

// Realistic Hanging Spider Component with Silk Thread & 8 Legs
const HangingSpiderOnCard = ({ silkLength = 65, className = '' }: { silkLength?: number; className?: string }) => (
  <div className={`absolute z-40 pointer-events-none flex flex-col items-center ${className}`}>
    {/* Glowing Silk Thread */}
    <svg width="2" height={silkLength} className="overflow-visible">
      <line
        x1="1"
        y1="0"
        x2="1"
        y2={silkLength}
        stroke="#F0444B"
        strokeWidth="1.5"
        strokeDasharray="3 2"
        className="filter drop-shadow-[0_0_5px_rgba(240,68,75,0.9)]"
      />
    </svg>
    {/* Hanging Spider Body */}
    <div className="-mt-1 filter drop-shadow-[0_0_12px_rgba(240,68,75,0.9)]">
      <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
        {/* Body & Head */}
        <ellipse cx="50" cy="40" rx="8" ry="10" fill="#F0444B" />
        <circle cx="50" cy="58" r="14" fill="#6B0A0E" stroke="#F0444B" strokeWidth="2.5" />
        <circle cx="46" cy="35" r="2.5" fill="#FFFFFF" />
        <circle cx="54" cy="35" r="2.5" fill="#FFFFFF" />
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
  </div>
);

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onBackToPublic }) => {
  const { loginAdmin } = usePortfolio();
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const mouseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger web glowing and swaying around spider when arrow/mouse is moving
  const handleMouseMove = () => {
    setIsMouseMoving(true);
    if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current);
    mouseTimerRef.current = setTimeout(() => {
      setIsMouseMoving(false);
    }, 1200);
  };

  useEffect(() => {
    return () => {
      if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current);
    };
  }, []);

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

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#040103] text-[#FFFFFF] flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden font-sans select-none"
    >
      
      {/* 1. Fully Static Background Image (Spider on Left Side - Original Color, No Image Animation) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="/images/spiderman-bg.png"
          alt="Spider Web Background"
          className="w-full h-full object-cover object-left opacity-85 filter brightness-105 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#040103]/40 to-[#040103]/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040103] via-transparent to-[#040103]/70" />
      </div>

      {/* 2. Interactive Spider Web Glow & Hanging Web Strand Overlay around Left Spider */}
      <div 
        className={`absolute top-0 left-0 w-full h-full pointer-events-none z-10 transition-all duration-700 ${
          isMouseMoving ? 'opacity-100 scale-100' : 'opacity-65 scale-95'
        }`}
      >
        {/* Glow Aura behind Left Spider when Arrow Moves */}
        <div 
          className={`absolute top-[28%] left-[12%] -translate-y-1/2 w-[480px] h-[480px] rounded-full blur-[140px] pointer-events-none transition-all duration-500 ${
            isMouseMoving ? 'bg-[#F0444B]/45 shadow-[0_0_120px_rgba(240,68,75,0.9)]' : 'bg-[#F0444B]/15'
          }`} 
        />

        {/* Dynamic Hanging & Swaying Web Strands around Spider Emblem */}
        <svg className="w-full h-full overflow-visible animate-web-hang-sway" fill="none">
          <defs>
            <filter id="webGlowInteractive" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation={isMouseMoving ? "4" : "2"} result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="spiderWebGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0444B" stopOpacity={isMouseMoving ? "1" : "0.7"} />
              <stop offset="50%" stopColor="#FF6B6B" stopOpacity={isMouseMoving ? "0.9" : "0.5"} />
              <stop offset="100%" stopColor="#801015" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Web Strands Surrounding Left Spider Emblem */}
          <g filter="url(#webGlowInteractive)">
            {/* Radial Spokes around Spider Emblem (Centered around X:240, Y:320) */}
            <line x1="240" y1="320" x2="240" y2="40" stroke="url(#spiderWebGrad)" strokeWidth={isMouseMoving ? "2.5" : "1.5"} />
            <line x1="240" y1="320" x2="480" y2="160" stroke="url(#spiderWebGrad)" strokeWidth={isMouseMoving ? "2.5" : "1.5"} />
            <line x1="240" y1="320" x2="520" y2="320" stroke="url(#spiderWebGrad)" strokeWidth={isMouseMoving ? "2.5" : "1.5"} />
            <line x1="240" y1="320" x2="460" y2="490" stroke="url(#spiderWebGrad)" strokeWidth={isMouseMoving ? "2.5" : "1.5"} />
            <line x1="240" y1="320" x2="240" y2="620" stroke="url(#spiderWebGrad)" strokeWidth={isMouseMoving ? "2.5" : "1.5"} />
            <line x1="240" y1="320" x2="30" y2="490" stroke="url(#spiderWebGrad)" strokeWidth={isMouseMoving ? "2.5" : "1.5"} />
            <line x1="240" y1="320" x2="0" y2="320" stroke="url(#spiderWebGrad)" strokeWidth={isMouseMoving ? "2.5" : "1.5"} />
            <line x1="240" y1="320" x2="30" y2="160" stroke="url(#spiderWebGrad)" strokeWidth={isMouseMoving ? "2.5" : "1.5"} />

            {/* Concentric Web Arcs around Spider */}
            <path
              d="M 240 180 Q 330 210 350 320 Q 330 430 240 460 Q 150 430 130 320 Q 150 210 240 180 Z"
              stroke="#F0444B"
              strokeWidth={isMouseMoving ? "2.2" : "1.2"}
              strokeOpacity={isMouseMoving ? "0.95" : "0.6"}
              className="animate-web-pulse"
            />
            <path
              d="M 240 110 Q 400 150 430 320 Q 400 490 240 530 Q 80 490 50 320 Q 80 150 240 110 Z"
              stroke="#F0444B"
              strokeWidth={isMouseMoving ? "2" : "1"}
              strokeOpacity={isMouseMoving ? "0.85" : "0.45"}
            />

            {/* Hanging Web Loops Drooping Under Spider */}
            <path
              d="M 50 320 Q 150 460 240 400 Q 330 460 430 320"
              stroke="#FF6B6B"
              strokeWidth={isMouseMoving ? "2" : "1.2"}
              strokeDasharray="4 3"
              strokeOpacity={isMouseMoving ? "0.9" : "0.5"}
            />
            <path
              d="M 30 160 Q 140 280 240 210 Q 340 280 480 160"
              stroke="#F0444B"
              strokeWidth={isMouseMoving ? "1.8" : "1"}
              strokeDasharray="3 3"
              strokeOpacity={isMouseMoving ? "0.8" : "0.4"}
            />

            {/* Glowing Web Nodes around Spider Ring */}
            <circle cx="240" cy="180" r={isMouseMoving ? "5" : "3"} fill="#F0444B" />
            <circle cx="350" cy="320" r={isMouseMoving ? "5" : "3"} fill="#F0444B" />
            <circle cx="240" cy="460" r={isMouseMoving ? "5" : "3"} fill="#F0444B" />
            <circle cx="130" cy="320" r={isMouseMoving ? "5" : "3"} fill="#F0444B" />
          </g>
        </svg>
      </div>

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
        <div className="w-full max-w-md mr-0 sm:mr-6 lg:mr-12 relative">
          
          {/* REALISTIC SPIDERS HANGING FROM THE LOGIN CARD */}
          {/* Hanging Spider 1: Top Left of Login Card */}
          <HangingSpiderOnCard silkLength={75} className="-top-16 left-8 animate-spider-hang-1" />
          
          {/* Hanging Spider 2: Top Right of Login Card */}
          <HangingSpiderOnCard silkLength={90} className="-top-20 right-12 animate-spider-hang-2" />

          {/* Hanging Spider 3: Right edge of Login Card */}
          <HangingSpiderOnCard silkLength={50} className="top-1/3 -right-6 animate-spider-hang-1" />

          {/* Login Card Body */}
          <div className="relative rounded-3xl bg-[#0d0307]/90 border border-[#F0444B]/50 p-7 sm:p-9 shadow-[0_0_60px_rgba(240,68,75,0.4)] backdrop-blur-2xl space-y-6 overflow-hidden">
            
            {/* Corner Decorative Web Accents inside Card */}
            <svg className="absolute top-0 right-0 w-24 h-24 text-[#F0444B]/25 pointer-events-none" viewBox="0 0 100 100">
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
