import { useState } from 'react';
import { Check } from 'lucide-react';
import { PlanCategory, SUBSCRIPTION_PLANS, SubscriptionPlan } from '../data/plans';
import { MediaImage } from './MediaImage';

export type ResidentialType = 'hdb_condo' | 'landed';

interface PlanSectionProps {
  onSelectPlan: (plan: SubscriptionPlan, residentialType: ResidentialType) => void;
}

const CATEGORY_TABS: { id: PlanCategory; label: string }[] = [
  { id: 'all', label: 'All Plans' },
  { id: 'digital', label: 'Digital' },
  { id: 'print', label: 'Print & Bundles' },
  { id: 'tablet', label: 'News Tablet' },
];

export function PlanSection({ onSelectPlan }: PlanSectionProps) {
  const [activeCategory, setActiveCategory] = useState<PlanCategory>('all');
  const [residentialType, setResidentialType] = useState<ResidentialType>('hdb_condo');

  const filteredPlans =
    activeCategory === 'all'
      ? SUBSCRIPTION_PLANS
      : SUBSCRIPTION_PLANS.filter((plan) => plan.category === activeCategory);

  const deliveryFee = residentialType === 'hdb_condo' ? 3.0 : 5.0;
  const showsPrintPlan = filteredPlans.some((plan) => plan.hasPrintDeliveryFee);

  return (
    <section id="plans" className="py-16 lg:py-20 bg-[#F7F8FA]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Category Filter Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-[#0C5AA6] uppercase mb-2">
              Subscription Packages
            </p>
            <h2
              className="font-serif text-3xl sm:text-4xl font-bold text-[#0B2A4A] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Choose the Straits Times plan that fits your daily routine.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter subscription categories"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-200/75 rounded-lg self-start lg:self-auto"
          >
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C5AA6] ${
                    isActive
                      ? 'bg-white text-[#0B2A4A] shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-[#0B2A4A]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Print Delivery Estimator Control */}
        {showsPrintPlan && (
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-[#0B2A4A]">
                Home Print Delivery Residence Type
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                Print packages include a monthly vendor delivery surcharge based on Singapore property type.
              </p>
            </div>
            <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setResidentialType('hdb_condo')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  residentialType === 'hdb_condo'
                    ? 'bg-[#0B2A4A] text-white'
                    : 'text-slate-600 hover:text-[#0B2A4A]'
                }`}
              >
                HDB / Condo (+$3.00/mo)
              </button>
              <button
                type="button"
                onClick={() => setResidentialType('landed')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  residentialType === 'landed'
                    ? 'bg-[#0B2A4A] text-white'
                    : 'text-slate-600 hover:text-[#0B2A4A]'
                }`}
              >
                Landed (+$5.00/mo)
              </button>
            </div>
          </div>
        )}

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => {
            const effectiveTotal = plan.hasPrintDeliveryFee
              ? plan.priceMonthly + deliveryFee
              : plan.priceMonthly;

            return (
              <article
                key={plan.id}
                className={`bg-white rounded-xl border flex flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 ${
                  plan.recommended
                    ? 'border-[#0B2A4A] shadow-sm'
                    : 'border-slate-200'
                }`}
              >
                {/* Uniform 4:3 Media Area */}
                <div className="aspect-[4/3] bg-slate-100 border-b border-slate-100 overflow-hidden">
                  <MediaImage
                    src={plan.image}
                    alt={plan.imageAlt}
                    className="w-full h-full object-cover"
                    fallbackTitle={plan.name}
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  {/* Unboxed Metadata Kicker (Zero-Pill Discipline) */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <p className="text-xs font-medium text-slate-500">{plan.kicker}</p>
                    {plan.recommended && (
                      <span className="text-xs font-semibold text-[#C8102E] whitespace-nowrap shrink-0">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#0B2A4A] mb-2">
                    {plan.name}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {plan.summary}
                  </p>

                  {/* Pricing Block with Tabular Numerals */}
                  <div className="pb-5 mb-5 border-b border-slate-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-bold text-[#0F172A] tabular-nums">
                        ${effectiveTotal.toFixed(2)}
                      </span>
                      <span className="text-sm text-slate-500">/ month</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 tabular-nums">
                      {plan.hasPrintDeliveryFee
                        ? `Includes $${plan.priceMonthly.toFixed(2)} plan + $${deliveryFee.toFixed(
                            2
                          )} delivery`
                        : plan.contractLabel}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-2.5 text-sm text-slate-700 mb-6 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check
                          className="w-4 h-4 text-[#0C5AA6] shrink-0 mt-0.5"
                          strokeWidth={2.2}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.footnote && (
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                      {plan.footnote}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => onSelectPlan(plan, residentialType)}
                    className={`w-full py-3 px-4 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      plan.recommended
                        ? 'bg-[#0B2A4A] hover:bg-[#071D35] text-white focus-visible:ring-[#0B2A4A]'
                        : 'bg-slate-100 hover:bg-[#0B2A4A] text-[#0B2A4A] hover:text-white focus-visible:ring-[#0C5AA6]'
                    }`}
                  >
                    Select {plan.name}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
