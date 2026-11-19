import { useState } from 'react';
import { CheckoutDrawer } from './components/CheckoutDrawer';
import { ClosersAnalysisPanel } from './components/ClosersAnalysisPanel';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { FaqSection } from './components/FaqSection';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PlanSection, ResidentialType } from './components/PlanSection';
import {
  BillingCadence,
  CLOSERS_INDICATORS,
  CloserIndicator,
  SUBSCRIPTION_PLANS,
  SubscriptionPlan,
} from './data/plans';

const BASELINE_SUBSCRIPTIONS = 1240;

export default function App() {
  const defaultPlan =
    SUBSCRIPTION_PLANS.find((p) => p.id === 'all-digital') ?? SUBSCRIPTION_PLANS[0];

  const [selectedPlanId, setSelectedPlanId] = useState<SubscriptionPlan['id']>('all-digital');
  const [billingCadence, setBillingCadence] = useState<BillingCadence>('monthly');
  const [residentialType, setResidentialType] = useState<ResidentialType>('hdb_condo');
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // CLOSERS analysis & tracked metric state
  const [selectedCloserNumber, setSelectedCloserNumber] = useState<number>(1);
  const [activeCloserId, setActiveCloserId] = useState<string | null>(
    CLOSERS_INDICATORS[0].elementId
  );
  const [subscriptionCount, setSubscriptionCount] = useState<number>(BASELINE_SUBSCRIPTIONS);
  const [lastSubscribedPlan, setLastSubscribedPlan] = useState<string | null>(null);

  const selectedPlan =
    SUBSCRIPTION_PLANS.find((p) => p.id === selectedPlanId) ?? defaultPlan;

  const handleOpenCheckout = (plan: SubscriptionPlan = selectedPlan) => {
    setSelectedPlanId(plan.id);
    setCheckoutOpen(true);
  };

  const handleSelectIndicator = (indicator: CloserIndicator) => {
    setSelectedCloserNumber(indicator.number);
    setActiveCloserId(indicator.elementId);
    const el = document.getElementById(indicator.elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSubscriptionCompleted = (planName: string, cadence: BillingCadence) => {
    setSubscriptionCount((prev) => prev + 1);
    setLastSubscribedPlan(`${planName} (${cadence})`);
  };

  return (
    <div className="min-h-screen bg-[#E6ECF5] text-[#0F172A]">
      {/* Side-by-Side Split Layout matching reference format */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT SIDE: Revised Straits Times Webpage */}
          <div className="lg:col-span-7 bg-white border border-slate-300/80 rounded-2xl shadow-sm overflow-hidden">
            <Header onOpenSubscribe={() => handleOpenCheckout(selectedPlan)} />

            <main>
              <Hero
                activeCloserId={activeCloserId}
                onSelectDefaultPlan={() => handleOpenCheckout(defaultPlan)}
              />

              <PlanSection
                selectedPlanId={selectedPlanId}
                billingCadence={billingCadence}
                residentialType={residentialType}
                activeCloserId={activeCloserId}
                onSelectPlanCard={setSelectedPlanId}
                onChangeBillingCadence={setBillingCadence}
                onChangeResidentialType={setResidentialType}
                onProceedToCheckout={(plan) => handleOpenCheckout(plan)}
              />

              <ComparisonMatrix onSelectPlan={(plan) => handleOpenCheckout(plan)} />

              <FaqSection />
            </main>

            <footer className="bg-[#071D35] text-slate-300 px-6 py-6 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-serif text-sm font-bold text-white">The Straits Times</span>
              <span className="text-slate-400">
                SPH Media Limited · Revised 3-Option Subscription Prototype
              </span>
            </footer>
          </div>

          {/* RIGHT SIDE: 7 CLOSERS Indicators Analysis + Subscriptions Metric */}
          <div className="lg:col-span-5 lg:sticky lg:top-6">
            <ClosersAnalysisPanel
              selectedNumber={selectedCloserNumber}
              subscriptionCount={subscriptionCount}
              baselineSubscriptions={BASELINE_SUBSCRIPTIONS}
              lastSubscribedPlan={lastSubscribedPlan}
              onSelectIndicator={handleSelectIndicator}
              onTriggerSubscribe={() => handleOpenCheckout(selectedPlan)}
              onResetMetric={() => {
                setSubscriptionCount(BASELINE_SUBSCRIPTIONS);
                setLastSubscribedPlan(null);
              }}
            />
          </div>
        </div>
      </div>

      <CheckoutDrawer
        isOpen={checkoutOpen}
        plan={selectedPlan}
        billingCadence={billingCadence}
        residentialType={residentialType}
        onChangePlan={(plan) => setSelectedPlanId(plan.id)}
        onChangeBillingCadence={setBillingCadence}
        onChangeResidentialType={setResidentialType}
        onSubscriptionCompleted={handleSubscriptionCompleted}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  );
}
