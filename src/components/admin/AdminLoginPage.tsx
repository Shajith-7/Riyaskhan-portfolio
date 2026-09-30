import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ShieldCheck, Sparkles, ArrowLeft, KeyRound, Lock } from 'lucide-react';

interface AdminLoginPageProps {
  onBackToPublic: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onBackToPublic }) => {
  const { loginAdmin } = usePortfolio();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

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
    } else {
      setError('Invalid PIN code. Default demo PIN is: admin123');
    }
  };

  const handleQuickUnlock = () => {
    setPin('admin123');
    loginAdmin('admin123');
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#27D6D9]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#F0444B]/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Header / Back Button */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between max-w-7xl mx-auto z-20">
        <button
          onClick={onBackToPublic}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#050505] border border-[#2A2A2A] text-[#F0444B] font-bold text-xs shadow-md hover:bg-[#F0444B] hover:text-white transition-all hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Portfolio</span>
        </button>

        <div className="flex items-center gap-2 font-mono text-xs text-[#27D6D9]">
          <Lock className="w-3.5 h-3.5" />
          <span>Encrypted Admin Portal</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="relative w-full max-w-[440px] rounded-[28px] bg-[#050505] border border-[#2A2A2A] p-8 sm:p-10 shadow-2xl space-y-6 z-10 my-12">
        
        {/* Header Icon */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-[#F0444B] text-white flex items-center justify-center shadow-lg border border-[#F0444B]">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#FFFFFF] font-['Plus_Jakarta_Sans'] tracking-tight">
              Mohamed Riyaskhan S
            </h2>
            <p className="text-xs font-semibold text-[#27D6D9] mt-1">
              CMS Admin Studio · Access Portal
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 text-xs text-red-200 bg-red-950/80 border border-red-700 rounded-xl text-center font-semibold animate-shake">
            {error}
          </div>
        )}

        {/* PIN Input Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-[#27D6D9] uppercase tracking-wider flex items-center justify-center gap-1.5">
              <KeyRound className="w-4 h-4" />
              <span>Enter Admin Security PIN</span>
            </label>
            <input
              type="password"
              required
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError('');
              }}
              placeholder="••••••"
              className="w-full rounded-[16px] border border-[#2A2A2A] focus:border-[#F0444B] bg-[#000000] p-4 text-3xl font-mono text-center tracking-[16px] text-[#FFFFFF] focus:outline-none transition-all shadow-inner"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-[14px] text-base font-extrabold text-white bg-[#F0444B] hover:bg-[#FF6B6B] border border-[#F0444B] shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            Unlock Admin Studio 🔓
          </button>
        </form>

        {/* 1-Click Demo Shortcut */}
        <div className="pt-3 border-t border-[#2A2A2A] text-center space-y-2">
          <button
            type="button"
            onClick={handleQuickUnlock}
            className="w-full py-3 text-xs font-bold text-[#27D6D9] hover:text-[#000000] bg-[#000000] hover:bg-[#27D6D9] border border-[#2A2A2A] rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#27D6D9]" />
            <span>1-Click Demo Access (PIN: admin123)</span>
          </button>
          
          <p className="text-[11px] text-[#BDBDBD]">
            Allows managing resume data, hackathons, skills, and inquiries.
          </p>
        </div>

      </div>

      {/* Footer copyright */}
      <div className="text-xs font-medium text-[#BDBDBD] text-center">
        © {new Date().getFullYear()} Mohamed Riyaskhan S · Integrated CMS Admin Portal
      </div>

    </div>
  );
};

