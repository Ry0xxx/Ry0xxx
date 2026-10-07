import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, onToggleLang, onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#services', label: lang === 'ja' ? 'サービス' : 'Services' },
    { href: '#works', label: lang === 'ja' ? '制作実績' : 'Works' },
    { href: '#philosophy', label: lang === 'ja' ? '理念・概要' : 'About' },
    { href: '#estimator', label: lang === 'ja' ? '費用シミュレータ' : 'Estimator' },
    { href: '#faq', label: lang === 'ja' ? 'よくある質問' : 'FAQ' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0c0d0e]/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-white hover:text-neutral-300 transition-colors whitespace-nowrap font-['Syne']"
        >
          STUDIO AURA
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="hover:text-white transition-colors duration-150 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-400 hover:text-white rounded-md border border-neutral-800 hover:border-neutral-700 transition-colors"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="uppercase">{lang}</span>
          </button>

          <button
            type="button"
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-black bg-white rounded-lg hover:bg-neutral-200 transition-colors whitespace-nowrap"
          >
            {lang === 'ja' ? '無料相談・お見積り' : 'Start a Project'}
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white rounded-md hover:bg-neutral-800/60 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0d0e] border-b border-neutral-800 px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="block py-2 text-sm text-neutral-300 hover:text-white transition-colors border-b border-neutral-900"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-black bg-white rounded-lg hover:bg-neutral-200 transition-colors"
            >
              {lang === 'ja' ? '無料相談・お見積り' : 'Start a Project'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
