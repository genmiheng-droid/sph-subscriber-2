import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/plans';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  return (
    <section id="faqs" className="py-10 px-5 sm:px-7 bg-[#F7F8FA] border-t border-slate-200">
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-wider text-[#0C5AA6] uppercase mb-1">
          Frequently Asked Questions
        </p>
        <h2 className="font-serif text-2xl font-bold text-[#0B2A4A] tracking-tight">
          Quick answers on offers and billing
        </h2>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-200">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-slate-50/70 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0C5AA6]"
              >
                <span className="text-sm font-semibold text-[#0B2A4A]">{item.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-4 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
