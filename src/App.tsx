import { useState } from 'react';
import { AudienceTracks } from './components/AudienceTracks';
import { CheckoutDrawer } from './components/CheckoutDrawer';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { CorporateInquiryModal } from './components/CorporateInquiryModal';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { NewsTabletSpotlight } from './components/NewsTabletSpotlight';
import { PlanSection, ResidentialType } from './components/PlanSection';
import { SUBSCRIPTION_PLANS, SubscriptionPlan } from './data/plans';

export default function App() {
  const defaultPlan =
    SUBSCRIPTION_PLANS.find((p) => p.id === 'all-digital') ?? SUBSCRIPTION_PLANS[0];

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(defaultPlan);
  const [residentialType, setResidentialType] = useState<ResidentialType>('hdb_condo');
  const [corporateModalOpen, setCorporateModalOpen] = useState(false);

  const handleOpenCheckout = (
    plan: SubscriptionPlan = defaultPlan,
    residence: ResidentialType = residentialType
  ) => {
    setSelectedPlan(plan);
    setResidentialType(residence);
    setCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA] text-[#0F172A]">
      <Header onOpenSubscribe={() => handleOpenCheckout(defaultPlan)} />

      <main className="flex-1">
        <Hero onSelectRecommended={() => handleOpenCheckout(defaultPlan)} />

        <PlanSection onSelectPlan={handleOpenCheckout} />

        <NewsTabletSpotlight onSelectPlan={(plan) => handleOpenCheckout(plan)} />

        <ComparisonMatrix onSelectPlan={(plan) => handleOpenCheckout(plan)} />

        <AudienceTracks onOpenCorporateInquiry={() => setCorporateModalOpen(true)} />

        <FaqSection />
      </main>

      <Footer onOpenCorporateInquiry={() => setCorporateModalOpen(true)} />

      <CheckoutDrawer
        isOpen={checkoutOpen}
        plan={selectedPlan}
        residentialType={residentialType}
        onChangePlan={setSelectedPlan}
        onChangeResidentialType={setResidentialType}
        onClose={() => setCheckoutOpen(false)}
      />

      <CorporateInquiryModal
        isOpen={corporateModalOpen}
        onClose={() => setCorporateModalOpen(false)}
      />
    </div>
  );
}
