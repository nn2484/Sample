import React, { useState, useEffect, useMemo } from 'react';
import { UNIVERSITIES } from '../data/universities';
import { SCHOLARSHIPS } from '../data/scholarships';
import { StudyField, BudgetTier, AcademicStream, UserProfile, Program, University } from '../types';
import { getSavedProfile, saveProfile, clearProfile } from '../utils/storage';
import {
  Sparkles,
  Calculator,
  ShieldCheck,
  Target,
  TrendingUp,
  MapPin,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface RecommendationsProps {
  onNavigateToCalculator: (uniId: string, progId: string) => void;
  onNavigateToScholarships: (schId?: string) => void;
  onNavigateToRoadmaps: () => void;
}

export const Recommendations: React.FC<RecommendationsProps> = ({
  onNavigateToCalculator,
  onNavigateToScholarships,
  onNavigateToRoadmaps
}) => {
  const [profile, setProfile] = useState<UserProfile>(() => getSavedProfile());
  const [isSaved, setIsSaved] = useState(false);

  // Update profile in localStorage whenever changed
  const updateProfile = (updates: Partial<UserProfile>) => {
    const updated = { ...profile, ...updates };
    setProfile(updated);
    saveProfile(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleClear = () => {
    clearProfile();
    const fresh: UserProfile = {
      matricPercentage: null,
      intermediatePercentage: null,
      isPredictedInter: false,
      academicStream: 'fsc',
      fieldsOfInterest: ['Computer Science', 'Engineering'],
      preferredCity: 'All',
      canRelocate: true,
      budgetTier: 'public'
    };
    setProfile(fresh);
  };

  const toggleField = (field: StudyField) => {
    const current = profile.fieldsOfInterest;
    let next: StudyField[];
    if (current.includes(field)) {
      next = current.filter(f => f !== field);
      if (next.length === 0) next = [field]; // Keep at least one
    } else {
      next = [...current, field];
    }
    updateProfile({ fieldsOfInterest: next });
  };

  // Calculate student indicative academic aggregate baseline
  const estimatedBaseline = useMemo(() => {
    const m = profile.matricPercentage || 80;
    const i = profile.intermediatePercentage || 75;
    // Indicative approximation for matching when entry test is yet to be taken
    return (m * 0.3) + (i * 0.7);
  }, [profile.matricPercentage, profile.intermediatePercentage]);

  // Matching Engine
  const matchedShortlist = useMemo(() => {
    const safe: Array<{ university: University; program: Program; diff: number }> = [];
    const target: Array<{ university: University; program: Program; diff: number }> = [];
    const stretch: Array<{ university: University; program: Program; diff: number }> = [];

    UNIVERSITIES.forEach(uni => {
      // City check
      if (
        profile.preferredCity !== 'All' &&
        !profile.canRelocate &&
        uni.city !== profile.preferredCity
      ) {
        return;
      }

      // Budget check
      if (profile.budgetTier === 'public' && uni.sector === 'private') {
        // Exclude costly private universities unless need_scholarship
        return;
      }

      uni.programs.forEach(prog => {
        // Field check
        if (!profile.fieldsOfInterest.includes(prog.field)) {
          return;
        }

        const cutoff = prog.approxClosingAggregate || 75;
        const diff = estimatedBaseline - cutoff;

        if (diff >= 3.0) {
          safe.push({ university: uni, program: prog, diff });
        } else if (diff >= -3.5) {
          target.push({ university: uni, program: prog, diff });
        } else if (diff >= -9.0) {
          stretch.push({ university: uni, program: prog, diff });
        }
      });
    });

    return { safe, target, stretch };
  }, [profile, estimatedBaseline]);

  // Suggested scholarships based on budget
  const relevantScholarships = useMemo(() => {
    if (profile.budgetTier === 'need_scholarship') {
      return SCHOLARSHIPS.filter(s => s.type === 'need_based' || s.type === 'need_and_merit').slice(0, 3);
    }
    return SCHOLARSHIPS.filter(s => s.type === 'merit_based').slice(0, 3);
  }, [profile.budgetTier]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-serif font-medium text-paper-900 tracking-tight">
          Personalized University Matchmaker
        </h1>
        <p className="mt-2 text-base text-paper-600 max-w-3xl">
          Enter your basic academic parameters to receive an honest, tiered shortlist divided into
          Safe, Target, and Stretch admissions. No personal identification or contact data is stored.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Minimal Privacy-Preserving Profile Form */}
        <div className="lg:col-span-5 bg-paper-50 border border-paper-200 rounded-xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-paper-100">
            <span className="text-sm font-semibold text-paper-900">Your Academic Profile</span>
            {isSaved && (
              <span className="text-xs text-navy-600 font-semibold">Saved</span>
            )}
          </div>

          {/* Academic Stream */}
          <div>
            <label className="block text-xs font-medium text-paper-500 uppercase tracking-wider mb-1.5">
              Schooling Background
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => updateProfile({ academicStream: 'fsc' })}
                className={`py-2 px-3 rounded-lg border text-center font-medium transition-colors ${
                  profile.academicStream === 'fsc'
                    ? 'bg-navy-600 text-white border-navy-600 font-semibold shadow-xs'
                    : 'bg-paper-50 text-paper-700 border-paper-200 hover:bg-paper-100'
                }`}
              >
                Matric / FSc
              </button>
              <button
                type="button"
                onClick={() => updateProfile({ academicStream: 'o_a_level' })}
                className={`py-2 px-3 rounded-lg border text-center font-medium transition-colors ${
                  profile.academicStream === 'o_a_level'
                    ? 'bg-navy-600 text-white border-navy-600 font-semibold shadow-xs'
                    : 'bg-paper-50 text-paper-700 border-paper-200 hover:bg-paper-100'
                }`}
              >
                O / A-Levels
              </button>
            </div>
          </div>

          {/* Matric and Inter Marks */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-paper-700 mb-1">
                Matric / SSC %
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={profile.matricPercentage ?? ''}
                onChange={e =>
                  updateProfile({
                    matricPercentage: e.target.value ? parseFloat(e.target.value) : null
                  })
                }
                placeholder="e.g. 88.5"
                className="w-full bg-paper-50 border border-paper-300 rounded-lg px-3 py-2 text-sm text-paper-900 font-mono focus:outline-none focus:ring-2 focus:ring-navy-600/40 focus:border-navy-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-paper-700 mb-1">
                Inter / HSSC %
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={profile.intermediatePercentage ?? ''}
                onChange={e =>
                  updateProfile({
                    intermediatePercentage: e.target.value ? parseFloat(e.target.value) : null
                  })
                }
                placeholder="e.g. 81.0"
                className="w-full bg-paper-50 border border-paper-300 rounded-lg px-3 py-2 text-sm text-paper-900 font-mono focus:outline-none focus:ring-2 focus:ring-navy-600/40 focus:border-navy-600"
              />
            </div>
          </div>

          {/* Predicted Inter Checkbox */}
          <label className="flex items-center gap-2 text-xs text-paper-600 cursor-pointer">
            <input
              type="checkbox"
              checked={profile.isPredictedInter}
              onChange={e => updateProfile({ isPredictedInter: e.target.checked })}
              className="rounded text-navy-600 focus:ring-navy-600"
            />
            <span>Intermediate score is expected / Part-1 result</span>
          </label>

          {/* Fields of Interest */}
          <div>
            <label className="block text-xs font-medium text-paper-500 uppercase tracking-wider mb-2">
              Fields of Interest (Multi-select)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  'Computer Science',
                  'Engineering',
                  'Medical',
                  'Business',
                  'Sciences'
                ] as StudyField[]
              ).map(f => {
                const selected = profile.fieldsOfInterest.includes(f);
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => toggleField(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selected
                        ? 'bg-navy-600 text-white font-semibold shadow-xs'
                        : 'bg-paper-100 text-paper-700 hover:bg-paper-200'
                    }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget Tier */}
          <div>
            <label className="block text-xs font-medium text-paper-500 uppercase tracking-wider mb-2">
              Affordability Tier
            </label>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'public', label: 'Public University Budget (~PKR 80k–180k/yr)' },
                { id: 'private', label: 'Private University Budget (~PKR 400k–1M+/yr)' },
                { id: 'need_scholarship', label: 'Require Financial Aid / Scholarship to Attend' }
              ].map(b => (
                <label
                  key={b.id}
                  className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                    profile.budgetTier === b.id
                      ? 'bg-navy-50/60 border-navy-600 text-paper-950 font-semibold'
                      : 'border-paper-200 text-paper-600 hover:bg-paper-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="budget"
                    checked={profile.budgetTier === b.id}
                    onChange={() => updateProfile({ budgetTier: b.id as BudgetTier })}
                    className="text-navy-600 focus:ring-navy-600"
                  />
                  <span>{b.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* City & Relocation */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-xs font-medium text-paper-700 mb-1">
                Preferred City
              </label>
              <select
                value={profile.preferredCity}
                onChange={e => updateProfile({ preferredCity: e.target.value })}
                className="w-full bg-paper-50 border border-paper-300 rounded-lg px-2.5 py-1.5 text-paper-900 focus:outline-none focus:ring-1 focus:ring-navy-600"
              >
                <option value="All">Any City</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Lahore">Lahore</option>
                <option value="Karachi">Karachi</option>
                <option value="Topi">Topi / KPK</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-paper-700 mb-1">
                Relocation Willingness
              </label>
              <select
                value={profile.canRelocate ? 'yes' : 'no'}
                onChange={e => updateProfile({ canRelocate: e.target.value === 'yes' })}
                className="w-full bg-paper-50 border border-paper-300 rounded-lg px-2.5 py-1.5 text-paper-900 focus:outline-none focus:ring-1 focus:ring-navy-600"
              >
                <option value="yes">Willing to Relocate</option>
                <option value="no">Home City Only</option>
              </select>
            </div>
          </div>

          <div className="pt-2 border-t border-paper-100 flex items-center justify-between">
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1 text-xs text-paper-400 hover:text-rose-700 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset Profile Data</span>
            </button>
            <span className="text-[11px] text-paper-400">Auto-saved in browser</span>
          </div>
        </div>

        {/* Right Column: Matched Shortlist Tiered by Safety */}
        <div className="lg:col-span-7 space-y-6">
          {/* Transparent limitation note */}
          <div className="bg-paper-100/70 border border-paper-200 rounded-xl p-4 text-xs text-paper-600 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-paper-500 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-semibold text-paper-900">Admissions Integrity Disclosure:</span>{' '}
              Closing aggregates fluctuate annually based on test difficulty and cohort size. These
              classifications compare your academic foundation with verified previous cycles. An
              entry test score will solidify your final rank.
            </div>
          </div>

          {/* Target Programs (Most Realistic Options) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-gold-600" />
              <h2 className="text-base font-serif font-semibold text-paper-900">
                Target Options (Realistically Competitive)
              </h2>
              <span className="text-xs text-paper-400">({matchedShortlist.target.length})</span>
            </div>

            {matchedShortlist.target.length === 0 ? (
              <p className="text-xs text-paper-500 italic p-3 bg-paper-50 rounded-lg">
                No matching target programs found for these specific criteria. Try expanding fields of interest or city.
              </p>
            ) : (
              <div className="space-y-2.5">
                {matchedShortlist.target.slice(0, 5).map(({ university, program }) => (
                  <div
                    key={program.id}
                    className="bg-paper-50 border border-paper-200 rounded-lg p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-gold-300 hover:shadow-xs transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs text-paper-500">
                        <span className="font-semibold text-paper-800">{university.shortName}</span>
                        <span aria-hidden="true">·</span>
                        <span>{university.city}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-paper-600">
                          Hist. Cutoff: ~{program.approxClosingAggregate}%
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-paper-900 mt-0.5">
                        {program.name}
                      </h4>
                      <p className="text-xs text-paper-500 font-mono mt-0.5">
                        Fee: {program.feePerYearPkr}
                      </p>
                    </div>

                    <button
                      onClick={() => onNavigateToCalculator(university.id, program.id)}
                      className="self-start sm:self-center inline-flex items-center gap-1 px-3.5 py-1.5 bg-gold-300 hover:bg-gold-200 text-paper-950 rounded-md text-xs font-bold border border-gold-400/40 shadow-xs transition-colors whitespace-nowrap"
                    >
                      <Calculator className="w-3.5 h-3.5 text-navy-900" />
                      <span>Test Formula</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Safe Options */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-navy-600" />
              <h2 className="text-base font-serif font-semibold text-paper-900">
                Safe Options (High Probability of Acceptance)
              </h2>
              <span className="text-xs text-paper-400">({matchedShortlist.safe.length})</span>
            </div>

            {matchedShortlist.safe.length === 0 ? (
              <p className="text-xs text-paper-500 italic p-3 bg-paper-50 rounded-lg">
                No safe programs found in this tier.
              </p>
            ) : (
              <div className="space-y-2.5">
                {matchedShortlist.safe.slice(0, 4).map(({ university, program }) => (
                  <div
                    key={program.id}
                    className="bg-paper-50 border border-paper-200 rounded-lg p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-navy-400 hover:shadow-xs transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs text-paper-500">
                        <span className="font-semibold text-paper-800">{university.shortName}</span>
                        <span aria-hidden="true">·</span>
                        <span>{university.city}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-navy-700 font-semibold">
                          Cutoff: ~{program.approxClosingAggregate}%
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-paper-900 mt-0.5">
                        {program.name}
                      </h4>
                      <p className="text-xs text-paper-500 font-mono mt-0.5">
                        Fee: {program.feePerYearPkr}
                      </p>
                    </div>

                    <button
                      onClick={() => onNavigateToCalculator(university.id, program.id)}
                      className="self-start sm:self-center inline-flex items-center gap-1 px-3 py-1.5 bg-navy-50 hover:bg-navy-100 text-navy-900 rounded-md text-xs font-semibold transition-colors whitespace-nowrap"
                    >
                      <Calculator className="w-3.5 h-3.5 text-navy-700" />
                      <span>Test Formula</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stretch Options */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gold-800" />
              <h2 className="text-base font-serif font-semibold text-paper-900">
                Stretch Options (Reach Programs — High Test Score Needed)
              </h2>
              <span className="text-xs text-paper-400">({matchedShortlist.stretch.length})</span>
            </div>

            <div className="space-y-2.5">
              {matchedShortlist.stretch.slice(0, 3).map(({ university, program }) => (
                <div
                  key={program.id}
                  className="bg-paper-50 border border-paper-200 rounded-lg p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-paper-300 transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-paper-500">
                      <span className="font-semibold text-paper-800">{university.shortName}</span>
                      <span aria-hidden="true">·</span>
                      <span>{university.city}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-gold-800 font-medium">
                        Cutoff: ~{program.approxClosingAggregate}%
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-paper-900 mt-0.5">
                      {program.name}
                    </h4>
                    <p className="text-xs text-paper-500 font-mono mt-0.5">
                      Fee: {program.feePerYearPkr}
                    </p>
                  </div>

                  <button
                    onClick={() => onNavigateToCalculator(university.id, program.id)}
                    className="self-start sm:self-center inline-flex items-center gap-1 px-3 py-1.5 bg-paper-100 hover:bg-paper-200 text-paper-800 rounded-md text-xs font-medium transition-colors whitespace-nowrap"
                  >
                    <Calculator className="w-3.5 h-3.5 text-navy-600" />
                    <span>Test Formula</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Matching Financial Aid & Scholarships */}
          <div className="pt-4 border-t border-paper-200 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-paper-900">
                Recommended Financial Aid & Scholarships for Your Profile
              </h3>
              <button
                onClick={() => onNavigateToScholarships()}
                className="text-xs text-navy-600 hover:text-navy-800 font-medium inline-flex items-center gap-1"
              >
                <span>View all scholarships</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {relevantScholarships.map(sch => (
                <div
                  key={sch.id}
                  onClick={() => onNavigateToScholarships(sch.id)}
                  className="bg-paper-50 border border-paper-200 rounded-lg p-3 cursor-pointer hover:bg-paper-100 transition-colors space-y-1"
                >
                  <div className="font-semibold text-paper-900 line-clamp-1">{sch.name}</div>
                  <div className="text-paper-500 text-[11px] line-clamp-2">{sch.coverage}</div>
                  <div className="text-gold-700 font-mono text-[10px] font-semibold pt-1">
                    Deadline: {sch.deadlineDisplay}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Link to Career Roadmaps */}
          <div className="p-4 bg-navy-50/80 border border-navy-200 rounded-xl flex items-center justify-between gap-3 text-xs">
            <span className="text-navy-950 font-medium">
              Want to see the month-by-month steps for these universities?
            </span>
            <button
              onClick={onNavigateToRoadmaps}
              className="px-3.5 py-1.5 bg-navy-600 text-white rounded-md font-semibold hover:bg-navy-700 transition-colors whitespace-nowrap shadow-xs"
            >
              Explore Visual Roadmaps
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
