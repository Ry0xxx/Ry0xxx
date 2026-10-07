import React from 'react';
import { Language } from '../types';
import { COMPANY_INFO } from '../data/content';

interface PhilosophySectionProps {
  lang: Language;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ lang }) => {
  const principles = [
    {
      num: '01',
      title: '本質のみを残す削ぎ落としの美学',
      titleEn: 'Simplicity Over Noise',
      desc: '表層的な装飾や流行のギミックではなく、ユーザーの意思決定を淀みなく前進させる構造美を追求します。ノイズを削ぎ落としたインターフェースこそが最も高い変換効率を生みます。',
      descEn: 'We discard transient superficial decoration in favor of intuitive, high-clarity structures that empower user decisions without cognitive friction.',
    },
    {
      num: '02',
      title: '圧倒的な開発速度と細部への偏執',
      titleEn: 'Velocity & Micro-Precision',
      desc: '1ピクセルの余白、10ミリ秒のアニメーション減速曲線、タイポグラフィの行送りまで妥協しません。アジャイルな検証速度と極限の完成度を両立させます。',
      descEn: 'Relentless attention to typographic scale, micro-interaction ease curves, and rendering latency, balanced with rapid continuous iteration.',
    },
    {
      num: '03',
      title: '事業拡大に耐えうる堅牢なコード設計',
      titleEn: 'Architected for Resilience & Scale',
      desc: '一度作って終わりの受託ではありません。リリース後も社内開発チームが自走できるよう、再利用性の高いモジュール設計と包括的な型安全性を徹底します。',
      descEn: 'We deliver maintainable, type-safe architectures designed to scale effortlessly as your internal engineering organization grows.',
    },
  ];

  return (
    <section id="philosophy" className="py-20 md:py-28 border-b border-neutral-800/80 bg-[#0a0b0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Philosophy Intro */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs uppercase tracking-widest text-neutral-400 mb-2 font-mono">
            Design Philosophy
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-6 font-['Syne']">
            {lang === 'ja'
              ? '「美しさと事業成果」は、決して相反しない。'
              : 'Elegance and business outcomes are not opposing forces.'}
          </h2>
          <p className="text-base text-neutral-400 leading-relaxed">
            {lang === 'ja'
              ? 'STUDIO AURAは、洗練されたビジュアル表現と妥協のないソフトウェア工学をひとつの規律として統合したスタジオです。私たちは単なる受託制作会社ではなく、事業の成長を技術とデザインで共に切り拓く共同創業者（Co-creator）として伴走します。'
              : 'STUDIO AURA converges brand aesthetics and disciplined software engineering into a unified craft. We operate not as external vendors, but as architectural co-creators invested in enduring impact.'}
          </p>
        </div>

        {/* 3 Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {principles.map((p) => (
            <div
              key={p.num}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/30 border border-neutral-800 flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono text-neutral-400 mb-4">{p.num}. PRINCIPLE</div>
                <h3 className="text-lg font-bold text-white mb-3 font-['Syne']">
                  {lang === 'ja' ? p.title : p.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {lang === 'ja' ? p.desc : p.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Company Overview Table */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-10">
          <div className="text-xs uppercase tracking-widest text-neutral-400 mb-6 font-mono">
            Company Factsheet
          </div>

          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-xs sm:text-sm">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-neutral-800 pb-3 gap-1">
              <dt className="text-neutral-400">{lang === 'ja' ? '会社名' : 'Company Name'}</dt>
              <dd className="font-medium text-white">{lang === 'ja' ? COMPANY_INFO.name : COMPANY_INFO.nameEn}</dd>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-neutral-800 pb-3 gap-1">
              <dt className="text-neutral-400">{lang === 'ja' ? '設立年月' : 'Founded'}</dt>
              <dd className="font-medium text-white font-mono tabular-nums">
                {lang === 'ja' ? COMPANY_INFO.established : COMPANY_INFO.establishedEn}
              </dd>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-neutral-800 pb-3 gap-1">
              <dt className="text-neutral-400">{lang === 'ja' ? 'クリエイティブ統括' : 'Leadership'}</dt>
              <dd className="font-medium text-white">{COMPANY_INFO.directors}</dd>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-neutral-800 pb-3 gap-1">
              <dt className="text-neutral-400">{lang === 'ja' ? 'オフィス所在地' : 'Headquarters'}</dt>
              <dd className="font-medium text-white text-right">
                {lang === 'ja' ? COMPANY_INFO.location : COMPANY_INFO.locationEn}
              </dd>
            </div>

            <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-neutral-800 pb-3 gap-1">
              <dt className="text-neutral-400 shrink-0 mr-4">{lang === 'ja' ? '事業内容' : 'Core Disciplines'}</dt>
              <dd className="font-medium text-white text-right">
                {lang === 'ja' ? COMPANY_INFO.businessAreas : COMPANY_INFO.businessAreasEn}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};
