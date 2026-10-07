import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Language } from '../types';
import { COMPANY_INFO } from '../data/content';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-800 bg-[#08090a] text-neutral-400 py-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <a
              href="#"
              className="text-lg font-bold tracking-tight text-white inline-block font-['Syne']"
            >
              STUDIO AURA
            </a>
            <p className="text-neutral-400 max-w-sm leading-relaxed">
              {lang === 'ja'
                ? '東京・渋谷を拠点とするデジタルプロダクトデザイン＆エンジニアリングスタジオ。妥協なき美学と堅牢なテクノロジーで、事業の持続的成長を支えます。'
                : 'Tokyo-based digital product design and software engineering studio. Crafting resilient web platforms and enduring brand systems.'}
            </p>
            <div className="text-neutral-500 font-mono text-[11px]">
              {COMPANY_INFO.location}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider font-mono text-[11px]">
              Navigation
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  {lang === 'ja' ? 'サービス・領域' : 'Services'}
                </a>
              </li>
              <li>
                <a href="#works" className="hover:text-white transition-colors">
                  {lang === 'ja' ? '制作実績' : 'Selected Works'}
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-white transition-colors">
                  {lang === 'ja' ? '費用シミュレータ' : 'Live Estimator'}
                </a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-white transition-colors">
                  {lang === 'ja' ? '理念・会社概要' : 'Philosophy & About'}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {lang === 'ja' ? 'よくある質問' : 'FAQ'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider font-mono text-[11px]">
              Direct Inquiries
            </div>
            <p className="text-neutral-400">
              {COMPANY_INFO.contactEmail}
            </p>
            <p className="text-neutral-500 text-[11px] leading-relaxed">
              {lang === 'ja' ? '平日 10:00 〜 19:00 (JST)' : 'Mon - Fri, 10:00 - 19:00 (JST)'}
              <br />
              {lang === 'ja' ? 'オンライン相談全国対応' : 'Available for global remote engagements'}
            </p>
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-block px-3.5 py-1.5 text-[11px] font-medium text-white border border-neutral-700 rounded-md hover:bg-neutral-800 transition-colors"
              >
                {lang === 'ja' ? '問い合わせフォームへ' : 'Contact Us'}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400">
          <div>
            © {new Date().getFullYear()} STUDIO AURA Inc. All rights reserved.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors text-[11px]"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
