import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, ShieldCheck, Sparkles } from 'lucide-react';

export const AdminAuthModal: React.FC = () => {
  const { openAdminModal, setOpenAdminModal, loginAdmin } = usePortfolio();
  const [pin, setPin] = useState('');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12343b]/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-[400px] rounded-[24px] bg-[#12343b] border-2 border-[#e1b382] p-[40px] shadow-sand-glow-lg space-y-6 animate-float"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpenAdminModal(false)}
          className="absolute top-4 right-4 p-2 text-[#e1b382] hover:text-[#ffffff] rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-xl bg-[#e1b382] text-[#12343b] flex items-center justify-center shadow-sand-glow">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#ffffff] font-['Plus_Jakarta_Sans']">
            Admin Dashboard
          </h3>
          <p className="text-xs text-[#e1b382]">
            Manage portfolio content and view inquiries
          </p>
        </div>

        {error && (
          <div className="p-3 text-xs text-red-300 bg-red-950/60 border border-red-800 rounded-lg text-center font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#e1b382]">Admin PIN</label>
            <input
              type="password"
              required
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError('');
              }}
              placeholder="••••••"
              className="w-full rounded-[12px] border-2 border-[#c89666] focus:border-[#e1b382] bg-[#2d545e] p-[16px] text-2xl font-mono text-center tracking-[12px] text-[#ffffff] focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-[14px] rounded-[12px] text-base font-extrabold text-[#12343b] bg-[#e1b382] hover:bg-[#ffffff] border-2 border-[#c89666] shadow-sand-glow transition-all hover:scale-[1.02]"
          >
            Unlock Dashboard
          </button>
        </form>

        <div className="pt-2 border-t border-[#c89666]/60">
          <button
            type="button"
            onClick={handleQuickUnlock}
            className="w-full py-2.5 text-xs font-bold text-[#e1b382] hover:bg-[#2d545e] border border-[#e1b382]/60 rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e1b382]" />
            <span>1-Click Demo Unlock (admin123)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
