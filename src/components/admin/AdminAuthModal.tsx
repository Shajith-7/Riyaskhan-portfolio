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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-[400px] rounded-[24px] bg-[#050505] border border-[#2A2A2A] p-[40px] shadow-2xl space-y-6 animate-float"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpenAdminModal(false)}
          className="absolute top-4 right-4 p-2 text-[#BDBDBD] hover:text-[#FFFFFF] rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-xl bg-[#F0444B] text-white flex items-center justify-center shadow-lg border border-[#F0444B]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#FFFFFF] font-['Plus_Jakarta_Sans']">
            Admin Dashboard
          </h3>
          <p className="text-xs text-[#27D6D9]">
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
            <label className="text-xs font-bold text-[#27D6D9]">Admin PIN</label>
            <input
              type="password"
              required
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError('');
              }}
              placeholder="••••••"
              className="w-full rounded-[12px] border border-[#2A2A2A] focus:border-[#F0444B] bg-[#000000] p-[16px] text-2xl font-mono text-center tracking-[12px] text-[#FFFFFF] focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-[14px] rounded-[12px] text-base font-extrabold text-white bg-[#F0444B] hover:bg-[#FF6B6B] border border-[#F0444B] shadow-lg transition-all hover:scale-[1.02]"
          >
            Unlock Dashboard
          </button>
        </form>

        <div className="pt-2 border-t border-[#2A2A2A]">
          <button
            type="button"
            onClick={handleQuickUnlock}
            className="w-full py-2.5 text-xs font-bold text-[#27D6D9] hover:bg-[#1B1B1B] border border-[#2A2A2A] rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#27D6D9]" />
            <span>1-Click Demo Unlock (admin123)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

