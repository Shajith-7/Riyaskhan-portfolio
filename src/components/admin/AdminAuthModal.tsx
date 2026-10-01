import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, KeyRound, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';

export const AdminAuthModal: React.FC = () => {
  const { openAdminModal, setOpenAdminModal, loginAdmin } = usePortfolio();
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');

  if (!openAdminModal) return null;

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
      setTimeout(() => {
        const el = document.getElementById('admin-dashboard');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setError('Invalid admin password. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
      
      {/* Background image overlay inside modal */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-30">
        <img
          src="/images/spiderman-bg.png"
          alt="Spider Web"
          className="w-full h-full object-cover object-right scale-x-[-1] animate-spider-glow"
        />
      </div>

      <div 
        className="relative w-full max-w-md rounded-3xl bg-[#090205]/95 border border-[#F0444B]/40 p-6 sm:p-8 shadow-[0_0_60px_rgba(240,68,75,0.4)] overflow-hidden my-auto space-y-6 text-center backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setOpenAdminModal(false)}
          className="absolute top-4 right-4 z-20 p-2 text-[#BDBDBD] hover:text-[#FFFFFF] bg-black/60 rounded-full border border-[#2A2A2A] hover:border-[#F0444B] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center space-y-3 pt-2">
          <div className="w-14 h-14 rounded-2xl bg-[#F0444B]/15 border border-[#F0444B]/40 flex items-center justify-center text-[#F0444B] shadow-[0_0_20px_rgba(240,68,75,0.3)]">
            <ShieldCheck className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans']">
              Admin <span className="text-[#F0444B]">Portal</span>
            </h3>
            <p className="text-xs text-[#BDBDBD]">
              Enter security password to unlock CMS Studio
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 text-xs text-red-200 bg-red-950/80 border border-red-700/60 rounded-xl text-center font-semibold animate-shake">
            {error}
          </div>
        )}

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

          <button
            type="submit"
            className="w-full py-4 rounded-2xl text-sm font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-[#F0444B] to-[#FF6B6B] hover:from-[#FF6B6B] hover:to-[#F0444B] border border-[#F0444B] shadow-[0_0_20px_rgba(240,68,75,0.5)] transition-all hover:scale-[1.02] active:scale-95"
          >
            ENTER DASHBOARD 🔓
          </button>
        </form>

      </div>
    </div>
  );
};



