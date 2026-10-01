import React, { useState, useMemo } from 'react';
import { UNIVERSITIES } from '../data/universities';
import { University, StudyField, Sector } from '../types';
import {
  Search,
  Building2,
  MapPin,
  ExternalLink,
  Calculator,
  FileCheck,
  Bookmark,
  BookmarkCheck,
  Calendar,
  Home,
  GraduationCap,
  Scale,
  X
} from 'lucide-react';

const heroImage = '/manus-storage/hero_merit_ledger_1790354765770-BsislzdV_03780f38.jpg';

interface UniversityDirectoryProps {
  onSelectForCalculator: (universityId: string, programId?: string) => void;
  onSelectForChecklist: (universityId: string) => void;
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

export const UniversityDirectory: React.FC<UniversityDirectoryProps> = ({
  onSelectForCalculator,
  onSelectForChecklist,
  onToggleBookmark,
  isBookmarked
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedField, setSelectedField] = useState<string>('all');
  const [activeModalUni, setActiveModalUni] = useState<University | null>(null);

  // Derive unique cities
  const cities = useMemo(() => {
    const set = new Set<string>();
    UNIVERSITIES.forEach(u => set.add(u.city));
    return ['all', ...Array.from(set).sort()];
  }, []);

  // Filtered universities
  const filteredUniversities = useMemo(() => {
    return UNIVERSITIES.filter(u => {
      // Sector filter
      if (selectedSector !== 'all' && u.sector !== selectedSector) return false;

      // City filter
      if (selectedCity !== 'all' && u.city !== selectedCity) return false;

      // Field filter
      if (selectedField !== 'all') {
        const hasField = u.programs.some(p => p.field === selectedField);
        if (!hasField) return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = u.name.toLowerCase().includes(q) || u.shortName.toLowerCase().includes(q);
        const matchesCity = u.city.toLowerCase().includes(q);
        const matchesKnownFor = u.knownFor.toLowerCase().includes(q);
        const matchesProg = u.programs.some(p => p.name.toLowerCase().includes(q));
        if (!matchesName && !matchesCity && !matchesKnownFor && !matchesProg) return false;
      }

      return true;
    });
  }, [selectedSector, selectedCity, selectedField, searchQuery]);

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Editorial Hero Banner */}
      <div className="hero-banner relative rounded-2xl overflow-hidden border border-paper-200 bg-paper-900 text-white min-h-[220px] sm:min-h-[260px] flex items-center">
        <img
          src={heroImage}
          alt="Historic university library study atmosphere"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
          referrerPolicy="no-referrer"
        />
        <div className="hero-overlay absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/85 to-navy-950/70" />

