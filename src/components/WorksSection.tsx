import React, { useState } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Language, CaseStudy } from '../types';
import { CASE_STUDIES } from '../data/content';

interface WorksSectionProps {
  lang: Language;
  onSelectCaseStudy: (study: CaseStudy) => void;
}

export const WorksSection: React.FC<WorksSectionProps> = ({ lang, onSelectCaseStudy }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: lang === 'ja' ? 'すべての実績' : 'All Works' },
    { id: 'fintech', label: lang === 'ja' ? 'Fintech / 金融' : 'Fintech' },
    { id: 'lifestyle', label: lang === 'ja' ? 'Artisan / EC' : 'Artisan / Commerce' },
    { id: 'mobility', label: lang === 'ja' ? 'Mobility / IoT' : 'Mobility & IoT' },
  ];

  const filteredStudies = activeCategory === 'all'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((c) => c.category === activeCategory);

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="works" className="py-20 md:py-28 border-b border-neutral-800/80 bg-[#0a0b0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 mb-2 font-mono">
              Selected Works
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-['Syne']">
              {lang === 'ja' ? '確かな成果をもたらした制作事例' : 'Case Studies & Proven Impact'}
            </h2>
          </div>

          {/* Interactive Filter Tabs (Functional Button Controls) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900/80 border border-neutral-800 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              onClick={() => onSelectCaseStudy(study)}
              className="group rounded-2xl bg-neutral-900/40 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Media Container (4:3) */}
              <div className="aspect-[4/3] w-full relative overflow-hidden bg-neutral-950 border-b border-neutral-800">
                {!failedImages[study.id] ? (
                  <img
                    src={study.image}
                    alt={study.title}
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(study.id)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-neutral-900">
                    <Sparkles className="w-8 h-8 text-neutral-400 mb-2" />
                    <span className="text-sm font-semibold text-white">{study.title}</span>
                  </div>
                )}
                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid category & year (unboxed) */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-neutral-300">
                  <span>{lang === 'ja' ? study.categoryLabel : study.categoryLabelEn}</span>
                  <span className="font-mono text-neutral-400">{study.year}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-neutral-200 transition-colors font-['Syne']">
                      {lang === 'ja' ? study.title : study.titleEn}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                  </div>

                  <p className="text-xs text-neutral-400 mb-3">{study.client}</p>

                  <p className="text-xs sm:text-sm text-neutral-400 line-clamp-3 leading-relaxed mb-6">
                    {lang === 'ja' ? study.summary : study.summaryEn}
                  </p>
                </div>

                {/* Primary Metric Highlight (Claim-to-Proof adjacency) */}
                <div className="pt-4 border-t border-neutral-800">
                  <div className="text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                    {lang === 'ja' ? '主要成果指標' : 'Marquee Metric'}
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-neutral-300">
                      {lang === 'ja' ? study.metrics[0].label : study.metrics[0].labelEn}
                    </span>
                    <span className="text-lg font-bold text-white font-mono tabular-nums">
                      {study.metrics[0].value}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
