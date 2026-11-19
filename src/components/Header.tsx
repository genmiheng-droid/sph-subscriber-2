interface HeaderProps {
  onOpenSubscribe: () => void;
}

const NAV_ITEMS = [
  { label: 'Plans', href: '#plans' },
  { label: 'Compare', href: '#compare' },
  { label: 'FAQs', href: '#faqs' },
];

export function Header({ onOpenSubscribe }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="px-5 sm:px-7 h-14 flex items-center justify-between gap-6">
        <a
          href="#top"
          className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#0B2A4A] whitespace-nowrap shrink-0"
        >
          The Straits Times
        </a>

        <nav
          aria-label="Revised webpage navigation"
          className="hidden sm:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-600"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[#0B2A4A] hover:underline underline-offset-4 decoration-[#0C5AA6] transition-colors whitespace-nowrap shrink-0"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={onOpenSubscribe}
          className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0B2A4A] hover:bg-[#071D35] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Subscribe Now
        </button>
      </div>
    </header>
  );
}
