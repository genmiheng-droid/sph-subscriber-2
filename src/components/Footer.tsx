interface FooterProps {
  onOpenCorporateInquiry: () => void;
}

export function Footer({ onOpenCorporateInquiry }: FooterProps) {
  return (
    <footer className="bg-[#071D35] text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          <div className="md:col-span-5 space-y-3">
            <p className="font-serif text-xl font-bold text-white">The Straits Times</p>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Published by SPH Media Limited. 1000 Toa Payoh North, News Centre, Singapore 318994.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-sm">
            <p className="font-semibold text-white">Subscriptions</p>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#plans" className="hover:text-white transition-colors">
                  Digital &amp; Print Plans
                </a>
              </li>
              <li>
                <a href="#news-tablet" className="hover:text-white transition-colors">
                  News Tablet Packages
                </a>
              </li>
              <li>
                <a href="#compare" className="hover:text-white transition-colors">
                  Compare All Tiers
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCorporateInquiry}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Corporate &amp; School Bulk Orders
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2.5 text-sm">
            <p className="font-semibold text-white">Subscriber Care</p>
            <p className="text-slate-400 tabular-nums">Hotline: +65 6388 3838</p>
            <p className="text-slate-400">Mon – Fri: 8:30am – 6:00pm SGT</p>
            <p className="text-slate-400">Corporate Desk: corporateCX@sph.com.sg</p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>Copyright © 2026 SPH Media Limited. Co. Regn. No. 202120748H. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#faqs" className="hover:text-white transition-colors">
              Subscription Terms
            </a>
            <a href="#faqs" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
