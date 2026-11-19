import { Check, Clock, Sparkles } from 'lucide-react';
import { BillingCadence, SUBSCRIPTION_PLANS, SubscriptionPlan } from '../data/plans';
import { MediaImage } from './MediaImage';

export type ResidentialType = 'hdb_condo' | 'landed';

interface PlanSectionProps {
  selectedPlanId: SubscriptionPlan['id'];
  billingCadence: BillingCadence;
  residentialType: ResidentialType;
  activeCloserId: string | null;
  onSelectPlanCard: (id: SubscriptionPlan['id']) => void;
  onChangeBillingCadence: (cadence: BillingCadence) => void;
  onChangeResidentialType: (type: ResidentialType) => void;
  onProceedToCheckout: (plan: SubscriptionPlan) => void;
}

export function PlanSection({
  selectedPlanId,
  billingCadence,
  residentialType,
  activeCloserId,
  onSelectPlanCard,
  onChangeBillingCadence,
  onChangeResidentialType,
  onProceedToCheckout,
}: PlanSectionProps) {
  const deliveryFee = residentialType === 'hdb_condo' ? 3.0 : 5.0;

  const highlightRing = (id: string) =>
    activeCloserId === id ? 'ring-2 ring-[#B91C1C] ring-offset-2 rounded-lg' : '';

  return (
    <section id="plans" className="py-10 px-5 sm:px-7 bg-[#F7F8FA]">
      {/* Section Header */}
      <div
        id="closer-convenience"
        className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 p-2 -m-2 transition-all ${highlightRing(
          'closer-convenience'
        )}`}
      >
        <div>
          <p className="text-xs font-semibold tracking-wider text-[#0C5AA6] uppercase mb-1">
            3 Simple Choices · Default: All-Digital
          </p>
          <h2
            className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2A4A] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Choose your Straits Times plan
          </h2>
        </div>

        {/* Print Delivery Quick Selector */}
        <div className="inline-flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start sm:self-auto">
          <button
            type="button"
            onClick={() => onChangeResidentialType('hdb_condo')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              residentialType === 'hdb_condo'
                ? 'bg-white text-[#0B2A4A] shadow-sm'
                : 'text-slate-600 hover:text-[#0B2A4A]'
            }`}
          >
            Print: HDB/Condo +$3
          </button>
          <button
            type="button"
            onClick={() => onChangeResidentialType('landed')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              residentialType === 'landed'
                ? 'bg-white text-[#0B2A4A] shadow-sm'
                : 'text-slate-600 hover:text-[#0B2A4A]'
            }`}
          >
            Print: Landed +$5
          </button>
        </div>
      </div>

      {/* Strictly 3 Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          const isAllDigital = plan.id === 'all-digital';
          const showAnnual = isAllDigital && billingCadence === 'annual';

          const displayPrice = showAnnual
            ? plan.annualPrice!
            : plan.hasPrintDeliveryFee
            ? plan.priceMonthly + deliveryFee
            : plan.priceMonthly;

          return (
            <article
              key={plan.id}
              onClick={() => onSelectPlanCard(plan.id)}
              className={`bg-white rounded-xl border flex flex-col overflow-hidden transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#0B2A4A] ring-2 ring-[#0B2A4A]/15 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Uniform 4:3 Visual */}
              <div className="aspect-[4/3] bg-slate-100 border-b border-slate-100 overflow-hidden">
                <MediaImage
                  src={plan.image}
                  alt={plan.imageAlt}
                  className="w-full h-full object-cover"
                  fallbackTitle={plan.name}
                />
              </div>

              <div className="p-5 flex flex-col flex-1">
                {/* Unboxed Metadata Kicker */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-medium text-slate-500">{plan.kicker}</span>
                  {isSelected && (
                    <span className="text-xs font-semibold text-[#0C5AA6] whitespace-nowrap">
                      Selected
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-xl font-bold text-[#0B2A4A] mb-1.5">{plan.name}</h3>

                {/* 6. Recognition Callout on All-Digital */}
                {plan.recognitionStat && (
                  <p
                    id="closer-recognition"
                    className={`text-xs font-semibold text-[#0B2A4A] bg-blue-50/80 border border-blue-200/80 rounded-md px-2.5 py-1.5 mb-2.5 flex items-center gap-1.5 ${highlightRing(
                      'closer-recognition'
                    )}`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#0C5AA6] shrink-0" />
                    <span>{plan.recognitionStat}</span>
                  </p>
                )}

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {plan.summary}
                </p>

                {/* 7. Stickiness: Monthly vs Annual ($180, valid 2 weeks only) Toggle on All-Digital */}
                {isAllDigital && (
                  <div
                    id="closer-stickiness"
                    onClick={(e) => e.stopPropagation()}
                    className={`mb-4 p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2 ${highlightRing(
                      'closer-stickiness'
                    )}`}
                  >
                    <div className="grid grid-cols-2 gap-1 p-0.5 bg-slate-200/75 rounded-md">
                      <button
                        type="button"
                        onClick={() => onChangeBillingCadence('monthly')}
                        className={`py-1.5 px-2 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap ${
                          billingCadence === 'monthly'
                            ? 'bg-white text-[#0B2A4A] shadow-sm'
                            : 'text-slate-600 hover:text-[#0B2A4A]'
                        }`}
                      >
                        Monthly $15.90
                      </button>
                      <button
                        type="button"
                        onClick={() => onChangeBillingCadence('annual')}
                        className={`py-1.5 px-2 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap ${
                          billingCadence === 'annual'
                            ? 'bg-[#0B2A4A] text-white shadow-sm'
                            : 'text-slate-600 hover:text-[#0B2A4A]'
                        }`}
                      >
                        Annual $180
                      </button>
                    </div>
                    <p className="text-[11px] font-medium text-[#B91C1C] leading-snug">
                      {plan.annualOfferText}
                    </p>
                  </div>
                )}

                {/* Pricing + 2. Loss Avoidance */}
                <div
                  id={isAllDigital ? 'closer-loss-avoidance' : undefined}
                  className={`pb-4 mb-4 border-b border-slate-100 ${
                    isAllDigital ? highlightRing('closer-loss-avoidance') : ''
                  }`}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-bold text-[#0F172A] tabular-nums">
                      ${showAnnual ? displayPrice.toFixed(0) : displayPrice.toFixed(2)}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-500">
                      {showAnnual ? '/ year' : '/ month'}
                    </span>
                    {plan.standardPriceMonthly && !showAnnual && (
                      <span className="text-xs text-slate-400 line-through tabular-nums">
                        ${plan.standardPriceMonthly.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {plan.promoWindowText && !showAnnual ? (
                    <p className="text-xs font-semibold text-[#B91C1C] mt-1.5 flex items-center gap-1.5 tabular-nums">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{plan.promoWindowText}</span>
                    </p>
                  ) : showAnnual ? (
                    <p className="text-xs font-semibold text-[#0C5AA6] mt-1.5 tabular-nums">
                      $15.00/mo effective · Save $178.80/yr vs standard
                    </p>
                  ) : (
                    <p className="text-xs text-slate-500 mt-1 tabular-nums">
                      {plan.hasPrintDeliveryFee
                        ? `Includes $${plan.priceMonthly.toFixed(2)} + $${deliveryFee.toFixed(
                            2
                          )} delivery`
                        : plan.contractLabel}
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 mb-5 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check
                        className="w-4 h-4 text-[#0C5AA6] shrink-0 mt-0.5"
                        strokeWidth={2.2}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPlanCard(plan.id);
                    onProceedToCheckout(plan);
                  }}
                  className={`w-full py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    isSelected
                      ? 'bg-[#0B2A4A] hover:bg-[#071D35] text-white focus-visible:ring-[#0B2A4A]'
                      : 'bg-slate-100 hover:bg-[#0B2A4A] text-[#0B2A4A] hover:text-white focus-visible:ring-[#0C5AA6]'
                  }`}
                >
                  Subscribe to {plan.name}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
