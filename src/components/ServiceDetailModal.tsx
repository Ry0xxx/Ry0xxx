import React, { useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, Clock, Layers } from 'lucide-react';
import { Language, ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  lang: Language;
  onClose: () => void;
  onInquireService: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  lang,
  onClose,
  onInquireService,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-[#111215] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#0c0d0e]">
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
            <span>SPECIFICATION</span>
            <span className="text-neutral-600">/</span>
            <span>{service.number}</span>
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

        {/* Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <div>
            <div className="text-xs text-neutral-400 font-mono mb-1">
              {lang === 'ja' ? service.category : service.categoryEn}
            </div>
            <h2 className="text-2xl font-bold text-white mb-3 font-['Syne']">
              {lang === 'ja' ? service.title : service.titleEn}
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {lang === 'ja' ? service.description : service.descriptionEn}
            </p>
          </div>

          {/* Highlight pill box */}
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs sm:text-sm text-neutral-200 flex items-center gap-3">
            <Layers className="w-4 h-4 text-white shrink-0" />
            <span>{lang === 'ja' ? service.highlight : service.highlightEn}</span>
          </div>

          {/* Deliverables List */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3 font-mono">
              {lang === 'ja' ? '主な納品成果物 (Deliverables)' : 'Included Deliverables'}
            </h3>
            <div className="space-y-2">
              {(lang === 'ja' ? service.deliverables : service.deliverablesEn).map((d, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 p-2.5 rounded-lg bg-neutral-950/60 border border-neutral-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech and Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-800 text-xs">
            <div>
              <div className="text-neutral-400 mb-1.5 font-mono uppercase tracking-wider">
                {lang === 'ja' ? '標準スケジュール' : 'Estimated Timeline'}
              </div>
              <div className="flex items-center gap-2 text-white font-medium">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>{lang === 'ja' ? service.duration : service.durationEn}</span>
              </div>
            </div>

            <div>
              <div className="text-neutral-400 mb-1.5 font-mono uppercase tracking-wider">
                {lang === 'ja' ? '主要採用技術' : 'Primary Stack'}
              </div>
              <div className="text-neutral-300 font-mono">
                {service.technologies.join(', ')}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
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
              onInquireService();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-black bg-white hover:bg-neutral-200 rounded-lg transition-colors"
          >
            <span>{lang === 'ja' ? 'この領域を相談する' : 'Inquire on This Service'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
