import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { HERO_IMAGE } from '../data/content';

interface HeroProps {
  lang: Language;
  onOpenContact: () => void;
  onExploreWorks: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenContact, onExploreWorks }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-neutral-800/80 overflow-hidden">
      {/* Subtle radial ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-neutral-800/20 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Unboxed Metadata Kicker (Zero-Pill Discipline) */}
        <div className="flex items-center gap-2 text-xs md:text-sm text-neutral-400 mb-6 tracking-wide">
          <span className="font-medium text-neutral-300">Tokyo · Shibuya</span>
          <span aria-hidden="true" className="text-neutral-600">/</span>
          <span>Digital Product Architecture & Engineering</span>
          <span aria-hidden="true" className="text-neutral-600">/</span>
          <span className="text-neutral-400">Est. 2021</span>
        </div>

        {/* Display Headline */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-6 font-['Syne']">
            {lang === 'ja' ? (
              <>
                本質を削り出し、<br />
                持続する事業価値をデザインする。
              </>
            ) : (
              <>
                Architecting digital products <br />
                that define industry standards.
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl mb-10">
            {lang === 'ja'
              ? 'UI/UXデザイン、モダンフロントエンド開発、堅牢なクラウド設計をワンストップで統合。初期検証から月間億単位のトラフィックを支えるスケールまで、細部に宿るクラフトマンシップで事業成長を加速します。'
              : 'End-to-end integration of UI/UX systems, modern web engineering, and scalable cloud architectures. From rapid MVP validation to multi-million user scalability, delivered with uncompromising precision.'}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-black bg-white rounded-lg hover:bg-neutral-200 transition-all shadow-sm group whitespace-nowrap"
            >
              <span>{lang === 'ja' ? 'プロジェクトの相談・お見積り' : 'Schedule Discovery Call'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              type="button"
              onClick={onExploreWorks}
              className="inline-flex items-center justify-center px-5 py-3.5 text-sm font-medium text-neutral-300 hover:text-white transition-colors border border-neutral-800 hover:border-neutral-700 rounded-lg whitespace-nowrap bg-neutral-900/40"
            >
              {lang === 'ja' ? '制作実績を一覧する' : 'Explore Case Studies'}
            </button>
          </div>
        </div>

        {/* Visual Anchor (16:9 Cinematic Showcase Frame) */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl mb-16 group">
          {!imgError ? (
            <div className="aspect-[16/9] w-full relative overflow-hidden bg-neutral-950">
              <img
                src={HERO_IMAGE}
                alt="STUDIO AURA Tokyo Studio workspace"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              {/* Subtle bottom gradient scrim for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* In-Frame Contextual Caption */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-medium text-white">Studio Headquarters — Jinnan, Shibuya</span>
                  <span aria-hidden="true" className="text-neutral-500">·</span>
                  <span className="text-neutral-400">Design & Engineering Labs</span>
                </div>
                <div className="text-neutral-400 hidden sm:block">
                  Available for Q2 / Q3 2026 Projects
                </div>
              </div>
            </div>
          ) : (
            /* Resilient Fallback Container */
            <div className="aspect-[16/9] w-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 text-center">
              <Sparkles className="w-10 h-10 text-neutral-400 mb-3" />
              <p className="text-lg font-semibold text-white">STUDIO AURA Tokyo Labs</p>
              <p className="text-xs text-neutral-400 mt-1">Digital Product Design & Engineering</p>
            </div>
          )}
        </div>

        {/* Claim-to-Proof Adjacency (Quantitative Rigor with Tabular Figures) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-neutral-800/80">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums tracking-tight">
              120<span className="text-neutral-400 font-sans text-xl">+</span>
            </div>
            <div className="text-xs sm:text-sm text-neutral-400 mt-1">
              {lang === 'ja' ? '納品完了プロジェクト' : 'Delivered Products'}
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums tracking-tight">
              98.4<span className="text-neutral-400 font-sans text-xl">%</span>
            </div>
            <div className="text-xs sm:text-sm text-neutral-400 mt-1">
              {lang === 'ja' ? 'クライアント継続・リピート率' : 'Client Retention Rate'}
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums tracking-tight">
              +64<span className="text-neutral-400 font-sans text-xl">%</span>
            </div>
            <div className="text-xs sm:text-sm text-neutral-400 mt-1">
              {lang === 'ja' ? '平均コンバージョン改善率' : 'Avg. Conversion Lift'}
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums tracking-tight">
              100<span className="text-neutral-400 font-sans text-xl">%</span>
            </div>
            <div className="text-xs sm:text-sm text-neutral-400 mt-1">
              {lang === 'ja' ? '納期遵守率 (オンタイム納品)' : 'On-Time Delivery'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
