import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import { Language, ContactFormData } from '../types';

interface ContactSectionProps {
  lang: Language;
  initialData?: {
    summary: string;
    category: string;
    budget: string;
  } | null;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang, initialData }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    company: '',
    email: '',
    projectType: 'webapp',
    budget: '200-300万',
    message: '',
    simulatorDetails: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<{
    id: string;
    name: string;
    email: string;
    projectType: string;
    budget: string;
    date: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Sync initialData if provided from the estimator
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        projectType: initialData.category || prev.projectType,
        budget: initialData.budget || prev.budget,
        simulatorDetails: initialData.summary,
        message: prev.message || (lang === 'ja'
          ? `【試算条件】\n${initialData.summary}\n\n上記の内容で相談を希望します。`
          : `[Estimated Architecture]\n${initialData.summary}\n\nWe would like to consult on the above specifications.`),
      }));
    }
  }, [initialData, lang]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = lang === 'ja' ? 'お名前をご入力ください' : 'Please enter your name';
    }
    if (!formData.email.trim()) {
      errs.email = lang === 'ja' ? 'メールアドレスをご入力ください' : 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = lang === 'ja' ? '有効なメールアドレス形式で入力してください' : 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      errs.message = lang === 'ja' ? 'ご相談内容をご入力ください' : 'Please describe your project';
    } else if (formData.message.trim().length < 10) {
      errs.message = lang === 'ja' ? '10文字以上で具体的にご入力ください' : 'Please provide at least 10 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const receiptId = `AUR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedReceipt({
        id: receiptId,
        name: formData.name,
        email: formData.email,
        projectType: formData.projectType,
        budget: formData.budget,
        date: new Date().toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US'),
      });
      setIsSubmitting(false);
    }, 600);
  };

  const handleCopyReceipt = () => {
    if (!submittedReceipt) return;
    navigator.clipboard.writeText(
      `STUDIO AURA 受付番号: ${submittedReceipt.id}\nお名前: ${submittedReceipt.name}\nメール: ${submittedReceipt.email}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setSubmittedReceipt(null);
    setFormData({
      name: '',
      company: '',
      email: '',
      projectType: 'webapp',
      budget: '200-300万',
      message: '',
      simulatorDetails: '',
    });
    setErrors({});
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#0a0b0c] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-neutral-400 mb-2 font-mono">
            Get in Touch
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4 font-['Syne']">
            {lang === 'ja' ? 'プロジェクトのご相談・お見積り' : 'Start Your Next Digital Architecture'}
          </h2>
          <p className="text-sm text-neutral-400">
            {lang === 'ja'
              ? '初回ヒアリングおよび要件整理・お見積りの作成はすべて無償で承っております。原則1営業日以内にリードエンジニアよりご連絡いたします。'
              : 'Discovery consultations and proposal roadmaps are completely complimentary. Our lead architect will respond within 1 business day.'}
          </p>
        </div>

        {submittedReceipt ? (
          /* Submission Confirmation Card */
          <div className="max-w-2xl mx-auto p-8 sm:p-10 rounded-2xl bg-neutral-900 border border-neutral-700/80 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-['Syne']">
              {lang === 'ja' ? 'お問い合わせを受け付けました' : 'Inquiry Received Successfully'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mb-6">
              {lang === 'ja'
                ? 'ご入力いただいたメールアドレス宛に自動確認メールを送信いたしました。担当者より迅速にご提案日程をご案内いたします。'
                : 'A confirmation has been logged. Our design director will reach out to review technical milestones.'}
            </p>

            {/* Receipt Summary Box */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 text-left mb-6 font-mono text-xs space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
                <span className="text-neutral-500">{lang === 'ja' ? '受付番号' : 'Inquiry Ref'}:</span>
                <span className="text-white font-bold">{submittedReceipt.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500">{lang === 'ja' ? 'お名前' : 'Name'}:</span>
                <span className="text-neutral-300 font-sans">{submittedReceipt.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500">{lang === 'ja' ? '送信日時' : 'Logged Date'}:</span>
                <span className="text-neutral-300">{submittedReceipt.date}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleCopyReceipt}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white rounded-lg border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (lang === 'ja' ? 'コピー完了' : 'Copied!') : (lang === 'ja' ? '受付番号をコピー' : 'Copy Reference ID')}</span>
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-black bg-white hover:bg-neutral-200 rounded-lg transition-colors"
              >
                {lang === 'ja' ? '新しいメッセージを送信' : 'Submit Another Inquiry'}
              </button>
            </div>
          </div>
        ) : (
          /* Real Validated Inquiry Form */
          <form
            onSubmit={handleSubmit}
            noValidate
            className="p-6 sm:p-10 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-6"
          >
            {/* Optional badge when sync from estimator */}
            {formData.simulatorDetails && (
              <div className="p-3.5 rounded-xl bg-neutral-800/60 border border-neutral-700/60 flex items-start justify-between gap-3 text-xs">
                <div>
                  <span className="font-semibold text-white mr-2">
                    {lang === 'ja' ? '✓ 費用シミュレータの試算条件が反映されています' : '✓ Live simulator specifications linked'}
                  </span>
                  <p className="text-neutral-400 mt-0.5">{formData.simulatorDetails}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, simulatorDetails: '' }))}
                  className="text-neutral-500 hover:text-neutral-300 text-[11px] shrink-0"
                >
                  {lang === 'ja' ? 'クリア' : 'Clear'}
                </button>
              </div>
            )}

            {/* Name & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                  {lang === 'ja' ? 'お名前' : 'Full Name'} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={lang === 'ja' ? '例：山田 太郎' : 'e.g. Taro Yamada'}
                  className={`w-full px-4 py-3 rounded-xl bg-neutral-950 border text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                    errors.name ? 'border-red-500 focus:border-red-400' : 'border-neutral-800 focus:border-white'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                  {lang === 'ja' ? '貴社名' : 'Company / Organization'}
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder={lang === 'ja' ? '例：株式会社サンプル' : 'e.g. Acme Corp'}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                {lang === 'ja' ? 'メールアドレス' : 'Email Address'} <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@company.com"
                className={`w-full px-4 py-3 rounded-xl bg-neutral-950 border text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                  errors.email ? 'border-red-500 focus:border-red-400' : 'border-neutral-800 focus:border-white'
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Project Type & Budget Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                  {lang === 'ja' ? 'ご相談カテゴリ' : 'Project Category'}
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-white transition-colors"
                >
                  <option value="webapp">{lang === 'ja' ? 'Webアプリケーション / SaaS開発' : 'Web App / SaaS Engineering'}</option>
                  <option value="brand">{lang === 'ja' ? 'コーポレート / ブランドサイト' : 'Corporate & Brand Showcase'}</option>
                  <option value="dx">{lang === 'ja' ? '社内業務DX / カスタムダッシュボード' : 'Internal DX Dashboard'}</option>
                  <option value="design-system">{lang === 'ja' ? 'UI/UX設計 & デザインシステム' : 'UI/UX Design Systems'}</option>
                  <option value="consulting">{lang === 'ja' ? '技術顧問 / パフォーマンス改善' : 'Performance / Tech Advisory'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                  {lang === 'ja' ? '想定ご予算感' : 'Estimated Budget Range'}
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-white transition-colors"
                >
                  <option value="100-200万">¥1,000,000 〜 ¥2,000,000</option>
                  <option value="200-300万">¥2,000,000 〜 ¥3,000,000</option>
                  <option value="300-500万">¥3,000,000 〜 ¥5,000,000</option>
                  <option value="500万以上">¥5,000,000 〜</option>
                  <option value="未定">{lang === 'ja' ? '未定 / 相談して決めたい' : 'To be determined'}</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                {lang === 'ja' ? 'プロジェクト概要・ご相談内容' : 'Project Scope & Requirements'} <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={lang === 'ja'
                  ? '開発の背景、解決したい課題、希望するリリース時期などをご記入ください。'
                  : 'Outline your project goals, technical challenges, and target milestones.'}
                className={`w-full px-4 py-3 rounded-xl bg-neutral-950 border text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors resize-none ${
                  errors.message ? 'border-red-500 focus:border-red-400' : 'border-neutral-800 focus:border-white'
                }`}
              />
              {errors.message && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.message}</span>
                </p>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 text-sm font-semibold text-black bg-white hover:bg-neutral-200 disabled:bg-neutral-600 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                    <span>{lang === 'ja' ? '送信処理中...' : 'Submitting...'}</span>
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{lang === 'ja' ? 'この内容で送信する（無料相談）' : 'Submit Project Inquiry'}</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-neutral-400 text-center mt-3">
                {lang === 'ja'
                  ? '送信いただいた個人情報は、お問い合わせへの対応目的以外には使用いたしません。'
                  : 'Your information is protected strictly under our confidential privacy standards.'}
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
