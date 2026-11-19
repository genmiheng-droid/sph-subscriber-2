import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface CorporateInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CorporateInquiryModal({ isOpen, onClose }: CorporateInquiryModalProps) {
  const [organisation, setOrganisation] = useState('');
  const [contactName, setContactName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [seatRange, setSeatRange] = useState('10–49 seats');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (organisation.trim().length < 2 || contactName.trim().length < 2) {
      setError('Please enter your organisation and contact name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail.trim())) {
      setError('Please enter a valid work or school email address.');
      return;
    }
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setError(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="corp-modal-title"
    >
      <div className="absolute inset-0" onClick={handleClose} />

      <div className="relative w-full max-w-md bg-white rounded-xl border border-slate-200 shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <h2 id="corp-modal-title" className="font-serif text-xl font-bold text-[#0B2A4A]">
            Corporate &amp; School Enquiry
          </h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 space-y-5">
            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-sm text-emerald-950">
                <p className="font-semibold">Enquiry Logged for {organisation}</p>
                <p className="text-emerald-900 mt-1">
                  Our corporate desk (corporateCX@sph.com.sg) will respond to{' '}
                  <span className="font-medium">{workEmail}</span> within 1 business day for{' '}
                  {seatRange}.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#0B2A4A] hover:bg-[#071D35] rounded-lg cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label htmlFor="corp-org" className="block text-sm font-medium text-slate-700 mb-1">
                Company or School Name
              </label>
              <input
                id="corp-org"
                type="text"
                required
                value={organisation}
                onChange={(e) => setOrganisation(e.target.value)}
                placeholder="e.g. Raffles Institution / Keppel Corp"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C5AA6]"
              />
            </div>

            <div>
              <label htmlFor="corp-name" className="block text-sm font-medium text-slate-700 mb-1">
                Contact Person
              </label>
              <input
                id="corp-name"
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Rachel Lim"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C5AA6]"
              />
            </div>

            <div>
              <label htmlFor="corp-email" className="block text-sm font-medium text-slate-700 mb-1">
                Work or Institutional Email
              </label>
              <input
                id="corp-email"
                type="email"
                required
                value={workEmail}
                onChange={(e) => setWorkEmail(e.target.value)}
                placeholder="rachel.lim@company.com.sg"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C5AA6]"
              />
            </div>

            <div>
              <label htmlFor="corp-seats" className="block text-sm font-medium text-slate-700 mb-1">
                Estimated Readers
              </label>
              <select
                id="corp-seats"
                value={seatRange}
                onChange={(e) => setSeatRange(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C5AA6]"
              >
                <option value="5–9 seats">5–9 seats</option>
                <option value="10–49 seats">10–49 seats</option>
                <option value="50–199 seats">50–199 seats</option>
                <option value="200+ enterprise seats">200+ enterprise seats</option>
              </select>
            </div>

            {error && (
              <p className="text-sm font-medium text-[#C8102E]" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#0B2A4A] hover:bg-[#071D35] rounded-lg transition-colors cursor-pointer"
            >
              Submit Enquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
