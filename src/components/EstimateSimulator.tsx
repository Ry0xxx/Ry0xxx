import React, { useState, useMemo } from 'react';
import { Calculator, Check, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface EstimateSimulatorProps {
  lang: Language;
  onApplyEstimate: (summary: string, category: string, budget: string) => void;
}

interface ProjectTypeOption {
  id: string;
  name: string;
  nameEn: string;
  basePrice: number;
  baseWeeks: number;
}

interface ScaleOption {
  id: string;
  name: string;
  nameEn: string;
  desc: string;
  descEn: string;
  multiplier: number;
  weeksAdd: number;
}

interface AddonOption {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  weeks: number;
}

export const EstimateSimulator: React.FC<EstimateSimulatorProps> = ({ lang, onApplyEstimate }) => {
  const projectTypes: ProjectTypeOption[] = [
    { id: 'webapp', name: 'Webアプリケーション / SaaS開発', nameEn: 'Web App / SaaS Platform', basePrice: 2000000, baseWeeks: 8 },
    { id: 'brand', name: 'コーポレート / ブランドサイト', nameEn: 'Corporate & Brand Showcase', basePrice: 1200000, baseWeeks: 5 },
    { id: 'dx', name: '社内業務DX / カスタムダッシュボード', nameEn: 'Internal DX Dashboard', basePrice: 1800000, baseWeeks: 7 },
    { id: 'design-system', name: 'UI/UX設計 & デザインシステム構築', nameEn: 'UI/UX System & Design Tokens', basePrice: 1000000, baseWeeks: 4 },
  ];

  const scaleOptions: ScaleOption[] = [
    { id: 'mvp', name: 'MVP / 初期検証', nameEn: 'MVP / Prototype', desc: '必要最小限のコア機能に特化', descEn: 'Focus on essential core flows', multiplier: 0.8, weeksAdd: 0 },
    { id: 'standard', name: 'スタンダード規模', nameEn: 'Standard Production', desc: '本格的な運用を見据えた構成', descEn: 'Robust standard production scale', multiplier: 1.0, weeksAdd: 2 },
    { id: 'enterprise', name: 'エンタープライズ', nameEn: 'Enterprise Scale', desc: '大規模トラフィック・高セキュリティ要件', descEn: 'High concurrency & compliance', multiplier: 1.6, weeksAdd: 5 },
  ];

  const addonOptions: AddonOption[] = [
    { id: 'i18n', name: '日英バイリンガル多言語化', nameEn: 'Bilingual i18n Architecture', price: 250000, weeks: 1 },
    { id: 'perf', name: '極限パフォーマンス最適化 (Lighthouse 95+)', nameEn: 'Sub-Second Performance Tuning', price: 200000, weeks: 1 },
    { id: 'headless-cms', name: 'ヘッドレスCMS・更新基盤構築', nameEn: 'Headless CMS Integration', price: 300000, weeks: 1 },
    { id: 'api-sync', name: '外部SaaS / データベース双方向連携', nameEn: 'External SaaS / REST Sync', price: 350000, weeks: 1.5 },
    { id: 'maintenance', name: 'リリース後3ヶ月運用保守パッケージ', nameEn: '3-Month Post-Launch Retainer', price: 450000, weeks: 0 },
  ];

  const [selectedType, setSelectedType] = useState<string>('webapp');
  const [selectedScale, setSelectedScale] = useState<string>('standard');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['perf']);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculation = useMemo(() => {
    const pType = projectTypes.find((p) => p.id === selectedType) || projectTypes[0];
    const scale = scaleOptions.find((s) => s.id === selectedScale) || scaleOptions[1];

    const baseCost = pType.basePrice * scale.multiplier;
    const addonsCost = selectedAddons.reduce((acc, currId) => {
      const addon = addonOptions.find((a) => a.id === currId);
      return acc + (addon ? addon.price : 0);
    }, 0);

    const minTotal = Math.round((baseCost + addonsCost) * 0.95);
    const maxTotal = Math.round((baseCost + addonsCost) * 1.15);

    const baseTime = pType.baseWeeks + scale.weeksAdd;
    const addonTime = selectedAddons.reduce((acc, currId) => {
      const addon = addonOptions.find((a) => a.id === currId);
      return acc + (addon ? addon.weeks : 0);
    }, 0);

    const minWeeks = Math.max(3, Math.round(baseTime + addonTime * 0.8));
    const maxWeeks = Math.round(baseTime + addonTime * 1.2);

    return {
      pType,
      scale,
      minTotal,
      maxTotal,
      minWeeks,
      maxWeeks,
    };
  }, [selectedType, selectedScale, selectedAddons]);

  const handleApply = () => {
    const formattedPrice = `¥${(calculation.minTotal / 10000).toLocaleString()}万 〜 ¥${(calculation.maxTotal / 10000).toLocaleString()}万円`;
    const summary = `${calculation.pType.name} (${calculation.scale.name}) / オプション: ${selectedAddons.length}件選択 / 目安期間: ${calculation.minWeeks}〜${calculation.maxWeeks}週間`;
    
    // Determine budget category range
    let budgetBucket = '200-300万';
    if (calculation.maxTotal < 1500000) budgetBucket = '100-200万';
    else if (calculation.maxTotal < 3000000) budgetBucket = '200-300万';
    else if (calculation.maxTotal < 5000000) budgetBucket = '300-500万';
    else budgetBucket = '500万以上';

    onApplyEstimate(summary, calculation.pType.id, budgetBucket);
  };

  return (
    <section id="estimator" className="py-20 md:py-28 border-b border-neutral-800/80 bg-[#0c0d0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 mb-2 font-mono">
              Transparent Pricing
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-['Syne']">
              {lang === 'ja' ? 'リアルタイム費用・期間シミュレータ' : 'Live Estimate & Timeline Calculator'}
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            {lang === 'ja'
              ? '不透明になりがちな受託開発の費用感とスケジュールを即座に試算できます。要件に応じた柔軟な調整が可能です。'
              : 'Explore transparent pricing ranges and realistic delivery timelines tailored to your architecture.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Project Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                01. {lang === 'ja' ? 'プロジェクト種別を選択' : 'Select Project Architecture'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 text-left rounded-xl border transition-all text-xs font-medium ${
                      selectedType === type.id
                        ? 'border-white bg-neutral-800/90 text-white shadow-sm'
                        : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    <div className="font-semibold text-sm mb-1 text-white">
                      {lang === 'ja' ? type.name : type.nameEn}
                    </div>
                    <div className="text-neutral-400 font-mono text-[11px]">
                      {lang === 'ja' ? `基準納期: 約${type.baseWeeks}週間〜` : `Base: ~${type.baseWeeks} wks`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Scale */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                02. {lang === 'ja' ? '開発規模・スコープ' : 'Development Scale & Concurrency'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {scaleOptions.map((scale) => (
                  <button
                    key={scale.id}
                    type="button"
                    onClick={() => setSelectedScale(scale.id)}
                    className={`p-4 text-left rounded-xl border transition-all text-xs ${
                      selectedScale === scale.id
                        ? 'border-white bg-neutral-800/90 text-white shadow-sm'
                        : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    <div className="font-semibold text-sm mb-1 text-white">
                      {lang === 'ja' ? scale.name : scale.nameEn}
                    </div>
                    <div className="text-neutral-400 text-[11px] leading-tight">
                      {lang === 'ja' ? scale.desc : scale.descEn}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Add-on Features */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                03. {lang === 'ja' ? 'オプション要件・技術要件' : 'Optional Architecture & Enhancements'}
              </label>
              <div className="space-y-2">
                {addonOptions.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors text-xs ${
                        isChecked
                          ? 'border-neutral-700 bg-neutral-800/70 text-white'
                          : 'border-neutral-800/90 bg-neutral-900/30 text-neutral-400 hover:text-white hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                            isChecked ? 'bg-white text-black' : 'border border-neutral-700 bg-transparent'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="font-medium">
                          {lang === 'ja' ? addon.name : addon.nameEn}
                        </span>
                      </div>
                      <div className="font-mono text-neutral-400 text-[11px] tabular-nums">
                        +¥{(addon.price / 10000).toLocaleString()}万円
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Result Card (Persistent summary) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/90 border border-neutral-700/80 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase">
                  <Calculator className="w-4 h-4 text-white" />
                  <span>{lang === 'ja' ? '概算見積もり結果' : 'Estimated Investment'}</span>
                </div>
                <span className="text-[11px] text-neutral-400">
                  {lang === 'ja' ? '※税別概算' : 'excl. tax'}
                </span>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <div className="text-xs text-neutral-400 mb-1">
                  {lang === 'ja' ? '想定制作費用レンジ' : 'Estimated Cost Range'}
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-white font-mono tabular-nums tracking-tight">
                  ¥{(calculation.minTotal / 10000).toLocaleString()}<span className="text-xl text-neutral-400 font-sans mx-1.5">〜</span>
                  ¥{(calculation.maxTotal / 10000).toLocaleString()}
                  <span className="text-base text-neutral-400 font-sans ml-1">万円</span>
                </div>
              </div>

              {/* Delivery timeline */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-800/50 border border-neutral-700/50 mb-6">
                <Clock className="w-4 h-4 text-neutral-300 shrink-0" />
                <div className="text-xs">
                  <span className="text-neutral-400 mr-2">{lang === 'ja' ? '想定開発期間:' : 'Delivery Window:'}</span>
                  <span className="font-semibold text-white font-mono tabular-nums">
                    {calculation.minWeeks} 〜 {calculation.maxWeeks} {lang === 'ja' ? '週間' : 'Weeks'}
                  </span>
                  <span className="text-neutral-400 ml-1">
                    ({lang === 'ja' ? `約${Math.round(calculation.minWeeks / 4)}〜${Math.round(calculation.maxWeeks / 4)}ヶ月` : `~${Math.round(calculation.maxWeeks / 4)} months`})
                  </span>
                </div>
              </div>

              {/* Included specifications list */}
              <div className="space-y-2 text-xs text-neutral-400 mb-8 border-t border-neutral-800 pt-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-300" />
                  <span>{lang === 'ja' ? 'Figma設計データ / 完全ソースコード譲渡' : 'Complete Figma & Source Code Handover'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-300" />
                  <span>{lang === 'ja' ? 'クロスブラウザ & レスポンシブ完全対応' : 'Full Responsive & Cross-Browser Verification'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-300" />
                  <span>{lang === 'ja' ? '納品後30日間の初期不具合無償保証' : '30-Day Post-Launch Bug Warranty'}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleApply}
                className="w-full py-3.5 px-4 text-xs sm:text-sm font-semibold text-black bg-white hover:bg-neutral-200 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <span>{lang === 'ja' ? 'この試算内容で問い合わせる' : 'Apply to Contact Form'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
