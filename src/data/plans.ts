export type BillingCadence = 'monthly' | 'annual';

export interface SubscriptionPlan {
  id: 'one-digital' | 'all-digital' | 'all-digital-print';
  name: string;
  kicker: string;
  priceMonthly: number;
  standardPriceMonthly?: number;
  annualPrice?: number;
  annualOfferText?: string;
  promoWindowText?: string;
  recognitionStat?: string;
  contractLabel: string;
  summary: string;
  image: string;
  imageAlt: string;
  isDefault?: boolean;
  requiresDeliveryAddress: boolean;
  hasPrintDeliveryFee: boolean;
  concurrentDevices: string;
  features: string[];
  footnote?: string;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'one-digital',
    name: 'One Digital',
    kicker: '1 App Device · No Contract',
    priceMonthly: 9.9,
    contractLabel: 'Monthly recurring, cancel anytime',
    summary:
      'Essential single-device access to local Singapore news, subscriber analyses, and the daily E-Paper.',
    image: '/src/assets/images/card_one_digital_1795071214179.jpg',
    imageAlt: 'Smartphone displaying digital editorial news article on a stone pedestal',
    requiresDeliveryAddress: false,
    hasPrintDeliveryFee: false,
    concurrentDevices: '1 app device + 1 web browser',
    features: [
      'Unlimited articles on straitstimes.com and ST app',
      'Daily E-Paper with 14-day rolling archive',
      'Personalised myST+ feed across 30 topics',
      'No minimum contract period',
    ],
  },
  {
    id: 'all-digital',
    name: 'All-Digital',
    kicker: 'Default Selection · 4 App Devices',
    priceMonthly: 15.9,
    standardPriceMonthly: 29.9,
    annualPrice: 180,
    annualOfferText: '$180 annual plan · Offer valid for 2 weeks only',
    promoWindowText: '$15.90/mo for 5 more days (usual $29.90/mo)',
    recognitionStat: '80% of subscribers have chosen this option',
    contractLabel: 'Lock in $15.90/mo or $180/yr annual commitment',
    summary:
      'Our flagship multi-device digital plan keeping you connected and up-to-date with local news across phones, tablets, and desktop.',
    image: '/src/assets/images/card_all_digital_print_1795071213895.jpg',
    imageAlt: 'Laptop and smartphone arranged on a clean slate desk surface',
    isDefault: true,
    requiresDeliveryAddress: false,
    hasPrintDeliveryFee: false,
    concurrentDevices: '4 app devices + 1 web browser',
    features: [
      'Unlimited articles on straitstimes.com and ST app',
      'Concurrent access on up to 4 mobile or tablet apps',
      'Daily E-Paper with enhanced tap-to-read view',
      'Full access to ST+ subscriber rewards and events',
    ],
  },
  {
    id: 'all-digital-print',
    name: 'All-Digital + Print',
    kicker: '4 App Devices · Morning Print Delivery',
    priceMonthly: 29.9,
    contractLabel: 'Plus $3–$5/mo home delivery fee',
    summary:
      'Morning doorstep broadsheet delivery paired with complete multi-device digital access for the whole household.',
    image: '/src/assets/images/hero_st_multiplatform_1795071214151.jpg',
    imageAlt: 'Folded broadsheet newspaper beside a tablet and smartphone',
    requiresDeliveryAddress: true,
    hasPrintDeliveryFee: true,
    concurrentDevices: '4 app devices + 1 web browser + daily print',
    features: [
      'Daily physical print copy delivered every morning',
      'Full All-Digital access on up to 4 app devices',
      'Daily E-Paper with 14-day searchable archive',
      'Sunday Times weekend pullouts and ST+ perks',
    ],
    footnote: 'Delivery surcharge applies: $3.00/mo (HDB/Condo) or $5.00/mo (Landed).',
  },
];

export interface ComparisonRow {
  feature: string;
  oneDigital: string;
  allDigital: string;
  allDigitalPrint: string;
  differs: boolean;
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: 'Monthly Price',
    oneDigital: '$9.90 / mo',
    allDigital: '$15.90 / mo (5 days left)',
    allDigitalPrint: '$29.90 / mo + delivery',
    differs: true,
  },
  {
    feature: 'Annual Plan Option',
    oneDigital: 'Monthly only',
    allDigital: '$180 / yr (2-week offer)',
    allDigitalPrint: 'Monthly billing',
    differs: true,
  },
  {
    feature: 'Concurrent App Devices',
    oneDigital: '1 device',
    allDigital: 'Up to 4 devices',
    allDigitalPrint: 'Up to 4 devices',
    differs: true,
  },
  {
    feature: 'Web Browser & Daily E-Paper',
    oneDigital: 'Included',
    allDigital: 'Included',
    allDigitalPrint: 'Included',
    differs: false,
  },
  {
    feature: 'Morning Physical Print Copy',
    oneDigital: 'Not included',
    allDigital: 'Not included',
    allDigitalPrint: 'Daily doorstep delivery',
    differs: true,
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'promo-window',
    question: 'How long is the $15.90/mo All-Digital rate and $180 annual offer available?',
    answer:
      'The All-Digital monthly promotional rate of $15.90/mo (down from $29.90/mo) is available for 5 more days. The $180 annual All-Digital plan ($15.00/mo equivalent) is a limited-time 2-week commitment offer.',
  },
  {
    id: 'device-limits',
    question: 'How many devices can I use with One Digital versus All-Digital?',
    answer:
      'One Digital supports 1 app device plus 1 web browser. All-Digital and All-Digital + Print allow up to 4 concurrent app devices plus 1 web browser, ideal for households.',
  },
  {
    id: 'delivery-fees',
    question: 'What are the home delivery charges for All-Digital + Print?',
    answer:
      'Physical print delivery carries a monthly vendor fee of $3.00/mo for HDB flats and condominiums, or $5.00/mo for landed properties in Singapore.',
  },
];

