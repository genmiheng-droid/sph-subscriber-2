import { useState } from 'react';
import { COMPARISON_ROWS, SUBSCRIPTION_PLANS, SubscriptionPlan } from '../data/plans';

interface ComparisonMatrixProps {
  onSelectPlan: (plan: SubscriptionPlan) => void;
}

export function ComparisonMatrix({ onSelectPlan }: ComparisonMatrixProps) {
  const [differencesOnly, setDifferencesOnly] = useState(false);

  const visibleRows = differencesOnly
    ? COMPARISON_ROWS.filter((row) => row.differs)
    : COMPARISON_ROWS;

  const oneDigital = SUBSCRIPTION_PLANS.find((p) => p.id === 'one-digital')!;
  const allDigital = SUBSCRIPTION_PLANS.find((p) => p.id === 'all-digital')!;
  const allDigitalPrint = SUBSCRIPTION_PLANS.find((p) => p.id === 'all-digital-print')!;

  return (
    <section id="compare" className="py-10 px-5 sm:px-7 bg-white border-t border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-semibold tracking-wider text-[#0C5AA6] uppercase mb-1">
            Side-by-Side Specs
          </p>
          <h2 className="font-serif text-2xl font-bold text-[#0B2A4A] tracking-tight">
            Compare the 3 plans
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setDifferencesOnly((prev) => !prev)}
          aria-pressed={differencesOnly}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto cursor-pointer ${
            differencesOnly
              ? 'bg-[#0B2A4A] text-white border-[#0B2A4A]'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          {differencesOnly ? 'Showing Differences Only' : 'Show Differences Only'}
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto">
        <table className="w-full min-w-[600px] text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70">
              <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500 w-[31%]">
                Feature
              </th>
              <th className="py-3 px-4 text-sm font-bold text-[#0B2A4A] w-[23%]">One Digital</th>
              <th className="py-3 px-4 text-sm font-bold text-[#0B2A4A] bg-blue-50/50 w-[23%]">
                All-Digital (Default)
              </th>
              <th className="py-3 px-4 text-sm font-bold text-[#0B2A4A] w-[23%]">
                All-Digital + Print
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
            {visibleRows.map((row) => (
              <tr key={row.feature} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3 px-4 font-medium text-slate-800">{row.feature}</td>
                <td className="py-3 px-4 text-slate-600 tabular-nums">{row.oneDigital}</td>
                <td className="py-3 px-4 text-[#0B2A4A] font-semibold bg-blue-50/30 tabular-nums">
                  {row.allDigital}
                </td>
                <td className="py-3 px-4 text-slate-600 tabular-nums">{row.allDigitalPrint}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-slate-200 bg-slate-50/60">
              <td className="py-3 px-4 text-xs text-slate-500">Prices in SGD incl. GST</td>
              <td className="py-3 px-4">
                <button
                  type="button"
                  onClick={() => onSelectPlan(oneDigital)}
                  className="text-xs font-semibold text-[#0C5AA6] hover:underline underline-offset-4 cursor-pointer whitespace-nowrap"
                >
                  Select One Digital
                </button>
              </td>
              <td className="py-3 px-4 bg-blue-50/30">
                <button
                  type="button"
                  onClick={() => onSelectPlan(allDigital)}
                  className="text-xs font-bold text-[#0B2A4A] hover:underline underline-offset-4 cursor-pointer whitespace-nowrap"
                >
                  Select All-Digital
                </button>
              </td>
              <td className="py-3 px-4">
                <button
                  type="button"
                  onClick={() => onSelectPlan(allDigitalPrint)}
                  className="text-xs font-semibold text-[#0C5AA6] hover:underline underline-offset-4 cursor-pointer whitespace-nowrap"
                >
                  Select + Print
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
