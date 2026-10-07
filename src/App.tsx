/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, CaseStudy, ServiceItem } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { WorksSection } from './components/WorksSection';
import { EstimateSimulator } from './components/EstimateSimulator';
import { PhilosophySection } from './components/PhilosophySection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';

export default function App() {
  const [lang, setLang] = useState<Language>('ja');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [estimateData, setEstimateData] = useState<{
    summary: string;
    category: string;
    budget: string;
  } | null>(null);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ja' ? 'en' : 'ja'));
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWorks = () => {
    const el = document.getElementById('works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyEstimate = (summary: string, category: string, budget: string) => {
    setEstimateData({ summary, category, budget });
    scrollToContact();
  };

  const handleInquireFromCaseStudy = () => {
    if (selectedCaseStudy) {
      setEstimateData({
        summary: `事例「${selectedCaseStudy.title}」に近い要件での新規開発相談`,
        category: selectedCaseStudy.category === 'fintech' ? 'webapp' : selectedCaseStudy.category === 'lifestyle' ? 'brand' : 'webapp',
        budget: '200-300万',
      });
    }
    scrollToContact();
  };

  const handleInquireFromService = () => {
    if (selectedService) {
      setEstimateData({
        summary: `専門領域「${selectedService.title}」に関するご相談`,
        category: selectedService.id === 'ui-ux' ? 'design-system' : selectedService.id === 'brand' ? 'brand' : 'webapp',
        budget: '200-300万',
      });
    }
    scrollToContact();
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#f2f4f7] selection:bg-neutral-800 selection:text-white">
      {/* Top Bar Contract Header */}
      <Header
        lang={lang}
        onToggleLang={toggleLanguage}
        onOpenContact={scrollToContact}
      />

      <main>
        {/* Hero Section */}
        <Hero
          lang={lang}
          onOpenContact={scrollToContact}
          onExploreWorks={scrollToWorks}
        />

        {/* Core Services Section */}
        <ServicesSection
          lang={lang}
          onSelectService={setSelectedService}
        />

        {/* Selected Works & Case Studies */}
        <WorksSection
          lang={lang}
          onSelectCaseStudy={setSelectedCaseStudy}
        />

        {/* Live Estimate & Timeline Simulator */}
        <EstimateSimulator
          lang={lang}
          onApplyEstimate={handleApplyEstimate}
        />

        {/* Philosophy & Company Factsheet */}
        <PhilosophySection
          lang={lang}
        />

        {/* FAQ Accordion */}
        <FaqSection
          lang={lang}
        />

        {/* Interactive Contact & Inquiry Form */}
        <ContactSection
          lang={lang}
          initialData={estimateData}
        />
      </main>

      {/* Quiet Footer */}
      <Footer lang={lang} />

      {/* Modals */}
      <CaseStudyModal
        study={selectedCaseStudy}
        lang={lang}
        onClose={() => setSelectedCaseStudy(null)}
        onInquireAboutCase={handleInquireFromCaseStudy}
      />

      <ServiceDetailModal
        service={selectedService}
        lang={lang}
        onClose={() => setSelectedService(null)}
        onInquireService={handleInquireFromService}
      />
    </div>
  );
}
