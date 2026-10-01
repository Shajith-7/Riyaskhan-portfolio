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

export default function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}

