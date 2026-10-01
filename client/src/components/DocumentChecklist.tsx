import React, { useState, useEffect, useMemo } from 'react';
import { UNIVERSITIES } from '../data/universities';
import { UNIVERSITY_CHECKLISTS } from '../data/checklists';
import { AcademicStream, DocumentItem } from '../types';
import { getChecklistProgress, toggleChecklistDoc } from '../utils/storage';
import {
  FileText,
  CheckCircle2,
  Circle,
  HelpCircle,
  Printer,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';

interface DocumentChecklistProps {
  initialUniversityId?: string;
  onNavigateToCalculator: (uniId: string) => void;
}

export const DocumentChecklist: React.FC<DocumentChecklistProps> = ({
  initialUniversityId,
  onNavigateToCalculator
}) => {
  const [selectedUniId, setSelectedUniId] = useState<string>(
    initialUniversityId || 'nust'
  );
  const [stream, setStream] = useState<AcademicStream>('fsc');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [completedDocIds, setCompletedDocIds] = useState<string[]>([]);

  // Update selected university when initial props change
  useEffect(() => {
    if (initialUniversityId) {
      setSelectedUniId(initialUniversityId);
    }
  }, [initialUniversityId]);

  // Load saved checklist progress from localStorage
  useEffect(() => {
    setCompletedDocIds(getChecklistProgress(selectedUniId));
  }, [selectedUniId]);

  const activeChecklist = useMemo(() => {
    return (
      UNIVERSITY_CHECKLISTS[selectedUniId] ||
      UNIVERSITY_CHECKLISTS['generic']
    );
  }, [selectedUniId]);

  // Filter documents by stream (FSc vs O/A-Levels) and category
  const visibleDocuments = useMemo(() => {
    return activeChecklist.documents.filter(doc => {
      // Check stream requirement
      if (stream === 'fsc' && !doc.requiredForFSc) return false;
      if (stream === 'o_a_level' && !doc.requiredForOALevels) return false;

      // Check category
      if (selectedCategory !== 'all' && doc.category !== selectedCategory) return false;

      return true;
    });
  }, [activeChecklist, stream, selectedCategory]);

  const handleToggleDoc = (docId: string) => {
    const updated = toggleChecklistDoc(selectedUniId, docId);
    setCompletedDocIds(updated);
  };

  const handleResetChecklist = () => {
    localStorage.removeItem(`merit_ledger_checklist_progress_${selectedUniId}`);
    setCompletedDocIds([]);
  };

  const completedCount = useMemo(() => {
    return visibleDocuments.filter(d => completedDocIds.includes(d.id)).length;
  }, [visibleDocuments, completedDocIds]);

  const progressPercentage = useMemo(() => {
    if (visibleDocuments.length === 0) return 0;
    return Math.round((completedCount / visibleDocuments.length) * 100);
  }, [completedCount, visibleDocuments.length]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-medium text-paper-900 tracking-tight">
            Admission Document Checklist
          </h1>
          <p className="mt-2 text-base text-paper-600 max-w-2xl">
            Customized paperwork checklists tailored to each Pakistani university. Never miss an
            attestation deadline or discovery required documents after traveling to campus.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="self-start sm:self-center inline-flex items-center gap-1.5 px-3.5 py-2 bg-paper-100 hover:bg-paper-200 text-paper-800 rounded-lg text-xs font-medium transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF</span>
        </button>
      </div>

      {/* Select University & Academic Stream Controls */}
      <div className="bg-paper-50 border border-paper-200 rounded-xl p-5 shadow-xs space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-paper-500 uppercase tracking-wider mb-2">
              Select University
            </label>
            <select
              value={selectedUniId}
              onChange={e => setSelectedUniId(e.target.value)}
              className="w-full bg-paper-50 border border-paper-300 rounded-lg px-3.5 py-2 text-sm text-paper-900 focus:outline-none focus:ring-2 focus:ring-navy-600/40 focus:border-navy-600"
            >
              {UNIVERSITIES.map(u => (
                <option key={u.id} value={u.id}>
                  {u.shortName} — {u.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-paper-500 uppercase tracking-wider mb-2">
              Your Academic Stream
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-paper-100 rounded-lg">
              <button
                onClick={() => setStream('fsc')}
                className={`py-1.5 text-xs font-medium rounded-md transition-colors text-center ${
                  stream === 'fsc'
                    ? 'bg-navy-600 text-white shadow-xs font-semibold'
                    : 'text-paper-600 hover:text-navy-900'
                }`}
              >
                Matric / FSc (BISE)
              </button>
              <button
                onClick={() => setStream('o_a_level')}
                className={`py-1.5 text-xs font-medium rounded-md transition-colors text-center ${
                  stream === 'o_a_level'
                    ? 'bg-navy-600 text-white shadow-xs font-semibold'
                    : 'text-paper-600 hover:text-navy-900'
                }`}
              >
                Cambridge O / A-Levels
              </button>
            </div>
          </div>
        </div>

        {/* Stream guidance note */}
        <div className="p-3.5 bg-navy-50/50 border border-navy-200/80 rounded-lg flex items-start gap-2.5 text-xs text-paper-700">
          <Info className="w-4 h-4 text-navy-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            {stream === 'fsc'
              ? activeChecklist.streamSpecificNotes.fsc
              : activeChecklist.streamSpecificNotes.oALevel}
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="pt-2 border-t border-paper-100 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-paper-700">
              Gathered Paperwork Progress:
            </span>
            <span className="font-mono text-paper-900 font-semibold">
              {completedCount} of {visibleDocuments.length} Complete ({progressPercentage}%)
            </span>
          </div>

          <div className="w-full h-2.5 bg-paper-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold-300 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Categories */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          {['all', 'Academic', 'Identity', 'Domicile & Quota', 'Institutional & Board'].map(c => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1 text-xs rounded-lg transition-colors capitalize ${
                selectedCategory === c
                  ? 'bg-navy-600 text-white font-semibold shadow-xs'
                  : 'bg-paper-100 text-paper-600 hover:bg-paper-200'
              }`}
            >
              {c === 'all' ? 'All Documents' : c}
            </button>
          ))}
        </div>

        {completedCount > 0 && (
          <button
            onClick={handleResetChecklist}
            className="inline-flex items-center gap-1 text-xs text-paper-400 hover:text-paper-700 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset checks</span>
          </button>
        )}
      </div>

      {/* Interactive Document Checklist List */}
      <div className="space-y-3">
        {visibleDocuments.map(doc => {
          const isDone = completedDocIds.includes(doc.id);
          return (
            <div
              key={doc.id}
              onClick={() => handleToggleDoc(doc.id)}
              className={`border rounded-xl p-4 sm:p-5 transition-all cursor-pointer select-none flex items-start gap-4 ${
                isDone
                  ? 'bg-navy-50/40 border-navy-200'
                  : 'bg-paper-50 border-paper-200 hover:border-paper-300 shadow-xs'
              }`}
            >
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  handleToggleDoc(doc.id);
                }}
                className="mt-0.5 text-paper-400 hover:text-navy-600 transition-colors"
              >
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-navy-600" />
                ) : (
                  <Circle className="w-5 h-5 text-paper-300" />
                )}
              </button>

              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm sm:text-base font-medium ${
                        isDone ? 'line-through text-paper-400' : 'text-paper-900'
                      }`}
                    >
                      {doc.title}
                    </span>
                    {doc.isMandatory ? (
                      <span className="text-[11px] text-paper-500 font-medium">· Mandatory</span>
                    ) : (
                      <span className="text-[11px] text-paper-400">· Quota / Optional</span>
                    )}
                  </div>

                  <span className="text-[11px] text-paper-400 uppercase tracking-wider">
                    {doc.category}
                  </span>
                </div>

                <p
                  className={`text-xs leading-relaxed ${
                    isDone ? 'text-paper-400' : 'text-paper-600'
                  }`}
                >
                  {doc.description}
                </p>

                {doc.specialTip && (
                  <div className="text-[11px] text-paper-700 bg-paper-100/70 p-2 rounded-md mt-2 flex items-start gap-1.5">
                    <span className="font-semibold text-paper-900">Advice:</span>
                    <span>{doc.specialTip}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* University Cross-link */}
      <div className="p-4 bg-paper-100/70 border border-paper-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <span className="text-paper-700">
          Ready to verify your score aggregate for this university?
        </span>
        <button
          onClick={() => onNavigateToCalculator(selectedUniId)}
          className="px-3.5 py-1.5 bg-gold-300 hover:bg-gold-200 text-paper-950 font-bold rounded-md border border-gold-400/40 shadow-xs transition-colors whitespace-nowrap"
        >
          Open Merit Calculator for {activeChecklist.universityName.split(' ')[0]}
        </button>
      </div>
    </div>
  );
};
