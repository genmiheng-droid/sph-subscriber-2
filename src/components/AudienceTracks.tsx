import { useState } from 'react';
import { Building2, GraduationCap, ArrowUpRight } from 'lucide-react';
import { STUDENT_PUBLICATIONS } from '../data/plans';

interface AudienceTracksProps {
  onOpenCorporateInquiry: () => void;
}

export function AudienceTracks({ onOpenCorporateInquiry }: AudienceTracksProps) {
  const [selectedPubId, setSelectedPubId] = useState(STUDENT_PUBLICATIONS[0].id);
  const activePub =
    STUDENT_PUBLICATIONS.find((p) => p.id === selectedPubId) ?? STUDENT_PUBLICATIONS[0];

  return (
    <section className="py-16 lg:py-20 bg-white border-t border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Corporate Subscriptions Track */}
          <div className="bg-[#0B2A4A] text-white rounded-xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3">
                <Building2 className="w-4 h-4" />
                <span>Corporate &amp; Enterprise</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                Organisation-wide news access for teams and institutions.
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                Equip employees, board members, and academic departments with multi-seat digital
                subscriptions, consolidated annual billing, and dedicated corporate support.
              </p>

              <div className="grid grid-cols-2 gap-4 py-5 border-y border-white/15 mb-6 text-sm">
                <div>
                  <p className="font-semibold text-white">5 to 5,000+ Seats</p>
                  <p className="text-xs text-slate-300 mt-1">
                    Volume tier pricing with domain SSO options
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-white">Dedicated Desk</p>
                  <p className="text-xs text-slate-300 mt-1">
                    corporateCX@sph.com.sg account onboarding
                  </p>
                </div>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={onOpenCorporateInquiry}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#0B2A4A] bg-white hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B2A4A] focus-visible:ring-white"
              >
                Request Corporate Quote
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Student Publications Track */}
          <div className="bg-[#F7F8FA] border border-slate-200 rounded-xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-[#0C5AA6] text-xs font-semibold uppercase tracking-wider mb-3">
                <GraduationCap className="w-4 h-4" />
                <span>Student Publications</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2A4A] tracking-tight mb-3">
                Age-curated editions for primary to pre-university learners.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                Explore SPH Media school editions across English, Chinese, Malay, and Tamil.
              </p>

              {/* Publication Tabs */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {STUDENT_PUBLICATIONS.map((pub) => {
                  const isActive = pub.id === selectedPubId;
                  return (
                    <button
                      key={pub.id}
                      type="button"
                      onClick={() => setSelectedPubId(pub.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-[#0B2A4A] text-white border-[#0B2A4A]'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {pub.title}
                    </button>
                  );
                })}
              </div>

              {/* Active Student Publication Details */}
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-1.5">
                  <span>{activePub.audience}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activePub.language}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activePub.cadence}</span>
                </div>
                <p className="text-base font-bold text-[#0B2A4A] mb-1.5">{activePub.title}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{activePub.description}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Available through school bulk orders and home delivery
              </span>
              <button
                type="button"
                onClick={onOpenCorporateInquiry}
                className="text-sm font-semibold text-[#0C5AA6] hover:text-[#0B2A4A] hover:underline underline-offset-4 whitespace-nowrap cursor-pointer"
              >
                Enquire for Schools
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