export interface CloserIndicator {
  number: number;
  letter: string;
  principle: string;
  tagline: string;
  elementId: string;
  snippetTitle: string;
  snippetDetail: string;
  snippetMeta: string;
  analysis: string;
  subscriptionImpact: string;
}

export const CLOSERS_INDICATORS: CloserIndicator[] = [
  {
    number: 1,
    letter: 'C',
    principle: 'Convenience',
    tagline: 'Path of least resistance',
    elementId: 'closer-convenience',
    snippetTitle: '3 Focused Options · Default: All-Digital',
    snippetDetail: 'One Digital · All-Digital (Pre-selected) · All-Digital + Print',
    snippetMeta: 'Removed News Tablet, Print-Only & multi-tier clutter',
    analysis:
      'Cutting from 6 overlapping packages down to 3 distinct tiers eliminates choice overload (Hick’s Law). Pre-selecting All-Digital as the default anchors users onto the target package with one-click checkout.',
    subscriptionImpact: 'Reduces plan-selection drop-off and speeds up time-to-checkout.',
  },
  {
    number: 2,
    letter: 'L',
    principle: 'Loss Avoidance',
    tagline: 'Non-loss is greater than gain',
    elementId: 'closer-loss-avoidance',
    snippetTitle: '$15.90/mo for 5 more days',
    snippetDetail: 'Reverts to $29.90/mo standard rate after countdown',
    snippetMeta: 'Save $14.00/mo ($168/yr) before deadline',
    analysis:
      'Framing the promotional price around what the reader stands to lose in 5 days ($14/month extra cost) triggers stronger urgency than advertising a generic discount percentage.',
    subscriptionImpact: 'Accelerates immediate sign-ups instead of deferred bookmarking.',
  },
  {
    number: 3,
    letter: 'O',
    principle: 'Own Identity',
    tagline: 'Tribes and ties ("US")',
    elementId: 'closer-own-identity',
    snippetTitle: 'Informed Singapore Readership',
    snippetDetail: 'Join the community that shapes Singapore’s daily conversation',
    snippetMeta: 'Shared civic & local identity anchor',
    analysis:
      'Positions subscribing not as buying a utility, but as belonging to an informed Singaporean cohort ("us") who rely on verified national reporting rather than unvetted social feeds.',
    subscriptionImpact: 'Increases willingness to subscribe among civic-minded readers.',
  },
  {
    number: 4,
    letter: 'S',
    principle: 'Status',
    tagline: 'Climbing the ladder',
    elementId: 'closer-status',
    snippetTitle: 'Read by Singapore’s Leaders',
    snippetDetail:
      'Leading figures in government, business, sports and others all read The Straits Times.',
    snippetMeta: 'Executive & leadership prestige cue',
    analysis:
      'Associating The Straits Times with cabinet policymakers, C-suite executives, and national athletes turns the subscription into an aspirational signal of professional competence.',
    subscriptionImpact: 'Lifts conversion among career professionals and decision-makers.',
  },
  {
    number: 5,
    letter: 'E',
    principle: 'Emotion',
    tagline: 'Feel first and think later',
    elementId: 'closer-emotion',
    snippetTitle: 'Connected to Local News',
    snippetDetail:
      'Subscribing keeps you connected and up-to-date with local news that matters to home and family.',
    snippetMeta: 'Belonging, reassurance & peace of mind',
    analysis:
      'Replaces dry feature phrasing ("unlimited articles") with emotional resonance—staying connected to the neighbourhood, policy shifts, and human stories affecting daily life in Singapore.',
    subscriptionImpact: 'Creates an emotional hook above the fold before price scrutiny.',
  },
  {
    number: 6,
    letter: 'R',
    principle: 'Recognition',
    tagline: 'The validation magnet',
    elementId: 'closer-recognition',
    snippetTitle: '80% of subscribers have chosen this option',
    snippetDetail: 'Clear majority consensus on the All-Digital tier',
    snippetMeta: 'Social proof placed directly inside decision card',
    analysis:
      'Seeing that 80% of peers pick All-Digital resolves uncertainty between One Digital ($9.90) and Print ($29.90), validating All-Digital as the smart, mainstream choice.',
    subscriptionImpact: 'Shifts mix from $9.90 One Digital toward the All-Digital flagship.',
  },
  {
    number: 7,
    letter: 'S',
    principle: 'Stickiness',
    tagline: 'Hooked by commitment',
    elementId: 'closer-stickiness',
    snippetTitle: '$180 Annual Plan · Valid for 2 weeks only',
    snippetDetail: 'Pre-committed 12-month cycle ($15.00/mo effective)',
    snippetMeta: 'Time-boxed annual lock-in option',
    analysis:
      'Offering a 2-week-only $180 annual plan rewards upfront commitment with extra savings while securing 12 months of reading habit formation and eliminating monthly churn.',
    subscriptionImpact: 'Maximizes net retained subscriptions and 12-month subscriber LTV.',
  },
];
