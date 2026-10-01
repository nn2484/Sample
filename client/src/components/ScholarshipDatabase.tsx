import React, { useState, useMemo } from 'react';
import { SCHOLARSHIPS } from '../data/scholarships';
import { Scholarship } from '../types';
import {
  Search,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Calendar,
  Award,
  DollarSign,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ScholarshipDatabaseProps {
  onToggleBookmark: (item: {
    id: string;
    itemType: 'university' | 'program' | 'scholarship';
    itemId: string;
    title: string;
    subtitle: string;
    deadlineDate?: string;
    deadlineStatus?: 'confirmed' | 'estimated';
    linkTarget?: string;
  }) => void;
  isBookmarked: (itemId: string, itemType: string) => boolean;
}

export const ScholarshipDatabase: React.FC<ScholarshipDatabaseProps> = ({
  onToggleBookmark,
  isBookmarked
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredScholarships = useMemo(() => {
    return SCHOLARSHIPS.filter(sch => {
      // Type filter
      if (selectedType === 'need_based' && sch.type === 'merit_based') return false;
      if (selectedType === 'merit_based' && sch.type === 'need_based') return false;

      // Destination filter
      if (selectedDestination !== 'all' && sch.destination !== selectedDestination) return false;

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = sch.name.toLowerCase().includes(q);
        const matchesProvider = sch.provider.toLowerCase().includes(q);
        const matchesEligibility = sch.plainEligibility.toLowerCase().includes(q);
        const matchesSummary = sch.summary.toLowerCase().includes(q);
        if (!matchesName && !matchesProvider && !matchesEligibility && !matchesSummary) return false;
      }

      return true;
    }).sort((a, b) => {
      // Default: sort by soonest deadline
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });
  }, [selectedType, selectedDestination, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-serif font-medium text-paper-900 tracking-tight">
          Verified Scholarship Registry
        </h1>
        <p className="mt-2 text-base text-paper-600 max-w-3xl">
          Comprehensive, verified database of public, university, and international fully-funded
          scholarships for Pakistani students. Transparent eligibility requirements and official links.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-paper-50 border border-paper-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-paper-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by scholarship name, provider, or criteria..."
              className="w-full pl-10 pr-4 py-2.5 bg-paper-50 border border-paper-300 rounded-lg text-sm text-paper-900 focus:outline-none focus:ring-2 focus:ring-navy-600/40 focus:border-navy-600"
            />
          </div>

          {/* Type filters */}
          <div className="flex items-center gap-1 p-1 bg-paper-100 rounded-lg shrink-0">
            {[
              { id: 'all', label: 'All Types' },
              { id: 'need_based', label: 'Need-Based' },
              { id: 'merit_based', label: 'Merit-Based' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedType === t.id
                    ? 'bg-navy-600 text-white shadow-xs font-semibold'
                    : 'text-paper-600 hover:text-navy-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Destination filter */}
          <div className="flex items-center gap-1 p-1 bg-paper-100 rounded-lg shrink-0">
            {[
              { id: 'all', label: 'All Locations' },
              { id: 'pakistan', label: 'In Pakistan' },
              { id: 'abroad', label: 'Abroad' }
            ].map(d => (
              <button
                key={d.id}
                onClick={() => setSelectedDestination(d.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedDestination === d.id
                    ? 'bg-navy-600 text-white shadow-xs font-semibold'
                    : 'text-paper-600 hover:text-navy-900'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-paper-500 pt-1">
          <span>
            Sorted by <span className="font-medium text-paper-700">Soonest Deadline</span>
          </span>
          <span>
            Showing <span className="font-semibold text-paper-800">{filteredScholarships.length}</span>{' '}
            scholarships
          </span>
        </div>
      </div>

      {/* Scholarship Cards List */}
      <div className="space-y-4">
        {filteredScholarships.map(sch => {
          const isExpanded = expandedId === sch.id;
          const bookmarked = isBookmarked(sch.id, 'scholarship');

          return (
            <div
              key={sch.id}
              className="bg-paper-50 border border-paper-200 rounded-xl p-5 sm:p-6 shadow-xs transition-all hover:border-navy-300"
            >
              <div className="space-y-4">
                {/* Header row: Metadata unboxed & Bookmark */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-paper-500">
                    <span className="capitalize font-medium text-paper-800">
                      {sch.destination === 'pakistan' ? 'Study in Pakistan' : 'Study Abroad'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize text-paper-600">
                      {sch.type.replace(/_/g, ' ')}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize text-paper-600">
                      {sch.providerType.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      onToggleBookmark({
                        id: `sch-${sch.id}`,
                        itemType: 'scholarship',
                        itemId: sch.id,
                        title: sch.name,
                        subtitle: sch.provider,
                        deadlineDate: sch.deadlineDisplay,
                        deadlineStatus: sch.deadlineStatus,
                        linkTarget: sch.officialUrl
                      })
                    }
                    className="text-paper-400 hover:text-gold-600 p-1 -mr-1 transition-colors"
                    title={bookmarked ? 'Remove bookmark' : 'Bookmark scholarship'}
                  >
                    {bookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-gold-400 fill-gold-300/20" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Title and Provider */}
                <div>
                  <h3 className="text-lg sm:text-xl font-serif font-semibold text-paper-900">
                    {sch.name}
                  </h3>
                  <p className="text-xs text-paper-500 mt-0.5">{sch.provider}</p>
                </div>

                {/* Plain-Language Eligibility */}
                <div className="bg-navy-50/50 rounded-lg p-3.5 border border-navy-200/80 space-y-1">
                  <div className="text-xs font-semibold text-paper-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-navy-600" />
                    <span>Who Qualifies (Plain Language):</span>
                  </div>
                  <p className="text-xs text-paper-700 leading-relaxed pl-5">
                    {sch.plainEligibility}
                  </p>
                </div>

                {/* Coverage & Deadline Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2 text-paper-600">
                    <DollarSign className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-paper-900 block">Coverage:</span>
                      <span>{sch.coverage}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-paper-600">
                    <Calendar className="w-4 h-4 text-paper-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-paper-900 block">Deadline:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-paper-900">{sch.deadlineDisplay}</span>
                        <span className="text-[11px] text-paper-500">
                          ({sch.deadlineStatus === 'confirmed' ? 'Verified Official' : 'Typical Annual Date'})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="pt-4 border-t border-paper-100 text-xs space-y-3">
                    <p className="text-paper-700 leading-relaxed">{sch.summary}</p>
                    <div className="bg-paper-100/70 p-3 rounded-lg space-y-1.5 text-paper-600">
                      <div className="font-medium text-paper-900">Application Advice & Criteria:</div>
                      {sch.detailedCriteria.minPercentage && (
                        <div>• Minimum Academic Requirement: {sch.detailedCriteria.minPercentage}%</div>
                      )}
                      {sch.detailedCriteria.maxFamilyIncomePkrMonthly && (
                        <div>
                          • Max Monthly Family Income: PKR{' '}
                          {sch.detailedCriteria.maxFamilyIncomePkrMonthly.toLocaleString()}
                        </div>
                      )}
                      {sch.detailedCriteria.notes && <div>• {sch.detailedCriteria.notes}</div>}
                    </div>
                  </div>
                )}

                {/* Action Links */}
                <div className="pt-2 flex items-center justify-between border-t border-paper-100">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : sch.id)}
                    className="text-xs font-medium text-paper-600 hover:text-navy-900 inline-flex items-center gap-1"
                  >
                    <span>{isExpanded ? 'Less details' : 'More criteria & details'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <a
                    href={sch.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gold-300 hover:bg-gold-200 text-paper-950 rounded-md text-xs font-bold border border-gold-400/40 shadow-xs transition-colors"
                  >
                    <span>Official Application Portal</span>
                    <ExternalLink className="w-3 h-3 text-navy-950" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
