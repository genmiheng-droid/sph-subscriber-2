export type PlanCategory = 'all' | 'digital' | 'print' | 'tablet';

export interface SubscriptionPlan {
  id: string;
  name: string;
  category: Exclude<PlanCategory, 'all'>;
  kicker: string;
  priceMonthly: number;
  contractLabel: string;
  summary: string;
  image: string;
  imageAlt: string;
  recommended?: boolean;
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
    category: 'digital',
    kicker: '1 App Device · No Contract',
    priceMonthly: 9.9,
    contractLabel: 'Monthly recurring, cancel anytime',
    summary:
      'Essential single-device digital access to breaking local news, subscriber-only analyses, and the daily E-Paper.',
    image: '/src/assets/images/card_one_digital_1795071214179.jpg',
    imageAlt: 'Smartphone displaying digital editorial news article on a stone pedestal',
    requiresDeliveryAddress: false,
    hasPrintDeliveryFee: false,
    concurrentDevices: '1 app device + 1 web browser',
    features: [
      'Unlimited articles on straitstimes.com and ST app',
      'Daily E-Paper with 14-day rolling archive',
      'Personalised myST+ feed across 30 topics and authors',
      'No minimum contract period',
    ],
  },
  {
    id: 'all-digital',
    name: 'All-Digital',
    category: 'digital',
    kicker: '4 App Devices · Multi-Screen',
    priceMonthly: 29.9,
    contractLabel: 'Monthly recurring, flexible renewal',
    summary:
      'Built for households and multi-device readers who want seamless access across phones, tablets, and desktop.',
    image: '/src/assets/images/card_all_digital_print_1795071213895.jpg',
    imageAlt: 'Laptop and smartphone arranged on a clean slate desk surface',
    recommended: true,
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
    category: 'print',
    kicker: '4 App Devices · Morning Print Delivery',
    priceMonthly: 29.9,
    contractLabel: 'Plus $3–$5/mo home delivery fee',
    summary:
      'The complete Straits Times experience combining morning doorstep print delivery with full digital access.',
    image: '/src/assets/images/card_all_digital_print_1795071213895.jpg',
    imageAlt: 'Folded broadsheet newspaper beside a laptop and smartphone',
    requiresDeliveryAddress: true,
    hasPrintDeliveryFee: true,
    concurrentDevices: '4 app devices + 1 web browser + daily print',
    features: [
      'Daily broadsheet delivered to your doorstep or letterbox',
      'Full All-Digital access on up to 4 app devices',
      'Daily E-Paper with 14-day searchable archive',
      'Eligible for ST+ subscriber privileges and partner perks',
    ],
    footnote: 'Delivery surcharge applies: $3.00/mo (HDB/Condo) or $5.00/mo (Landed).',
  },
  {
    id: 'print-only',
    name: 'Print Only',
    category: 'print',
    kicker: 'Daily Broadsheet · 24-Month Term',
    priceMonthly: 29.9,
    contractLabel: '24-month contract · Plus delivery fee',
    summary:
      'Traditional morning newspaper delivery across Singapore for readers who prefer the tactile broadsheet format.',
    image: '/src/assets/images/hero_st_multiplatform_1795071214151.jpg',
    imageAlt: 'Folded Straits Times broadsheet newspaper on a sunlit oak breakfast table',
    requiresDeliveryAddress: true,
    hasPrintDeliveryFee: true,
    concurrentDevices: 'Daily physical print edition',
    features: [
      'Physical print copy delivered every morning',
      'Sunday Times weekend pullouts and Life sections',
      'Dedicated print delivery suspension while travelling',
      'Access to ST+ subscriber lifestyle rewards',
    ],
    footnote: 'Delivery surcharge applies: $3.00/mo (HDB/Condo) or $5.00/mo (Landed).',
  },
  {
    id: 'news-tablet-refresh',
    name: 'News Tablet (Refresh)',
    category: 'tablet',
    kicker: 'Tablet Included · Upgrade Every 24 Months',
    priceMonthly: 25.9,
    contractLabel: '24-month contract · Exchange or return',
    summary:
      'Read the daily E-Paper on a dedicated Samsung Galaxy Tab preloaded with the zero-login SPH Tab reader.',
    image: '/src/assets/images/card_news_tablet_1795071214849.jpg',
    imageAlt: 'Samsung Galaxy Tab displaying full-page broadsheet e-paper layout',
    requiresDeliveryAddress: true,
    hasPrintDeliveryFee: false,
    concurrentDevices: '1 News Tablet + 1 app device + 1 web browser',
    features: [
      'Samsung Galaxy Tab Wi-Fi delivered to your address',
      'Auto-delivered daily E-Paper in the SPH Tab app',
      'Upgrade to a new tablet model upon 24-month renewal',
      'Full access to straitstimes.com and 14-day archive',
    ],
    footnote: 'Device remains SPH Media property under Refresh; return or recontract at month 24.',
  },
  {
    id: 'news-tablet-own',
    name: 'News Tablet (Own-Your-Tablet)',
    category: 'tablet',
    kicker: 'Tablet Included · Keep After 24 Months',
    priceMonthly: 29.9,
    contractLabel: '24-month contract · Device yours to keep',
    summary:
      'Bundled News Tablet subscription with full ownership of the Samsung Galaxy Tab once the 24-month term completes.',
    image: '/src/assets/images/card_news_tablet_1795071214849.jpg',
    imageAlt: 'Slim dark-slate tablet propped upright showing crisp digital newspaper',
    requiresDeliveryAddress: true,
    hasPrintDeliveryFee: false,
    concurrentDevices: '1 News Tablet + 1 app device + 1 web browser',
    features: [
      'Samsung Galaxy Tab Wi-Fi — yours to keep after 24 months',
      'Zero-login SPH Tab app with offline morning download',
      'Adjustable font size and tap-to-read article zoom',
      'Concurrent access on 1 smartphone app and 1 web browser',
    ],
  },
];