        <div className="relative z-10 p-6 sm:p-10 max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-widest text-gold-300 font-bold">
            Verified University Reference Directory
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-white leading-tight">
            Academic Institutions of Pakistan
          </h1>
          <p className="text-paper-200 text-sm sm:text-base leading-relaxed">
            Curated profiles of 16 premier engineering, computing, medical, and business
            universities. Unbiased tuition costs, quota breakdowns, and official merit criteria.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-paper-50 border border-paper-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-paper-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by university name, city, program, or field..."
              className="w-full pl-10 pr-4 py-2.5 bg-paper-50 border border-paper-300 rounded-lg text-sm text-paper-900 focus:outline-none focus:ring-2 focus:ring-navy-600/40 focus:border-navy-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-paper-400 hover:text-paper-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sector Filter Buttons */}
          <div className="flex items-center gap-1 p-1 bg-paper-100 rounded-lg shrink-0">
            {['all', 'public', 'private'].map(s => (
              <button
                key={s}
                onClick={() => setSelectedSector(s)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors whitespace-nowrap ${
                  selectedSector === s
                    ? 'bg-navy-600 text-white shadow-xs font-semibold'
                    : 'text-paper-600 hover:text-navy-900'
                }`}
              >
                {s === 'all' ? 'All Sectors' : `${s} Sector`}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary filters: City & Study Field */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-paper-200 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-paper-600 font-medium">City:</span>
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              className="bg-paper-50 border border-paper-300 rounded-md px-2.5 py-1 text-paper-800 focus:outline-none focus:ring-1 focus:ring-navy-600 focus:border-navy-600"
            >
              {cities.map(c => (
                <option key={c} value={c}>
                  {c === 'all' ? 'All Cities' : c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-paper-600 font-medium">Field:</span>
            <select
              value={selectedField}
              onChange={e => setSelectedField(e.target.value)}
              className="bg-paper-50 border border-paper-300 rounded-md px-2.5 py-1 text-paper-800 focus:outline-none focus:ring-1 focus:ring-navy-600 focus:border-navy-600"
            >
              <option value="all">All Disciplines</option>
              <option value="Engineering">Engineering</option>
              <option value="Computer Science">Computer Science & AI</option>
              <option value="Medical">Medical (MBBS/BDS)</option>
              <option value="Business">Business Administration</option>
              <option value="Sciences">Natural Sciences</option>
            </select>
          </div>

          <div className="ml-auto text-paper-500 text-xs">
            Showing <span className="font-semibold text-paper-800">{filteredUniversities.length}</span>{' '}
            institutions
          </div>
        </div>
      </div>

      {/* University Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUniversities.map(uni => {
          const bookmarked = isBookmarked(uni.id, 'university');
          return (
            <div
              key={uni.id}
              className="bg-paper-50 border border-paper-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-navy-300 transition-all hover:shadow-sm"
            >
              <div className="space-y-3">
                {/* Header Row: Sector text metadata & Bookmark */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 text-xs text-paper-500">
                    <span className="capitalize font-medium text-paper-700">
                      {uni.sector} Sector
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-paper-400" />
                      {uni.city}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      onToggleBookmark({
                        id: `uni-${uni.id}`,
                        itemType: 'university',
                        itemId: uni.id,
                        title: uni.name,
                        subtitle: `${uni.shortName} (${uni.city})`,
                        deadlineDate: uni.typicalTiming.applicationCloses,
                        deadlineStatus: uni.typicalTiming.status,
                        linkTarget: uni.officialWebsite
                      })
                    }
                    className="text-paper-400 hover:text-gold-600 p-1 -mr-1 transition-colors"
                    title={bookmarked ? 'Remove bookmark' : 'Bookmark university'}
                  >
                    {bookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-gold-400 fill-gold-300/20" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* University Name */}
                <div>
                  <h3 className="text-lg font-serif font-semibold text-paper-900 group-hover:text-navy-900 transition-colors">
                    {uni.shortName}
                  </h3>
                  <p className="text-xs text-paper-600 line-clamp-1">{uni.name}</p>
                </div>

                {/* Description */}
                <p className="text-xs text-paper-600 leading-relaxed line-clamp-2">
                  {uni.description}
                </p>

                {/* Key programs offered & known for */}
                <div className="pt-2 border-t border-paper-100 text-xs space-y-1">
                  <div className="text-paper-500">
                    <span className="font-medium text-paper-700">Known For:</span> {uni.knownFor}
                  </div>
                  <div className="text-paper-500">
                    <span className="font-medium text-paper-700">Annual Tuition:</span>{' '}
                    <span className="font-mono text-paper-800">{uni.generalFeeRange}</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 mt-4 border-t border-paper-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveModalUni(uni)}
                  className="px-3 py-1.5 text-xs font-medium text-navy-800 bg-navy-50 hover:bg-navy-100 rounded-md transition-colors"
                >
                  View Details & Programs ({uni.programs.length})
                </button>

                <button
                  onClick={() => onSelectForCalculator(uni.id)}
                  className="px-3 py-1.5 text-xs font-bold text-paper-950 bg-gold-300 hover:bg-gold-200 border border-gold-400/40 rounded-md transition-colors flex items-center gap-1 shadow-xs"
                >
                  <Calculator className="w-3.5 h-3.5 text-navy-900" />
                  <span className="text-white dark:text-paper-950">Calculator</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* University Detail Modal */}
      {activeModalUni && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-paper-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-paper-50 rounded-2xl border border-paper-200 shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-paper-50/95 backdrop-blur-md px-6 py-4 border-b border-paper-200 flex items-start justify-between z-10">
              <div>
                <div className="flex items-center gap-2 text-xs text-paper-500">
                  <span className="capitalize font-medium text-paper-700">
                    {activeModalUni.sector} Sector
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activeModalUni.city}</span>
                  {activeModalUni.otherCampuses && activeModalUni.otherCampuses.length > 0 && (
                    <span>(+ {activeModalUni.otherCampuses.join(', ')})</span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-semibold text-paper-900 mt-0.5">
                  {activeModalUni.name} ({activeModalUni.shortName})
                </h2>
              </div>
              <button
                onClick={() => setActiveModalUni(null)}
                className="p-1.5 text-paper-400 hover:text-paper-700 rounded-lg hover:bg-paper-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-sm text-paper-700">
              {/* Overview & Known For */}
              <div className="space-y-2">
                <p className="leading-relaxed text-paper-600">
                  {activeModalUni.description}
                </p>
                <div className="bg-paper-50 rounded-lg p-3 border border-paper-200 text-xs">
                  <span className="font-semibold text-paper-900">Core Strengths:</span>{' '}
                  {activeModalUni.knownFor}
                </div>
              </div>

              {/* Programs Offered */}
              <div className="space-y-3">
                <h3 className="text-base font-serif font-semibold text-paper-900 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-navy-600" />
                  <span>Offered Programs & Admission Formulas</span>
                </h3>

                <div className="space-y-3">
                  {activeModalUni.programs.map(prog => (
                    <div
                      key={prog.id}
                      className="border border-paper-200 rounded-lg p-4 bg-paper-50/50 hover:bg-paper-50 transition-colors space-y-2.5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <span className="font-medium text-paper-900 text-sm">
                            {prog.name}
                          </span>
                          <div className="text-xs text-paper-500">
                            {prog.degreeType} ({prog.durationYears} Years) · Field: {prog.field}
                          </div>
                        </div>

                        {prog.approxClosingAggregate && (
                          <div className="text-right">
                            <span className="text-xs text-paper-500">Typical Closing:</span>{' '}
                            <span className="font-mono font-medium text-paper-900 text-xs">
                              ~{prog.approxClosingAggregate}%
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Formula Summary */}
                      <div className="text-xs text-paper-600 bg-paper-50 p-2.5 rounded border border-paper-200/80">
                        <span className="font-medium text-paper-800">Formula:</span>{' '}
                        {prog.formula.ruleDescription}
                        <div className="text-[11px] text-paper-500 mt-1">
                          Source: {prog.formula.citation} (Verified {prog.formula.lastVerified})
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => {
                            setActiveModalUni(null);
                            onSelectForCalculator(activeModalUni.id, prog.id);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-gold-300 hover:bg-gold-200 text-paper-950 rounded-md border border-gold-400/40 shadow-xs transition-colors"
                        >
                          <Calculator className="w-3.5 h-3.5 text-navy-900" />
                          <span>Calculate Aggregate</span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveModalUni(null);
                            onSelectForChecklist(activeModalUni.id);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-paper-100 hover:bg-paper-200 text-paper-800 rounded-md transition-colors"
                        >
                          <FileCheck className="w-3.5 h-3.5 text-navy-600" />
                          <span>Document Checklist</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Annual Tuition Fees */}
              <div className="space-y-2 border-t border-paper-200 pt-4">
                <h4 className="font-semibold text-paper-900 text-sm">
                  Approximate Annual Fee Range
                </h4>
                <div className="text-base font-mono font-medium text-paper-900">
                  {activeModalUni.generalFeeRange}
                </div>
                <p className="text-xs text-paper-500 italic">
                  Note: {activeModalUni.feeNote} Always verify exact semester dues on official notices.
                </p>
              </div>

              {/* Admission Cycle & Important Timing */}
              <div className="space-y-2 border-t border-paper-200 pt-4">
                <h4 className="font-semibold text-paper-900 text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-navy-600" />
                  <span>Typical Admission Timing ({activeModalUni.typicalTiming.cycleYear})</span>
                </h4>
                <p className="text-xs text-paper-500">
                  * Based on typical annual patterns. Official notices confirm exact dates per cycle.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-paper-50 p-2.5 rounded-lg border border-paper-200">
                    <span className="font-medium text-paper-700 block">Applications Open:</span>
                    <span className="text-paper-900">{activeModalUni.typicalTiming.applicationOpens}</span>
                  </div>
                  <div className="bg-paper-50 p-2.5 rounded-lg border border-paper-200">
                    <span className="font-medium text-paper-700 block">Applications Close:</span>
                    <span className="text-paper-900">{activeModalUni.typicalTiming.applicationCloses}</span>
                  </div>
                  <div className="sm:col-span-2 bg-paper-50 p-2.5 rounded-lg border border-paper-200">
                    <span className="font-medium text-paper-700 block">Entrance Examination:</span>
                    <span className="text-paper-900">{activeModalUni.typicalTiming.testDates}</span>
                  </div>
                </div>
                <p className="text-xs text-paper-600">{activeModalUni.typicalTiming.notes}</p>
              </div>

              {/* Practical Considerations */}
              <div className="space-y-3 border-t border-paper-200 pt-4 text-xs">
                <h4 className="font-semibold text-paper-900 text-sm">
                  Practical Admission Information
                </h4>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-paper-900">Hostel & Accommodation:</span>{' '}
                    <span className="text-paper-600">{activeModalUni.practicalInfo.hostelNotes}</span>
                  </div>
                  <div>
                    <span className="font-medium text-paper-900">O/A-Level Equivalence:</span>{' '}
                    <span className="text-paper-600">{activeModalUni.practicalInfo.oALevelEquivalence}</span>
                  </div>
                  <div>
                    <span className="font-medium text-paper-900">Provincial Quotas & Seats:</span>{' '}
                    <span className="text-paper-600">{activeModalUni.practicalInfo.quotaSystems}</span>
                  </div>
                </div>
              </div>

              {/* External Website Link */}
              <div className="pt-4 border-t border-paper-200 flex items-center justify-between">
                <a
                  href={activeModalUni.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-navy-600 hover:text-navy-800 underline"
                >
                  <span>Visit {activeModalUni.shortName} Official Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setActiveModalUni(null)}
                  className="px-4 py-2 bg-navy-600 text-white rounded-lg text-xs font-semibold hover:bg-navy-700 transition-colors shadow-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
