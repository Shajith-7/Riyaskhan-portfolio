/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/public/Navbar';
import { Hero } from './components/public/Hero';
import { AboutSection } from './components/public/AboutSection';
import { ProjectsSection } from './components/public/ProjectsSection';
import { EducationSection } from './components/public/EducationSection';
import { ExperienceSection } from './components/public/ExperienceSection';
import { WorkshopsAndCertsSection } from './components/public/WorkshopsAndCertsSection';
import { SkillsSection } from './components/public/SkillsSection';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';
import { ArchitectureGuideModal } from './components/public/ArchitectureGuideModal';
import { AdminLoginPage } from './components/admin/AdminLoginPage';
import { AdminDashboard } from './components/admin/AdminDashboard';

const AppContent: React.FC = () => {
  const { isAdmin } = usePortfolio();
  const [architectureOpen, setArchitectureOpen] = useState(false);
  const [view, setView] = useState<'portfolio' | 'admin'>(() => {
    return window.location.hash === '#admin' || window.location.pathname.startsWith('/admin')
      ? 'admin'
      : 'portfolio';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin' || window.location.pathname.startsWith('/admin')) {
        setView('admin');
      } else {
        setView('portfolio');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const navigateToAdmin = () => {
    window.location.hash = 'admin';
    setView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPortfolio = () => {
    if (window.location.hash === '#admin') {
      window.location.hash = '';
    }
    setView('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in admin view mode:
  if (view === 'admin') {
    if (!isAdmin) {
      return <AdminLoginPage onBackToPublic={navigateToPortfolio} />;
    }
    return <AdminDashboard onBackToPublic={navigateToPortfolio} />;
  }

  // Public portfolio view:
  return (
    <div className="min-h-screen bg-[#12343b] text-[#ffffff] flex flex-col font-sans selection:bg-[#e1b382]/30 selection:text-[#e1b382]">
      {/* Main Public Header */}
      <Navbar onOpenArchitecture={() => setArchitectureOpen(true)} onGoToAdmin={navigateToAdmin} />

      {/* Main Public Body */}
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <EducationSection />
        <ExperienceSection />
        <WorkshopsAndCertsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenArchitecture={() => setArchitectureOpen(true)} onGoToAdmin={navigateToAdmin} />

      {/* Modals */}
      <ArchitectureGuideModal
        isOpen={architectureOpen}
        onClose={() => setArchitectureOpen(false)}
        onGoToAdmin={navigateToAdmin}
      />
    </div>
  );
};

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('App Error Boundary caught exception:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#000000] text-white flex flex-col items-center justify-center p-6 text-center space-y-5">
          <div className="p-4 rounded-full bg-[#F0444B]/10 border border-[#F0444B]/30 text-[#F0444B]">
            <span className="text-xl font-mono font-bold">Mohamed Riyaskhan Portfolio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Browser Cache Self-Recovery</h2>
          <p className="text-sm text-[#BDBDBD] max-w-md leading-relaxed">
            Your browser session cached a temporary data format. Click the button below to instantly restore your live portfolio.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                try {
                  localStorage.removeItem('portfolio_cms_riyaskhan_v10');
                } catch {}
                window.location.reload();
              }}
              className="px-6 py-3 bg-[#F0444B] hover:bg-[#FF6B6B] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              Restore &amp; Reload Portfolio
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#050505] text-[#27D6D9] border border-[#2A2A2A] hover:border-[#27D6D9] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <PortfolioProvider>
        <AppContent />
      </PortfolioProvider>
    </ErrorBoundary>
  );
}

