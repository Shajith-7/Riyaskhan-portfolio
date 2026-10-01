import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Sparkles, ArrowLeft, KeyRound, Lock, Eye, EyeOff } from 'lucide-react';

// Glowing Animated Spider-Man Web & Emblem Component using user uploaded image
const SpiderHeroAnimation = () => (
  <div className="relative w-full flex flex-col items-center justify-center p-4 sm:p-6 text-center select-none overflow-hidden min-h-[480px]">
    
    {/* Ambient Glow Orbs */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F0444B]/25 rounded-full blur-[130px] pointer-events-none" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-[#27D6D9]/10 rounded-full blur-[150px] pointer-events-none" />

    {/* Center Spider Container with Spreading Web SVG */}
    <div className="relative w-80 h-96 sm:w-[420px] sm:h-[500px] flex items-center justify-center">
      
      {/* Spider Web Spreading directly from Spider Legs (SVG Overlay) */}
      <svg className="absolute inset-0 w-full h-full text-[#F0444B]/40 overflow-visible" viewBox="0 0 400 500" fill="none">
        
        {/* Outer Connecting Web Concentric Arcs spreading out */}
        <path d="M 40 60 Q 200 -20 360 60 Q 420 250 360 440 Q 200 520 40 440 Q -20 250 40 60 Z" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 4" className="animate-pulse" />
        <path d="M 70 90 Q 200 20 330 90 Q 380 250 330 410 Q 200 470 70 410 Q 20 250 70 90 Z" stroke="currentColor" strokeWidth="1" />
        <path d="M 100 120 Q 200 50 300 120 Q 340 250 300 380 Q 200 430 100 380 Q 60 250 100 120 Z" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4" />
        <path d="M 125 150 Q 200 90 275 150 Q 310 250 275 350 Q 200 390 125 350 Q 90 250 125 150 Z" stroke="currentColor" strokeWidth="1" />

        {/* Web Strands radiating directly from Top-Left Legs */}
        <line x1="90" y1="90" x2="-50" y2="-50" stroke="currentColor" strokeWidth="1.5" />
        <line x1="110" y1="130" x2="-60" y2="100" stroke="currentColor" strokeWidth="1.5" />
        <line x1="75" y1="70" x2="-20" y2="-30" stroke="currentColor" strokeWidth="1.2" />

        {/* Web Strands radiating directly from Top-Right Legs */}
        <line x1="310" y1="90" x2="450" y2="-50" stroke="currentColor" strokeWidth="1.5" />
        <line x1="290" y1="130" x2="460" y2="100" stroke="currentColor" strokeWidth="1.5" />
        <line x1="325" y1="70" x2="420" y2="-30" stroke="currentColor" strokeWidth="1.2" />

        {/* Web Strands radiating directly from Bottom-Left Legs */}
        <line x1="70" y1="330" x2="-60" y2="360" stroke="currentColor" strokeWidth="1.5" />
        <line x1="120" y1="430" x2="-40" y2="550" stroke="currentColor" strokeWidth="1.5" />
        <line x1="140" y1="450" x2="60" y2="560" stroke="currentColor" strokeWidth="1.2" />

        {/* Web Strands radiating directly from Bottom-Right Legs */}
        <line x1="330" y1="330" x2="460" y2="360" stroke="currentColor" strokeWidth="1.5" />
        <line x1="280" y1="430" x2="440" y2="550" stroke="currentColor" strokeWidth="1.5" />
        <line x1="260" y1="450" x2="340" y2="560" stroke="currentColor" strokeWidth="1.2" />

        {/* Intersecting Cross Threads Connecting Leg Tips */}
        <path d="M 90 90 L 310 90 M 110 130 L 290 130 M 70 330 L 330 330 M 120 430 L 280 430" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" opacity="0.6" />

        {/* Glowing Node Dots at Leg Tip Connection Points */}
        <circle cx="90" cy="90" r="3.5" fill="#F0444B" className="animate-ping" />
        <circle cx="310" cy="90" r="3.5" fill="#F0444B" className="animate-ping" />
        <circle cx="110" cy="130" r="3" fill="#27D6D9" />
        <circle cx="290" cy="130" r="3" fill="#27D6D9" />
        <circle cx="70" cy="330" r="3.5" fill="#F0444B" />
        <circle cx="330" cy="330" r="3.5" fill="#F0444B" />
        <circle cx="120" cy="430" r="4" fill="#F0444B" className="animate-ping" />
        <circle cx="280" cy="430" r="4" fill="#F0444B" className="animate-ping" />
      </svg>

      {/* User's Uploaded Metallic Spider-Man Emblem Image */}
      <img
        src="/images/spiderman-emblem.png"
        alt="Spider-Man Emblem"
        className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_0_40px_rgba(240,68,75,0.95)] hover:scale-105 transition-transform duration-500 animate-float-subtle"
      />

    </div>

    {/* Header Titles under Spider */}
    <div className="space-y-1 mt-4 relative z-10">
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0444B]/15 border border-[#F0444B]/50 text-[#F0444B] text-[10px] font-mono font-extrabold uppercase tracking-widest shadow-[0_0_15px_rgba(240,68,75,0.4)]">
        <span className="w-2 h-2 rounded-full bg-[#F0444B] animate-ping" />
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
