import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Language } from '../types';
import { FAQS } from '../data/content';

interface FaqSectionProps {
  lang: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 border-b border-neutral-800/80 bg-[#0c0d0e]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <div className="text-xs uppercase tracking-widest text-neutral-400 mb-2 font-mono">
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-['Syne']">
            {lang === 'ja' ? 'よくあるご質問' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="divide-y divide-neutral-800 border-y border-neutral-800">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-5">
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-neutral-200 group-hover:text-white transition-colors">
                    {lang === 'ja' ? faq.question : faq.questionEn}
                  </span>
                  <span className="p-1.5 rounded-lg bg-neutral-800/60 text-neutral-400 group-hover:text-white transition-colors shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="pt-3 pb-2 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {lang === 'ja' ? faq.answer : faq.answerEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
