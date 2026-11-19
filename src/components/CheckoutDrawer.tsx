import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { BillingCadence, SUBSCRIPTION_PLANS, SubscriptionPlan } from '../data/plans';
import { ResidentialType } from './PlanSection';

interface CheckoutDrawerProps {
  isOpen: boolean;
  plan: SubscriptionPlan | null;
  billingCadence: BillingCadence;
  residentialType: ResidentialType;
  onChangePlan: (plan: SubscriptionPlan) => void;
  onChangeBillingCadence: (cadence: BillingCadence) => void;
  onChangeResidentialType: (type: ResidentialType) => void;
  onSubscriptionCompleted: (planName: string, cadence: BillingCadence) => void;
  onClose: () => void;
}

export function CheckoutDrawer({
  isOpen,
  plan,
  billingCadence,
  residentialType,
  onChangePlan,
  onChangeBillingCadence,
  onChangeResidentialType,
  onSubscriptionCompleted,
  onClose,
}: CheckoutDrawerProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [orderReference, setOrderReference] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !plan) return null;

  const isAnnualAllDigital = plan.id === 'all-digital' && billingCadence === 'annual';
  const deliveryFee = plan.hasPrintDeliveryFee
    ? residentialType === 'hdb_condo'
      ? 3.0
      : 5.0
    : 0;
  const totalDueToday = isAnnualAllDigital ? plan.annualPrice! : plan.priceMonthly + deliveryFee;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (fullName.trim().length < 2) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError('Please enter a valid email address for your mySPH account.');
      return;
    }
    if (!/^[89]\d{7}$/.test(mobile.trim())) {
      setFormError('Please enter an 8-digit Singapore mobile number starting with 8 or 9.');
      return;
    }
    if (plan.requiresDeliveryAddress) {
      if (!/^\d{6}$/.test(postalCode.trim())) {
        setFormError('Please enter a 6-digit Singapore postal code.');
        return;
      }
      if (streetAddress.trim().length < 5) {
        setFormError('Please enter your block, street name, and unit number.');
        return;
      }
    }

    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    setOrderReference(`ST-2026-${randomDigits}`);
    onSubscriptionCompleted(plan.name, isAnnualAllDigital ? 'annual' : 'monthly');
  };

  const handleResetAndClose = () => {
    setOrderReference(null);
    setFormError(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/45 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-drawer-title"
    >
      <div className="absolute inset-0" onClick={handleResetAndClose} />

      <div className="relative w-full max-w-lg bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200 flex flex-col">
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#0C5AA6] uppercase tracking-wider">
              mySPH Checkout
            </p>
            <h2 id="checkout-drawer-title" className="font-serif text-xl font-bold text-[#0B2A4A]">
              {orderReference ? 'Subscription Confirmed' : 'Complete Your Subscription'}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close checkout"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderReference ? (
          <div className="p-6 space-y-6 flex-1">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex items-start gap-3.5">
              <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-emerald-950">
                  Order #{orderReference} Confirmed (+1 Subscription Logged)
                </p>
                <p className="text-sm text-emerald-900 mt-1 leading-relaxed">
                  Your {plan.name} subscription is now active for{' '}
                  <span className="font-medium">{email}</span>.
                </p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 space-y-3 text-sm">
              <p className="font-semibold text-[#0B2A4A] pb-2 border-b border-slate-100">
                Receipt Summary
              </p>
              <div className="flex justify-between text-slate-600">
                <span>Selected Package</span>
                <span className="font-semibold text-slate-900">{plan.name}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Billing Cadence</span>
                <span className="text-slate-900">
                  {isAnnualAllDigital ? 'Annual ($180/yr · 2-week offer)' : 'Monthly'}
                </span>
              </div>
              {plan.hasPrintDeliveryFee && (
                <div className="flex justify-between text-slate-600">
                  <span>Home Delivery Surcharge</span>
                  <span className="tabular-nums text-slate-900">${deliveryFee.toFixed(2)} / mo</span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t border-slate-100 text-base font-bold text-[#0B2A4A]">
                <span>Total Billed</span>
                <span className="tabular-nums">
                  ${isAnnualAllDigital ? totalDueToday.toFixed(0) : totalDueToday.toFixed(2)} SGD
                  {isAnnualAllDigital ? ' / yr' : ' / mo'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#0B2A4A] hover:bg-[#071D35] rounded-lg transition-colors cursor-pointer"
            >
              Back to Comparison View
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 flex-1">
            <div>
              <label
                htmlFor="checkout-plan-select"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2"
              >
                Selected Package (3 Streamlined Options)
              </label>
              <select
                id="checkout-plan-select"
                value={plan.id}
                onChange={(e) => {
                  const next = SUBSCRIPTION_PLANS.find((p) => p.id === e.target.value);
                  if (next) onChangePlan(next);
                }}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-[#0B2A4A] focus:outline-none focus:ring-2 focus:ring-[#0C5AA6]"
              >
                {SUBSCRIPTION_PLANS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — ${p.priceMonthly.toFixed(2)}/mo
                  </option>
                ))}
              </select>
            </div>

            {plan.id === 'all-digital' && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Billing Commitment
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => onChangeBillingCadence('monthly')}
                    className={`py-2.5 px-3 rounded-lg border text-xs font-semibold text-left cursor-pointer transition-colors ${
                      billingCadence === 'monthly'
                        ? 'border-[#0B2A4A] bg-slate-50 text-[#0B2A4A]'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    Monthly ($15.90/mo)
                    <span className="block font-normal text-[#B91C1C] mt-0.5">
                      5 days left at promo rate
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeBillingCadence('annual')}
                    className={`py-2.5 px-3 rounded-lg border text-xs font-semibold text-left cursor-pointer transition-colors ${
                      billingCadence === 'annual'
                        ? 'border-[#0B2A4A] bg-slate-50 text-[#0B2A4A]'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    Annual ($180/yr)
                    <span className="block font-normal text-[#B91C1C] mt-0.5">
                      Offer valid for 2 weeks only
                    </span>
                  </button>
                </div>
              </div>
            )}

            {plan.hasPrintDeliveryFee && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Delivery Residence Type
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => onChangeResidentialType('hdb_condo')}
                    className={`py-2.5 px-3 rounded-lg border text-xs font-semibold text-left cursor-pointer transition-colors ${
                      residentialType === 'hdb_condo'
                        ? 'border-[#0B2A4A] bg-slate-50 text-[#0B2A4A]'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    HDB / Condominium
                    <span className="block font-normal text-slate-500 tabular-nums mt-0.5">
                      +$3.00 / month
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeResidentialType('landed')}
                    className={`py-2.5 px-3 rounded-lg border text-xs font-semibold text-left cursor-pointer transition-colors ${
                      residentialType === 'landed'
                        ? 'border-[#0B2A4A] bg-slate-50 text-[#0B2A4A]'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    Landed Property
                    <span className="block font-normal text-slate-500 tabular-nums mt-0.5">
                      +$5.00 / month
                    </span>
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3.5">
              <div>
                <label htmlFor="sub-name" className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  id="sub-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Tan Wei Ming"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0C5AA6]"
                />
              </div>

              <div>
                <label htmlFor="sub-email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address (mySPH Login)
                </label>
                <input
                  id="sub-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com.sg"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0C5AA6]"
                />
              </div>

              <div>
                <label htmlFor="sub-mobile" className="block text-sm font-medium text-slate-700 mb-1">
                  Singapore Mobile Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-sm text-slate-600 tabular-nums">
                    +65
                  </span>
                  <input
                    id="sub-mobile"
                    type="tel"
                    inputMode="numeric"
                    maxLength={8}
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    placeholder="91234567"
                    className="w-full rounded-r-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 tabular-nums focus:outline-none focus:ring-2 focus:ring-[#0C5AA6]"
                  />
                </div>
              </div>

              {plan.requiresDeliveryAddress && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="sub-postal"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Postal Code
                    </label>
                    <input
                      id="sub-postal"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="188021"
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 tabular-nums focus:outline-none focus:ring-2 focus:ring-[#0C5AA6]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="sub-address"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Block, Street &amp; Unit
                    </label>
                    <input
                      id="sub-address"
                      type="text"
                      required
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="1000 Toa Payoh North #01-01"
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0C5AA6]"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between font-bold text-[#0B2A4A] text-base">
                <span>Total Due</span>
                <span className="tabular-nums">
                  ${isAnnualAllDigital ? totalDueToday.toFixed(0) : totalDueToday.toFixed(2)} SGD
                  {isAnnualAllDigital ? ' / yr' : ' / mo'}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Completing this form logs +1 subscription to the tracked metric.
              </p>
            </div>

            {formError && (
              <p className="text-sm font-medium text-[#C8102E]" role="alert">
                {formError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-5 text-sm font-semibold text-white bg-[#0B2A4A] hover:bg-[#071D35] rounded-lg transition-colors cursor-pointer"
            >
              Confirm Subscription
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
