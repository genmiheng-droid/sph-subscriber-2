import { useState } from 'react';
import { Check, Tablet } from 'lucide-react';
import { SUBSCRIPTION_PLANS, SubscriptionPlan } from '../data/plans';
import { MediaImage } from './MediaImage';

interface NewsTabletSpotlightProps {
  onSelectPlan: (plan: SubscriptionPlan) => void;
}

export function NewsTabletSpotlight({ onSelectPlan }: NewsTabletSpotlightProps) {
  const [selectedVariant, setSelectedVariant] = useState<'refresh' | 'own'>('refresh');

  const refreshPlan = SUBSCRIPTION_PLANS.find((p) => p.id === 'news-tablet-refresh')!;
  const ownPlan = SUBSCRIPTION_PLANS.find((p) => p.id === 'news-tablet-own')!;
  const activePlan = selectedVariant === 'refresh' ? refreshPlan : ownPlan;

  return (
    <section id="news-tablet" className="py-16 lg:py-20 bg-white border-y border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Visual Column */}
          <div className="lg:col-span-5">
            <div className="h-full min-h-[340px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
              <MediaImage
                src="/src/assets/images/card_news_tablet_1795071214849.jpg"
                alt="Samsung Galaxy Tab News Tablet displaying The Straits Times broadsheet E-Paper"
                className="w-full h-full object-cover"
                fallbackTitle="News Tablet Edition"
              />
            </div>
          </div>

          {/* Right Configuration Column */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#0C5AA6] uppercase mb-2">
                Dedicated Reading Hardware
              </p>
              <h2
                className="font-serif text-3xl sm:text-4xl font-bold text-[#0B2A4A] tracking-tight mb-4"
                style={{ textWrap: 'balance' }}
              >
                The News Tablet: broadsheet layout without the paper clutter.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Preloaded with the SPH Tab reader for automatic morning downloads and zero-login
                access. Zoom effortlessly on headlines, adjust text scale, and save editions for
                offline reading anywhere.
              </p>

              {/* Interactive Option Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setSelectedVariant('refresh')}
                  className={`text-left p-4 rounded-xl border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C5AA6] ${
                    selectedVariant === 'refresh'
                      ? 'border-[#0B2A4A] bg-[#F7F8FA]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-bold text-[#0B2A4A]">Refresh Plan</span>
                    <span className="text-base font-bold text-[#0F172A] tabular-nums">
                      $25.90/mo
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Lower monthly fee. Upgrade to a newer tablet or return the device every 24
                    months.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedVariant('own')}
                  className={`text-left p-4 rounded-xl border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C5AA6] ${
                    selectedVariant === 'own'
                      ? 'border-[#0B2A4A] bg-[#F7F8FA]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-bold text-[#0B2A4A]">Own-Your-Tablet</span>
                    <span className="text-base font-bold text-[#0F172A] tabular-nums">
                      $29.90/mo
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Keep the Samsung Galaxy Tab Wi-Fi permanently once your 24-month term ends.
                  </p>
                </button>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700 mb-8">
                {activePlan.features.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#0C5AA6] shrink-0 mt-0.5" strokeWidth={2.2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-slate-200">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Tablet className="w-5 h-5 text-[#0B2A4A] shrink-0" />
                <span>
                  24-month contract · Free courier delivery across Singapore
                </span>
              </div>
              <button
                type="button"
                onClick={() => onSelectPlan(activePlan)}
                className="px-6 py-3 text-sm font-semibold text-white bg-[#0B2A4A] hover:bg-[#071D35] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0B2A4A]"
              >
                Subscribe to {selectedVariant === 'refresh' ? 'Refresh' : 'Own-Your-Tablet'} ($
                {activePlan.priceMonthly.toFixed(2)}/mo)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
