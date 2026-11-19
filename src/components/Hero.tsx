import { ArrowRight } from 'lucide-react';
import { MediaImage } from './MediaImage';

interface HeroProps {
  onSelectRecommended: () => void;
}

const KEY_PILLARS = [
  {
    value: '180 Years',
    label: 'Trusted journalism across Singapore and Asia',
  },
  {
    value: 'From $9.90',
    label: 'Monthly digital access with zero lock-in contract',
  },
  {
    value: '14-Day Archive',
    label: 'Searchable daily broadsheet E-Paper editions',
  },
  {
    value: 'Up to 4 Devices',
    label: 'Concurrent app reading for your household',
  },
];

export function Hero({ onSelectRecommended }: HeroProps) {
  return (
    <section id="top" className="bg-white border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Editorial Column */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#C8102E] uppercase mb-3">
                SPH Media · Official Subscriptions
              </p>
              <h1
                className="font-serif font-bold text-[#0B2A4A] tracking-tight leading-[1.12] mb-5"
                style={{
                  fontSize: 'clamp(2.25rem, 3.8vw, 3.4rem)',
                  textWrap: 'balance',
                }}
              >
                Reliable reporting on Singapore and the world.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
                Stay ahead with unlimited access to The Straits Times across web, mobile app, daily
                E-Paper, morning home print delivery, and the dedicated News Tablet.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#plans"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#0B2A4A] hover:bg-[#071D35] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0B2A4A]"
              >
                Explore Subscription Plans
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={onSelectRecommended}
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-[#0B2A4A] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0C5AA6]"
              >
                Start All-Digital ($29.90/mo)
              </button>
            </div>
          </div>

          {/* Right Media Column */}
          <div className="lg:col-span-6">
            <div className="relative h-64 sm:h-80 lg:h-full min-h-[320px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
              <MediaImage
                src="/src/assets/images/hero_st_multiplatform_1795071214151.jpg"
                alt="The Straits Times newspaper, tablet, and smartphone on a sunlit Singapore table overlooking Marina Bay"
                className="w-full h-full object-cover"
                fallbackTitle="The Straits Times Multi-Platform Edition"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-5 sm:p-6">
                <p className="text-xs font-medium text-slate-200">
                  Digital · Print · News Tablet
                </p>
                <p className="text-sm sm:text-base font-semibold text-white mt-0.5">
                  Seamless reading from morning coffee to evening commute
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Summary Strip below Hero Split */}
        <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {KEY_PILLARS.map((pillar) => (
            <div key={pillar.value} className="space-y-1">
              <p className="text-lg font-bold text-[#0B2A4A] tabular-nums">{pillar.value}</p>
              <p className="text-sm text-slate-600 leading-snug">{pillar.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
