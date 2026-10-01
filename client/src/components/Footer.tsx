import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="border-t border-paper-800 bg-[#1f2d26] text-paper-400 mt-20 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Wordmark & Purpose */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-5 bg-gold-300 rounded-full inline-block" />
              <span className="text-xl font-serif font-bold text-white block">
                Merit Ledger
              </span>
            </div>
            <p className="text-paper-400 max-w-sm leading-relaxed">
              An authoritative, calm reference platform for Pakistani students navigating
              undergraduate university admissions, verified merit aggregates, and scholarships.
            </p>
            <div className="flex items-center gap-2 text-gold-300/90 pt-1 font-medium">
              <ShieldCheck className="w-4 h-4 text-gold-300 shrink-0" />
              <span>Formulas verified against official 2025/2026 university prospectuses</span>
            </div>
          </div>

          {/* Col 2: Core Reference Tools */}
          <div className="space-y-2">
            <span className="font-semibold text-white block uppercase tracking-wider text-[11px]">
              Tools & Directories
            </span>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => setActiveTab('calculator')}
                  className="hover:text-gold-300 hover:underline transition-colors"
                >
                  Merit Aggregate Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('directory')}
                  className="hover:text-gold-300 hover:underline transition-colors"
                >
                  University Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('scholarships')}
                  className="hover:text-gold-300 hover:underline transition-colors"
                >
                  Scholarship Registry
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('checklist')}
                  className="hover:text-gold-300 hover:underline transition-colors"
                >
                  Document Checklists
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Roadmaps & Guidance */}
          <div className="space-y-2">
            <span className="font-semibold text-white block uppercase tracking-wider text-[11px]">
              Guidance & Roadmaps
            </span>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => setActiveTab('roadmaps')}
                  className="hover:text-gold-300 hover:underline transition-colors"
                >
                  ECAT & Engineering Roadmaps
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('roadmaps')}
                  className="hover:text-gold-300 hover:underline transition-colors"
                >
                  MDCAT Medical Pathway
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('roadmaps')}
                  className="hover:text-gold-300 hover:underline transition-colors"
                >
                  Study Abroad Reality Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('deadlines')}
                  className="hover:text-gold-300 hover:underline transition-colors"
                >
                  Upcoming Deadlines Calendar
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright rule */}
        <div className="pt-8 mt-8 border-t border-paper-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-paper-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Merit Ledger · Built for Pakistani students and parents.
          </div>
          <div className="text-paper-400">
            Data sourced directly from NUST, FAST-NUCES, UET, PMDC, HEC, and accredited institutions.
          </div>
        </div>
      </div>
    </footer>
  );
};