export interface ComparisonRow {
  feature: string;
  oneDigital: string;
  allDigital: string;
  allDigitalPrint: string;
  newsTablet: string;
  differs: boolean;
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: 'Monthly Subscription',
    oneDigital: '$9.90 / mo',
    allDigital: '$29.90 / mo',
    allDigitalPrint: '$29.90 / mo + delivery',
    newsTablet: 'From $25.90 / mo',
    differs: true,
  },
  {
    feature: 'Concurrent App Devices',
    oneDigital: '1 device',
    allDigital: 'Up to 4 devices',
    allDigitalPrint: 'Up to 4 devices',
    newsTablet: '1 News Tablet + 1 app',
    differs: true,
  },
  {
    feature: 'Web Browser Access',
    oneDigital: '1 browser',
    allDigital: '1 browser',
    allDigitalPrint: '1 browser',
    newsTablet: '1 browser',
    differs: false,
  },
  {
    feature: 'Daily E-Paper & 14-Day Archive',
    oneDigital: 'Included',
    allDigital: 'Included',
    allDigitalPrint: 'Included',
    newsTablet: 'Included (Auto-sync)',
    differs: true,
  },
  {
    feature: 'Unlimited straitstimes.com Articles',
    oneDigital: 'Included',
    allDigital: 'Included',
    allDigitalPrint: 'Included',
    newsTablet: 'Included',
    differs: false,
  },
  {
    feature: 'myST+ Personalised News Feed',
    oneDigital: 'Included',
    allDigital: 'Included',
    allDigitalPrint: 'Included',
    newsTablet: 'Included',
    differs: false,
  },
  {
    feature: 'Morning Physical Print Copy',
    oneDigital: 'Not included',
    allDigital: 'Not included',
    allDigitalPrint: 'Daily doorstep delivery',
    newsTablet: 'Not included',
    differs: true,
  },
  {
    feature: 'Dedicated Reading Tablet',
    oneDigital: 'Not included',
    allDigital: 'Not included',
    allDigitalPrint: 'Not included',
    newsTablet: 'Samsung Galaxy Tab Wi-Fi',
    differs: true,
  },
  {
    feature: 'Minimum Contract Term',
    oneDigital: 'No contract',
    allDigital: 'No contract',
    allDigitalPrint: 'No contract (standard)',
    newsTablet: '24 months',
    differs: true,
  },
];

