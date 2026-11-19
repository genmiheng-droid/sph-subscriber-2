import { ArrowRight, Users, Award, Heart } from 'lucide-react';
import { MediaImage } from './MediaImage';

interface HeroProps {
  activeCloserId: string | null;
  onSelectDefaultPlan: () => void;
}

export function Hero({ activeCloserId, onSelectDefaultPlan }: HeroProps) {
  const highlightClass = (id: string) =>
    activeCloserId === id
      ? 'ring-2 ring-[#B91C1C] ring-offset-2 rounded-lg bg-red-50/40 transition-all'
      : 'transition-all';

  return (
    <section id="top" className="bg-white border-b border-slate-200">
      <div className="px-5 sm:px-7 pt-7 pb-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
          {/* Left Editorial Copy */}
          <div className="xl:col-span-7 flex flex-col justify-between">
            <div>
              {/* 3. Own Identity */}
              <div id="closer-own-identity" className={`p-1.5 -m-1.5 mb-2 ${highlightClass('closer-own-identity')}`}>
                <p className="text-xs font-semibold tracking-wider text-[#C8102E] uppercase mb-2">
                  For Informed Singaporeans · Our Community
                </p>
                <h1
                  className="font-serif font-bold text-[#0B2A4A] tracking-tight leading-[1.12]"
                  style={{
                    fontSize: 'clamp(1.75rem, 2.7vw, 2.5rem)',
                    textWrap: 'balance',
                  }}
                >
                  Stay connected to Singapore’s trusted local news.
                </h1>
              </div>

              {/* 5. Emotion */}
              <div id="closer-emotion" className={`p-2 -mx-2 mt-2 mb-3 ${highlightClass('closer-emotion')}`}>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed flex items-start gap-2.5">
                  <Heart className="w-4 h-4 text-[#C8102E] shrink-0 mt-1" />
                  <span>
                    <strong>Subscribing keeps you connected and up-to-date with local news</strong>{' '}
                    that matters to your home, neighbourhood, and family across Singapore.
                  </span>
                </p>
              </div>

              {/* 4. Status */}
              <div
                id="closer-status"
                className={`p-2.5 rounded-lg bg-slate-50 border border-slate-200 mb-5 ${highlightClass('closer-status')}`}
              >
                <p className="text-xs sm:text-sm text-[#0B2A4A] font-medium flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-[#0C5AA6] shrink-0 mt-0.5" />
                  <span>
                    Leading figures in government, business, sports and others all read The Straits
                    Times.
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onSelectDefaultPlan}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#0B2A4A] hover:bg-[#071D35] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0B2A4A]"
              >
                Subscribe to All-Digital ($15.90/mo)
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#plans"
                className="inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-[#0B2A4A] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                View 3 Plans
              </a>
            </div>
          </div>

          {/* Right Media */}
          <div className="xl:col-span-5">
            <div className="relative h-56 xl:h-full min-h-[240px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
              <MediaImage
                src="/src/assets/images/hero_st_multiplatform_1795071214151.jpg"
                alt="The Straits Times newspaper, tablet, and smartphone in Singapore"
                className="w-full h-full object-cover"
                fallbackTitle="The Straits Times"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                <p className="text-xs font-medium text-slate-200 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>80% of subscribers choose All-Digital</span>
                </p>
                <p className="text-sm font-semibold text-white mt-0.5">
                  3 clear plans · Instant digital activation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
