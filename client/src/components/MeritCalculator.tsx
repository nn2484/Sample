import React, { useState, useMemo, useEffect } from 'react';
import { UNIVERSITIES } from '../data/universities';
import { University, Program } from '../types';
import { ShieldCheck, Info, ArrowRight, CheckCircle2, RotateCcw, Copy, Check } from 'lucide-react';

interface MeritCalculatorProps {
  initialUniversityId?: string;
  initialProgramId?: string;
  onNavigateToChecklist: (universityId: string) => void;
  onNavigateToRecommendations: () => void;
}

export const MeritCalculator: React.FC<MeritCalculatorProps> = ({
  initialUniversityId,
  initialProgramId,
  onNavigateToChecklist,
  onNavigateToRecommendations
}) => {
  const [selectedUniId, setSelectedUniId] = useState<string>(
    initialUniversityId || UNIVERSITIES[0].id
  );

  const selectedUniversity: University = useMemo(() => {
    return UNIVERSITIES.find(u => u.id === selectedUniId) || UNIVERSITIES[0];
  }, [selectedUniId]);

  const [selectedProgId, setSelectedProgId] = useState<string>(
    initialProgramId || selectedUniversity.programs[0]?.id || ''
  );

  // Sync program if university changes
  useEffect(() => {
    if (!selectedUniversity.programs.some(p => p.id === selectedProgId)) {
      setSelectedProgId(selectedUniversity.programs[0]?.id || '');
    }
  }, [selectedUniversity, selectedProgId]);

  // Sync if initial props change
  useEffect(() => {
    if (initialUniversityId) {
      setSelectedUniId(initialUniversityId);
    }
  }, [initialUniversityId]);

  useEffect(() => {
    if (initialProgramId) {
      setSelectedProgId(initialProgramId);
    }
  }, [initialProgramId]);

  const selectedProgram: Program = useMemo(() => {
    return (
      selectedUniversity.programs.find(p => p.id === selectedProgId) ||
      selectedUniversity.programs[0]
    );
  }, [selectedUniversity, selectedProgId]);

  const formula = selectedProgram.formula;

  // Input states
  const [matricInputMode, setMatricInputMode] = useState<'percentage' | 'marks'>('percentage');
  const [matricPercentage, setMatricPercentage] = useState<string>('88.5');
  const [matricObtained, setMatricObtained] = useState<string>('975');
  const [matricTotal, setMatricTotal] = useState<string>('1100');

  const [interInputMode, setInterInputMode] = useState<'percentage' | 'marks'>('percentage');
  const [interPercentage, setInterPercentage] = useState<string>('82.0');
  const [interObtained, setInterObtained] = useState<string>('420');
  const [interTotal, setInterTotal] = useState<string>('520'); // Part 1 or Part 2

  const [testScore, setTestScore] = useState<string>(() => {
    if (formula.testMaxMarks === 200) return '148';
    if (formula.testMaxMarks === 400) return '280';
    if (formula.testMaxMarks === 1600) return '1380';
    if (formula.testMaxMarks === 360) return '240';
    return '75';
  });

  const [copied, setCopied] = useState<boolean>(false);

  // Resolved percentages
  const effectiveMatricPercent = useMemo(() => {
    if (matricInputMode === 'percentage') {
      const val = parseFloat(matricPercentage);
      return isNaN(val) ? 0 : Math.min(100, Math.max(0, val));
    } else {
      const obt = parseFloat(matricObtained);
      const tot = parseFloat(matricTotal);
      if (!isNaN(obt) && !isNaN(tot) && tot > 0) {
        return Math.min(100, Math.max(0, (obt / tot) * 100));
      }
      return 0;
    }
  }, [matricInputMode, matricPercentage, matricObtained, matricTotal]);

  const effectiveInterPercent = useMemo(() => {
    if (interInputMode === 'percentage') {
      const val = parseFloat(interPercentage);
      return isNaN(val) ? 0 : Math.min(100, Math.max(0, val));
    } else {
      const obt = parseFloat(interObtained);
      const tot = parseFloat(interTotal);
      if (!isNaN(obt) && !isNaN(tot) && tot > 0) {
        return Math.min(100, Math.max(0, (obt / tot) * 100));
      }
      return 0;
    }
  }, [interInputMode, interPercentage, interObtained, interTotal]);

  const effectiveTestScore = useMemo(() => {
    const val = parseFloat(testScore);
    const max = formula.testMaxMarks || 100;
    return isNaN(val) ? 0 : Math.min(max, Math.max(0, val));
  }, [testScore, formula.testMaxMarks]);

  // Aggregate Calculation Breakdown
  const breakdown = useMemo(() => {
    let matricContribution = 0;
    let interContribution = 0;
    let testContribution = 0;
    let total = 0;

    if (formula.formulaType === 'higher_of_matric_inter') {
      const higher = Math.max(effectiveMatricPercent, effectiveInterPercent);
      const higherWeight = formula.matricWeight + formula.interWeight;
      interContribution = (higher * higherWeight) / 100;
      if (formula.testWeight > 0 && formula.testMaxMarks) {
        testContribution = (effectiveTestScore / formula.testMaxMarks) * formula.testWeight;
      }
      total = interContribution + testContribution;
      return {
        matricContribution: 0,
        interContribution: Number(interContribution.toFixed(2)),
        testContribution: Number(testContribution.toFixed(2)),
        total: Number(total.toFixed(2)),
        isHigherUsed: true,
        higherPercent: higher
      };
    }

    if (formula.matricWeight > 0) {
      matricContribution = (effectiveMatricPercent * formula.matricWeight) / 100;
    }

    if (formula.interWeight > 0) {
      interContribution = (effectiveInterPercent * formula.interWeight) / 100;
    }

    if (formula.testWeight > 0 && formula.testMaxMarks) {
      testContribution = (effectiveTestScore / formula.testMaxMarks) * formula.testWeight;
    }

    total = matricContribution + interContribution + testContribution;

    return {
      matricContribution: Number(matricContribution.toFixed(2)),
      interContribution: Number(interContribution.toFixed(2)),
      testContribution: Number(testContribution.toFixed(2)),
      total: Number(total.toFixed(2)),
      isHigherUsed: false,
      higherPercent: 0
    };
  }, [formula, effectiveMatricPercent, effectiveInterPercent, effectiveTestScore]);

  // Comparison with historical aggregate
  const comparison = useMemo(() => {
    if (!selectedProgram.approxClosingAggregate) return null;
    const diff = breakdown.total - selectedProgram.approxClosingAggregate;
    if (diff >= 2.0) {
      return {
        label: 'Safe Candidate',
        color: 'text-navy-900 bg-navy-50 border-navy-200',
        note: `+${diff.toFixed(2)}% comfortably above historical closing (${selectedProgram.approxClosingAggregate}%)`
      };
    } else if (diff >= -1.5) {
      return {
        label: 'Competitive Target',
        color: 'text-gold-900 bg-gold-50 border-gold-200',
        note: `${diff >= 0 ? '+' : ''}${diff.toFixed(2)}% closely aligned with historical closing (${selectedProgram.approxClosingAggregate}%)`
      };
    } else {
      return {
        label: 'Stretch Reach',
        color: 'text-gold-900 bg-gold-50 border-gold-200',
        note: `${diff.toFixed(2)}% below typical closing (${selectedProgram.approxClosingAggregate}%). A higher entry test score is advisable.`
      };
    }
  }, [breakdown.total, selectedProgram]);

  const handleCopyBreakdown = () => {
    const text = `Merit Ledger Breakdown for ${selectedProgram.name} (${selectedUniversity.shortName}):
• Matric (${formula.matricWeight}%): contributes ${breakdown.matricContribution}%
• Intermediate (${formula.interWeight}%): contributes ${breakdown.interContribution}%
${formula.testWeight > 0 ? `• ${formula.testName} (${formula.testWeight}%): contributes ${breakdown.testContribution}%` : ''}
= Final Aggregate: ${breakdown.total}%
Source: ${formula.citation} (Verified ${formula.lastVerified})`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetInputs = () => {
    setMatricPercentage('85.0');
    setInterPercentage('80.0');
    setTestScore(formula.testMaxMarks ? String(Math.round(formula.testMaxMarks * 0.75)) : '75');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header section */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-serif font-medium text-paper-900 tracking-tight">
          Merit Aggregate Calculator
        </h1>
        <p className="mt-2 text-base text-paper-600 max-w-3xl">
          Calculate your exact admission aggregate using official university formulas. Every
          component is broken down step by step with verified citations from official prospectuses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: University & Program Selector + Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* University & Program Card */}
          <div className="bg-paper-50 border border-paper-200 rounded-xl p-6 shadow-xs space-y-5">
            <div>
              <label className="block text-xs font-medium text-paper-500 uppercase tracking-wider mb-2">
                1. Select University
              </label>
              <select
                value={selectedUniId}
                onChange={e => setSelectedUniId(e.target.value)}
                className="w-full bg-paper-50 border border-paper-300 rounded-lg px-3.5 py-2.5 text-sm text-paper-900 focus:outline-none focus:ring-2 focus:ring-navy-600/40 focus:border-navy-600 transition-colors"
              >
                {UNIVERSITIES.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.shortName} — {u.name} ({u.city})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-paper-500 uppercase tracking-wider mb-2">
                2. Select Academic Program
              </label>
              <select
                value={selectedProgId}
                onChange={e => setSelectedProgId(e.target.value)}
                className="w-full bg-paper-50 border border-paper-300 rounded-lg px-3.5 py-2.5 text-sm text-paper-900 focus:outline-none focus:ring-2 focus:ring-navy-600/40 focus:border-navy-600 transition-colors"
              >
                {selectedUniversity.programs.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} [{p.field}]
                  </option>
                ))}
              </select>
            </div>

            {/* Official formula badge & citation */}
            <div className="pt-2 border-t border-paper-100">
              <div className="flex items-start gap-2.5 text-xs text-paper-600 bg-navy-50/50 rounded-lg p-3 border border-navy-200/70">
                <ShieldCheck className="w-4 h-4 text-navy-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-medium text-paper-900">
                    {formula.formulaName}
                  </div>
                  <div className="text-paper-600 leading-relaxed">
                    {formula.ruleDescription}
                  </div>
                  <div className="text-[11px] text-paper-500 pt-1">
                    Source: {formula.citation} · Verified {formula.lastVerified}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Component Inputs */}
          <div className="bg-paper-50 border border-paper-200 rounded-xl p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-paper-100">
              <span className="text-sm font-semibold text-paper-900">
                Required Academic Inputs
              </span>
              <button
                onClick={handleResetInputs}
                className="inline-flex items-center gap-1 text-xs text-paper-500 hover:text-paper-900 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to sample</span>
              </button>
            </div>

            {/* Matric Input (if formula uses matric) */}
            {formula.matricWeight > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-paper-900">
                    Matric / SSC Marks ({formula.matricWeight}% Weight)
                  </label>
                  <div className="flex items-center gap-1 p-0.5 bg-paper-100 rounded-md text-xs">
                    <button
                      onClick={() => setMatricInputMode('percentage')}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        matricInputMode === 'percentage'
                          ? 'bg-paper-50 font-medium text-paper-900 shadow-xs'
                          : 'text-paper-600'
                      }`}
                    >
                      Percentage
                    </button>
                    <button
                      onClick={() => setMatricInputMode('marks')}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        matricInputMode === 'marks'
                          ? 'bg-paper-50 font-medium text-paper-900 shadow-xs'
                          : 'text-paper-600'
                      }`}
                    >
                      Raw Marks
                    </button>
                  </div>
                </div>

                {matricInputMode === 'percentage' ? (
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={matricPercentage}
                      onChange={e => setMatricPercentage(e.target.value)}
                      placeholder="e.g. 88.50"
                      className="w-full bg-paper-50 border border-paper-300 rounded-lg px-3.5 py-2 text-sm text-paper-900 font-mono focus:outline-none focus:ring-2 focus:ring-navy-600/40 focus:border-navy-600"
                    />
                    <span className="absolute right-3 top-2 text-sm text-paper-500 font-mono">
                      %
                    </span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="block text-[11px] text-paper-500 mb-1">Obtained</span>
                      <input
                        type="number"
                        value={matricObtained}
                        onChange={e => setMatricObtained(e.target.value)}
                        placeholder="975"
                        className="w-full bg-paper-50 border border-paper-300 rounded-lg px-3 py-1.5 text-sm text-paper-900 font-mono focus:outline-none focus:ring-2 focus:ring-navy-600/40"
                      />
                    </div>
                    <div>
                      <span className="block text-[11px] text-paper-500 mb-1">Total</span>
                      <input
                        type="number"
                        value={matricTotal}
                        onChange={e => setMatricTotal(e.target.value)}
                        placeholder="1100"
                        className="w-full bg-paper-50 border border-paper-300 rounded-lg px-3 py-1.5 text-sm text-paper-900 font-mono focus:outline-none focus:ring-2 focus:ring-navy-600/40"
                      />
                    </div>
                  </div>
                )}
                <p className="text-[11px] text-paper-500">
                  Calculated Percentage:{' '}
                  <span className="font-mono font-medium text-paper-700">
                    {effectiveMatricPercent.toFixed(2)}%
                  </span>
                </p>
              </div>
            )}

            {/* Intermediate Input (if formula uses inter) */}
            {formula.interWeight > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-paper-900">
                    Intermediate / HSSC / A-Levels ({formula.interWeight}% Weight)
                  </label>
                  <div className="flex items-center gap-1 p-0.5 bg-paper-100 rounded-md text-xs">
                    <button
                      onClick={() => setInterInputMode('percentage')}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        interInputMode === 'percentage'
                          ? 'bg-paper-50 font-medium text-paper-900 shadow-xs'
                          : 'text-paper-600'
                      }`}
                    >
                      Percentage
                    </button>
                    <button
                      onClick={() => setInterInputMode('marks')}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        interInputMode === 'marks'
                          ? 'bg-paper-50 font-medium text-paper-900 shadow-xs'
                          : 'text-paper-600'
                      }`}
                    >
                      Raw Marks
                    </button>
                  </div>
                </div>

                {interInputMode === 'percentage' ? (
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={interPercentage}
                      onChange={e => setInterPercentage(e.target.value)}
                      placeholder="e.g. 82.00"
                      className="w-full bg-paper-50 border border-paper-300 rounded-lg px-3.5 py-2 text-sm text-paper-900 font-mono focus:outline-none focus:ring-2 focus:ring-navy-600/40 focus:border-navy-600"
                    />
                    <span className="absolute right-3 top-2 text-sm text-paper-500 font-mono">
                      %
                    </span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="block text-[11px] text-paper-500 mb-1">Obtained</span>
                      <input
                        type="number"
                        value={interObtained}
                        onChange={e => setInterObtained(e.target.value)}
                        placeholder="435"
                        className="w-full bg-paper-50 border border-paper-300 rounded-lg px-3 py-1.5 text-sm text-paper-900 font-mono focus:outline-none focus:ring-2 focus:ring-navy-600/40"
                      />
                    </div>
                    <div>
                      <span className="block text-[11px] text-paper-500 mb-1">Total (Part 1 or Full)</span>
                      <input
                        type="number"
                        value={interTotal}
                        onChange={e => setInterTotal(e.target.value)}
                        placeholder="520"
                        className="w-full bg-paper-50 border border-paper-300 rounded-lg px-3 py-1.5 text-sm text-paper-900 font-mono focus:outline-none focus:ring-2 focus:ring-navy-600/40"
                      />
                    </div>
                  </div>
                )}
                <p className="text-[11px] text-paper-500">
                  Calculated Percentage:{' '}
                  <span className="font-mono font-medium text-paper-700">
                    {effectiveInterPercent.toFixed(2)}%
                  </span>
                  {' '}(Use HSSC Part-1 if Part-2 results are awaiting).
                </p>
              </div>
            )}

            {/* Test Score Input (adaptive - only if testWeight > 0) */}
            {formula.testWeight > 0 ? (
              <div className="space-y-2 pt-2 border-t border-paper-100">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-paper-900">
                    {formula.testName || 'Entry Test Score'} ({formula.testWeight}% Weight)
                  </label>
                  <span className="text-xs text-paper-500 font-mono">
                    Max Marks: {formula.testMaxMarks}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    min="0"
                    max={formula.testMaxMarks || 100}
                    value={testScore}
                    onChange={e => setTestScore(e.target.value)}
                    placeholder={`Score out of ${formula.testMaxMarks}`}
                    className="w-full bg-paper-50 border border-paper-300 rounded-lg px-3.5 py-2 text-sm text-paper-900 font-mono focus:outline-none focus:ring-2 focus:ring-navy-600/40 focus:border-navy-600"
                  />
                  <span className="absolute right-3 top-2 text-xs text-paper-500 font-mono">
                    / {formula.testMaxMarks}
                  </span>
                </div>
                <p className="text-[11px] text-paper-500">
                  Raw test percentage:{' '}
                  <span className="font-mono font-medium text-paper-700">
                    {formula.testMaxMarks
                      ? ((effectiveTestScore / formula.testMaxMarks) * 100).toFixed(2)
                      : 0}
                    %
                  </span>
                </p>
              </div>
            ) : (
              <div className="p-3 bg-paper-50 rounded-lg border border-paper-200 text-xs text-paper-600 flex items-center gap-2">
                <Info className="w-4 h-4 text-paper-400 shrink-0" />
                <span>
                  No entry test required for this program. Aggregate is computed purely from
                  academic board percentages.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Instant Live Aggregate & Mathematical Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          <div className="calculator-result-panel bg-gradient-to-br from-navy-900 via-navy-950 to-paper-900 text-white rounded-xl p-6 sm:p-7 shadow-lg relative overflow-hidden border border-navy-800">
            {/* Background accent ornament */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-gold-300/15 rounded-full blur-2xl -mr-10 -mt-10" />

            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-paper-300 font-semibold" style={{color: '#ffffff'}}>
                  Computed Aggregate
                </span>
                <button
                  onClick={handleCopyBreakdown}
                  className="inline-flex items-center gap-1 text-xs text-paper-300 hover:text-gold-200 transition-colors"
                  title="Copy breakdown"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-gold-300" />
                      <span className="text-gold-300 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span style={{color: '#ffffff'}}>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Dominant focal number */}
              <div>
                <div className="text-5xl sm:text-6xl font-serif font-bold tracking-tight text-gold-300 font-mono tabular-nums" style={{color: '#f5c861'}}>
                  {breakdown.total.toFixed(2)}
                  <span className="text-2xl text-gold-200 font-sans ml-1">%</span>
                </div>
                <p className="mt-1 text-xs text-paper-300" style={{color: '#ffffff'}}>
                  {selectedProgram.name} · {selectedUniversity.shortName}
                </p>
              </div>

              {/* Piece-by-piece breakdown list */}
              <div className="pt-4 border-t border-navy-800/60 space-y-2.5 text-xs">
                <span className="block text-[11px] uppercase tracking-wider text-paper-300 font-medium" style={{color: '#ffffff'}}>
                  Mathematical Breakdown
                </span>

                {formula.matricWeight > 0 && (
                  <div className="flex items-center justify-between text-paper-200">
                    <span style={{color: '#ffffff'}}>
                      Matric ({formula.matricWeight}% of {effectiveMatricPercent.toFixed(2)}%)
                    </span>
                    <span className="font-mono text-gold-200 font-semibold tabular-nums">
                      +{breakdown.matricContribution.toFixed(2)}
                    </span>
                  </div>
                )}

                {formula.interWeight > 0 && (
                  <div className="flex items-center justify-between text-paper-200">
                    <span style={{color: '#ffffff'}}>
                      Intermediate ({formula.interWeight}% of {effectiveInterPercent.toFixed(2)}%)
                    </span>
                    <span className="font-mono text-gold-200 font-semibold tabular-nums">
                      +{breakdown.interContribution.toFixed(2)}
                    </span>
                  </div>
                )}

                {formula.testWeight > 0 && (
                  <div className="flex items-center justify-between text-paper-200">
                    <span style={{color: '#ffffff'}}>
                      {formula.testName} ({formula.testWeight}% of {effectiveTestScore}/{formula.testMaxMarks})
                    </span>
                    <span className="font-mono text-gold-200 font-semibold tabular-nums">
                      +{breakdown.testContribution.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="pt-2 border-t border-navy-800/60 flex items-center justify-between font-bold text-white">
                  <span>Total Merit Aggregate</span>
                  <span className="font-mono text-gold-300 text-sm tabular-nums">
                    = {breakdown.total.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* Historical context comparison */}
              {comparison && (
                <div className={`p-3 rounded-lg border text-xs shadow-xs ${comparison.color}`}>
                  <div className="font-bold">{comparison.label}</div>
                  <div className="mt-0.5 leading-relaxed">{comparison.note}</div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Context & Deep Links to other features */}
          <div className="bg-paper-50 border border-paper-200 rounded-xl p-5 shadow-xs space-y-4 text-xs">
            <h3 className="font-semibold text-paper-900 text-sm">
              Program Admission Context
            </h3>

            <div className="space-y-2 text-paper-600">
              <div className="flex justify-between py-1 border-b border-paper-100">
                <span className="text-paper-500">Degree & Duration:</span>
                <span className="font-medium text-paper-900">
                  {selectedProgram.degreeType} ({selectedProgram.durationYears} Years)
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-paper-100">
                <span className="text-paper-500">Approximate Fee:</span>
                <span className="font-medium text-paper-900">{selectedProgram.feePerYearPkr}</span>
              </div>
              {selectedProgram.seatsInfo && (
                <div className="flex justify-between py-1 border-b border-paper-100">
                  <span className="text-paper-500">Seats Capacity:</span>
                  <span className="font-medium text-paper-900">{selectedProgram.seatsInfo}</span>
                </div>
              )}
              <div className="flex justify-between py-1">
                <span className="text-paper-500">Typical Admission Cycle:</span>
                <span className="font-medium text-paper-900">
                  {selectedUniversity.typicalTiming.cycleYear}
                </span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => onNavigateToChecklist(selectedUniversity.id)}
                className="w-full flex items-center justify-between px-3 py-2 bg-paper-100 hover:bg-paper-200 text-paper-800 rounded-lg font-medium transition-colors"
              >
                <span>Required Documents Checklist for {selectedUniversity.shortName}</span>
                <ArrowRight className="w-3.5 h-3.5 text-navy-600" />
              </button>

              <button
                onClick={onNavigateToRecommendations}
                className="w-full flex items-center justify-between px-3.5 py-2.5 bg-gold-300 hover:bg-gold-200 text-paper-950 rounded-lg font-bold border border-gold-400/40 shadow-xs transition-colors"
              >
                <span>Find Other Target Programs for {breakdown.total.toFixed(1)}%</span>
                <ArrowRight className="w-3.5 h-3.5 text-navy-900" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