export interface StudentPublication {
  id: string;
  title: string;
  audience: string;
  language: string;
  cadence: string;
  description: string;
}

export const STUDENT_PUBLICATIONS: StudentPublication[] = [
  {
    id: 'little-red-dot',
    title: 'ST Little Red Dot',
    audience: 'Primary 3 – 6',
    language: 'English',
    cadence: 'Weekly school-term issues',
    description:
      'Designed for upper primary pupils with curated current affairs, vocabulary builders, and guided reading activities.',
  },
  {
    id: 'st-in',
    title: 'ST IN',
    audience: 'Secondary 1 – 4',
    language: 'English',
    cadence: 'Weekly via print & mobile app',
    description:
      'Builds critical media literacy for teens through deep dives on sustainability, technology, and national issues.',
  },
  {
    id: 'st-indepth',
    title: 'ST INDepth',
    audience: 'Junior College & Polytechnic',
    language: 'English',
    cadence: 'Monthly digital dossier',
    description:
      'Long-form geopolitical analysis and General Paper essay resources prepared by Straits Times editors.',
  },
  {
    id: 'zbcomma',
    title: 'zbCOMMA & Thumbs Up',
    audience: 'Kindergarten to Secondary',
    language: 'Chinese',
    cadence: 'Bi-weekly print & e-learning',
    description:
      'Age-graded Chinese student newspapers supporting MOE curriculum comprehension with interactive audio read-alongs.',
  },
  {
    id: 'geng-tamil',
    title: 'Gen G & Maanavar Murasu',
    audience: 'Primary & Secondary',
    language: 'Malay / Tamil',
    cadence: 'Bi-weekly school editions',
    description:
      'Mother Tongue current-affairs publications fostering reading fluency and cultural engagement.',
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'device-limits',
    question: 'How do concurrent device limits work across One Digital and All-Digital?',
    answer:
      'One Digital lets you stay signed in on 1 smartphone or tablet app plus 1 web browser simultaneously. All-Digital and All-Digital + Print expand this to 4 app devices plus 1 web browser, making them suitable for sharing across immediate household members.',
  },
  {
    id: 'delivery-fees',
    question: 'What are the monthly home delivery charges for Print plans?',
    answer:
      'Print delivery carries a monthly vendor fee based on residential property type in Singapore: $3.00/month for HDB flats and condominiums, or $5.00/month for landed residences. If you travel overseas, you can temporarily suspend print delivery through your subscriber portal.',
  },
  {
    id: 'tablet-end',
    question: 'What happens to my News Tablet at the end of the 24-month contract?',
    answer:
      'Under the Own-Your-Tablet plan ($29.90/month), the Samsung Galaxy Tab is permanently yours after 24 monthly payments. Under the Refresh plan ($25.90/month), you may renew for another 24 months to receive an upgraded tablet model or return the device to SPH Media.',
  },
  {
    id: 'epaper-archive',
    question: 'How do I read the E-Paper and access past editions?',
    answer:
      'Every digital and tablet plan includes daily E-Paper access with a rolling 14-day archive. Open the E-Paper section on straitstimes.com, inside The Straits Times app, or via the preloaded SPH Tab app for page-by-page broadsheet reading and tap-to-read article expansion.',
  },
  {
    id: 'cancel-switch',
    question: 'Can I upgrade or cancel my subscription anytime?',
    answer:
      'No-contract plans (One Digital and standard All-Digital) can be upgraded immediately or cancelled with notice prior to your next billing cycle. Contracted bundles such as the 24-month News Tablet require completing the minimum commitment period before cancellation.',
  },
];
