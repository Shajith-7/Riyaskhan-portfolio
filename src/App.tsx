/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/public/Navbar';
import { Hero } from './components/public/Hero';
import { AboutSection } from './components/public/AboutSection';
import { ProjectsSection } from './components/public/ProjectsSection';
import { EducationSection } from './components/public/EducationSection';
import { ExperienceSection } from './components/public/ExperienceSection';
import { WorkshopsAndCertsSection } from './components/public/WorkshopsAndCertsSection';
import { SkillsSection } from './components/public/SkillsSection';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';
import { ArchitectureGuideModal } from './components/public/ArchitectureGuideModal';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { BookOpen, ShieldCheck, Sparkles, Sliders } from 'lucide-react';

const AppContent: React.FC = () => {
  const { isAdmin, setOpenAdminModal, getAccentClasses } = usePortfolio();
  const [architectureOpen, setArchitectureOpen] = useState(false);
  const accent = getAccentClasses();

  return (
    <div className="min-h-screen bg-[#12343b] text-[#ffffff] flex flex-col font-sans selection:bg-[#e1b382]/30 selection:text-[#e1b382]">
      {/* Main Public Header */}

      {/* Main Public Header */}
      <Navbar onOpenArchitecture={() => setArchitectureOpen(true)} />

      {/* Main Public Body */}
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <EducationSection />
        <ExperienceSection />
        <WorkshopsAndCertsSection />
        <SkillsSection />
        <TestimonialsSection />
        <ContactSection />

        {/* Embedded Admin CMS Dashboard when logged in */}
        {isAdmin && <AdminDashboard />}
      </main>

      {/* Footer */}
      <Footer onOpenArchitecture={() => setArchitectureOpen(true)} />

      {/* Modals */}
      <ArchitectureGuideModal
        isOpen={architectureOpen}
        onClose={() => setArchitectureOpen(false)}
        onGoToAdmin={() => {
          if (!isAdmin) {
            setOpenAdminModal(true);
          } else {
            const el = document.getElementById('admin-dashboard');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      <AdminAuthModal />
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
