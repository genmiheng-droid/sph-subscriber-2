import { RotateCcw, TrendingUp } from 'lucide-react';
import { CLOSERS_INDICATORS, CloserIndicator } from '../data/plans';

interface ClosersAnalysisPanelProps {
  selectedNumber: number;
  subscriptionCount: number;
  baselineSubscriptions: number;
  lastSubscribedPlan: string | null;
  onSelectIndicator: (indicator: CloserIndicator) => void;
  onTriggerSubscribe: () => void;
  onResetMetric: () => void;
}

export function ClosersAnalysisPanel({
  selectedNumber,
  subscriptionCount,
  baselineSubscriptions,
  lastSubscribedPlan,
  onSelectIndicator,
  onTriggerSubscribe,
  onResetMetric,
}: ClosersAnalysisPanelProps) {
  const activeIndicator =
    CLOSERS_INDICATORS.find((item) => item.number === selectedNumber) ?? CLOSERS_INDICATORS[0];

  const sessionAdditions = subscriptionCount - baselineSubscriptions;

  return (
    <aside
      aria-label="CLOSERS 7-indicator behavioral analysis"
      className="flex flex-col items-center w-full"
    >
      {/* Top caption matching the reference screenshot format */}
      <p className="text-[11px] sm:text-xs font-medium tracking-[0.14em] text-slate-600 uppercase text-center mb-4">
        REVISED · 7 CLOSERS INDICATORS · METRIC: NUMBER OF SUBSCRIPTIONS
      </p>

      {/* Tracked Metric Card: Number of Subscriptions */}
      <div className="w-full max-w-[440px] bg-white border border-slate-200 rounded-2xl px-4 py-3.5 mb-4 shadow-sm flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            North-Star Metric Tracked
          </p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-bold text-[#0B2A4A] tabular-nums">
              {subscriptionCount.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-slate-600">Subscriptions</span>
            {sessionAdditions > 0 && (
              <span className="text-xs font-semibold text-emerald-700 tabular-nums">
                (+{sessionAdditions} live)
              </span>
            )}
          </div>
          {lastSubscribedPlan && (
            <p className="text-[11px] text-slate-500 mt-0.5">
              Latest conversion: {lastSubscribedPlan}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0C5AA6] tabular-nums">
              <TrendingUp className="w-3.5 h-3.5" />
              80% All-Digital
            </span>
            <p className="text-[11px] text-slate-500">Target Share</p>
          </div>
          {sessionAdditions > 0 && (
            <button
              type="button"
              onClick={onResetMetric}
              title="Reset live test counter"
              aria-label="Reset live subscription counter"
              className="w-8 h-8 inline-flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Framed Indicator Stack modeled directly on IMG_6154_ae20bddc.jpeg */}
      <div className="relative w-full max-w-[440px] bg-[#F8FAFC] rounded-[28px] border-[3px] border-[#1E293B] shadow-lg overflow-visible">
        {/* Top Phone-Frame Status Header */}
        <div className="px-6 pt-3 pb-2.5 flex items-center justify-between border-b border-slate-200/80">
          <span className="text-xs font-semibold text-slate-800 tabular-nums">9:41</span>
          <div className="w-20 h-4 bg-[#0F172A] rounded-full" aria-hidden="true" />
          <span className="text-xs font-semibold text-slate-700">CLOSERS</span>
        </div>

        {/* 7 Numbered Indicators with Red Circular Callout Markers (1–7) */}
        <div className="px-4 py-3 space-y-2.5">
          {CLOSERS_INDICATORS.map((item) => {
            const isActive = item.number === selectedNumber;
            return (
              <div key={item.number} className="relative pr-4">
                <button
                  type="button"
                  onClick={() => onSelectIndicator(item)}
                  aria-pressed={isActive}
                  className={`w-full text-left rounded-xl border px-3.5 py-2.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C5AA6] ${
                    isActive
                      ? 'bg-white border-[#0B2A4A] shadow-sm'
                      : 'bg-white/75 border-slate-200/90 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2 mb-0.5">
                    <span className="text-xs font-bold text-[#0B2A4A]">
                      {item.letter} · {item.principle}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 italic">
                      {item.tagline}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-900 leading-snug">
                    {item.snippetTitle}
                  </p>
                  <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                    {item.snippetDetail}
                  </p>

                  {isActive && (
                    <div className="mt-2 pt-2 border-t border-slate-100 space-y-1">
                      <p className="text-[11px] text-slate-700 leading-relaxed">
                        {item.analysis}
                      </p>
                      <p className="text-[11px] font-semibold text-[#0C5AA6]">
                        Metric effect: {item.subscriptionImpact}
                      </p>
                    </div>
                  )}
                </button>

                {/* Numbered Red Circular Marker on Right Edge matching reference screenshot */}
                <button
                  type="button"
                  onClick={() => onSelectIndicator(item)}
                  aria-label={`Inspect indicator ${item.number}: ${item.principle}`}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-7 h-7 rounded-full text-xs font-bold tabular-nums flex items-center justify-center shadow-sm transition-transform cursor-pointer ${
                    isActive
                      ? 'bg-[#991B1B] text-white scale-110 ring-2 ring-white'
                      : 'bg-[#B91C1C] text-white hover:scale-105'
                  }`}
                >
                  {item.number}
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Primary Action inside Frame matching screenshot */}
        <div className="px-4 pb-4 pt-1">
          <div className="bg-[#EDE9FE]/55 border border-slate-200 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-700">
              <span className="font-medium">
                Active Focus: #{activeIndicator.number} {activeIndicator.principle}
              </span>
              <span className="font-semibold text-[#0B2A4A] tabular-nums">$15.90/mo</span>
            </div>
            <button
              type="button"
              onClick={onTriggerSubscribe}
              className="w-full py-2.5 px-4 rounded-lg bg-[#0C5AA6] hover:bg-[#094785] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Test Subscription Flow · Track +1 Subscription
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
