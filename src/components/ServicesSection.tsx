import React from 'react';
import { ArrowUpRight, Layers, Cpu, Workflow, TrendingUp } from 'lucide-react';
import { Language, ServiceItem } from '../types';
import { SERVICES } from '../data/content';

interface ServicesSectionProps {
  lang: Language;
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ lang, onSelectService }) => {
  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'ui-ux':
        return <Layers className="w-5 h-5 text-neutral-300" />;
      case 'web-engineering':
        return <Cpu className="w-5 h-5 text-neutral-300" />;
      case 'dx-tools':
        return <Workflow className="w-5 h-5 text-neutral-300" />;
      case 'growth-optimization':
        return <TrendingUp className="w-5 h-5 text-neutral-300" />;
      default:
        return <Layers className="w-5 h-5 text-neutral-300" />;
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 border-b border-neutral-800/80 bg-[#0c0d0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 mb-2 font-mono">
              Core Capabilities
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-['Syne']">
              {lang === 'ja' ? '事業を牽引する4つの専門領域' : 'Disciplines & Capabilities'}
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            {lang === 'ja'
              ? '戦略策定からUI設計、クラウド構築、グロースまで。分断されがちな工程をひとつの緊密なクラフトチームで完結させます。'
              : 'Bridging design strategy, frontend architecture, and engineering execution without fragmentation.'}
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, index) => {
            const isLarge = index === 0 || index === 3;
            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service)}
                className={`group relative p-6 sm:p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isLarge ? 'md:col-span-1' : 'md:col-span-1'
                }`}
              >
                <div>
                  {/* Top line: Index + Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-neutral-400">
                        {service.number}
                      </span>
                      <span className="text-neutral-500">/</span>
                      <span className="text-xs text-neutral-400">
                        {lang === 'ja' ? service.category : service.categoryEn}
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-neutral-800/60 border border-neutral-700/60 group-hover:bg-neutral-800 transition-colors">
                      {getServiceIcon(service.id)}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-neutral-200 transition-colors font-['Syne']">
                    {lang === 'ja' ? service.title : service.titleEn}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                    {lang === 'ja' ? service.description : service.descriptionEn}
                  </p>

                  {/* Deliverables snippet (Unboxed text) */}
                  <div className="space-y-1.5 mb-6 text-xs text-neutral-400 border-l border-neutral-800 pl-3">
                    {(lang === 'ja' ? service.deliverables : service.deliverablesEn).slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-neutral-400">·</span>
                        <span className="text-neutral-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom line: Duration & Action trigger */}
                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                  <div className="text-neutral-400">
                    <span className="text-neutral-500 mr-2">{lang === 'ja' ? '標準期間:' : 'Timeline:'}</span>
                    <span className="font-medium text-neutral-300">{lang === 'ja' ? service.duration : service.durationEn}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 font-semibold text-white group-hover:translate-x-1 transition-transform">
                    {lang === 'ja' ? '仕様・納品物詳細' : 'View Scope'}
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
