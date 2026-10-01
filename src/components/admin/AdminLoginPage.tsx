import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowLeft, KeyRound, Lock, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';

interface AdminLoginPageProps {
  onBackToPublic: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onBackToPublic }) => {
  const { loginAdmin } = usePortfolio();
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');

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
    <div className="min-h-screen bg-[#040103] text-[#FFFFFF] flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden font-sans select-none">
      
      {/* Fullscreen Animated Spider Web Background Image (Flipped to Right side with Red Glow) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="/images/spiderman-bg.png"
          alt="Spider Web Background"
          className="w-full h-full object-cover object-right opacity-65 lg:opacity-85 scale-x-[-1] filter brightness-110 contrast-125 transition-opacity duration-1000 animate-spider-glow"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040103] via-[#040103]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040103] via-transparent to-[#040103]" />
      </div>

      {/* Ambient Glowing Orbs behind Spider Logo on the Right */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[550px] h-[550px] bg-[#F0444B]/25 rounded-full blur-[150px] pointer-events-none animate-pulse" />

      {/* Top Header Navigation */}
      <div className="relative z-20 flex items-center justify-between max-w-7xl w-full mx-auto pb-4 border-b border-[#2A2A2A]/60">
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

      {/* Admin Login Detail Card (Positioned on the Left Side) */}
      <div className="relative z-10 max-w-7xl w-full mx-auto my-auto py-8 flex items-center justify-start">
        <div className="w-full max-w-md ml-0 sm:ml-6 lg:ml-12">
          <div className="relative rounded-3xl bg-[#0d0307]/90 border border-[#F0444B]/40 p-7 sm:p-9 shadow-[0_0_50px_rgba(240,68,75,0.35)] backdrop-blur-2xl space-y-6">
            
            {/* Top Red Glow Accent Header */}
            <div className="space-y-3 border-b border-[#F0444B]/30 pb-5">
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
              <div className="p-3 text-xs text-red-200 bg-red-950/80 border border-red-700/60 rounded-xl text-center font-semibold animate-shake">
                {error}
              </div>
            )}

            {/* Admin Password Form */}
            <form onSubmit={handleSubmit} className="space-y-5 text-left">
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
                className="w-full py-4 rounded-2xl text-sm font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-[#F0444B] to-[#FF6B6B] hover:from-[#FF6B6B] hover:to-[#F0444B] border border-[#F0444B] shadow-[0_0_25px_rgba(240,68,75,0.5)] hover:shadow-[0_0_35px_rgba(240,68,75,0.8)] transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 active:scale-95"
              >
                <span>ENTER DASHBOARD 🔓</span>
              </button>
            </form>

          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-20 text-xs font-mono text-[#BDBDBD] text-center pt-4 border-t border-[#2A2A2A]/40">
        © {new Date().getFullYear()} MOHAMED RIYASKHAN S · ADMIN CMS PORTAL
      </div>

    </div>
  );
};



