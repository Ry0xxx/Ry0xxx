import React, { useEffect } from 'react';
import { X, CheckCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { Language, CaseStudy } from '../types';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  lang: Language;
  onClose: () => void;
  onInquireAboutCase: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  study,
  lang,
  onClose,
  onInquireAboutCase,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (study) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [study, onClose]);

  if (!study) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#111215] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#0c0d0e]">
          <div className="flex items-center gap-3 text-xs text-neutral-400">
            <span className="font-semibold text-white">Case Study Archive</span>
            <span className="text-neutral-600">/</span>
            <span>{study.categoryLabel}</span>
            <span className="text-neutral-600">/</span>
            <span className="font-mono">{study.year}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Top Title & Client */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-['Syne']">
              {lang === 'ja' ? study.title : study.titleEn}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-mono">
              Client: {study.client}
            </p>
          </div>

          {/* Full Image Banner */}
          <div className="aspect-[16/9] w-full rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
            <img
              src={study.image}
              alt={study.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Quantified Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-xl bg-neutral-900/80 border border-neutral-800">
            {study.metrics.map((m, idx) => (
              <div key={idx} className="border-l sm:border-l-0 sm:border-r last:border-r-0 border-neutral-800 pl-3 sm:pl-0 sm:pr-4">
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider mb-1">
                  {lang === 'ja' ? m.label : m.labelEn}
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Challenge & Solution */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-2 font-mono">
                01. {lang === 'ja' ? 'プロジェクトの背景と課題' : 'The Challenge'}
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {lang === 'ja' ? study.challenge : study.challengeEn}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-2 font-mono">
                02. {lang === 'ja' ? 'アプローチと解決策' : 'The Solution & Craft'}
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {lang === 'ja' ? study.solution : study.solutionEn}
              </p>
            </div>

            {/* Results bullets */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-3 font-mono">
                03. {lang === 'ja' ? '達成された具体的成果' : 'Measurable Impact'}
              </h3>
              <div className="space-y-2">
                {(lang === 'ja' ? study.results : study.resultsEn).map((res, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack (Unboxed metadata) */}
            <div className="pt-4 border-t border-neutral-800">
              <div className="text-xs text-neutral-400 mb-2 font-mono uppercase tracking-wider">
                Technologies & Architecture
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-neutral-300 font-mono">
                {study.techStack.map((tech, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded-md">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-[#0c0d0e] border-t border-neutral-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-neutral-400 hover:text-white transition-colors"
          >
            {lang === 'ja' ? '閉じる' : 'Close'}
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onInquireAboutCase();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-black bg-white hover:bg-neutral-200 rounded-lg transition-colors"
          >
            <span>{lang === 'ja' ? '同規模プロジェクトを相談する' : 'Inquire on Similar Project'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
